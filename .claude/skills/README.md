# Skills - Base de Conocimiento Especializado

Esta carpeta contiene el conocimiento especializado del dominio que los agentes utilizan.

## ¿Qué son los skills?

Los skills son archivos de conocimiento que proporcionan contexto especializado a los agentes sobre:
- Normativas y regulaciones
- Mejores prácticas del dominio
- Patrones específicos del proyecto
- Conocimiento técnico especializado

## Skills Disponibles

### 1. health-domain.md
**Área:** Salud Mental en Chile

**Contenido:**
- Sistema de salud mental en Chile (APS, COSAM)
- Clasificación CIE-10 completa (F00-F99)
- Psicofármacos disponibles en APS Chile
- Tipos de prestaciones de salud mental
- Patologías GES (Garantías Explícitas en Salud)
- Escalas e instrumentos de evaluación

**Usado por:** MEDICO-ASSISTANT, STATISTICS-ANALYZER, PRESTACIONES-MANAGER

### 2. chile-regulations.md
**Área:** Normativas Chilenas de Salud

**Contenido:**
- Ley 20.584 (Derechos del Paciente)
- Ley 21.331 (Salud Mental)
- Normas técnicas MINSAL
- Guías clínicas GES
- Indicadores de calidad MINSAL
- Formatos oficiales (COMPIN, licencias)

**Usado por:** MEDICO-ASSISTANT, STATISTICS-ANALYZER, FIREBASE-ADMIN

### 3. simora-patterns.md
**Área:** Patrones Específicos de SIMORAHealth

**Contenido:**
- Arquitectura del proyecto
- Estructura de datos (Patient, Prestacion, etc.)
- Flujos de trabajo principales
- Convenciones de código
- Integración con servicios (Firebase, Google Calendar)
- Patrones de seguridad y privacidad

**Usado por:** Todos los agentes

## Uso

Los agentes consultan automáticamente estos skills cuando:
- Necesitan validar datos según normativas
- Deben sugerir códigos o clasificaciones
- Requieren entender el contexto del proyecto
- Necesitan seguir patrones establecidos

## Actualización

Estos skills deben actualizarse cuando:
- Cambien normativas o guías clínicas
- Se modifique la canasta de fármacos APS
- Evolucione la arquitectura del proyecto
- Se agreguen nuevas funcionalidades al sistema

---

*Última actualización: 2025-01-17*
