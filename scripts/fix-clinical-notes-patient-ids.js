import admin from 'firebase-admin';

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

console.log('🔄 Corrigiendo patientId en notas clínicas...\n');

async function fixClinicalNotesPatientIds() {
  try {
    // 1. Cargar todos los pacientes
    const patientsSnapshot = await db.collection('patients').get();
    const patientsMap = new Map();

    patientsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const nombre = data.nombre.trim().toLowerCase();
      patientsMap.set(nombre, doc.id); // Mapear nombre -> firestoreId
    });

    console.log(`✅ Cargados ${patientsMap.size} pacientes`);

    // 2. Cargar todas las notas clínicas
    const notesSnapshot = await db.collection('clinicalNotes').get();
    console.log(`📋 Encontradas ${notesSnapshot.size} notas clínicas\n`);

    let fixed = 0;
    let notFound = 0;
    let alreadyOk = 0;

    const batch = db.batch();
    let batchCount = 0;

    for (const noteDoc of notesSnapshot.docs) {
      const noteData = noteDoc.data();
      const pacienteNombre = (noteData.pacienteNombre || '').trim().toLowerCase();

      // Si ya tiene patientId válido, skip
      if (noteData.patientId && noteData.patientId !== 'undefined') {
        alreadyOk++;
        continue;
      }

      // Buscar el paciente por nombre
      const patientId = patientsMap.get(pacienteNombre);

      if (patientId) {
        batch.update(noteDoc.ref, { patientId });
        fixed++;
        batchCount++;

        if (batchCount % 100 === 0) {
          console.log(`   Procesadas ${batchCount} actualizaciones...`);
        }

        // Firestore batch limit is 500
        if (batchCount >= 450) {
          await batch.commit();
          console.log(`   ✅ Batch commit (${batchCount} updates)`);
          batchCount = 0;
        }
      } else {
        notFound++;
        console.log(`   ⚠️  No se encontró paciente para: "${noteData.pacienteNombre}"`);
      }
    }

    // Commit remaining batch
    if (batchCount > 0) {
      await batch.commit();
      console.log(`   ✅ Batch commit final (${batchCount} updates)`);
    }

    console.log('\n📊 Resumen:');
    console.log(`   ✅ Notas corregidas: ${fixed}`);
    console.log(`   ✓  Ya estaban correctas: ${alreadyOk}`);
    console.log(`   ⚠️  Paciente no encontrado: ${notFound}`);
    console.log(`   📋 Total procesadas: ${notesSnapshot.size}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixClinicalNotesPatientIds()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
