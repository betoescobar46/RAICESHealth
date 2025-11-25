/**
 * Formatea una fecha a formato chileno (es-CL)
 * @param {string|Date} dateStr - Fecha a formatear
 * @param {object} options - Opciones de formato
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateStr, options = {}) => {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.warn('Fecha inválida:', dateStr);
      return dateStr;
    }

    const defaultOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...options
    };

    return date.toLocaleDateString('es-CL', defaultOptions);
  } catch (error) {
    console.error('Error formateando fecha:', dateStr, error);
    return dateStr;
  }
};

/**
 * Calcula los minutos transcurridos desde una fecha
 * @param {string|Date} dateStr - Fecha inicial
 * @returns {number} Minutos transcurridos
 */
export const getMinutesAgo = (dateStr) => {
  try {
    const date = new Date(dateStr);
    return Math.floor((new Date() - date) / 60000);
  } catch (error) {
    console.error('Error calculando minutos:', error);
    return 0;
  }
};

/**
 * Formatea el tiempo transcurrido en formato legible
 * @param {number} minutes - Minutos transcurridos
 * @returns {string} Tiempo formateado (ej: "5 min", "2 hrs")
 */
export const formatTimeAgo = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  return `${hours} hrs`;
};
