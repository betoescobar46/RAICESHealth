---
name: frontend-feature-manager
description: Agrega, modifica o elimina features completas del frontend React cuando el usuario solicita cambios en funcionalidad, componentes UI, o refactoring. Actualiza tipos TypeScript, contexts, y mantiene consistencia con arquitectura del proyecto.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Frontend Feature Manager - SIMORAHealth

Este skill te ayuda a modificar el frontend de manera rápida, eficiente y consistente con la arquitectura del proyecto.

## Arquitectura del Proyecto

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS (tema naranja primario)
- **Backend**: Firebase (Firestore, Auth, Functions)
- **State**: React Context API (sin Redux)

### Estructura de Carpetas
```
components/          # Organizados por feature
  ├── MainApp/      # App shell y navegación
  ├── AdminView/    # Gestión usuarios y prestaciones
  ├── PatientFile/  # Fichas de pacientes
  │   ├── sections/ # Secciones de la ficha
  │   ├── modals/   # Modales específicos
  │   └── hooks/    # Hooks personalizados
  ├── StatisticsView/
  ├── ui/           # Componentes reutilizables
  └── [Feature]/    # Nuevas features aquí

src/
  ├── types/        # index.ts es CANONICAL
  ├── contexts/     # React Contexts
  ├── services/     # Lógica de negocio
  │   └── storage/  # CRUD operations
  ├── hooks/        # Custom hooks globales
  └── utils/        # Utilidades
```

### Path Aliases (vite.config.ts y tsconfig.json)
```typescript
'@/*'          -> './*'
'@/types'      -> './src/types'
'@/components' -> './components'
'@/services'   -> './services'
'@/contexts'   -> './src/contexts'
'@/hooks'      -> './hooks'
'@/utils'      -> './utils'
```

## Tipos TypeScript Centrales

**IMPORTANTE**: `src/types/index.ts` es la fuente única de verdad (717 líneas).

### Interfaces Principales
```typescript
Patient {
  firestoreId: string  // Firebase doc ID
  ficha: number        // Clinical record number
  nombre: string
  diagnostico: Diagnostico
  farmacos: FarmacoPrescrito[]
  // ... ver src/types/index.ts
}

User {
  role: 'admin' | 'profesional' | 'estadistica'
  availableProfiles?: UserProfile[]
  // ... múltiples perfiles por usuario
}

ClinicalNote {
  tipo: 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | ...
  ordenEnHistorial: number  // 0 para INGRESO, 1+ para CONTROL
  pacienteId: string
  contenido: string
  // ... más campos
}
```

### Type Guards Disponibles
- `isAdmin(user)`, `isProfesional(user)`, `isMedico(user)`
- `isValidRut()`, `isValidEmail()`, `isValidDateFormat()`

## Contexts Disponibles (src/contexts/AppProviders.tsx)

**Orden de anidación** (de afuera hacia adentro):
1. **AuthContext** - Firebase auth, currentUser
2. **ConfigContext** - Sistema config, prestaciones
3. **ThemeContext** - UI theming (depende de Auth)
4. **PatientsContext** - Patient data management
5. **PrestacionesContext** - Healthcare services (depende de Config)

**Patrón de uso**:
```typescript
import { useAuth } from '@/contexts/AuthContext';
import { usePatients } from '@/contexts/PatientsContext';

const { currentUser, loading } = useAuth();
const { patients, updatePatient } = usePatients();
```

## Servicios Disponibles (src/services/)

### Storage Services
```typescript
// src/services/storage/
UserStorageService.ts         // User CRUD
PatientStorageService.ts      // Patient CRUD
PrestacionStorageService.ts   // Prestaciones CRUD
ConfigStorageService.ts       // System config
ChatStorageService.ts         // Messaging
FarmacoStorageService.ts      // Medication catalog
```

**Patrón de uso**:
```typescript
import { PatientStorageService } from '@/services/storage/PatientStorageService';

await PatientStorageService.addPatient(newPatient);
await PatientStorageService.updatePatient(patientId, updates);
```

## Guías de Estilo y Patrones

### Tailwind - Tema Naranja
```css
/* Colores primarios */
bg-orange-{50,100,200,...,900}
text-orange-{600,700,800,900}
border-orange-{200,300,400}
hover:bg-orange-{50,100}

/* Backgrounds */
bg-white (cards, modals)
bg-[#f4f1ea] (página principal)
bg-gray-{50,100} (secondary)

/* Bordes */
border-2 border-orange-200 (principal)
rounded-xl (cards grandes)
rounded-lg (botones, inputs)

/* Shadows */
shadow-lg (cards principales)
shadow-sm (botones)
```

### Estilo Minimalista (tipo Claude)
```typescript
// Botones icon-only
<button className="p-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
  <svg className="h-5 w-5">...</svg>
</button>

// Spacing compacto
gap-1.5  // entre botones icon
gap-2    // entre elementos relacionados
gap-4    // entre secciones

// Sin bordes gruesos, sin colores saturados
```

### Componentes React - Patrones

**1. Estructura de Componente Funcional**
```typescript
import React, { useState } from 'react';
import { Patient, User } from '@/types';

interface MyComponentProps {
  patient: Patient;
  onUpdate: (patient: Patient) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ patient, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4">
      {/* content */}
    </div>
  );
};

export default MyComponent;
```

**2. Custom Hooks Pattern** (si la lógica es compleja)
```typescript
// components/MyFeature/hooks/useMyFeature.ts
export const useMyFeature = (initialData: Patient) => {
  const [state, setState] = useState(initialData);

  const handleAction = () => {
    // lógica
  };

  return { state, handleAction };
};
```

**3. Modales** (usar portal y estado local)
```typescript
// Ver IcompModal.tsx, MekidocModal.tsx como ejemplos
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-2xl">
        {/* content */}
      </div>
    </div>
  );
};
```

## Workflow para Agregar/Modificar Features

### 1. Planificación
- Identifica qué archivos tocar: componentes, types, contexts, services
- Verifica dependencias con otros componentes
- Planea cambios en tipos primero

### 2. Actualizar Tipos (SIEMPRE PRIMERO)
```typescript
// src/types/index.ts
export interface NewFeatureData {
  id: string;
  // ... campos
}

// Actualizar interfaces existentes si es necesario
export interface Patient {
  // ... campos existentes
  newField?: NewFeatureData;  // Agregar aquí
}
```

### 3. Crear/Modificar Componente
```bash
# Nueva feature
components/NewFeature/
  ├── NewFeature.tsx          # Componente principal
  ├── components/             # Subcomponentes
  ├── hooks/                  # Custom hooks
  └── types.ts               # Tipos locales (si aplica)

# Feature existente
# Usar Edit tool para modificar archivos existentes
```

### 4. Integrar con Context (si necesario)
```typescript
// Si necesita estado global, modificar o crear context
// src/contexts/NewFeatureContext.tsx
import { createContext, useContext } from 'react';

interface NewFeatureContextType {
  data: NewFeatureData[];
  updateData: (data: NewFeatureData) => void;
}

const NewFeatureContext = createContext<NewFeatureContextType | null>(null);

export const useNewFeature = () => {
  const context = useContext(NewFeatureContext);
  if (!context) throw new Error('useNewFeature must be used within Provider');
  return context;
};
```

**IMPORTANTE**: Si creas nuevo context, agregarlo a AppProviders.tsx en el orden correcto de dependencias.

### 5. Conectar con Routing (si es vista nueva)
```typescript
// components/MainApp/MainApp.tsx
const navItems: NavItem[] = [
  // ... items existentes
  { key: 'newFeature', label: 'Nueva Feature', view: 'newFeature' },
];

// components/MainApp/components/ViewRouter.tsx
// Agregar case en switch
```

### 6. Testing Manual
- Verificar en http://localhost:5173
- Probar flujos completos
- Validar tipos TypeScript (`npm run build`)

## Comandos Útiles

```bash
npm run dev              # Dev server :5173
npm run build            # Build + type check
npm run preview          # Preview production build

# Firebase
firebase deploy          # Deploy todo
firebase deploy --only hosting
firebase deploy --only functions
```

## Reglas Importantes

### ❌ NO HACER
- NO crear archivos nuevos innecesariamente (edita existentes)
- NO usar localStorage directamente (usar services/)
- NO hardcodear valores (usar constants)
- NO romper tipos existentes en src/types/index.ts
- NO usar emojis a menos que usuario lo pida
- NO usar colores fuera del tema naranja

### ✅ SIEMPRE HACER
- LEER src/types/index.ts antes de modificar tipos
- USAR path aliases (@/types, @/components, etc.)
- MANTENER consistencia con estilos Tailwind existentes
- VERIFICAR que Patient.firestoreId (no Patient.id) para Firebase
- USAR FarmacoPrescrito (no Farmaco) para medicamentos de pacientes
- SEGUIR convenciones de nombres: camelCase para vars, PascalCase para componentes
- VALIDAR fechas con formato YYYY-MM-DD

## Ejemplos de Uso

### Ejemplo 1: Agregar campo nuevo a Patient
```typescript
// 1. Actualizar src/types/index.ts
export interface Patient {
  // ... campos existentes
  newField: string;  // <-- Agregar aquí
}

// 2. Actualizar componente que muestra el campo
// components/PatientFile/sections/DemographicSection.tsx
<div>
  <label>Nuevo Campo</label>
  <input
    value={patient.newField || ''}
    onChange={(e) => onFormChange('newField', e.target.value)}
  />
</div>

// 3. Actualizar form handler si es necesario
```

### Ejemplo 2: Crear modal nuevo
```typescript
// 1. Crear components/NewModal.tsx
import React from 'react';

interface NewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SomeData;
}

const NewModal: React.FC<NewModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Título</h2>
        {/* content */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NewModal;

// 2. Usar en componente padre
import NewModal from './NewModal';

const [isModalOpen, setIsModalOpen] = useState(false);

<NewModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  data={someData}
/>
```

### Ejemplo 3: Agregar botón a PatientFileView
```typescript
// components/PatientFileView.tsx

// 1. Agregar estado para modal/acción
const [isNewFeatureOpen, setIsNewFeatureOpen] = useState(false);

// 2. Agregar botón en header (estilo minimalista)
<div className="flex items-center gap-1.5">
  <button
    onClick={() => setIsNewFeatureOpen(true)}
    className="p-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
    title="Nueva Feature"
  >
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      {/* icon path */}
    </svg>
  </button>
  {/* ... otros botones */}
</div>
```

## Notas Finales

- Este proyecto usa Firebase Firestore, no localStorage (migración en progreso)
- Patient.firestoreId es el ID de documento de Firebase
- Patient.ficha es el número de ficha clínica (número secuencial)
- Clinical notes: INGRESO siempre ordenEnHistorial: 0, CONTROL son 1+
- Fechas en formato: "YYYY-MM-DD", horas: "HH:mm"
- RUT chileno debe validarse con isValidRut()

**Ante dudas, consulta**:
- `src/types/index.ts` - Tipos
- `components/PatientFileView.tsx` - Ejemplo de componente complejo
- `src/contexts/AppProviders.tsx` - Arquitectura de contexts
- `CLAUDE.md` - Documentación del proyecto
