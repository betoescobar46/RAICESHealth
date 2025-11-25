/**
 * Verificar datos de Abigail Troncoso
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function checkAbigail() {
  console.log('\n🔍 Buscando paciente Abigail Troncoso...\n');

  try {
    // Buscar por nombre
    const patientsSnapshot = await db.collection('patients')
      .where('nombre', '>=', 'Abigail')
      .where('nombre', '<=', 'Abigail\uf8ff')
      .get();

    if (patientsSnapshot.empty) {
      console.log('❌ No se encontró el paciente');
      process.exit(1);
    }

    patientsSnapshot.forEach(async (patientDoc) => {
      const patientData = patientDoc.data();
      if (patientData.nombre.toLowerCase().includes('troncoso')) {
        console.log('✅ Paciente encontrado:');
        console.log(`   ID: ${patientDoc.id}`);
        console.log(`   Nombre: ${patientData.nombre}`);
        console.log(`   RUT: ${patientData.rut}\n`);

        // Buscar notas
        const notasSnapshot = await db.collection('clinicalNotes')
          .where('patientId', '==', patientDoc.id)
          .get();

        console.log(`📋 Notas encontradas: ${notasSnapshot.size}\n`);

        notasSnapshot.forEach((notaDoc, i) => {
          const nota = notaDoc.data();
          console.log(`${i + 1}. Nota ID: ${notaDoc.id}`);
          console.log(`   Tipo: ${nota.tipo}`);
          console.log(`   Titulo: ${nota.titulo || 'Sin título'}`);
          console.log(`   Fecha: ${nota.fecha}`);
          console.log(`   Orden: ${nota.ordenEnHistorial}`);
          console.log(`   Contenido (primeros 500 chars):`);
          console.log(`   ${(nota.contenidoCompleto || nota.contenido || '').substring(0, 500)}`);
          console.log('\n' + '-'.repeat(80) + '\n');
        });
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAbigail();
