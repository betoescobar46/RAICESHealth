import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

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

// --- CONSTANTES COPIADAS PARA EVITAR PROBLEMAS DE IMPORTACIÓN ---

const DEFAULT_ADMIN_USER = {
    id: '1', // Changed to string for Firestore
    username: '1234-5',
    password: '12345',
    name: 'Administrador',
    role: 'admin',
    title: 'Administrador del Sistema',
    failedLoginAttempts: 0,
    isLocked: false,
    lockoutUntil: null,
};

const DEFAULT_PRESTACION_PERFIL_MAP = {
    'admin': ['Consulta Psiquiátrica', 'Psicoterapia', 'Evaluación', 'Control', 'Taller'],
    'profesional': ['Consulta Psiquiátrica', 'Psicoterapia', 'Evaluación', 'Control'],
    'estadistica': []
};

const INITIAL_ALL_PRESTACIONES = [
    'Consulta Psiquiátrica',
    'Psicoterapia',
    'Evaluación',
    'Control',
    'Taller',
    'Visita Domiciliaria',
    'Interconsulta'
];

const INITIAL_FARMACOS = [
    { nombre: 'Sertralina', dosis: '50mg' },
    { nombre: 'Sertralina', dosis: '100mg' },
    { nombre: 'Fluoxetina', dosis: '20mg' },
    { nombre: 'Escitalopram', dosis: '10mg' },
    { nombre: 'Escitalopram', dosis: '20mg' },
    { nombre: 'Paroxetina', dosis: '20mg' },
    { nombre: 'Venlafaxina', dosis: '75mg' },
    { nombre: 'Venlafaxina', dosis: '150mg' },
    { nombre: 'Duloxetina', dosis: '30mg' },
    { nombre: 'Duloxetina', dosis: '60mg' },
    { nombre: 'Bupropión', dosis: '150mg' },
    { nombre: 'Amitriptilina', dosis: '25mg' },
    { nombre: 'Clonazepam', dosis: '0.5mg' },
    { nombre: 'Clonazepam', dosis: '2mg' },
    { nombre: 'Clotiazepam', dosis: '5mg' },
    { nombre: 'Clotiazepam', dosis: '10mg' },
    { nombre: 'Alprazolam', dosis: '0.5mg' },
    { nombre: 'Lorazepam', dosis: '2mg' },
    { nombre: 'Diazepam', dosis: '10mg' },
    { nombre: 'Zolpidem', dosis: '10mg' },
    { nombre: 'Zopiclona', dosis: '7.5mg' },
    { nombre: 'Quetiapina', dosis: '25mg' },
    { nombre: 'Quetiapina', dosis: '100mg' },
    { nombre: 'Quetiapina', dosis: '200mg' },
    { nombre: 'Olanzapina', dosis: '5mg' },
    { nombre: 'Olanzapina', dosis: '10mg' },
    { nombre: 'Risperidona', dosis: '1mg' },
    { nombre: 'Risperidona', dosis: '3mg' },
    { nombre: 'Aripiprazol', dosis: '10mg' },
    { nombre: 'Aripiprazol', dosis: '15mg' },
    { nombre: 'Clozapina', dosis: '25mg' },
    { nombre: 'Clozapina', dosis: '100mg' },
    { nombre: 'Haloperidol', dosis: '1mg' },
    { nombre: 'Haloperidol', dosis: '5mg' },
    { nombre: 'Lamotrigina', dosis: '50mg' },
    { nombre: 'Lamotrigina', dosis: '100mg' },
    { nombre: 'Ácido Valproico', dosis: '250mg' },
    { nombre: 'Ácido Valproico', dosis: '500mg' },
    { nombre: 'Carbamazepina', dosis: '200mg' },
    { nombre: 'Litio', dosis: '300mg' },
    { nombre: 'Topiramato', dosis: '25mg' },
    { nombre: 'Topiramato', dosis: '50mg' },
    { nombre: 'Pregabalina', dosis: '75mg' },
    { nombre: 'Pregabalina', dosis: '150mg' },
    { nombre: 'Gabapentina', dosis: '300mg' },
    { nombre: 'Metilfenidato', dosis: '10mg' },
    { nombre: 'Metilfenidato', dosis: '20mg' },
    { nombre: 'Lisdexamfetamina', dosis: '30mg' },
    { nombre: 'Lisdexamfetamina', dosis: '50mg' },
    { nombre: 'Atomoxetina', dosis: '40mg' },
    { nombre: 'Disulfiram', dosis: '250mg' }
];

async function seedFirestore() {
    console.log('🚀 Iniciando carga de datos iniciales a Firestore...');

    try {
        // 0. Autenticarse como admin (el usuario debe existir en Auth)
        console.log('🔐 Autenticando como administrador...');
        try {
            await signInWithEmailAndPassword(auth, 'admin@simorahealth.cl', '123456');
            console.log('✅ Autenticación exitosa.');
        } catch (authError: any) {
            console.error('❌ Error de autenticación. Asegúrese de que el usuario admin@simorahealth.cl existe en Firebase Auth con contraseña 123456');
            console.error('   Puede crearlo en: https://console.firebase.google.com/project/simorahealth/authentication/users');
            throw authError;
        }

        // Obtener el UID del usuario autenticado
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error('No se pudo obtener el usuario autenticado');
        }

        // 1. Crear Usuario Admin en Firestore usando el UID de Auth
        console.log('👤 Creando documento de usuario administrador en Firestore...');
        await setDoc(doc(db, 'users', currentUser.uid), {
            ...DEFAULT_ADMIN_USER,
            uid: currentUser.uid,
            id: currentUser.uid,
            email: 'admin@simorahealth.cl',
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now()
        });
        console.log('✅ Usuario administrador creado.');

        // 2. Guardar Configuración de Prestaciones
        console.log('⚙️ Guardando configuración de prestaciones...');
        await setDoc(doc(db, 'config', 'prestacionConfig'), DEFAULT_PRESTACION_PERFIL_MAP);
        console.log('✅ Configuración de prestaciones guardada.');

        // 3. Guardar Lista de Prestaciones
        console.log('📋 Guardando lista de prestaciones...');
        await setDoc(doc(db, 'config', 'allPrestaciones'), { values: INITIAL_ALL_PRESTACIONES });
        console.log('✅ Lista de prestaciones guardada.');

        // 4. Guardar Lista de Fármacos
        console.log('💊 Guardando lista de fármacos...');
        await setDoc(doc(db, 'config', 'farmacos'), { values: INITIAL_FARMACOS });
        console.log('✅ Lista de fármacos guardada.');

        console.log('🎉 ¡Carga de datos completada exitosamente!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante la carga de datos:', error);
        process.exit(1);
    }
}

seedFirestore();
