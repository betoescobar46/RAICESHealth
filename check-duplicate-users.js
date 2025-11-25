/**
 * Script para verificar usuarios duplicados en Firestore
 *
 * EJECUTAR EN LA CONSOLA DEL NAVEGADOR (F12):
 * 1. Abre la app
 * 2. Inicia sesión como admin
 * 3. Presiona F12
 * 4. Pega este código en la consola
 */

console.log('🔍 === VERIFICAR USUARIOS DUPLICADOS ===\n');

(async () => {
    try {
        // Importar Firebase desde la app
        const { db } = await import('./services/firebase');
        const { collection, getDocs } = await import('firebase/firestore');

        console.log('📦 Cargando usuarios desde Firestore...\n');

        const usersSnapshot = await getDocs(collection(db, 'users'));
        const users = [];

        usersSnapshot.forEach(doc => {
            const userData = doc.data();
            users.push({
                docId: doc.id,
                uid: userData.uid,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                rut: userData.rut
            });
        });

        console.log(`✅ Total de documentos de usuarios: ${users.length}\n`);

        // Agrupar por UID
        const usersByUid = {};
        users.forEach(user => {
            const uid = user.uid || user.docId;
            if (!usersByUid[uid]) {
                usersByUid[uid] = [];
            }
            usersByUid[uid].push(user);
        });

        // Encontrar duplicados
        console.log('🔍 Buscando duplicados...\n');

        let foundDuplicates = false;

        Object.entries(usersByUid).forEach(([uid, userDocs]) => {
            if (userDocs.length > 1) {
                foundDuplicates = true;
                console.log(`⚠️ Usuario duplicado (UID: ${uid}):`);
                userDocs.forEach((user, index) => {
                    console.log(`   Documento ${index + 1}:`);
                    console.log(`      Doc ID: ${user.docId}`);
                    console.log(`      Email: ${user.email}`);
                    console.log(`      Nombre: ${user.name}`);
                    console.log(`      Role: ${user.role}`);
                    console.log(`      RUT: ${user.rut}`);
                });
                console.log('');
            }
        });

        if (!foundDuplicates) {
            console.log('✅ No se encontraron usuarios duplicados\n');
        }

        // Mostrar todos los usuarios
        console.log('📋 Todos los usuarios:\n');
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name}`);
            console.log(`   Doc ID: ${user.docId}`);
            console.log(`   UID: ${user.uid}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Role: ${user.role}`);
            console.log('');
        });

        // Verificar usuario actual
        const authModule = await import('./services/firebase');
        const currentUser = authModule.auth.currentUser;

        if (currentUser) {
            console.log('👤 Usuario actual autenticado:');
            console.log(`   UID: ${currentUser.uid}`);
            console.log(`   Email: ${currentUser.email}`);

            const currentUserDocs = users.filter(u =>
                u.uid === currentUser.uid || u.docId === currentUser.uid
            );

            console.log(`\n📄 Documentos encontrados para este usuario: ${currentUserDocs.length}`);

            if (currentUserDocs.length > 1) {
                console.log('\n⚠️ PROBLEMA: Tienes múltiples documentos en Firestore');
                console.log('💡 Solución: Debes eliminar los documentos duplicados');
                console.log('   Deja solo el documento donde docId === uid');
            } else if (currentUserDocs.length === 1) {
                const userDoc = currentUserDocs[0];
                console.log('\n✅ Documento del usuario:');
                console.log(`   Doc ID: ${userDoc.docId}`);
                console.log(`   Role: ${userDoc.role}`);

                if (userDoc.docId !== userDoc.uid) {
                    console.log('\n⚠️ ADVERTENCIA: El ID del documento no coincide con el UID');
                    console.log(`   Doc ID: ${userDoc.docId}`);
                    console.log(`   UID: ${userDoc.uid}`);
                    console.log('💡 Esto puede causar problemas con las reglas de Firestore');
                }

                if (userDoc.role !== 'admin') {
                    console.log('\n⚠️ El rol NO es "admin" (actual:', userDoc.role, ')');
                    console.log('💡 Ejecuta el script de corrección de rol');
                }
            } else {
                console.log('\n❌ No se encontró documento para el usuario actual');
                console.log('💡 Necesitas crear el documento de usuario');
            }
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
