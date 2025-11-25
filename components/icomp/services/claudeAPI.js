import { API_CONFIG } from '../constants';

/**
 * Realiza una petición a la API de Claude con timeout
 * @param {string} prompt - Prompt a enviar
 * @returns {Promise<string>} Contenido de la respuesta
 * @throws {Error} Si la petición falla
 */
export const callClaudeAPI = async (prompt) => {
  console.log('📤 Llamando a Claude API...');

  // Timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLAUDE}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const content = data.content?.find((c) => c.type === 'text')?.text || '';

    if (!content) {
      throw new Error('Respuesta vacía de la API');
    }

    console.log('✅ Respuesta recibida:', content.length, 'caracteres');
    return content;

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Tiempo de espera agotado. Por favor, intente nuevamente.');
    }

    if (error.message.includes('fetch')) {
      throw new Error('Error de conexión. Verifique que el servidor esté ejecutándose.');
    }

    throw new Error('Error al comunicarse con la API: ' + error.message);
  }
};

/**
 * Detecta licencias médicas en una ficha clínica
 * @param {string} fichaClinica - Texto de la ficha
 * @param {function} promptGenerator - Función que genera el prompt
 * @returns {Promise<Array>} Array de licencias detectadas
 */
export const detectLicenses = async (fichaClinica, promptGenerator) => {
  const prompt = promptGenerator(fichaClinica);
  const response = await callClaudeAPI(prompt);
  return response;
};

/**
 * Genera un informe médico
 * @param {string} fichaClinica - Texto de la ficha
 * @param {string} selectedLicenseDate - Fecha de la licencia seleccionada
 * @param {function} promptGenerator - Función que genera el prompt
 * @returns {Promise<string>} HTML del informe generado
 */
export const generateReport = async (fichaClinica, selectedLicenseDate, promptGenerator) => {
  const prompt = promptGenerator(fichaClinica, selectedLicenseDate);
  const response = await callClaudeAPI(prompt);
  return response;
};
