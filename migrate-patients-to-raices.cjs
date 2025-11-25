/**
 * Script para migrar pacientes de simorahealth a raiceshealth-cl
 *
 * Migra: patients_raices (564 pacientes) de simorahealth → patients_raices en raiceshealth-cl
 */

const admin = require('firebase-admin');

// Credenciales de origen (simorahealth) - desde recetasAPP
const sourceServiceAccount = require('C:/Users/betoe/OneDrive/Escritorio/recetasAPP/service-account-key.json');

// Credenciales de destino (raiceshealth-cl)
const destServiceAccount = require('./service-account-key.json');

console.log('🚀 === MIGRACIÓN DE PACIENTES ===\n');
console.log('📤 Origen:', sourceServiceAccount.project_id);
console.log('📥 Destino:', destServiceAccount.project_id);
console.log('');

// Inicializar apps de Firebase
const sourceApp = admin.initializeApp({
    credential: admin.credential.cert(sourceServiceAccount)
}, 'source');

const destApp = admin.initializeApp({
    credential: admin.credential.cert(destServiceAccount)
}, 'dest');

const sourceDb = admin.firestore(sourceApp);
const destDb = admin.firestore(destApp);

async function migratePatients() {
    try {
        // 1. Leer pacientes de simorahealth
        console.log('📖 Leyendo pacientes de patients_raices en simorahealth...');
        const sourceSnapshot = await sourceDb.collection('patients_raices').get();

        console.log(`✅ Encontrados ${sourceSnapshot.size} pacientes\n`);

        if (sourceSnapshot.size === 0) {
            console.log('❌ No hay pacientes para migrar');
            process.exit(1);
        }

        // 2. Migrar en lotes (Firestore permite max 500 por batch)
        const BATCH_SIZE = 400;
        let batch = destDb.batch();
        let batchCount = 0;
        let totalMigrated = 0;

        console.log('📝 Migrando pacientes a raiceshealth-cl...\n');

        for (const doc of sourceSnapshot.docs) {
            const patientData = doc.data();

            // Usar el mismo ID del documento
            const destRef = destDb.collection('patients_raices').doc(doc.id);
            batch.set(destRef, patientData);

            batchCount++;
            totalMigrated++;

            // Ejecutar batch cuando alcanza el límite
            if (batchCount >= BATCH_SIZE) {
                await batch.commit();
                console.log(`   ✅ Lote completado: ${totalMigrated} pacientes migrados`);
                batch = destDb.batch();
                batchCount = 0;
            }
        }

        // Ejecutar último batch si queda algo
        if (batchCount > 0) {
            await batch.commit();
            console.log(`   ✅ Lote final: ${totalMigrated} pacientes migrados`);
        }

        console.log(`\n🎉 ¡MIGRACIÓN COMPLETADA!`);
        console.log(`   Total migrados: ${totalMigrated} pacientes`);
        console.log(`   Destino: patients_raices en raiceshealth-cl`);

        // 3. Verificar
        console.log('\n🔍 Verificando migración...');
        const destSnapshot = await destDb.collection('patients_raices').get();
        console.log(`✅ Pacientes en raiceshealth-cl: ${destSnapshot.size}`);

        if (destSnapshot.size === sourceSnapshot.size) {
            console.log('✅ Migración verificada: Cantidad coincide');
        } else {
            console.log(`⚠️ Diferencia: origen=${sourceSnapshot.size}, destino=${destSnapshot.size}`);
        }

    } catch (error) {
        console.error('\n❌ Error en migración:', error.message);
        console.error(error);
    } finally {
        process.exit(0);
    }
}

migratePatients();
