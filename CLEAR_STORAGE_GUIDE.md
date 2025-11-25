# Clearing localStorage - Troubleshooting Guide

## Problem
The mock patients don't appear in the patient index after first login.

## Root Cause
Your browser's localStorage has persisted an empty patients array from a previous session. When the app loads, it finds this empty array and doesn't initialize with the mock patients.

## Solution

### Method 1: Browser Console (Quickest)
1. Open the app at http://localhost:3003/
2. Press `F12` to open Developer Tools
3. Click on the **Console** tab
4. Paste and execute:
   ```javascript
   localStorage.clear(); location.reload();
   ```
5. This will:
   - Clear all localStorage data
   - Reload the page automatically
   - Initialize the system fresh with mock patients

### Method 2: Browser DevTools Application Tab
1. Open Developer Tools (F12)
2. Go to **Application** tab
3. Click **Local Storage** in the left sidebar
4. Find your localhost entry and click it
5. Select all items (Ctrl+A)
6. Delete them (Delete key)
7. Refresh the page (F5)

### Method 3: Chrome/Edge Settings
1. Press `Ctrl+Shift+Delete` to open Clear browsing data
2. Select "Cookies and other site data"
3. Choose your localhost site
4. Click **Clear data**
5. Refresh the page

## After Clearing localStorage

Once you reload, the app will:
1. Initialize system with default users (admin account)
2. **Automatically load all 5 mock patients:**
   - María González Rodríguez (34, Nurse)
   - Juan Carlos Fernández López (28, Electronics Technician)
   - Claudia Inés Martínez Riquelme (52, Retired Teacher)
   - Roberto Miguel Soto Vergara (41, Professional Driver)
   - Daniela Alejandra Silva Contreras (26, Psychology Student)

## Testing the Clinical File Feature

Once patients load:
1. Login with your credentials
2. Click on "Índice de Pacientes" (Patient Index)
3. Select any patient from the list
4. Scroll down to the "Ficha Clínica - Evolución" section
5. Click "+ Nueva Nota" to add a clinical note
6. Fill in the form and save

## Still Not Working?

If patients still don't appear after clearing localStorage:
1. Check the browser console (F12 → Console) for error messages
2. Look for log messages like:
   - "Inicializando con pacientes ficticios en app load..."
   - "Pacientes ficticios guardados: 5"
3. Contact support with the console error messages

---
**Server URL:** http://localhost:3003/
**Network Access:** http://192.168.0.239:3003/
