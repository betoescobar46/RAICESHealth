import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Intentar inicializar Firebase Admin con credenciales
const serviceAccountPath = join(__dirname, '..', 'serviceAccountKey.json');

if (existsSync(serviceAccountPath)) {
  console.log('✅ Usando serviceAccountKey.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'simorahealth'
  });
} else {
  console.log('⚠️ No se encontró serviceAccountKey.json, usando Application Default Credentials');
  console.log('   Asegúrate de haber ejecutado: gcloud auth application-default login\n');

  admin.initializeApp({
    projectId: 'simorahealth'
  });
}

const auth = admin.auth();
const db = admin.firestore();

// Usuarios esenciales del sistema
const USERS = [
    // Humberto Escobar - Administrador
    {
        id: 1,
        username: '99999999-9',
        password: '123456',
        name: 'Humberto Escobar',
        role: 'ADMIN',
        title: 'Administrador',
        centroAtencion: 'default',
        themeColor: 'blue'
    },
    // Humberto Escobar - Psiquiatra con perfiles múltiples
    {
        id: 2,
        username: '17685576-2',
        password: '123456',
        name: 'Humberto Escobar',
        role: 'MEDICO',
        title: 'Psiquiatra Adultos',
        centroAtencion: 'cosam-maule',
        themeColor: 'purple',
        availableProfiles: [
            {
                id: 'cosam',
                name: 'COSAM Maule',
                centroAtencion: 'cosam-maule',
                themeColor: 'purple',
                description: 'Atención en COSAM Maule'
            },
            {
                id: 'extrasistema',
                name: 'Extrasistema',
                centroAtencion: 'extrasistema',
                themeColor: 'teal',
                description: 'Consulta privada / Extrasistema'
            }
        ],
        activeProfileId: 'cosam'
    },
    // Humberto Escobar - Usuario de estadísticas
    {
        id: 3,
        username: '88888888-8',
        password: '123456',
        name: 'Humberto Escobar (Estadísticas)',
        role: 'ADMIN',
        title: 'Estadísticas',
        centroAtencion: 'default',
        themeColor: 'green'
    },
    // Paula Hernandez - Psicóloga (acceso controlado)
    {
        id: 4,
        username: '16120432-3',
        password: '123456',
        name: 'Paula Hernandez',
        role: 'PSICOLOGO',
        title: 'Psicóloga',
        centroAtencion: 'default',
        themeColor: 'pink'
    }
];

console.log('🔄 INICIANDO MIGRACIÓN DE USUARIOS A FIREBASE AUTHENTICATION\n');
console.log('='.repeat(80));

async function migrateUsers() {
  let successCount = 0;
  let errorCount = 0;

  for (const user of USERS) {
    try {
      // Convertir RUT a email para Firebase Auth
      const email = `${user.username}@simorahealth.local`;

      console.log(`\n📝 Procesando: ${user.name} (${user.username})`);

      // Crear usuario en Firebase Authentication
      // Firebase requiere mínimo 6 caracteres
      const password = user.password === '1234' ? '123456' : user.password;

      const userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: user.name,
        disabled: false
      });

      console.log(`   ✅ Usuario creado en Auth: ${userRecord.uid}`);

      // Crear documento en colección 'users' con metadata
      const userData = {
        uid: userRecord.uid,
        rut: user.username,
        username: user.username,
        name: user.name,
        role: user.role,
        title: user.title,
        email: email,
        centroAtencion: user.centroAtencion || 'default',
        themeColor: user.themeColor || 'blue',
        availableProfiles: user.availableProfiles || [],
        activeProfileId: user.activeProfileId || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        requirePasswordChange: false // Cambiar a true si quieres forzar cambio de contraseña
      };

      await db.collection('users').doc(userRecord.uid).set(userData);

      console.log(`   ✅ Documento creado en Firestore`);
      console.log(`   📊 Role: ${user.role}`);

      successCount++;

    } catch (error) {
      console.error(`   ❌ Error migrando ${user.username}:`);

      if (error.code === 'auth/email-already-exists') {
        console.error(`   ⚠️ El usuario ya existe en Firebase Auth`);

        // Intentar actualizar el documento en Firestore
        try {
          const existingUser = await auth.getUserByEmail(`${user.username}@simorahealth.local`);

          const userData = {
            uid: existingUser.uid,
            rut: user.username,
            username: user.username,
            name: user.name,
            role: user.role,
            title: user.title,
            email: `${user.username}@simorahealth.local`,
            centroAtencion: user.centroAtencion || 'default',
            themeColor: user.themeColor || 'blue',
            availableProfiles: user.availableProfiles || [],
            activeProfileId: user.activeProfileId || null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          };

          await db.collection('users').doc(existingUser.uid).set(userData, { merge: true });
          console.log(`   ✅ Documento actualizado en Firestore`);
          successCount++;
        } catch (updateError) {
          console.error(`   ❌ Error actualizando Firestore:`, updateError.message);
          errorCount++;
        }
      } else {
        console.error(`   ❌ ${error.message}`);
        errorCount++;
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 RESUMEN DE MIGRACIÓN:`);
  console.log(`   ✅ Exitosos: ${successCount} usuarios`);
  console.log(`   ❌ Errores: ${errorCount} usuarios`);
  console.log(`   📈 Total procesados: ${USERS.length} usuarios`);

  if (successCount === USERS.length) {
    console.log('\n✅ MIGRACIÓN COMPLETADA CON ÉXITO');
  } else {
    console.log('\n⚠️ MIGRACIÓN COMPLETADA CON ALGUNOS ERRORES');
  }
}

// Ejecutar migración
migrateUsers()
  .then(() => {
    console.log('\n👋 Proceso finalizado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error fatal en la migración:', error);
    process.exit(1);
  });
