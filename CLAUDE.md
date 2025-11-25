# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SIMORAHealth** (Sistema de Información para Monitoreo y Registro de Actividades en Salud) is a health information management system for tracking patient records, clinical notes, and healthcare services (prestaciones). Built with React, TypeScript, and Firebase.

## Development Commands

### Core Development
```bash
npm run dev              # Start Vite dev server on port 5173
npm run build            # Build production bundle with Vite
npm run preview          # Preview production build locally
```

### Database Scripts
```bash
npm run build:script     # Compile TypeScript scripts in tsconfig.script.json
npm run import:patients  # Import patients from JSON files
npm run migrate          # Migrate data from markdown format
npm run migrate:v2       # Alternative migration with tsx
npm run seed:firestore   # Seed initial data to Firestore
npm run verify:firestore # Verify Firebase connection
```

### Firebase Deployment
```bash
firebase login           # Authenticate with Firebase
firebase deploy          # Deploy hosting and functions
firebase deploy --only hosting    # Deploy only static site
firebase deploy --only functions  # Deploy only cloud functions
firebase deploy --only firestore:rules   # Deploy Firestore rules
firebase deploy --only firestore:indexes # Deploy Firestore indexes
```

### Maintenance Scripts
Located in `scripts/` directory - all use `.cjs` extension:
```bash
# Clinical notes management (run in order)
node scripts/split-clinical-notes.cjs --dry-run
node scripts/split-controls-no-header.cjs --dry-run
node scripts/fix-subsections-as-controls.cjs --dry-run

# Validation and debugging
node scripts/validate-final-structure.cjs
node scripts/check-specific-patient.cjs
node scripts/backup-clinical-notes.cjs
node scripts/clean-markdown-from-notes.cjs
```

**Important**: Always run scripts with `--dry-run` first to preview changes, then use `--apply` to execute.

---

## Claude Code Integration

### Slash Commands

Available in `.claude/commands/`:

| Command | Description |
|---------|-------------|
| `/init [modo]` | Initialize development environment (modes: full, local, repair, seed, status) |
| `/validar-rut <rut>` | Validate and standardize Chilean RUT |
| `/buscar-cie10 <términos>` | Search CIE-10 diagnostic codes |
| `/verificar-farmacos <lista>` | Check medication interactions |
| `/migrar-pacientes <archivo>` | Import patients from file |
| `/generar-reporte <periodo>` | Generate prestaciones report |
| `/verificar-reglas` | Review Firestore security rules |
| `/configurar-prestaciones <perfil>` | Configure prestaciones by profile |

### Specialized Agents (Optimized Architecture v3.0)

Located in `.claude/agents/` - **8 agents optimized** (reduced from 15):

| Agent | Purpose | Keywords |
|-------|---------|----------|
| AG01 Clinical & Data Validator | Clinical validation + form validation unified | validar, verificar, estandarizar, duplicado |
| AG02 Medical & Regulatory Expert | Medical knowledge + compliance (CIE-10, GES, Laws) | cie-10, farmaco, ley, ges, consentimiento |
| AG03 Service Operations Manager | Healthcare services management + operations | prestacion, agendar, productividad, factura |
| AG04 UI/UX Engineer | Complete UI/UX design + implementation | ui, diseño, tailwind, layout, moderno |
| AG05 Application Architect | App architecture + state management | state, context, performance, arquitectura |
| AG06 Infrastructure & Data Engineer | Firebase + migrations + ETL | firebase, firestore, migrar, backup, query |
| AG07 Analytics & Intelligence | Statistics + reports + ML (future) | estadistica, reporte, analisis, dashboard |
| AG08 Quality & Security Engineer | Testing + code review + security | test, revisar, refactor, seguridad, audit |

**See `.claude/agents/README.md`** for complete documentation and invocation examples.
**See `.claude/agents/INTEGRATION-MATRIX.md`** for agent collaboration patterns.

### Skills (Knowledge Base)

Located in `.claude/skills/`:
- `health-domain.md` - Chilean mental health system, CIE-10, APS psychopharmacology, GES
- `chile-regulations.md` - Law 20.584, 21.331, MINSAL norms, GES
- `simora-patterns.md` - Project architecture, data structures, workflows

---

## Architecture

### Tech Stack
- **Frontend**: React 19.1.1, TypeScript 5.8.2, Vite 6.2.0
- **Backend**: Firebase 12.6.0 (Firestore, Auth, Functions, Hosting)
- **Styling**: Tailwind CSS 3.4.18
- **Maps**: Leaflet 1.9.4, React Leaflet 5.0.0
- **Icons**: Lucide React 0.553.0
- **AI Integration**: Anthropic Claude API (via Firebase Functions)

### Project Structure

```
SIMORAHealth/
├── .claude/
│   ├── agents/          # 8 specialized agents (optimized v3.0)
│   ├── commands/        # 9 slash commands
│   └── skills/          # 4 knowledge base files
├── components/          # React components (organized by feature)
│   ├── MainApp/         # Main application shell
│   ├── AdminView/       # User & prestacion management
│   ├── PatientFile/     # Patient record sections
│   ├── StatisticsView/  # Analytics and charts
│   ├── icomp/           # COMPIN medical report generator
│   └── ui/              # Reusable UI components
├── src/
│   ├── types/           # TypeScript type definitions (index.ts is canonical)
│   ├── contexts/        # React Context providers
│   ├── services/        # New service layer
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── services/            # Legacy services (being migrated to src/services/)
│   ├── storage/         # Storage services per entity
│   ├── auth/            # Authentication services
│   ├── sync/            # Firebase sync services
│   └── import-export/   # Bulk data operations
├── functions/           # Firebase Cloud Functions (Node.js 20)
├── scripts/             # Database maintenance scripts (.cjs)
├── utils/               # Legacy utilities
└── docs/                # Documentation
```

### Path Aliases

Configured in both `vite.config.ts` and `tsconfig.json`:
```typescript
'@/*'          -> './*'           // Project root
'@/types'      -> './src/types'   // Type definitions
'@/components' -> './components'  // React components
'@/utils'      -> './utils'       // Utilities
'@/services'   -> './services'    // Services
'@/contexts'   -> './src/contexts' // Context providers
'@/hooks'      -> './hooks'       // Custom hooks
```

### Context Architecture

Contexts are nested in `src/contexts/AppProviders.tsx` in dependency order:
1. **AuthContext** - Firebase authentication, user session
2. **ConfigContext** - System configuration, prestacion settings
3. **ThemeContext** - UI theming (depends on AuthContext for user prefs)
4. **PatientsContext** - Patient data management
5. **PrestacionesContext** - Healthcare services tracking (depends on ConfigContext)

### Service Layer Architecture

**Storage Services** (in `services/storage/`):
- `UserStorageService.ts` - User management
- `PatientStorageService.ts` - Patient data CRUD
- `PrestacionStorageService.ts` - Healthcare services
- `FarmacoStorageService.ts` - Medication catalog
- `ConfigStorageService.ts` - System configuration
- `ChatStorageService.ts` - Messaging between users

**Other Services**:
- `firebaseService.ts` - Main Firebase service (18,866 lines - being refactored)
- `firebase.ts` - Firebase configuration
- `googleCalendar.ts` - Google Calendar integration
- `googleCalendarSync.ts` - Bidirectional calendar sync
- `sync/FirebaseSyncService.ts` - Firestore synchronization
- `import-export/DataImportExportService.ts` - Bulk data operations

**Legacy**: `LocalStorageService.ts` is a facade being phased out - use specialized services instead.

---

## Type System

**Central type definitions**: `src/types/index.ts` (719 lines)

### Enums and Literal Types
```typescript
UserRole: 'admin' | 'profesional' | 'estadistica'
PrestacionEstado: 'Realizada' | 'Agendada' | 'NSP'
Sexo: 'Masculino' | 'Femenino' | 'Otro'
CentroAtencion: 'default' | 'cosam-maule' | 'extrasistema'
ThemeColor: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal'
TipoNotaClinica: EVOLUCION | INGRESO | EPICRISIS | INTERCONSULTA | PROCEDIMIENTO | INDICACION | OTRO
CategoriaFarmaco: ANTIPSICOTICO | ANTIDEPRESIVO | ANSIOLITICO | ESTABILIZADOR_ANIMO | HIPNOTICO | OTRO
TipoEvento: CONSULTA | CONTROL | PROCEDIMIENTO | REUNION | VISITA_DOMICILIARIA | OTRO
EstadoEvento: CONFIRMADO | TENTATIVO | CANCELADO | REALIZADO | NO_ASISTIO
```

### Key Interfaces
- `Patient` - Patient records (`firestoreId: string`, `ficha: number`)
- `User` - System users with roles, profiles, permissions
- `UserProfile` - Multiple profiles per user
- `Prestacion` - Healthcare services/activities
- `ClinicalNote` - Clinical notes with types (INGRESO, CONTROL, etc.)
- `Diagnostico` - Patient diagnoses (includes CIE-10 codes, ejes I-V)
- `FarmacoPrescrito` - Prescribed medications
- `Farmaco` - Master medication catalog
- `SignosVitales` - Vital signs
- `EventoCalendario` - Calendar events with Google Calendar support
- `ChatMessage` / `ChatConversation` - Messaging
- `ConfiguracionSistema` - System configuration

### Type Guards and Validators
```typescript
// Role checking
isAdmin(user), isProfesional(user), isEstadistica(user)
isMedico(user), isPsicologo(user)

// Data validation
isValidRut(rut), isValidEmail(email)
isValidDateFormat(date), isValidTimeFormat(time)
```

**Important**:
- `Patient.firestoreId` is the Firebase document ID (string)
- `Patient.ficha` is the clinical record number (number)

---

## Firebase Structure

### Collections
- `patients` - Patient records
- `clinicalNotes` - Clinical notes linked via `pacienteId`
- `prestaciones` - Healthcare services linked via `pacienteId`
- `users` - User metadata (Authentication via Firebase Auth)
- `psychiatryNews` - Psychiatry news (auto-fetched by Cloud Function)
- `backups` - Data backups

### Cloud Functions (`functions/index.js`)

| Function | Type | Description |
|----------|------|-------------|
| `claude` | HTTPS | Proxy endpoint for Anthropic Claude API (model: `claude-sonnet-4-20250514`) |
| `fetchPsychiatryNews` | Scheduled | Daily 8:00 AM (America/Santiago) - fetches RSS from PubMed, Psychiatric Times, AJP |
| `updatePsychiatryNews` | HTTPS | Manual trigger for news update |
| `adminChangePassword` | onCall | Admin password change for users |

**Configuration**:
- Runtime: Node.js 20
- Region: us-central1
- Timeout: 120s, Memory: 256MB

### Firestore Indexes

```json
{
  "indexes": [
    { "collection": "clinicalNotes", "fields": ["pacienteId ASC", "fecha DESC"] },
    { "collection": "clinicalNotes", "fields": ["pacienteId ASC", "ordenEnHistorial ASC"] },
    { "collection": "prestaciones", "fields": ["patientId ASC", "fecha DESC"] }
  ]
}
```

---

## Clinical Notes System

Clinical notes follow a strict structure managed by scripts in `scripts/`:

### Note Types
- `INGRESO` - Initial admission note (1 per patient, `ordenEnHistorial: 0`)
- `CONTROL` - Follow-up notes (sequential, `ordenEnHistorial: 1, 2, 3...`)
- Other types: INTERCONSULTA, EPICRISIS, PROCEDIMIENTO

### Standard INGRESO Subsections (not separate notes)
- Anamnesis (remota, próxima)
- Exámenes (mental, físico)
- Diagnósticos
- Plan terapéutico / Indicaciones
- Farmacoterapia

### Migration Tracking Flags
- `migradoDividido` - Split by split-clinical-notes.cjs
- `divididoDeSinHeader` - Created by split-controls-no-header.cjs
- `subseccionesReintegradas` - Modified by fix-subsections-as-controls.cjs

See `scripts/README-CLINICAL-NOTES.md` for detailed clinical notes management.

---

## Key Features

### Multi-Profile Support
Users can have multiple profiles via `User.availableProfiles` with different:
- `centroAtencion` (care center: 'default', 'cosam-maule', 'extrasistema')
- `themeColor` (UI theming)

### Authentication & Security
- Firebase Authentication for login/logout
- User metadata stored in Firestore (`users` collection)
- Role-based access control (admin, profesional, estadistica)
- Account lockout after failed login attempts
- Patient access restrictions via `User.allowedPatients`

### ICOMP Integration
COMPIN medical report generator located in `components/icomp/`:
- Claude API integration for AI-assisted report generation
- PDF export functionality
- Autosave to localStorage every 10 seconds
- Configuration in `components/icomp/constants/index.js`

### Google Calendar Integration
- Bidirectional sync with Google Calendar
- Event creation and management
- OAuth 2.0 authentication

---

## REGLAS INVIOLABLES - NO MODIFICAR

### Tamaño del Contenedor Principal
**REGLA ABSOLUTA**: El contenedor principal de TODAS las vistas debe mantener el mismo tamaño uniforme. Esta regla es **INALTERABLE** y debe respetarse siempre.

- Todas las vistas (News, Actividad Reciente, Calendario, Índice de Pacientes, Estadísticas, Recursos, Administrar, PatientFileView, etc.) deben usar el mismo contenedor base
- **NUNCA** modificar las dimensiones, padding, margin, height o width del contenedor principal
- **NUNCA** agregar overflow-y-auto o scrollbars al contenedor principal de las vistas
- Si necesitas scroll, debe ser SOLO en sub-componentes internos, no en el contenedor principal

**Violación de esta regla = Pérdida de tiempo significativa para el equipo**

---

## Development Guidelines

### Component Organization
Components are organized by feature, not type:
- Feature-specific: `PatientFile/`, `AdminView/`, `StatisticsView/`
- Shared UI: `ui/` (Button, Card, Badge, Modal, Toast)
- Application shell: `MainApp/`

### State Management
- Use React Context for global state (see AppProviders)
- Firestore queries via Firebase SDK in components
- Local state with `useState` for component-specific data
- Custom hooks in `src/hooks/` for reusable logic

### Styling
- Tailwind CSS utility classes
- Theme colors configurable per user profile
- Responsive design with mobile support
- Custom theme utilities in `utils/themeUtils.ts`

### Firebase Best Practices
- Always check `currentUser` before Firestore operations
- Use `firestoreId` (not `ficha`) for document references
- Batch writes when updating multiple documents
- Index configuration in `firestore.indexes.json`
- **getUser pattern**: Leer usuario por document ID directo (`doc(db, 'users', uid)`), NO usar query con `where('uid', '==', uid)` - las reglas de seguridad no lo permiten
- **Roles en mayúsculas**: Los roles pueden estar en mayúsculas (`MEDICO`, `PSICOLOGO`) o minúsculas. Las reglas de Firestore soportan ambos casos

### TypeScript Patterns
- Import types from `@/types` or `./src/types`
- Use type guards (`isAdmin`, `isProfesional`) for runtime checks
- Validators available: `isValidRut()`, `isValidEmail()`, `isValidDateFormat()`
- Date format: `YYYY-MM-DD`, Time format: `HH:mm`

### Clinical Data Handling
- INGRESO notes must have `ordenEnHistorial: 0`
- CONTROL notes numbered sequentially (1, 2, 3...)
- Date patterns: "22 de octubre de 2025" or "22 octubre 2025"
- Spanish month names: enero, febrero, marzo, etc.

### Script Development
- Use `.cjs` extension for Node.js scripts
- Always implement `--dry-run` and `--apply` modes
- Add tracking flags to modified documents
- Log statistics after operations
- Initialize Firebase Admin SDK with service account

---

## Common Workflows

### Adding a New Patient
1. Use `PatientStorageService.addPatient()`
2. Ensure `firestoreId` is set from Firestore document ID
3. Create initial INGRESO note with `ordenEnHistorial: 0`
4. Link via `pacienteId: patient.firestoreId`

### Creating Clinical Notes
1. Determine type (INGRESO vs CONTROL)
2. Set proper `ordenEnHistorial` (0 for INGRESO, increment for CONTROL)
3. Include required fields: `pacienteId`, `fecha`, `profesional`, `contenido`
4. Optional: `signosVitales`, `adjuntosReferencias`

### Running Database Migrations
1. Read `scripts/README-CLINICAL-NOTES.md`
2. Run with `--dry-run` first
3. Review statistics and examples
4. Apply with `--apply` if results look correct
5. Verify with check scripts

### Deploying to Production
1. Build frontend: `npm run build`
2. Test locally: `npm run preview`
3. Deploy all: `firebase deploy`
4. Or deploy selectively: `firebase deploy --only hosting` or `--only functions`

---

## Important Notes

### Migration Status
The codebase is transitioning from localStorage to Firestore:
- **Patients**: Fully migrated to Firestore
- **Clinical Notes**: Fully migrated to Firestore
- **Users**: Fully migrated (Auth en Firebase, metadata en Firestore collection `users`)
- **Prestaciones**: In progress
- **Configuration**: In progress

### Sistema de Tratantes (allowedPatients)
Control de acceso a pacientes por usuario:
- `User.allowedPatients: string[]` - Array de `firestoreId` de pacientes permitidos
- Si `allowedPatients` está vacío/undefined, el usuario ve todos los pacientes (comportamiento para MEDICO/admin)
- **PatientIndexView** tiene columna "Tratantes" donde MEDICO/admin pueden asignar usuarios a pacientes
- Al asignar tratante, se agrega el `firestoreId` del paciente al `allowedPatients` del usuario
- **Usuarios duplicados**: Filtrar por `uid` único cuando hay múltiples documentos del mismo usuario

### IdleTimeoutContext (Timeout de Sesión)
- Ubicación: `src/contexts/IdleTimeoutContext.tsx`
- Detecta inactividad del usuario (mouse, teclado, scroll, clicks)
- **5 minutos** de inactividad: muestra modal de aviso
- **2 minutos** de countdown: tiempo para responder
- Si no responde: logout automático
- Integrado en `AppProviders.tsx` después de `AuthProvider`

### Data Loading Pattern
`App.tsx` loads patients from Firestore in `useEffect` when user authenticates:
```typescript
const patientsQuery = query(collection(db, 'patients'));
const querySnapshot = await getDocs(patientsQuery);
```

### Environment Variables
Required in `.env` (not committed):
- `VITE_GOOGLE_CLIENT_ID` - For Google Calendar integration
- `VITE_GOOGLE_API_KEY` - For Google APIs
- `GEMINI_API_KEY` - For AI features (injected via vite.config.ts)
- `ANTHROPIC_API_KEY` - For Claude integration (in Firebase Functions)

### Windows-Specific Notes
- Uses `powershell` commands in some scripts
- Path handling with Windows-style backslashes
- `where` command instead of `which`

---

## Agent Architecture Changelog

### v3.0.0 (2025-01-22) - Optimized Architecture
- ✅ **Reduced from 15 to 8 agents** (47% reduction in complexity)
- ✅ **Eliminated all functional overlaps** (100% deduplication)
- ✅ **Maintained full feature coverage** + closed gaps (Security, Documentation)
- ✅ **Clear single responsibility** per agent
- ✅ **Keyword-based routing** with zero ambiguity
- ✅ **Complete integration matrix** documented

**Changes**:
- **Merged**: AG01+AG06 → Clinical & Data Validator
- **Merged**: AG02+AG04 → Medical & Regulatory Expert
- **Expanded**: AG03 → Service Operations Manager
- **Merged**: AG05+ui-interface-modifier → UI/UX Engineer
- **Expanded**: AG07 → Application Architect
- **Merged**: AG08+AG09 → Infrastructure & Data Engineer
- **Merged**: AG10+AG11 → Analytics & Intelligence
- **Merged**: AG12+code-reviewer+refactorer → Quality & Security Engineer

### v2.0.0 (2025-01-18) - Specialized Agents
- 12 active agents + 3 additional specialized agents
- Command standardization
- Integration with skills and slash commands

### v1.0.0 (2024-12-01) - Initial Architecture
- 12 base agents
- Basic documentation

---

*Last updated: 2025-01-22*
