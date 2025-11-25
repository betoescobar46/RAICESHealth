/**
 * PatientsContext
 *
 * Contexto global para gestión de pacientes.
 * Integrado con PatientStorageService de FASE 2 y Firebase.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Patient } from '../types';
import { db } from '../../services/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import * as PatientStorageService from '../../services/storage/PatientStorageService';
import { getCollectionName } from '../../config/tenant.config';

interface PatientsContextType {
  patients: Patient[];
  selectedPatient: Patient | null;
  isLoading: boolean;
  setSelectedPatient: (patient: Patient | null) => void;
  setSelectedPatientById: (patientId: string | null) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
  getPatientById: (id: string) => Patient | null;
  refreshPatients: () => Promise<void>;
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

interface PatientsProviderProps {
  children: ReactNode;
}

export const PatientsProvider: React.FC<PatientsProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Cargar pacientes desde Firebase
   */
  const loadPatientsFromFirebase = useCallback(async () => {
    try {
      const collectionName = getCollectionName('patients');
      console.log('📦 Cargando pacientes desde Firebase...');
      console.log('📂 Colección:', collectionName);
      setIsLoading(true);

      const patientsQuery = query(collection(db, collectionName));
      const querySnapshot = await getDocs(patientsQuery);

      console.log('✅ Query ejecutado. Documentos encontrados:', querySnapshot.size);

      const patientsFromFirebase: Patient[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          firestoreId: doc.id,
          ficha: data.ficha || 0,
          nombre: data.nombre || '',
          rut: data.rut || '00000000-0',
          edad: data.edad || 0,
          fechaNacimiento: data.fechaNacimiento || '',
          sexo: data.sexo || 'Masculino',
          email: data.email || '',
          telefonos: data.telefonos || [],
          direccion: data.direccion || '',
          comuna: data.comuna || '',
          lat: data.lat || 0,
          lon: data.lon || 0,
          tutor: data.tutor || 'No aplica',
          ocupacion: data.ocupacion || '',
          dispositivoAPS: data.dispositivoAPS || '',
          centroAtencion: data.centroAtencion || 'default',
          diagnostico: data.diagnostico || {
            saludMental: '',
            morbilidadMedica: '',
            factoresPsicosociales: ''
          },
          farmacos: data.farmacos || [],
          alergias: data.alergias || '',
          ram: data.ram || '',
          pensionDiscapacidad: data.pensionDiscapacidad || false,
          credencialDiscapacidad: data.credencialDiscapacidad || false,
          consumoActivoDrogas: data.consumoActivoDrogas || false,
          origen: data.origen || 'SISTEMA',
          isActive: data.isActive !== false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as Patient;
      });

      console.log(`✅ Cargados ${patientsFromFirebase.length} pacientes desde Firebase`);

      // Contar pacientes por origen
      const extrasistemaCount = patientsFromFirebase.filter(p => p.origen === 'EXTRASISTEMA').length;
      const cosamCount = patientsFromFirebase.filter(p => p.origen === 'COSAM').length;
      const sistemaCount = patientsFromFirebase.filter(p => p.origen === 'SISTEMA').length;

      console.log(`   📊 EXTRASISTEMA: ${extrasistemaCount}`);
      console.log(`   📊 COSAM: ${cosamCount}`);
      console.log(`   📊 SISTEMA: ${sistemaCount}`);

      console.log('💾 Guardando pacientes en estado:', patientsFromFirebase.length);
      setPatients(patientsFromFirebase);

      // Sincronizar con PatientStorageService para mantener compatibilidad
      PatientStorageService.savePatients(patientsFromFirebase);

      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error cargando pacientes desde Firebase:', error);
      setPatients([]);
      setIsLoading(false);
    }
  }, []);

  /**
   * Cargar pacientes al montar el componente
   */
  useEffect(() => {
    loadPatientsFromFirebase();
  }, [loadPatientsFromFirebase]);

  /**
   * Establecer paciente seleccionado por ID
   */
  const setSelectedPatientById = useCallback((patientId: string | null) => {
    if (patientId) {
      const patient = patients.find(p => p.firestoreId === patientId);
      setSelectedPatient(patient || null);
    } else {
      setSelectedPatient(null);
    }
  }, [patients]);

  /**
   * Agregar un nuevo paciente
   */
  const addPatient = useCallback((patient: Patient) => {
    PatientStorageService.addPatient(patient);
    setPatients(prev => [...prev, patient]);
    console.log('✅ Paciente agregado:', patient.nombre);
  }, []);

  /**
   * Actualizar un paciente existente
   */
  const updatePatient = useCallback((updatedPatient: Patient) => {
    PatientStorageService.updatePatient(updatedPatient);
    setPatients(prev =>
      prev.map(p => p.firestoreId === updatedPatient.firestoreId ? updatedPatient : p)
    );

    // Actualizar el paciente seleccionado si es el mismo
    if (selectedPatient?.firestoreId === updatedPatient.firestoreId) {
      setSelectedPatient(updatedPatient);
    }

    console.log('✅ Paciente actualizado:', updatedPatient.nombre);
  }, [selectedPatient]);

  /**
   * Eliminar un paciente
   */
  const deletePatient = useCallback((id: string) => {
    PatientStorageService.deletePatient(id);
    setPatients(prev => prev.filter(p => p.firestoreId !== id));

    // Limpiar selección si es el paciente eliminado
    if (selectedPatient?.firestoreId === id) {
      setSelectedPatient(null);
    }

    console.log('✅ Paciente eliminado:', id);
  }, [selectedPatient]);

  /**
   * Obtener un paciente por ID
   */
  const getPatientById = useCallback((id: string): Patient | null => {
    return patients.find(p => p.firestoreId === id) || null;
  }, [patients]);

  /**
   * Refrescar pacientes desde Firebase
   */
  const refreshPatients = useCallback(async () => {
    await loadPatientsFromFirebase();
  }, [loadPatientsFromFirebase]);

  const value: PatientsContextType = {
    patients,
    selectedPatient,
    isLoading,
    setSelectedPatient,
    setSelectedPatientById,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientById,
    refreshPatients
  };

  return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de pacientes
 */
export const usePatients = (): PatientsContextType => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error('usePatients must be used within PatientsProvider');
  }
  return context;
};
