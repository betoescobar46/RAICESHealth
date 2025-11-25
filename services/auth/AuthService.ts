/**
 * AuthService
 *
 * Servicio especializado para la autenticación y gestión de sesiones.
 * Responsabilidad única: Autenticación, sesiones, cambio de contraseña.
 */

import { User } from '../../src/types';
import { getUserByUsername, updateUser } from '../storage/UserStorageService';

const STORAGE_KEYS = {
  CURRENT_USER: 'rlp_current_user',
  SESSION_TOKEN: 'rlp_session_token',
} as const;

/**
 * Obtiene el usuario actualmente autenticado
 * @returns El usuario actual o null si no hay sesión activa
 */
export function getCurrentUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

/**
 * Establece el usuario actual y crea un token de sesión
 * @param user - Usuario a establecer como actual (null para cerrar sesión)
 */
export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    // Generar un token de sesión simple
    const token = btoa(`${user.username}:${Date.now()}`);
    localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
  }
}

/**
 * Verifica si existe una sesión válida
 * @returns true si existe un token de sesión válido
 */
export function isSessionValid(): boolean {
  return localStorage.getItem(STORAGE_KEYS.SESSION_TOKEN) !== null;
}

/**
 * Cierra la sesión del usuario actual
 */
export function logout(): void {
  setCurrentUser(null);
}

/**
 * Intenta autenticar un usuario con RUT y contraseña
 * Incluye lógica de bloqueo por intentos fallidos
 *
 * @param username - RUT del usuario
 * @param password - Contraseña del usuario
 * @returns Objeto con resultado de autenticación
 */
export function authenticate(
  username: string,
  password: string
): { success: boolean; user?: User; message?: string } {
  const user = getUserByUsername(username);

  if (!user) {
    return { success: false, message: 'Usuario no encontrado' };
  }

  // Verificar si la cuenta está bloqueada
  if (user.isLocked) {
    if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
      const remainingMinutes = Math.ceil((user.lockoutUntil - Date.now()) / 60000);
      return {
        success: false,
        message: `Cuenta bloqueada. Intente nuevamente en ${remainingMinutes} minutos.`
      };
    } else {
      // Desbloquear automáticamente si el tiempo expiró
      user.isLocked = false;
      user.lockoutUntil = null;
      user.failedLoginAttempts = 0;
      updateUser(user);
    }
  }

  // Verificar contraseña
  if (user.password !== password) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

    // Bloquear después de 5 intentos fallidos (15 minutos)
    if (user.failedLoginAttempts >= 5) {
      user.isLocked = true;
      user.lockoutUntil = Date.now() + (15 * 60 * 1000); // 15 minutos
      updateUser(user);
      return {
        success: false,
        message: 'Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.'
      };
    }

    updateUser(user);
    return {
      success: false,
      message: `Contraseña incorrecta. Intentos restantes: ${5 - user.failedLoginAttempts}`
    };
  }

  // Login exitoso - resetear intentos fallidos
  user.failedLoginAttempts = 0;
  updateUser(user);
  setCurrentUser(user);

  return { success: true, user };
}

/**
 * Cambia la contraseña de un usuario
 *
 * @param username - RUT del usuario
 * @param oldPassword - Contraseña actual
 * @param newPassword - Nueva contraseña
 * @returns Objeto con resultado de la operación
 */
export function changePassword(
  username: string,
  oldPassword: string,
  newPassword: string
): { success: boolean; message: string } {
  const result = authenticate(username, oldPassword);

  if (!result.success) {
    return { success: false, message: 'Contraseña actual incorrecta' };
  }

  const user = result.user!;
  user.password = newPassword;
  updateUser(user);

  return { success: true, message: 'Contraseña actualizada exitosamente' };
}
