/**
 * Script para ejecutar en la consola del navegador
 * Verifica y corrige el rol del usuario admin
 *
 * CÓMO USAR:
 * 1. Abre la aplicación en el navegador
 * 2. Inicia sesión con admin@raiceshealth.cl
 * 3. Abre la consola (F12)
 * 4. Copia y pega todo este script
 * 5. Presiona Enter
 */

(async function fixUserRole() {
    console.log('🚀 === FIX: PERMISOS DE USUARIO ===\n');

    // Importar las instancias de Firebase de la app
    const { auth, db } = await import('./services/firebase.ts');
    const { doc, getDoc, setDoc, updateDoc, collection, getDocs, deleteField, query, limit } = await import('firebase/firestore');

    try {
        // 1. Verificar usuario actual
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error('❌ No estás autenticado. Por favor inicia sesión primero.');
            return;
        }

        console.log('✅ Usuario autenticado:', currentUser.email);
        console.log('   UID:', currentUser.uid);

        // 2. Leer documento del usuario en Firestore
        console.log('\n🔍 Verificando documento en Firestore...');

        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.log('❌ Tu usuario no existe en Firestore');
            console.log('📝 Creando documento...\n');

            const newUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                name: 'Administrador',
                role: 'admin',
                username: 'admin',
                title: 'Administrador del Sistema',
                rut: '00000000-0',
                centroAtencion: 'default',
                themeColor: 'blue',
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                availableProfiles: [
                    {
                        id: 'profile-admin-default',
                        name: 'Perfil Administrador',
                        centroAtencion: 'default',
                        themeColor: 'blue'
                    }
                ],
                activeProfileId: 'profile-admin-default'
            };

            await setDoc(userRef, newUser);
            console.log('✅ Usuario creado con rol "admin"');
            console.log('\n🔄 Recarga la página (F5) para aplicar cambios');
            return;
        }

        const userData = userSnap.data();
        console.log('✅ Usuario encontrado en Firestore\n');
        console.log('📋 Datos actuales:');
        console.log('   Nombre:', userData.name);
        console.log('   Role:', userData.role);
        console.log('   Centro:', userData.centroAtencion);
        console.log('   AllowedPatients:', userData.allowedPatients?.length || 'sin restricciones');

        // 3. Verificar y corregir rol
        let needsUpdate = false;
        const updates = {};

        if (userData.role !== 'admin') {
            console.log('\n⚠️ El rol no es "admin" (es:', userData.role, ')');
            console.log('🔧 Se corregirá a "admin"');
            updates.role = 'admin';
            needsUpdate = true;
        }

        // 4. Verificar centro
        if (userData.centroAtencion && userData.centroAtencion !== 'default') {
            console.log(`\n⚠️ El centro no es "default" (es: ${userData.centroAtencion})`);
            console.log('🔧 Se cambiará a "default"');
            updates.centroAtencion = 'default';
            needsUpdate = true;
        }

        // 5. Remover allowedPatients si existe
        if (userData.allowedPatients) {
            console.log('\n⚠️ Tienes restricciones de allowedPatients');
            console.log('🔧 Se removerán las restricciones');
            updates.allowedPatients = deleteField();
            needsUpdate = true;
        }

        // 6. Aplicar cambios si es necesario
        if (needsUpdate) {
            console.log('\n📝 Aplicando correcciones...');
            updates.updatedAt = new Date().toISOString();

            await updateDoc(userRef, updates);

            console.log('✅ Usuario actualizado correctamente');
            console.log('\n🔄 Recarga la página (F5) para aplicar cambios');
        } else {
            console.log('\n✅ El usuario está configurado correctamente');
        }

        // 7. Verificar pacientes
        console.log('\n🔍 Verificando pacientes en Firestore...');

        try {
            const patientsQuery = query(collection(db, 'patients'), limit(5));
            const patientsSnap = await getDocs(patientsQuery);

            console.log(`📦 Pacientes encontrados: ${patientsSnap.size}`);

            if (patientsSnap.size === 0) {
                console.log('\n⚠️ No hay pacientes en la base de datos');
                console.log('💡 Necesitas importar pacientes');
            } else {
                console.log('\n📋 Muestra de pacientes:');
                patientsSnap.forEach(doc => {
                    const p = doc.data();
                    console.log(`   - ${p.nombre} (${p.rut})`);
                });

                if (!needsUpdate) {
                    console.log('\n❓ Si los pacientes aparecen aquí pero no en la UI:');
                    console.log('   - Verifica la consola de React DevTools');
                    console.log('   - Busca errores de filtrado en useProfileManagement');
                    console.log('   - Recarga la página (F5)');
                }
            }
        } catch (error) {
            console.error('\n❌ Error al leer pacientes:', error.message);

            if (error.code === 'permission-denied') {
                console.log('\n🔒 PROBLEMA DE PERMISOS DETECTADO');
                console.log('Las reglas de Firestore están bloqueando el acceso.');
                console.log('\n💡 Solución:');
                console.log('1. Copia el contenido de firestore.rules.temp-debug');
                console.log('2. Reemplaza firestore.rules temporalmente');
                console.log('3. Ejecuta: firebase deploy --only firestore:rules');
                console.log('4. Recarga la app y verifica que funcione');
                console.log('5. Restaura las reglas originales cuando termines');
            }
        }

    } catch (error) {
        console.error('\n❌ Error:', error);

        if (error.message.includes('import')) {
            console.log('\n💡 Este script debe ejecutarse en el contexto de la aplicación React.');
            console.log('   Asegúrate de estar en la página de la app.');
        }
    }
})();
