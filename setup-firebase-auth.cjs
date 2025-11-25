const admin = require('firebase-admin');
const serviceAccount = require('./raiceshealth-cl-service-account.json');

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'raiceshealth-cl'
});

async function setupAuthentication() {
  try {
    console.log('🔐 Configurando Firebase Authentication...');

    // Crear usuario admin inicial
    const userRecord = await admin.auth().createUser({
      email: 'admin@raiceshealth.cl',
      password: '123456',
      displayName: 'Administrador',
      emailVerified: true
    });

    console.log('✅ Usuario admin creado:');
    console.log('   Email: admin@raiceshealth.cl');
    console.log('   Password: 123456');
    console.log('   UID:', userRecord.uid);

    // Crear documento de usuario en Firestore
    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      id: 1,
      uid: userRecord.uid,
      username: '00001234-5',
      email: 'admin@raiceshealth.cl',
      name: 'Administrador',
      role: 'admin',
      title: 'Administrador del Sistema',
      failedLoginAttempts: 0,
      isLocked: false,
      lockoutUntil: null,
      centroAtencion: 'default',
      themeColor: 'blue',
      availableProfiles: [{
        id: 'profile-1',
        name: 'Perfil Administrador',
        centroAtencion: 'default',
        themeColor: 'blue',
        description: 'Perfil principal de administrador'
      }],
      currentProfileIndex: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Documento de usuario creado en Firestore');
    console.log('');
    console.log('🎉 Configuración completada!');
    console.log('');
    console.log('📋 Credenciales de acceso:');
    console.log('   Email: admin@raiceshealth.cl');
    console.log('   Contraseña: 123456');
    console.log('');
    console.log('⚠️  IMPORTANTE: Cambiar la contraseña después del primer login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupAuthentication();
