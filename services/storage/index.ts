/**
 * Storage Services - Barrel Export
 *
 * Facilita la importación de servicios de storage desde un solo punto.
 * Uso: import { getUsers, getPatients } from '../services/storage';
 */

// User Storage
export * from './UserStorageService';

// Patient Storage
export * from './PatientStorageService';

// Prestacion Storage
export * from './PrestacionStorageService';

// Farmaco Storage
export * from './FarmacoStorageService';

// Config Storage
export * from './ConfigStorageService';

// Chat Storage
export * from './ChatStorageService';
