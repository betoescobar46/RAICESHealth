/**
 * Utilidades para importar pacientes desde CSV o JSON
 */

import Papa from 'papaparse';
import { Patient } from '../types';
import FirebaseService from '../services/firebaseService';

/**
 * Genera un ID único para un paciente
 */
const generatePatientId = (): string => {
  return `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Crea un paciente con valores por defecto
 */
const createDefaultPatient = (partial: Partial<Patient>, ficha: number): Patient => {
  return {
    firestoreId: partial.firestoreId || generatePatientId(),
    ficha: partial.ficha || ficha,
    nombre: partial.nombre || '',
    rut: partial.rut || '',
    edad: partial.edad || 0,
    sexo: partial.sexo || 'Femenino',
    identidadGenero: partial.identidadGenero || 'No especificado',
    fechaNacimiento: partial.fechaNacimiento || '',
    direccion: partial.direccion || '',
    comuna: partial.comuna || '',
    lat: partial.lat || 0,
    lon: partial.lon || 0,
    telefonos: partial.telefonos || [],
    email: partial.email || '',
    tutor: partial.tutor || 'No aplica',
    ocupacion: partial.ocupacion || '',
    dispositivoAPS: partial.dispositivoAPS || '',
    alergias: partial.alergias || '',
    ram: partial.ram || '',
    objetivosTerapeuticos: partial.objetivosTerapeuticos || '',
    diagnostico: partial.diagnostico || {
      saludMental: '',
      morbilidadMedica: '',
      factoresPsicosociales: '',
    },
    farmacos: partial.farmacos || [],
    pensionDiscapacidad: partial.pensionDiscapacidad || false,
    credencialDiscapacidad: partial.credencialDiscapacidad || false,
    consumoActivoDrogas: partial.consumoActivoDrogas || false,
  };
};

/**
 * Importa pacientes desde un string CSV
 * @param csvContent Contenido del archivo CSV
 * @param replaceExisting Si es true, reemplaza todos los pacientes existentes. (NO IMPLEMENTADO EN FIREBASE POR SEGURIDAD)
 * @returns Número de pacientes importados
 */
export const importFromCSV = async (csvContent: string, replaceExisting: boolean = false): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Fetch existing patients to determine max ficha
      const existingPatients = await FirebaseService.getAllPatients();
      let maxFicha = existingPatients.length > 0 ? Math.max(...existingPatients.map(p => p.ficha || 0)) : 0;

      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const importedPatients: Patient[] = results.data.map((row: any) => {
              maxFicha++;
              // Parsear teléfonos
              let telefonos: string[] = [];
              if (row.telefonos) {
                telefonos = typeof row.telefonos === 'string'
                  ? row.telefonos.split(',').map((t: string) => t.trim())
                  : [row.telefonos];
              }

              // Parsear fármacos
              let farmacos: Array<{ nombre: string; dosis: string }> = [];
              if (row.farmacos) {
                farmacos = row.farmacos.split(',').map((f: string) => {
                  const [nombre, dosis] = f.split('|');
                  return { nombre: nombre?.trim() || '', dosis: dosis?.trim() || '' };
                });
              }

              return createDefaultPatient({
                nombre: row.nombre,
                rut: row.rut,
                edad: parseInt(row.edad) || 0,
                sexo: row.sexo === 'Masculino' ? 'Masculino' : 'Femenino',
                identidadGenero: row.identidadGenero,
                fechaNacimiento: row.fechaNacimiento,
                direccion: row.direccion,
                comuna: row.comuna,
                lat: parseFloat(row.lat) || 0,
                lon: parseFloat(row.lon) || 0,
                telefonos,
                email: row.email,
                tutor: row.tutor,
                ocupacion: row.ocupacion,
                dispositivoAPS: row.dispositivoAPS,
                alergias: row.alergias,
                ram: row.ram,
                objetivosTerapeuticos: row.objetivosTerapeuticos,
                diagnostico: {
                  saludMental: row.diagnostico_saludMental || '',
                  morbilidadMedica: row.diagnostico_morbilidadMedica || '',
                  factoresPsicosociales: row.diagnostico_factoresPsicosociales || '',
                },
                farmacos,
                pensionDiscapacidad: row.pensionDiscapacidad === 'true' || row.pensionDiscapacidad === true,
                credencialDiscapacidad: row.credencialDiscapacidad === 'true' || row.credencialDiscapacidad === true,
                consumoActivoDrogas: row.consumoActivoDrogas === 'true' || row.consumoActivoDrogas === true,
              }, maxFicha);
            });

            if (replaceExisting) {
              console.warn("replaceExisting no está soportado en modo online para evitar pérdida de datos masiva accidental.");
              // Si se requiere, implementar borrado masivo aquí.
            }

            await FirebaseService.batchCreatePatients(importedPatients);
            resolve(importedPatients.length);
          } catch (error) {
            reject(error);
          }
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Importa pacientes desde un array JSON
 * @param jsonContent Array de objetos de pacientes o string JSON
 * @param replaceExisting Si es true, reemplaza todos los pacientes existentes. (NO IMPLEMENTADO)
 * @returns Número de pacientes importados
 */
export const importFromJSON = async (jsonContent: string | Patient[], replaceExisting: boolean = false): Promise<number> => {
  try {
    const data = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;

    if (!Array.isArray(data)) {
      throw new Error('El JSON debe contener un array de pacientes');
    }

    // Fetch existing to calculate ficha
    const existingPatients = await FirebaseService.getAllPatients();
    let maxFicha = existingPatients.length > 0 ? Math.max(...existingPatients.map(p => p.ficha || 0)) : 0;

    const importedPatients: Patient[] = data.map((patientData: any) => {
      maxFicha++;
      return createDefaultPatient(patientData, maxFicha);
    });

    if (replaceExisting) {
      console.warn("replaceExisting no está soportado en modo online.");
    }

    await FirebaseService.batchCreatePatients(importedPatients);

    return importedPatients.length;
  } catch (error) {
    console.error('Error al importar desde JSON:', error);
    throw error;
  }
};

/**
 * Exporta todos los pacientes a formato CSV
 * @returns String CSV con todos los pacientes
 */
export const exportToCSV = async (): Promise<string> => {
  const patients = await FirebaseService.getAllPatients();

  const csvData = patients.map(p => ({
    nombre: p.nombre,
    rut: p.rut,
    edad: p.edad,
    sexo: p.sexo,
    identidadGenero: p.identidadGenero,
    fechaNacimiento: p.fechaNacimiento,
    direccion: p.direccion,
    comuna: p.comuna,
    lat: p.lat,
    lon: p.lon,
    telefonos: p.telefonos.join(', '),
    email: p.email,
    tutor: p.tutor,
    ocupacion: p.ocupacion,
    dispositivoAPS: p.dispositivoAPS,
    alergias: p.alergias,
    ram: p.ram,
    objetivosTerapeuticos: p.objetivosTerapeuticos,
    diagnostico_saludMental: p.diagnostico.saludMental,
    diagnostico_morbilidadMedica: p.diagnostico.morbilidadMedica,
    diagnostico_factoresPsicosociales: p.diagnostico.factoresPsicosociales,
    farmacos: p.farmacos.map(f => `${f.nombre}|${f.dosis}`).join(', '),
    pensionDiscapacidad: p.pensionDiscapacidad,
    credencialDiscapacidad: p.credencialDiscapacidad,
    consumoActivoDrogas: p.consumoActivoDrogas,
  }));

  return Papa.unparse(csvData);
};

/**
 * Exporta todos los pacientes a formato JSON
 * @returns String JSON con todos los pacientes
 */
export const exportToJSON = async (): Promise<string> => {
  const patients = await FirebaseService.getAllPatients();
  return JSON.stringify(patients, null, 2);
};

/**
 * Descarga un string como archivo
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Lee un archivo seleccionado por el usuario
 */
export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('No se pudo leer el archivo'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
