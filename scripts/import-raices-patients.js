import admin from 'firebase-admin';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

// Inicializar Firebase Admin
console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

// Función para normalizar RUT chileno
function normalizeRut(rut) {
  if (!rut) return '';
  return rut.toString().trim().replace(/\./g, '').toUpperCase();
}

// Función para parsear fecha en formato DD/MM/YYYY chileno
function parseDate(dateString) {
  if (!dateString) return null;

  const cleanDate = dateString.trim();

  // Formato DD/MM/YYYY o DD-MM-YYYY - mantener formato chileno
  const parts = cleanDate.split(/[\/\-]/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${day}/${month}/${year}`;
  }

  return null;
}

// Función para calcular edad desde fecha de nacimiento en formato DD/MM/YYYY
function calculateAge(birthDate) {
  if (!birthDate) return null;

  // Convertir DD/MM/YYYY a formato Date válido
  const parts = birthDate.split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // JavaScript months are 0-indexed
  const year = parseInt(parts[2]);

  const birth = new Date(year, month, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Función para mapear sexo
function mapSexo(sexo) {
  if (!sexo) return 'Otro';
  const s = sexo.toString().trim().toUpperCase();
  if (s === 'M' || s === 'MASCULINO' || s === 'HOMBRE') return 'Masculino';
  if (s === 'F' || s === 'FEMENINO' || s === 'MUJER') return 'Femenino';
  return 'Otro';
}

// Función para obtener fecha actual en formato DD/MM/YYYY
function getCurrentDateChilean() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

// Función para crear objeto Patient desde fila CSV
function csvRowToPatient(row, index) {
  const fechaNacimiento = parseDate(row['F. NACIMIENTO']);
  const fechaIngreso = parseDate(row['F. INGRESO A CSMC']) || getCurrentDateChilean();
  const fechaAlta = parseDate(row['FECHA DE ALTA']);

  const patient = {
    // Identificación
    ficha: parseInt(row['Columna 1']) || (1000 + index),
    nombre: row['NOMBRE']?.trim() || '',
    apellidoPaterno: row['APELLIDO PATERNO']?.trim() || '',
    apellidoMaterno: row['APELLIDO MATERNO']?.trim() || '',
    rut: normalizeRut(row['RUN']),

    // Datos demográficos
    sexo: mapSexo(row['SEXO']),
    fechaNacimiento: fechaNacimiento || '',
    edad: parseInt(row['EDAD']) || (fechaNacimiento ? calculateAge(fechaNacimiento) : null),

    // Contacto
    direccion: row['DOMICILIO']?.trim() || '',
    telefono: row['CONTACTO']?.trim() || '',
    telefono2: row['CONTACTO 2']?.trim() || '',
    email: row['CORREO']?.trim() || '',

    // Ubicación (valores por defecto)
    latitude: 0,
    longitude: 0,

    // Datos clínicos
    diagnosticoPrincipal: row['DIAGNÓSTICO DE INGRESO']?.trim() || '',

    // Ejes diagnósticos
    diagnosticos: {
      ejeI: row['EJE I DIAGNÓSTICO']?.trim() || '',
      ejeII: row['EJE II DIAGNÓSTICO']?.trim() || '',
      ejeIII: row['EJE III DIAGNÓSTICO']?.trim() || '',
      ejeIV: row['EJE IV DIAGNÓSTICO']?.trim() || '',
      ejeV: '', // No presente en CSV
    },

    // Información administrativa
    fechaIngreso: fechaIngreso,
    fechaAlta: fechaAlta || null,
    activo: row['ACTIVO']?.toString().toUpperCase() === 'SI' || row['ACTIVO']?.toString() === '1',
    situacion: row['SITUACION']?.trim() || '',
    observaciones: row['OBSERVACIÓN']?.trim() || '',

    // Derivación y equipo
    derivadoDe: row['DERIVACIÓN']?.trim() || '',
    gestorTerapeutico: row['GESTOR TERAPEUTICO']?.trim() || '',
    psicologo: row['PSICOLOGO']?.trim() || '',
    trabajadorSocial: row['T. SOCIAL']?.trim() || '',
    terapeutaOcupacional: row['T.OCUPACIONAL']?.trim() || '',
    psiquiatra: row['PSIQUIATRA']?.trim() || '',

    // Tenant
    tenantId: 'raices',
    centroAtencion: 'cosam-raices',

    // Campos requeridos por sistema
    farmacos: [],
    notasCuidador: '',

    // Metadatos de importación
    importadoDesdeCSV: true,
    fechaImportacion: new Date().toISOString(),
  };

  return patient;
}

async function importPatients() {
  const csvPath = 'C:\\Users\\betoe\\OneDrive\\Escritorio\\LISTA USUARIOS ADULTOS CSMC RAICES 2025.xlsx - ADULTOS.csv';

  console.log('\n📂 Leyendo archivo CSV...');
  console.log(`   Ruta: ${csvPath}`);

  if (!fs.existsSync(csvPath)) {
    console.error('❌ Error: El archivo CSV no existe');
    process.exit(1);
  }

  const fileContent = fs.readFileSync(csvPath, 'utf8');

  console.log('\n🔍 Parseando CSV...');

  const parseResult = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    encoding: 'utf8'
  });

  if (parseResult.errors.length > 0) {
    console.warn('⚠️  Advertencias de parseo:');
    parseResult.errors.slice(0, 5).forEach(err => {
      console.warn(`   - Fila ${err.row}: ${err.message}`);
    });
  }

  const rows = parseResult.data;
  console.log(`✅ CSV parseado: ${rows.length} filas encontradas`);

  console.log('\n🔄 Transformando datos...');

  const patients = rows.map((row, index) => csvRowToPatient(row, index));

  console.log(`✅ ${patients.length} pacientes transformados`);

  // Mostrar estadísticas
  const activos = patients.filter(p => p.activo).length;
  const conRUT = patients.filter(p => p.rut).length;
  const conDiagnostico = patients.filter(p => p.diagnosticoPrincipal).length;

  console.log('\n📊 Estadísticas:');
  console.log(`   Total pacientes: ${patients.length}`);
  console.log(`   Activos: ${activos}`);
  console.log(`   Inactivos: ${patients.length - activos}`);
  console.log(`   Con RUT: ${conRUT}`);
  console.log(`   Con diagnóstico: ${conDiagnostico}`);

  // Mostrar muestra de los primeros 3 pacientes
  console.log('\n📋 Muestra de datos (primeros 3 pacientes):');
  patients.slice(0, 3).forEach((p, idx) => {
    console.log(`\n   Paciente ${idx + 1}:`);
    console.log(`   - Ficha: ${p.ficha}`);
    console.log(`   - Nombre: ${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`);
    console.log(`   - RUT: ${p.rut || 'Sin RUT'}`);
    console.log(`   - Activo: ${p.activo ? 'Sí' : 'No'}`);
    console.log(`   - Diagnóstico: ${p.diagnosticoPrincipal || 'Sin diagnóstico'}`);
  });

  // Confirmar antes de importar
  console.log('\n⚠️  ADVERTENCIA: Se importarán los datos a Firestore');
  console.log(`   Colección: patients_raices`);
  console.log(`   Total documentos: ${patients.length}`);

  // Importar a Firestore en lotes
  console.log('\n🔥 Importando a Firestore...');

  const batchSize = 499; // Límite de Firestore es 500
  const batches = Math.ceil(patients.length / batchSize);

  let imported = 0;
  let errors = 0;

  for (let i = 0; i < batches; i++) {
    const start = i * batchSize;
    const end = Math.min((i + 1) * batchSize, patients.length);
    const batchPatients = patients.slice(start, end);

    const batch = db.batch();

    batchPatients.forEach(patient => {
      const docRef = db.collection('patients_raices').doc();
      // Agregar firestoreId antes de guardar
      patient.firestoreId = docRef.id;
      batch.set(docRef, patient);
    });

    try {
      await batch.commit();
      imported += batchPatients.length;
      console.log(`   ✅ Lote ${i + 1}/${batches}: ${batchPatients.length} pacientes importados (${imported}/${patients.length})`);
    } catch (error) {
      errors += batchPatients.length;
      console.error(`   ❌ Error en lote ${i + 1}:`, error.message);
    }
  }

  console.log('\n🎉 Importación completada!');
  console.log(`   ✅ Importados: ${imported}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log(`   📊 Total: ${patients.length}`);

  console.log('\n🌐 Los pacientes están disponibles en:');
  console.log('   http://localhost:5177/');
  console.log('   Usuario: prueba@raiceshealth.local');
  console.log('   Password: 123456\n');
}

// Ejecutar importación
importPatients()
  .then(() => {
    console.log('✅ Script finalizado exitosamente');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
