import { STORAGE_KEYS, AUTOSAVE_CONFIG } from '../constants';
import { getMinutesAgo } from './dateUtils';

/**
 * Guarda datos en localStorage de forma segura
 * @param {string} key - Clave de almacenamiento
 * @param {any} data - Datos a guardar
 * @returns {boolean} true si se guardó exitosamente
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
    return false;
  }
};

/**
 * Recupera datos de localStorage de forma segura
 * @param {string} key - Clave de almacenamiento
 * @returns {any|null} Datos recuperados o null si falla
 */
export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error recuperando de localStorage:', error);
    return null;
  }
};

/**
 * Elimina datos de localStorage
 * @param {string} key - Clave a eliminar
 * @returns {boolean} true si se eliminó exitosamente
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error eliminando de localStorage:', error);
    return false;
  }
};

/**
 * Guarda datos de autosave con timestamp
 * @param {object} appState - Estado de la aplicación
 * @returns {boolean} true si se guardó exitosamente
 */
export const saveAutosave = (appState) => {
  const dataToSave = {
    ...appState,
    timestamp: new Date().toISOString()
  };

  // Solo guardar si hay datos relevantes
  if (!appState.fichaClinica && !appState.reportContent) {
    return false;
  }

  return saveToStorage(STORAGE_KEYS.AUTOSAVE, dataToSave);
};

/**
 * Recupera datos de autosave si no están muy viejos
 * @returns {object|null} Datos recuperados o null
 */
export const loadAutosave = () => {
  const savedData = getFromStorage(STORAGE_KEYS.AUTOSAVE);

  if (!savedData) {
    return null;
  }

  const minutesAgo = getMinutesAgo(savedData.timestamp);

  // Recuperar datos de hasta el tiempo máximo configurado
  if (minutesAgo < AUTOSAVE_CONFIG.MAX_AGE) {
    return {
      ...savedData,
      minutesAgo
    };
  }

  // Datos muy viejos, eliminarlos
  removeFromStorage(STORAGE_KEYS.AUTOSAVE);
  return null;
};

/**
 * Limpia todos los datos de autosave
 * @returns {boolean} true si se limpió exitosamente
 */
export const clearAutosave = () => {
  return removeFromStorage(STORAGE_KEYS.AUTOSAVE);
};
