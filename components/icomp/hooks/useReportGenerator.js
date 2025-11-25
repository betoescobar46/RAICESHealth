import { useState, useCallback } from 'react';
import { detectLicenses, generateReport } from '../services/claudeAPI';
import { createLicenseDetectionPrompt, createReportGenerationPrompt } from '../utils/promptTemplates';
import { extractJson, validateLicensesData } from '../utils/jsonUtils';

/**
 * Hook para manejar la generación de informes médicos
 * @returns {object} Estado y funciones para generar informes
 */
export const useReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [detectedLicenses, setDetectedLicenses] = useState([]);
  const [reportContent, setReportContent] = useState('');
  const [error, setError] = useState('');

  /**
   * Detecta licencias en una ficha clínica
   */
  const handleDetectLicenses = useCallback(async (fichaClinica) => {
    console.log('=== Iniciando detección de licencias ===');
    console.log('Ficha clínica longitud:', fichaClinica.length);

    setIsGenerating(true);
    setError('');

    try {
      const response = await detectLicenses(fichaClinica, createLicenseDetectionPrompt);
      console.log('Respuesta recibida, longitud:', response?.length);

      const licenciasData = extractJson(response);

      if (!licenciasData) {
        throw new Error('No se pudo parsear la respuesta del servidor');
      }

      console.log('Licencias parseadas:', licenciasData);

      if (!validateLicensesData(licenciasData)) {
        throw new Error('No se encontraron licencias médicas en la ficha');
      }

      console.log(`${licenciasData.licencias.length} licencias detectadas`);
      setDetectedLicenses(licenciasData.licencias);

      return {
        success: true,
        licenses: licenciasData.licencias,
        message: `${licenciasData.licencias.length} licencia(s) detectada(s)`
      };

    } catch (err) {
      console.error('❌ Error detectando licencias:', err);
      setError(err.message || 'Error desconocido al detectar licencias');
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Genera un informe para una licencia seleccionada
   */
  const handleGenerateReport = useCallback(async (fichaClinica, selectedLicense) => {
    console.log('=== Generando informe médico ===');
    console.log('Licencia seleccionada:', selectedLicense);

    setIsGenerating(true);
    setError('');

    try {
      const reportHtml = await generateReport(
        fichaClinica,
        selectedLicense.fechaEmision,
        createReportGenerationPrompt
      );

      if (!reportHtml || reportHtml.length < 100) {
        throw new Error('Respuesta inválida o incompleta del servidor');
      }

      console.log('✅ Informe generado exitosamente');
      setReportContent(reportHtml);

      return {
        success: true,
        content: reportHtml,
        message: '✓ Informe generado exitosamente'
      };

    } catch (err) {
      console.error('❌ Error generando informe:', err);
      setError(err.message || 'Error desconocido al generar informe');
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Limpia el error
   */
  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    isGenerating,
    detectedLicenses,
    reportContent,
    error,
    handleDetectLicenses,
    handleGenerateReport,
    setReportContent,
    setDetectedLicenses,
    clearError
  };
};
