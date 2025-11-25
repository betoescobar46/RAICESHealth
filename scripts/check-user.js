import admin from 'firebase-admin';

console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function checkUser() {
  const email = 'prueba@raiceshealth.local';

  console.log('\n🔍 Verificando usuario:', email);

  try {
    // Buscar en Firebase Auth
    const authUser = await admin.auth().getUserByEmail(email);
    console.log('\n✅ Usuario encontrado en Firebase Auth:');
    console.log('   UID:', authUser.uid);
    console.log('   Email:', authUser.email);
    console.log('   Display Name:', authUser.displayName);

    // Buscar documento en Firestore
    const userDoc = await db.collection('users').doc(authUser.uid).get();

    if (!userDoc.exists) {
      console.log('\n❌ ERROR: Usuario NO encontrado en Firestore collection users');
      console.log('   El usuario existe en Auth pero no tiene documento en Firestore');
      console.log('   Esto impedirá el login correcto');
    } else {
      console.log('\n✅ Usuario encontrado en Firestore:');
      const userData = userDoc.data();
      console.log('   UID:', userData.uid);
      console.log('   Email:', userData.email);
      console.log('   Nombre:', userData.name);
      console.log('   Rol:', userData.role);
      console.log('   TenantId:', userData.tenantId);
      console.log('   Centro:', userData.centroAtencion);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

checkUser()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
