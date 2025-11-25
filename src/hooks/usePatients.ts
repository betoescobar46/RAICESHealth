import { useState, useEffect, useCallback, useMemo } from 'react';
import { Patient } from '../../types';
import firebaseService from '../services/firebaseService';

interface UsePatientsOptions {
  autoLoad?: boolean;
  searchTerm?: string;
  sortBy?: 'nombre' | 'ficha' | 'fechaNacimiento';
  sortDirection?: 'asc' | 'desc';
}

interface UsePatientsReturn {
  patients: Patient[];
  loading: boolean;
  error: Error | null;
  refreshPatients: () => Promise<void>;
  searchPatients: (term: string) => void;
  updatePatient: (id: string, data: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  totalCount: number;
  filteredCount: number;
}

/**
 * Hook personalizado para gestionar pacientes
 * Proporciona funcionalidad de búsqueda, ordenamiento y operaciones CRUD
 */
export const usePatients = (options: UsePatientsOptions = {}): UsePatientsReturn => {
  const {
    autoLoad = true,
    searchTerm: initialSearchTerm = '',
    sortBy = 'nombre',
    sortDirection = 'asc'
  } = options;

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  /**
   * Carga todos los pacientes desde Firebase
   */
  const loadPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await firebaseService.getAllPatients();
      setPatients(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error al cargar pacientes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filtra pacientes según el término de búsqueda
   */
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;

    const term = searchTerm.toLowerCase().trim();
    return patients.filter(patient => {
      const searchableFields = [
        patient.nombre,
        patient.rut,
        patient.ficha,
        patient.comuna,
        patient.dispositivoAPS,
        patient.diagnostico?.saludMental,
        patient.diagnostico?.morbilidadMedica
      ];

      return searchableFields.some(field =>
        field?.toString().toLowerCase().includes(term)
      );
    });
  }, [patients, searchTerm]);

  /**
   * Ordena los pacientes filtrados
   */
  const sortedPatients = useMemo(() => {
    const sorted = [...filteredPatients];

    sorted.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'nombre':
          compareValue = a.nombre.localeCompare(b.nombre);
          break;
        case 'ficha':
          compareValue = parseInt(a.ficha) - parseInt(b.ficha);
          break;
        case 'fechaNacimiento':
          compareValue = new Date(a.fechaNacimiento).getTime() -
                        new Date(b.fechaNacimiento).getTime();
          break;
        default:
          compareValue = 0;
      }

      return sortDirection === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  }, [filteredPatients, sortBy, sortDirection]);

  /**
   * Actualiza los datos de un paciente
   */
  const updatePatient = useCallback(async (id: string, data: Partial<Patient>) => {
    try {
      await firebaseService.updatePatient(id, data);

      // Actualizar estado local para evitar recargar
      setPatients(prev => prev.map(p =>
        p.firestoreId === id ? { ...p, ...data } : p
      ));
    } catch (err) {
      console.error('Error al actualizar paciente:', err);
      throw err;
    }
  }, []);

  /**
   * Elimina un paciente
   */
  const deletePatient = useCallback(async (id: string) => {
    try {
      await firebaseService.deletePatient(id);

      // Actualizar estado local
      setPatients(prev => prev.filter(p => p.firestoreId !== id));
    } catch (err) {
      console.error('Error al eliminar paciente:', err);
      throw err;
    }
  }, []);

  /**
   * Actualiza el término de búsqueda
   */
  const searchPatients = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  /**
   * Refresca la lista de pacientes
   */
  const refreshPatients = useCallback(async () => {
    await loadPatients();
  }, [loadPatients]);

  // Cargar pacientes al montar el componente si autoLoad está habilitado
  useEffect(() => {
    if (autoLoad) {
      loadPatients();
    }
  }, [autoLoad, loadPatients]);

  return {
    patients: sortedPatients,
    loading,
    error,
    refreshPatients,
    searchPatients,
    updatePatient,
    deletePatient,
    totalCount: patients.length,
    filteredCount: sortedPatients.length
  };
};