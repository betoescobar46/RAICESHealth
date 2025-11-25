# Comando: /buscar-cie10

## Descripción
Busca códigos diagnósticos CIE-10 relacionados con términos.

## Agente
medico-assistant

## Sintaxis
```bash
/buscar-cie10 <términos>
```

## Parámetros
- `términos` (requerido): Descripción del síntoma o diagnóstico

## Ejemplos
```bash
/buscar-cie10 depresión mayor
/buscar-cie10 ansiedad generalizada
/buscar-cie10 esquizofrenia
/buscar-cie10 trastorno bipolar
```

## Fuente de Datos
```typescript
// constants.ts
export const CIE10_DIAGNOSES: Record<string, string>
```

## Salida
```
🔍 Resultados para "depresión mayor":

Principales:
1. F32.1 - Episodio depresivo moderado ⭐
2. F32.0 - Episodio depresivo leve
3. F32.2 - Episodio depresivo grave sin síntomas psicóticos
4. F33.1 - Trastorno depresivo recurrente, episodio actual moderado

Relacionados:
- F41.2 - Trastorno mixto ansioso-depresivo
- F31.3 - Trastorno bipolar, episodio depresivo
```

---

*v1.0.0 (2025-01-17)*
