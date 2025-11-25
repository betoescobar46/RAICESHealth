/**
 * Script para limpiar certificados médicos que fueron importados incorrectamente como pacientes
 * Los certificados médicos no deberían aparecer en el índice de pacientes
 */

const fs = require('fs');
const path = require('path');

// Rutas de archivos
const PACIENTES_COMPLETOS_PATH = path.join(__dirname, '../data-migration/pacientes_completos.json');
const PROCESSED_PATIENTS_PATH = path.join(__dirname, '../public/processed-patients.json');
const PUBLIC_PACIENTES_PATH = path.join(__dirname, '../public/data-migration/pacientes_completos.json');

// Crear backup antes de modificar
function createBackup(filePath) {
  const backupPath = filePath.replace('.json', `.backup.${Date.now()}.json`);
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`✅ Backup creado: ${path.basename(backupPath)}`);
  }
}

// Función para verificar si un registro es un certificado médico
function isMedicalCertificate(record) {
  // Verificar si el nombre contiene "CERTIFICADO MÉDICO"
  if (record.nombre && record.nombre.includes('CERTIFICADO MÉDICO')) {
    return true;
  }

  // Verificar si el contenido completo contiene un certificado médico
  // (por si hay otros casos donde el nombre del paciente es real pero el contenido es un certificado)
  if (record.contenidoCompleto &&
      record.contenidoCompleto.includes('**CERTIFICADO MÉDICO**') &&
      record.origen === 'EXTRASISTEMA') {
    return true;
  }

  return false;
}

// Función principal de limpieza
function cleanMedicalCertificates() {
  console.log('🧹 Iniciando limpieza de certificados médicos...\n');

  let totalRemoved = 0;

  // 1. Limpiar data-migration/pacientes_completos.json
  if (fs.existsSync(PACIENTES_COMPLETOS_PATH)) {
    console.log('📄 Procesando: data-migration/pacientes_completos.json');
    createBackup(PACIENTES_COMPLETOS_PATH);

    const pacientesCompletos = JSON.parse(fs.readFileSync(PACIENTES_COMPLETOS_PATH, 'utf-8'));
    const originalCount = pacientesCompletos.length;

    const cleanedPacientes = pacientesCompletos.filter(p => !isMedicalCertificate(p));
    const removedCount = originalCount - cleanedPacientes.length;

    fs.writeFileSync(PACIENTES_COMPLETOS_PATH, JSON.stringify(cleanedPacientes, null, 2));
    console.log(`   ✅ Removidos: ${removedCount} certificados`);
    console.log(`   ✅ Pacientes válidos: ${cleanedPacientes.length}\n`);

    totalRemoved += removedCount;
  }

  // 2. Limpiar public/processed-patients.json
  if (fs.existsSync(PROCESSED_PATIENTS_PATH)) {
    console.log('📄 Procesando: public/processed-patients.json');
    createBackup(PROCESSED_PATIENTS_PATH);

    const processedPatients = JSON.parse(fs.readFileSync(PROCESSED_PATIENTS_PATH, 'utf-8'));
    const originalCount = processedPatients.length;

    const cleanedPatients = processedPatients.filter(p => !isMedicalCertificate(p));
    const removedCount = originalCount - cleanedPatients.length;

    fs.writeFileSync(PROCESSED_PATIENTS_PATH, JSON.stringify(cleanedPatients, null, 2));
    console.log(`   ✅ Removidos: ${removedCount} certificados`);
    console.log(`   ✅ Pacientes válidos: ${cleanedPatients.length}\n`);

    totalRemoved += removedCount;
  }

  // 3. Limpiar public/data-migration/pacientes_completos.json
  if (fs.existsSync(PUBLIC_PACIENTES_PATH)) {
    console.log('📄 Procesando: public/data-migration/pacientes_completos.json');
    createBackup(PUBLIC_PACIENTES_PATH);

    const publicPacientes = JSON.parse(fs.readFileSync(PUBLIC_PACIENTES_PATH, 'utf-8'));
    const originalCount = publicPacientes.length;

    const cleanedPublicPacientes = publicPacientes.filter(p => !isMedicalCertificate(p));
    const removedCount = originalCount - cleanedPublicPacientes.length;

    fs.writeFileSync(PUBLIC_PACIENTES_PATH, JSON.stringify(cleanedPublicPacientes, null, 2));
    console.log(`   ✅ Removidos: ${removedCount} certificados`);
    console.log(`   ✅ Pacientes válidos: ${cleanedPublicPacientes.length}\n`);

    totalRemoved += removedCount;
  }

  console.log('═══════════════════════════════════════════');
  console.log(`✨ Limpieza completada exitosamente`);
  console.log(`📊 Total de certificados removidos: ${totalRemoved}`);
  console.log('═══════════════════════════════════════════\n');

  // Listar los certificados removidos (para verificación)
  if (fs.existsSync(PACIENTES_COMPLETOS_PATH)) {
    const allRecords = JSON.parse(fs.readFileSync(PACIENTES_COMPLETOS_PATH + '.backup.' + fs.readdirSync(path.dirname(PACIENTES_COMPLETOS_PATH))
      .filter(f => f.includes('backup'))
      .sort()
      .pop()
      .split('.backup.')[1], 'utf-8'));

    const certificates = allRecords.filter(isMedicalCertificate);

    if (certificates.length > 0) {
      console.log('📋 Certificados removidos:');
      certificates.forEach((cert, idx) => {
        console.log(`   ${idx + 1}. ${cert.nombre} (RUT: ${cert.rut || 'N/A'})`);
      });
    }
  }
}

// Ejecutar el script
try {
  cleanMedicalCertificates();
} catch (error) {
  console.error('❌ Error durante la limpieza:', error.message);
  console.error(error.stack);
  process.exit(1);
}
