/**
 * ConfigStorageService
 *
 * Servicio especializado para la gestión de configuraciones del sistema en localStorage.
 * Responsabilidad única: Almacenamiento y recuperación de configuraciones.
 */

import { PrestacionConfig } from '../../src/types';

const STORAGE_KEYS = {
  PRESTACION_CONFIG: 'rlp_prestacion_config',
  ALL_PRESTACIONES: 'rlp_all_prestaciones',
} as const;

/**
 * Obtiene la configuración de prestaciones por perfil profesional
 * @returns Objeto de configuración o null si no existe
 */
export function getPrestacionConfig(): PrestacionConfig | null {
  const data = localStorage.getItem(STORAGE_KEYS.PRESTACION_CONFIG);
  return data ? JSON.parse(data) : null;
}

/**
 * Guarda la configuración de prestaciones
 * @param config - Configuración de prestaciones a guardar
 */
export function savePrestacionConfig(config: PrestacionConfig): void {
  localStorage.setItem(STORAGE_KEYS.PRESTACION_CONFIG, JSON.stringify(config));
}

/**
 * Obtiene la lista completa de tipos de prestaciones disponibles
 * @returns Array de nombres de prestaciones
 */
export function getAllPrestaciones(): string[] {
  const data = localStorage.getItem(STORAGE_KEYS.ALL_PRESTACIONES);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda la lista completa de tipos de prestaciones
 * @param prestaciones - Array de nombres de prestaciones
 */
export function saveAllPrestaciones(prestaciones: string[]): void {
  localStorage.setItem(STORAGE_KEYS.ALL_PRESTACIONES, JSON.stringify(prestaciones));
}
