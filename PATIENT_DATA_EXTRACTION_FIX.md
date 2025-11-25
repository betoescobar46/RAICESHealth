# Patient Data Extraction Fix

## Problem

The patient import was loading all 238 patients into the system, but **none of the patient data fields were being populated**. When opening a patient's detail view, fields like RUT, address, phone, email, age, diagnoses, and medications were all empty.

## Root Cause

The import scripts (`import-to-firebase.ts` and `loadPatientsFromJSON.ts`) were:
1. Reading patient data from `pacientes_completos.json`
2. Only extracting the patient name and basic metadata
3. **Setting all other fields to empty values or defaults**
4. Storing the complete narrative data in `contenidoOriginal` but not parsing it

The patient data was stored in the `contenidoCompleto` field as narrative text in a markdown-like format, but the import process wasn't extracting the structured information from this narrative.

## Solution

Created a comprehensive data extraction system:

### 1. Data Extraction Module (`utils/extractPatientData.ts`)

Created specialized extraction functions for each patient data field:

- **`extractRUT()`**: Extracts Chilean RUT numbers (e.g., "9379452-4")
- **`extractEdad()`**: Extracts patient age from various formats
- **`extractFechaNacimiento()`**: Extracts birth date (only years 1900-2002 to avoid appointment dates)
- **`extractSexo()`**: Infers biological sex from context indicators
- **`extractDireccion()`**: Extracts addresses like "17 norte 14 orte 2062 Talca"
- **`extractComuna()`**: Identifies the commune/city
- **`extractTelefonos()`**: Finds phone numbers (Chilean mobile format)
- **`extractEmail()`**: Extracts email addresses
- **`extractOcupacion()`**: Extracts occupation from work-related text
- **`extractDiagnostico()`**: Extracts mental health and medical diagnoses
- **`extractFarmacos()`**: Extracts medications with dosage and frequency
- **`extractAlergias()`**: Extracts allergy information

### 2. Updated Import Scripts

Modified both import scripts to use the extraction functions:

- **`import-to-firebase.ts`**: Updated for Firebase imports (when needed)
- **`loadPatientsFromJSON.ts`**: Updated for the current JSON-based loading

Now when patients are loaded, the system:
1. Reads the narrative content from `contenidoCompleto`
2. Runs it through `extractPatientData()`
3. Populates all structured fields with extracted data
4. Still preserves the original narrative in `contenidoOriginal`

### 3. Example Extraction Results

For patient "Alberto Guerrero Bustamante":

```
✓ RUT: 9379452-4
✓ Age: 60 years
✓ Birth date: 25 enero 1963 → 1963-01-25
✓ Phone: 957861891
✓ Email: Alberto-guerrero@live.com
✓ Address: 17 norte 14 orte 2062 Talca
✓ Comuna: Talca
✓ Occupation: Trabaja en maderas prosperidad
✓ Diagnosis: TAG (Trastorno de Ansiedad Generalizada)
✓ Medications: Aroxat CR 25mg, Sertralina, etc.
```

## Files Modified

1. **Created**:
   - `utils/extractPatientData.ts` - Main extraction module
   - `test-extraction.js` - Test script to verify extraction

2. **Updated**:
   - `loadPatientsFromJSON.ts` - Added data extraction to JSON loading
   - `import-to-firebase.ts` - Added data extraction to Firebase import

## Testing

To verify the fix works:

```bash
# Run the test script
node test-extraction.js

# Start the dev server
npm run dev

# Visit http://localhost:5174
# Open any patient and verify fields are populated
```

## Impact

- **238 patients** now have structured data extracted from their narrative records
- **All patient detail fields** are now populated with real data
- **Original narrative content** is preserved for reference
- **Data quality** depends on the consistency of the narrative format, but covers the majority of cases

## Future Improvements

1. Add more extraction patterns for edge cases
2. Implement validation and data quality checks
3. Add manual correction UI for incorrectly extracted data
4. Consider using AI/NLP for more accurate extraction from unstructured text
5. Add unit tests for extraction functions

## Date

November 14, 2025
