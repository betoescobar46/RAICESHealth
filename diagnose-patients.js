/**
 * Script de diagnóstico para verificar por qué no aparecen pacientes
 *
 * Ejecutar en la consola del navegador (F12) cuando estés autenticado en la aplicación
 */

console.log('🔍 === DIAGNÓSTICO DE PACIENTES ===\n');

// 1. Verificar autenticación
const auth = window.firebase?.auth();
const currentFirebaseUser = auth?.currentUser;

if (!currentFirebaseUser) {
    console.error('❌ No hay usuario autenticado en Firebase');
    console.log('\n💡 Solución: Inicia sesión primero');
} else {
    console.log('✅ Usuario Firebase autenticado:', currentFirebaseUser.email);
    console.log('   UID:', currentFirebaseUser.uid);
}

// 2. Verificar metadata del usuario en Firestore
const db = window.firebase?.firestore();

if (db && currentFirebaseUser) {
    console.log('\n📋 Verificando metadata del usuario...');

    db.collection('users').doc(currentFirebaseUser.uid).get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                console.log('✅ Usuario encontrado en Firestore:');
                console.log('   Nombre:', userData.name);
                console.log('   Rol:', userData.role);
                console.log('   Centro atención:', userData.centroAtencion);
                console.log('   Perfiles disponibles:', userData.availableProfiles?.length || 0);
                console.log('   AllowedPatients:', userData.allowedPatients?.length || 0);

                if (userData.allowedPatients && userData.allowedPatients.length > 0) {
                    console.log('   👥 Pacientes permitidos:', userData.allowedPatients);
                }

                // Verificar perfiles
                if (userData.availableProfiles && userData.availableProfiles.length > 0) {
                    console.log('\n   📋 Perfiles:');
                    userData.availableProfiles.forEach(profile => {
                        console.log(`      - ${profile.name} (Centro: ${profile.centroAtencion})`);
                    });
                }
            } else {
                console.error('❌ Usuario no encontrado en Firestore');
                console.log('\n💡 Solución: Contacta al administrador para crear tu perfil');
            }
        })
        .catch(error => {
            console.error('❌ Error leyendo usuario:', error.message);
        });
}

// 3. Verificar pacientes en Firestore
console.log('\n📦 Verificando pacientes en Firestore...');

if (db) {
    db.collection('patients').limit(5).get()
        .then(snapshot => {
            console.log(`✅ Total de pacientes en Firestore: ${snapshot.size}`);

            if (snapshot.size === 0) {
                console.error('❌ No hay pacientes en la base de datos');
                console.log('\n💡 Solución: Importar pacientes usando los scripts de migración');
            } else {
                console.log('\n📋 Muestra de pacientes (primeros 5):');
                snapshot.forEach(doc => {
                    const patient = doc.data();
                    console.log(`   - ${patient.nombre} (RUT: ${patient.rut})`);
                    console.log(`     Centro: ${patient.centroAtencion || 'default'}, Origen: ${patient.origen || 'SISTEMA'}`);
                });
            }

            // Contar por centro de atención
            return db.collection('patients').get();
        })
        .then(allSnapshot => {
            const porCentro = {};
            allSnapshot.forEach(doc => {
                const centro = doc.data().centroAtencion || 'default';
                porCentro[centro] = (porCentro[centro] || 0) + 1;
            });

            console.log('\n📊 Pacientes por centro de atención:');
            Object.entries(porCentro).forEach(([centro, count]) => {
                console.log(`   ${centro}: ${count}`);
            });
        })
        .catch(error => {
            console.error('❌ Error leyendo pacientes:', error.message);
            if (error.code === 'permission-denied') {
                console.log('\n💡 Problema de permisos: Las reglas de Firestore pueden estar bloqueando el acceso');
                console.log('   Verifica firestore.rules');
            }
        });
}

// 4. Verificar estado de la aplicación React
console.log('\n⚛️ Verificando estado de React (si está disponible)...');
setTimeout(() => {
    // Intentar acceder al contexto de pacientes
    const appRoot = document.getElementById('root');
    if (appRoot) {
        console.log('✅ React app montada');
        console.log('\n💡 Abre React DevTools para inspeccionar:');
        console.log('   - PatientsContext.patients');
        console.log('   - useProfileManagement.accessiblePatients');
        console.log('   - App.patients');
    }
}, 2000);

console.log('\n✅ Diagnóstico completado');
console.log('\n📝 Próximos pasos:');
console.log('1. Revisa los errores arriba (❌)');
console.log('2. Abre la pestaña Network en DevTools para ver las peticiones a Firestore');
console.log('3. Revisa la consola para ver los logs de carga de pacientes (🔍)');
console.log('4. Ejecuta: localStorage.getItem("simora_patients") para ver si hay datos en cache');
