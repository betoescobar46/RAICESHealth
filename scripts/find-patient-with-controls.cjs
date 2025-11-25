/**
 * Encontrar pacientes con múltiples notas (ingreso + controles)
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function findPatientsWithControls() {
  console.log('\n🔍 Buscando pacientes con múltiples notas (controles)...\n');

  try {
    const notasSnapshot = await db.collection('clinicalNotes').get();

    // Agrupar por paciente
    const notasPorPaciente = new Map();

    notasSnapshot.forEach(doc => {
      const data = doc.data();
      const pacienteId = data.pacienteId;

      if (!notasPorPaciente.has(pacienteId)) {
        notasPorPaciente.set(pacienteId, []);
      }

      notasPorPaciente.get(pacienteId).push({
        id: doc.id,
        ...data
      });
    });

    console.log(`Total de pacientes con notas: ${notasPorPaciente.size}`);

    // Encontrar pacientes con más de 1 nota
    const pacientesConControles = [];

    for (const [pacienteId, notas] of notasPorPaciente.entries()) {
      if (notas.length > 1) {
        pacientesConControles.push({
          pacienteId,
          pacienteNombre: notas[0].pacienteNombre,
          totalNotas: notas.length,
          notas: notas.sort((a, b) => (a.ordenEnHistorial || 0) - (b.ordenEnHistorial || 0))
        });
      }
    }

    console.log(`\nPacientes con más de 1 nota: ${pacientesConControles.length}`);

    if (pacientesConControles.length > 0) {
      console.log('\n📊 Primeros 10 pacientes con controles:\n');

      pacientesConControles.slice(0, 10).forEach((p, i) => {
        console.log(`${i + 1}. ${p.pacienteNombre}`);
        console.log(`   ID: ${p.pacienteId}`);
        console.log(`   Total notas: ${p.totalNotas}`);
        console.log(`   Notas:`);
        p.notas.forEach(nota => {
          console.log(`      - [${nota.tipo}] ${nota.titulo || 'Sin título'} (orden: ${nota.ordenEnHistorial}, fecha: ${nota.fecha})`);
        });
        console.log('');
      });

      // Buscar el paciente en la colección de patients
      console.log('\n🔍 Verificando si estos pacientes existen en la colección "patients":\n');

      for (const p of pacientesConControles.slice(0, 3)) {
        const patientDoc = await db.collection('patients').doc(p.pacienteId).get();

        if (patientDoc.exists) {
          const patientData = patientDoc.data();
          console.log(`✅ ${p.pacienteNombre}`);
          console.log(`   RUT: ${patientData.rut}`);
          console.log(`   ID coincide: ${patientDoc.id === p.pacienteId ? 'SÍ' : 'NO'}`);
        } else {
          console.log(`❌ ${p.pacienteNombre} - NO existe en collection "patients"`);
        }
        console.log('');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

findPatientsWithControls();
