# Guía de Migración - LocalStorageService a Servicios Especializados

## Fecha: 2025-11-18

Esta guía proporciona ejemplos prácticos de cómo migrar código existente que usa `LocalStorageService` (facade) a los nuevos servicios especializados.

## Tabla de Contenidos

1. [Importación de Servicios](#importación-de-servicios)
2. [Autenticación](#autenticación)
3. [Gestión de Usuarios](#gestión-de-usuarios)
4. [Gestión de Pacientes](#gestión-de-pacientes)
5. [Gestión de Prestaciones](#gestión-de-prestaciones)
6. [Configuración](#configuración)
7. [Chat](#chat)
8. [Import/Export](#importexport)
9. [Firebase Sync](#firebase-sync)
10. [Casos Especiales](#casos-especiales)

---

## Importación de Servicios

### Opción 1: Import desde Barrel Export (Recomendado)

```typescript
// Import funciones específicas desde el barrel export principal
import {
  authenticate,
  getCurrentUser,
  logout,
  getPatients,
  addPatient,
  exportAllData
} from '../services';
```

### Opción 2: Import por Categoría

```typescript
// Import de toda una categoría
import * as AuthService from '../services/auth/AuthService';
import * as PatientStorage from '../services/storage/PatientStorageService';
import * as PrestacionStorage from '../services/storage/PrestacionStorageService';
```

### Opción 3: Import Directo (Más Específico)

```typescript
// Import directo desde el archivo específico
import { authenticate, getCurrentUser } from '../services/auth/AuthService';
import { getPatients, addPatient } from '../services/storage/PatientStorageService';
```

---

## Autenticación

### Login de Usuario

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const handleLogin = (username: string, password: string) => {
  const result = LocalStorageService.authenticate(username, password);
  if (result.success) {
    console.log('Usuario autenticado:', result.user);
  } else {
    console.error(result.message);
  }
};
```

**DESPUÉS:**
```typescript
import { authenticate } from '../services/auth/AuthService';

const handleLogin = (username: string, password: string) => {
  const result = authenticate(username, password);
  if (result.success) {
    console.log('Usuario autenticado:', result.user);
  } else {
    console.error(result.message);
  }
};
```

### Obtener Usuario Actual

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const currentUser = LocalStorageService.getCurrentUser();
if (currentUser) {
  console.log('Usuario logueado:', currentUser.name);
}
```

**DESPUÉS:**
```typescript
import { getCurrentUser } from '../services/auth/AuthService';

const currentUser = getCurrentUser();
if (currentUser) {
  console.log('Usuario logueado:', currentUser.name);
}
```

### Cerrar Sesión

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const handleLogout = () => {
  LocalStorageService.logout();
  navigate('/login');
};
```

**DESPUÉS:**
```typescript
import { logout } from '../services/auth/AuthService';

const handleLogout = () => {
  logout();
  navigate('/login');
};
```

### Cambiar Contraseña

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const handleChangePassword = (username: string, oldPass: string, newPass: string) => {
  const result = LocalStorageService.changePassword(username, oldPass, newPass);
  if (result.success) {
    alert(result.message);
  }
};
```

**DESPUÉS:**
```typescript
import { changePassword } from '../services/auth/AuthService';

const handleChangePassword = (username: string, oldPass: string, newPass: string) => {
  const result = changePassword(username, oldPass, newPass);
  if (result.success) {
    alert(result.message);
  }
};
```

---

## Gestión de Usuarios

### Obtener Todos los Usuarios

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const users = LocalStorageService.getUsers();
```

**DESPUÉS:**
```typescript
import { getUsers } from '../services/storage/UserStorageService';

const users = getUsers();
```

### Buscar Usuario por Username

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const user = LocalStorageService.getUserByUsername('12345678-9');
```

**DESPUÉS:**
```typescript
import { getUserByUsername } from '../services/storage/UserStorageService';

const user = getUserByUsername('12345678-9');
```

### Actualizar Usuario

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const updatedUser = { ...user, name: 'Nuevo Nombre' };
LocalStorageService.updateUser(updatedUser);
```

**DESPUÉS:**
```typescript
import { updateUser } from '../services/storage/UserStorageService';

const updatedUser = { ...user, name: 'Nuevo Nombre' };
updateUser(updatedUser);
```

### Agregar Nuevo Usuario

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const newUser: User = {
  id: Date.now(),
  username: '12345678-9',
  name: 'Juan Pérez',
  role: 'profesional',
  // ... otros campos
};
LocalStorageService.addUser(newUser);
```

**DESPUÉS:**
```typescript
import { addUser } from '../services/storage/UserStorageService';

const newUser: User = {
  id: Date.now(),
  username: '12345678-9',
  name: 'Juan Pérez',
  role: 'profesional',
  // ... otros campos
};
addUser(newUser);
```

---

## Gestión de Pacientes

### Obtener Todos los Pacientes

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const patients = LocalStorageService.getPatients();
```

**DESPUÉS:**
```typescript
import { getPatients } from '../services/storage/PatientStorageService';

const patients = getPatients();
```

### Buscar Paciente por ID

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const patient = LocalStorageService.getPatientById('patient_123');
```

**DESPUÉS:**
```typescript
import { getPatientById } from '../services/storage/PatientStorageService';

const patient = getPatientById('patient_123');
```

### Agregar Nuevo Paciente

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const newPatient: Patient = {
  firestoreId: '', // Se auto-genera
  ficha: 12345,
  nombre: 'María González',
  // ... otros campos
};
LocalStorageService.addPatient(newPatient);
```

**DESPUÉS:**
```typescript
import { addPatient } from '../services/storage/PatientStorageService';

const newPatient: Patient = {
  firestoreId: '', // Se auto-genera
  ficha: 12345,
  nombre: 'María González',
  // ... otros campos
};
addPatient(newPatient);
```

### Actualizar Paciente

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const updatedPatient = { ...patient, nombre: 'Nuevo Nombre' };
LocalStorageService.updatePatient(updatedPatient);
```

**DESPUÉS:**
```typescript
import { updatePatient } from '../services/storage/PatientStorageService';

const updatedPatient = { ...patient, nombre: 'Nuevo Nombre' };
updatePatient(updatedPatient);
```

### Eliminar Paciente

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

LocalStorageService.deletePatient('patient_123');
```

**DESPUÉS:**
```typescript
import { deletePatient } from '../services/storage/PatientStorageService';

deletePatient('patient_123');
```

---

## Gestión de Prestaciones

### Obtener Todas las Prestaciones

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const prestaciones = LocalStorageService.getPrestaciones();
```

**DESPUÉS:**
```typescript
import { getPrestaciones } from '../services/storage/PrestacionStorageService';

const prestaciones = getPrestaciones();
```

### Obtener Prestaciones de un Paciente

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const patientPrestaciones = LocalStorageService.getPrestacionesByPatient('patient_123');
```

**DESPUÉS:**
```typescript
import { getPrestacionesByPatient } from '../services/storage/PrestacionStorageService';

const patientPrestaciones = getPrestacionesByPatient('patient_123');
```

### Agregar Nueva Prestación

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const newPrestacion: Prestacion = {
  id: '', // Se auto-genera
  pacienteId: 'patient_123',
  fecha: '2025-11-18',
  tipo: 'Consulta Psicológica',
  estado: 'Realizada',
  // ... otros campos
};
LocalStorageService.addPrestacion(newPrestacion);
```

**DESPUÉS:**
```typescript
import { addPrestacion } from '../services/storage/PrestacionStorageService';

const newPrestacion: Prestacion = {
  id: '', // Se auto-genera
  pacienteId: 'patient_123',
  fecha: '2025-11-18',
  tipo: 'Consulta Psicológica',
  estado: 'Realizada',
  // ... otros campos
};
addPrestacion(newPrestacion);
```

---

## Configuración

### Obtener Configuración de Prestaciones

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const config = LocalStorageService.getPrestacionConfig();
```

**DESPUÉS:**
```typescript
import { getPrestacionConfig } from '../services/storage/ConfigStorageService';

const config = getPrestacionConfig();
```

### Guardar Configuración de Prestaciones

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const config: PrestacionConfig = {
  'Psicólogo': ['Consulta', 'Terapia Individual'],
  'Psiquiatra': ['Consulta Médica', 'Control'],
};
LocalStorageService.savePrestacionConfig(config);
```

**DESPUÉS:**
```typescript
import { savePrestacionConfig } from '../services/storage/ConfigStorageService';

const config: PrestacionConfig = {
  'Psicólogo': ['Consulta', 'Terapia Individual'],
  'Psiquiatra': ['Consulta Médica', 'Control'],
};
savePrestacionConfig(config);
```

### Obtener Lista de Fármacos

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const farmacos = LocalStorageService.getFarmacos();
```

**DESPUÉS:**
```typescript
import { getFarmacos } from '../services/storage/FarmacoStorageService';

const farmacos = getFarmacos();
```

---

## Chat

### Obtener Conversaciones de un Usuario

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const conversations = LocalStorageService.getConversationsForUser('12345678-9');
```

**DESPUÉS:**
```typescript
import { getConversationsForUser } from '../services/storage/ChatStorageService';

const conversations = getConversationsForUser('12345678-9');
```

### Crear o Obtener Conversación

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const conversation = LocalStorageService.createOrGetConversation(
  ['12345678-9', '98765432-1'],
  ['Dr. Pérez', 'Dra. González']
);
```

**DESPUÉS:**
```typescript
import { createOrGetConversation } from '../services/storage/ChatStorageService';

const conversation = createOrGetConversation(
  ['12345678-9', '98765432-1'],
  ['Dr. Pérez', 'Dra. González']
);
```

### Agregar Mensaje a Conversación

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const message = LocalStorageService.addChatMessage(
  'conv_123',
  '12345678-9',
  'Dr. Pérez',
  '¿Cómo va el caso del paciente X?'
);
```

**DESPUÉS:**
```typescript
import { addChatMessage } from '../services/storage/ChatStorageService';

const message = addChatMessage(
  'conv_123',
  '12345678-9',
  'Dr. Pérez',
  '¿Cómo va el caso del paciente X?'
);
```

---

## Import/Export

### Exportar Todos los Datos

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const jsonData = LocalStorageService.exportAllData();
const blob = new Blob([jsonData], { type: 'application/json' });
// ... descargar blob
```

**DESPUÉS:**
```typescript
import { exportAllData } from '../services/import-export/DataImportExportService';

const jsonData = exportAllData();
const blob = new Blob([jsonData], { type: 'application/json' });
// ... descargar blob
```

### Importar Datos desde JSON

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const success = LocalStorageService.importAllData(jsonString);
if (success) {
  console.log('Datos importados exitosamente');
}
```

**DESPUÉS:**
```typescript
import { importAllData } from '../services/import-export/DataImportExportService';

const success = importAllData(jsonString);
if (success) {
  console.log('Datos importados exitosamente');
}
```

### Importar Solo Pacientes

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const patients: Patient[] = [...]; // desde CSV/JSON
LocalStorageService.importPatients(patients);
```

**DESPUÉS:**
```typescript
import { importPatients } from '../services/import-export/DataImportExportService';

const patients: Patient[] = [...]; // desde CSV/JSON
importPatients(patients);
```

---

## Firebase Sync

### Sincronizar con Firebase

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const syncData = async () => {
  const result = await LocalStorageService.syncWithFirebase();
  if (result.success) {
    console.log('Sincronización exitosa');
  } else {
    console.error(result.message);
  }
};
```

**DESPUÉS:**
```typescript
import { syncWithFirebase } from '../services/sync/FirebaseSyncService';

const syncData = async () => {
  const result = await syncWithFirebase();
  if (result.success) {
    console.log('Sincronización exitosa');
  } else {
    console.error(result.message);
  }
};
```

### Verificar Conexión Firebase

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const checkConnection = async () => {
  const isConnected = await LocalStorageService.checkFirebaseConnection();
  console.log('Firebase conectado:', isConnected);
};
```

**DESPUÉS:**
```typescript
import { checkFirebaseConnection } from '../services/sync/FirebaseSyncService';

const checkConnection = async () => {
  const isConnected = await checkFirebaseConnection();
  console.log('Firebase conectado:', isConnected);
};
```

---

## Casos Especiales

### Componente que Usa Múltiples Servicios

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

const Dashboard = () => {
  const currentUser = LocalStorageService.getCurrentUser();
  const patients = LocalStorageService.getPatients();
  const prestaciones = LocalStorageService.getPrestaciones();

  // ...
};
```

**DESPUÉS (Opción 1: Import individual):**
```typescript
import { getCurrentUser } from '../services/auth/AuthService';
import { getPatients } from '../services/storage/PatientStorageService';
import { getPrestaciones } from '../services/storage/PrestacionStorageService';

const Dashboard = () => {
  const currentUser = getCurrentUser();
  const patients = getPatients();
  const prestaciones = getPrestaciones();

  // ...
};
```

**DESPUÉS (Opción 2: Barrel export):**
```typescript
import { getCurrentUser, getPatients, getPrestaciones } from '../services';

const Dashboard = () => {
  const currentUser = getCurrentUser();
  const patients = getPatients();
  const prestaciones = getPrestaciones();

  // ...
};
```

### Inicialización del Sistema

**ANTES:**
```typescript
import LocalStorageService from '../services/LocalStorageService';

LocalStorageService.initialize(
  defaultUsers,
  defaultConfig,
  defaultPrestaciones,
  defaultFarmacos
);
```

**DESPUÉS:**
```typescript
// NOTA: La función initialize() permanece en LocalStorageService
// porque coordina múltiples servicios
import LocalStorageService from '../services/LocalStorageService';

LocalStorageService.initialize(
  defaultUsers,
  defaultConfig,
  defaultPrestaciones,
  defaultFarmacos
);

// Alternativamente, puedes hacerlo manualmente:
import { saveUsers } from '../services/storage/UserStorageService';
import { saveFarmacos } from '../services/storage/FarmacoStorageService';
import { savePrestacionConfig, saveAllPrestaciones } from '../services/storage/ConfigStorageService';

if (getUsers().length === 0) {
  saveUsers(defaultUsers);
}
if (getFarmacos().length === 0) {
  saveFarmacos(defaultFarmacos);
}
// ... etc
```

---

## Checklist de Migración

Al migrar un componente, sigue estos pasos:

- [ ] Identificar todos los usos de `LocalStorageService` en el componente
- [ ] Determinar qué servicios especializados necesitas importar
- [ ] Reemplazar imports de `LocalStorageService` por servicios específicos
- [ ] Actualizar las llamadas a funciones (quitar `LocalStorageService.`)
- [ ] Verificar que el componente compila sin errores
- [ ] Probar funcionalidad en navegador
- [ ] Ejecutar tests (si existen)
- [ ] Commit con mensaje descriptivo

## Ejemplo Completo de Migración

### Componente Original (PatientList.tsx)

```typescript
import React, { useEffect, useState } from 'react';
import LocalStorageService from '../services/LocalStorageService';
import { Patient } from '../types';

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const currentUser = LocalStorageService.getCurrentUser();

  useEffect(() => {
    const allPatients = LocalStorageService.getPatients();
    setPatients(allPatients);
  }, []);

  const handleAddPatient = (patient: Patient) => {
    LocalStorageService.addPatient(patient);
    const updated = LocalStorageService.getPatients();
    setPatients(updated);
  };

  const handleDeletePatient = (patientId: string) => {
    LocalStorageService.deletePatient(patientId);
    const updated = LocalStorageService.getPatients();
    setPatients(updated);
  };

  return (
    <div>
      <h1>Pacientes ({patients.length})</h1>
      <p>Usuario: {currentUser?.name}</p>
      {/* ... */}
    </div>
  );
};
```

### Componente Migrado (PatientList.tsx)

```typescript
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/auth/AuthService';
import { getPatients, addPatient, deletePatient } from '../services/storage/PatientStorageService';
import { Patient } from '../src/types'; // ← También corregir import de tipos

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const allPatients = getPatients();
    setPatients(allPatients);
  }, []);

  const handleAddPatient = (patient: Patient) => {
    addPatient(patient);
    const updated = getPatients();
    setPatients(updated);
  };

  const handleDeletePatient = (patientId: string) => {
    deletePatient(patientId);
    const updated = getPatients();
    setPatients(updated);
  };

  return (
    <div>
      <h1>Pacientes ({patients.length})</h1>
      <p>Usuario: {currentUser?.name}</p>
      {/* ... */}
    </div>
  );
};
```

---

## Resumen de Beneficios

Al migrar a servicios especializados obtienes:

✅ **Imports más claros:** Sabes exactamente de dónde viene cada función
✅ **Mejor autocompletado:** IDEs sugieren solo funciones relevantes
✅ **Código más testeable:** Puedes mockear solo el servicio que necesitas
✅ **Mejor tree-shaking:** El bundler solo incluye lo que usas
✅ **Separación de responsabilidades:** Cada servicio tiene un propósito claro

## Preguntas Frecuentes

### ¿Puedo usar ambos enfoques simultáneamente?

Sí, el facade `LocalStorageService` seguirá funcionando mientras migramos. Esto permite migración gradual.

### ¿Qué pasa si encuentro un bug?

El facade simplemente delega a los servicios nuevos, así que si hay un bug, estará en el servicio especializado. Arréglalo ahí y funcionará para todos.

### ¿Cuándo eliminaremos LocalStorageService.ts?

Una vez que TODOS los componentes hayan sido migrados a servicios especializados. Usa búsqueda global de `import.*LocalStorageService` para verificar.

### ¿Hay cambios en la API de las funciones?

No, las funciones mantienen las mismas firmas. Solo cambia desde dónde las importas.

---

**Última actualización:** 2025-11-18
**Autor:** Claude Code
