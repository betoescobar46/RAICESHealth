import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getCountFromServer } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function countData() {
  console.log('📊 Contando documentos en Firestore...\n');

  try {
    const patientsCount = await getCountFromServer(collection(db, 'patients'));
    const usersCount = await getCountFromServer(collection(db, 'users'));
    const notesCount = await getCountFromServer(collection(db, 'clinicalNotes'));
    const prestacionesCount = await getCountFromServer(collection(db, 'prestaciones'));

    console.log('☁️  FIRESTORE:');
    console.log(`   Pacientes: ${patientsCount.data().count}`);
    console.log(`   Usuarios: ${usersCount.data().count}`);
    console.log(`   Notas Clínicas: ${notesCount.data().count}`);
    console.log(`   Prestaciones: ${prestacionesCount.data().count}`);
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

countData();
