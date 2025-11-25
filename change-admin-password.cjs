const admin = require('firebase-admin');
const serviceAccount = require('./raiceshealth-cl-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'raiceshealth-cl'
});

async function changePassword() {
  try {
    const newPassword = process.argv[2];

    if (!newPassword) {
      console.error('❌ Debes proporcionar la nueva contraseña como argumento');
      console.log('Uso: node change-admin-password.cjs <nueva-contraseña>');
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.error('❌ La contraseña debe tener al menos 6 caracteres');
      process.exit(1);
    }

    console.log('🔐 Cambiando contraseña del admin...');

    const user = await admin.auth().getUserByEmail('admin@raiceshealth.cl');

    await admin.auth().updateUser(user.uid, {
      password: newPassword
    });

    console.log('✅ Contraseña cambiada exitosamente!');
    console.log('');
    console.log('📋 Nuevas credenciales:');
    console.log('   Email: admin@raiceshealth.cl');
    console.log('   Nueva contraseña: ' + newPassword);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

changePassword();
