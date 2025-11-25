import React from 'react';
import { Download, Copy, Trash2, FileSignature } from 'lucide-react';

const ActionPanel = ({ reportContent, selectedLicense, onExportPDF, onCopy, onClear }) => {
  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', height: '451px', marginTop: '39px' }}>
      {/* Actions Card */}
      <div className="rounded-2xl p-6" style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <button
          onClick={onExportPDF}
          disabled={!reportContent}
          className="w-full py-3 px-4 border-none rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: reportContent ? '#B8D4B8' : '#E0E1E5',
            color: reportContent ? '#2C3E50' : '#95989E',
            cursor: reportContent ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.01em',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#A3C5A3';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(184, 212, 184, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#B8D4B8';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          <Download size={18} strokeWidth={2} />
          Exportar a PDF
        </button>

        <button
          onClick={onCopy}
          disabled={!reportContent}
          className="w-full py-3 px-4 border-none rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: reportContent ? '#A8CCCF' : '#E0E1E5',
            color: reportContent ? '#2C3E50' : '#95989E',
            cursor: reportContent ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.01em',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#95B9BD';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(168, 204, 207, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (reportContent) {
              e.target.style.backgroundColor = '#A8CCCF';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          <Copy size={18} strokeWidth={2} />
          Copiar
        </button>

        <button
          onClick={onClear}
          className="w-full py-3 px-4 border-none rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: '#E5B3B3',
            color: '#2C3E50',
            letterSpacing: '-0.01em',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#D49A9A';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(229, 179, 179, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#E5B3B3';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <Trash2 size={18} strokeWidth={2} />
          Limpiar Todo
        </button>

        <a
          href="https://firmaonline.ecertchile.cl/Firma/login"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 border-none rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all no-underline"
          style={{
            backgroundColor: '#D4D5D9',
            color: '#2C3E50',
            letterSpacing: '-0.01em',
            fontWeight: '500',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#C3C4C9';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(212, 213, 217, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#D4D5D9';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <FileSignature size={18} strokeWidth={2} />
          Firma Digital
        </a>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl" style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: 'none',
        padding: '1.5rem'
      }}>
        <h3 style={{
          color: '#2C3E50',
          letterSpacing: '-0.01em',
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>Información</h3>
        <div style={{
          color: '#7F8C8D',
          fontSize: '0.8125rem',
          lineHeight: '1.65'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.8125rem',
              color: '#2C3E50',
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
                marginBottom: '0.5rem',
                fontSize: '0.8125rem',
                color: '#2C3E50',
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