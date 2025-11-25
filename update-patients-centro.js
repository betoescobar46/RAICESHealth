import admin from 'firebase-admin';

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

console.log('🔄 Actualizando centroAtencion de pacientes EXTRASISTEMA...\n');

async function updatePatients() {
  const patientsRef = db.collection('patients');
  const snapshot = await patientsRef.where('origen', '==', 'EXTRASISTEMA').get();
  
  console.log(`Encontrados ${snapshot.size} pacientes EXTRASISTEMA`);
  
  const batch = db.batch();
  let count = 0;
  
  snapshot.docs.forEach(doc => {
    batch.update(doc.ref, { centroAtencion: 'extrasistema' });
    count++;
  });
  
  await batch.commit();
  console.log(`✅ Actualizados ${count} pacientes con centroAtencion: 'extrasistema'`);
}

updatePatients()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
