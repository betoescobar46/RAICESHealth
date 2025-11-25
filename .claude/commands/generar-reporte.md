# Comando: /generar-reporte

## Descripción
Genera reporte estadístico de prestaciones por período.

## Agente
statistics-analyzer

## Sintaxis
```bash
/generar-reporte <periodo>
```

## Parámetros
- `periodo` (requerido): mes-año | año | rango

## Ejemplos
```bash
/generar-reporte enero-2025
/generar-reporte 2024
/generar-reporte 01-01-2025 31-01-2025
```

## Contenido del Reporte
- Resumen ejecutivo
- Prestaciones por tipo
- Prestaciones por profesional
- Cobertura geográfica
- Indicadores MINSAL
- Tasas de asistencia/NSP

## Salida
```
📊 REPORTE ENERO 2025

=== RESUMEN EJECUTIVO ===
Total prestaciones: 1,247
Asistencia: 82% (1,023)
NSP: 12% (150)
Profesionales: 8

=== POR TIPO ===
1. Consulta Individual: 456 (37%)
2. Control Crónico: 234 (19%)
3. Visita Domiciliaria: 178 (14%)

=== INDICADORES MINSAL ===
✅ Consultas/1000: 45.3 (Meta: >40)
⚠️ Controles/consulta: 1.2 (Meta: >2)

✅ Archivos:
- Reporte_Enero_2025.pdf
- Reporte_Enero_2025.xlsx
```

## Archivos
- `components/StatisticsView.tsx`
- `src/services/firebaseService.ts`

---

*v1.0.0 (2025-01-17)*
