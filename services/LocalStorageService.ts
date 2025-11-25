/**
 * LocalStorageService (FACADE TEMPORAL)
 *
 * REFACTORIZADO: Este archivo ahora actúa como facade/wrapper temporal
 * que delega todas las operaciones a servicios especializados.
 *
 * ARQUITECTURA NUEVA:
 * - services/storage/UserStorageService.ts - Gestión de usuarios
 * - services/auth/AuthService.ts - Autenticación y sesiones
 * - services/storage/PatientStorageService.ts - Gestión de pacientes
 * - services/storage/PrestacionStorageService.ts - Gestión de prestaciones
 * - services/storage/FarmacoStorageService.ts - Gestión de fármacos
 * - services/storage/ConfigStorageService.ts - Configuraciones del sistema
 * - services/storage/ChatStorageService.ts - Conversaciones y mensajes
 * - services/import-export/DataImportExportService.ts - Import/Export de datos
 * - services/sync/FirebaseSyncService.ts - Sincronización Firebase
 *
 * PRÓXIMOS PASOS:
 * 1. Migrar componentes para importar directamente desde servicios especializados
 * 2. Una vez migrados, eliminar este facade
 *
 * Ver REFACTOR_NOTES.md para más detalles del refactoring.
 */

import { Patient, User, Prestacion, Farmaco, PrestacionConfig, ChatMessage, ChatConversation } from '../src/types';

// ==================== IMPORTS DE SERVICIOS ESPECIALIZADOS ====================
import * as UserStorage from './storage/UserStorageService';
import * as AuthService from './auth/AuthService';
import * as PatientStorage from './storage/PatientStorageService';
import * as PrestacionStorage from './storage/PrestacionStorageService';
import * as FarmacoStorage from './storage/FarmacoStorageService';
import * as ConfigStorage from './storage/ConfigStorageService';
import * as ChatStorage from './storage/ChatStorageService';
import * as DataImportExport from './import-export/DataImportExportService';
import * as FirebaseSync from './sync/FirebaseSyncService';

// ==================== CONSTANTES (DEPRECADAS - mantener para compatibilidad) ====================
const STORAGE_KEYS = {
  USERS: 'rlp_users',
  PATIENTS: 'rlp_patients',
  PRESTACIONES: 'rlp_prestaciones',
  FARMACOS: 'rlp_farmacos',
  PRESTACION_CONFIG: 'rlp_prestacion_config',
  ALL_PRESTACIONES: 'rlp_all_prestaciones',
  CURRENT_USER: 'rlp_current_user',
  SESSION_TOKEN: 'rlp_session_token',
  CHATS: 'rlp_chats',
} as const;

export class LocalStorageService {

  // ==================== USUARIOS (delegado a UserStorageService) ====================

  static getUsers(): User[] {
    return UserStorage.getUsers();
  }

  static saveUsers(users: User[]): void {
    UserStorage.saveUsers(users);
  }

  static getUserByUsername(username: string): User | null {
    return UserStorage.getUserByUsername(username);
  }

  static updateUser(updatedUser: User): void {
    UserStorage.updateUser(updatedUser);
  }

  static addUser(user: User): void {
    UserStorage.addUser(user);
  }

  static deleteUser(userId: number): void {
    UserStorage.deleteUser(userId);
  }

  // ==================== AUTENTICACIÓN (delegado a AuthService) ====================

  static getCurrentUser(): User | null {
    return AuthService.getCurrentUser();
  }

  static setCurrentUser(user: User | null): void {
    AuthService.setCurrentUser(user);
  }

  static isSessionValid(): boolean {
    return AuthService.isSessionValid();
  }

  static logout(): void {
    AuthService.logout();
  }

  static authenticate(username: string, password: string): { success: boolean; user?: User; message?: string } {
    return AuthService.authenticate(username, password);
  }

  static changePassword(username: string, oldPassword: string, newPassword: string): { success: boolean; message: string } {
    return AuthService.changePassword(username, oldPassword, newPassword);
  }

  // ==================== PACIENTES (delegado a PatientStorageService) ====================

  static getPatients(): Patient[] {
    return PatientStorage.getPatients();
  }

  static savePatients(patients: Patient[]): void {
    PatientStorage.savePatients(patients);
  }

  static getPatientById(id: string): Patient | null {
    return PatientStorage.getPatientById(id);
  }

  static addPatient(patient: Patient): void {
    PatientStorage.addPatient(patient);
  }

  static updatePatient(updatedPatient: Patient): void {
    PatientStorage.updatePatient(updatedPatient);
  }

  static deletePatient(patientId: string): void {
    PatientStorage.deletePatient(patientId);
  }

  static clearAllPatients(): void {
    PatientStorage.clearAllPatients();
  }

  // ==================== PRESTACIONES (delegado a PrestacionStorageService) ====================

  static getPrestaciones(): Prestacion[] {
    return PrestacionStorage.getPrestaciones();
  }

  static savePrestaciones(prestaciones: Prestacion[]): void {
    PrestacionStorage.savePrestaciones(prestaciones);
  }

  static addPrestacion(prestacion: Prestacion): void {
    PrestacionStorage.addPrestacion(prestacion);
  }

  static getPrestacionesByPatient(patientId: string): Prestacion[] {
    return PrestacionStorage.getPrestacionesByPatient(patientId);
  }

  // ==================== FÁRMACOS (delegado a FarmacoStorageService) ====================

  static getFarmacos(): Farmaco[] {
    return FarmacoStorage.getFarmacos();
  }

  static saveFarmacos(farmacos: Farmaco[]): void {
    FarmacoStorage.saveFarmacos(farmacos);
  }

  // ==================== CONFIGURACIÓN (delegado a ConfigStorageService) ====================

  static getPrestacionConfig(): PrestacionConfig | null {
    return ConfigStorage.getPrestacionConfig();
  }

  static savePrestacionConfig(config: PrestacionConfig): void {
    ConfigStorage.savePrestacionConfig(config);
  }

  static getAllPrestaciones(): string[] {
    return ConfigStorage.getAllPrestaciones();
  }

  static saveAllPrestaciones(prestaciones: string[]): void {
    ConfigStorage.saveAllPrestaciones(prestaciones);
  }

  // ==================== IMPORTACIÓN/EXPORTACIÓN (delegado a DataImportExportService) ====================

  static importPatients(patients: Patient[]): void {
    DataImportExport.importPatients(patients);
  }

  static exportAllData(): string {
    return DataImportExport.exportAllData();
  }

  static importAllData(jsonString: string): boolean {
    return DataImportExport.importAllData(jsonString);
  }

  static clearAllData(): void {
    DataImportExport.clearAllData();
  }

  // ==================== CHAT (delegado a ChatStorageService) ====================

  static getConversations(): ChatConversation[] {
    return ChatStorage.getConversations();
  }

  static saveConversations(conversations: ChatConversation[]): void {
    ChatStorage.saveConversations(conversations);
  }

  static getConversationById(id: string): ChatConversation | null {
    return ChatStorage.getConversationById(id);
  }

  static getConversationsForUser(userId: string): ChatConversation[] {
    return ChatStorage.getConversationsForUser(userId);
  }

  static createOrGetConversation(participantIds: string[], participantNames: string[]): ChatConversation {
    return ChatStorage.createOrGetConversation(participantIds, participantNames);
  }

  static addChatMessage(conversationId: string, sender: string, senderName: string, message: string): ChatMessage | null {
    return ChatStorage.addChatMessage(conversationId, sender, senderName, message);
  }

  // ==================== INICIALIZACIÓN ====================

  /**
   * Inicializa el sistema con datos por defecto si no existen
   */
  static initialize(defaultUsers: User[], defaultConfig: PrestacionConfig, defaultPrestaciones: string[], defaultFarmacos: Farmaco[]): void {
    // Solo inicializar si no hay datos existentes
    if (UserStorage.getUsers().length === 0) {
      UserStorage.saveUsers(defaultUsers);
    }

    if (!ConfigStorage.getPrestacionConfig()) {
      ConfigStorage.savePrestacionConfig(defaultConfig);
    }

    if (ConfigStorage.getAllPrestaciones().length === 0) {
      ConfigStorage.saveAllPrestaciones(defaultPrestaciones);
    }

    if (FarmacoStorage.getFarmacos().length === 0) {
      FarmacoStorage.saveFarmacos(defaultFarmacos);
    }
  }

  // ==================== MÉTODOS GENÉRICOS ====================

  /**
   * Obtiene un elemento del localStorage por clave personalizada
   */
  static getItem(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Guarda un elemento en localStorage por clave personalizada
   */
  static setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ==================== SINCRONIZACIÓN CON FIREBASE (delegado a FirebaseSyncService) ====================

  static async syncWithFirebase(): Promise<{success: boolean, message: string}> {
    return FirebaseSync.syncWithFirebase();
  }

  static async checkFirebaseConnection(): Promise<boolean> {
    return FirebaseSync.checkFirebaseConnection();
  }
}

export default LocalStorageService;
