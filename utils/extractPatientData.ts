/**
 * Extrae datos estructurados del contenido narrativo de un paciente
 */

export interface ExtractedPatientData {
  rut: string;
  edad: number;
  fechaNacimiento: string;
  sexo: 'Masculino' | 'Femenino' | 'Otro';
  direccion: string;
  comuna: string;
  telefonos: string[];
  email: string;
  ocupacion: string;
  diagnostico: {
    saludMental: string;
    morbilidadMedica: string;
    factoresPsicosociales: string;
  };
  farmacos: Array<{
    nombre: string;
    dosis: string;
    frecuencia: string;
    observaciones: string;
  }>;
  alergias: string;
}

/**
 * Extrae el RUT del contenido y lo estandariza al formato 00000000-0
 */
function extractRUT(content: string): string {
  // Buscar patrones como: 9379452-4, 12.345.678-9, etc.
  const rutPattern = /\b(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])\b/;
  const match = content.match(rutPattern);

  if (!match) return '';

  // Estandarizar el RUT al formato 00000000-0
  const cleaned = match[1].replace(/[.\s-]/g, '').toUpperCase();
  if (cleaned.length === 0) return '';

  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  const paddedBody = body.padStart(8, '0');

  return `${paddedBody}-${dv}`;
}

/**
 * Extrae la edad del contenido
 */
function extractEdad(content: string): number {
  // Buscar patrones como "60 años", "edad: 60", línea que solo tiene un número seguido de fecha
  const patterns = [
    /\b(\d{1,3})\s*años?\b/i,
    /edad:\s*(\d{1,3})/i,
    /(\d{1,3})\s*\n.*\d{1,2}\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const edad = parseInt(match[1]);
      if (edad > 0 && edad < 120) {
        return edad;
      }
    }
  }

  return 0;
}

/**
 * Extrae la fecha de nacimiento del contenido
 */
function extractFechaNacimiento(content: string): string {
  // Buscar patrones como: 25 enero 1963, 1963-01-25, etc.
  const monthNames: { [key: string]: string } = {
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
    'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
    'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
  };

  // Patrón: 25 enero 1963 (buscar solo años que indiquen nacimiento, no años recientes)
  const pattern1 = /(\d{1,2})\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(19\d{2}|200[0-2])/i;
  const match1 = content.match(pattern1);
  if (match1) {
    const day = match1[1].padStart(2, '0');
    const month = monthNames[match1[2].toLowerCase()];
    const year = match1[3];
    return `${year}-${month}-${day}`;
  }

  // Patrón: YYYY-MM-DD o DD-MM-YYYY
  const pattern2 = /\b(\d{4})-(\d{2})-(\d{2})\b/;
  const match2 = content.match(pattern2);
  if (match2) {
    return match2[0];
  }

  return '2000-01-01';
}

/**
 * Extrae el sexo del contenido
 */
function extractSexo(content: string): 'Masculino' | 'Femenino' | 'Otro' {
  const lowerContent = content.toLowerCase();

  // Buscar indicadores de género
  if (lowerContent.includes('sexo: masculino') ||
      lowerContent.includes('sexo m') ||
      lowerContent.includes('género: masculino')) {
    return 'Masculino';
  }

  if (lowerContent.includes('sexo: femenino') ||
      lowerContent.includes('sexo f') ||
      lowerContent.includes('género: femenino')) {
    return 'Femenino';
  }

  // Intentar inferir por contexto (esposo/esposa, hijo/hija, etc.)
  const masculineIndicators = /\b(esposo|padre|hijo|él|señor|don)\b/i;
  const feminineIndicators = /\b(esposa|madre|hija|ella|señora|doña)\b/i;

  const masculineMatches = (content.match(masculineIndicators) || []).length;
  const feminineMatches = (content.match(feminineIndicators) || []).length;

  if (masculineMatches > feminineMatches) return 'Masculino';
  if (feminineMatches > masculineMatches) return 'Femenino';

  return 'Otro';
}

/**
 * Extrae la dirección del contenido
 */
function extractDireccion(content: string): string {
  // Buscar patrones como: "17 norte 14 orte 2062 Talca"
  const patterns = [
    /(\d+\s+(?:norte|sur|oriente|poniente|nte|ote|pte)\s+[^\n\r]{5,50}(?:Talca|Santiago|Valparaíso|Concepción)?)/i,
    /(?:dirección|direccion|vive en):\s*([^\n\r]{10,80})/i,
    /(?:domicilio):\s*([^\n\r]{10,80})/i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return '';
}

/**
 * Extrae la comuna del contenido
 */
function extractComuna(content: string): string {
  const comunas = [
    'Talca', 'Santiago', 'Valparaíso', 'Concepción', 'La Serena',
    'Antofagasta', 'Temuco', 'Rancagua', 'Arica', 'Iquique',
    'Puente Alto', 'Maipú', 'La Florida', 'Las Condes', 'Providencia'
  ];

  for (const comuna of comunas) {
    if (content.includes(comuna)) {
      return comuna;
    }
  }

  return '';
}

/**
 * Extrae teléfonos del contenido
 */
function extractTelefonos(content: string): string[] {
  // Buscar patrones como: 957861891, +56912345678, 9-5786-1891
  const phonePattern = /\b(?:\+?56\s*)?([69]\d{8})\b/g;
  const matches = content.matchAll(phonePattern);
  const phones = new Set<string>();

  for (const match of matches) {
    phones.add(match[1]);
  }

  return Array.from(phones);
}

/**
 * Extrae el email del contenido
 */
function extractEmail(content: string): string {
  const emailPattern = /\b([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)\b/;
  const match = content.match(emailPattern);
  return match ? match[1] : '';
}

/**
 * Extrae la ocupación del contenido
 */
function extractOcupacion(content: string): string {
  const patterns = [
    /(?:trabaja|tbja|trabajo)\s+(?:en|como)?\s*([^\n\r]{5,60})/i,
    /(?:ocupación|ocupacion):\s*([^\n\r]{5,60})/i,
    /(?:profesión|profesion):\s*([^\n\r]{5,60})/i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      // Limpiar el resultado
      let ocupacion = match[1].trim();
      // Quitar puntos finales y comas
      ocupacion = ocupacion.replace(/[,\.]+$/, '');
      // Limitar longitud
      if (ocupacion.length > 100) {
        ocupacion = ocupacion.substring(0, 100);
      }
      return ocupacion;
    }
  }

  return '';
}

/**
 * Extrae diagnósticos del contenido
 */
function extractDiagnostico(content: string): ExtractedPatientData['diagnostico'] {
  const diagnostico = {
    saludMental: '',
    morbilidadMedica: '',
    factoresPsicosociales: ''
  };

  // Buscar sección de diagnósticos (generalmente comienza con I, II, III, IV o DG:)
  const diagSection = content.match(/(?:^|\n)I\s+([^\n]+)/im);
  if (diagSection) {
    diagnostico.saludMental = diagSection[1].trim();
  }

  // Buscar patrones comunes de diagnósticos psiquiátricos
  const mentalHealthPatterns = [
    /\b(TAG|trastorno de ansiedad generalizada)\b/i,
    /\b(depresión|depresion|trastorno depresivo)\b/i,
    /\b(TEPT|trastorno de estrés postraumático)\b/i,
    /\b(TOC|trastorno obsesivo compulsivo)\b/i,
    /\b(trastorno bipolar|TAB)\b/i,
    /\b(esquizofrenia|EQZ)\b/i
  ];

  for (const pattern of mentalHealthPatterns) {
    const match = content.match(pattern);
    if (match && !diagnostico.saludMental) {
      diagnostico.saludMental = match[0];
    }
  }

  // Buscar condiciones médicas
  const medicalPattern = /\b(diabetes|HTA|hipertensión|epilepsia|asma|EPOC|cáncer|cancer)\b/gi;
  const matches = content.matchAll(medicalPattern);
  const conditions = [];
  for (const match of matches) {
    if (!conditions.includes(match[0])) {
      conditions.push(match[0]);
    }
  }
  if (conditions.length > 0) {
    diagnostico.morbilidadMedica = conditions.join(', ');
  }

  return diagnostico;
}

/**
 * Extrae fármacos del contenido
 */
function extractFarmacos(content: string): ExtractedPatientData['farmacos'] {
  const farmacos: ExtractedPatientData['farmacos'] = [];

  // Patrones comunes de medicamentos con dosis
  // Ejemplos: "Aroxat CR 25mg vo: 1 cada noche", "Sertralina 50mg 1 al dia"
  const farmacoPattern = /([A-Z][a-zA-Z]+(?:\s+[A-Z]{2})?)\s+(\d+\s*mg)\s+(?:vo:?)?\s*([^\n\r]{5,80})/gi;
  const matches = content.matchAll(farmacoPattern);

  for (const match of matches) {
    farmacos.push({
      nombre: match[1].trim(),
      dosis: match[2].trim(),
      frecuencia: match[3].trim(),
      observaciones: ''
    });
  }

  return farmacos;
}

/**
 * Extrae alergias del contenido
 */
function extractAlergias(content: string): string {
  const patterns = [
    /(?:Alergias|alergias)[\s:-]+([^\n\r]{1,100})/i,
    /(?:alérgico a|alergico a)[\s:]+([^\n\r]{1,100})/i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const alergias = match[1].trim();
      // Si dice "no", "ninguna", "sin", etc., retornar vacío
      if (/^(no|ninguna?|sin|-)$/i.test(alergias)) {
        return '';
      }
      return alergias;
    }
  }

  return '';
}

/**
 * Función principal de extracción
 */
export function extractPatientData(contenidoCompleto: string): ExtractedPatientData {
  return {
    rut: extractRUT(contenidoCompleto),
    edad: extractEdad(contenidoCompleto),
    fechaNacimiento: extractFechaNacimiento(contenidoCompleto),
    sexo: extractSexo(contenidoCompleto),
    direccion: extractDireccion(contenidoCompleto),
    comuna: extractComuna(contenidoCompleto),
    telefonos: extractTelefonos(contenidoCompleto),
    email: extractEmail(contenidoCompleto),
    ocupacion: extractOcupacion(contenidoCompleto),
    diagnostico: extractDiagnostico(contenidoCompleto),
    farmacos: extractFarmacos(contenidoCompleto),
    alergias: extractAlergias(contenidoCompleto)
  };
}
