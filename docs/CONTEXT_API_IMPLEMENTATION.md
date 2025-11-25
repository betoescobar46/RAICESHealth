# Context API Implementation - SIMORA Health

## 📋 Resumen Ejecutivo

Implementación completa de **Context API** para eliminar el **props drilling severo** que afectaba la arquitectura del proyecto.

**Estado:** ✅ **COMPLETADO**
**Fecha:** 2025-11-18
**Build:** ✅ Exitoso

---

## 🎯 Problema Identificado

### Props Drilling Antes de la Implementación

```
App.tsx
  ├── user, patients, prestaciones (~10 props)
  └── MainApp (recibe 10+ props solo para pasarlos)
       ├── PatientFileView (recibe 7+ props)
       │    └── Secciones (reciben props pasados)
       ├── StatisticsView (recibe props pasados)
       └── AdminView (recibe props pasados)
```

**Problemas:**
- MainApp recibía ~10 props solo para pasarlos a componentes hijos
- PatientFileView recibía 7 props innecesariamente
- User, config, theme se propagaban por toda la app
- Difícil mantenimiento y testing
- Violación del principio de responsabilidad única

---

## ✅ Solución Implementada

### Arquitectura de Contexts

```
src/contexts/
├── AuthContext.tsx         (Autenticación y sesiones)
├── PatientsContext.tsx     (Gestión de pacientes)
├── PrestacionesContext.tsx (Gestión de prestaciones)
├── ConfigContext.tsx       (Configuraciones del sistema)
├── ThemeContext.tsx        (Tema visual y zoom)
├── AppProviders.tsx        (Provider principal)
└── index.ts                (Exportaciones centralizadas)
```

---

## 📦 Contexts Implementados

### 1. AuthContext

**Responsabilidad:** Autenticación, sesiones, gestión de usuario actual.

**Interface:**
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{...}>;
  logout: () => Promise<void>;
  changePassword: (username: string, oldPassword: string, newPassword: string) => {...};
}
```

**Integración:**
- ✅ Firebase Auth (onAuthStateChanged)
- ✅ AuthService (FASE 2)
- ✅ Firestore (metadata de usuario)
- ✅ LocalStorage (sesión actual)

**Uso:**
```typescript
import { useAuth } from '@/contexts';

const { user, isAuthenticated, login, logout } = useAuth();
```

---

### 2. PatientsContext

**Responsabilidad:** CRUD de pacientes, selección de paciente actual.

**Interface:**
```typescript
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
```

**Integración:**
- ✅ Firebase Firestore (collection 'patients')
- ✅ PatientStorageService (FASE 2)
- ✅ Sincronización con localStorage

**Características:**
- Carga automática desde Firestore al montar
- Tracking de pacientes por origen (COSAM, EXTRASISTEMA, SISTEMA)
- Sincronización bidireccional con storage
- Actualización reactiva del paciente seleccionado

**Uso:**
```typescript
import { usePatients } from '@/contexts';

const { patients, selectedPatient, updatePatient } = usePatients();
```

---

### 3. PrestacionesContext

**Responsabilidad:** CRUD de prestaciones, configuración de prestaciones por perfil.

**Interface:**
```typescript
interface PrestacionesContextType {
  prestaciones: Prestacion[];
  prestacionConfig: PrestacionConfig;
  allPrestaciones: string[];
  isLoading: boolean;
  addPrestacion: (prestacion: Prestacion) => void;
  updatePrestacion: (prestacion: Prestacion) => void;
  deletePrestacion: (id: string) => void;
  getPrestacionesByPatient: (patientId: string) => Prestacion[];
  getPrestacionById: (id: string) => Prestacion | null;
  updatePrestacionConfig: (config: PrestacionConfig) => void;
  updateAllPrestaciones: (prestaciones: string[]) => void;
  refreshPrestaciones: () => void;
}
```

**Integración:**
- ✅ PrestacionStorageService (FASE 2)
- ✅ ConfigStorageService (FASE 2)
- ✅ DEFAULT_PRESTACION_PERFIL_MAP (constants)

**Características:**
- Gestión de prestaciones por paciente
- Configuración dinámica por perfil profesional
- Lista maestra de tipos de prestaciones
- Filtrado eficiente por paciente

**Uso:**
```typescript
import { usePrestaciones } from '@/contexts';

const { prestaciones, getPrestacionesByPatient, addPrestacion } = usePrestaciones();
```

---

### 4. ConfigContext

**Responsabilidad:** Configuraciones del sistema, fármacos, usuarios administrativos.

**Interface:**
```typescript
interface ConfigContextType {
  // Fármacos
  farmacos: Farmaco[];
  updateFarmacos: (farmacos: Farmaco[]) => void;
  addFarmaco: (farmaco: Farmaco) => void;
  deleteFarmaco: (id: string) => void;

  // Usuarios (gestión administrativa)
  allUsers: User[];
  updateUsers: (users: User[]) => void;
  getUserByUsername: (username: string) => User | null;

  // Notificaciones administrativas
  adminNotifications: string[];
  addNotification: (notification: string) => void;
  clearNotifications: () => void;

  isLoading: boolean;
}
```

**Integración:**
- ✅ FarmacoStorageService (FASE 2)
- ✅ UserStorageService (FASE 2)
- ✅ INITIAL_FARMACOS (constants)

**Características:**
- Catálogo maestro de fármacos
- Gestión administrativa de usuarios
- Sistema de notificaciones para administradores
- Configuraciones globales del sistema

**Uso:**
```typescript
import { useConfig } from '@/contexts';

const { farmacos, allUsers, addNotification } = useConfig();
```

---

### 5. ThemeContext

**Responsabilidad:** Tema visual, perfiles de usuario, zoom global.

**Interface:**
```typescript
interface ThemeContextType {
  // Tema actual
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  theme: ReturnType<typeof getThemeClasses>;

  // Perfiles de usuario (para usuarios con múltiples contextos)
  availableProfiles: UserProfile[];
  activeProfile: UserProfile | null;
  setActiveProfile: (profile: UserProfile | null) => void;
  setAvailableProfiles: (profiles: UserProfile[]) => void;

  // Zoom global
  zoom: number;
  setZoom: (zoom: number) => void;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;
}
```

**Integración:**
- ✅ getThemeClasses (themeUtils)
- ✅ LocalStorage (persistencia de zoom)
- ✅ User profiles (multi-contexto)

**Características:**
- Gestión dinámica de colores de tema (blue, purple, green, orange, red, teal)
- Soporte para perfiles múltiples (ej: Humberto Escobar)
- Zoom global persistente (75% - 150%)
- Aplicación automática de estilos CSS

**Uso:**
```typescript
import { useTheme } from '@/contexts';

const { theme, zoom, increaseZoom, activeProfile } = useTheme();
```

---

## 🔗 AppProviders - Provider Principal

**Archivo:** `src/contexts/AppProviders.tsx`

**Estructura de anidamiento optimizada:**

```typescript
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ConfigProvider>
        <ThemeProvider>
          <PatientsProvider>
            <PrestacionesProvider>
              {children}
            </PrestacionesProvider>
          </PatientsProvider>
        </ThemeProvider>
      </ConfigProvider>
    </AuthProvider>
  );
};
```

**Orden de dependencias:**
1. **AuthProvider** - Sin dependencias
2. **ConfigProvider** - Necesita estar disponible para otros
3. **ThemeProvider** - Usa datos de usuario de AuthContext
4. **PatientsProvider** - Puede depender de Auth para permisos
5. **PrestacionesProvider** - Depende de Config para configuraciones

---

## 📚 Hooks Personalizados

Todos los contexts exportan hooks personalizados con validación automática:

```typescript
// Implementación ejemplo
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Ventajas:**
- ✅ Type-safe automático
- ✅ Error claro si se usa fuera del provider
- ✅ Autocomplete en IDE
- ✅ Refactoring seguro

---

## 🎯 Uso en la Aplicación

### Integración en App.tsx (PRÓXIMO PASO - NO IMPLEMENTADO AÚN)

```typescript
import { AppProviders } from './src/contexts';

const App: React.FC = () => {
  return (
    <AppProviders>
      <div className="app">
        {/* Ya no necesitas pasar props! */}
        <MainApp />
      </div>
    </AppProviders>
  );
};
```

### Uso en Componentes

**Antes (Props Drilling):**
```typescript
interface PatientFileViewProps {
  user: User;
  patient: Patient;
  prestaciones: Prestacion[];
  farmacos: Farmaco[];
  onUpdatePatient: (p: Patient) => void;
  onUpdatePrestacion: (p: Prestacion) => void;
  theme: ThemeColor;
}

const PatientFileView: React.FC<PatientFileViewProps> = ({
  user, patient, prestaciones, farmacos, onUpdatePatient,
  onUpdatePrestacion, theme
}) => {
  // ...
};
```

**Después (Context API):**
```typescript
import { useAuth, usePatients, usePrestaciones, useConfig, useTheme } from '@/contexts';

const PatientFileView: React.FC = () => {
  const { user } = useAuth();
  const { selectedPatient, updatePatient } = usePatients();
  const { prestaciones, updatePrestacion } = usePrestaciones();
  const { farmacos } = useConfig();
  const { theme } = useTheme();

  // Lógica sin cambios, pero sin props drilling!
};
```

---

## 🚀 Beneficios Inmediatos

### 1. Eliminación de Props Drilling

**Antes:**
- App.tsx pasa 10+ props a MainApp
- MainApp pasa 7+ props a PatientFileView
- PatientFileView pasa props a secciones

**Después:**
- Cada componente consume directamente lo que necesita
- Sin props intermedios
- Código más limpio y mantenible

### 2. Mejor Separación de Responsabilidades

Cada context tiene una responsabilidad única y clara:
- **AuthContext:** Solo autenticación
- **PatientsContext:** Solo pacientes
- **PrestacionesContext:** Solo prestaciones
- **ConfigContext:** Solo configuraciones
- **ThemeContext:** Solo UI/UX

### 3. Testing Mejorado

```typescript
// Mockear contexts es más fácil que pasar 10+ props
<AuthProvider value={mockAuth}>
  <ComponentToTest />
</AuthProvider>
```

### 4. Reutilización de Lógica

Los hooks personalizados encapsulan lógica compleja:
- `useAuth()` maneja toda la autenticación
- `usePatients()` maneja todo el CRUD de pacientes
- Lógica centralizada y reutilizable

### 5. Performance

Los contexts usan `useMemo`, `useCallback` para optimizar:
- Evita re-renders innecesarios
- Memoización de valores computados
- Callbacks estables

---

## 🔧 Integración con Servicios FASE 2

Todos los contexts están completamente integrados con los servicios especializados:

| Context | Servicio Integrado |
|---------|-------------------|
| AuthContext | `AuthService` |
| PatientsContext | `PatientStorageService` |
| PrestacionesContext | `PrestacionStorageService`, `ConfigStorageService` |
| ConfigContext | `FarmacoStorageService`, `UserStorageService` |
| ThemeContext | `themeUtils`, LocalStorage |

**Ventaja:** Separación de responsabilidades mantenida. Los contexts orquestan, los services ejecutan.

---

## 📁 Estructura de Archivos

```
C:\Users\betoe\SIMORAHealth\
├── src/
│   ├── contexts/
│   │   ├── AuthContext.tsx         (✅ 147 líneas)
│   │   ├── PatientsContext.tsx     (✅ 203 líneas)
│   │   ├── PrestacionesContext.tsx (✅ 169 líneas)
│   │   ├── ConfigContext.tsx       (✅ 142 líneas)
│   │   ├── ThemeContext.tsx        (✅ 171 líneas)
│   │   ├── AppProviders.tsx        (✅ 43 líneas)
│   │   └── index.ts                (✅ 23 líneas)
│   │
│   └── types/
│       └── index.ts                (✅ Tipos centralizados)
│
├── services/
│   ├── auth/
│   │   └── AuthService.ts
│   ├── storage/
│   │   ├── PatientStorageService.ts
│   │   ├── PrestacionStorageService.ts
│   │   ├── ConfigStorageService.ts
│   │   ├── FarmacoStorageService.ts
│   │   └── UserStorageService.ts
│   └── firebase.ts
│
├── utils/
│   └── themeUtils.ts
│
└── docs/
    └── CONTEXT_API_IMPLEMENTATION.md (este archivo)
```

---

## ✅ Estado de Implementación

| Componente | Estado | Notas |
|------------|--------|-------|
| AuthContext | ✅ Completo | Integrado con Firebase Auth |
| PatientsContext | ✅ Completo | Carga desde Firestore |
| PrestacionesContext | ✅ Completo | Integrado con ConfigService |
| ConfigContext | ✅ Completo | Gestión de fármacos y usuarios |
| ThemeContext | ✅ Completo | Soporte multi-perfil |
| AppProviders | ✅ Completo | Anidamiento optimizado |
| Hooks personalizados | ✅ Completo | 5 hooks implementados |
| Exportaciones index.ts | ✅ Completo | Exportaciones centralizadas |
| Build | ✅ Exitoso | Sin errores ni warnings |

---

## 🎯 Próximos Pasos (FASE 3B)

### IMPORTANTE: NO modificar componentes todavía

Los contexts están listos, pero **NO** se deben migrar componentes aún hasta recibir la orden.

### Cuando se autorice la migración:

1. **Migrar App.tsx:**
   - Envolver con `<AppProviders>`
   - Eliminar estados locales
   - Eliminar props a MainApp

2. **Migrar MainApp.tsx:**
   - Reemplazar props por hooks
   - Eliminar props a componentes hijos

3. **Migrar componentes hijos:**
   - PatientFileView
   - StatisticsView
   - AdminView
   - Otros componentes

4. **Testing:**
   - Verificar que todo funciona
   - Testing de cada hook
   - Testing de integración

---

## 📊 Métricas de Éxito

### Props Eliminados

**Antes:**
- App.tsx → MainApp: 10+ props
- MainApp → PatientFileView: 7+ props
- Total props pasados: ~20+

**Después (estimado):**
- App.tsx → MainApp: 0 props
- MainApp → PatientFileView: 0 props
- Total props pasados: 0

### Líneas de Código

**Contexts implementados:** ~900 líneas
- AuthContext: 147 líneas
- PatientsContext: 203 líneas
- PrestacionesContext: 169 líneas
- ConfigContext: 142 líneas
- ThemeContext: 171 líneas
- AppProviders: 43 líneas
- index.ts: 23 líneas

**Código eliminado (estimado):** ~500 líneas de props drilling

---

## 🔍 Ejemplos de Uso Avanzado

### Uso combinado de múltiples contexts

```typescript
import { useAuth, usePatients, usePrestaciones, useTheme } from '@/contexts';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { selectedPatient } = usePatients();
  const { getPrestacionesByPatient } = usePrestaciones();
  const { theme } = useTheme();

  const prestaciones = selectedPatient
    ? getPrestacionesByPatient(selectedPatient.firestoreId)
    : [];

  return (
    <div className={theme.bg}>
      <h1>Paciente: {selectedPatient?.nombre}</h1>
      <p>Usuario: {user?.name}</p>
      <p>Prestaciones: {prestaciones.length}</p>
    </div>
  );
};
```

### Actualización optimista con contexts

```typescript
const { updatePatient } = usePatients();
const { addNotification } = useConfig();

const handleSavePatient = async (patient: Patient) => {
  try {
    updatePatient(patient);
    addNotification(`Paciente ${patient.nombre} actualizado`);
  } catch (error) {
    addNotification(`Error actualizando paciente: ${error.message}`);
  }
};
```

### Gestión de tema dinámico

```typescript
const { theme, setThemeColor, activeProfile, setActiveProfile } = useTheme();

const handleProfileChange = (profile: UserProfile) => {
  setActiveProfile(profile);
  // El tema se actualiza automáticamente
};
```

---

## 🛡️ Type Safety

Todos los contexts son completamente type-safe:

```typescript
// ✅ TypeScript detecta errores automáticamente
const { user } = useAuth();
user.name; // ✅ OK - User tiene 'name'
user.invalidProp; // ❌ Error - Property 'invalidProp' does not exist

const { patients } = usePatients();
patients.map(p => p.nombre); // ✅ OK - Patient tiene 'nombre'
patients.map(p => p.invalid); // ❌ Error - Property 'invalid' does not exist
```

---

## 📖 Referencias

### Archivos Clave

- **Contexts:** `C:\Users\betoe\SIMORAHealth\src\contexts\`
- **Services:** `C:\Users\betoe\SIMORAHealth\services\`
- **Types:** `C:\Users\betoe\SIMORAHealth\src\types\index.ts`
- **Constants:** `C:\Users\betoe\SIMORAHealth\constants.ts`

### Documentación Relacionada

- FASE 2: Servicios especializados
- Firebase Integration Guide
- TypeScript Types Reference

---

## 🎉 Conclusión

La implementación de Context API está **100% completa** y lista para uso.

**Logros:**
✅ 5 contexts implementados
✅ 5 hooks personalizados
✅ AppProviders configurado
✅ Integración con servicios FASE 2
✅ Build exitoso
✅ Type-safe completo
✅ Documentación completa

**Impacto esperado:**
- 🚀 Eliminación completa de props drilling
- 📦 Mejor organización del código
- 🔧 Más fácil de mantener y testear
- ⚡ Mejor performance
- 👨‍💻 Mejor experiencia de desarrollo

---

**Fecha de Implementación:** 2025-11-18
**Autor:** Claude Code (Anthropic)
**Estado:** ✅ COMPLETADO - Listo para integración en componentes
