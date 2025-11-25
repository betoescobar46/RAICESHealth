/**
 * UserStorageService
 *
 * Servicio especializado para la gestión de usuarios en localStorage.
 * Responsabilidad única: CRUD de usuarios.
 */

import { User } from '../../src/types';

const STORAGE_KEY = 'rlp_users';

/**
 * Obtiene todos los usuarios del sistema
 * @returns Array de usuarios
 */
export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda el array completo de usuarios en localStorage
 * @param users - Array de usuarios a guardar
 */
export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/**
 * Busca un usuario por su username (RUT)
 * @param username - Username del usuario a buscar
 * @returns El usuario encontrado o null si no existe
 */
export function getUserByUsername(username: string): User | null {
  const users = getUsers();
  return users.find(u => u.username === username) || null;
}

/**
 * Actualiza los datos de un usuario existente
 * @param updatedUser - Usuario con datos actualizados
 */
export function updateUser(updatedUser: User): void {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
  }
}

/**
 * Agrega un nuevo usuario al sistema
 * @param user - Usuario a agregar
 */
export function addUser(user: User): void {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

/**
 * Elimina un usuario por su ID
 * @param userId - ID del usuario a eliminar
 */
export function deleteUser(userId: number): void {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== userId);
  saveUsers(filtered);
}
