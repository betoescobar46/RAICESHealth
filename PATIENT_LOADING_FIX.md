# Patient Loading Fix - Real Patients from JSON

## Problem
The app was showing 5 mock patients instead of the 238 real patients from the JSON file.

## Root Cause
1. The JSON file (`pacientes_completos.json`) was located in `data-migration/` folder but not accessible to the web app
2. The app's initialization logic was automatically saving mock patients to localStorage on first run
3. Once mock patients were in localStorage, the JSON loading logic never executed

## Solution Implemented

### 1. File Structure Fix
- **Copied** `data-migration/pacientes_completos.json` to `public/data-migration/pacientes_completos.json`
- This makes the file accessible via `/data-migration/pacientes_completos.json` URL path
- File size: 2.3MB containing 238 real patients

### 2. App.tsx Changes

#### Removed Mock Patient Auto-Loading
**Before:**
```typescript
// Inicializar con pacientes ficticios
console.log('Inicializando con pacientes ficticios en app load...');
LocalStorageService.savePatients(MOCK_PATIENTS);
console.log('Pacientes ficticios guardados:', MOCK_PATIENTS.length);
```

**After:**
```typescript
// NO inicializar con pacientes ficticios - se cargarán desde JSON
console.log('Sistema inicializado. Los pacientes se cargarán desde JSON al autenticarse.');
```

#### Enhanced Patient Loading Logic
Added mock patient detection and automatic replacement:

```typescript
// Check if we have mock patients (we don't want them)
const hasMockPatients = loadedPatients.length > 0 && loadedPatients.some(p =>
    p.firestoreId === 'patient-001' ||
    p.firestoreId === 'patient-002' ||
    p.nombre === 'María González Rodríguez'
);

// If no patients or mock patients detected, load from JSON
if (loadedPatients.length === 0 || hasMockPatients) {
    if (hasMockPatients) {
        console.log('⚠️ Mock patients detected in localStorage, replacing with real patients from JSON...');
    }
    // ... load from JSON
}
```

### 3. Force Load Utility
Created `public/force-load-real-patients.html` - a utility page to:
- Check current patient status in localStorage
- Clear patients only (preserves users and config)
- Force load real patients from JSON
- Clear all localStorage and reload

**Access it at:** `http://localhost:5173/force-load-real-patients.html`

## How to Use

### Option 1: Automatic (Recommended)
1. Open the utility page: `http://localhost:5173/force-load-real-patients.html`
2. Click "Clear All & Force Reload"
3. Refresh the main app
4. Login and verify 238 patients are loaded

### Option 2: Browser Console
```javascript
// Clear patients
localStorage.removeItem('rlp_patients');

// Or clear everything
localStorage.clear();

// Reload the page
location.reload();
```

### Option 3: Let the App Auto-Fix
The updated App.tsx will now automatically:
1. Detect mock patients on login
2. Replace them with real patients from JSON
3. Save real patients to localStorage

## Verification

### Check Patient Count
After loading, the console should show:
```
✅ Loaded 238 real patients from JSON
```

### Verify in Browser Console
```javascript
const patients = JSON.parse(localStorage.getItem('rlp_patients'));
console.log('Total patients:', patients.length);
console.log('First patient:', patients[0].nombre);
console.log('Has contenidoOriginal:', !!patients[0].contenidoOriginal);
```

Expected output:
```
Total patients: 238
First patient: Alberto Guerrero Bustamante
Has contenidoOriginal: true
```

### Visual Verification
- Login to the app
- Navigate to patient list
- Should see 238 patients instead of 5
- Each patient should have the narrative content in `contenidoOriginal` field

## JSON File Details
- **Location:** `public/data-migration/pacientes_completos.json`
- **Size:** 2.3MB
- **Patients:** 238
- **First patient:** Alberto Guerrero Bustamante
- **Format:** Each patient includes:
  - `id`, `numeroFicha`, `nombre`
  - `origen`, `fechaCreacion`, `fechaActualizacion`
  - `tags`, `contenidoCompleto` (mapped to `contenidoOriginal`)
  - `evoluciones`, `adjuntosReferencias`

## Files Modified
1. `public/data-migration/pacientes_completos.json` (created/copied)
2. `App.tsx` (initialization logic, patient loading logic)
3. `public/force-load-real-patients.html` (created - utility page)

## Console Messages Reference

### Success Messages
- ✅ `Loaded 238 real patients from JSON`
- ✅ `Found 238 real patients in localStorage`

### Warning Messages
- ⚠️ `Mock patients detected in localStorage, replacing with real patients from JSON...`
- ⚠️ `No patients in localStorage, loading from JSON...`

### Error Messages
- ❌ `Failed to load patients from JSON`
- ❌ `Error al cargar el archivo de pacientes` (HTTP error)

## Troubleshooting

### If Still Seeing Mock Patients
1. Open `http://localhost:5173/force-load-real-patients.html`
2. Click "Clear All & Force Reload"
3. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Login again

### If JSON Fails to Load
Check browser console for errors:
- Network error → Check if dev server is running
- 404 error → Verify `public/data-migration/pacientes_completos.json` exists
- Parse error → Verify JSON file is valid

### If Patients Load but Missing Data
Check if `contenidoOriginal` field exists:
```javascript
const patients = JSON.parse(localStorage.getItem('rlp_patients'));
console.log('Sample patient:', patients[0]);
```

## Migration Commit
This fix ensures the migration from the commit:
> "feat: Migración completa de 238 pacientes con datos narrativos preservados"

is properly reflected in the running application.
