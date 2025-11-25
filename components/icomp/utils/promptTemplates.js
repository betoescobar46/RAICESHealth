import { DOCTOR_INFO, REPORT_SECTIONS } from '../constants';
import { formatDate } from './dateUtils';

/**
 * Genera el prompt para detectar licencias médicas
 * @param {string} fichaClinica - Texto de la ficha clínica
 * @returns {string} Prompt formateado
 */
export const createLicenseDetectionPrompt = (fichaClinica) => {
  return `Analiza esta ficha clínica y extrae TODAS las licencias médicas (LME) mencionadas.

Para cada licencia detectada, extrae:
1. Código diagnóstico (ej: f32.1, f321)
2. Fecha de emisión (ej: "desde 7 agosto 2025", "desde 8 sept")
3. Duración en días
4. Número de folio (si está disponible)
5. Fecha de finalización (si está disponible)

Ficha clínica:
${fichaClinica}

Responde SOLO con un JSON en este formato exacto:
{
  "licencias": [
    {
      "diagnostico": "f32.1",
      "fechaEmision": "2025-08-07",
      "duracionDias": 32,
      "folio": "22445169-5",
      "fechaFin": "2025-09-06"
    }
  ]
}`;
};

/**
 * Genera el prompt para crear el informe médico
 * @param {string} fichaClinica - Texto de la ficha clínica
 * @param {string} selectedLicenseDate - Fecha de la licencia seleccionada
 * @returns {string} Prompt formateado
 */
export const createReportGenerationPrompt = (fichaClinica, selectedLicenseDate) => {
  const today = formatDate(new Date());

  return `Analiza esta ficha clínica y genera un informe médico COMPIN completo.

CRÍTICO: Solo debes considerar información disponible HASTA la fecha: ${selectedLicenseDate}.
Ignora completamente cualquier control, medicamento, evento o dato posterior a esta fecha.

La fecha del informe (en el título) debe ser: ${today}

Ficha clínica:
${fichaClinica}

Genera el informe siguiendo EXACTAMENTE esta estructura con formato HTML:

<div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px;">
  <h2 style="text-align: center; font-weight: bold;">${REPORT_SECTIONS.TITLE}</h2>
  <p>FECHA: ${today}</p>

  <h3>${REPORT_SECTIONS.PATIENT_ID}</h3>
  <p>NOMBRE: [extraer nombre completo]</p>
  <p>RUT: [formato XX.XXX.XXX-X]</p>
  <p>EDAD: [calcular edad]</p>
  <p>OCUPACIÓN: [extraer ocupación]</p>

  <h3>${REPORT_SECTIONS.LICENSES}</h3>
  <p>[Folio de la licencia seleccionada]</p>

  <h3>${REPORT_SECTIONS.CLINICAL_HISTORY}</h3>
  <p>[Desarrollar cronológicamente hasta ${selectedLicenseDate}]</p>

  <h3>${REPORT_SECTIONS.EXAMINATION}</h3>
  <p>Al ingreso ([fecha]): [Examen mental inicial]</p>
  <p>Último control ([fecha del control previo a emisión de licencia]): [Examen mental del último control]</p>

  <h3>${REPORT_SECTIONS.FUNCTIONAL_STATE}</h3>
  <p>[Describir evolución funcional: al ingreso, durante tratamiento, última evaluación. Cubrir AAVD, AIVD, ABVD]</p>

  <h3>${REPORT_SECTIONS.TREATMENT}</h3>
  <p>[Cronología de tratamientos hasta ${selectedLicenseDate}, incluyendo fármacos con dosis exactas]</p>

  <h3>${REPORT_SECTIONS.DIAGNOSIS}</h3>
  <p>Eje I: [Trastornos psiquiátricos DSM-V-TR]</p>
  <p>Eje II: [Personalidad/discapacidad intelectual]</p>
  <p>Eje III: [Condiciones médicas]</p>
  <p>Eje IV: [Factores psicosociales]</p>
  <p>Eje V: EEAG [puntaje estimado]</p>

  <h3>${REPORT_SECTIONS.OTHER_INFO}</h3>
  <p>ES PATOLOGÍA GES: [Sí/No]</p>
  <p>LA LICENCIA ES EMITIDA A TRAVÉS DE GES: [Sí/No]</p>
  <p>SOSPECHA DE ORIGEN LABORAL: [Sí/No]</p>
  <p>RECUPERABILIDAD LABORAL: [Sí/No]</p>
  <p>DEBE INICIAR TRÁMITE DE PENSIÓN DE INVALIDEZ (TPI): [Sí/No]</p>

  <h3>${REPORT_SECTIONS.MANAGEMENT_PLAN}</h3>
  <p>[Plan terapéutico vigente al momento de emisión de licencia]</p>

  <h3>${REPORT_SECTIONS.DISCHARGE_DATE}</h3>
  <p>[Fecha estimada de alta laboral]</p>

  <h3>${REPORT_SECTIONS.INDICATIONS}</h3>
  <p>Reposo médico (licencia): [fechas de la licencia que se justifica]</p>
  <p>Fármacos: [esquema vigente al momento de emisión]</p>
  <p>Otras indicaciones: [psicoterapia, controles, etc.]</p>

  <h3>${REPORT_SECTIONS.DOCTOR_ID}</h3>
  <p>NOMBRE: ${DOCTOR_INFO.NAME}</p>
  <p>RUT: ${DOCTOR_INFO.RUT}</p>
  <p>ESPECIALIDAD: ${DOCTOR_INFO.SPECIALTY}</p>
  <p>CORREO ELECTRÓNICO: ___________________________________</p>
  <p>FIRMA: ___________________________________</p>
</div>

REGLAS CRÍTICAS DE FORMATO:
- USA NEGRITAS (<strong>) SOLO en estos títulos y subtítulos:
  * ${REPORT_SECTIONS.TITLE} (título principal)
  * ${REPORT_SECTIONS.PATIENT_ID}
  * ${REPORT_SECTIONS.LICENSES}
  * ${REPORT_SECTIONS.CLINICAL_HISTORY}
  * ${REPORT_SECTIONS.EXAMINATION}
  * ${REPORT_SECTIONS.FUNCTIONAL_STATE}
  * ${REPORT_SECTIONS.TREATMENT}
  * ${REPORT_SECTIONS.DIAGNOSIS}
  * ${REPORT_SECTIONS.OTHER_INFO}
  * ${REPORT_SECTIONS.MANAGEMENT_PLAN}
  * ${REPORT_SECTIONS.DISCHARGE_DATE}
  * ${REPORT_SECTIONS.INDICATIONS}
  * ${REPORT_SECTIONS.DOCTOR_ID}

- NO uses negritas en: NOMBRE, RUT, EDAD, OCUPACIÓN, FECHA, medicamentos, síntomas, fechas, Eje I-V, nombres de fármacos, dosis, o cualquier otro texto que NO sea los títulos listados arriba
- Redacción telegráfica y profesional
- Si falta información para alguna sección, marca como "[COMPLETAR MANUALMENTE]"`;
};
