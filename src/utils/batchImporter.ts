import { ClinicalNote, Patient } from '../../types';
import FirebaseService from '../../services/firebaseService';

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

interface ImportedClinicalNote {
  id: string;
  patientId: string;
  numeroFicha?: string;
  tipo: 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | 'OTRO';
  fecha: string;
  contenido: string;
  contenidoCompleto: string;
  profesional?: string;
  especialidad?: string;
  tags: string[];
  adjuntosReferencias: string[];
}

interface ImportResult {
  success: boolean;
  message: string;
  patientsImported: number;
  notesImported: number;
  errors?: string[];
}

/**
 * Importa notas clínicas desde un archivo JSON generado por la migración
 * @param jsonContent El contenido del archivo JSON como string
 * @returns Resultado de la importación
 */
export async function importClinicalNotesFromJSON(jsonContent: string): Promise<ImportResult> {
  const errors: string[] = [];
  let notesImported = 0;

  try {
    // Parsear el JSON
    const importedNotes: ImportedClinicalNote[] = JSON.parse(jsonContent);

    if (!Array.isArray(importedNotes)) {
      throw new Error('El archivo JSON debe contener un array de notas clínicas');
    }

    // Obtener notas existentes de Firebase
    const existingNotes = await FirebaseService.getAllClinicalNotes();
    const existingIds = new Set(existingNotes.map(note => note.id));

    const notesToCreate: any[] = [];

    // Procesar cada nota importada
    for (const importedNote of importedNotes) {
      try {
        // Validar campos requeridos
        if (!importedNote.id || !importedNote.patientId) {
          errors.push(`Nota sin ID o patientId válido`);
          continue;
        }

        // Skip si ya existe
        if (existingIds.has(importedNote.id)) {
          console.log(`Nota ${importedNote.id} ya existe, saltando...`);
          continue;
        }

        // Parsear fecha y hora
        const fechaParsed = new Date(importedNote.fecha);
        const fechaStr = fechaParsed.toISOString().split('T')[0]; // YYYY-MM-DD
        const horaStr = fechaParsed.toTimeString().slice(0, 5); // HH:mm

        // Crear la nota clínica en el formato esperado
        const clinicalNote: ClinicalNote = {
          id: importedNote.id,
          pacienteId: importedNote.patientId,
          fecha: fechaStr,
          hora: horaStr,
          profesional: importedNote.profesional || 'Dr. Sistema',
          titulo: `${importedNote.tipo || 'NOTA'} - ${fechaStr}`,
          contenido: importedNote.contenido || importedNote.contenidoCompleto?.substring(0, 500) || '',
          observacionesClinicamente: '',
          planTratamiento: '',
          timestamp: importedNote.fecha,
          // Nuevos campos opcionales
          tipo: importedNote.tipo,
          contenidoCompleto: importedNote.contenidoCompleto,
          adjuntosReferencias: importedNote.adjuntosReferencias,
          numeroFicha: importedNote.numeroFicha
        };

        notesToCreate.push(clinicalNote);
        notesImported++;

      } catch (noteError) {
        errors.push(`Error procesando nota: ${noteError}`);
      }
    }

    // Guardar todas las notas nuevas en Firebase
    if (notesToCreate.length > 0) {
      await FirebaseService.batchCreateClinicalNotes(notesToCreate);
    }

    return {
      success: true,
      message: `Importación completada: ${notesImported} notas importadas`,
      patientsImported: 0,
      notesImported,
      errors: errors.length > 0 ? errors : undefined
    };

  } catch (error) {
    return {
      success: false,
      message: `Error en la importación: ${error}`,
      patientsImported: 0,
      notesImported: 0,
      errors: [String(error)]
    };
  }
}

/**
 * Importa pacientes desde un archivo JSON generado por la migración
 * @param jsonContent El contenido del archivo JSON como string
 * @returns Resultado de la importación
 */
export async function importPatientsFromJSON(jsonContent: string): Promise<ImportResult> {
  const errors: string[] = [];
  let patientsImported = 0;

  try {
    // Parsear el JSON
    const importedPatients: ImportedPatient[] = JSON.parse(jsonContent);

    if (!Array.isArray(importedPatients)) {
      throw new Error('El archivo JSON debe contener un array de pacientes');
    }

    // Obtener pacientes existentes de Firebase
    const existingPatients = await FirebaseService.getAllPatients();
    const existingIds = new Set(existingPatients.map(p => p.firestoreId));

    const patientsToCreate: Patient[] = [];

    // Procesar cada paciente importado
    for (const importedPatient of importedPatients) {
      try {
        // Validar campos requeridos
        if (!importedPatient.id || !importedPatient.nombre) {
          errors.push(`Paciente sin ID o nombre válido`);
          continue;
        }

        // Skip si ya existe
        if (existingIds.has(importedPatient.id)) {
          console.log(`Paciente ${importedPatient.id} ya existe, saltando...`);
          continue;
        }

        // Crear el paciente con los campos mínimos necesarios
        const patient: Patient = {
          firestoreId: importedPatient.id,
          ficha: parseInt(importedPatient.numeroFicha) || Math.floor(Math.random() * 100000),
          nombre: importedPatient.nombre,
          rut: '', // Vacío ya que no está en los datos originales
          edad: 0, // Se calculará desde fechaNacimiento si está disponible
          sexo: 'Masculino' as const, // Default
          identidadGenero: '',
          fechaNacimiento: '2000-01-01', // Default
          direccion: '',
          comuna: '',
          lat: -35.4264,
          lon: -71.6554,
          telefonos: [],
          email: '',
          tutor: 'No aplica',
          ocupacion: '',
          dispositivoAPS: '',
          alergias: '',
          ram: '',
          objetivosTerapeuticos: '',
          diagnostico: {
            saludMental: '',
            morbilidadMedica: '',
            factoresPsicosociales: ''
          },
          farmacos: [],
          pensionDiscapacidad: false,
          credencialDiscapacidad: false,
          consumoActivoDrogas: false,
          // Campo adicional para preservar el contenido completo
          contenidoOriginal: importedPatient.contenidoCompleto
        };

        patientsToCreate.push(patient);
        patientsImported++;

      } catch (patientError) {
        errors.push(`Error procesando paciente: ${patientError}`);
      }
    }

    // Guardar todos los pacientes nuevos en Firebase
    if (patientsToCreate.length > 0) {
      await FirebaseService.batchCreatePatients(patientsToCreate);
    }

    return {
      success: true,
      message: `Importación completada: ${patientsImported} pacientes importados`,
      patientsImported,
      notesImported: 0,
      errors: errors.length > 0 ? errors : undefined
    };

  } catch (error) {
    return {
      success: false,
      message: `Error en la importación: ${error}`,
      patientsImported: 0,
      notesImported: 0,
      errors: [String(error)]
    };
  }
}

/**
 * Importa tanto pacientes como notas clínicas
 * @param patientsJson JSON de pacientes
 * @param notesJson JSON de notas clínicas
 * @returns Resultado combinado de la importación
 */
export async function importAll(patientsJson: string, notesJson: string): Promise<ImportResult> {
  // Primero importar pacientes
  const patientsResult = await importPatientsFromJSON(patientsJson);

  // Luego importar notas clínicas
  const notesResult = await importClinicalNotesFromJSON(notesJson);

  // Combinar resultados
  const allErrors = [
    ...(patientsResult.errors || []),
    ...(notesResult.errors || [])
  ];

  return {
    success: patientsResult.success && notesResult.success,
    message: `Pacientes: ${patientsResult.patientsImported} importados. Notas: ${notesResult.notesImported} importadas.`,
    patientsImported: patientsResult.patientsImported,
    notesImported: notesResult.notesImported,
    errors: allErrors.length > 0 ? allErrors : undefined
  };
}