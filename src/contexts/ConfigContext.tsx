/**
 * ConfigContext
 *
 * Contexto global para configuraciones del sistema.
 * Gestiona fármacos, usuarios, y otras configuraciones globales.
 * Integrado con FarmacoStorageService y ConfigStorageService de FASE 2.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Farmaco, User } from '../types';
import * as FarmacoStorageService from '../../services/storage/FarmacoStorageService';
import * as UserStorageService from '../../services/storage/UserStorageService';
import { INITIAL_FARMACOS } from '../../constants';

interface ConfigContextType {
  // Fármacos
  farmacos: Farmaco[];
  updateFarmacos: (farmacos: Farmaco[]) => void;
  addFarmaco: (farmaco: Farmaco) => void;
  deleteFarmaco: (id: string) => void;

  // Usuarios (gestión administrativa)
  allUsers: User[];
  updateUsers: (users: User[]) => void;
  getUserByUsername: (username: string) => User | null;

  // Notificaciones administrativas
  adminNotifications: string[];
  addNotification: (notification: string) => void;
  clearNotifications: () => void;

  // Estado de carga
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [farmacos, setFarmacos] = useState<Farmaco[]>(INITIAL_FARMACOS);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [adminNotifications, setAdminNotifications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Cargar configuraciones al montar el componente
   */
  useEffect(() => {
    try {
      console.log('📦 Cargando configuraciones del sistema...');

      // Cargar fármacos
      const loadedFarmacos = FarmacoStorageService.getFarmacos();
      if (loadedFarmacos.length > 0) {
        setFarmacos(loadedFarmacos);
      }

      // Cargar usuarios
      const loadedUsers = UserStorageService.getUsers();
      setAllUsers(loadedUsers);

      console.log(`✅ Configuraciones cargadas: ${loadedFarmacos.length} fármacos, ${loadedUsers.length} usuarios`);
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error cargando configuraciones:', error);
      setIsLoading(false);
    }
  }, []);

  /**
   * Actualizar fármacos
   */
  const updateFarmacos = useCallback((newFarmacos: Farmaco[]) => {
    FarmacoStorageService.saveFarmacos(newFarmacos);
    setFarmacos(newFarmacos);
    console.log('✅ Fármacos actualizados');
  }, []);

  /**
   * Agregar un nuevo fármaco
   */
  const addFarmaco = useCallback((farmaco: Farmaco) => {
    const updatedFarmacos = [...farmacos, farmaco];
    FarmacoStorageService.saveFarmacos(updatedFarmacos);
    setFarmacos(updatedFarmacos);
    console.log('✅ Fármaco agregado:', farmaco.nombre);
  }, [farmacos]);

  /**
   * Eliminar un fármaco
   */
  const deleteFarmaco = useCallback((id: string) => {
    const filtered = farmacos.filter(f => f.id !== id);
    FarmacoStorageService.saveFarmacos(filtered);
    setFarmacos(filtered);
    console.log('✅ Fármaco eliminado:', id);
  }, [farmacos]);

  /**
   * Actualizar usuarios
   */
  const updateUsers = useCallback((users: User[]) => {
    UserStorageService.saveUsers(users);
    setAllUsers(users);
    console.log('✅ Usuarios actualizados');
  }, []);

  /**
   * Obtener un usuario por username
   */
  const getUserByUsername = useCallback((username: string): User | null => {
    return UserStorageService.getUserByUsername(username);
  }, []);

  /**
   * Agregar una notificación administrativa
   */
  const addNotification = useCallback((notification: string) => {
    setAdminNotifications(prev => [notification, ...prev]);
    console.log('📢 Notificación agregada:', notification);
  }, []);

  /**
   * Limpiar notificaciones
   */
  const clearNotifications = useCallback(() => {
    setAdminNotifications([]);
    console.log('✅ Notificaciones limpiadas');
  }, []);

  const value: ConfigContextType = {
    farmacos,
    updateFarmacos,
    addFarmaco,
    deleteFarmaco,
    allUsers,
    updateUsers,
    getUserByUsername,
    adminNotifications,
    addNotification,
    clearNotifications,
    isLoading
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de configuración
 */
export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};
