import admin from 'firebase-admin';
import fetch from 'node-fetch';
// Importa la clave de tu cuenta de servicio de Firebase.
// Asegúrate de que la ruta a este archivo sea correcta.
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };
// --- CONFIGURACIÓN ---
// Nombre de la colección en Firestore que contiene a los pacientes.
const FIRESTORE_COLLECTION = 'patients';
// Clave de API de Google Cloud Geocoding. ¡NO LA PONGAS AQUÍ DIRECTAMENTE!
// El script la leerá de una variable de entorno para mayor seguridad.
const GOOGLE_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;
// URL base de la API de Geocodificación.
const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
// Pequeña pausa entre cada llamada a la API para no exceder los límites de velocidad (en milisegundos).
const API_CALL_DELAY = 60; // ~20 llamadas por segundo, muy por debajo del límite estándar de 50/s.
// --- INICIALIZACIÓN DE FIREBASE ---
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();
// --- FUNCIÓN PRINCIPAL ---
async function geocodeAndUpdatePatients() {
    console.log('--- Iniciando script de geocodificación de pacientes ---');
    if (!GOOGLE_API_KEY) {
        console.error('\nERROR: La variable de entorno GOOGLE_GEOCODING_API_KEY no está configurada.');
        console.error('Por favor, configúrala con tu clave de API de Google Geocoding y vuelve a intentarlo.');
        return;
    }
    try {
        // 1. Obtener todos los pacientes de Firestore.
        console.log(`1. Obteniendo todos los documentos de la colección "${FIRESTORE_COLLECTION}"...`);
        const patientsSnapshot = await db.collection(FIRESTORE_COLLECTION).get();
        const allPatients = patientsSnapshot.docs.map(doc => {
            const data = doc.data();
            // Creamos un objeto que coincide con la estructura del tipo Patient
            return {
                firestoreId: doc.id, // Asignamos el ID del documento a firestoreId
                ...data
            };
        });
        console.log(` -> Se encontraron ${allPatients.length} pacientes en total.`);
        // 2. Filtrar los pacientes que necesitan ser geocodificados.
        const patientsToGeocode = allPatients.filter(p => p.direccion && (p.lat === 0 || p.lon === 0 || !p.lat || !p.lon));
        if (patientsToGeocode.length === 0) {
            console.log('\n¡Excelente! No hay pacientes que necesiten ser geocodificados. El trabajo está hecho.');
            return;
        }
        console.log(`\n2. Se encontraron ${patientsToGeocode.length} pacientes que necesitan geocodificación.`);
        // 3. Procesar y actualizar pacientes en lotes.
        console.log('3. Iniciando el proceso de geocodificación y actualización...');
        const batch = db.batch();
        let successfulGeocodes = 0;
        let failedGeocodes = 0;
        for (let i = 0; i < patientsToGeocode.length; i++) {
            const patient = patientsToGeocode[i];
            const fullAddress = `${patient.direccion}, ${patient.comuna || 'Maule'}, Chile`;
            // Construir la URL para la API de Google.
            const url = `${GEOCODING_API_URL}?address=${encodeURIComponent(fullAddress)}&key=${GOOGLE_API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.status === 'OK' && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    const { lat, lng } = location;
                    // Añadir la operación de actualización al lote.
                    const patientRef = db.collection(FIRESTORE_COLLECTION).doc(patient.firestoreId);
                    batch.update(patientRef, { lat: lat, lon: lng });
                    console.log(`  (${i + 1}/${patientsToGeocode.length}) ÉXITO: ${patient.nombre} -> ${lat}, ${lng}`);
                    successfulGeocodes++;
                }
                else {
                    console.warn(`  (${i + 1}/${patientsToGeocode.length}) AVISO: No se encontraron coordenadas para ${patient.nombre} (Dirección: ${fullAddress}). Estado: ${data.status}`);
                    failedGeocodes++;
                }
            }
            catch (apiError) {
                console.error(`  (${i + 1}/${patientsToGeocode.length}) ERROR en API para ${patient.nombre}:`, apiError);
                failedGeocodes++;
            }
            // Pausa para no sobrecargar la API.
            await new Promise(resolve => setTimeout(resolve, API_CALL_DELAY));
        }
        // 4. Enviar el lote de actualizaciones a Firestore.
        if (successfulGeocodes > 0) {
            console.log(`\n4. Enviando lote con ${successfulGeocodes} actualizaciones a Firestore...`);
            await batch.commit();
            console.log('   -> ¡Lote enviado con éxito!');
        }
        else {
            console.log('\n4. No hubo geocodificaciones exitosas para enviar a Firestore.');
        }
        // 5. Mostrar resumen final.
        console.log('\n--- Proceso Finalizado ---');
        console.log(` -> Geocodificaciones exitosas: ${successfulGeocodes}`);
        console.log(` -> Geocodificaciones fallidas/sin resultados: ${failedGeocodes}`);
        console.log('--------------------------');
    }
    catch (error) {
        console.error('\nERROR: Ocurrió un problema grave durante la ejecución del script.', error);
    }
    finally {
        // Cierra la conexión de Firebase para que el script pueda terminar.
        await admin.app().delete();
    }
}
// Ejecutar la función.
geocodeAndUpdatePatients();
