// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD
    ? 'https://us-central1-simorahealth.cloudfunctions.net'
    : 'http://localhost:3001',
  ENDPOINTS: {
    CLAUDE: import.meta.env.PROD ? '/claude' : '/api/claude'
  },
  TIMEOUT: 60000, // 60 seconds
  MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 4000
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  AUTOSAVE: 'compin_autosave'
};

// Autosave Configuration
export const AUTOSAVE_CONFIG = {
  INTERVAL: 10000, // 10 seconds
  MAX_AGE: 1440 // 24 hours in minutes
};

// Doctor Information
export const DOCTOR_INFO = {
  NAME: 'Humberto Antonio Escobar Guimay',
  RUT: '17.685.576-2',
  SPECIALTY: 'Psiquiatra adultos'
};

// Report Template Sections
export const REPORT_SECTIONS = {
  TITLE: 'INFORME MÉDICO COMPLEMENTARIO',
  PATIENT_ID: '1. IDENTIFICACIÓN DEL PACIENTE',
  LICENSES: '2. LICENCIAS QUE JUSTIFICA EN EL INFORME (N° folio):',
  CLINICAL_HISTORY: '3. MOTIVO DE CONSULTA, ANAMNESIS Y ANTECEDENTES CLÍNICOS RELEVANTES:',
  EXAMINATION: '4. EXAMEN MENTAL Y/O FÍSICO:',
  FUNCTIONAL_STATE: '5. ESTADO FUNCIONAL DEL PACIENTE',
  TREATMENT: '6. TRATAMIENTO REALIZADO',
  DIAGNOSIS: '7. DIAGNÓSTICOS',
  OTHER_INFO: '8. OTROS ANTECEDENTES RELEVANTES',
  MANAGEMENT_PLAN: '9. PLAN DE MANEJO',
  DISCHARGE_DATE: '10. FECHA PROBABLE DE ALTA',
  INDICATIONS: '11. TRATAMIENTO E INDICACIONES',
  DOCTOR_ID: '12. IDENTIFICACIÓN DEL TRATANTE'
};

// PDF Export Configuration
export const PDF_CONFIG = {
  MARGIN: [10, 10, 10, 10],
  IMAGE_QUALITY: 0.98,
  SCALE: 2,
  FORMAT: 'letter',
  ORIENTATION: 'portrait'
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#E4C6A1',
  PRIMARY_DARK: '#D4B08C',
  TEXT_PRIMARY: '#2C3E50',
  TEXT_SECONDARY: '#7F8C8D',
  TEXT_LIGHT: '#6B6560',
  BACKGROUND: '#E8E9ED',
  SURFACE: '#FFFFFF',
  BORDER: '#DFE1E6',
  ERROR: '#E74C3C',
  SUCCESS: '#27AE60'
};

// Message Durations
export const MESSAGE_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000
};
