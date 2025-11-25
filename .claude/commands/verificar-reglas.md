# Comando: /verificar-reglas

## Descripción
Revisa reglas de seguridad de Firestore y detecta vulnerabilidades.

## Agente
firebase-admin

## Sintaxis
```bash
/verificar-reglas
```

## Sin Parámetros

## Validaciones
- Autenticación requerida
- Permisos por rol
- Acceso a datos sensibles
- Reglas de escritura
- Reglas de lectura

## Salida
```
🔍 Verificando reglas de Firestore...

✅ pacientes
   - read: Requiere autenticación ✓
   - write: Restringido a admin/profesional ✓

✅ usuarios
   - read: Solo datos propios ✓
   - write: Solo admin ✓

⚠️ prestaciones
   - read: OK
   - write: Muy permisivo
   → Permitir a cualquier autenticado

🔴 VULNERABILIDADES DETECTADAS: 1

Recomendaciones:
1. Restringir write en prestaciones por rol
2. Agregar validación de datos
3. Limitar queries por usuario

Archivo: firestore.rules (línea 45)
```

## Archivos
- `firestore.rules`
- `firestore.rules.prod`

---

*v1.0.0 (2025-01-17)*
