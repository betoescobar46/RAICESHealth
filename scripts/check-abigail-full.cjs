/**
 * Ver contenido COMPLETO de Abigail
 */

const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function checkAbigail() {
  try {
    const notasSnapshot = await db.collection('clinicalNotes')
      .where('patientId', '==', 'nZVkCuM3dux1ZRyTrEUW')
      .get();

    console.log(`\n📋 Total notas: ${notasSnapshot.size}\n`);

    const notasOrdenadas = [];
    notasSnapshot.forEach(doc => {
      const data = doc.data();
      notasOrdenadas.push({
        id: doc.id,
        orden: data.ordenEnHistorial || 0,
        tipo: data.tipo,
        titulo: data.titulo,
        contenido: data.contenidoCompleto || data.contenido
      });
    });

    notasOrdenadas.sort((a, b) => a.orden - b.orden);

    notasOrdenadas.forEach((nota, i) => {
      console.log(`\n${'═'.repeat(80)}`);
      console.log(`NOTA ${i + 1}: ${nota.tipo} (orden: ${nota.orden})`);
      console.log(`Título: ${nota.titulo || 'Sin título'}`);
      console.log(`${'═'.repeat(80)}\n`);
      console.log(nota.contenido);
      console.log(`\n${'═'.repeat(80)}\n`);

      // Guardar a archivo
      fs.writeFileSync(
        `./abigail-nota-${i + 1}-${nota.tipo}.txt`,
        `NOTA ${i + 1}: ${nota.tipo} (orden: ${nota.orden})\n` +
        `Título: ${nota.titulo || 'Sin título'}\n\n` +
        nota.contenido,
        'utf8'
      );
    });

    console.log('\n✅ Archivos guardados en ./abigail-nota-*.txt\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

checkAbigail();
