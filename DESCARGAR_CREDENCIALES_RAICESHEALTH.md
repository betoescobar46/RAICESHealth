# Descargar credenciales de RAICESHealth-CL

## IMPORTANTE: El archivo actual es de simorahealth (incorrecto)

Necesitas descargar las credenciales de `raiceshealth-cl`:

## Pasos:

1. **Ve a Firebase Console:**
   https://console.firebase.google.com/project/raiceshealth-cl/settings/serviceaccounts/adminsdk

2. **Haz clic en "Generar nueva clave privada"**

3. **Se descargará un archivo JSON** con nombre similar a:
   `raiceshealth-cl-firebase-adminsdk-xxxxx-xxxxxxxxxx.json`

4. **Reemplaza el archivo actual:**
   - Borra o renombra `service-account-key.json` (es de simorahealth)
   - Guarda el nuevo archivo como `service-account-key.json`

5. **Ubicación:**
   ```
   C:\Users\betoe\OneDrive\Escritorio\RAICESHealth\service-account-key.json
   ```

## Después de descargar:

Ejecuta:
```bash
node fix-user-role.cjs
```

Para crear el usuario admin en `raiceshealth-cl`.
