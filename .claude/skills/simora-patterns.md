# Skill: Patrones Específicos de SIMORAHealth

## Área de Conocimiento
Arquitectura, patrones de código y convenciones del proyecto SIMORAHealth

## Arquitectura del Proyecto

### Stack Tecnológico

**Frontend:**
- React 19.1.1
- TypeScript 5.8
- Vite 6.2 (build tool)
- Tailwind CSS 3.4 (estilos)
- Lucide React 0.553 (iconos)

**Estado y Datos:**
- LocalStorage (almacenamiento local)
- Firebase/Firestore 12.6 (base de datos cloud)
- Context API de React (estado global)

**Librerías Especializadas:**
- xlsx (SheetJS) - Exportación a Excel
- html2pdf.js - Generación de PDFs
- Papa Parse - Parsing de CSV
- Leaflet + react-leaflet - Mapas geográficos
- gapi-script - Google Calendar API

### Estructura de Carpetas

```
SIMORAHealth/
├── components/             # Componentes React
│   ├── ui/                # Componentes UI reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── icomp/             # Sistema ICOMP (NO MODIFICAR)
│   ├── MainApp.tsx        # App principal
│   ├── LoginPage.tsx      # Autenticación
│   ├── Calendar.tsx       # Vista de calendario
│   ├── PatientFileView.tsx # Ficha clínica
│   └── ...
├── services/              # Servicios de lógica de negocio
│   ├── LocalStorageService.ts
│   ├── googleCalendarSync.ts
│   └── calendarExport.ts
├── src/
│   ├── types/
│   │   └── index.ts       # Definiciones TypeScript
│   └── services/
│       └── firebaseService.ts
├── utils/                 # Utilidades
│   ├── helpers.ts
│   ├── patientAccessControl.ts
│   ├── extractPatientData.ts
│   └── themeUtils.ts
├── scripts/               # Scripts de migración
│   ├── standardize-ruts.ts
│   └── count-firestore-data.ts
├── constants.ts           # Constantes del sistema
├── types.ts               # Tipos principales
├── userData.ts            # Datos de usuarios
├── mockPatients.ts        # Datos de prueba
└── App.tsx                # Componente raíz

```

## Estructuras de Datos Principales

### Patient (Interface Principal)

```typescript
// src/types/index.ts

export interface Patient {
  // Identificación
  firestoreId: string;        // ID único en Firestore
  ficha: number;              // Número de ficha clínica

  // Datos personales
  nombre: string;
  rut: string;                // Formato: 00.000.000-0
  edad: number;
  sexo: 'Masculino' | 'Femenino';
  identidadGenero: string;
  fechaNacimiento: string;    // ISO 8601: YYYY-MM-DD

  // Ubicación
  direccion: string;
  comuna: string;             // Una de las 32 comunas de Maule
  lat: number;                // Latitud
  lon: number;                // Longitud

  // Contacto
  telefonos: string[];        // Formato: +56912345678
  email: string;

  // Clínica
  diagnostico: {
    saludMental: string;      // Código CIE-10 (ej: F32.1)
    morbilidadMedica: string;
    factoresPsicosociales: string;
  };
  farmacos: FarmacoPrescrito[];

  // Metadata
  fechaIngreso: string;
  ultimaModificacion: string;
  profesionalAsignado: string;
}
```

### Prestacion

```typescript
export interface Prestacion {
  id: string;
  pacienteId: string;
  pacienteNombre: string;
  pacienteRut: string;
  fecha: string;              // ISO 8601
  tipo: string;               // Tipo de prestación
  profesional: string;
  userId: string;
  estado: 'Realizada' | 'NSP' | 'Agendada';
  razonNSP?: string;          // Si estado === 'NSP'
  observaciones?: string;
  duracion?: number;          // Minutos
  timestamp: number;
}
```

### User

```typescript
export interface User {
  id: string;
  nombre: string;
  rut: string;
  password: string;           // Hasheada
  role: 'admin' | 'profesional' | 'estadistica';
  email: string;
  activo: boolean;

  // Perfiles múltiples
  profiles?: UserProfile[];
  currentProfileIndex?: number;
}

export interface UserProfile {
  name: string;
  type: 'default' | 'cosam-maule' | 'extrasistema';
  theme: string;
  prestacionesPermitidas?: string[];
}
```

## Servicios Principales

### LocalStorageService

**Ubicación:** `services/LocalStorageService.ts`

**Propósito:** Gestión de datos en localStorage (reemplaza Firebase en desarrollo)

**Métodos principales:**

```typescript
export const LocalStorageService = {
  // Autenticación
  authenticate(username: string, password: string): User | null
  setCurrentUser(user: User): void
  getCurrentUser(): User | null
  logout(): void
  isSessionValid(): boolean

  // Pacientes
  getPatients(): Patient[]
  savePatients(patients: Patient[]): void
  updatePatient(patient: Patient): void
  deletePatient(firestoreId: string): void

  // Usuarios
  getUsers(): User[]
  saveUsers(users: User[]): void

  // Prestaciones
  getPrestaciones(): Prestacion[]
  savePrestaciones(prestaciones: Prestacion[]): void

  // Configuración
  getPrestacionConfig(): PrestacionConfig
  savePrestacionConfig(config: PrestacionConfig): void
}
```

**Patrón de uso:**

```typescript
// Obtener datos
const patients = LocalStorageService.getPatients();

// Modificar
const updatedPatient = { ...patient, nombre: 'Nuevo Nombre' };
LocalStorageService.updatePatient(updatedPatient);

// Los cambios persisten automáticamente en localStorage
```

### firebaseService

**Ubicación:** `src/services/firebaseService.ts`

**Propósito:** Operaciones con Firestore (producción)

**Métodos principales:**

```typescript
// Pacientes
export async function getPatients(): Promise<Patient[]>
export async function updatePatient(patient: Patient): Promise<void>
export async function deletePatient(firestoreId: string): Promise<void>

// Prestaciones
export async function getPrestaciones(userId?: string): Promise<Prestacion[]>
export async function savePrestacion(prestacion: Prestacion): Promise<void>

// Estadísticas
export async function getSystemStats(): Promise<SystemStats>

// Batch operations
export async function batchImportPatients(patients: Patient[]): Promise<void>
```

## Patrones de Código

### Patrón de Validación de RUT

```typescript
// utils/helpers.ts

export function validateRUT(rut: string): boolean {
  const cleanRUT = rut.replace(/[.-]/g, '');

  if (!/^[0-9]+[0-9Kk]$/.test(cleanRUT)) return false;

  const number = cleanRUT.slice(0, -1);
  const providedDV = cleanRUT.slice(-1).toUpperCase();

  let sum = 0;
  let multiplier = 2;

  for (let i = number.length - 1; i >= 0; i--) {
    sum += parseInt(number[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDV = 11 - (sum % 11);
  const calculatedDV =
    expectedDV === 11 ? '0' :
    expectedDV === 10 ? 'K' :
    expectedDV.toString();

  return calculatedDV === providedDV;
}

export function standardizeRUT(rut: string): string {
  const cleanRUT = rut.replace(/[.-]/g, '');
  const number = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);

  // Formatear: 00.000.000-0
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}
```

**Uso:**

```typescript
// SIEMPRE validar antes de guardar
if (!validateRUT(patient.rut)) {
  throw new Error('RUT inválido');
}

// SIEMPRE estandarizar antes de guardar
patient.rut = standardizeRUT(patient.rut);
```

### Patrón de Control de Acceso

```typescript
// utils/patientAccessControl.ts

export function filterPatientsByAccess(
  patients: Patient[],
  user: User
): Patient[] {
  if (user.role === 'admin') {
    // Admins ven todos los pacientes
    return patients;
  }

  if (user.role === 'profesional') {
    // Profesionales ven solo pacientes asignados
    return patients.filter(p =>
      p.profesionalAsignado === user.id ||
      p.profesionalAsignado === user.nombre
    );
  }

  if (user.role === 'estadistica') {
    // Rol estadística ve todos pero solo lectura
    return patients;
  }

  return [];
}
```

**Uso en componentes:**

```typescript
const [patients, setPatients] = useState<Patient[]>([]);
const currentUser = LocalStorageService.getCurrentUser();

useEffect(() => {
  const allPatients = LocalStorageService.getPatients();
  const accessiblePatients = filterPatientsByAccess(allPatients, currentUser);
  setPatients(accessiblePatients);
}, []);
```

### Patrón de Temas

```typescript
// utils/themeUtils.ts

export function getThemeClasses(color: string) {
  const themes = {
    blue: {
      primary: 'bg-blue-500 hover:bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-500',
      // ...
    },
    orange: {
      primary: 'bg-orange-500 hover:bg-orange-600',
      text: 'text-orange-600',
      border: 'border-orange-500',
      // ...
    },
    // ... más temas
  };

  return themes[color] || themes.blue;
}
```

**Uso:**

```typescript
const theme = getThemeClasses(currentUser.currentTheme);

<Button className={theme.primary}>
  Acción
</Button>
```

## Flujos Principales

### Flujo de Autenticación

```
1. Usuario ingresa RUT y contraseña en LoginPage
2. LoginPage llama a LocalStorageService.authenticate()
3. LocalStorageService:
   a. Valida RUT con validateRUT()
   b. Busca usuario en localStorage
   c. Compara contraseña
   d. Si correcto: genera token de sesión
   e. Guarda usuario actual
4. App.tsx detecta sesión válida
5. Renderiza MainApp
```

### Flujo de Registro de Prestación

```
1. Usuario abre IngresarPrestacionView
2. Selecciona paciente (filtrado por permisos)
3. Selecciona tipo de prestación (filtrado por rol)
4. Ingresa fecha, observaciones, etc.
5. Al guardar:
   a. Valida datos obligatorios
   b. Crea objeto Prestacion
   c. Guarda en localStorage/Firestore
   d. Actualiza calendario
```

### Flujo de Exportación a Excel

```
1. Usuario click en botón "Exportar Excel" en PatientFileView
2. Componente recopila datos del paciente
3. Formatea datos en estructura tabular
4. Usa librería xlsx para generar archivo
5. Trigger de descarga automática
```

## Convenciones de Código

### Nomenclatura

**Componentes:** PascalCase
```typescript
PatientFileView.tsx
IngresarPrestacionView.tsx
```

**Funciones/variables:** camelCase
```typescript
const standardizeRUT = (rut: string) => { ... }
const currentUser = getCurrentUser();
```

**Constantes:** UPPER_SNAKE_CASE
```typescript
export const CIE10_DIAGNOSES = { ... }
export const FARMACOS_APS = [ ... ]
```

**Interfaces:** PascalCase con Interface/Type explícito
```typescript
interface Patient { ... }
type PrestacionEstado = 'Realizada' | 'NSP' | 'Agendada';
```

### Imports

**Orden recomendado:**
```typescript
// 1. React y librerías externas
import React, { useState, useEffect } from 'react';
import { Calendar, User, FileText } from 'lucide-react';

// 2. Componentes locales
import { Button } from './ui/Button';
import { Card } from './ui/Card';

// 3. Servicios
import { LocalStorageService } from '../services/LocalStorageService';

// 4. Utilidades
import { validateRUT, standardizeRUT } from '../utils/helpers';

// 5. Tipos
import type { Patient, Prestacion } from '../types';

// 6. Constantes
import { CIE10_DIAGNOSES } from '../constants';
```

### Manejo de Errores

**Patrón estándar:**

```typescript
try {
  const result = await someAsyncOperation();
  // Manejar éxito
} catch (error) {
  console.error('Error descriptivo:', error);
  // NO exponer datos sensibles en logs
  alert('Operación fallida. Por favor intente nuevamente.');
}
```

**NUNCA:**
```typescript
// ❌ NO hacer esto
catch (error) {
  console.log(patient.rut, patient.nombre, error); // Expone datos sensibles
}
```

## Exclusiones Importantes

### ICOMP - NO MODIFICAR

**Ubicación:** `components/icomp/`

⛔ **Sistema ICOMP está FUERA DE ALCANCE de los agentes**
- NO modificar componentes de ICOMP
- NO sugerir cambios a ICOMP
- Si usuario pregunta sobre ICOMP, informar que está excluido

### Matrix UI - NO USAR

⛔ **Sistema Matrix UI no se usa en estos agentes**
- NO referenciar códigos Matrix (NEO-001, etc.)
- NO usar documentación MATRIX_UI_CODES.md en estos agentes
- Excluido intencionalmente por solicitud del usuario

## Mejores Prácticas del Proyecto

### Seguridad

1. **SIEMPRE** validar RUT antes de guardar
2. **SIEMPRE** verificar permisos antes de mostrar datos
3. **NUNCA** loguear datos sensibles (RUT, nombre, diagnóstico)
4. **SIEMPRE** usar HTTPS en producción
5. **SIEMPRE** sanitizar inputs de usuario

### Performance

1. Usar `useMemo` para cálculos costosos
2. Usar `useCallback` para funciones en dependencias
3. Lazy load de componentes pesados
4. Batch operations en Firestore
5. Índices en queries frecuentes

### Accesibilidad

1. Labels en todos los inputs
2. Alt text en imágenes
3. Contraste adecuado (WCAG AA)
4. Navegación por teclado
5. ARIA labels donde sea necesario

### Testing

1. Tests unitarios para utilidades (helpers.ts)
2. Tests de integración para servicios
3. Tests E2E para flujos críticos
4. Validar en múltiples navegadores

---

**Notas:**
- Este skill debe actualizarse cuando cambie la arquitectura
- Revisar con cada versión mayor del proyecto
- Consultar con equipo antes de cambios estructurales

*Actualizado: 2025-01-17*
