import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

// Components
import ClinicalRecordInput from './components/ClinicalRecordInput';
import ReportEditor from './components/ReportEditor';
import ActionPanel from './components/ActionPanel';
import LicenseSelector from './components/LicenseSelector';
import Alert from './components/Alert';

// Hooks
import { useAutoSave } from './hooks/useAutoSave';
import { useReportGenerator } from './hooks/useReportGenerator';
import { useMessages } from './hooks/useMessages';

// Utils
import { clearAutosave } from './utils/storageUtils';

// Constants
import { PDF_CONFIG, MESSAGE_DURATION } from './constants';

const App = () => {
  // UI State
  const [fichaClinica, setFichaClinica] = useState('');
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [showLicenseSelector, setShowLicenseSelector] = useState(false);

  // Custom Hooks
  const {
    isGenerating,
    detectedLicenses,
    reportContent,
    error: reportError,
    handleDetectLicenses,
    handleGenerateReport,
    setReportContent,
    setDetectedLicenses,
    clearError
  } = useReportGenerator();

  const { error, success, showError, showSuccess, clearMessages } = useMessages();

  // Auto-save hook
  const { dataLoaded, recoveredData } = useAutoSave({
    fichaClinica,
    reportContent,
    selectedLicense,
    detectedLicenses
  });

  // Mostrar mensaje de datos recuperados
  React.useEffect(() => {
    if (recoveredData) {
      // Restaurar datos
      if (recoveredData.fichaClinica) setFichaClinica(recoveredData.fichaClinica);
      if (recoveredData.reportContent) setReportContent(recoveredData.reportContent);
      if (recoveredData.selectedLicense) setSelectedLicense(recoveredData.selectedLicense);
      if (recoveredData.detectedLicenses) setDetectedLicenses(recoveredData.detectedLicenses);

      // Mostrar mensaje
      showSuccess(recoveredData.message, MESSAGE_DURATION.LONG);
    }
  }, [recoveredData]);

  // Sincronizar errores del hook con mensajes
  React.useEffect(() => {
    if (reportError) {
      showError(reportError);
      clearError();
    }
  }, [reportError]);

  /**
   * Handler para generar informe (detectar licencias)
   */
  const handleGenerateClick = async () => {
    if (!fichaClinica.trim()) {
      showError('Por favor, pegue la ficha clínica primero', MESSAGE_DURATION.MEDIUM);
      return;
    }

    clearMessages();
    showSuccess('Detectando licencias médicas...');

    const result = await handleDetectLicenses(fichaClinica);

    if (result.success) {
      setShowLicenseSelector(true);
      showSuccess(result.message, MESSAGE_DURATION.MEDIUM);
    }
    // Los errores se manejan automáticamente por el efecto anterior
  };

  /**
   * Handler para seleccionar una licencia y generar el informe
   */
  const handleLicenseSelect = async (license) => {
    setSelectedLicense(license);
    setShowLicenseSelector(false);

    clearMessages();
    showSuccess('Generando informe médico...');

    const result = await handleGenerateReport(fichaClinica, license);

    if (result.success) {
      showSuccess(result.message, MESSAGE_DURATION.MEDIUM);
    }
    // Los errores se manejan automáticamente
  };

  /**
   * Handler para exportar a PDF
   */
  const handleExportPDF = async () => {
    if (!reportContent) return;

    try {
      showSuccess('Generando PDF...');

      // Create temporary element with content
      const element = document.createElement('div');
      element.innerHTML = reportContent;
      element.style.padding = '40px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.lineHeight = '1.6';
      element.style.color = 'black';

      // PDF configuration
      const opt = {
        margin: PDF_CONFIG.MARGIN,
        filename: `Informe_COMPIN_${selectedLicense?.folio || Date.now()}.pdf`,
        image: { type: 'jpeg', quality: PDF_CONFIG.IMAGE_QUALITY },
        html2canvas: {
          scale: PDF_CONFIG.SCALE,
          useCORS: true,
          logging: false
        },
        jsPDF: {
          unit: 'mm',
          format: PDF_CONFIG.FORMAT,
          orientation: PDF_CONFIG.ORIENTATION
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Generate PDF
      await html2pdf().set(opt).from(element).save();

      showSuccess('PDF generado exitosamente', MESSAGE_DURATION.MEDIUM);
    } catch (err) {
      showError('Error al generar PDF: ' + err.message, MESSAGE_DURATION.MEDIUM);
    }
  };

  /**
   * Handler para copiar al portapapeles
   */
  const handleCopyToClipboard = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = reportContent;
    const text = tempDiv.innerText;
    navigator.clipboard.writeText(text);
    showSuccess('Copiado al portapapeles', MESSAGE_DURATION.SHORT);
  };

  /**
   * Handler para limpiar todo
   */
  const handleClearAll = () => {
    if (confirm('¿Está seguro de que desea limpiar todo el contenido?')) {
      setFichaClinica('');
      setReportContent('');
      setDetectedLicenses([]);
      setSelectedLicense(null);
      clearMessages();
      clearAutosave();
      showSuccess('✓ Datos limpiados', MESSAGE_DURATION.SHORT);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: '#E8E9ED' }}>
      {/* Header */}
      <div className="flex justify-center w-full mb-16">
        <div style={{ maxWidth: '1400px' }}>
          <h1 className="text-2xl font-semibold mb-2" style={{
            color: '#2C3E50',
            letterSpacing: '-0.01em',
            fontWeight: '600'
          }}>
            Generador de Informes COMPIN
          </h1>
          <p className="text-sm" style={{
            color: '#7F8C8D',
            fontWeight: '400'
          }}>
            Sistema profesional para generación automatizada de informes médicos complementarios
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      {/* License Selector Modal */}
      {showLicenseSelector && (
        <LicenseSelector
          licenses={detectedLicenses}
          onSelect={handleLicenseSelect}
          onCancel={() => setShowLicenseSelector(false)}
        />
      )}

      {/* Main Grid */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{
          maxWidth: '1400px',
          gridTemplateColumns: '300px 1fr 300px'
        }}>
          {/* Left Column - Clinical Record */}
          <ClinicalRecordInput
            fichaClinica={fichaClinica}
            onChange={(e) => setFichaClinica(e.target.value)}
            onGenerate={handleGenerateClick}
            isGenerating={isGenerating}
          />

          {/* Center Column - Editor */}
          <ReportEditor content={reportContent} onChange={setReportContent} />

          {/* Right Column - Actions */}
          <ActionPanel
            reportContent={reportContent}
            selectedLicense={selectedLicense}
            onExportPDF={handleExportPDF}
            onCopy={handleCopyToClipboard}
            onClear={handleClearAll}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
