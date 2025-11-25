/**
 * Definiciones de tipos e interfaces para toda la aplicación SIMORA Health
 * Archivo consolidado y centralizado para mantener consistencia en el tipado
 *
 * DECISIONES DE CONSOLIDACIÓN:
 * - Patient.ficha: number (confirmado por uso real en mockPatients.ts y scripts de migración)
 * - UserRole: type literal 'admin' | 'profesional' | 'estadistica' (usado en toda la aplicación)
 * - BaseEntity: Incluido para futuras extensiones
 * - Mantiene compatibilidad con código existente que usa types.ts
 */

// ==================== ENUMS Y TIPOS LITERALES ====================

/**
 * Roles de usuario en el sistema
 * NOTA: Se usa type literal en lugar de enum para compatibilidad con código existente
 */
export type UserRole = 'admin' | 'profesional' | 'estadistica';

/**
 * Estados posibles de una prestación
 */
export type PrestacionEstado = 'Realizada' | 'Agendada' | 'NSP';

/**
 * Sexo biológico del paciente
 */
export type Sexo = 'Masculino' | 'Femenino' | 'Otro';

/**
 * Identificadores de tenant (aplicación)
 */
export type TenantId = 'simora' | 'raices';

/**
 * Centros de atención disponibles
 */
export type CentroAtencion = 'default' | 'cosam-maule' | 'cosam-raices' | 'extrasistema';

/**
 * Colores de tema disponibles para la UI
 */
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal';

/**
 * Tipos de notas clínicas
 */
export enum TipoNotaClinica {
  EVOLUCION = 'Evolución',
  INGRESO = 'Ingreso',
  EPICRISIS = 'Epicrisis',
  INTERCONSULTA = 'Interconsulta',
  PROCEDIMIENTO = 'Procedimiento',
  INDICACION = 'Indicación',
  OTRO = 'Otro'
}

/**
 * Categorías de fármacos
 */
export enum CategoriaFarmaco {
  ANTIPSICOTICO = 'Antipsicótico',
  ANTIDEPRESIVO = 'Antidepresivo',
  ANSIOLITICO = 'Ansiolítico',
  ESTABILIZADOR_ANIMO = 'Estabilizador del ánimo',
  HIPNOTICO = 'Hipnótico',
  OTRO = 'Otro'
}

/**
 * Tipos de eventos de calendario
 */
export enum TipoEvento {
  CONSULTA = 'Consulta',
  CONTROL = 'Control',
  PROCEDIMIENTO = 'Procedimiento',
  REUNION = 'Reunión',
  VISITA_DOMICILIARIA = 'Visita Domiciliaria',
  OTRO = 'Otro'
}

/**
 * Estados de eventos de calendario
 */
export enum EstadoEvento {
  CONFIRMADO = 'Confirmado',
  TENTATIVO = 'Tentativo',
  CANCELADO = 'Cancelado',
  REALIZADO = 'Realizado',
  NO_ASISTIO = 'No Asistió'
}

// ==================== INTERFACES BASE ====================

/**
 * Interface base con campos comunes de auditoría
 * Puede ser extendida por otras interfaces para tracking de cambios
 */
export interface BaseEntity {
  createdAt?: Date | string;
  updatedAt?: Date | string;
  createdBy?: string;
  updatedBy?: string;
}

// ==================== COORDENADAS Y UBICACIÓN ====================

/**
 * Coordenadas geográficas
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

// ==================== USUARIO ====================

/**
 * Perfil de usuario para usuarios con múltiples contextos de trabajo
 */
export type UserProfile = {
  id: string;
  name: string;
  centroAtencion: CentroAtencion;
  themeColor: ThemeColor;
  description: string;
};

/**
 * Usuario del sistema
 * NOTA: Mantiene estructura de types.ts (con id: number) por compatibilidad
 */
export interface User {
  id: number;
  uid?: string; // Firebase Auth UID
  username: string; // RUT del usuario
  email?: string; // Email real para recuperacion de contrasena (Gmail, etc)
  password?: string;
  name: string;
  role: UserRole;
  title: string;

  // Seguridad y control de acceso
  failedLoginAttempts: number;
  isLocked: boolean;
  lockoutUntil: number | null; // Timestamp

  // Control de acceso a pacientes
  allowedPatients?: string[]; // Array de firestoreIds de pacientes permitidos

  // Centro de atención y preferencias de UI
  centroAtencion?: CentroAtencion;
  themeColor?: ThemeColor;

  // Perfiles múltiples (para usuarios como Humberto Escobar)
  availableProfiles?: UserProfile[];
  activeProfileId?: string;

  // Multi-tenancy
  tenantId?: TenantId;
}

/**
 * Permisos granulares de usuario
 */
export interface Permissions {
  registro: boolean;
  calendario: boolean;
  estadisticas: boolean;
  anexos: boolean;
  ayuda: boolean;
}

/**
 * Permisos detallados de usuario (versión extendida)
 */
export interface UserPermissions {
  canEditPatients: boolean;
  canDeletePatients: boolean;
  canExportData: boolean;
  canManageUsers: boolean;
  canViewStats: boolean;
  canEditMedicalInfo: boolean;
  canEditPsychosocialInfo: boolean;
}

// ==================== PACIENTE ====================

/**
 * Diagnóstico del paciente
 */
export interface Diagnostico {
  saludMental: string;
  morbilidadMedica: string;
  factoresPsicosociales: string;

  // Códigos CIE-10 (opcional)
  codigosCIE10?: string[];

  // Evaluación multiaxial (opcional)
  ejeI?: string;      // Trastornos clínicos
  ejeII?: string;     // Trastornos de personalidad
  ejeIII?: string;    // Condiciones médicas
  ejeIV?: string;     // Problemas psicosociales
  ejeV?: number;      // Evaluación global (GAF)
}

/**
 * Paciente del sistema
 * DECISIÓN: ficha es number (confirmado por uso real en código)
 */
export interface Patient extends BaseEntity {
  // Identificadores
  firestoreId: string; // ID del documento en Firestore
  ficha: number;       // Número de ficha clínica (era 'id' anteriormente)

  // Datos personales básicos
  nombre: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  rut: string;
  fechaNacimiento: string; // YYYY-MM-DD
  edad: number;
  sexo: Sexo | 'Masculino' | 'Femenino'; // Mantiene compatibilidad con tipo literal
  identidadGenero?: string;

  // Ubicación
  direccion: string;
  comuna: string;
  region?: string;
  lat: number;  // Mantiene compatibilidad con estructura plana
  lon: number;  // Mantiene compatibilidad con estructura plana
  coordenadas?: Coordinates; // Versión alternativa estructurada

  // Contacto
  telefonos: string[];
  email: string;

  // Datos sociales
  tutor: string; // Nombre del tutor o 'No aplica'
  ocupacion: string;
  escolaridad?: string;
  estadoCivil?: string;

  // Datos clínicos
  dispositivoAPS: string;
  diagnostico: Diagnostico;
  farmacos: FarmacoPrescrito[];
  objetivosTerapeuticos?: string;

  // Advertencias médicas
  alergias: string;
  ram: string; // Reacciones Adversas a Medicamentos

  // Datos administrativos
  pensionDiscapacidad: boolean;
  credencialDiscapacidad: boolean;
  consumoActivoDrogas: boolean;

  // Centro de atención
  centroAtencion?: CentroAtencion;
  origen?: string; // COSAM, EXTRASISTEMA, etc.

  // Estado y seguimiento
  isActive?: boolean;
  ultimaConsulta?: string;
  proximaCita?: string;

  // Notas adicionales
  observaciones?: string;
  notasInternas?: string;
  contenidoOriginal?: string; // Para migración de datos antiguos

  // Multi-tenancy
  tenantId?: TenantId;
}

/**
 * Datos mínimos para crear un nuevo paciente
 */
export interface NewPatientData {
  nombre: string;
  rut: string;
  fechaNacimiento: string; // YYYY-MM-DD
  sexo: 'Masculino' | 'Femenino';
}

// ==================== FÁRMACOS ====================

/**
 * Fármaco en el catálogo maestro
 */
export interface Farmaco {
  id: string;
  nombre: string;
  principioActivo?: string;
  categoria?: CategoriaFarmaco;
  disponibleAPS: boolean;
  requiereRecetaRetenida?: boolean;
  observaciones?: string;
}

/**
 * Fármaco prescrito a un paciente
 */
export interface FarmacoPrescrito {
  nombre: string;
  dosis: string;
  frecuencia?: string;
  viaAdministracion?: string;
  fechaInicio?: string;
  fechaTermino?: string;
  indicaciones?: string;
  prescritoPor?: string;
}

// ==================== PRESTACIONES ====================

/**
 * Prestación o servicio brindado a un paciente
 */
export interface Prestacion extends BaseEntity {
  id: string;
  pacienteId: string; // Referencias Patient.firestoreId

  // Datos básicos
  fecha: string; // YYYY-MM-DD
  tipo: string;
  subtipo?: string;

  // Profesional
  profesional: string;
  profesionalId?: string;
  usuarioPerfil: string;

  // Estado y timing
  estado: PrestacionEstado | 'Realizada' | 'NSP' | 'Agendada'; // Mantiene compatibilidad
  duracion_min_real?: number;
  horaInicio?: string;
  horaTermino?: string;

  // Detalles NSP
  motivoNSP?: string;
  intentosContacto?: number;

  // Contenido de la sesión
  observaciones: string;
  objetivosSesion?: string;
  actividadesRealizadas?: string;
  tareasAsignadas?: string;
  proximaSesion?: string;

  // Evaluaciones
  evaluacionPaciente?: number; // 1-10
  evaluacionProfesional?: number; // 1-10

  // Metadata
  timestamp: string; // ISO string para ordenamiento
  isDeleted?: boolean;
}

/**
 * Configuración de prestaciones por perfil profesional
 */
export type PrestacionConfig = Record<string, string[]>;

/**
 * Configuración detallada de prestaciones
 */
export interface PrestacionConfigDetallada {
  tipos: string[];
  subtipos?: Record<string, string[]>;
  duracionesEstandar?: Record<string, number>;
  requiereAutorizacion?: string[];
}

// ==================== NOTAS CLÍNICAS ====================

/**
 * Nota clínica o evolución de un paciente
 */
export interface ClinicalNote extends BaseEntity {
  id: string;
  pacienteId: string; // Referencias Patient.firestoreId

  // Datos temporales
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
  timestamp: string; // ISO string para ordenamiento

  // Profesional
  profesional: string;
  profesionalId?: string;

  // Tipo de nota
  tipo?: 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | 'OTRO' | TipoNotaClinica;
  tipoNota?: TipoNotaClinica;

  // Contenido
  titulo: string;
  contenido: string;
  contenidoCompleto?: string; // Texto narrativo completo preservado (migración MD)
  observacionesClinicamente?: string; // Observaciones clínicas
  planTratamiento?: string; // Plan de tratamiento

  // Signos vitales (opcional)
  signosVitales?: SignosVitales;

  // Adjuntos y referencias
  adjuntosReferencias?: string[]; // Referencias a archivos
  archivosAdjuntos?: ArchivoAdjunto[];

  // Metadata de migración
  numeroFicha?: string;
  ordenEnHistorial?: number; // Orden en el historial clínico (0 = primera nota/ingreso)

  // Estado y privacidad
  esFirmada?: boolean;
  fechaFirma?: string;
  esPrivada?: boolean;
  visiblePara?: string[]; // IDs de usuarios
}

/**
 * Signos vitales
 */
export interface SignosVitales {
  presionArterial?: string;
  frecuenciaCardiaca?: number;
  frecuenciaRespiratoria?: number;
  temperatura?: number;
  saturacionO2?: number;
  peso?: number;
  talla?: number;
  imc?: number;
}

/**
 * Archivo adjunto a una nota clínica
 */
export interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tipo: string;
  size: number;
  url: string;
  fechaSubida: string;
}

// ==================== CALENDARIO Y AGENDA ====================

/**
 * Cita o turno en la agenda
 */
export interface Appointment {
  type: string;
  time: string;
  patient: string;
}

/**
 * Slot disponible en la agenda
 */
export interface AvailableSlot {
  type: 'available';
  prestation: string;
}

/**
 * Item de la agenda (puede ser cita o slot disponible)
 */
export type ScheduleItem = Appointment | AvailableSlot;

/**
 * Datos de la agenda por día
 */
export interface ScheduleData {
  [key: string]: ScheduleItem[];
}

/**
 * Datos del tooltip de la agenda
 */
export interface TooltipData {
  day: string;
  schedule: ScheduleItem[];
  position: {
    top: number;
    left: number;
  };
}

/**
 * Evento de calendario
 */
export interface EventoCalendario {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;

  // Paciente
  pacienteId?: string;
  pacienteNombre?: string;

  // Tipo y estado
  tipo: TipoEvento;
  estado: EstadoEvento;

  // Profesional
  profesionalId: string;
  profesionalNombre: string;

  // Ubicación y notas
  ubicacion?: string;
  notas?: string;

  // Recurrencia
  esRecurrente?: boolean;
  reglaRecurrencia?: string; // RRULE format

  // Recordatorios
  recordatorios?: Recordatorio[];

  // Integración Google Calendar
  googleEventId?: string;
  sincronizadoGoogle?: boolean;
}

/**
 * Recordatorio de evento
 */
export interface Recordatorio {
  id: string;
  tipo: 'email' | 'sms' | 'push';
  minutosAntes: number;
  enviado: boolean;
  fechaEnvio?: string;
}

// ==================== COMUNICACIONES ====================

/**
 * Mensaje de chat entre usuarios
 */
export interface ChatMessage {
  id: string;
  sender: string; // Username (RUT)
  senderName: string;
  message: string;
  timestamp: string; // ISO string
}

/**
 * Conversación de chat
 */
export interface ChatConversation {
  id: string;
  participantIds: string[]; // Usernames
  participantNames: string[];
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  lastMessage?: ChatMessage;
}

// ==================== ANEXOS ====================

/**
 * Anexo o documento del sistema
 */
export interface Anexo {
  id: number;
  funcionario: string;
  mail: string;
}

// ==================== ESTADÍSTICAS ====================

/**
 * Estadísticas generales del sistema
 */
export interface EstadisticasGenerales {
  totalPacientes: number;
  pacientesActivos: number;
  totalPrestaciones: number;
  prestacionesDelMes: number;

  // Por tipo de prestación
  prestacionesPorTipo: Record<string, number>;

  // Por profesional
  prestacionesPorProfesional: Record<string, number>;

  // Por estado
  prestacionesPorEstado: Record<string, number>;

  // Tasas
  tasaAsistencia: number;
  tasaNSP: number;
  promedioSesionesPorPaciente: number;

  // Demográficos
  distribucionPorEdad: Record<string, number>;
  distribucionPorSexo: Record<string, number>;
  distribucionPorComuna: Record<string, number>;

  // Top rankings
  topDiagnosticos: Array<{ diagnostico: string; cantidad: number }>;
  topFarmacos: Array<{ farmaco: string; cantidad: number }>;
}

// ==================== CONFIGURACIÓN ====================

/**
 * Horario de atención
 */
export interface HorarioAtencion {
  dia: number; // 0-6 (domingo-sábado)
  horaInicio: string;
  horaTermino: string;
  esHabil: boolean;
}

/**
 * Configuración del sistema
 */
export interface ConfiguracionSistema {
  nombreInstitucion: string;
  direccionInstitucion: string;
  telefonoInstitucion: string;
  emailInstitucion: string;

  horariosAtencion: HorarioAtencion[];
  diasFeriados: string[];

  configuracionPrestaciones: PrestacionConfigDetallada;

  // Integraciones
  googleCalendarEnabled: boolean;
  mekidocEnabled: boolean;
  icompEnabled: boolean;

  // Notificaciones
  notificacionesEmail: boolean;
  notificacionesSMS: boolean;

  // Límites
  maxPacientesPorDia: number;
  duracionConsultaEstandar: number; // minutos
  tiempoEntreConsultas: number; // minutos
}

// ==================== TIPOS AUXILIARES ====================

/**
 * Tipo para datos de formulario de paciente (sin campos autogenerados)
 */
export type PatientFormData = Omit<Patient, 'firestoreId' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para datos de formulario de prestación (sin campos autogenerados)
 */
export type PrestacionFormData = Omit<Prestacion, 'id' | 'timestamp' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para datos de formulario de usuario (sin campos autogenerados)
 */
export type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// ==================== TYPE GUARDS ====================

/**
 * Verifica si un usuario es administrador
 */
export const isAdmin = (user: User): boolean => user.role === 'admin';

/**
 * Verifica si un usuario es profesional
 */
export const isProfesional = (user: User): boolean => user.role === 'profesional';

/**
 * Verifica si un usuario es de estadísticas
 */
export const isEstadistica = (user: User): boolean => user.role === 'estadistica';

/**
 * Verifica si un usuario tiene un rol médico basado en su título
 */
export const isMedico = (user: User): boolean =>
  user.title.includes('Psiquiatra') || user.title.includes('Médico');

/**
 * Verifica si un usuario es psicólogo
 */
export const isPsicologo = (user: User): boolean =>
  user.title.includes('Psicólogo') || user.title.includes('Psicóloga');

// ==================== VALIDADORES ====================

/**
 * Valida formato de RUT chileno (formato: 00000000-0)
 */
export const isValidRut = (rut: string): boolean => {
  const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
  return rutRegex.test(rut);
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que una fecha esté en formato YYYY-MM-DD
 */
export const isValidDateFormat = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

/**
 * Valida que una hora esté en formato HH:mm
 */
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};
