# Comando: /validar-rut

## Descripción
Valida y estandariza un RUT chileno según algoritmo módulo 11.

## Agente
medico-assistant

## Sintaxis
```bash
/validar-rut <rut>
```

## Parámetros
- `rut` (requerido): RUT en cualquier formato

## Ejemplos
```bash
/validar-rut 123456789
/validar-rut 12345678-9
/validar-rut 12.345.678-9
```

## Algoritmo
1. Limpiar input (remover puntos, guiones, espacios)
2. Validar longitud (8-9 caracteres)
3. Extraer número y dígito verificador
4. Calcular DV esperado (Módulo 11)
5. Comparar con DV proporcionado
6. Formatear: 00.000.000-0

## Código de Referencia
```typescript
// utils/helpers.ts
export function validateRUT(rut: string): boolean
export function standardizeRUT(rut: string): string
```

## Salida Exitosa
```
✅ RUT válido
   Original: 123456789
   Estandarizado: 12.345.678-9
   Dígito verificador: ✓ Correcto
```

## Salida Error
```
❌ RUT inválido
   Original: 12345678-0
   Problema: Dígito verificador incorrecto
   Esperado: 9
   Recibido: 0
```

---

*v1.0.0 (2025-01-17)*
