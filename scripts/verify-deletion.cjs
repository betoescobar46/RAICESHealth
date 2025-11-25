/**
 * Script para verificar que las notas clínicas fueron eliminadas
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function verifyDeletion() {
  console.log('\n🔍 VERIFICANDO ELIMINACIÓN DE NOTAS CLÍNICAS\n');
  console.log('═'.repeat(80));

  try {
    const snapshot = await db.collection('clinicalNotes').get();

    console.log(`📊 Notas encontradas en Firestore: ${snapshot.size}\n`);

    if (snapshot.size === 0) {
      console.log('✅ CONFIRMADO: Todas las notas clínicas fueron eliminadas exitosamente\n');
    } else {
      console.log('⚠️  ADVERTENCIA: Aún hay notas en la colección:\n');
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   - ${doc.id} | Tipo: ${data.tipo || 'N/A'} | Paciente: ${data.pacienteId || 'N/A'}`);
      });
      console.log();
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

verifyDeletion();
