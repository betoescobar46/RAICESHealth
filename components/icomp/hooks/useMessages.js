import { useState, useCallback } from 'react';
import { MESSAGE_DURATION } from '../constants';

/**
 * Hook para manejar mensajes de éxito y error con auto-ocultamiento
 * @returns {object} Estado y funciones para mostrar mensajes
 */
export const useMessages = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Muestra un mensaje de error
   * @param {string} message - Mensaje a mostrar
   * @param {number} duration - Duración en ms (opcional)
   */
  const showError = useCallback((message, duration = MESSAGE_DURATION.LONG) => {
    setError(message);
    if (duration > 0) {
      setTimeout(() => setError(''), duration);
    }
  }, []);

  /**
   * Muestra un mensaje de éxito
   * @param {string} message - Mensaje a mostrar
   * @param {number} duration - Duración en ms (opcional)
   */
  const showSuccess = useCallback((message, duration = MESSAGE_DURATION.MEDIUM) => {
    setSuccess(message);
    if (duration > 0) {
      setTimeout(() => setSuccess(''), duration);
    }
  }, []);

  /**
   * Limpia todos los mensajes
   */
  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  return {
    error,
    success,
    showError,
    showSuccess,
    clearMessages
  };
};
