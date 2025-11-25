/**
 * PatientStorageService
 *
 * Servicio especializado para la gestión de pacientes en localStorage.
 * Responsabilidad única: CRUD de pacientes.
 */

import { Patient } from '../../src/types';

const STORAGE_KEY = 'rlp_patients';

/**
 * Obtiene todos los pacientes del sistema
 * @returns Array de pacientes
 */
export function getPatients(): Patient[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda el array completo de pacientes en localStorage
 * @param patients - Array de pacientes a guardar
 */
export function savePatients(patients: Patient[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

/**
 * Busca un paciente por su ID de Firestore
 * @param id - firestoreId del paciente a buscar
 * @returns El paciente encontrado o null si no existe
 */
export function getPatientById(id: string): Patient | null {
  const patients = getPatients();
  return patients.find(p => p.firestoreId === id) || null;
}

/**
 * Agrega un nuevo paciente al sistema
 * Genera un firestoreId único si no existe
 *
 * @param patient - Paciente a agregar
 */
export function addPatient(patient: Patient): void {
  const patients = getPatients();
  // Generar un ID único si no tiene
  if (!patient.firestoreId) {
    patient.firestoreId = `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  patients.push(patient);
  savePatients(patients);
}

/**
 * Actualiza los datos de un paciente existente
 * @param updatedPatient - Paciente con datos actualizados
 */
export function updatePatient(updatedPatient: Patient): void {
  const patients = getPatients();
  const index = patients.findIndex(p => p.firestoreId === updatedPatient.firestoreId);
  if (index !== -1) {
    patients[index] = updatedPatient;
    savePatients(patients);
  }
}

/**
 * Elimina un paciente por su ID de Firestore
 * @param patientId - firestoreId del paciente a eliminar
 */
export function deletePatient(patientId: string): void {
  const patients = getPatients();
  const filtered = patients.filter(p => p.firestoreId !== patientId);
  savePatients(filtered);
}

/**
 * Elimina todos los pacientes del sistema
 * USAR CON PRECAUCIÓN
 */
export function clearAllPatients(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
