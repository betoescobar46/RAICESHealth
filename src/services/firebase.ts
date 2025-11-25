/**
 * Funciones de sincronización con Firebase para SIMORAHealth
 * Re-exporta funcionalidad necesaria desde el servicio principal
 */

import { collection, doc, setDoc, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { getCollectionName } from '../../config/tenant.config';

/**
 * Función para sincronizar datos de localStorage a Firestore
 * Esta función NO modifica localStorage, solo copia datos a Firebase
 */
export async function syncToFirebase(): Promise<{success: boolean, message: string, backupId?: string}> {
  if (!db) {
    throw new Error("Firebase no está configurado. Configure las credenciales en el archivo .env");
  }

  try {
    console.log("Iniciando sincronización con Firebase...");

    // Obtener todos los datos de localStorage
    const localData = {
      patients: localStorage.getItem('patients'),
      clinicalNotes: localStorage.getItem('clinicalNotes'),
      users: localStorage.getItem('users'),
      prestaciones: localStorage.getItem('prestaciones'),
      userRole: localStorage.getItem('userRole'),
      lastBackup: new Date().toISOString()
    };

    // Crear un documento de backup con timestamp
    const backupId = `backup_${Date.now()}`;
    const backupRef = doc(db, getCollectionName('backups'), backupId);

    // Guardar el backup completo
    await setDoc(backupRef, {
      ...localData,
      timestamp: new Date().toISOString(),
      deviceInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform
      }
    });

    // También guardar pacientes individualmente para consultas más eficientes
    if (localData.patients) {
      const patients = JSON.parse(localData.patients);
      for (const patient of patients) {
        const patientRef = doc(db, getCollectionName('patients'), patient.firestoreId || patient.id || String(patient.ficha));
        await setDoc(patientRef, {
          ...patient,
          lastSync: new Date().toISOString()
        });
      }
    }

    // Guardar notas clínicas individualmente
    if (localData.clinicalNotes) {
      const notes = JSON.parse(localData.clinicalNotes);
      for (const note of notes) {
        const noteRef = doc(db, getCollectionName('clinicalNotes'), note.id);
        await setDoc(noteRef, {
          ...note,
          lastSync: new Date().toISOString()
        });
      }
    }

    console.log("Sincronización con Firebase completada");
    return {
      success: true,
      message: `Backup ${backupId} creado exitosamente`,
      backupId
    };

  } catch (error) {
    console.error("Error al sincronizar con Firebase:", error);
    throw error;
  }
}

/**
 * Función para verificar la conexión con Firebase
 */
export async function testFirebaseConnection(): Promise<boolean> {
  if (!db) {
    return false;
  }

  try {
    // Intentar leer un documento de prueba
    const testQuery = query(collection(db, 'backups'), limit(1));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error("Error al verificar conexión con Firebase:", error);
    return false;
  }
}
