import admin from 'firebase-admin';

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

console.log('🔍 Verificando notas clínicas en Firebase...\n');

async function checkClinicalNotes() {
  try {
    // Contar total de notas
    const notesSnapshot = await db.collection('clinicalNotes').limit(10).get();

    console.log(`📊 Total de documentos en colección 'clinicalNotes': ${notesSnapshot.size}`);

    if (notesSnapshot.empty) {
      console.log('❌ No hay notas clínicas en Firebase');
      console.log('\n💡 Las notas clínicas NO fueron migradas a Firebase.');
      console.log('   Necesitas ejecutar un script de migración para las notas clínicas.');
    } else {
      console.log('\n✅ Primeras notas encontradas:\n');

      notesSnapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        console.log(`Nota ${index + 1}:`);
        console.log(`  ID: ${doc.id}`);
        console.log(`  patientId: ${data.patientId || data.pacienteId || 'NO DEFINIDO'}`);
        console.log(`  fecha: ${data.fecha || 'NO DEFINIDO'}`);
        console.log(`  titulo: ${data.titulo || 'NO DEFINIDO'}`);
        console.log('');
      });
    }

    // Verificar un paciente específico
    const samplePatientId = '3neR3UMfArki1K1Sz4PR';
    console.log(`\n🔍 Buscando notas para paciente ${samplePatientId}:`);

    const patientNotesSnapshot = await db.collection('clinicalNotes')
      .where('patientId', '==', samplePatientId)
      .get();

    console.log(`📋 Encontradas ${patientNotesSnapshot.size} notas para este paciente`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkClinicalNotes()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
