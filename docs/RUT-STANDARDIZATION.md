# Estandarización de RUT en SIMORAHealth

## Formato Estándar

Todos los RUTs en el sistema SIMORAHealth siguen el formato estandarizado:

```
00000000-0
```

- **8 dígitos** (con ceros a la izquierda si es necesario)
- **Guion** `-`
- **Dígito verificador** (0-9 o K)

### Ejemplos

| Formato Antiguo | Formato Nuevo (Estandarizado) |
|----------------|-------------------------------|
| `9379452-4`    | `09379452-4`                 |
| `12.345.678-9` | `12345678-9`                 |
| `1.508.865-K`  | `01508865-K`                 |
| `6.762.155-7`  | `06762155-7`                 |

## Funciones Disponibles

### `standardizeRUT(rut: string): string`

Estandariza cualquier RUT al formato `00000000-0`.

**Ubicación:** `utils/helpers.ts`

**Uso:**
```typescript
import { standardizeRUT } from '@/utils/helpers';

const rut = standardizeRUT('12.345.678-9');
// Retorna: '12345678-9'

const rutWithLeadingZeros = standardizeRUT('9379452-4');
// Retorna: '09379452-4'
```

**Características:**
- Elimina puntos, espacios y guiones
- Rellena con ceros a la izquierda hasta 8 dígitos
- Convierte 'k' a 'K' (mayúscula)
- Retorna string vacío si el input es inválido

### `isValidRut(rut: string): boolean`

Valida que un RUT esté en el formato estandarizado correcto.

**Ubicación:** `src/types/index.ts`

**Uso:**
```typescript
import { isValidRut } from '@/types';

isValidRut('12345678-9'); // true
isValidRut('12.345.678-9'); // false (tiene puntos)
isValidRut('1234567-8'); // false (solo 7 dígitos)
isValidRut('123456789'); // false (sin guion)
```

**Validación:**
- Debe tener exactamente 8 dígitos
- Debe tener un guion
- Dígito verificador debe ser 0-9 o K/k

## Migración de Datos Existentes

Para migrar todos los RUTs existentes al formato estandarizado:

### Opción 1: Script de Migración (Recomendado)

```bash
# Ejecutar el script de migración
ts-node scripts/standardize-ruts.ts
```

Este script:
- Lee todos los pacientes y usuarios de Firestore
- Estandariza sus RUTs al formato `00000000-0`
- Actualiza los registros en la base de datos
- Muestra un reporte detallado de los cambios

### Opción 2: Migración Manual

Si prefieres migrar manualmente o necesitas más control:

```typescript
import { standardizeRUT } from '@/utils/helpers';
import { doc, updateDoc } from 'firebase/firestore';

// Para un paciente específico
const patient = await getPatient(patientId);
const standardizedRUT = standardizeRUT(patient.rut);

await updateDoc(doc(db, 'patients', patientId), {
  rut: standardizedRUT
});
```

## Cambios en el Sistema

### 1. Validación de RUT

La validación ahora requiere el formato estandarizado:

**Antes:**
```typescript
const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/; // Aceptaba 7-8 dígitos
```

**Después:**
```typescript
const rutRegex = /^[0-9]{8}-[0-9Kk]$/; // Requiere exactamente 8 dígitos
```

### 2. Formateo en Login

El campo de RUT en el login ahora automáticamente agrega ceros a la izquierda:

**Ubicación:** `components/LoginPage.tsx:32-40`

```typescript
const formatRut = (value: string): string => {
  const cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanValue.length === 0) return '';
  const body = cleanValue.slice(0, -1);
  const dv = cleanValue.slice(-1);
  const paddedBody = body.padStart(8, '0'); // ← Nuevo: padding con ceros
  return body ? `${paddedBody}-${dv}` : dv;
};
```

### 3. Extracción de RUT desde Markdown

La función de extracción ahora estandariza automáticamente:

**Ubicación:** `utils/extractPatientData.ts:32-48`

```typescript
function extractRUT(content: string): string {
  const rutPattern = /\b(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])\b/;
  const match = content.match(rutPattern);

  if (!match) return '';

  // Estandarizar al formato 00000000-0
  const cleaned = match[1].replace(/[.\s-]/g, '').toUpperCase();
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  const paddedBody = body.padStart(8, '0');

  return `${paddedBody}-${dv}`;
}
```

### 4. Mock Data

Todos los datos de ejemplo ahora usan el formato estandarizado:

**Ubicación:** `mockPatients.ts`

```typescript
// ANTES
rut: '15.234.567-8'

// DESPUÉS
rut: '15234567-8'
```

## Búsqueda de Pacientes

La búsqueda de pacientes sigue funcionando con cualquier formato:

**Ubicación:** `components/PatientIndexView.tsx:75-82`

```typescript
// El usuario puede buscar con: 12345678-9, 12.345.678-9, o 123456789
const normalizedSearchTerm = searchTerm.replace(/[.-]/g, '');
const normalizedRUT = patient.rut.replace(/[.-]/g, '');

if (normalizedRUT.includes(normalizedSearchTerm)) {
  // Encuentra el paciente
}
```

## Compatibilidad

### RUTs de Prueba

Los siguientes RUTs de prueba siguen siendo válidos y se mantendrán sin cambios:

- `99999999-9`
- `00001234-4` (estandarizado desde `1234-4`)
- `00001234-5` (estandarizado desde `1234-5`)

### Retrocompatibilidad

- La función `standardizeRUT()` acepta cualquier formato de RUT
- La búsqueda normaliza automáticamente los RUTs para comparación
- Los RUTs existentes se pueden migrar gradualmente

## Mejores Prácticas

1. **Al crear nuevos pacientes:** Siempre usar `standardizeRUT()` antes de guardar
   ```typescript
   const patient = {
     ...otherFields,
     rut: standardizeRUT(inputRUT)
   };
   ```

2. **Al buscar por RUT:** Normalizar tanto el término de búsqueda como el RUT almacenado
   ```typescript
   const normalized = (rut: string) => rut.replace(/[.-]/g, '');
   if (normalized(patient.rut).includes(normalized(searchTerm))) {
     // Encontrado
   }
   ```

3. **Al validar RUT:** Usar `isValidRut()` después de estandarizar
   ```typescript
   const standardized = standardizeRUT(inputRUT);
   if (!isValidRut(standardized)) {
     throw new Error('RUT inválido');
   }
   ```

4. **Al mostrar RUT al usuario:** Puedes mantener el formato estandarizado o agregar puntos para mejor legibilidad
   ```typescript
   // Formato estandarizado (almacenado)
   const rut = '12345678-9';

   // Formato con puntos (solo para display, opcional)
   const displayRUT = rut.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
   // Resultado: '12.345.678-9'
   ```

## Preguntas Frecuentes

**P: ¿Por qué no usar puntos en el formato estándar?**
R: Los puntos son solo para visualización. Para almacenamiento y procesamiento, es más simple y eficiente usar solo dígitos y guion.

**P: ¿Qué pasa con los RUTs que tienen menos de 8 dígitos?**
R: Se rellenan automáticamente con ceros a la izquierda. Por ejemplo: `9379452-4` → `09379452-4`

**P: ¿Debo actualizar todos los RUTs manualmente?**
R: No, ejecuta el script de migración `scripts/standardize-ruts.ts` que actualiza todos automáticamente.

**P: ¿Afecta esto la búsqueda de pacientes?**
R: No, la búsqueda normaliza automáticamente los RUTs para permitir búsquedas con o sin puntos/guiones.

**P: ¿Cómo afecta esto al login?**
R: El campo de login formatea automáticamente el RUT mientras el usuario escribe, agregando el padding de ceros necesario.
