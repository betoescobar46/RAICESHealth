const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function listAndCleanUsers() {
    console.log('👥 === USUARIOS EN FIRESTORE ===\n');

    const usersSnapshot = await db.collection('users').get();

    console.log('Total documentos:', usersSnapshot.size);
    console.log('');

    const usersToDelete = [];

    usersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('---');
        console.log('Doc ID:', doc.id);
        console.log('Nombre:', data.name || '(VACÍO)');
        console.log('Email:', data.email || '(VACÍO)');
        console.log('RUT:', data.rut || '(VACÍO)');
        console.log('Role:', data.role || '(VACÍO)');

        // Marcar para eliminar si no tiene nombre o email
        const hasNoName = !data.name || data.name.trim() === '';
        const hasNoEmail = !data.email || data.email.trim() === '';

        if (hasNoName || hasNoEmail) {
            usersToDelete.push({ id: doc.id, name: data.name, email: data.email });
            console.log('⚠️ MARCADO PARA ELIMINAR (sin nombre o email)');
        }
    });

    console.log('\n---');
    console.log('📋 Usuarios a eliminar:', usersToDelete.length);

    if (usersToDelete.length > 0) {
        console.log('\n🗑️ Eliminando usuarios fantasma...');
        for (const user of usersToDelete) {
            await db.collection('users').doc(user.id).delete();
            console.log('   ✅ Eliminado:', user.id, '(nombre:', user.name || 'vacío', ')');
        }
        console.log('\n✅ Limpieza completada');
    } else {
        console.log('\n✅ No hay usuarios fantasma para eliminar');
    }

    process.exit(0);
}

listAndCleanUsers();
