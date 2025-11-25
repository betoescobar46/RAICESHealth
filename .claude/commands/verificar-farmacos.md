# Comando: /verificar-farmacos

## Descripción
Verifica disponibilidad en APS e interacciones de medicamentos.

## Agente
medico-assistant

## Sintaxis
```bash
/verificar-farmacos <lista>
```

## Parámetros
- `lista` (requerido): Medicamentos separados por coma

## Ejemplos
```bash
/verificar-farmacos fluoxetina, clonazepam
/verificar-farmacos sertralina 50mg
/verificar-farmacos risperidona, litio
```

## Fuente de Datos
```typescript
// constants.ts
export const FARMACOS_APS: Farmaco[]

// components/DrugInteractionChecker.tsx
// Integración con Medscape
```

## Salida
```
💊 Verificación:

FLUOXETINA
✅ Disponible en APS
   Presentación: 20mg cápsulas
   Categoría: Antidepresivo ISRS
   Dosis usual: 20-40mg/día

CLONAZEPAM
✅ Disponible en APS
   Presentación: 0.5mg y 2mg
   Categoría: Benzodiacepina
   Dosis usual: 0.5-2mg/día

⚠️ INTERACCIÓN:
   Moderada: Fluoxetina + Clonazepam
   Efecto: Potenciación sedante
   Recomendación: Monitorear

🔗 DrugInteractionChecker para detalles
```

---

*v1.0.0 (2025-01-17)*
