# 🚀 Inicio Rápido - Sistema RLP Consulta Privada

## ✅ La migración está completa

Tu aplicación ya NO se conecta a Firebase y funciona completamente en local.

---

## 🎯 Pasos para empezar (5 minutos)

### 1️⃣ Iniciar la aplicación

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

### 2️⃣ Iniciar sesión

**Credenciales por defecto:**
- **RUT:** `99999999-9`
- **Contraseña:** `1234`

### 3️⃣ Cambiar contraseña (IMPORTANTE)

1. Desde el login, haz clic en "🔐 Cambiar Contraseña"
2. Ingresa:
   - RUT: `99999999-9`
   - Contraseña actual: `1234`
   - Nueva contraseña: (tu contraseña segura)

### 4️⃣ Importar tus pacientes

**Opción A: Usar archivo CSV**

1. Prepara un archivo CSV con tus pacientes (ver `ejemplo_pacientes.csv`)
2. En la app: **Admin** (Alt+9) → **Importar/Exportar**
3. Haz clic en "📂 Seleccionar Archivo"
4. Elige tu archivo CSV
5. ¡Listo! Tus pacientes están importados

**Opción B: Usar archivo JSON**

1. Prepara un archivo JSON (array de objetos Patient)
2. Mismo proceso que CSV
3. Formato más preciso para datos complejos

### 5️⃣ Hacer tu primer backup

1. En **Admin** → **Importar/Exportar**
2. Haz clic en "💾 Descargar Backup Completo"
3. Guarda el archivo en un lugar seguro
4. ¡Repite esto semanalmente!

---

## 📁 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `README_CONSULTA_PRIVADA.md` | 📖 Guía completa de uso |
| `CAMBIOS_REALIZADOS.md` | 🔧 Detalles técnicos de la migración |
| `ejemplo_pacientes.csv` | 📊 Plantilla CSV de ejemplo |
| `INICIO_RAPIDO.md` | ⚡ Este archivo |

---

## 🎨 Formato CSV para tus pacientes

**Mínimo requerido:**
```csv
nombre,rut,fechaNacimiento,sexo
Juan Pérez,12345678-9,1989-01-15,Masculino
María González,98765432-1,1992-05-20,Femenino
```

**Completo (ver `ejemplo_pacientes.csv`):**
```csv
nombre,rut,fechaNacimiento,sexo,edad,direccion,comuna,telefonos,email,ocupacion,...
```

**Tips:**
- Fecha en formato `YYYY-MM-DD`
- Sexo: "Masculino" o "Femenino"
- Teléfonos separados con comas
- Usa Excel o Google Sheets para crear el CSV

---

## 💾 Cómo crear tu CSV de pacientes

### Usando Excel / Google Sheets

1. Crea una hoja de cálculo
2. Primera fila = encabezados (nombre, rut, fechaNacimiento, sexo, ...)
3. Siguientes filas = datos de pacientes
4. Guardar como → CSV (separado por comas)
5. Importar en la aplicación

### Columnas importantes

| Columna | Requerido | Formato | Ejemplo |
|---------|-----------|---------|---------|
| nombre | ✅ Sí | Texto | Juan Pérez |
| rut | ✅ Sí | 12345678-9 | 12345678-9 |
| fechaNacimiento | ✅ Sí | YYYY-MM-DD | 1989-01-15 |
| sexo | ✅ Sí | Masculino/Femenino | Masculino |
| edad | ❌ No | Número | 35 |
| direccion | ❌ No | Texto | Calle Falsa 123 |
| telefonos | ❌ No | +56... | +56912345678 |
| email | ❌ No | email@domain.com | juan@email.com |

---

## 🔐 Crear más usuarios

1. Ir a **Admin** (Alt+9)
2. Sección "Gestión de Usuarios"
3. Llenar formulario:
   - RUT (será su username)
   - Nombre completo
   - Contraseña
   - Rol (admin/profesional/estadistica)
   - Título profesional
4. Clic en "Agregar Usuario"

---

## ⚠️ Importante: BACKUP

**Haz backup regularmente:**
- ✅ Después de importar pacientes
- ✅ Una vez por semana mínimo
- ✅ Antes de hacer cambios importantes
- ✅ Antes de actualizar el navegador

**Si pierdes los datos sin backup, NO hay forma de recuperarlos.**

---

## 🆘 Problemas Comunes

### ❌ No puedo iniciar sesión

**Solución:** Abre la consola del navegador (F12) y ejecuta:

```javascript
localStorage.clear();
```

Luego recarga la página. Se creará un nuevo usuario admin con credenciales por defecto.

### ❌ Importación falla

**Solución:**
1. Verifica que el CSV tenga los encabezados correctos
2. Revisa que las fechas estén en formato YYYY-MM-DD
3. Intenta con el archivo `ejemplo_pacientes.csv` primero

### ❌ Perdí todos los datos

**Solución:**
- Si tienes backup: Consola del navegador (F12) → Ver README para restaurar
- Si NO tienes backup: Los datos se perdieron permanentemente 😞

---

## 🎓 Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| Alt+1 | Ingresar Prestación |
| Alt+2 | Actividad Reciente |
| Alt+3 | Buscar Paciente |
| Alt+4 | Calendario |
| Alt+5 | Registro de Pacientes |
| Alt+6 | Estadísticas |
| Alt+7 | Anexos |
| Alt+8 | Ayuda |
| Alt+9 | Admin |
| Ctrl+K | Búsqueda rápida |

---

## ✨ Funcionalidades Principales

1. 📝 **Ingresar Prestaciones** - Registrar atenciones
2. 👥 **Gestión de Pacientes** - Fichas clínicas completas
3. 📊 **Estadísticas** - KPIs y análisis
4. 📅 **Calendario** - Vista de citas
5. 🗺️ **Mapa Geográfico** - Distribución de pacientes
6. 💊 **Gestión de Medicamentos** - Catálogo de fármacos
7. 📞 **Directorio** - Anexos del personal
8. 🔐 **Multi-usuario** - Roles y permisos

---

## 📱 Soporte

Para más información detallada, consulta:
- **Uso general:** `README_CONSULTA_PRIVADA.md`
- **Detalles técnicos:** `CAMBIOS_REALIZADOS.md`
- **Ejemplo CSV:** `ejemplo_pacientes.csv`

---

## ✅ Checklist de Inicio

- [ ] Instalé dependencias (`npm install`)
- [ ] Inicié la aplicación (`npm run dev`)
- [ ] Hice login con credenciales por defecto
- [ ] Cambié la contraseña del admin
- [ ] Preparé mi archivo CSV con pacientes
- [ ] Importé mis pacientes
- [ ] Hice mi primer backup
- [ ] Creé usuarios para otros profesionales
- [ ] Probé todas las funcionalidades principales

---

## 🎉 ¡Listo para usar!

Tu sistema está completamente configurado y listo para uso en consulta privada.

**Recuerda:**
- 💾 Hacer backups regularmente
- 🔐 Usar contraseñas seguras
- 📊 Explorar todas las funcionalidades
- 📖 Consultar la documentación completa cuando necesites

---

**¡Bienvenido al sistema RLP para consulta privada!**

Versión 2.0.0 - Sistema Local
