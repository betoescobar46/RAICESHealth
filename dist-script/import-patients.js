// import-patients.ts (Versión Final - Corregida para usar 'Columna 1' como ID)
import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };
const FIRESTORE_COLLECTION = 'patients';
const CSV_FILE_PATH = path.resolve(process.cwd(), 'pacientes.csv');
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const processRow = (row) => {
    // --- CAMBIO CLAVE: Usamos 'Columna 1' como el origen del ID ---
    const fichaId = row['Columna 1'] ? String(row['Columna 1']).trim() : null;
    if (!fichaId || !/^\d+$/.test(fichaId)) {
        console.warn(`Fila omitida: 'Columna 1' invÃ¡lida o ausente ->`, row);
        return null;
    }
    const nombreCompleto = [row['NOMBRE'], row['APELLIDO PATERNO'], row['APELLIDO MATERNO']]
        .filter(Boolean)
        .join(' ');
    return {
        nombre: Buffer.from(nombreCompleto, 'latin1').toString('utf8'),
        rut: row['RUN'] || '',
        // Asignamos el valor de 'Columna 1' al campo 'ficha' para consistencia.
        ficha: fichaId,
        edad: parseInt(row['EDAD'], 10) || undefined,
        sexo: row['SEXO'] === 'M' ? 'Masculino' : 'Femenino',
        fechaNacimiento: row['F. NACIMIENTO'] || '',
        direccion: Buffer.from(row['DOMICILIO'], 'latin1').toString('utf8'),
        comuna: Buffer.from(row['COMUNA'] || 'Maule', 'latin1').toString('utf8'),
        lat: 0,
        lon: 0,
        telefonos: [row['CONTACTO'], row['CONTACTO 2']].filter(Boolean),
        email: row['CORREO'] || '',
        tutor: Buffer.from(row['TUTOR'] || '', 'latin1').toString('utf8'),
        ocupacion: Buffer.from(row['OCUPACION'] || '', 'latin1').toString('utf8'),
        dispositivoAPS: Buffer.from(row['DERIVACIÃ“N'] || '', 'latin1').toString('utf8'),
        alergias: Buffer.from(row['ALERGIAS'] || '', 'latin1').toString('utf8'),
        ram: Buffer.from(row['RAM'] || '', 'latin1').toString('utf8'),
        objetivosTerapeuticos: '',
        diagnostico: {
            saludMental: Buffer.from(row['EJE I DIAGNÃ“STICO '] || '', 'latin1').toString('utf8'),
            morbilidadMedica: Buffer.from(row['EJE III DIAGNÃ“STICO '] || '', 'latin1').toString('utf8'),
            factoresPsicosociales: Buffer.from(row['EJE IVEJE IV DIAGNÃ“STICO '] || '', 'latin1').toString('utf8'),
        },
        farmacos: [],
        pensionDiscapacidad: row['CREDENCIAL DISCAPACIDAD'] === 'SI',
        credencialDiscapacidad: row['CREDENCIAL DISCAPACIDAD'] === 'SI',
        consumoActivoDrogas: false,
    };
};
async function runImport() {
    try {
        console.log(`Iniciando importaciÃ³n hacia la colecciÃ³n "${FIRESTORE_COLLECTION}"...`);
        const csvFile = fs.readFileSync(CSV_FILE_PATH, 'utf8');
        const { data: rows } = Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            delimiter: '\t', // --- AÃ‘ADIDO: Especificamos que el delimitador es un tabulador ---
        });
        if (!rows || rows.length === 0) {
            console.log('El archivo CSV estÃ¡ vacÃ­o o no se pudo leer.');
            return;
        }
        console.log(`Se encontraron ${rows.length} filas. Procesando y creando lotes...`);
        const collectionRef = db.collection(FIRESTORE_COLLECTION);
        const commitPromises = [];
        let batch = db.batch();
        let operationsInBatch = 0;
        let validRowsCount = 0;
        for (const row of rows) {
            const processedData = processRow(row);
            if (processedData && processedData.hasOwnProperty('ficha')) {
                validRowsCount++;
                const docId = processedData.ficha;
                const docRef = collectionRef.doc(docId);
                batch.set(docRef, processedData);
                operationsInBatch++;
                if (operationsInBatch === 499) {
                    console.log(`Enviando un lote de ${operationsInBatch} pacientes...`);
                    commitPromises.push(batch.commit());
                    batch = db.batch();
                    operationsInBatch = 0;
                }
            }
        }
        if (operationsInBatch > 0) {
            console.log(`Enviando el Ãºltimo lote de ${operationsInBatch} pacientes...`);
            commitPromises.push(batch.commit());
        }
        console.log(`\nTotal de filas vÃ¡lidas procesadas: ${validRowsCount}`);
        console.log('Esperando la confirmaciÃ³n de todos los lotes en Firestore...');
        await Promise.all(commitPromises);
        console.log('\nÂ¡Ã‰XITO! La importaciÃ³n se completÃ³ correctamente.');
    }
    catch (error) {
        console.error('\nERROR: OcurriÃ³ un problema durante la importaciÃ³n.', error);
    }
    finally {
        await admin.app().delete();
    }
}
runImport();
