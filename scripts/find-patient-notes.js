import admin from 'firebase-admin';

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const targetPatientId = '3neR3UMfArki1K1Sz4PR';

console.log(`🔍 Buscando información del paciente ${targetPatientId}...\n`);

async function findPatientNotes() {
  try {
    // Obtener datos del paciente
    const patientDoc = await db.collection('patients').doc(targetPatientId).get();

    if (!patientDoc.exists) {
      console.log('❌ Paciente no encontrado');
      return;
    }

    const patientData = patientDoc.data();
    console.log('✅ Paciente encontrado:');
    console.log(`   Nombre: ${patientData.nombre}`);
    console.log(`   RUT: ${patientData.rut}`);
    console.log(`   Ficha: ${patientData.ficha}`);
    console.log(`   ID: ${patientData.id || 'NO DEFINIDO'}`);
    console.log('');

    // Buscar notas por diferentes identificadores
    console.log('🔍 Buscando notas clínicas por diferentes identificadores:\n');

    // 1. Por firestoreId (el ID del documento)
    const notesByFirestoreId = await db.collection('clinicalNotes')
      .where('patientId', '==', targetPatientId)
      .get();
    console.log(`   Por firestoreId (${targetPatientId}): ${notesByFirestoreId.size} notas`);

    // 2. Por campo 'id' del paciente
    if (patientData.id) {
      const notesById = await db.collection('clinicalNotes')
        .where('patientId', '==', patientData.id)
        .get();
      console.log(`   Por campo id (${patientData.id}): ${notesById.size} notas`);
    }

    // 3. Por ficha
    if (patientData.ficha) {
      const notesByFicha = await db.collection('clinicalNotes')
        .where('patientId', '==', patientData.ficha)
        .get();
      console.log(`   Por ficha (${patientData.ficha}): ${notesByFicha.size} notas`);
    }

    // 4. Buscar en todas las notas si alguna menciona el nombre del paciente
    console.log('\n🔍 Buscando notas que puedan corresponder al paciente...');

    const allNotes = await db.collection('clinicalNotes').get();
    let possibleMatches = 0;

    allNotes.docs.forEach(doc => {
      const noteData = doc.data();
      const noteName = noteData.pacienteNombre || '';

      if (noteName.toLowerCase().includes('alberto') && noteName.toLowerCase().includes('guerrero')) {
        possibleMatches++;
        console.log(`   ✓ Posible coincidencia: ${doc.id}`);
        console.log(`     patientId en nota: ${noteData.patientId}`);
        console.log(`     pacienteNombre: ${noteName}`);
      }
    });

    console.log(`\n📊 Total de coincidencias posibles por nombre: ${possibleMatches}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

findPatientNotes()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
