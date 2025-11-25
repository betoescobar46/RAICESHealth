# MainApp - Arquitectura Modular

Componente principal de la aplicación refactorizado en arquitectura modular.

## Estructura

```
MainApp/
├── MainApp.tsx (193 líneas) - Orquestador principal
├── types.ts (22 líneas) - Tipos locales
├── components/
│   ├── HotkeysHelp.tsx (44 líneas) - Modal de ayuda
│   ├── DateTimeDisplay.tsx (39 líneas) - Reloj/fecha
│   ├── NavigationBar.tsx (122 líneas) - Header + navegación
│   └── ViewRouter.tsx (171 líneas) - Routing de vistas
└── hooks/
    ├── useCurrentView.ts (47 líneas) - Gestión de vista actual
    ├── useProfileManagement.ts (130 líneas) - Perfiles y temas
    └── useNavigationShortcuts.ts (74 líneas) - Atajos de teclado
```

**Total**: 842 líneas distribuidas en 9 archivos (vs 501 líneas en 1 archivo)

## Componentes

### MainApp.tsx
Orquestador principal que integra todos los hooks y componentes.

**Responsabilidades**:
- Coordinar hooks personalizados
- Gestionar estado de prestaciones
- Renderizar NavigationBar y ViewRouter
- Configurar navegación y shortcuts

### HotkeysHelp.tsx
Modal flotante con lista de atajos de teclado.

**Características**:
- Autocontenido (sin props)
- Tooltip hover con lista de shortcuts
- Componente `Kbd` para estilos de teclas

### DateTimeDisplay.tsx
Reloj y fecha en formato chileno.

**Características**:
- Actualización cada segundo
- Formato `es-CL` con zona horaria Santiago
- Estado interno independiente

### NavigationBar.tsx
Barra de navegación completa con header, perfil y utilidades.

**Props**: `user`, `activeProfile`, `activeView`, `navItems`, `navShortcutMap`, `onNavClick`, `onProfileChange`, `onLogout`

**Características**:
- Avatar del usuario con iniciales
- ProfileSwitcher para perfiles múltiples
- Botones de navegación con tooltips
- GlobalZoom, DrugInteractionChecker, Logout

### ViewRouter.tsx
Centraliza routing y renderizado condicional de vistas.

**Lógica**:
1. Si `selectedPatient` → `PatientFileView`
2. Switch según `activeView`:
   - `ingresarPrestacion` → `IngresarPrestacionView`
   - `ingresarActividad` → `IngresarActividadView`
   - `news` → `NewsView`
   - `actividadReciente` → `RecentActivityView`
   - `buscar` → `PatientSearchView`
   - `calendario` → `Calendar`
   - `estadisticas` → `StatisticsView`
   - `anexos` → `AnexosView`
   - `admin` → `AdminView`
   - `registro` → `PatientIndexView`

## Hooks

### useCurrentView
Gestiona vista actual, paciente seleccionado y navegación.

**Estado**:
- `activeView`: Vista actual
- `selectedPatientId`: ID del paciente seleccionado
- `focusIntent`: Intent para foco de input

**Handlers**:
- `handleNavClick(view)`: Cambia vista y limpia selección
- `handleSelectPatient(id)`: Selecciona paciente
- `handleBackToList()`: Vuelve a lista de pacientes

### useProfileManagement
Gestiona perfiles de usuario, temas y filtrado de pacientes.

**Props**: `user`, `allUsers`, `patients`, `onUpdateUsers`

**Estado memoizado**:
- `activeProfile`: Perfil activo actual
- `currentTheme`: Tema basado en perfil/usuario
- `theme`: Clases CSS del tema
- `accessiblePatients`: Pacientes filtrados por permisos y centro

**Handlers**:
- `handleProfileChange(profileId)`: Cambia perfil activo
- `handleThemeChange(theme)`: Cambia tema

**Optimizaciones**:
- `useMemo` para tema y clases CSS
- `useMemo` para filtrado de pacientes
- Logging de debug para troubleshooting

### useNavigationShortcuts
Maneja atajos de teclado globales.

**Props**: `userRole`, `handleNavClick`, `setFocusIntent`

**Shortcuts**:
- `Ctrl + Shift + S`: Toggle sidebar
- `Ctrl + K`: Ir a búsqueda
- `Alt + I`: Ingresar prestación con foco
- `Alt + R`: Ingresar actividad
- `Alt + 1-9`: Navegación numérica

**Características**:
- Detecta input/textarea enfocado
- Verifica rol para vista Admin
- Cleanup automático

## Tipos

### View
```typescript
type View =
    | 'registro'
    | 'calendario'
    | 'estadisticas'
    | 'patientIndex'
    | 'admin'
    | 'anexos'
    | 'buscar'
    | 'ingresarPrestacion'
    | 'actividadReciente'
    | 'ingresarActividad'
    | 'news';
```

### NavItem
```typescript
interface NavItem {
    key: string;
    label: string;
    view: string;
}
```

### NavShortcutMap
```typescript
interface NavShortcutMap {
    [key: string]: string;
}
```

## Uso

```typescript
import MainApp from './components/MainApp';

<MainApp
    user={user}
    allUsers={allUsers}
    patients={patients}
    notifications={notifications}
    onLogout={onLogout}
    onUpdateUsers={onUpdateUsers}
    LogoComponent={LogoComponent}
    prestacionConfig={prestacionConfig}
    onUpdatePrestacionConfig={onUpdatePrestacionConfig}
    allPrestaciones={allPrestaciones}
    onUpdateAllPrestaciones={onUpdateAllPrestaciones}
    allFarmacos={allFarmacos}
    onUpdateAllFarmacos={onUpdateAllFarmacos}
    onUpdatePatient={onUpdatePatient}
/>
```

## Métricas

| Métrica | Valor |
|---------|-------|
| Archivos | 9 |
| Líneas totales | 842 |
| Líneas MainApp | 193 (reducción 61%) |
| Componentes | 4 |
| Hooks | 3 |
| Reducción complejidad | 67% |

## Documentación Completa

Ver `docs/MAINAPP_REFACTOR.md` para documentación detallada de la refactorización.
