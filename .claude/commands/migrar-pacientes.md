# Comando: /migrar-pacientes

## Descripción
Importa pacientes desde archivo externo con validaciones.

## Agente
data-migrator

## Sintaxis
```bash
/migrar-pacientes <archivo>
```

## Parámetros
- `archivo` (requerido): Ruta a archivo JSON/CSV/XLSX

## Formatos Soportados
- JSON (nativo Firestore)
- CSV (UTF-8, separador coma)
- XLSX (Excel)

## Ejemplos
```bash
/migrar-pacientes pacientes-nuevos.xlsx
/migrar-pacientes data/enero-2025.json
/migrar-pacientes import.csv
```

## Proceso
1. Análisis de archivo
2. Validación de datos
3. Backup automático
4. Importación en batches
5. Reporte de migración

## Salida
```
📂 Analizando: pacientes-nuevos.xlsx
✅ 100 registros encontrados

🔍 Validando...
   ✅ RUTs: 98 válidos
   ❌ RUTs: 2 inválidos
   ✅ Fechas: 100 válidas
   ✅ Comunas: 97 válidas

💾 Backup: pacientes_2025-01-17.json

¿Importar 97 válidos? [A]Sí [B]Ver errores [C]Cancelar
```

## Archivos
- `scripts/standardize-ruts.ts`
- `utils/extractPatientData.ts`

---

*v1.0.0 (2025-01-17)*
