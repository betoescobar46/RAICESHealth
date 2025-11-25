/**
 * Script de inicialización del sistema
 *
 * Este script crea un usuario administrador por defecto
 * para poder acceder al sistema por primera vez.
 *
 * Usuario por defecto:
 * RUT: 1234-5
 * Contraseña: 12345
 *
 * IMPORTANTE: Cambiar esta contraseña después del primer login.
 */

import { User } from './types';
import LocalStorageService from './services/LocalStorageService';
import { DEFAULT_PRESTACION_PERFIL_MAP, INITIAL_ALL_PRESTACIONES, INITIAL_FARMACOS } from './constants';

export const DEFAULT_ADMIN_USER: User = {
  id: 1,
  username: '1234-5',
  password: '12345',
  name: 'Administrador',
  role: 'admin',
  title: 'Administrador del Sistema',
  failedLoginAttempts: 0,
  isLocked: false,
  lockoutUntil: null,
};

/**
 * Inicializa el sistema con datos por defecto
 */
export const initializeSystem = () => {
  console.log('Inicializando sistema...');

  // Limpiar todos los datos existentes (pacientes de COSAM Maule)
  LocalStorageService.clearAllData();
  console.log('Datos anteriores limpiados.');

  // Crear usuario administrador por defecto
  LocalStorageService.initialize(
    [DEFAULT_ADMIN_USER],
    DEFAULT_PRESTACION_PERFIL_MAP,
    INITIAL_ALL_PRESTACIONES,
    INITIAL_FARMACOS
  );

  console.log('Sistema inicializado exitosamente.');
  console.log('Usuario administrador creado:');
  console.log('  RUT: 1234-5');
  console.log('  Contraseña: 12345');
  console.log('');
  console.log('IMPORTANTE: Cambiar esta contraseña después del primer login.');
};

/**
 * Verifica si el sistema necesita inicialización
 */
export const needsInitialization = (): boolean => {
  const users = LocalStorageService.getUsers();
  return users.length === 0;
};

// Si este archivo se ejecuta directamente (no como módulo)
if (typeof window !== 'undefined') {
  // Verificar si necesita inicialización
  if (needsInitialization()) {
    console.log('El sistema necesita inicialización.');
    console.log('Ejecute: initializeSystem() en la consola del navegador.');
  } else {
    console.log('El sistema ya está inicializado.');
  }
}
