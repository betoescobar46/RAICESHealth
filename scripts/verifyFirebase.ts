
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, limit, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Configuración copiada de services/firebase.ts para asegurar ejecución standalone
const firebaseConfig = {
    apiKey: "AIzaSyD_u3VMT7cWOkmOMLTfW7v0NeJjwkalAlI",
    authDomain: "simorahealth.firebaseapp.com",
    projectId: "simorahealth",
    storageBucket: "simorahealth.firebasestorage.app",
    messagingSenderId: "360968687655",
    appId: "1:360968687655:web:d6fe9e58c840a819457e02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function verifySystem() {
    console.log('🔍 Iniciando verificación del sistema SIMORA Health (Firebase Mode)...');
    let allChecksPassed = true;

    try {
        // 0. Autenticarse como Admin
        console.log('\n0️⃣  Autenticando como administrador...');
        let userUid = '';
        try {
            const userCredential = await signInWithEmailAndPassword(auth, 'admin@simorahealth.cl', '123456');
            userUid = userCredential.user.uid;
            console.log('✅ Autenticación exitosa. UID:', userUid);
        } catch (e: any) {
            console.error('❌ Error de autenticación:', e.message);
            console.error('   Asegúrese de que el usuario admin@simorahealth.cl existe con contraseña 123456');
            process.exit(1);
        }

        // 1. Verificar documento de usuario en Firestore
        console.log('\n1️⃣  Verificando documento de usuario en Firestore...');
        try {
            const userDocRef = doc(db, 'users', userUid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('✅ Documento de usuario encontrado');
                console.log('   - Nombre:', userData.name);
                console.log('   - Rol:', userData.role);

                if (userData.role !== 'admin') {
                    console.error('❌ El usuario no tiene rol de admin');
                    allChecksPassed = false;
                }
            } else {
                console.error('❌ No se encontró el documento del usuario en Firestore');
                allChecksPassed = false;
            }
        } catch (e: any) {
            console.error('❌ Error leyendo documento de usuario:', e.message);
            allChecksPassed = false;
        }

        // 2. Verificar Configuración
        console.log('\n2️⃣  Verificando configuración del sistema...');
        try {
            const configDoc = await getDoc(doc(db, 'config', 'prestacionConfig'));
            if (configDoc.exists()) {
                console.log('✅ Configuración de prestaciones encontrada');
            } else {
                console.warn('⚠️  No se encontró configuración de prestaciones');
                allChecksPassed = false;
            }
        } catch (e: any) {
            console.error('❌ Error leyendo configuración:', e.message);
            allChecksPassed = false;
        }

        // 3. Verificar lista de prestaciones
        console.log('\n3️⃣  Verificando lista de prestaciones...');
        try {
            const prestacionesDoc = await getDoc(doc(db, 'config', 'allPrestaciones'));
            if (prestacionesDoc.exists()) {
                const data = prestacionesDoc.data();
                console.log('✅ Lista de prestaciones encontrada (' + (data?.values?.length || 0) + ' items)');
            } else {
                console.warn('⚠️  No se encontró lista de prestaciones');
            }
        } catch (e: any) {
            console.error('❌ Error leyendo prestaciones:', e.message);
        }

        // 4. Verificar lista de fármacos
        console.log('\n4️⃣  Verificando lista de fármacos...');
        try {
            const farmacosDoc = await getDoc(doc(db, 'config', 'farmacos'));
            if (farmacosDoc.exists()) {
                const data = farmacosDoc.data();
                console.log('✅ Lista de fármacos encontrada (' + (data?.values?.length || 0) + ' items)');
            } else {
                console.warn('⚠️  No se encontró lista de fármacos');
            }
        } catch (e: any) {
            console.error('❌ Error leyendo fármacos:', e.message);
        }

    } catch (error) {
        console.error('\n❌ Error fatal durante la verificación:', error);
        allChecksPassed = false;
    }

    console.log('\n==========================================');
    if (allChecksPassed) {
        console.log('✅ VERIFICACIÓN COMPLETADA: El sistema está operativo.');
        console.log('\n📝 Próximos pasos:');
        console.log('   1. Ejecutar: npm run dev');
        console.log('   2. Navegar a: http://localhost:5173');
        console.log('   3. Iniciar sesión con:');
        console.log('      - Email: admin@simorahealth.cl');
        console.log('      - Contraseña: 123456');
        console.log('\n⚠️  IMPORTANTE: Cambie la contraseña después del primer login');
    } else {
        console.log('❌ VERIFICACIÓN FALLIDA: Se encontraron problemas.');
        process.exit(1);
    }
    process.exit(0);
}

verifySystem();
