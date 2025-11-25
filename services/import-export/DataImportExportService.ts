/**
 * DataImportExportService
 *
 * Servicio especializado para importación y exportación de datos.
 * Responsabilidad única: Import/Export de datos en formato JSON.
 */

import { Patient, User, Prestacion, Farmaco, PrestacionConfig } from '../../src/types';
import { getUsers, saveUsers } from '../storage/UserStorageService';
import { getPatients, savePatients } from '../storage/PatientStorageService';
import { getPrestaciones, savePrestaciones } from '../storage/PrestacionStorageService';
import { getFarmacos, saveFarmacos } from '../storage/FarmacoStorageService';
import {
  getPrestacionConfig,
  savePrestacionConfig,
  getAllPrestaciones,
  saveAllPrestaciones
} from '../storage/ConfigStorageService';

/**
 * Importa pacientes desde un array (para migración desde CSV o JSON)
 * Asegura que cada paciente tenga un firestoreId único
 *
 * @param patients - Array de pacientes a importar
 */
export function importPatients(patients: Patient[]): void {
  // Asegurar que cada paciente tenga un firestoreId único
  const patientsWithIds = patients.map(p => ({
    ...p,
    firestoreId: p.firestoreId || `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }));
  savePatients(patientsWithIds);
}

/**
 * Exporta todos los datos del sistema a un objeto JSON
 * NOTA: Las contraseñas de usuarios NO se exportan por seguridad
 *
 * @returns String JSON con todos los datos del sistema
 */
export function exportAllData(): string {
  const data = {
    users: getUsers().map(u => ({ ...u, password: undefined })), // No exportar passwords
    patients: getPatients(),
    prestaciones: getPrestaciones(),
    farmacos: getFarmacos(),
    prestacionConfig: getPrestacionConfig(),
    allPrestaciones: getAllPrestaciones(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Importa todos los datos desde un JSON exportado
 *
 * @param jsonString - String JSON con datos a importar
 * @returns true si la importación fue exitosa, false si hubo error
 */
export function importAllData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);

    if (data.users) saveUsers(data.users);
    if (data.patients) savePatients(data.patients);
    if (data.prestaciones) savePrestaciones(data.prestaciones);
    if (data.farmacos) saveFarmacos(data.farmacos);
    if (data.prestacionConfig) savePrestacionConfig(data.prestacionConfig);
    if (data.allPrestaciones) saveAllPrestaciones(data.allPrestaciones);

    return true;
  } catch (error) {
    console.error('Error al importar datos:', error);
    return false;
  }
}

/**
 * Limpia TODOS los datos del sistema
 * USAR CON EXTREMA PRECAUCIÓN
 */
export function clearAllData(): void {
  const STORAGE_KEYS = [
    'rlp_users',
    'rlp_patients',
    'rlp_prestaciones',
    'rlp_farmacos',
    'rlp_prestacion_config',
    'rlp_all_prestaciones',
    'rlp_current_user',
    'rlp_session_token',
    'rlp_chats',
  ];

  STORAGE_KEYS.forEach(key => {
    localStorage.removeItem(key);
  });
}
