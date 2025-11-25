# Context API - Ejemplo de Migración

## Antes vs Después - Comparación Visual

### 1. App.tsx

#### ANTES (Props Drilling)

```typescript
const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [prestacionConfig, setPrestacionConfig] = useState<PrestacionConfig>(DEFAULT_PRESTACION_PERFIL_MAP);
    const [allPrestaciones, setAllPrestaciones] = useState<string[]>(INITIAL_ALL_PRESTACIONES);
    const [allFarmacos, setAllFarmacos] = useState<Farmaco[]>(INITIAL_FARMACOS);
    const [adminNotifications, setAdminNotifications] = useState<string[]>([]);

    // ... 200 líneas de lógica ...

    return (
        <div className="text-sm text-gray-800">
            {currentUser ? (
                <MainApp
                    user={currentUser}
                    allUsers={users}
                    patients={patients}
                    onLogout={handleLogout}
                    onUpdateUsers={handleUpdateUsers}
                    LogoComponent={RlpLogo}
                    notifications={adminNotifications}
                    prestacionConfig={prestacionConfig}
                    onUpdatePrestacionConfig={handleUpdatePrestacionConfig}
                    allPrestaciones={allPrestaciones}
                    onUpdateAllPrestaciones={handleUpdateAllPrestaciones}
                    allFarmacos={allFarmacos}
                    onUpdateAllFarmacos={handleUpdateAllFarmacos}
                    onUpdatePatient={handleUpdatePatient}
                />
            ) : (
                <LoginPage
                    LogoComponent={RlpLogo}
                    onChangePassword={handleChangePassword}
                    onNotifyAdmin={handleNotifyAdmin}
                />
            )}
        </div>
    );
};
```

**Problemas:**
- ❌ 10+ props pasados a MainApp
- ❌ 7 estados locales
- ❌ 10+ funciones handlers
- ❌ 200+ líneas de lógica en un solo archivo
- ❌ Difícil de testear
- ❌ Difícil de mantener

---

#### DESPUÉS (Context API)

```typescript
import { AppProviders } from './src/contexts';

const App: React.FC = () => {
    return (
        <AppProviders>
            <div className="text-sm text-gray-800">
                <MainApp />
            </div>
        </AppProviders>
    );
};
```

**Ventajas:**
- ✅ 0 props pasados
- ✅ 0 estados locales
- ✅ 0 funciones handlers
- ✅ 10 líneas de código
- ✅ Fácil de testear
- ✅ Fácil de mantener

---

### 2. MainApp.tsx

#### ANTES (Props Drilling)

```typescript
interface MainAppProps {
    user: User;
    allUsers: User[];
    patients: Patient[];
    notifications: string[];
    onLogout: () => void;
    onUpdateUsers: (users: User[]) => void;
    LogoComponent: React.FC<{className?: string}>;
    prestacionConfig: PrestacionConfig;
    onUpdatePrestacionConfig: (config: PrestacionConfig) => void;
    allPrestaciones: string[];
    onUpdateAllPrestaciones: (prestaciones: string[]) => void;
    allFarmacos: Farmaco[];
    onUpdateAllFarmacos: (farmacos: Farmaco[]) => void;
    onUpdatePatient: (updatedPatient: Patient) => void;
}

const MainApp: React.FC<MainAppProps> = ({
    user,
    allUsers,
    patients,
    notifications,
    onLogout,
    onUpdateUsers,
    LogoComponent,
    prestacionConfig,
    onUpdatePrestacionConfig,
    allPrestaciones,
    onUpdateAllPrestaciones,
    allFarmacos,
    onUpdateAllFarmacos,
    onUpdatePatient
}) => {
    // ... código ...

    return (
        <PatientFileView
            user={user}
            patient={selectedPatient}
            prestaciones={prestaciones}
            farmacos={allFarmacos}
            onUpdatePatient={onUpdatePatient}
            // ... más props ...
        />
    );
};
```

**Problemas:**
- ❌ 14 props en el interface
- ❌ Props solo se pasan a componentes hijos
- ❌ MainApp actúa como intermediario innecesario

---

#### DESPUÉS (Context API)

```typescript
import { useAuth, usePatients, usePrestaciones, useConfig, useTheme } from '@/contexts';

const MainApp: React.FC = () => {
    const { user, logout } = useAuth();
    const { patients } = usePatients();
    const { prestacionConfig } = usePrestaciones();
    const { farmacos } = useConfig();
    const { theme } = useTheme();

    // ... código ...

    return (
        <PatientFileView />
    );
};
```

**Ventajas:**
- ✅ 0 props en el interface
- ✅ Consume directamente lo que necesita
- ✅ No actúa como intermediario

---

### 3. PatientFileView.tsx

#### ANTES (Props Drilling)

```typescript
interface PatientFileViewProps {
    user: User;
    patient: Patient;
    prestaciones: Prestacion[];
    farmacos: Farmaco[];
    prestacionConfig: PrestacionConfig;
    onUpdatePatient: (patient: Patient) => void;
    onUpdatePrestacion: (prestacion: Prestacion) => void;
}

const PatientFileView: React.FC<PatientFileViewProps> = ({
    user,
    patient,
    prestaciones,
    farmacos,
    prestacionConfig,
    onUpdatePatient,
    onUpdatePrestacion
}) => {
    // Usa estas props Y las pasa a componentes hijos
    return (
        <div>
            <ClinicalNotesSection
                patient={patient}
                user={user}
                onUpdate={onUpdatePatient}
            />
            <PrestacionesSection
                prestaciones={prestaciones}
                config={prestacionConfig}
                onUpdate={onUpdatePrestacion}
            />
        </div>
    );
};
```

**Problemas:**
- ❌ 7 props recibidos
- ❌ Props pasados a secciones hijas
- ❌ Cadena de dependencias

---

#### DESPUÉS (Context API)

```typescript
import { useAuth, usePatients, usePrestaciones, useConfig } from '@/contexts';

const PatientFileView: React.FC = () => {
    const { user } = useAuth();
    const { selectedPatient, updatePatient } = usePatients();
    const { prestaciones, prestacionConfig, updatePrestacion } = usePrestaciones();
    const { farmacos } = useConfig();

    // Usa directamente lo que necesita
    return (
        <div>
            <ClinicalNotesSection />
            <PrestacionesSection />
        </div>
    );
};
```

**Ventajas:**
- ✅ 0 props recibidos
- ✅ 0 props pasados a hijos
- ✅ Cada componente consume lo que necesita

---

### 4. Componentes Hijos (ClinicalNotesSection, etc.)

#### ANTES (Props Drilling)

```typescript
interface ClinicalNotesSectionProps {
    patient: Patient;
    user: User;
    onUpdate: (patient: Patient) => void;
}

const ClinicalNotesSection: React.FC<ClinicalNotesSectionProps> = ({
    patient,
    user,
    onUpdate
}) => {
    // ...
};
```

---

#### DESPUÉS (Context API)

```typescript
import { useAuth, usePatients } from '@/contexts';

const ClinicalNotesSection: React.FC = () => {
    const { user } = useAuth();
    const { selectedPatient, updatePatient } = usePatients();

    // ...
};
```

---

## Comparación Numérica

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Props en App → MainApp | 13 | 0 | -100% |
| Props en MainApp → PatientFileView | 7 | 0 | -100% |
| Props en PatientFileView → Secciones | 3-5 | 0 | -100% |
| Estados en App.tsx | 7 | 0 | -100% |
| Handlers en App.tsx | 10+ | 0 | -100% |
| Líneas en App.tsx | ~286 | ~15 | -95% |
| Complejidad ciclomática | Alta | Baja | ⬇️⬇️⬇️ |

---

## Testing

### ANTES (Props Drilling)

```typescript
test('PatientFileView renders correctly', () => {
    const mockUser = { /* ... */ };
    const mockPatient = { /* ... */ };
    const mockPrestaciones = [ /* ... */ ];
    const mockFarmacos = [ /* ... */ ];
    const mockConfig = { /* ... */ };
    const mockOnUpdate = jest.fn();
    const mockOnUpdatePrestacion = jest.fn();

    render(
        <PatientFileView
            user={mockUser}
            patient={mockPatient}
            prestaciones={mockPrestaciones}
            farmacos={mockFarmacos}
            prestacionConfig={mockConfig}
            onUpdatePatient={mockOnUpdate}
            onUpdatePrestacion={mockOnUpdatePrestacion}
        />
    );
});
```

**Problemas:**
- ❌ 7 mocks necesarios
- ❌ Difícil de mantener
- ❌ Test frágil

---

### DESPUÉS (Context API)

```typescript
test('PatientFileView renders correctly', () => {
    render(
        <AppProviders>
            <PatientFileView />
        </AppProviders>
    );
});

// O con mocks específicos
test('PatientFileView with custom data', () => {
    render(
        <AuthProvider value={mockAuth}>
            <PatientsProvider value={mockPatients}>
                <PatientFileView />
            </PatientsProvider>
        </AuthProvider>
    );
});
```

**Ventajas:**
- ✅ 0 props necesarios
- ✅ Fácil de mantener
- ✅ Test robusto
- ✅ Mockear solo lo necesario

---

## Refactoring Path

### Paso 1: Migrar App.tsx
```typescript
// Reemplazar estados y handlers por AppProviders
<AppProviders>
  <MainApp />
</AppProviders>
```

### Paso 2: Migrar MainApp.tsx
```typescript
// Eliminar props, usar hooks
const { user, logout } = useAuth();
const { patients } = usePatients();
```

### Paso 3: Migrar Componentes Hijos
```typescript
// Cada componente consume directamente
const { selectedPatient } = usePatients();
```

### Paso 4: Testing
```typescript
// Envolver en providers necesarios
<AppProviders>
  <Component />
</AppProviders>
```

---

## Conclusión

El Context API **elimina completamente** el props drilling:

✅ **Antes:** 20+ props pasados en cadena
✅ **Después:** 0 props pasados

✅ **Antes:** 286 líneas en App.tsx
✅ **Después:** 15 líneas en App.tsx

✅ **Antes:** Difícil de mantener y testear
✅ **Después:** Fácil de mantener y testear

✅ **Antes:** Componentes acoplados
✅ **Después:** Componentes independientes

**Resultado:** Código más limpio, mantenible y escalable.
