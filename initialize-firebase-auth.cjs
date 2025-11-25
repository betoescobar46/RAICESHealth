const https = require('https');
const { execSync } = require('child_process');

const PROJECT_ID = 'raiceshealth-cl';

async function initializeAuth() {
  try {
    console.log('🔐 Inicializando Firebase Authentication...');

    // Get access token
    const token = execSync('gcloud auth print-access-token').toString().trim();

    // Try to initialize by calling the accounts endpoint (this creates the default config)
    const options = {
      hostname: 'identitytoolkit.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/accounts:signUp?key=AIzaSyAwlSFrz-lbsaRFZZ6WNVClBrzkjCJbfNc`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const data = JSON.stringify({
      email: 'admin@raiceshealth.cl',
      password: '123456',
      returnSecureToken: true
    });

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('Response:', responseData);
        const response = JSON.parse(responseData);

        if (response.error) {
          console.error('❌ Error:', response.error.message);
          console.log('\n⚠️  Necesitas habilitar Authentication manualmente:');
          console.log('   1. Ve a: https://console.firebase.google.com/project/raiceshealth-cl/authentication');
          console.log('   2. Click en "Comenzar"');
          console.log('   3. Habilita "Correo electrónico/contraseña"');
          console.log('   4. Ejecuta este script de nuevo');
          process.exit(1);
        } else {
          console.log('✅ Usuario creado exitosamente!');
          console.log('   UID:', response.localId);
          console.log('   Email:', response.email);
          console.log('\n📋 Ahora crea el documento en Firestore con este UID');
          process.exit(0);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ Error en la petición:', e.message);
      process.exit(1);
    });

    req.write(data);
    req.end();

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initializeAuth();
