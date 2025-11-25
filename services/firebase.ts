import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

export const firebaseConfig = {
  apiKey: "AIzaSyAwlSFrz-lbsaRFZZ6WNVClBrzkjCJbfNc",
  authDomain: "raiceshealth-cl.firebaseapp.com",
  projectId: "raiceshealth-cl",
  storageBucket: "raiceshealth-cl.firebasestorage.app",
  messagingSenderId: "1042815536328",
  appId: "1:1042815536328:web:3161f208642e5dfca3e9fd"
};

// Inicializar Firebase solo si no existe ya una instancia
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exportar instancias de auth, firestore y functions
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'us-central1');

export default app;
