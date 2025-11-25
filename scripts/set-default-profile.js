import admin from 'firebase-admin';

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

console.log('🔄 Configurando perfil predeterminado como Extrasistema...\n');

async function updateUserProfile() {
  // Buscar el usuario por RUT
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('rut', '==', '17685576-2').get();

  if (snapshot.empty) {
    console.log('❌ Usuario no encontrado');
    return;
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  console.log(`✅ Usuario encontrado: ${userData.name}`);
  console.log(`   Perfil actual: ${userData.activeProfileId || 'cosam'}`);

  // Actualizar el perfil activo a 'extrasistema'
  await userDoc.ref.update({
    activeProfileId: 'extrasistema',
    centroAtencion: 'extrasistema'
  });

  console.log('✅ Perfil predeterminado actualizado a: extrasistema');
}

updateUserProfile()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
