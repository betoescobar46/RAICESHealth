# Context API - Ejemplos Prácticos de Uso

## Tabla de Contenidos

1. [Casos de Uso Comunes](#casos-de-uso-comunes)
2. [Ejemplos por Context](#ejemplos-por-context)
3. [Patrones Avanzados](#patrones-avanzados)
4. [Best Practices](#best-practices)

---

## Casos de Uso Comunes

### 1. Mostrar Información del Usuario Actual

```typescript
import { useAuth } from '@/contexts';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Rol: {user.role}</p>
      <p>Centro: {user.centroAtencion}</p>
    </div>
  );
};
```

---

### 2. Listar Pacientes con Búsqueda

```typescript
import { usePatients } from '@/contexts';
import { useState } from 'react';

const PatientList: React.FC = () => {
  const { patients, setSelectedPatient } = usePatients();
  const [search, setSearch] = useState('');

  const filteredPatients = patients.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar paciente..."
      />
      <ul>
        {filteredPatients.map(patient => (
          <li
            key={patient.firestoreId}
            onClick={() => setSelectedPatient(patient)}
          >
            {patient.nombre} - {patient.rut}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

### 3. Formulario de Nueva Prestación

```typescript
import { usePrestaciones, usePatients, useAuth } from '@/contexts';
import { useState } from 'react';

const NewPrestacionForm: React.FC = () => {
  const { addPrestacion } = usePrestaciones();
  const { selectedPatient } = usePatients();
  const { user } = useAuth();

  const [tipo, setTipo] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient || !user) return;

    const nuevaPrestacion = {
      id: '',
      pacienteId: selectedPatient.firestoreId,
      fecha: new Date().toISOString().split('T')[0],
      tipo,
      profesional: user.name,
      profesionalId: user.id.toString(),
      usuarioPerfil: user.name,
      estado: 'Realizada' as const,
      observaciones,
      timestamp: new Date().toISOString()
    };

    addPrestacion(nuevaPrestacion);
    setTipo('');
    setObservaciones('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva Prestación para {selectedPatient?.nombre}</h2>

      <input
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        placeholder="Tipo de prestación"
        required
      />

      <textarea
        value={observaciones}
        onChange={e => setObservaciones(e.target.value)}
        placeholder="Observaciones"
      />

      <button type="submit">Guardar Prestación</button>
    </form>
  );
};
```

---

### 4. Selector de Tema con Perfiles

```typescript
import { useTheme } from '@/contexts';

const ThemeSelector: React.FC = () => {
  const { themeColor, setThemeColor, availableProfiles, activeProfile, setActiveProfile } = useTheme();

  const colors: ThemeColor[] = ['blue', 'purple', 'green', 'orange', 'red', 'teal'];

  return (
    <div>
      <h3>Tema Actual: {themeColor}</h3>

      <div>
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setThemeColor(color)}
            className={themeColor === color ? 'active' : ''}
          >
            {color}
          </button>
        ))}
      </div>

      {availableProfiles.length > 0 && (
        <div>
          <h3>Perfil Activo</h3>
          <select
            value={activeProfile?.id}
            onChange={e => {
              const profile = availableProfiles.find(p => p.id === e.target.value);
              if (profile) setActiveProfile(profile);
            }}
          >
            {availableProfiles.map(profile => (
              <option key={profile.id} value={profile.id}>
                {profile.name} - {profile.centroAtencion}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
```

---

## Ejemplos por Context

### useAuth - Autenticación

#### Login Form

```typescript
import { useAuth } from '@/contexts';
import { useState } from 'react';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login(username, password);

    if (!result.success) {
      setError(result.message || 'Error de autenticación');
    } else {
      setError('');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="RUT"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Ingresar</button>
    </form>
  );
};
```

#### Protected Route

```typescript
import { useAuth } from '@/contexts';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
```

---

### usePatients - Gestión de Pacientes

#### Patient Card

```typescript
import { usePatients } from '@/contexts';

const PatientCard: React.FC<{ patientId: string }> = ({ patientId }) => {
  const { getPatientById, setSelectedPatient } = usePatients();

  const patient = getPatientById(patientId);

  if (!patient) return null;

  return (
    <div onClick={() => setSelectedPatient(patient)}>
      <h3>{patient.nombre}</h3>
      <p>RUT: {patient.rut}</p>
      <p>Edad: {patient.edad} años</p>
      <p>Comuna: {patient.comuna}</p>
    </div>
  );
};
```

#### Update Patient

```typescript
import { usePatients } from '@/contexts';

const EditPatientForm: React.FC = () => {
  const { selectedPatient, updatePatient } = usePatients();

  if (!selectedPatient) return null;

  const handleUpdate = (field: keyof Patient, value: any) => {
    updatePatient({
      ...selectedPatient,
      [field]: value
    });
  };

  return (
    <div>
      <input
        value={selectedPatient.nombre}
        onChange={e => handleUpdate('nombre', e.target.value)}
      />
      <input
        value={selectedPatient.email}
        onChange={e => handleUpdate('email', e.target.value)}
      />
      {/* Más campos... */}
    </div>
  );
};
```

---

### usePrestaciones - Gestión de Prestaciones

#### Prestaciones List

```typescript
import { usePrestaciones, usePatients } from '@/contexts';

const PrestacionesList: React.FC = () => {
  const { selectedPatient } = usePatients();
  const { getPrestacionesByPatient } = usePrestaciones();

  if (!selectedPatient) return <div>Seleccione un paciente</div>;

  const prestaciones = getPrestacionesByPatient(selectedPatient.firestoreId);

  return (
    <div>
      <h2>Prestaciones de {selectedPatient.nombre}</h2>
      <p>Total: {prestaciones.length}</p>
      <ul>
        {prestaciones.map(p => (
          <li key={p.id}>
            {p.fecha} - {p.tipo} - {p.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

#### Prestaciones Config

```typescript
import { usePrestaciones } from '@/contexts';

const PrestacionConfigEditor: React.FC = () => {
  const { prestacionConfig, updatePrestacionConfig } = usePrestaciones();

  const addPrestacionToPerfil = (perfil: string, prestacion: string) => {
    const updated = {
      ...prestacionConfig,
      [perfil]: [...(prestacionConfig[perfil] || []), prestacion]
    };
    updatePrestacionConfig(updated);
  };

  return (
    <div>
      <h3>Configuración de Prestaciones</h3>
      {Object.entries(prestacionConfig).map(([perfil, prestaciones]) => (
        <div key={perfil}>
          <h4>{perfil}</h4>
          <ul>
            {prestaciones.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};
```

---

### useConfig - Configuración del Sistema

#### Farmaco Selector

```typescript
import { useConfig } from '@/contexts';

const FarmacoSelector: React.FC<{ onSelect: (farmaco: Farmaco) => void }> = ({ onSelect }) => {
  const { farmacos } = useConfig();

  const disponiblesAPS = farmacos.filter(f => f.disponibleAPS);

  return (
    <select onChange={e => {
      const farmaco = farmacos.find(f => f.id === e.target.value);
      if (farmaco) onSelect(farmaco);
    }}>
      <option value="">Seleccione un fármaco</option>
      {disponiblesAPS.map(farmaco => (
        <option key={farmaco.id} value={farmaco.id}>
          {farmaco.nombre} - {farmaco.categoria}
        </option>
      ))}
    </select>
  );
};
```

#### Admin Notifications

```typescript
import { useConfig } from '@/contexts';

const AdminNotifications: React.FC = () => {
  const { adminNotifications, clearNotifications } = useConfig();

  return (
    <div>
      <h3>Notificaciones ({adminNotifications.length})</h3>
      <button onClick={clearNotifications}>Limpiar</button>
      <ul>
        {adminNotifications.map((notif, i) => (
          <li key={i}>{notif}</li>
        ))}
      </ul>
    </div>
  );
};
```

---

### useTheme - Tema y UI

#### Zoom Controls

```typescript
import { useTheme } from '@/contexts';

const ZoomControls: React.FC = () => {
  const { zoom, increaseZoom, decreaseZoom, resetZoom } = useTheme();

  return (
    <div>
      <p>Zoom: {zoom}%</p>
      <button onClick={decreaseZoom}>-</button>
      <button onClick={resetZoom}>100%</button>
      <button onClick={increaseZoom}>+</button>
    </div>
  );
};
```

#### Themed Component

```typescript
import { useTheme } from '@/contexts';

const ThemedCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.bg} ${theme.text} ${theme.border} p-4 rounded-lg`}>
      {children}
    </div>
  );
};
```

---

## Patrones Avanzados

### 1. Composición de Contexts

```typescript
import { useAuth, usePatients, usePrestaciones } from '@/contexts';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { selectedPatient } = usePatients();
  const { getPrestacionesByPatient } = usePrestaciones();

  if (!selectedPatient) return <div>Seleccione un paciente</div>;

  const prestaciones = getPrestacionesByPatient(selectedPatient.firestoreId);
  const canEdit = user?.role === 'admin' || user?.role === 'profesional';

  return (
    <div>
      <h1>{selectedPatient.nombre}</h1>
      <p>Atendido por: {user?.name}</p>
      <p>Prestaciones: {prestaciones.length}</p>
      {canEdit && <button>Editar</button>}
    </div>
  );
};
```

---

### 2. Custom Hook Compuesto

```typescript
import { useAuth, usePatients, usePrestaciones } from '@/contexts';

/**
 * Hook personalizado que combina múltiples contexts
 * para proporcionar datos del paciente seleccionado
 */
export const useSelectedPatientData = () => {
  const { user } = useAuth();
  const { selectedPatient } = usePatients();
  const { getPrestacionesByPatient } = usePrestaciones();

  const prestaciones = selectedPatient
    ? getPrestacionesByPatient(selectedPatient.firestoreId)
    : [];

  const canEdit = user?.role === 'admin' || user?.role === 'profesional';

  return {
    patient: selectedPatient,
    prestaciones,
    canEdit,
    user
  };
};

// Uso:
const MyComponent: React.FC = () => {
  const { patient, prestaciones, canEdit } = useSelectedPatientData();

  return (
    <div>
      <h1>{patient?.nombre}</h1>
      <p>Prestaciones: {prestaciones.length}</p>
      {canEdit && <button>Editar</button>}
    </div>
  );
};
```

---

### 3. Optimistic Updates

```typescript
import { usePatients, useConfig } from '@/contexts';

const OptimisticPatientUpdate: React.FC = () => {
  const { selectedPatient, updatePatient } = usePatients();
  const { addNotification } = useConfig();

  const handleUpdate = async (updatedData: Partial<Patient>) => {
    if (!selectedPatient) return;

    // Actualización optimista (inmediata en UI)
    updatePatient({
      ...selectedPatient,
      ...updatedData
    });

    try {
      // Sincronizar con backend (Firebase)
      await saveToFirebase(selectedPatient.firestoreId, updatedData);
      addNotification('Paciente actualizado exitosamente');
    } catch (error) {
      // Revertir si falla
      updatePatient(selectedPatient);
      addNotification('Error actualizando paciente');
    }
  };

  return <div>...</div>;
};
```

---

### 4. Conditional Rendering por Rol

```typescript
import { useAuth } from '@/contexts';

const AdminOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== 'admin') return null;

  return <>{children}</>;
};

const ProfesionalOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== 'profesional' && user?.role !== 'admin') return null;

  return <>{children}</>;
};

// Uso:
const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      <AdminOnly>
        <button>Gestionar Usuarios</button>
      </AdminOnly>

      <ProfesionalOnly>
        <button>Agregar Prestación</button>
      </ProfesionalOnly>
    </div>
  );
};
```

---

## Best Practices

### 1. ✅ Usar Destructuring

```typescript
// ✅ BIEN
const { user, logout } = useAuth();

// ❌ MAL
const auth = useAuth();
const user = auth.user;
const logout = auth.logout;
```

---

### 2. ✅ Evitar Usar Todo el Context

```typescript
// ✅ BIEN - Solo consume lo necesario
const { selectedPatient, updatePatient } = usePatients();

// ❌ MAL - Consume todo innecesariamente
const patientsContext = usePatients();
```

---

### 3. ✅ Memoizar Valores Computados

```typescript
import { useMemo } from 'react';

const MyComponent: React.FC = () => {
  const { patients } = usePatients();

  // ✅ BIEN - Memoizar cálculos costosos
  const activePatients = useMemo(() =>
    patients.filter(p => p.isActive),
    [patients]
  );

  return <div>{activePatients.length} pacientes activos</div>;
};
```

---

### 4. ✅ Validar Datos Antes de Usar

```typescript
const MyComponent: React.FC = () => {
  const { selectedPatient } = usePatients();

  // ✅ BIEN - Validar antes de usar
  if (!selectedPatient) {
    return <div>No hay paciente seleccionado</div>;
  }

  return <div>{selectedPatient.nombre}</div>;
};
```

---

### 5. ✅ Combinar Contexts de Forma Eficiente

```typescript
// ✅ BIEN - Hook personalizado
export const usePatientStats = () => {
  const { selectedPatient } = usePatients();
  const { getPrestacionesByPatient } = usePrestaciones();

  return useMemo(() => {
    if (!selectedPatient) return null;

    const prestaciones = getPrestacionesByPatient(selectedPatient.firestoreId);

    return {
      totalPrestaciones: prestaciones.length,
      realizadas: prestaciones.filter(p => p.estado === 'Realizada').length,
      agendadas: prestaciones.filter(p => p.estado === 'Agendada').length
    };
  }, [selectedPatient, getPrestacionesByPatient]);
};
```

---

## Conclusión

Los contexts implementados proporcionan una API limpia y type-safe para acceder a todos los datos de la aplicación sin props drilling.

**Recuerda:**
- ✅ Usa destructuring
- ✅ Consume solo lo necesario
- ✅ Memoiza valores computados
- ✅ Valida datos antes de usar
- ✅ Combina contexts eficientemente

**Para más información:**
- Ver `docs/CONTEXT_API_IMPLEMENTATION.md` para arquitectura completa
- Ver `docs/MIGRATION_EXAMPLE.md` para ejemplos de migración
- Ver `src/contexts/README.md` para quick reference
