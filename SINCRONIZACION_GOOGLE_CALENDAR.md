# 🔄 Sincronización con Google Calendar

La aplicación SIMORA Health ahora incluye sincronización bidireccional con Google Calendar, permitiéndote:

- **Exportar** prestaciones de SIMORA a tu Google Calendar
- **Ver** eventos de tu Google Calendar dentro de SIMORA (próximamente)
- **Seleccionar** calendarios específicos (ej: "CONSULTA PRIVADA")

## 🎯 Modos de Sincronización

### 1. **Exportación Manual** (.ics) - ✅ DISPONIBLE AHORA

**No requiere configuración.** Funciona inmediatamente.

1. Haz clic en el botón "Descargar .ics" en el calendario
2. Se descargará un archivo `simora-YYYY-MM.ics`
3. Automáticamente se abrirá Google Calendar
4. Importa el archivo en el calendario que prefieras

**Ventajas:**
- ✅ Sin configuración
- ✅ Funciona con cualquier aplicación de calendario
- ✅ Control total sobre dónde importar

**Desventajas:**
- ⚠️ Requiere importación manual cada vez
- ⚠️ Puede crear duplicados si importas varias veces

---

### 2. **Exportación Directa** (API) - ⚙️ REQUIERE CONFIGURACIÓN

**Requiere credenciales OAuth de Google.**

1. Haz clic en "Conectar Google Calendar"
2. Autoriza el acceso a tu cuenta de Google
3. Selecciona el calendario de destino (ej: "CONSULTA PRIVADA")
4. Haz clic en "Exportar"
5. Las prestaciones se crean automáticamente en Google Calendar

**Ventajas:**
- ✅ Exportación directa con 1 clic
- ✅ Selección de calendario específico
- ✅ Progreso en tiempo real
- ✅ No crea duplicados (marca eventos con ID único)

**Desventajas:**
- ⚠️ Requiere configuración inicial de OAuth

---

## ⚙️ Configuración de OAuth (Para Exportación Directa)

Para habilitar la exportación directa con Google Calendar, sigue estos pasos:

### Paso 1: Habilitar Google Calendar API

1. Ve a [Google Cloud Console - APIs](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=simorahealth)
2. Haz clic en **"HABILITAR"**

### Paso 2: Configurar Pantalla de Consentimiento OAuth

1. Ve a [Pantalla de consentimiento OAuth](https://console.cloud.google.com/apis/credentials/consent?project=simorahealth)
2. Selecciona **"Externo"** como tipo de usuario
3. Completa:
   - **Nombre de la aplicación**: `SIMORA Health`
   - **Correo de soporte**: Tu email
   - **Información de contacto**: Tu email
4. Haz clic en **"Guardar y continuar"** en todos los pasos

### Paso 3: Crear Credenciales OAuth 2.0

1. Ve a [Credenciales](https://console.cloud.google.com/apis/credentials?project=simorahealth)
2. Haz clic en **"+ CREAR CREDENCIALES"** → **"ID de cliente de OAuth"**
3. Configura:
   - **Tipo de aplicación**: `Aplicación web`
   - **Nombre**: `SIMORA Health Web Client`
4. En **"Orígenes de JavaScript autorizados"**, agrega:
   ```
   http://localhost:5173
   https://simorahealth.web.app
   https://simorahealth.firebaseapp.com
   ```
5. En **"URIs de redirección autorizados"**, agrega:
   ```
   http://localhost:5173
   https://simorahealth.web.app
   https://simorahealth.firebaseapp.com
   ```
6. Haz clic en **"CREAR"**
7. **COPIA** el "ID de cliente" que se genera (se verá así: `360968687655-abc123xyz.apps.googleusercontent.com`)

### Paso 4: Actualizar el archivo .env

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza la línea `VITE_GOOGLE_CLIENT_ID` con el Client ID que copiaste:
   ```env
   VITE_GOOGLE_CLIENT_ID="360968687655-abc123xyz.apps.googleusercontent.com"
   ```
3. Guarda el archivo

### Paso 5: Reiniciar la aplicación

```bash
npm run dev
```

---

## 📱 Cómo Usar

### Exportación Manual (.ics)

1. En la vista de **Calendario**, navega al mes que deseas exportar
2. Haz clic en **"Descargar .ics"**
3. El archivo se descargará automáticamente
4. Se abrirá Google Calendar en tu navegador
5. Ve a **Configuración** → **Importar y exportar**
6. Selecciona el archivo descargado
7. Elige el calendario de destino (ej: "CONSULTA PRIVADA")
8. Haz clic en **"Importar"**

### Exportación Directa (con OAuth configurado)

1. En la vista de **Calendario**, haz clic en **"Conectar Google Calendar"**
2. Autoriza el acceso en la ventana que se abre
3. Selecciona tu calendario de destino en el dropdown (ej: "CONSULTA PRIVADA")
4. Haz clic en **"Exportar"**
5. Espera a que finalice la sincronización
6. Verás un resumen con eventos exportados exitosamente

---

## 🔐 Seguridad y Privacidad

- Las credenciales OAuth se almacenan **solo en tu navegador local**
- SIMORA solo solicita permisos para **leer y escribir eventos de calendario**
- No accede a emails, contactos u otros datos de Google
- Puedes revocar el acceso en cualquier momento desde [Google Account Permissions](https://myaccount.google.com/permissions)

---

## 🐛 Solución de Problemas

### "Error al conectar con Google Calendar"

**Causa**: No se han configurado las credenciales OAuth o son incorrectas.

**Solución**:
1. Verifica que hayas seguido todos los pasos de configuración
2. Asegúrate de que el Client ID en `.env` sea correcto
3. Reinicia el servidor de desarrollo

### "Error al cargar calendarios"

**Causa**: No se ha otorgado permiso de acceso o la sesión expiró.

**Solución**:
1. Haz clic en "Desconectar" y vuelve a conectar
2. Asegúrate de aceptar todos los permisos solicitados

### Eventos duplicados

**Causa**: Has importado el mismo archivo .ics varias veces.

**Solución**:
1. En Google Calendar, elimina los eventos duplicados manualmente
2. Usa la exportación directa (OAuth) que previene duplicados automáticamente

---

## 🎉 Próximas Funcionalidades

- [ ] **Sincronización bidireccional completa**: Ver eventos de Google Calendar dentro de SIMORA
- [ ] **Actualización automática**: Sincronizar cambios de SIMORA a Google Calendar automáticamente
- [ ] **Filtros de calendario**: Mostrar solo eventos de calendarios seleccionados
- [ ] **Recordatorios**: Sincronizar recordatorios de Google Calendar

---

## 📞 Soporte

Si tienes problemas con la configuración o el uso de la sincronización, contacta al administrador del sistema.

**Aplicación desplegada**: https://simorahealth.web.app
