# Comandos Slash Personalizados

Esta carpeta contiene los comandos slash personalizados para SIMORAHealth.

## ¿Qué son los comandos slash?

Los comandos slash son atajos que puedes escribir en Claude Code para ejecutar tareas específicas rápidamente.

## Sintaxis

```bash
/nombre-comando <parámetros>
```

## Comandos Disponibles

### Setup y Configuración
- `/init [modo]` - Inicializar entorno de desarrollo (modos: full, local, repair, seed, status)

### Clínicos (MEDICO-ASSISTANT)
- `/validar-rut <rut>` - Validar y estandarizar RUT chileno
- `/buscar-cie10 <términos>` - Buscar códigos diagnósticos CIE-10
- `/verificar-farmacos <lista>` - Verificar interacciones de medicamentos
- `/completar-ficha <id>` - Revisar completitud de ficha clínica

### Migración de Datos (DATA-MIGRATOR)
- `/migrar-pacientes <archivo>` - Importar pacientes desde archivo
- `/estandarizar-datos <tipo>` - Estandarizar RUTs, fechas, etc.
- `/backup-firestore [colección]` - Crear backup de Firestore

### Estadísticas (STATISTICS-ANALYZER)
- `/generar-reporte <periodo>` - Generar reporte de prestaciones
- `/analizar-asistencia <periodo>` - Analizar tasas de asistencia
- `/indicadores-salud-mental` - Calcular indicadores MINSAL

### Firebase (FIREBASE-ADMIN)
- `/verificar-reglas` - Revisar reglas de seguridad Firestore
- `/crear-indice <colección> <campos>` - Crear índice compuesto
- `/deploy-firebase <ambiente>` - Deploy con verificaciones

### Prestaciones (PRESTACIONES-MANAGER)
- `/configurar-prestaciones <perfil>` - Configurar prestaciones por perfil
- `/validar-prestacion <tipo> <usuario>` - Validar permisos
- `/reporte-productividad <periodo>` - Reporte de productividad

## Ejemplos de Uso

```bash
# Validar un RUT
/validar-rut 12345678-9

# Buscar diagnóstico de depresión
/buscar-cie10 depresión mayor

# Generar reporte mensual
/generar-reporte enero-2025

# Verificar interacciones de medicamentos
/verificar-farmacos fluoxetina, clonazepam

# Crear backup antes de migración
/backup-firestore pacientes
```

## Notas

- Los parámetros entre `<>` son obligatorios
- Los parámetros entre `[]` son opcionales
- Algunos comandos requieren permisos específicos

---

*Última actualización: 2025-01-17*
