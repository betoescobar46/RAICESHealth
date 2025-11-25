/**
 * PrestacionesContext
 *
 * Contexto global para gestión de prestaciones.
 * Integrado con PrestacionStorageService de FASE 2.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Prestacion, PrestacionConfig } from '../types';
import * as PrestacionStorageService from '../../services/storage/PrestacionStorageService';
import * as ConfigStorageService from '../../services/storage/ConfigStorageService';
import { DEFAULT_PRESTACION_PERFIL_MAP, INITIAL_ALL_PRESTACIONES } from '../../constants';

interface PrestacionesContextType {
  prestaciones: Prestacion[];
  prestacionConfig: PrestacionConfig;
  allPrestaciones: string[];
  isLoading: boolean;
  addPrestacion: (prestacion: Prestacion) => void;
  updatePrestacion: (prestacion: Prestacion) => void;
  deletePrestacion: (id: string) => void;
  getPrestacionesByPatient: (patientId: string) => Prestacion[];
  getPrestacionById: (id: string) => Prestacion | null;
  updatePrestacionConfig: (config: PrestacionConfig) => void;
  updateAllPrestaciones: (prestaciones: string[]) => void;
  refreshPrestaciones: () => void;
}

const PrestacionesContext = createContext<PrestacionesContextType | undefined>(undefined);

interface PrestacionesProviderProps {
  children: ReactNode;
}

export const PrestacionesProvider: React.FC<PrestacionesProviderProps> = ({ children }) => {
  const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
  const [prestacionConfig, setPrestacionConfig] = useState<PrestacionConfig>(DEFAULT_PRESTACION_PERFIL_MAP);
  const [allPrestaciones, setAllPrestaciones] = useState<string[]>(INITIAL_ALL_PRESTACIONES);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Cargar datos de prestaciones y configuración al montar
   */
  useEffect(() => {
    try {
      console.log('📦 Cargando prestaciones...');

      // Cargar prestaciones
      const loadedPrestaciones = PrestacionStorageService.getPrestaciones();
      setPrestaciones(loadedPrestaciones);

      // Cargar configuración de prestaciones
      const config = ConfigStorageService.getPrestacionConfig();
      if (config) {
        setPrestacionConfig(config);
      }

      // Cargar lista de todas las prestaciones disponibles
      const prestacionesList = ConfigStorageService.getAllPrestaciones();
      if (prestacionesList.length > 0) {
        setAllPrestaciones(prestacionesList);
      }

      console.log(`✅ Cargadas ${loadedPrestaciones.length} prestaciones`);
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error cargando prestaciones:', error);
      setIsLoading(false);
    }
  }, []);

  /**
   * Agregar una nueva prestación
   */
  const addPrestacion = useCallback((prestacion: Prestacion) => {
    PrestacionStorageService.addPrestacion(prestacion);
    setPrestaciones(prev => [...prev, prestacion]);
    console.log('✅ Prestación agregada:', prestacion.id);
  }, []);

  /**
   * Actualizar una prestación existente
   */
  const updatePrestacion = useCallback((updatedPrestacion: Prestacion) => {
    const allPrestaciones = PrestacionStorageService.getPrestaciones();
    const index = allPrestaciones.findIndex(p => p.id === updatedPrestacion.id);

    if (index !== -1) {
      allPrestaciones[index] = updatedPrestacion;
      PrestacionStorageService.savePrestaciones(allPrestaciones);
      setPrestaciones(allPrestaciones);
      console.log('✅ Prestación actualizada:', updatedPrestacion.id);
    }
  }, []);

  /**
   * Eliminar una prestación
   */
  const deletePrestacion = useCallback((id: string) => {
    const allPrestaciones = PrestacionStorageService.getPrestaciones();
    const filtered = allPrestaciones.filter(p => p.id !== id);
    PrestacionStorageService.savePrestaciones(filtered);
    setPrestaciones(filtered);
    console.log('✅ Prestación eliminada:', id);
  }, []);

  /**
   * Obtener todas las prestaciones de un paciente
   */
  const getPrestacionesByPatient = useCallback((patientId: string): Prestacion[] => {
    return prestaciones.filter(p => p.pacienteId === patientId);
  }, [prestaciones]);

  /**
   * Obtener una prestación por ID
   */
  const getPrestacionById = useCallback((id: string): Prestacion | null => {
    return prestaciones.find(p => p.id === id) || null;
  }, [prestaciones]);

  /**
   * Actualizar configuración de prestaciones
   */
  const updatePrestacionConfig = useCallback((config: PrestacionConfig) => {
    ConfigStorageService.savePrestacionConfig(config);
    setPrestacionConfig(config);
    console.log('✅ Configuración de prestaciones actualizada');
  }, []);

  /**
   * Actualizar lista de todas las prestaciones disponibles
   */
  const updateAllPrestaciones = useCallback((prestaciones: string[]) => {
    ConfigStorageService.saveAllPrestaciones(prestaciones);
    setAllPrestaciones(prestaciones);
    console.log('✅ Lista de prestaciones actualizada');
  }, []);

  /**
   * Refrescar prestaciones desde el storage
   */
  const refreshPrestaciones = useCallback(() => {
    const loadedPrestaciones = PrestacionStorageService.getPrestaciones();
    setPrestaciones(loadedPrestaciones);
    console.log('🔄 Prestaciones refrescadas');
  }, []);

  const value: PrestacionesContextType = {
    prestaciones,
    prestacionConfig,
    allPrestaciones,
    isLoading,
    addPrestacion,
    updatePrestacion,
    deletePrestacion,
    getPrestacionesByPatient,
    getPrestacionById,
    updatePrestacionConfig,
    updateAllPrestaciones,
    refreshPrestaciones
  };

  return <PrestacionesContext.Provider value={value}>{children}</PrestacionesContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de prestaciones
 */
export const usePrestaciones = (): PrestacionesContextType => {
  const context = useContext(PrestacionesContext);
  if (!context) {
    throw new Error('usePrestaciones must be used within PrestacionesProvider');
  }
  return context;
};
