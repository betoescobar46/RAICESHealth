import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const LicenseSelector = ({ licenses, onSelect, onCancel }) => {
  console.log('LicenseSelector render - licenses:', licenses);

  if (!licenses || licenses.length === 0) {
    console.error('LicenseSelector: No hay licencias para mostrar');
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{
      backgroundColor: 'rgba(62, 55, 49, 0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      <div className="p-8 rounded-2xl max-w-2xl w-11/12 max-h-[80vh] overflow-auto" style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 20px 60px rgba(62, 55, 49, 0.25)',
        border: '1px solid #E8E4DD'
      }}>
        <h2 className="text-3xl font-semibold mb-5" style={{
          color: '#3E3731',
          letterSpacing: '-0.03em'
        }}>
          Seleccione la Licencia a Justificar
        </h2>
        <p className="mb-6" style={{
          color: '#6B6560',
          fontSize: '1rem',
          letterSpacing: '-0.01em'
        }}>
          Se detectaron {licenses.length} licencia(s). Seleccione cuál desea justificar:
        </p>

        {licenses.map((lic, idx) => {
          console.log(`Renderizando licencia ${idx}:`, lic);
          return (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                console.log('Licencia seleccionada:', lic);
                onSelect(lic);
              }}
              className="w-full p-5 mb-3 rounded-xl cursor-pointer text-left transition-all duration-200"
              style={{
                border: '2px solid #E4C6A1',
                backgroundColor: '#FFFFFF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAF9F6';
                e.currentTarget.style.borderColor = '#D4B08C';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(228, 198, 161, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E4C6A1';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="font-semibold mb-2 flex items-center gap-2" style={{
                color: '#3E3731',
                letterSpacing: '-0.02em',
                fontSize: '1.1rem'
              }}>
                <Calendar size={20} strokeWidth={1.5} style={{ color: '#E4C6A1' }} />
                {(lic.diagnostico || 'Sin diagnóstico').toUpperCase()} - {formatDate(lic.fechaEmision)}
              </div>
              <div className="text-sm" style={{ color: '#6B6560' }}>
                Duración: {lic.duracionDias || 'N/A'} días
                {lic.folio && ` • Folio: ${lic.folio}`}
              </div>
            </button>
          );
        })}

        <button
          onClick={onCancel}
          className="w-full p-4 mt-4 rounded-xl cursor-pointer transition-all"
          style={{
            border: '1px solid #E8E4DD',
            backgroundColor: '#FFFFFF',
            color: '#6B6560',
            fontWeight: '500',
            letterSpacing: '-0.01em'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#F5F3EE';
            e.target.style.borderColor = '#D1CCC5';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#FFFFFF';
            e.target.style.borderColor = '#E8E4DD';
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default LicenseSelector;
