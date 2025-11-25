import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  success: boolean;
  totalPatients: number;
  totalNotes: number;
  patientsWithoutNotes: string[];
  notesWithoutPatients: string[];
  invalidDates: string[];
  missingRequiredFields: string[];
  summary: string;
}

function validateMigration(): ValidationResult {
  console.log('🔍 Iniciando validación de migración...\n');

  const dataDir = 'C:\\Users\\betoe\\SIMORAHealth\\data-migration';

  const result: ValidationResult = {
    success: false,
    totalPatients: 0,
    totalNotes: 0,
    patientsWithoutNotes: [],
    notesWithoutPatients: [],
    invalidDates: [],
    missingRequiredFields: [],
    summary: ''
  };

  try {
    // 1. Verificar que existen los archivos generados
    const patientsFile = path.join(dataDir, 'pacientes_completos.json');
    const notesFile = path.join(dataDir, 'notas_clinicas_completas.json');
    const attachmentsFile = path.join(dataDir, 'adjuntos_referencias.json');

    if (!fs.existsSync(patientsFile)) {
      throw new Error('No se encuentra el archivo pacientes_completos.json');
    }
    if (!fs.existsSync(notesFile)) {
      throw new Error('No se encuentra el archivo notas_clinicas_completas.json');
    }

    // 2. Cargar los datos
    const patients = JSON.parse(fs.readFileSync(patientsFile, 'utf-8'));
    const notes = JSON.parse(fs.readFileSync(notesFile, 'utf-8'));
    const attachments = fs.existsSync(attachmentsFile)
      ? JSON.parse(fs.readFileSync(attachmentsFile, 'utf-8'))
      : [];

    result.totalPatients = patients.length;
    result.totalNotes = notes.length;

    console.log(`📊 Total de pacientes: ${result.totalPatients}`);
    console.log(`📝 Total de notas clínicas: ${result.totalNotes}`);
    console.log(`📎 Total de referencias a adjuntos: ${attachments.length}\n`);

    // 3. Validar integridad de pacientes
    const patientIds = new Set(patients.map((p: any) => p.id));

    for (const patient of patients) {
      // Verificar campos requeridos
      if (!patient.id || !patient.nombre) {
        result.missingRequiredFields.push(`Paciente sin ID o nombre: ${JSON.stringify(patient).substring(0, 100)}`);
      }

      // Verificar que el paciente tenga al menos una nota
      const patientNotes = notes.filter((n: any) => n.patientId === patient.id);
      if (patientNotes.length === 0) {
        result.patientsWithoutNotes.push(`${patient.nombre} (ID: ${patient.id})`);
      }
    }

    // 4. Validar integridad de notas
    for (const note of notes) {
      // Verificar campos requeridos
      if (!note.id || !note.patientId) {
        result.missingRequiredFields.push(`Nota sin ID o patientId: ${JSON.stringify(note).substring(0, 100)}`);
      }

      // Verificar que la nota tenga un paciente válido
      if (!patientIds.has(note.patientId)) {
        result.notesWithoutPatients.push(`Nota ${note.id} referencia a paciente inexistente: ${note.patientId}`);
      }

      // Validar formato de fecha
      if (note.fecha) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}/;
        if (!dateRegex.test(note.fecha)) {
          result.invalidDates.push(`Nota ${note.id}: fecha inválida ${note.fecha}`);
        }
      }
    }

    // 5. Generar estadísticas
    const notesPerPatient = result.totalNotes / result.totalPatients;
    const patientsWithNotes = result.totalPatients - result.patientsWithoutNotes.length;
    const percentageWithNotes = (patientsWithNotes / result.totalPatients * 100).toFixed(1);

    // 6. Determinar si la migración fue exitosa
    const expectedPatients = 219; // Según el prompt original
    const tolerancePercent = 0.1; // 10% de tolerancia
    const minExpected = Math.floor(expectedPatients * (1 - tolerancePercent));

    result.success = result.totalPatients >= minExpected &&
                     result.missingRequiredFields.length === 0 &&
                     result.notesWithoutPatients.length === 0;

    // 7. Generar resumen
    result.summary = `
RESUMEN DE VALIDACIÓN
======================
✅ Total de pacientes: ${result.totalPatients} (Esperados: ~${expectedPatients})
✅ Total de notas clínicas: ${result.totalNotes}
✅ Promedio de notas por paciente: ${notesPerPatient.toFixed(1)}
✅ Pacientes con notas: ${patientsWithNotes} (${percentageWithNotes}%)

PROBLEMAS ENCONTRADOS:
----------------------
${result.patientsWithoutNotes.length > 0 ? `⚠️ Pacientes sin notas: ${result.patientsWithoutNotes.length}` : '✅ Todos los pacientes tienen notas'}
${result.notesWithoutPatients.length > 0 ? `❌ Notas sin paciente válido: ${result.notesWithoutPatients.length}` : '✅ Todas las notas tienen paciente válido'}
${result.invalidDates.length > 0 ? `⚠️ Fechas inválidas: ${result.invalidDates.length}` : '✅ Todas las fechas son válidas'}
${result.missingRequiredFields.length > 0 ? `❌ Campos requeridos faltantes: ${result.missingRequiredFields.length}` : '✅ Todos los campos requeridos presentes'}

RESULTADO: ${result.success ? '✅ MIGRACIÓN EXITOSA' : '❌ MIGRACIÓN CON ERRORES'}
`;

    console.log(result.summary);

    // 8. Guardar reporte detallado
    const reportFile = path.join(dataDir, 'validation-report.txt');
    const detailedReport = `
REPORTE DETALLADO DE VALIDACIÓN
================================
Fecha: ${new Date().toISOString()}

${result.summary}

DETALLES DE PROBLEMAS:
----------------------

Pacientes sin notas (${result.patientsWithoutNotes.length}):
${result.patientsWithoutNotes.join('\n')}

Notas sin paciente válido (${result.notesWithoutPatients.length}):
${result.notesWithoutPatients.join('\n')}

Fechas inválidas (${result.invalidDates.length}):
${result.invalidDates.join('\n')}

Campos requeridos faltantes (${result.missingRequiredFields.length}):
${result.missingRequiredFields.join('\n')}
`;

    fs.writeFileSync(reportFile, detailedReport);
    console.log(`\n📄 Reporte detallado guardado en: ${reportFile}`);

  } catch (error) {
    console.error('❌ Error durante la validación:', error);
    result.summary = `Error crítico: ${error}`;
  }

  return result;
}

// Ejecutar validación
validateMigration();