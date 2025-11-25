import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar localStorage con sincronización y type safety
 *
 * @param key - Clave en localStorage
 * @param initialValue - Valor inicial si no existe en localStorage
 * @returns [valor almacenado, función setter, función para remover]
 *
 * @example
 * const [user, setUser, removeUser] = useLocalStorage('user', null);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Función para actualizar el valor en localStorage y estado
   */
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función como useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Guardar en estado
      setStoredValue(valueToStore);

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Disparar evento personalizado para sincronización entre pestañas
        window.dispatchEvent(
          new CustomEvent('localStorage-change', {
            detail: { key, newValue: valueToStore }
          })
        );
      }
    } catch (error) {
      console.error(`Error al guardar en localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  /**
   * Función para remover el item de localStorage
   */
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);

        // Disparar evento de cambio
        window.dispatchEvent(
          new CustomEvent('localStorage-change', {
            detail: { key, newValue: null }
          })
        );
      }
    } catch (error) {
      console.error(`Error al remover de localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  /**
   * Escuchar cambios en localStorage (incluye otras pestañas)
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error al parsear valor de localStorage:', error);
        }
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.newValue);
      }
    };

    // Escuchar eventos nativos de storage (otras pestañas)
    window.addEventListener('storage', handleStorageChange);

    // Escuchar eventos personalizados (misma pestaña)
    window.addEventListener(
      'localStorage-change' as any,
      handleCustomStorageChange as EventListener
    );

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'localStorage-change' as any,
        handleCustomStorageChange as EventListener
      );
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook para detectar si hay valores en localStorage
 */
export const useHasLocalStorageData = (keys: string[]): boolean => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setHasData(false);
      return;
    }

    const checkData = () => {
      const hasAnyData = keys.some(key => {
        const item = window.localStorage.getItem(key);
        return item !== null && item !== undefined && item !== '';
      });
      setHasData(hasAnyData);
    };

    checkData();

    // Re-verificar cuando cambia el storage
    window.addEventListener('storage', checkData);
    return () => window.removeEventListener('storage', checkData);
  }, [keys]);

  return hasData;
};