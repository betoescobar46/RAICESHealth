/**
 * PrestacionStorageService
 *
 * Servicio especializado para la gestión de prestaciones en localStorage.
 * Responsabilidad única: CRUD de prestaciones.
 */

import { Prestacion } from '../../src/types';

const STORAGE_KEY = 'rlp_prestaciones';

/**
 * Obtiene todas las prestaciones del sistema
 * @returns Array de prestaciones
 */
export function getPrestaciones(): Prestacion[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda el array completo de prestaciones en localStorage
 * @param prestaciones - Array de prestaciones a guardar
 */
export function savePrestaciones(prestaciones: Prestacion[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prestaciones));
}

/**
 * Agrega una nueva prestación al sistema
 * Genera un ID único si no existe
 *
 * @param prestacion - Prestación a agregar
 */
export function addPrestacion(prestacion: Prestacion): void {
  const prestaciones = getPrestaciones();
  if (!prestacion.id) {
    prestacion.id = `prest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  prestaciones.push(prestacion);
  savePrestaciones(prestaciones);
}

/**
 * Obtiene todas las prestaciones de un paciente específico
 * @param patientId - ID del paciente
 * @returns Array de prestaciones del paciente
 */
export function getPrestacionesByPatient(patientId: string): Prestacion[] {
  const prestaciones = getPrestaciones();
  return prestaciones.filter(p => p.pacienteId === patientId);
}
