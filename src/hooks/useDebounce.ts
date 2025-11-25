import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * Útil para evitar llamadas excesivas a APIs o búsquedas
 *
 * @param value - Valor a hacer debounce
 * @param delay - Retraso en milisegundos (por defecto 300ms)
 * @returns Valor con debounce aplicado
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // Solo se ejecuta después de 500ms sin cambios
 *   searchAPI(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer si el valor cambia antes del delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};