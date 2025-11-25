# Cómo descargar credenciales de Firebase Admin SDK

## Pasos:

1. **Ve a Firebase Console:**
   https://console.firebase.google.com/project/raiceshealth-cl/settings/serviceaccounts/adminsdk

2. **Haz clic en "Generar nueva clave privada"**

3. **Se descargará un archivo JSON** con nombre similar a:
   `raiceshealth-cl-firebase-adminsdk-xxxxx-xxxxxxxxxx.json`

4. **Guarda el archivo en la raíz del proyecto:**
   ```
   C:\Users\betoe\OneDrive\Escritorio\RAICESHealth\
   ```

5. **Renómbralo a:**
   `service-account-key.json`

6. **IMPORTANTE:** Este archivo contiene credenciales sensibles. Ya está en `.gitignore` para que no se suba a GitHub.

## Después de descargar:

Ejecuta:
```bash
node fix-user-role.cjs
```

Este script verificará y corregirá el rol del usuario admin.

## Si ya descargaste las credenciales antes:

Busca archivos JSON con este patrón en tu computadora:
- `*firebase-adminsdk*.json`
- `*service-account*.json`
- `*admin-sdk*.json`

Y cópialos a la raíz del proyecto como `service-account-key.json`
