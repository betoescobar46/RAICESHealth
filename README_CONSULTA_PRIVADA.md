# Sistema RLP - Versión Consulta Privada

Sistema de gestión de salud mental adaptado para consultas privadas, basado en el proyecto piloto COSAM Maule.

## 🔄 Cambios Realizados

Este proyecto ha sido modificado para funcionar **completamente offline** sin conexión a Firebase:

### ✅ Eliminaciones
- ❌ Firebase Authentication
- ❌ Cloud Firestore
- ❌ Todas las dependencias de Firebase
- ❌ Datos de pacientes de COSAM Maule
- ❌ Archivo `firebaseConfig.ts`

### ✅ Implementaciones
- ✅ Sistema de autenticación local con LocalStorage
- ✅ Almacenamiento local de todos los datos (pacientes, usuarios, configuración)
- ✅ Sistema de importación/exportación de pacientes (CSV y JSON)
- ✅ Backup completo del sistema
- ✅ Usuario administrador inicial

---

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

### 3. Primer Login

**Credenciales de administrador por defecto:**
- **RUT:** `99999999-9`
- **Contraseña:** `1234`

⚠️ **IMPORTANTE:** Cambiar esta contraseña después del primer login desde el panel de administración.

---

## 📊 Importar Pacientes

### Opción 1: Desde la interfaz

1. Iniciar sesión como administrador
2. Ir a la vista de **Admin** (Alt+9)
3. Seleccionar la sección **Importar/Exportar**
4. Hacer clic en "📂 Seleccionar Archivo"
5. Elegir un archivo CSV o JSON con los datos de sus pacientes

### Opción 2: Manualmente con código

```javascript
// En la consola del navegador (F12)
import { importFromJSON } from './utils/importPatients';

const pacientes = [
  {
    nombre: "Juan Pérez",
    rut: "12345678-9",
    edad: 35,
    sexo: "Masculino",
    fechaNacimiento: "1989-01-15",
    direccion: "Calle Falsa 123",
    comuna: "Talca",
    // ... más campos
  },
  // ... más pacientes
];

importFromJSON(JSON.stringify(pacientes), false); // false = agregar, true = reemplazar todos
```

---

## 📁 Formato de Importación

### CSV

El archivo CSV debe tener encabezados con los siguientes campos:

**Campos mínimos requeridos:**
- `nombre` - Nombre completo del paciente
- `rut` - RUT con formato chileno (12345678-9)
- `fechaNacimiento` - Formato YYYY-MM-DD
- `sexo` - "Masculino" o "Femenino"

**Campos opcionales:**
```
edad, identidadGenero, direccion, comuna, lat, lon, telefonos, email, tutor,
ocupacion, dispositivoAPS, alergias, ram, objetivosTerapeuticos,
diagnostico_saludMental, diagnostico_morbilidadMedica, diagnostico_factoresPsicosociales,
farmacos, pensionDiscapacidad, credencialDiscapacidad, consumoActivoDrogas
```

**Formato especial para campos complejos:**
- **Teléfonos:** Separar con comas - Ejemplo: `+56912345678, +56987654321`
- **Fármacos:** Formato `nombre|dosis` separados por comas - Ejemplo: `Sertralina|50mg, Clonazepam|2mg`

**Ejemplo CSV:**
```csv
nombre,rut,fechaNacimiento,sexo,edad,direccion,telefonos
Juan Pérez,12345678-9,1989-01-15,Masculino,35,Calle Falsa 123,+56912345678
María González,98765432-1,1992-05-20,Femenino,32,Av. Principal 456,+56987654321
```

### JSON

El archivo JSON debe ser un array de objetos con la estructura del tipo `Patient`:

```json
[
  {
    "nombre": "Juan Pérez",
    "rut": "12345678-9",
    "edad": 35,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1989-01-15",
    "direccion": "Calle Falsa 123",
    "comuna": "Talca",
    "lat": -35.4264,
    "lon": -71.6554,
    "telefonos": ["+56912345678"],
    "email": "juan.perez@email.com",
    "tutor": "No aplica",
    "ocupacion": "Ingeniero",
    "dispositivoAPS": "CESFAM Centro",
    "alergias": "Ninguna",
    "ram": "Ninguna",
    "objetivosTerapeuticos": "Mejorar manejo de ansiedad",
    "diagnostico": {
      "saludMental": "F41.1 - Trastorno de ansiedad generalizada",
      "morbilidadMedica": "No registra",
      "factoresPsicosociales": "Z56.0 - Problemas relacionados con el empleo"
    },
    "farmacos": [
      {
        "nombre": "Sertralina",
        "dosis": "50mg/día"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  }
]
```

---

## 💾 Backup y Exportación

### Exportar pacientes

1. **Formato CSV:** Compatible con Excel, Google Sheets
   - Click en "📄 Exportar CSV"

2. **Formato JSON:** Transferencia exacta entre sistemas
   - Click en "📋 Exportar JSON"

### Backup completo del sistema

Incluye **todos** los datos: pacientes, usuarios, configuración, fármacos, etc.

- Click en "💾 Descargar Backup Completo"
- Guarda el archivo JSON generado en un lugar seguro
- Se recomienda hacer backups **regulares** (semanales)

### Restaurar desde backup

Para restaurar un backup completo:

```javascript
// En la consola del navegador (F12)
import LocalStorageService from './services/LocalStorageService';

// Copiar el contenido del archivo JSON de backup
const backupData = `{ ... contenido del backup ... }`;

LocalStorageService.importAllData(backupData);
window.location.reload(); // Recargar la página
```

---

## 👥 Gestión de Usuarios

### Crear nuevo usuario

1. Ir a **Admin** → **Gestión de Usuarios**
2. Completar el formulario con:
   - RUT (será el username)
   - Nombre completo
   - Contraseña
   - Rol (admin, profesional, estadística)
   - Título profesional
3. Click en "Agregar Usuario"

### Roles disponibles

- **admin:** Acceso completo al sistema, puede gestionar usuarios
- **profesional:** Puede ingresar prestaciones y ver fichas de pacientes
- **estadística:** Solo puede ver estadísticas y reportes

### Cambiar contraseña

Desde la página de login:
1. Click en "🔐 Cambiar Contraseña"
2. Ingresar RUT, contraseña actual y nueva contraseña
3. Click en "Cambiar"

---

## 🔐 Seguridad

### Protección de datos

- Todos los datos se almacenan **localmente** en el navegador (LocalStorage)
- No hay transmisión de datos a servidores externos
- Los backups son archivos JSON locales

### Bloqueo de cuentas

- Después de 5 intentos fallidos de login, la cuenta se bloquea por 15 minutos
- Los administradores pueden desbloquear cuentas desde el panel de admin

### Recomendaciones

1. **Cambiar la contraseña del admin por defecto inmediatamente**
2. Usar contraseñas seguras para todos los usuarios
3. Hacer backups regulares del sistema
4. No compartir credenciales entre usuarios
5. Cerrar sesión al terminar de usar el sistema

---

## 📦 Estructura del Sistema

### Almacenamiento Local

El sistema usa LocalStorage con las siguientes claves:

- `rlp_users` - Usuarios del sistema
- `rlp_patients` - Pacientes
- `rlp_prestaciones` - Prestaciones (atenciones)
- `rlp_farmacos` - Catálogo de medicamentos
- `rlp_prestacion_config` - Configuración de prestaciones por perfil
- `rlp_all_prestaciones` - Lista de todos los tipos de prestaciones
- `rlp_current_user` - Usuario actual en sesión
- `rlp_session_token` - Token de sesión

### Limpiar datos completamente

⚠️ **ADVERTENCIA:** Esto eliminará TODOS los datos del sistema

```javascript
// En la consola del navegador (F12)
import LocalStorageService from './services/LocalStorageService';

LocalStorageService.clearAllData();
window.location.reload();
```

---

## 🛠️ Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run preview` - Previsualizar build de producción

---

## 🆘 Solución de Problemas

### No puedo iniciar sesión

1. Verificar que el RUT esté con formato correcto (12345678-9)
2. Si olvidó la contraseña del admin, puede recrear el usuario desde la consola:

```javascript
import LocalStorageService from './services/LocalStorageService';
import { DEFAULT_ADMIN_USER } from './initializeSystem';

LocalStorageService.addUser(DEFAULT_ADMIN_USER);
```

### Perdí todos los datos

Si no tiene un backup:
1. Los datos están en LocalStorage del navegador
2. No cierre el navegador
3. Exporte inmediatamente usando "💾 Descargar Backup Completo"

### La aplicación no carga

1. Limpiar caché del navegador
2. Verificar consola del navegador (F12) para errores
3. Reinstalar dependencias: `npm install`
4. Reconstruir: `npm run build`

### Importación falla

1. Verificar que el archivo CSV/JSON tenga el formato correcto
2. Revisar la consola del navegador para mensajes de error específicos
3. Intentar importar un archivo más pequeño para probar

---

## 📞 Soporte

Para reportar problemas o solicitar funcionalidades:

1. Revisar este README primero
2. Verificar la consola del navegador (F12) para errores
3. Hacer backup de los datos antes de cualquier cambio importante

---

## 📝 Notas Adicionales

### Privacidad

- Esta aplicación NO envía datos a servidores externos
- Todos los datos permanecen en el dispositivo local
- No se requiere conexión a internet después de la carga inicial

### Limitaciones de LocalStorage

- Capacidad aproximada: 5-10 MB dependiendo del navegador
- Para grandes cantidades de pacientes (>1000), considerar usar IndexedDB (contactar desarrollador)

### Compatibilidad

- Navegadores modernos (Chrome, Firefox, Edge, Safari)
- No compatible con Internet Explorer
- Se recomienda Chrome o Firefox para mejor rendimiento

---

## 📄 Licencia

Basado en el proyecto piloto COSAM Maule - Región del Maule, Chile
Adaptado para uso en consultas privadas

---

**Versión:** 2.0.0 - Consulta Privada (Local Storage)
**Última actualización:** 2025

---

## 🎯 Próximos Pasos Recomendados

1. ✅ Iniciar sesión con las credenciales por defecto
2. ✅ Cambiar la contraseña del administrador
3. ✅ Crear usuarios para cada profesional
4. ✅ Importar la base de pacientes desde CSV/JSON
5. ✅ Configurar las prestaciones disponibles por perfil
6. ✅ Hacer un backup inicial
7. ✅ Comenzar a usar el sistema

¡Bienvenido al sistema RLP para consulta privada!
