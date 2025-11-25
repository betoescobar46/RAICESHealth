const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

console.log('🔍 Conectando a proyecto:', serviceAccount.project_id);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log('\n📦 === VERIFICANDO DATOS EN', serviceAccount.project_id.toUpperCase(), '===\n');

Promise.all([
    db.collection('users').get(),
    db.collection('patients').get(),
    db.collection('patients_raices').get()
]).then(([users, patients, patientsRaices]) => {
    console.log('👥 Colección "users":', users.size, 'documentos');
    console.log('📋 Colección "patients":', patients.size, 'documentos');
    console.log('📋 Colección "patients_raices":', patientsRaices.size, 'documentos');

    // Verificar si existe el usuario admin
    console.log('\n🔍 Buscando usuario admin...');
    let foundAdmin = false;
    users.forEach(doc => {
        const data = doc.data();
        if (data.email === 'admin@raiceshealth.cl' || data.role === 'admin') {
            foundAdmin = true;
            console.log('✅ Usuario admin encontrado:');
            console.log('   Doc ID:', doc.id);
            console.log('   UID:', data.uid);
            console.log('   Email:', data.email);
            console.log('   Role:', data.role);
        }
    });

    if (foundAdmin === false) {
        console.log('❌ No se encontró usuario admin en', serviceAccount.project_id);
        console.log('\n💡 Necesitas crear el usuario admin en este proyecto');
    }

    process.exit(0);
}).catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
});
