# 📚 Guía de Migración - Markdown a SIMORAHealth

## 🎯 Propósito

Este script migra tus fichas clínicas desde archivos Markdown (`.md`) al formato JSON compatible con SIMORAHealth, **sin modificar** los archivos originales.

---

## ⚠️ Importante: Seguridad de Datos

### ✅ Lo que el script hace:
- **Lee** los archivos .md desde tu directorio de pacientes
- **Extrae** información estructurada (nombre, RUT, diagnósticos, fármacos, etc.)
- **Genera** un archivo JSON nuevo en el directorio de SIMORAHealth

### ✅ Lo que el script NO hace:
- ❌ **NO modifica** tus archivos .md originales
- ❌ **NO elimina** ningún dato
- ❌ **NO mueve** archivos
- ❌ **NO sube** datos a ningún servidor

### 🔒 Tus archivos originales permanecen 100% intactos

---

## 🚀 Cómo Usar

### Paso 1: Ejecutar la migración

Abre una terminal en el directorio de SIMORAHealth y ejecuta:

```bash
npm run migrate
```

### Paso 2: Revisar los archivos generados

El script generará dos archivos en el directorio de SIMORAHealth:

1. **`pacientes_migrados.json`** - Contiene todos los pacientes
2. **`notas_clinicas_migradas.json`** - Contiene las evoluciones/controles

**IMPORTANTE:** Revisa estos archivos antes de importarlos para verificar que la información se extrajo correctamente.

### Paso 3: Abrir el archivo JSON generado

Puedes abrirlo con cualquier editor de texto (VS Code, Notepad++, etc.) y verificar:

- ✅ Nombres de pacientes
- ✅ RUTs
- ✅ Diagnósticos
- ✅ Medicamentos
- ✅ Fechas de nacimiento

### Paso 4: Importar en SIMORAHealth

1. Abre SIMORAHealth en el navegador:
   ```bash
   npm run dev
   ```

2. Inicia sesión como administrador:
   - **RUT:** `99999999-9`
   - **Contraseña:** `1234`

3. Ve a **Admin** (Alt+9) → **Importar/Exportar**

4. Selecciona **"Importar desde JSON"**

5. Haz clic en **"📂 Seleccionar Archivo"**

6. Selecciona el archivo **`pacientes_migrados.json`**

7. Elige una opción:
   - **"Agregar a pacientes existentes"** - Mantiene pacientes actuales y agrega los nuevos
   - **"Reemplazar todos los pacientes"** - Borra pacientes actuales y carga solo los del archivo

8. Haz clic en **"Importar"**

### Paso 5: Verificar la importación

- Ve a **Registro** para ver la lista de pacientes
- Verifica que los datos se importaron correctamente
- Revisa algunas fichas para confirmar que la información es correcta

---

## 📋 Qué Datos se Extraen

El script intenta extraer automáticamente:

| Campo | Método de extracción |
|-------|---------------------|
| **Nombre** | Del nombre del archivo o primera línea del documento |
| **RUT** | Busca patrones como `12345678-9` |
| **Fecha de nacimiento** | Busca formatos `DD/MM/YYYY` o `YYYY-MM-DD` |
| **Edad** | Calculada automáticamente desde fecha de nacimiento |
| **Sexo** | Detecta "Masculino/Femenino" o infiere por nombre |
| **Email** | Busca patrones de email |
| **Teléfonos** | Busca números con formato `+569XXXXXXXX` |
| **Dirección** | Busca líneas que contengan "dirección" o formato de calle |
| **Ocupación** | Busca palabras clave (abogado, ingeniero, etc.) |
| **Alergias** | Busca sección "alergias" o "RAM" |
| **Fármacos** | Extrae medicamentos con dosis (ej: "Sertralina 50mg") |
| **Diagnósticos** | Busca códigos CIE-10 (F41.1) o texto en sección diagnósticos |
| **Notas clínicas** | Extrae secciones con fechas (controles/evoluciones) |

---

## 🔧 Si algo sale mal

### Problema: "El directorio no existe"
- Verifica que la ruta en `migrate-from-markdown.ts` sea correcta (línea 17)
- Ruta actual: `C:\boveda725OB\beto725\Pacientes Extrasistema\Pacientes extrasistema`

### Problema: "No se extrajo el RUT correctamente"
- Algunos pacientes pueden quedar con RUT `pendiente-X`
- Puedes editarlos manualmente en SIMORAHealth después de importar

### Problema: "Faltan datos de algunos pacientes"
- El script usa heurísticas para extraer datos
- Algunos campos pueden no detectarse si el formato es diferente
- Puedes completar manualmente en SIMORAHealth

### Problema: "No me gusta el resultado"
- ✅ Tus archivos .md originales están seguros
- ✅ Puedes borrar los pacientes importados desde Admin
- ✅ Puedes ajustar el script y volver a ejecutar

---

## 🎨 Personalizar el Script

Si quieres ajustar cómo se extraen los datos, edita el archivo:
```
C:\Users\betoe\SIMORAHealth\migrate-from-markdown.ts
```

Principales funciones para personalizar:

- `extractRUT()` - Cómo se extrae el RUT
- `extractFechaNacimiento()` - Cómo se extrae la fecha
- `extractFarmacos()` - Cómo se extraen medicamentos
- `extractDiagnosticos()` - Cómo se extraen diagnósticos
- `extractClinicalNotes()` - Cómo se extraen evoluciones

Después de modificar, ejecuta nuevamente:
```bash
npm run migrate
```

---

## 📊 Estadísticas de Migración

Al ejecutar el script verás en la consola:

```
🚀 Iniciando migración de pacientes desde Markdown...
⚠️  MODO DE SOLO LECTURA: Los archivos originales NO serán modificados

📁 Encontrados 30 archivos .md

✅ 1. Alfonso Mella (23590065-3)
✅ 2. Daniela Urra (12345678-9)
...
⏭️  Omitido: index.md

✅ 28 pacientes exportados a ./pacientes_migrados.json
✅ 45 notas clínicas exportadas a ./notas_clinicas_migradas.json

🎉 ¡Migración completada!

✅ Archivos originales intactos (no modificados)
```

---

## 🆘 Soporte

Si encuentras problemas:

1. **Verifica los archivos JSON generados** - Revísalos en un editor de texto
2. **Consulta la consola** - Busca mensajes de error
3. **Prueba con un subconjunto pequeño** - Mueve algunos archivos .md a una carpeta temporal
4. **Contacta al desarrollador** - Si persisten los problemas

---

## ✨ Mejoras Futuras

Posibles mejoras al script:

- [ ] Soporte para más formatos de fecha
- [ ] Extracción de comuna desde dirección
- [ ] Geocodificación automática (lat/lon)
- [ ] Detección de pensión de discapacidad
- [ ] Extracción de relación terapéutica
- [ ] Importación directa de adjuntos (PDFs, imágenes)

---

## 📝 Notas Técnicas

- **Lenguaje:** TypeScript compilado a JavaScript
- **Dependencias:** Solo Node.js y las ya instaladas en el proyecto
- **Tiempo de ejecución:** < 5 segundos para ~30 pacientes
- **Tamaño de salida:** ~50-100 KB por cada 10 pacientes

---

## ✅ Checklist de Migración

Antes de importar en producción:

- [ ] Hacer backup completo de SIMORAHealth (Admin > Descargar Backup)
- [ ] Ejecutar script de migración
- [ ] Revisar archivos JSON generados
- [ ] Probar importación en ambiente de prueba
- [ ] Verificar que datos críticos están correctos (RUTs, diagnósticos)
- [ ] Importar en producción
- [ ] Verificar pacientes importados
- [ ] Hacer nuevo backup post-migración

---

**¡Buena suerte con la migración!** 🚀

Si tienes dudas o encuentras problemas, no dudes en pedir ayuda.
