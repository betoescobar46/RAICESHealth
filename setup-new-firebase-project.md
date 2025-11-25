# Configuración del Nuevo Proyecto Firebase - RAICESHealth

## Paso 1: Crear el Proyecto en Firebase Console

1. Ve a: https://console.firebase.google.com/
2. Click en "Agregar proyecto" (Add project)
3. Nombre del proyecto: **`raiceshealth`**
4. Click "Continuar"
5. **Deshabilitar Google Analytics** (puedes habilitarlo después)
6. Click "Crear proyecto"
7. Espera a que se cree (~30 segundos)

## Paso 2: Agregar Aplicación Web

1. En el dashboard del proyecto, click en el ícono **Web** (`</>`)
2. Nickname de la app: **`RAICESHealth-Web`**
3. **NO marcar** "Also set up Firebase Hosting"
4. Click "Registrar app"
5. **COPIAR las credenciales** que aparecen (las necesitaremos)

```javascript
// Ejemplo de lo que verás:
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "raiceshealth.firebaseapp.com",
  projectId: "raiceshealth",
  storageBucket: "raiceshealth.firebasestorage.app",
  messagingSenderId: "123...",
  appId: "1:123..."
};
```

6. Click "Continuar a la consola"

## Paso 3: Habilitar Firebase Authentication

1. En el menú lateral, click en **"Authentication"**
2. Click en "Comenzar" (Get started)
3. En la pestaña **"Sign-in method"**:
   - Click en "Correo electrónico/contraseña" (Email/Password)
   - **Habilitar** el primer toggle (Email/Password)
   - **NO habilitar** "Vínculo de correo electrónico (acceso sin contraseña)"
   - Click "Guardar"

## Paso 4: Crear Firestore Database

1. En el menú lateral, click en **"Firestore Database"**
2. Click en "Crear base de datos" (Create database)
3. **Ubicación**: `us-central1` (o la que prefieras)
4. **Modo de seguridad**: Selecciona "**Modo de producción**"
   - Las reglas las configuraremos después
5. Click "Crear"

## Paso 5: Configurar Reglas de Firestore (Temporales)

1. En Firestore Database, ve a la pestaña **"Reglas"** (Rules)
2. Reemplaza las reglas con estas temporales (para desarrollo):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas temporales para desarrollo inicial
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click "Publicar"

⚠️ **IMPORTANTE**: Estas son reglas temporales. Las actualizaremos después con reglas de producción seguras.

## Paso 6: Pegar las Credenciales Aquí

Una vez tengas las credenciales de firebaseConfig, pégalas aquí:

```javascript
// PEGAR AQUÍ TUS CREDENCIALES:
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

---

## ¿Listo?

Una vez completes estos pasos y pegues las credenciales arriba, avísame y continuaré con:
- Actualizar `services/firebase.ts`
- Crear el usuario admin inicial
- Configurar `.firebaserc` para deployment
- Actualizar la documentación
