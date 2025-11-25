/**
 * Script para verificar y corregir el rol del usuario admin
 *
 * EJECUTAR EN LA CONSOLA DEL NAVEGADOR (F12):
 *
 * 1. Abre la app en el navegador
 * 2. Inicia sesión como admin@raiceshealth.cl
 * 3. Presiona F12 para abrir DevTools
 * 4. Ve a la pestaña Console
 * 5. Escribe: allow pasting (si te lo pide)
 * 6. Copia y pega este código completo
 * 7. Presiona Enter
 */

console.log('🚀 === VERIFICACIÓN Y CORRECCIÓN DE USUARIO ADMIN ===\n');

// Obtener el módulo firebase importado en la app
(async () => {
    try {
        // Acceder a las instancias de Firebase ya cargadas
        const authModule = await import('./services/firebase');
        const { auth, db } = authModule;
        const firestoreModule = await import('firebase/firestore');
        const { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, limit, deleteField } = firestoreModule;

        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error('❌ No hay usuario autenticado');
            console.log('💡 Por favor inicia sesión primero');
            return;
        }

        console.log('✅ Usuario autenticado:', currentUser.email);
        console.log('   UID:', currentUser.uid);

        // Leer documento del usuario
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.error('❌ Tu documento de usuario no existe en Firestore');
            console.log('\n📝 Creando documento de usuario con rol admin...');

            const newUserData = {
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

            await setDoc(userRef, newUserData);
            console.log('✅ Usuario creado exitosamente');
            console.log('\n🔄 Recarga la página (F5)');
            return;
        }

        const userData = userSnap.data();
        console.log('\n📋 Datos actuales del usuario:');
        console.log('   Nombre:', userData.name);
        console.log('   Role:', userData.role);
        console.log('   Centro:', userData.centroAtencion);
        console.log('   Title:', userData.title);

        if (userData.allowedPatients) {
            console.log('   AllowedPatients:', userData.allowedPatients.length, 'pacientes');
        } else {
            console.log('   AllowedPatients: sin restricciones (correcto para admin)');
        }

        // Verificar si necesita correcciones
        const updates = {};
        let needsUpdate = false;

        if (userData.role !== 'admin') {
            console.log('\n⚠️ El rol NO es "admin" (actual:', userData.role, ')');
            updates.role = 'admin';
            needsUpdate = true;
        } else {
            console.log('\n✅ El rol es correcto: "admin"');
        }

        if (userData.allowedPatients) {
            console.log('⚠️ El admin tiene restricciones de allowedPatients (debería ver todos)');
            updates.allowedPatients = deleteField();
            needsUpdate = true;
        }

        if (userData.centroAtencion !== 'default') {
            console.log('⚠️ El centro no es "default" (actual:', userData.centroAtencion, ')');
            updates.centroAtencion = 'default';
            needsUpdate = true;
        }

        if (needsUpdate) {
            console.log('\n📝 Aplicando correcciones...');
            updates.updatedAt = new Date().toISOString();

            await updateDoc(userRef, updates);

            console.log('✅ Usuario actualizado correctamente');
            console.log('🔄 Recarga la página (F5) para aplicar cambios');
        } else {
            console.log('\n✅ El usuario está configurado correctamente');
        }

        // Verificar pacientes
        console.log('\n🔍 Verificando acceso a pacientes...');
        const patientsQuery = query(collection(db, 'patients'), limit(5));
        const patientsSnap = await getDocs(patientsQuery);

        console.log(`✅ Puedes leer ${patientsSnap.size} pacientes`);

        if (patientsSnap.size > 0) {
            console.log('📋 Muestra:');
            patientsSnap.forEach(doc => {
                const p = doc.data();
                console.log(`   - ${p.nombre} (${p.rut})`);
            });
        } else {
            console.log('⚠️ No hay pacientes en la base de datos');
            console.log('💡 Necesitas importar pacientes usando:');
            console.log('   npm run import:patients');
        }

    } catch (error) {
        console.error('\n❌ Error:', error);

        if (error.message?.includes('Cannot find module')) {
            console.log('\n💡 No se pudo importar el módulo Firebase.');
            console.log('   Este script debe ejecutarse en la página de la aplicación React.');
            console.log('   Asegúrate de:');
            console.log('   1. Estar en http://localhost:5173 (o donde corra tu app)');
            console.log('   2. Haber iniciado sesión');
            console.log('   3. Ejecutar este script en la consola de esa página');
        }
    }
})();
