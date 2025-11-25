/**
 * Services - Barrel Export
 *
 * Exporta todos los servicios especializados desde un único punto de entrada.
 *
 * EJEMPLOS DE USO:
 *
 * // Import de servicios específicos
 * import { getCurrentUser, authenticate, logout } from '../services';
 * import { getPatients, addPatient } from '../services';
 *
 * // Import de categorías completas
 * import * as AuthService from '../services/auth';
 * import * as UserStorage from '../services/storage';
 */

// Auth Services
export * from './auth/AuthService';

// Storage Services
export * from './storage/UserStorageService';
export * from './storage/PatientStorageService';
export * from './storage/PrestacionStorageService';
export * from './storage/FarmacoStorageService';
export * from './storage/ConfigStorageService';
export * from './storage/ChatStorageService';

// Import/Export Services
export * from './import-export/DataImportExportService';

// Firebase Sync Services
export * from './sync/FirebaseSyncService';

// Re-export LocalStorageService (FACADE TEMPORAL - será eliminado)
export { LocalStorageService } from './LocalStorageService';
export { default } from './LocalStorageService';
