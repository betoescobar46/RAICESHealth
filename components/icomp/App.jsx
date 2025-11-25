import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Calendar, Loader2 } from 'lucide-react';

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

const App = ({ embeddedMode = false, patientName, patientRut }) => {
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
    <div
      className={`${embeddedMode ? 'h-full' : 'min-h-screen'} p-4 flex flex-col`}
      style={{ background: embeddedMode ? 'transparent' : '#f5f5f4' }}
    >
      {/* Header - solo mostrar si no está embebido */}
      {!embeddedMode && (
        <div className="flex justify-center w-full mb-4">
          <div style={{ maxWidth: '1400px' }}>
            <h1 className="text-xl font-semibold mb-1" style={{
              color: '#292524',
              letterSpacing: '-0.01em',
              fontWeight: '600'
            }}>
              Generador de Informes COMPIN
            </h1>
          </div>
        </div>
      )}

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
      <div className={`flex justify-center w-full ${embeddedMode ? 'flex-1 overflow-hidden' : ''}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 ${embeddedMode ? 'h-full' : ''}`} style={{
          maxWidth: embeddedMode ? '100%' : '1400px',
          width: '100%',
          gridTemplateColumns: embeddedMode ? '1fr 1.5fr 280px' : '320px 1fr 280px'
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

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            handleGenerateClick();
          } catch (error) {
            console.error('Error en onClick:', error);
          }
        }}
        disabled={isGenerating || !fichaClinica.trim()}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: isGenerating || !fichaClinica.trim() ? '#d6d3d1' : 'linear-gradient(135deg, #c2703a 0%, #d97b3a 100%)',
          borderRadius: '12px',
          color: isGenerating || !fichaClinica.trim() ? '#78716c' : '#ffffff',
          fontSize: '14px',
          fontWeight: '600',
          gap: '8px',
          justifyContent: 'center',
          border: 'none',
          margin: '12px auto',
          padding: '12px 24px',
          cursor: isGenerating || !fichaClinica.trim() ? 'not-allowed' : 'pointer',
          maxWidth: '280px',
          transition: 'all 0.2s',
          boxShadow: isGenerating || !fichaClinica.trim() ? 'none' : '0 4px 12px rgba(194, 112, 58, 0.3)'
        }}
        onMouseEnter={(e) => {
          if (!isGenerating && fichaClinica.trim()) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(194, 112, 58, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isGenerating && fichaClinica.trim()) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(194, 112, 58, 0.3)';
          }
        }}
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Generando...
          </>
        ) : (
          <>
            <Calendar size={20} strokeWidth={2} />
            Generar Informe
          </>
        )}
      </button>
    </div>
  );
};

export default App;
