import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

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

console.log('📊 GENERANDO REPORTE DE VALIDACIÓN DE MIGRACIÓN\n');
console.log('='.repeat(80));

try {
  // Obtener todos los pacientes EXTRASISTEMA
  const q = query(collection(db, 'patients'), where('origen', '==', 'EXTRASISTEMA'));
  const patientsSnapshot = await getDocs(q);

  console.log(`\n✅ Total pacientes EXTRASISTEMA migrados: ${patientsSnapshot.size}`);

  // Obtener todas las notas clínicas
  const notesSnapshot = await getDocs(collection(db, 'clinicalNotes'));
  console.log(`✅ Total notas clínicas migradas: ${notesSnapshot.size}`);

  // Análisis de datos faltantes
  let pacientesSinRUT = 0;
  let pacientesSinEmail = 0;
  let pacientesSinTelefono = 0;
  let pacientesSinDiagnostico = 0;
  let pacientesConMultiplesNotas = 0;

  const pacientesConDatos = [];

  patientsSnapshot.docs.forEach(doc => {
    const data = doc.data();
    const patientInfo = {
      id: doc.id,
      nombre: data.nombre,
      rut: data.rut,
      edad: data.edad,
      email: data.email,
      telefonos: data.telefonos,
      diagnostico: data.diagnostico?.saludMental,
      farmacos: data.farmacos?.length || 0,
      archivoOrigen: data.archivoOrigenMd
    };

    if (!data.rut || data.rut === '00000000-0') pacientesSinRUT++;
    if (!data.email || data.email === 'sin-email@extrasistema.local') pacientesSinEmail++;
    if (!data.telefonos || data.telefonos.length === 0) pacientesSinTelefono++;
    if (!data.diagnostico?.saludMental) pacientesSinDiagnostico++;

    pacientesConDatos.push(patientInfo);
  });

  // Contar notas por paciente
  const notasPorPaciente = {};
  notesSnapshot.docs.forEach(doc => {
    const data = doc.data();
    if (notasPorPaciente[data.pacienteId]) {
      notasPorPaciente[data.pacienteId]++;
    } else {
      notasPorPaciente[data.pacienteId] = 1;
    }
  });

  Object.values(notasPorPaciente).forEach(count => {
    if (count > 1) pacientesConMultiplesNotas++;
  });

  console.log('\n📋 ANÁLISIS DE COMPLETITUD DE DATOS:');
  console.log(`   Pacientes sin RUT válido: ${pacientesSinRUT} (${((pacientesSinRUT / patientsSnapshot.size) * 100).toFixed(1)}%)`);
  console.log(`   Pacientes sin email: ${pacientesSinEmail} (${((pacientesSinEmail / patientsSnapshot.size) * 100).toFixed(1)}%)`);
  console.log(`   Pacientes sin teléfono: ${pacientesSinTelefono} (${((pacientesSinTelefono / patientsSnapshot.size) * 100).toFixed(1)}%)`);
  console.log(`   Pacientes sin diagnóstico: ${pacientesSinDiagnostico} (${((pacientesSinDiagnostico / patientsSnapshot.size) * 100).toFixed(1)}%)`);
  console.log(`   Pacientes con múltiples notas: ${pacientesConMultiplesNotas} (${((pacientesConMultiplesNotas / patientsSnapshot.size) * 100).toFixed(1)}%)`);

  // Top 10 pacientes con más notas
  const topPacientes = Object.entries(notasPorPaciente)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('\n📈 TOP 10 PACIENTES CON MÁS NOTAS CLÍNICAS:');
  for (const [pacienteId, count] of topPacientes) {
    const paciente = pacientesConDatos.find(p => p.id === pacienteId);
    if (paciente) {
      console.log(`   ${paciente.nombre}: ${count} notas`);
    }
  }

  // Generar archivo JSON con reporte detallado
  const reporte = {
    fecha: new Date().toISOString(),
    resumen: {
      totalPacientes: patientsSnapshot.size,
      totalNotas: notesSnapshot.size,
      pacientesSinRUT,
      pacientesSinEmail,
      pacientesSinTelefono,
      pacientesSinDiagnostico,
      pacientesConMultiplesNotas
    },
    pacientes: pacientesConDatos,
    notasPorPaciente
  };

  const reporteFileName = `reporte-migracion-${Date.now()}.json`;
  fs.writeFileSync(reporteFileName, JSON.stringify(reporte, null, 2));

  console.log(`\n📝 Reporte detallado guardado en: ${reporteFileName}`);
  console.log('\n' + '='.repeat(80));
  console.log('✅ VALIDACIÓN COMPLETADA');

} catch (error) {
  console.error('❌ Error generando reporte:', error);
  process.exit(1);
}

process.exit(0);
