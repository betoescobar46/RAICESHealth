import React from 'react';
import { Download, Copy, Trash2, FileSignature } from 'lucide-react';

const ActionPanel = ({ reportContent, selectedLicense, onExportPDF, onCopy, onClear }) => {
  return (
    <div className="flex flex-col gap-3 h-full" style={{ width: '100%' }}>
      {/* Actions Card */}
      <div className="rounded-2xl p-3" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #d6d3d1',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={onExportPDF}
          disabled={!reportContent}
          className="w-full py-2.5 px-3 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: reportContent ? '#dcfce7' : '#e7e5e4',
            color: reportContent ? '#166534' : '#78716c',
            cursor: reportContent ? 'pointer' : 'not-allowed',
            border: '1px solid ' + (reportContent ? '#bbf7d0' : '#d6d3d1')
          }}
          onMouseEnter={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#bbf7d0';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#dcfce7';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <Download size={18} strokeWidth={2} />
          Exportar a PDF
        </button>

        <button
          onClick={onCopy}
          disabled={!reportContent}
          className="w-full py-2.5 px-3 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: reportContent ? '#dbeafe' : '#e7e5e4',
            color: reportContent ? '#1e40af' : '#78716c',
            cursor: reportContent ? 'pointer' : 'not-allowed',
            border: '1px solid ' + (reportContent ? '#bfdbfe' : '#d6d3d1')
          }}
          onMouseEnter={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#bfdbfe';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#dbeafe';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <Copy size={18} strokeWidth={2} />
          Copiar
        </button>

        <button
          onClick={onClear}
          className="w-full py-2.5 px-3 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fecaca'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fecaca';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#fee2e2';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <Trash2 size={18} strokeWidth={2} />
          Limpiar Todo
        </button>

        <a
          href="https://firmaonline.ecertchile.cl/Firma/login"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all no-underline"
          style={{
            backgroundColor: '#f5f5f4',
            color: '#57534e',
            textDecoration: 'none',
            border: '1px solid #d6d3d1'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e7e5e4';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f5f5f4';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <FileSignature size={18} strokeWidth={2} />
          Firma Digital
        </a>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl flex-1" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #d6d3d1',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '0.75rem'
      }}>
        <h3 style={{
          color: '#292524',
          letterSpacing: '-0.01em',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>Información</h3>
        <div style={{
          color: '#78716c',
          fontSize: '0.75rem',
          lineHeight: '1.4'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong style={{
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.75rem',
              color: '#292524',
              fontWeight: '600'
            }}>Fecha actual:</strong>
            {new Date().toLocaleDateString('es-CL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {selectedLicense && (
            <p style={{ marginBottom: 0 }}>
              <strong style={{
                display: 'block',
                marginBottom: '0.25rem',
                fontSize: '0.75rem',
                color: '#292524',
                fontWeight: '600'
              }}>Licencia justificada:</strong>
              <span style={{ display: 'block', marginBottom: '0.25rem' }}>{selectedLicense.diagnostico.toUpperCase()}</span>
              <span style={{ display: 'block', marginBottom: '0.25rem' }}>Desde: {new Date(selectedLicense.fechaEmision).toLocaleDateString('es-CL')}</span>
              {selectedLicense.folio && (
                <span style={{ display: 'block' }}>Folio: {selectedLicense.folio}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
