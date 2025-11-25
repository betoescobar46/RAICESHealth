# SIMORA Health - Online First

SIMORA Health es una aplicación de gestión clínica para salud mental, diseñada para funcionar exclusivamente online utilizando Firebase como backend.

## Arquitectura

La aplicación sigue una arquitectura **Online-First**, eliminando la dependencia de `localStorage` para la persistencia de datos críticos.

*   **Backend:** Firebase (Firestore, Authentication).
*   **Frontend:** React + Vite.
*   **Autenticación:** Firebase Authentication.
*   **Base de Datos:** Cloud Firestore.

## Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar Firebase:**
    Asegúrese de tener las credenciales de Firebase configuradas en `services/firebase.ts`.

3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

## Scripts Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Construye la aplicación para producción.
*   `npm run seed:firestore`: Puebla la base de datos Firestore con datos iniciales (usuarios, configuración). **Nota:** Requiere reglas de seguridad permisivas temporalmente o credenciales de administrador.

## Migración de Datos

Para migrar datos desde versiones anteriores (basadas en Markdown/JSON local):

1.  Utilice la vista de **Importar/Exportar** en la aplicación.
2.  Seleccione los archivos JSON generados por los scripts de migración (`pacientes_completos.json`, `notas_clinicas_completas.json`).
3.  El sistema validará y cargará los datos en Firestore.

## Consideraciones de Seguridad

*   **Reglas de Firestore:** Se deben configurar reglas estrictas para producción, permitiendo solo a usuarios autenticados leer/escribir según su rol.
*   **Usuarios:** El usuario administrador por defecto debe cambiar su contraseña inmediatamente después del primer inicio de sesión.

## Estructura del Proyecto

*   `src/components`: Componentes de React.
*   `services`: Servicios de integración (Firebase).
*   `src/types`: Definiciones de tipos TypeScript.
*   `utils`: Utilidades generales.
*   `scripts`: Scripts de mantenimiento y seeding.