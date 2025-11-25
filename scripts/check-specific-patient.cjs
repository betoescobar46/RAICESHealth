/**
 * Script para verificar las notas de un paciente específico
 */

const admin = require('firebase-admin');

// Inicializar Firebase Admin
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function checkPatient() {
  const rut = '17146704-7'; // Alejandra Verdugo Arevalo

  console.log(`\n🔍 Buscando paciente con RUT: ${rut}\n`);

  try {
    // Buscar paciente
    const patientsSnapshot = await db.collection('patients')
      .where('rut', '==', rut)
      .get();

    if (patientsSnapshot.empty) {
      console.log('❌ No se encontró el paciente');
      process.exit(1);
    }

    const patientDoc = patientsSnapshot.docs[0];
    const patientData = patientDoc.data();
    const patientId = patientDoc.id;

    console.log('✅ Paciente encontrado:');
    console.log(`   ID Firestore: ${patientId}`);
    console.log(`   Nombre: ${patientData.nombre}`);
    console.log(`   RUT: ${patientData.rut}`);

    // Buscar notas con ambos campos posibles
    console.log('\n📋 Buscando notas clínicas...\n');

    // Intentar con pacienteId
    const notasQuery1 = await db.collection('clinicalNotes')
      .where('pacienteId', '==', patientId)
      .get();

    console.log(`Notas encontradas con pacienteId: ${notasQuery1.size}`);

    // Intentar con patientId
    const notasQuery2 = await db.collection('clinicalNotes')
      .where('patientId', '==', patientId)
      .get();

    console.log(`Notas encontradas con patientId: ${notasQuery2.size}`);

    // Mostrar todas las notas
    const todasLasNotas = await db.collection('clinicalNotes').get();
    console.log(`\nTotal de notas en la colección: ${todasLasNotas.size}`);

    // Buscar notas que contengan el nombre del paciente
    const notasPorNombre = [];
    todasLasNotas.forEach(doc => {
      const data = doc.data();
      if (data.pacienteNombre && data.pacienteNombre.includes('Gema Rosa')) {
        notasPorNombre.push({
          id: doc.id,
          ...data
        });
      }
    });

    console.log(`\nNotas encontradas por nombre: ${notasPorNombre.length}`);

    if (notasPorNombre.length > 0) {
      console.log('\n📄 Detalles de las notas:');
      notasPorNombre.forEach((nota, i) => {
        console.log(`\n${i + 1}. ${nota.titulo || 'Sin título'}`);
        console.log(`   ID: ${nota.id}`);
        console.log(`   pacienteId: ${nota.pacienteId || 'NO EXISTE'}`);
        console.log(`   patientId: ${nota.patientId || 'NO EXISTE'}`);
        console.log(`   pacienteNombre: ${nota.pacienteNombre}`);
        console.log(`   tipo: ${nota.tipo}`);
        console.log(`   ordenEnHistorial: ${nota.ordenEnHistorial}`);
        console.log(`   fecha: ${nota.fecha}`);
      });

      // Verificar si el pacienteId coincide
      const primeraNota = notasPorNombre[0];
      console.log('\n🔍 Análisis:');
      console.log(`   ID del paciente en Firestore: ${patientId}`);
      console.log(`   pacienteId en la nota: ${primeraNota.pacienteId}`);
      console.log(`   ¿Coinciden? ${primeraNota.pacienteId === patientId ? '✅ SÍ' : '❌ NO'}`);

      if (primeraNota.pacienteId !== patientId) {
        console.log('\n⚠️  PROBLEMA DETECTADO:');
        console.log('   El campo pacienteId en las notas NO coincide con el ID del paciente en Firestore');
        console.log('   Esto explica por qué el query no encuentra las notas');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

checkPatient();
