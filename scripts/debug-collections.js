import admin from 'firebase-admin';

console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function debugCollections() {
  console.log('\n🔍 Verificando colecciones en Firestore...\n');

  try {
    // Verificar colección patients_raices
    const raicesSnapshot = await db.collection('patients_raices').limit(5).get();
    console.log(`✅ patients_raices: ${raicesSnapshot.size} documentos (mostrando primeros 5)`);

    if (raicesSnapshot.size > 0) {
      raicesSnapshot.forEach((doc, idx) => {
        const data = doc.data();
        console.log(`   ${idx + 1}. ${data.nombre} ${data.apellidoPaterno} (Ficha: ${data.ficha}, tenantId: ${data.tenantId})`);
      });
    }

    // Verificar colección patients (legacy simora)
    console.log('');
    const simoraSnapshot = await db.collection('patients').limit(5).get();
    console.log(`📋 patients (simora legacy): ${simoraSnapshot.size} documentos (mostrando primeros 5)`);

    if (simoraSnapshot.size > 0) {
      simoraSnapshot.forEach((doc, idx) => {
        const data = doc.data();
        console.log(`   ${idx + 1}. ${data.nombre} ${data.apellidoPaterno} (Ficha: ${data.ficha})`);
      });
    }

    // Verificar colección patients_simora
    console.log('');
    const simoraNewSnapshot = await db.collection('patients_simora').limit(5).get();
    console.log(`📋 patients_simora: ${simoraNewSnapshot.size} documentos`);

    console.log('\n✅ Debug completado\n');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugCollections()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
