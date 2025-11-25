# Clinical Notes Validation Script

## Overview

The `validate-final-structure.cjs` script provides comprehensive validation of clinical notes organization in Firestore after the two-phase splitting operations.

## Context

This script validates the results of:

1. **Phase 1** (`split-clinical-notes.cjs`): Split notes with `#` headers
   - Processed 87 notes
   - Created 246 total notes (87 INGRESO + 159 CONTROL)

2. **Phase 2** (`split-controls-no-header.cjs`): Split notes with plain text controls
   - Processed 26 INGRESO notes
   - Created 39 additional CONTROL notes
   - Pattern: "DD month YYYY\ncontrol presencial/telemedicina"

## Usage

### Full Validation

Run complete validation on all clinical notes:

```bash
node scripts/validate-final-structure.cjs
```

This will:
- Count all notes and patients
- Show breakdown by type (INGRESO, CONTROL, etc.)
- Validate structure for all patients
- Check for remaining issues
- Show sample validations (5 patients)
- Exit with code 0 if valid, code 1 if issues found

### Specific Patient Validation

Check a specific patient by RUT or patient ID:

```bash
# By patient ID
node scripts/validate-final-structure.cjs --patient bEyVKA1RXvi7J6uWcRkn

# By RUT (if available in patients collection)
node scripts/validate-final-structure.cjs --patient 12345678-9
```

## What It Validates

### 1. Counts and Reports
- Total clinical notes in Firestore
- Breakdown by tipo (INGRESO, CONTROL, OTRO, etc.)
- Total patients with notes
- Average notes per patient

### 2. Structure Validation
For each patient, validates:
- ✅ Each patient has AT MOST 1 INGRESO note
- ✅ INGRESO has `ordenEnHistorial = 0`
- ✅ CONTROL notes have `ordenEnHistorial > 0`
- ✅ All notes have `titulo` field
- ✅ All notes have `ordenEnHistorial` field
- ✅ All notes have `fecha` field
- ✅ All notes have `tipo` field

### 3. Remaining Issues Check
Detects:
- **Multiple INGRESO**: Patients with more than 1 INGRESO note
- **Embedded Controls**: INGRESO notes still containing embedded controls (text pattern: "DD month YYYY\ncontrol")
- **Wrong Order**: INGRESO notes with `ordenEnHistorial ≠ 0`
- **Wrong Order**: CONTROL notes with `ordenEnHistorial = 0`
- **Missing Fields**: Notes missing critical fields (titulo, ordenEnHistorial, fecha, tipo)

### 4. Sample Validation
Shows details for 5 patients including:
- Patient name
- Total notes
- List of notes with: tipo, titulo, fecha, ordenEnHistorial
- Any problems detected

## Output

The script provides colorful console output with:
- 🟢 Green: Success indicators
- 🔴 Red: Errors and problems
- 🟡 Yellow: Warnings
- 🔵 Blue: Information
- 🟣 Magenta: CONTROL notes
- 🔵 Blue: INGRESO notes

## Exit Codes

- **0**: All validations passed, no issues found
- **1**: Issues detected that require attention

## Example Output

```
═══════════════════════════════════════════════════════════════════════════════
   VALIDACIÓN FINAL DE ESTRUCTURA DE NOTAS CLÍNICAS
═══════════════════════════════════════════════════════════════════════════════

📥 Cargando notas de Firestore...
   Total: 568 notas

═══════════════════════════════════════════════════════════════════════════════
   1. CONTEOS Y REPORTES
═══════════════════════════════════════════════════════════════════════════════

Total de notas clínicas: 568
Total de pacientes: 257
Promedio de notas por paciente: 2.21

Desglose por tipo:
  CONTROL: 287 (50.5%)
  INGRESO: 281 (49.5%)

═══════════════════════════════════════════════════════════════════════════════
   2. VALIDACIÓN DE ESTRUCTURA
═══════════════════════════════════════════════════════════════════════════════

Campo "titulo":
  ✅ Con título: 391/568
  ❌ Sin título: 177

...
```

## Common Issues and Solutions

### Multiple INGRESO Notes

**Problem**: Patient has 2+ INGRESO notes
**Solution**: Manually review and merge or remove duplicate INGRESO notes

### Embedded Controls in INGRESO

**Problem**: INGRESO note still contains control text (not split properly)
**Solution**: Re-run Phase 2 script or manually split the controls

### Missing Titles

**Problem**: Notes created without titulo field
**Solution**: Update notes to add titulo based on tipo and fecha

## Integration with CI/CD

You can use this script in automated tests:

```bash
# In package.json
{
  "scripts": {
    "validate-notes": "node scripts/validate-final-structure.cjs"
  }
}

# In CI/CD pipeline
npm run validate-notes || exit 1
```

## Related Scripts

- `split-clinical-notes.cjs` - Phase 1: Split notes with headers
- `split-controls-no-header.cjs` - Phase 2: Split plain text controls
- `validate-notes-admin.cjs` - Basic validation script
- `backup-clinical-notes.cjs` - Backup before operations
