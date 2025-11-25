# MainApp - Diagrama de Arquitectura

## Flujo de Datos y Responsabilidades

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                     │
│                         (Componente raíz)                                │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 │ props (user, patients, etc.)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         components/MainApp.tsx                           │
│                          (Re-export)                                     │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 │ export { default } from './MainApp/MainApp'
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    components/MainApp/MainApp.tsx                        │
│                      (Orquestador - 193 líneas)                          │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      Custom Hooks                                │    │
│  │  ┌──────────────────────────────────────────────────────────┐   │    │
│  │  │ useCurrentView()                                          │   │    │
│  │  │  - activeView, selectedPatientId, focusIntent            │   │    │
│  │  │  - handleNavClick, handleSelectPatient, handleBackToList │   │    │
│  │  └──────────────────────────────────────────────────────────┘   │    │
│  │  ┌──────────────────────────────────────────────────────────┐   │    │
│  │  │ useProfileManagement({ user, allUsers, patients, ... })  │   │    │
│  │  │  - activeProfile, currentTheme, accessiblePatients       │   │    │
│  │  │  - handleProfileChange, handleThemeChange                │   │    │
│  │  └──────────────────────────────────────────────────────────┘   │    │
│  │  ┌──────────────────────────────────────────────────────────┐   │    │
│  │  │ useNavigationShortcuts({ userRole, handleNavClick, ... })│   │    │
│  │  │  - Event listeners (Alt+1-9, Ctrl+K, etc.)               │   │    │
│  │  └──────────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                   Estado Local                                   │    │
│  │  - prestaciones: Prestacion[]                                   │    │
│  │  - Handlers: handleAddPrestacion, handleAddMultiple...          │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└───────────────┬───────────────────────────────────┬─────────────────────┘
                │                                   │
                │                                   │
                ▼                                   ▼
┌───────────────────────────────┐   ┌───────────────────────────────────┐
│     NavigationBar             │   │          ViewRouter               │
│  (122 líneas)                 │   │      (171 líneas)                 │
│                               │   │                                   │
│  ┌────────────────────────┐   │   │  ┌─────────────────────────────┐ │
│  │ ProfileSwitcher        │   │   │  │ selectedPatient?            │ │
│  │ - Avatar + dropdown    │   │   │  │  YES → PatientFileView      │ │
│  └────────────────────────┘   │   │  │  NO  → Switch(activeView):  │ │
│                               │   │  │                             │ │
│  ┌────────────────────────┐   │   │  │  - ingresarPrestacion      │ │
│  │ Navigation Buttons     │   │   │  │  - ingresarActividad       │ │
│  │ - News                 │   │   │  │  - news                    │ │
│  │ - Actividad Reciente   │   │   │  │  - actividadReciente       │ │
│  │ - Calendario           │   │   │  │  - buscar                  │ │
│  │ - Índice Pacientes     │   │   │  │  - calendario              │ │
│  │ - Estadísticas         │   │   │  │  - estadisticas            │ │
│  │ - Recursos             │   │   │  │  - anexos                  │ │
│  │ - Admin (if role)      │   │   │  │  - admin                   │ │
│  └────────────────────────┘   │   │  │  - registro (default)      │ │
│                               │   │  └─────────────────────────────┘ │
│  ┌────────────────────────┐   │   │                                   │
│  │ Utility Buttons        │   │   │  Props: patients, prestaciones,   │
│  │ - GlobalZoom           │   │   │         user, handlers, config    │
│  │ - DrugChecker          │   │   │                                   │
│  │ - Logout               │   │   │  Returns: JSX.Element             │
│  └────────────────────────┘   │   │          (Vista correspondiente)  │
└───────────────────────────────┘   └───────────────────────────────────┘
```

## Jerarquía de Componentes

```
MainApp (193L)
├── NavigationBar (122L)
│   ├── ProfileSwitcher (externo)
│   ├── DrugInteractionChecker (externo)
│   └── GlobalZoom (externo)
│
└── ViewRouter (171L)
    ├── PatientFileView (si selectedPatient)
    │
    └── Vistas según activeView:
        ├── IngresarPrestacionView
        ├── IngresarActividadView
        ├── NewsView
        ├── RecentActivityView
        ├── PatientSearchView
        ├── Calendar
        ├── StatisticsView
        ├── AnexosView
        ├── AdminView
        └── PatientIndexView
```

## Flujo de Estado - useCurrentView

```
┌─────────────────────────────────────────────────────────────────┐
│                      useCurrentView                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Estado:                                                         │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ activeView: View = 'ingresarPrestacion'               │     │
│  │ selectedPatientId: string | null = null               │     │
│  │ focusIntent: string | null = null                     │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                  │
│  Handlers:                                                       │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ handleNavClick(view)                                   │     │
│  │   → setActiveView(view)                                │     │
│  │   → setSelectedPatientId(null)                         │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ handleSelectPatient(id)                                │     │
│  │   → setSelectedPatientId(id)                           │     │
│  │   → setActiveView('buscar')                            │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ handleBackToList()                                     │     │
│  │   → setSelectedPatientId(null)                         │     │
│  │   → setActiveView('registro')                          │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## Flujo de Estado - useProfileManagement

```
┌──────────────────────────────────────────────────────────────────┐
│                    useProfileManagement                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Input Props:                                                    │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ user: User                                             │      │
│  │ allUsers: User[]                                       │      │
│  │ patients: Patient[]                                    │      │
│  │ onUpdateUsers: (users: User[]) => void                │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│  Estado:                                                         │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ activeProfile: UserProfile | null                     │      │
│  │   (calculado de user.availableProfiles)               │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│  Valores Memoizados:                                             │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ currentTheme = useMemo(() =>                          │      │
│  │   activeProfile?.themeColor || user.themeColor        │      │
│  │ )                                                      │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ theme = useMemo(() =>                                 │      │
│  │   getThemeClasses(currentTheme)                       │      │
│  │ )                                                      │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ accessiblePatients = useMemo(() => {                  │      │
│  │   let filtered = filterPatientsByAccess(patients);    │      │
│  │   const centro = activeProfile?.centro || user.centro;│      │
│  │   if (centro !== 'default')                           │      │
│  │     filtered = filtered.filter(p => p.centro === ...) │      │
│  │   return filtered;                                     │      │
│  │ })                                                     │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│  Handlers:                                                       │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ handleProfileChange(profileId)                        │      │
│  │   → setActiveProfile(newProfile)                      │      │
│  │   → Update user with new profile                      │      │
│  │   → onUpdateUsers([...updatedUsers])                  │      │
│  │   → LocalStorageService.updateUser(updatedUser)       │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ handleThemeChange(newTheme)                           │      │
│  │   → Update activeProfile.themeColor                   │      │
│  │   → Update user.availableProfiles                     │      │
│  │   → onUpdateUsers([...updatedUsers])                  │      │
│  │   → LocalStorageService.updateUser(updatedUser)       │      │
│  └───────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────────┘
```

## Flujo de Atajos de Teclado

```
┌──────────────────────────────────────────────────────────────┐
│            useNavigationShortcuts                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Event: keydown                                              │
│                                                               │
│  ┌────────────────────────────────────────────────────┐      │
│  │ isInputFocused?                                    │      │
│  │  YES → Ignorar Alt shortcuts                       │      │
│  │  NO  → Procesar shortcuts                          │      │
│  └────────────────────────────────────────────────────┘      │
│                                                               │
│  Shortcuts:                                                  │
│  ┌────────────────────────────────────────────────────┐      │
│  │ Ctrl + Shift + S → Toggle sidebar                 │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │ Ctrl + K → handleNavClick('buscar')                │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │ Alt + I → setFocusIntent(...)                      │      │
│  │         → handleNavClick('ingresarPrestacion')     │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │ Alt + R → handleNavClick('ingresarActividad')      │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │ Alt + 1-9 → handleNavClick(navMap[key])            │      │
│  │   1 → ingresarPrestacion                           │      │
│  │   2 → actividadReciente                            │      │
│  │   3 → buscar                                        │      │
│  │   4 → calendario                                    │      │
│  │   5 → registro                                      │      │
│  │   6 → estadisticas                                  │      │
│  │   7 → anexos                                        │      │
│  │   8 → admin (if userRole === 'admin')              │      │
│  └────────────────────────────────────────────────────┘      │
│                                                               │
│  Cleanup: removeEventListener on unmount                     │
└──────────────────────────────────────────────────────────────┘
```

## Patrones de Diseño Utilizados

### 1. Container/Presentational Pattern
- **Container**: `MainApp.tsx` (lógica y estado)
- **Presentational**: `NavigationBar.tsx`, `ViewRouter.tsx` (UI pura)

### 2. Custom Hooks Pattern
- Extracción de lógica reutilizable en hooks
- Separación de responsabilidades
- Testing independiente

### 3. Composition Pattern
- Componentes pequeños y enfocados
- Composición en MainApp
- Props drilling minimizado

### 4. Strategy Pattern
- `ViewRouter`: Estrategia de renderizado según vista
- `useNavigationShortcuts`: Estrategia de navegación por teclado

### 5. Observer Pattern
- Event listeners en `useNavigationShortcuts`
- Cleanup automático

## Ventajas de la Arquitectura

### Mantenibilidad
- ✅ Componentes pequeños y enfocados
- ✅ Responsabilidades claramente definidas
- ✅ Fácil localización de código

### Testabilidad
- ✅ Hooks testables en aislamiento
- ✅ Componentes testables sin estado complejo
- ✅ Routing centralizado para E2E

### Rendimiento
- ✅ Memoización optimizada
- ✅ Re-renders controlados
- ✅ Code splitting ready

### Escalabilidad
- ✅ Fácil agregar nuevas vistas
- ✅ Fácil agregar nuevos hooks
- ✅ Estructura modular extensible

## Próximos Pasos

1. **Context API**: Eliminar props drilling con contexts
2. **Lazy Loading**: Code splitting de vistas
3. **Testing**: Unit tests para hooks y componentes
4. **Performance**: React.memo para componentes pesados
5. **Documentation**: JSDoc para tipos y funciones

---

**Versión**: 1.0
**Fecha**: 2025-11-18
