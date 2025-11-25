# Configuración de Google Calendar

Esta guía te ayudará a configurar la integración con Google Calendar para sincronizar las prestaciones de SIMORA Health con tu calendario de Google.

## Requisitos previos

- Una cuenta de Google
- Acceso a Google Cloud Console

## Pasos de configuración

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el selector de proyectos en la parte superior
3. Haz clic en "Nuevo proyecto"
4. Nombra tu proyecto (ej: "SIMORA Health Calendar")
5. Haz clic en "Crear"

### 2. Habilitar la API de Google Calendar

1. En el menú de navegación, ve a **APIs y servicios** > **Biblioteca**
2. Busca "Google Calendar API"
3. Haz clic en "Google Calendar API"
4. Haz clic en el botón **Habilitar**

### 3. Crear credenciales

#### 3.1 Crear una clave de API

1. Ve a **APIs y servicios** > **Credenciales**
2. Haz clic en **+ Crear credenciales** > **Clave de API**
3. Se generará tu API Key
4. **Importante**: Haz clic en "Restringir clave" para configurar restricciones
5. En "Restricciones de la aplicación", selecciona "Sitios web"
6. Agrega los siguientes referentes HTTP:
   - `http://localhost:5173/*` (para desarrollo)
   - `https://tu-dominio.com/*` (para producción)
7. En "Restricciones de API", selecciona "Restringir clave" y marca solo "Google Calendar API"
8. Guarda los cambios
9. **Copia la clave de API** y guárdala de forma segura

#### 3.2 Crear un ID de cliente OAuth 2.0

1. En la misma página de Credenciales, haz clic en **+ Crear credenciales** > **ID de cliente de OAuth**
2. Si es la primera vez, te pedirá configurar la pantalla de consentimiento:
   - Selecciona "Externo" como tipo de usuario
   - Completa la información básica (nombre de la aplicación, correo de soporte)
   - En "Permisos", no necesitas agregar nada adicional
   - Guarda y continúa
3. Ahora crea el ID de cliente OAuth:
   - Tipo de aplicación: **Aplicación web**
   - Nombre: "SIMORA Health Web Client"
   - Orígenes de JavaScript autorizados:
     - `http://localhost:5173` (para desarrollo)
     - `https://tu-dominio.com` (para producción)
   - URIs de redirección autorizados:
     - `http://localhost:5173` (para desarrollo)
     - `https://tu-dominio.com` (para producción)
4. Haz clic en **Crear**
5. **Copia el ID de cliente** que se muestra

### 4. Configurar las variables de entorno

1. En la raíz del proyecto, crea un archivo `.env` (si no existe)
2. Copia el contenido de `.env.example`
3. Reemplaza los valores con tus credenciales:

```env
VITE_GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=tu-api-key
```

4. **NUNCA** subas el archivo `.env` al repositorio (ya está en .gitignore)

### 5. Reiniciar el servidor de desarrollo

```bash
npm run dev
```

## Uso de la sincronización

### Primer uso

1. Ve a la vista de **Calendario** en SIMORA Health
2. Verás un botón "Conectar Google Calendar"
3. Haz clic en el botón
4. Se abrirá una ventana de Google para que autorices el acceso
5. Selecciona tu cuenta de Google
6. Revisa y acepta los permisos solicitados
7. Una vez autorizado, verás el botón "Sincronizar"

### Sincronizar prestaciones

1. Asegúrate de estar en el mes que deseas sincronizar
2. Haz clic en el botón **Sincronizar**
3. El sistema:
   - Eliminará eventos anteriores de SIMORA en ese mes (si existen)
   - Exportará todas las prestaciones del mes actual a Google Calendar
4. Verás un resumen con:
   - Eventos eliminados
   - Prestaciones exportadas exitosamente
   - Errores (si los hay)

### Desconectar Google Calendar

- Haz clic en el enlace **Desconectar** junto al botón de sincronización
- Esto cerrará la sesión pero no eliminará los eventos ya sincronizados

## Características

### Colores por tipo de prestación

Cada tipo de prestación se sincroniza con un color específico en Google Calendar:

- **Control de Psiquiatra**: Azul cielo
- **Control de Psicólogo**: Verde
- **Visita domiciliaria**: Azul
- **Ingreso Multidisciplinario**: Amarillo
- **Receta**: Rojo
- **Informe médico**: Naranja
- **Otros**: Gris

### Información en los eventos

Cada evento de Google Calendar incluye:

- **Título**: Tipo de prestación - Nombre del paciente
- **Descripción**:
  - Nombre completo del paciente
  - RUT del paciente
  - Profesional a cargo
  - Estado de la prestación
  - Observaciones (si las hay)

### Identificación de eventos SIMORA

Todos los eventos creados por SIMORA Health tienen una propiedad privada `simoraId` que permite:

- Identificarlos como eventos de SIMORA
- Evitar duplicados
- Limpiarlos cuando se vuelve a sincronizar

## Solución de problemas

### "Error al inicializar Google Calendar API"

- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que la API de Google Calendar esté habilitada en tu proyecto
- Revisa que los dominios autorizados incluyan tu URL actual

### "No está autenticado en Google Calendar"

- Haz clic en "Conectar Google Calendar"
- Si el problema persiste, cierra sesión y vuelve a autenticar

### "Error al sincronizar"

- Verifica tu conexión a internet
- Asegúrate de tener permisos en Google Calendar
- Revisa que no haya límites de cuota excedidos en Google Cloud Console

### Eventos duplicados

- La sincronización elimina automáticamente eventos previos de SIMORA antes de exportar
- Si ves duplicados, intenta sincronizar nuevamente

## Límites y cuotas

Google Calendar API tiene límites de uso:

- **Lectura**: 1,000,000 solicitudes/día
- **Escritura**: 10,000 solicitudes/día

Para uso normal de SIMORA Health, estos límites son más que suficientes.

## Privacidad y seguridad

- SIMORA Health solo solicita permisos para gestionar eventos de calendario
- No accede a otros datos de tu cuenta de Google
- Las credenciales se almacenan localmente en tu navegador
- Los eventos se crean en tu calendario principal pero solo tú puedes verlos
- Puedes revocar el acceso en cualquier momento desde [Google Account Settings](https://myaccount.google.com/permissions)

## Soporte

Si tienes problemas con la configuración, contacta al administrador del sistema.
