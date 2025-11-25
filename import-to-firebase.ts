import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { extractPatientData } from './utils/extractPatientData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_u3VMT7cWOkmOMLTfW7v0NeJjwkalAlI",
  authDomain: "simorahealth.firebaseapp.com",
  projectId: "simorahealth",
  storageBucket: "simorahealth.firebasestorage.app",
  messagingSenderId: "360968687655",
  appId: "1:360968687655:web:d6fe9e58c840a819457e02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface ImportedPatient {
  id: string;
  numeroFicha: string;
  nombre: string;
  origen: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  tags: string[];
  contenidoCompleto: string;
  evoluciones: any[];
  adjuntosReferencias: string[];
}

async function clearExistingPatients() {
  console.log('🗑️  Eliminando pacientes existentes...');
  const patientsRef = collection(db, 'patients');
  const snapshot = await getDocs(patientsRef);

  let deleted = 0;
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, 'patients', docSnap.id));
    deleted++;
  }

  console.log(`✓ ${deleted} pacientes eliminados`);
}

async function importPatients() {
  try {
    console.log('📂 Cargando archivo de pacientes...');
    const jsonPath = join(__dirname, 'data-migration', 'pacientes_completos.json');
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const importedPatients: ImportedPatient[] = JSON.parse(jsonContent);

    console.log(`📊 Encontrados ${importedPatients.length} pacientes para importar`);

    // Primero eliminar pacientes existentes
    await clearExistingPatients();

    console.log('📥 Importando pacientes a Firestore...');

    let imported = 0;
    const batchSize = 50;

    for (let i = 0; i < importedPatients.length; i += batchSize) {
      const batch = importedPatients.slice(i, i + batchSize);

      await Promise.all(batch.map(async (importedPatient) => {
        // Extraer datos estructurados del contenido narrativo
        const extractedData = extractPatientData(importedPatient.contenidoCompleto);

        const patient = {
          ficha: parseInt(importedPatient.numeroFicha) || Math.floor(Math.random() * 100000),
          nombre: importedPatient.nombre,
          rut: extractedData.rut,
          edad: extractedData.edad,
          sexo: extractedData.sexo,
          identidadGenero: '',
          fechaNacimiento: extractedData.fechaNacimiento,
          direccion: extractedData.direccion,
          comuna: extractedData.comuna,
          lat: -35.4264,
          lon: -71.6554,
          telefonos: extractedData.telefonos,
          email: extractedData.email,
          tutor: 'No aplica',
          ocupacion: extractedData.ocupacion,
          dispositivoAPS: '',
          alergias: extractedData.alergias,
          ram: '',
          objetivosTerapeuticos: '',
          diagnostico: extractedData.diagnostico,
          farmacos: extractedData.farmacos,
          pensionDiscapacidad: false,
          credencialDiscapacidad: false,
          consumoActivoDrogas: false,
          contenidoOriginal: importedPatient.contenidoCompleto,
          tags: importedPatient.tags || [],
          fechaCreacion: importedPatient.fechaCreacion,
          fechaActualizacion: importedPatient.fechaActualizacion,
          origen: importedPatient.origen
        };

        // Usar el ID original del JSON
        await setDoc(doc(db, 'patients', importedPatient.id), patient);
        imported++;

        if (imported % 10 === 0) {
          console.log(`  ⏳ Progreso: ${imported}/${importedPatients.length}`);
        }
      }));
    }

    console.log(`\n✅ Importación completada exitosamente!`);
    console.log(`   Total de pacientes importados: ${imported}`);

  } catch (error) {
    console.error('❌ Error en la importación:', error);
    process.exit(1);
  }
}

// Ejecutar importación
importPatients()
  .then(() => {
    console.log('\n🎉 Proceso completado. Los pacientes están ahora en Firestore.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
