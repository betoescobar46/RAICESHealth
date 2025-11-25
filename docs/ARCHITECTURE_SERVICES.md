# Arquitectura de Servicios - SIMORA Health

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         COMPONENTES                              │
│  (LoginPage, MainApp, PatientIndexView, etc.)                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ (usa actualmente)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│            LocalStorageService.ts (FACADE TEMPORAL)              │
│                  ⚠️  Será eliminado en Fase 3                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ (delega a servicios especializados)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICIOS ESPECIALIZADOS                      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              CAPA DE AUTENTICACIÓN                        │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/auth/AuthService.ts                       │  │  │
│  │  │  • authenticate()                                   │  │  │
│  │  │  • getCurrentUser()                                 │  │  │
│  │  │  • setCurrentUser()                                 │  │  │
│  │  │  • logout()                                         │  │  │
│  │  │  • changePassword()                                 │  │  │
│  │  │  • isSessionValid()                                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           CAPA DE ALMACENAMIENTO (Storage)                │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/storage/UserStorageService.ts            │  │  │
│  │  │  • getUsers()                                      │  │  │
│  │  │  • saveUsers()                                     │  │  │
│  │  │  • getUserByUsername()                             │  │  │
│  │  │  • updateUser()                                    │  │  │
│  │  │  • addUser()                                       │  │  │
│  │  │  • deleteUser()                                    │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/storage/PatientStorageService.ts         │  │  │
│  │  │  • getPatients()                                   │  │  │
│  │  │  • savePatients()                                  │  │  │
│  │  │  • getPatientById()                                │  │  │
│  │  │  • addPatient()                                    │  │  │
│  │  │  • updatePatient()                                 │  │  │
│  │  │  • deletePatient()                                 │  │  │
│  │  │  • clearAllPatients()                              │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/storage/PrestacionStorageService.ts      │  │  │
│  │  │  • getPrestaciones()                               │  │  │
│  │  │  • savePrestaciones()                              │  │  │
│  │  │  • addPrestacion()                                 │  │  │
│  │  │  • getPrestacionesByPatient()                      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/storage/FarmacoStorageService.ts         │  │  │
│  │  │  • getFarmacos()                                   │  │  │
│  │  │  • saveFarmacos()                                  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/storage/ConfigStorageService.ts          │  │  │
│  │  │  • getPrestacionConfig()                           │  │  │
│  │  │  • savePrestacionConfig()                          │  │  │
│  │  │  • getAllPrestaciones()                            │  │  │
│  │  │  • saveAllPrestaciones()                           │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/storage/ChatStorageService.ts            │  │  │
│  │  │  • getConversations()                              │  │  │
│  │  │  • saveConversations()                             │  │  │
│  │  │  • getConversationById()                           │  │  │
│  │  │  • getConversationsForUser()                       │  │  │
│  │  │  • createOrGetConversation()                       │  │  │
│  │  │  • addChatMessage()                                │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        CAPA DE IMPORTACIÓN/EXPORTACIÓN                    │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/import-export/DataImportExportService.ts │  │  │
│  │  │  • importPatients()                                │  │  │
│  │  │  • exportAllData()                                 │  │  │
│  │  │  • importAllData()                                 │  │  │
│  │  │  • clearAllData()                                  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          CAPA DE SINCRONIZACIÓN                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  services/sync/FirebaseSyncService.ts              │  │  │
│  │  │  • syncWithFirebase()                              │  │  │
│  │  │  • checkFirebaseConnection()                       │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE PERSISTENCIA                        │
│                                                                  │
│  ┌──────────────────┐          ┌──────────────────────────┐    │
│  │  localStorage    │          │  Firebase (opcional)      │    │
│  │  • rlp_users     │          │  • backup/sync           │    │
│  │  • rlp_patients  │          │                          │    │
│  │  • rlp_...       │          │                          │    │
│  └──────────────────┘          └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Flujo de Datos

### Autenticación
```
LoginPage → AuthService.authenticate()
          → UserStorageService.getUserByUsername()
          → localStorage.getItem('rlp_users')
```

### Obtener Pacientes
```
PatientIndexView → PatientStorageService.getPatients()
                 → localStorage.getItem('rlp_patients')
```

### Agregar Prestación
```
IngresarPrestacionView → PrestacionStorageService.addPrestacion()
                       → PrestacionStorageService.savePrestaciones()
                       → localStorage.setItem('rlp_prestaciones')
```

### Exportar Datos
```
AdminPanel → DataImportExportService.exportAllData()
           → UserStorage.getUsers()
           → PatientStorage.getPatients()
           → PrestacionStorage.getPrestaciones()
           → FarmacoStorage.getFarmacos()
           → ConfigStorage.getConfig()
           → JSON.stringify()
```

### Sincronizar con Firebase
```
SettingsView → FirebaseSyncService.syncWithFirebase()
             → import firebase service dinámicamente
             → syncToFirebase()
             → Firebase Cloud Firestore
```

## Dependencias entre Servicios

```
AuthService
  ├── depende de → UserStorageService.getUserByUsername()
  └── depende de → UserStorageService.updateUser()

DataImportExportService
  ├── depende de → UserStorageService.*
  ├── depende de → PatientStorageService.*
  ├── depende de → PrestacionStorageService.*
  ├── depende de → FarmacoStorageService.*
  └── depende de → ConfigStorageService.*

FirebaseSyncService
  └── depende de → src/services/firebase (importación dinámica)

Servicios INDEPENDIENTES (sin dependencias):
  • UserStorageService
  • PatientStorageService
  • PrestacionStorageService
  • FarmacoStorageService
  • ConfigStorageService
  • ChatStorageService
```

## Principios de Diseño

### 1. Responsabilidad Única (SRP)
Cada servicio tiene UNA sola razón para cambiar:
- `AuthService` → Cambia si cambia la lógica de autenticación
- `PatientStorageService` → Cambia si cambia el almacenamiento de pacientes
- `FirebaseSyncService` → Cambia si cambia la integración con Firebase

### 2. Abierto/Cerrado (OCP)
Los servicios están abiertos a extensión, cerrados a modificación:
- Se pueden agregar nuevas funciones sin romper las existentes
- Ejemplo: Agregar `getPatientsWithFilter()` sin tocar `getPatients()`

### 3. Inversión de Dependencias (DIP)
Los servicios de alto nivel no dependen de detalles de bajo nivel:
- `AuthService` depende de la interfaz de `UserStorageService`, no de localStorage
- Fácil reemplazar localStorage por Redis/API sin cambiar AuthService

### 4. Segregación de Interfaces (ISP)
Funciones pequeñas y específicas en lugar de interfaces gigantes:
- `getUsers()` vs `getUsersAndPatientsAndEverything()`
- Cada función hace UNA cosa

## Ventajas de esta Arquitectura

### Testing
```typescript
// FÁCIL: Testear AuthService aisladamente
import { authenticate } from '../services/auth/AuthService';
import * as UserStorage from '../services/storage/UserStorageService';

jest.mock('../services/storage/UserStorageService');

test('authenticate with valid credentials', () => {
  UserStorage.getUserByUsername.mockReturnValue(mockUser);
  const result = authenticate('12345678-9', 'password123');
  expect(result.success).toBe(true);
});
```

### Migración Gradual
```typescript
// Componente viejo (usa facade)
import LocalStorageService from '../services/LocalStorageService';
const users = LocalStorageService.getUsers();

// Componente nuevo (usa servicio directo)
import { getUsers } from '../services/storage/UserStorageService';
const users = getUsers();

// Ambos funcionan simultáneamente ✅
```

### Reemplazo de Implementación
```typescript
// Hoy: localStorage
export function getPatients(): Patient[] {
  const data = localStorage.getItem('rlp_patients');
  return data ? JSON.parse(data) : [];
}

// Mañana: API REST (mismo servicio, diferente implementación)
export async function getPatients(): Promise<Patient[]> {
  const response = await fetch('/api/patients');
  return response.json();
}

// Los componentes NO cambian ✅
```

## Barrel Exports (Facilitadores de Import)

### services/index.ts
```typescript
// Import múltiple desde un solo punto
import {
  authenticate,
  getCurrentUser,
  getPatients,
  addPatient,
  exportAllData
} from '../services';
```

### services/storage/index.ts
```typescript
// Import de categoría storage
import * as Storage from '../services/storage';
const users = Storage.getUsers();
const patients = Storage.getPatients();
```

## Roadmap de Migración

### Fase 1: COMPLETADA ✅
- [x] Crear servicios especializados
- [x] Crear facade temporal (LocalStorageService)
- [x] Corregir imports de tipos
- [x] Build exitoso
- [x] Documentación

### Fase 2: Migración de Componentes (PRÓXIMA)
- [ ] LoginPage.tsx → AuthService
- [ ] MainApp.tsx → AuthService + UserStorage
- [ ] PatientIndexView.tsx → PatientStorage
- [ ] IngresarPrestacionView.tsx → PrestacionStorage
- [ ] StatisticsView.tsx → todos los storage services
- [ ] (continuar con resto de componentes)

### Fase 3: Eliminar Facade
- [ ] Buscar todos los imports de LocalStorageService
- [ ] Verificar que NO quedan usos
- [ ] Eliminar services/LocalStorageService.ts
- [ ] Actualizar documentación

### Fase 4: Testing
- [ ] Tests unitarios de cada servicio
- [ ] Tests de integración
- [ ] Coverage > 80%

## Conclusión

Esta arquitectura modular:
- ✅ Respeta principios SOLID
- ✅ Facilita testing
- ✅ Mejora mantenibilidad
- ✅ Permite escalabilidad
- ✅ Mantiene compatibilidad 100%
- ✅ Prepara para futuras migraciones (API, microservicios, etc.)

---

**Última actualización:** 2025-11-18
**Autor:** Claude Code
