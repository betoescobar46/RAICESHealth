import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "AIzaSyD_u3VMT7cWOkmOMLTfW7v0NeJjwkalAlI",
  projectId: "simorahealth"
});

const db = getFirestore(app);

const patientsSnap = await getDocs(collection(db, 'patients'));
const notesSnap = await getDocs(collection(db, 'clinicalNotes'));

console.log(`✅ Pacientes migrados: ${patientsSnap.size}`);
console.log(`✅ Notas clínicas migradas: ${notesSnap.size}`);

// Buscar pacientes con origen EXTRASISTEMA
const extrasistema = patientsSnap.docs.filter(d => d.data().origen === 'EXTRASISTEMA');
console.log(`✅ Pacientes EXTRASISTEMA: ${extrasistema.length}`);

process.exit(0);
