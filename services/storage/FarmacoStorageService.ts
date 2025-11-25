/**
 * FarmacoStorageService
 *
 * Servicio especializado para la gestión del catálogo de fármacos en localStorage.
 * Responsabilidad única: CRUD de fármacos del catálogo maestro.
 */

import { Farmaco } from '../../src/types';

const STORAGE_KEY = 'rlp_farmacos';

/**
 * Obtiene todos los fármacos del catálogo maestro
 * @returns Array de fármacos
 */
export function getFarmacos(): Farmaco[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda el array completo de fármacos en localStorage
 * @param farmacos - Array de fármacos a guardar
 */
export function saveFarmacos(farmacos: Farmaco[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farmacos));
}
