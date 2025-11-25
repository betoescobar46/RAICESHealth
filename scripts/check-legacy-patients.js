import admin from 'firebase-admin';

console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function checkLegacyPatients() {
  console.log('\n🔍 Verificando colección patients (legacy)...\n');

  try {
    const snapshot = await db.collection('patients').get();

    console.log(`📊 Total documentos en 'patients': ${snapshot.size}`);

    if (snapshot.size > 0) {
      console.log('\n📋 Primeros 10 pacientes:');
      snapshot.docs.slice(0, 10).forEach((doc, idx) => {
        const p = doc.data();
        console.log(`   ${idx + 1}. Ficha ${p.ficha || 'N/A'}: ${p.nombre} ${p.apellidoPaterno || ''}`);
      });
    } else {
      console.log('\n⚠️  La colección está vacía');
    }

    console.log('\n✅ Verificación completada\n');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkLegacyPatients()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
