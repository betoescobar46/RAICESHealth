# SIMORA Health - Context API

## Quick Start

### 1. Importar hooks

```typescript
import { useAuth, usePatients, usePrestaciones, useConfig, useTheme } from '@/contexts';
```

### 2. Usar en componentes

```typescript
const MyComponent: React.FC = () => {
  // Autenticación
  const { user, isAuthenticated, logout } = useAuth();

  // Pacientes
  const { patients, selectedPatient, updatePatient } = usePatients();

  // Prestaciones
  const { prestaciones, addPrestacion } = usePrestaciones();

  // Configuración
  const { farmacos, allUsers } = useConfig();

  // Tema
  const { theme, zoom, increaseZoom } = useTheme();

  return <div>...</div>;
};
```

## Contexts Disponibles

### useAuth()
- `user: User | null` - Usuario actual
- `isAuthenticated: boolean` - Estado de autenticación
- `login(username, password)` - Iniciar sesión
- `logout()` - Cerrar sesión
- `changePassword(username, old, new)` - Cambiar contraseña

### usePatients()
- `patients: Patient[]` - Lista de pacientes
- `selectedPatient: Patient | null` - Paciente seleccionado
- `setSelectedPatient(patient)` - Seleccionar paciente
- `addPatient(patient)` - Agregar paciente
- `updatePatient(patient)` - Actualizar paciente
- `deletePatient(id)` - Eliminar paciente
- `getPatientById(id)` - Obtener paciente por ID

### usePrestaciones()
- `prestaciones: Prestacion[]` - Lista de prestaciones
- `prestacionConfig: PrestacionConfig` - Configuración
- `allPrestaciones: string[]` - Tipos de prestaciones
- `addPrestacion(prestacion)` - Agregar prestación
- `updatePrestacion(prestacion)` - Actualizar prestación
- `getPrestacionesByPatient(id)` - Filtrar por paciente

### useConfig()
- `farmacos: Farmaco[]` - Catálogo de fármacos
- `allUsers: User[]` - Usuarios del sistema
- `adminNotifications: string[]` - Notificaciones admin
- `updateFarmacos(farmacos)` - Actualizar fármacos
- `updateUsers(users)` - Actualizar usuarios
- `addNotification(msg)` - Agregar notificación

### useTheme()
- `themeColor: ThemeColor` - Color actual del tema
- `theme: {...}` - Clases CSS del tema
- `activeProfile: UserProfile | null` - Perfil activo
- `zoom: number` - Nivel de zoom actual
- `setThemeColor(color)` - Cambiar color
- `increaseZoom()` - Aumentar zoom
- `decreaseZoom()` - Disminuir zoom

## Estructura

```
src/contexts/
├── AuthContext.tsx         - Autenticación y sesiones
├── PatientsContext.tsx     - Gestión de pacientes
├── PrestacionesContext.tsx - Gestión de prestaciones
├── ConfigContext.tsx       - Configuraciones del sistema
├── ThemeContext.tsx        - Tema visual y zoom
├── AppProviders.tsx        - Provider principal
└── index.ts                - Exportaciones
```

## Integración en App

```typescript
import { AppProviders } from '@/contexts';

function App() {
  return (
    <AppProviders>
      <YourApp />
    </AppProviders>
  );
}
```

## TypeScript

Todos los contexts son completamente type-safe. TypeScript detectará errores automáticamente.

## Estado

✅ **COMPLETADO** - Listo para usar
- Build: ✅ Exitoso
- Tests: ⏳ Pendiente
- Integración: ⏳ Pendiente (FASE 3B)
