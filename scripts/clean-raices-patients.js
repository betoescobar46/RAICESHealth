import admin from 'firebase-admin';

console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function cleanPatients() {
  console.log('\n⚠️  ADVERTENCIA: Este script eliminará TODOS los documentos de patients_raices\n');

  try {
    const snapshot = await db.collection('patients_raices').get();

    console.log(`📊 Documentos encontrados: ${snapshot.size}`);

    if (snapshot.size === 0) {
      console.log('✅ La colección ya está vacía');
      process.exit(0);
    }

    console.log('\n🗑️  Eliminando documentos...');

    // Eliminar en lotes
    const batchSize = 499;
    const batches = Math.ceil(snapshot.size / batchSize);
    let deleted = 0;

    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = Math.min((i + 1) * batchSize, snapshot.size);
      const docsToDelete = snapshot.docs.slice(start, end);

      const batch = db.batch();
      docsToDelete.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      deleted += docsToDelete.length;
      console.log(`   ✅ Lote ${i + 1}/${batches}: ${docsToDelete.length} documentos eliminados (${deleted}/${snapshot.size})`);
    }

    console.log('\n✅ Limpieza completada!');
    console.log(`   Total eliminado: ${deleted} documentos\n`);

  } catch (error) {
    console.error('❌ Error al limpiar:', error);
    process.exit(1);
  }
}

cleanPatients()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
