/**
 * Script para corregir problemas de visibilidad de pacientes
 *
 * EJECUTAR EN LA CONSOLA DEL NAVEGADOR (F12) cuando estés autenticado
 */

const db = firebase.firestore();
const auth = firebase.auth();

console.log('🔧 === FIX: VISIBILIDAD DE PACIENTES ===\n');

// FIX 1: Verificar y actualizar rol de usuario
async function fixUserRole() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('❌ No estás autenticado');
        return;
    }

    console.log('🔍 Verificando rol de usuario...');

    const userDoc = await db.collection('users').doc(currentUser.uid).get();

    if (!userDoc.exists) {
        console.error('❌ Tu usuario no existe en Firestore');
        console.log('💡 Solución: Contacta al administrador para crear tu perfil');
        return;
    }

    const userData = userDoc.data();
    console.log('✅ Usuario encontrado:', userData.name);
    console.log('   Rol actual:', userData.role);

    // Verificar si el rol permite ver pacientes
    const allowedRoles = ['admin', 'medico', 'MEDICO', 'profesional', 'PROFESIONAL', 'psicologo', 'PSICOLOGO'];

    if (!allowedRoles.includes(userData.role)) {
        console.warn('⚠️ Tu rol no permite ver pacientes:', userData.role);
        console.log('💡 Roles permitidos:', allowedRoles.join(', '));
        return;
    }

    console.log('✅ Tu rol permite ver pacientes');

    // Verificar allowedPatients
    if (userData.allowedPatients && userData.allowedPatients.length === 0) {
        console.warn('⚠️ Tienes un array allowedPatients vacío');
        console.log('💡 Esto puede estar bloqueando el acceso');

        // Ofrecer remover allowedPatients para ver todos
        console.log('\n🔧 Para ver todos los pacientes, ejecuta:');
        console.log('   removeAllowedPatientsRestriction()');
    }
}

// FIX 2: Remover restricción de allowedPatients
async function removeAllowedPatientsRestriction() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('❌ No estás autenticado');
        return;
    }

    console.log('🔧 Removiendo restricción allowedPatients...');

    try {
        await db.collection('users').doc(currentUser.uid).update({
            allowedPatients: firebase.firestore.FieldValue.delete()
        });

        console.log('✅ Restricción removida. Recarga la página (F5)');
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('💡 Necesitas permisos de admin para hacer esto');
    }
}

// FIX 3: Verificar y corregir centroAtencion
async function fixCentroAtencion() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('❌ No estás autenticado');
        return;
    }

    console.log('🔍 Verificando centros de atención...');

    // Ver el centro del usuario
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();

    console.log('   Tu centro:', userData.centroAtencion);

    if (userData.availableProfiles && userData.availableProfiles.length > 0) {
        console.log('   Tus perfiles:');
        userData.availableProfiles.forEach(p => {
            console.log(`      - ${p.name}: ${p.centroAtencion}`);
        });
    }

    // Ver distribución de pacientes por centro
    const patientsSnapshot = await db.collection('patients').get();
    const porCentro = {};

    patientsSnapshot.forEach(doc => {
        const centro = doc.data().centroAtencion || 'default';
        porCentro[centro] = (porCentro[centro] || 0) + 1;
    });

    console.log('\n📊 Pacientes por centro:');
    Object.entries(porCentro).forEach(([centro, count]) => {
        console.log(`   ${centro}: ${count} pacientes`);
    });

    // Si el centro del usuario no coincide con ningún paciente
    const userCentro = userData.centroAtencion;
    if (userCentro && userCentro !== 'default' && !porCentro[userCentro]) {
        console.warn(`⚠️ No hay pacientes en tu centro: ${userCentro}`);
        console.log('💡 Para ver todos, cambia tu centro a "default"');
        console.log('   Ejecuta: changeCentroToDefault()');
    }
}

// FIX 4: Cambiar centro a default
async function changeCentroToDefault() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('❌ No estás autenticado');
        return;
    }

    console.log('🔧 Cambiando centro de atención a "default"...');

    try {
        await db.collection('users').doc(currentUser.uid).update({
            centroAtencion: 'default'
        });

        console.log('✅ Centro cambiado a "default". Recarga la página (F5)');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// FIX 5: Ver logs de filtrado (temporal)
function enableDetailedLogs() {
    console.log('🔍 Los logs de filtrado ya están activos en useProfileManagement');
    console.log('   Recarga la página (F5) y busca logs con 🔍 en la consola');
}

// Ejecutar diagnóstico
fixUserRole().then(() => {
    console.log('\n📋 Siguiente paso: Ejecuta fixCentroAtencion()');
});

// Exportar funciones globalmente para que el usuario las pueda llamar
window.removeAllowedPatientsRestriction = removeAllowedPatientsRestriction;
window.fixCentroAtencion = fixCentroAtencion;
window.changeCentroToDefault = changeCentroToDefault;
window.enableDetailedLogs = enableDetailedLogs;

console.log('\n✅ Funciones disponibles:');
console.log('   - removeAllowedPatientsRestriction()');
console.log('   - fixCentroAtencion()');
console.log('   - changeCentroToDefault()');
console.log('   - enableDetailedLogs()');
