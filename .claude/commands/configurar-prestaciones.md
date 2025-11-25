# Comando: /configurar-prestaciones

## Descripción
Configura prestaciones permitidas por perfil profesional.

## Agente
prestaciones-manager

## Sintaxis
```bash
/configurar-prestaciones <perfil>
```

## Parámetros
- `perfil` (requerido): psiquiatra | psicologo | trabajador-social | enfermero

## Ejemplos
```bash
/configurar-prestaciones psicologo
/configurar-prestaciones psiquiatra
/configurar-prestaciones trabajador-social
```

## Salida
```
⚙️ Configurando: PSICÓLOGO

✅ HABILITADAS (23 tipos):

Evaluación:
- Consulta Individual Psicológica
- Evaluación Psicológica
- Test Psicométricos

Intervención:
- Psicoterapia Individual
- Psicoterapia Grupal
- Intervención en Crisis

Prevención:
- Talleres Preventivos
- Educación Familiar

❌ NO PERMITIDAS:
- Consulta Psiquiátrica (requiere médico)
- Prescripción Fármacos (requiere médico)
- Indicación Exámenes (requiere médico)

💾 Configuración guardada
```

## Archivos
- `constants.ts` - DEFAULT_PRESTACION_PERFIL_MAP
- `components/IngresarPrestacionView.tsx`

---

*v1.0.0 (2025-01-17)*
