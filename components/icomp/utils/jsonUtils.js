/**
 * Limpia bloques de código markdown de una cadena JSON
 * @param {string} response - Respuesta que puede contener markdown
 * @returns {string} JSON limpio
 */
export const cleanMarkdownJson = (response) => {
  if (!response) return '';

  let cleanResponse = response;

  // Remover bloques de código markdown ```json ... ```
  if (cleanResponse.includes('```')) {
    console.log('Detectado bloque de código markdown, limpiando...');
    cleanResponse = cleanResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '');
  }

  return cleanResponse;
};

/**
 * Extrae y parsea JSON de una cadena
 * @param {string} response - Cadena que contiene JSON
 * @returns {object|null} Objeto parseado o null si falla
 */
export const extractJson = (response) => {
  try {
    const cleanResponse = cleanMarkdownJson(response);
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error('No se encontró JSON en la respuesta');
      console.log('Respuesta limpia:', cleanResponse.substring(0, 500));
      return null;
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error extrayendo JSON:', error);
    console.log('Respuesta recibida:', response?.substring(0, 500));
    return null;
  }
};

/**
 * Valida que un objeto tenga la estructura esperada de licencias
 * @param {object} data - Datos a validar
 * @returns {boolean} true si es válido
 */
export const validateLicensesData = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (!Array.isArray(data.licencias)) {
    return false;
  }

  return data.licencias.length > 0;
};
