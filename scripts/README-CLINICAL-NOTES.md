# Clinical Notes Management Scripts

## Overview
This collection of scripts helps organize and fix clinical notes in the SIMORAHealth Firebase database. The scripts address issues where clinical notes were incorrectly structured during migration, with subsections appearing as separate controls and embedded controls not being properly extracted.

## Scripts Description

### 1. `split-clinical-notes.cjs`
**Purpose**: Splits mixed clinical notes that contain multiple visits with markdown headers.

**When to use**:
- When INGRESO notes contain control visits marked with `#` or `##` headers
- When multiple visits are combined in a single database entry

**What it does**:
- Detects control visits by finding headers with dates and keywords (control, seguimiento, evaluación)
- Creates separate CONTROL notes for each detected visit
- Maintains proper chronological ordering

### 2. `split-controls-no-header.cjs`
**Purpose**: Extracts control visits that are written as plain text without markdown headers.

**When to use**:
- After running `split-clinical-notes.cjs`
- When controls are embedded as plain text (e.g., "2 diciembre 2024\ncontrol presencial")

**What it does**:
- Detects date patterns followed by "control" keywords
- Creates new CONTROL notes from detected patterns
- Cleans up the original INGRESO note

### 3. `fix-subsections-as-controls.cjs`
**Purpose**: Merges standard subsections that were incorrectly split as separate CONTROL notes.

**When to use**:
- After running the splitting scripts
- When subsections like "anamnesis remota", "examen mental" appear as separate notes

**What it does**:
- Identifies standard medical subsections
- Merges them back into the INGRESO note
- Fixes patients with multiple INGRESO notes
- Reorders remaining notes correctly

### 4. `check-abigail.cjs` / `check-abigail-full.cjs`
**Purpose**: Debug utilities for examining specific patient data.

**When to use**:
- For debugging specific patient issues
- To verify transformations worked correctly

## Execution Order

Run the scripts in this specific order to ensure proper data transformation:

```bash
# Step 1: Split notes with markdown headers
node scripts/split-clinical-notes.cjs --dry-run
# Review output, then apply if correct:
node scripts/split-clinical-notes.cjs --apply

# Step 2: Extract controls without headers
node scripts/split-controls-no-header.cjs --dry-run
# Review output, then apply if correct:
node scripts/split-controls-no-header.cjs --apply

# Step 3: Fix misclassified subsections
node scripts/fix-subsections-as-controls.cjs --dry-run
# Review output, then apply if correct:
node scripts/fix-subsections-as-controls.cjs --apply

# Optional: Verify specific patient
node scripts/check-abigail.cjs
node scripts/check-abigail-full.cjs
```

## Safety Features

### Dry-Run Mode
All scripts default to dry-run mode, which:
- Analyzes data without making changes
- Shows detailed preview of what would change
- Provides statistics and examples

### Apply Mode
To actually modify the database:
- Must explicitly use `--apply` flag
- Scripts will show progress in real-time
- Creates tracking flags in modified documents

### Tracking Flags
Modified documents receive flags for audit trail:
- `migradoDividido: true` - Split by split-clinical-notes.cjs
- `divididoDeSinHeader: true` - Created by split-controls-no-header.cjs
- `subseccionesReintegradas: true` - Modified by fix-subsections-as-controls.cjs
- `notaOriginalId` - Reference to original note ID

## Standard Subsections

The following are recognized as standard INGRESO subsections (NOT separate visits):

**Clinical History**
- anamnesis remota
- anamnesis próxima
- antecedentes
- antecedentes mórbidos

**Examinations**
- examen mental
- examen físico
- otros exámenes
- exámenes / examenes

**Clinical Management**
- diagnósticos / diagnosticos
- indicaciones
- plan terapéutico
- farmacoterapia
- tratamiento
- medicación / medicacion

**Assessments**
- evaluación / evaluacion
- impresión diagnóstica

## Date Pattern Recognition

The scripts recognize Spanish date formats:
- "22 de octubre de 2025"
- "22 octubre 2025"
- "3 febrero 2025"

Months supported: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre

## Troubleshooting

### Issue: Script fails with permission error
**Solution**: Ensure Firebase Admin SDK is properly initialized with service account credentials

### Issue: Notes not being detected
**Check**:
- Date format matches expected patterns
- Control keywords are present (control, seguimiento, evaluación)
- For subsections, verify they match the standard list

### Issue: Duplicate notes after running scripts
**Solution**: Run `fix-subsections-as-controls.cjs` to merge duplicates

## Database Fields

### Required Fields (all notes)
- `patientId` / `pacienteId`: Patient identifier
- `tipo`: Note type (INGRESO or CONTROL)
- `fecha`: Date in YYYY-MM-DD format
- `ordenEnHistorial`: Order number (0 for INGRESO, >0 for CONTROL)

### Content Fields
- `contenidoCompleto`: Full note content
- `contenido`: First 500 characters (preview)
- `titulo`: Note title (optional but recommended)

### Metadata Fields
- `profesional`: Professional name
- `especialidad`: Medical specialty
- `tags`: Array of tags
- `adjuntosReferencias`: Attachments/references
- `createdAt`: Timestamp
- `numeroFicha`: Medical record number (optional)

## Best Practices

1. **Always run dry-run first**: Review changes before applying
2. **Run scripts in order**: Follow the execution order above
3. **Backup data**: Consider exporting Firestore before major changes
4. **Monitor results**: Check the statistics after each script
5. **Verify specific cases**: Use check scripts for problem patients

## Expected Results

After running all scripts correctly:
- Each patient has exactly 1 INGRESO note
- All follow-up visits are separate CONTROL notes
- Notes are ordered chronologically
- Standard subsections remain in INGRESO
- All notes have proper `ordenEnHistorial` values

## Support

For issues or questions:
- Check individual script comments for detailed logic
- Review dry-run output for specific cases
- Use check scripts to examine problematic patients
- Ensure all dependencies are installed (`firebase-admin`)