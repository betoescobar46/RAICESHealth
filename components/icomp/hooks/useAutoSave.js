import { useEffect, useState } from 'react';
import { AUTOSAVE_CONFIG } from '../constants';
import { saveAutosave, loadAutosave } from '../utils/storageUtils';
import { formatTimeAgo } from '../utils/dateUtils';

/**
 * Hook para auto-guardado automático del estado de la aplicación
 * @param {object} appState - Estado a guardar automáticamente
 * @returns {object} { dataLoaded, recoveredData }
 */
export const useAutoSave = (appState) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [recoveredData, setRecoveredData] = useState(null);

  // Recuperar datos guardados al montar el componente
  useEffect(() => {
    console.log('🔄 Intentando recuperar datos guardados...');

    const savedData = loadAutosave();

    if (savedData) {
      const timeAgo = formatTimeAgo(savedData.minutesAgo);
      console.log(`✅ Datos recuperados (guardados hace ${timeAgo})`);
      setRecoveredData({
        ...savedData,
        message: `✓ Datos recuperados (guardados hace ${timeAgo})`
      });
    } else {
      console.log('ℹ️ No hay datos guardados para recuperar');
    }

    setDataLoaded(true);
  }, []);

  // Auto-guardado periódico
  useEffect(() => {
    if (!dataLoaded) {
      return; // No guardar hasta que se hayan cargado los datos iniciales
    }

    const interval = setInterval(() => {
      const saved = saveAutosave(appState);
      if (saved) {
        console.log('💾 Auto-guardado realizado');
      }
    }, AUTOSAVE_CONFIG.INTERVAL);

    return () => clearInterval(interval);
  }, [dataLoaded, appState]);

  // Guardado inmediato cuando cambia el reporte
  useEffect(() => {
    if (!dataLoaded || !appState.reportContent) {
      return;
    }

    const saved = saveAutosave(appState);
    if (saved) {
      console.log('💾 Guardado inmediato del informe');
    }
  }, [dataLoaded, appState.reportContent]);

  return {
    dataLoaded,
    recoveredData
  };
};
