# Utils Directory

This directory contains shared utility functions used throughout the application.

## Structure

```
utils/
├── excelUtils.ts          # Excel export functionality
├── dateUtils.ts           # Date formatting and manipulation
├── helpers.ts             # RUT validation, string utilities, general helpers
├── index.ts               # Barrel export (import from here!)
├── extractPatientData.ts  # Patient data extraction utilities
├── importPatients.ts      # Patient import functionality
├── patientAccessControl.ts # Patient access control logic
└── themeUtils.ts          # Theme management utilities
```

## Usage

### Recommended: Import from index.ts (Barrel Export)

```typescript
// Import multiple utilities from a single location
import {
  exportToExcel,
  formatDateForDisplay,
  getLocalDateString,
  validateRUT,
  cn
} from '../utils';
```

### Alternative: Direct imports

```typescript
import { exportToExcel } from '../utils/excelUtils';
import { formatDateForDisplay } from '../utils/dateUtils';
import { validateRUT } from '../utils/helpers';
```

## Available Utilities

### Excel Utilities (excelUtils.ts)

#### `exportToExcel(data: any[], fileName: string): void`
Exports an array of objects to an Excel file.

```typescript
import { exportToExcel } from '../utils';

const data = [
  { nombre: 'Juan', edad: 30 },
  { nombre: 'María', edad: 25 }
];
exportToExcel(data, 'reporte-pacientes');
```

#### `isExcelExportAvailable(): boolean`
Checks if the XLSX library is available.

```typescript
import { isExcelExportAvailable } from '../utils';

if (isExcelExportAvailable()) {
  // Enable export button
}
```

---

### Date Utilities (dateUtils.ts)

#### `getLocalDateString(date: Date): string`
Converts a Date object to YYYY-MM-DD format.

```typescript
import { getLocalDateString } from '../utils';

const dateStr = getLocalDateString(new Date()); // "2025-11-18"
```

#### `formatDateForDisplay(dateString: string): string`
Formats a date string for display in Chilean format (DD-MM-YYYY).

```typescript
import { formatDateForDisplay } from '../utils';

const displayDate = formatDateForDisplay('2025-11-18'); // "18-11-2025"
```

#### `formatDateWithTime(date: Date): string`
Formats a Date object with both date and time.

```typescript
import { formatDateWithTime } from '../utils';

const dateTime = formatDateWithTime(new Date()); // "18-11-2025 14:30"
```

#### `calculateAge(birthDateString: string): number | string`
Calculates age from a birth date string.

```typescript
import { calculateAge } from '../utils';

const age = calculateAge('1990-05-15'); // 35 (or current age)
```

#### `getCurrentDateString(): string`
Gets the current date in YYYY-MM-DD format.

```typescript
import { getCurrentDateString } from '../utils';

const today = getCurrentDateString(); // "2025-11-18"
```

#### `parseDate(dateString: string): Date | null`
Safely parses a date string and returns a Date object.

```typescript
import { parseDate } from '../utils';

const date = parseDate('2025-11-18'); // Date object or null if invalid
```

---

### Helper Utilities (helpers.ts)

#### RUT Validation

##### `standardizeRUT(rut: string): string`
Standardizes a Chilean RUT to the format 00000000-0.

```typescript
import { standardizeRUT } from '../utils';

const standardized = standardizeRUT('12.345.678-9'); // "12345678-9"
const padded = standardizeRUT('1234567-8');         // "01234567-8"
```

##### `validateRUT(rut: string, dv: string): boolean`
Validates a Chilean RUT using the verification digit algorithm.

```typescript
import { validateRUT } from '../utils';

const isValid = validateRUT('12345678', '5'); // true or false
```

##### `validateCompleteRUT(fullRut: string): boolean`
Validates a complete RUT string (with or without formatting).

```typescript
import { validateCompleteRUT } from '../utils';

const isValid = validateCompleteRUT('12.345.678-5'); // true or false
```

##### `formatRUT(rut: string): string`
Formats a RUT string with dots and hyphen for display.

```typescript
import { formatRUT } from '../utils';

const formatted = formatRUT('123456789'); // "12.345.678-9"
```

#### String Utilities

##### `removeAccents(str: string): string`
Removes accents from a string (useful for search/filtering).

```typescript
import { removeAccents } from '../utils';

const normalized = removeAccents('José María'); // "Jose Maria"
```

##### `capitalizeWords(str: string): string`
Capitalizes the first letter of each word.

```typescript
import { capitalizeWords } from '../utils';

const capitalized = capitalizeWords('juan pérez'); // "Juan Pérez"
```

##### `sanitizeFileName(fileName: string): string`
Sanitizes a filename by removing invalid characters.

```typescript
import { sanitizeFileName } from '../utils';

const safeName = sanitizeFileName('My File: Test/2024'); // "My_File__Test_2024"
```

#### UI Utilities

##### `cn(...inputs: ClassValue[]): string`
Combines class names using clsx and tailwind-merge.

```typescript
import { cn } from '../utils';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  { 'active': isActive }
);
```

---

## Best Practices

1. **Use the barrel export**: Import from `'../utils'` instead of individual files
2. **Type safety**: All utilities are fully typed with TypeScript
3. **Error handling**: Functions include proper error handling and validation
4. **Documentation**: All functions have JSDoc comments with examples
5. **Reusability**: Prefer using these utilities over duplicating code

---

## Migration from Duplicated Code

If you're updating existing code that has duplicated implementations:

1. Remove the local implementation
2. Add the import from utils
3. Verify the function signature matches
4. Test the functionality

Example migration:

```typescript
// BEFORE - Duplicated code
const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString.replace(/-/g, '/'));
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// AFTER - Using shared utility
import { formatDateForDisplay } from '../utils';
```

---

## Contributing

When adding new utilities:

1. Create the function in the appropriate file (excelUtils, dateUtils, or helpers)
2. Add comprehensive JSDoc comments
3. Include usage examples in comments
4. Export the function from index.ts
5. Add tests if applicable
6. Update this README

---

## See Also

- [Code Duplication Analysis](../docs/code-duplication-analysis.md) - Detailed analysis of eliminated duplications
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript best practices
