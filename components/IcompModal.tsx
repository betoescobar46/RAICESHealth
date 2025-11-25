import React, { useEffect, useState } from 'react';
import IcompApp from './icomp/App';
// CSS de ICOMP comentado temporalmente por conflicto con Tailwind
// import './icomp/index.css';

interface IcompModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  patientRut?: string;
}

const IcompModal: React.FC<IcompModalProps> = ({ isOpen, onClose, patientName, patientRut }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !isLoaded) {
      // Lazy load the ICOMP app when modal opens for the first time
      setIsLoaded(true);
    }
  }, [isOpen, isLoaded]);

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-h-[calc(100vh-120px)] bg-white rounded-xl shadow-lg border-2 border-orange-200 flex flex-col" style={{ maxWidth: 'calc(80rem - 20px)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-800">
              Generador de Informes COMPIN
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ICOMP App Container */}
          <div className="flex-1 overflow-hidden bg-stone-50">
            <div className="w-full h-full">
              {isLoaded && (
                <IcompApp
                  embeddedMode={true}
                  patientName={patientName}
                  patientRut={patientRut}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-stone-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-600">
                {patientName && `Paciente: ${patientName}`}
                {patientRut && ` - RUT: ${patientRut}`}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-600 text-white rounded-md hover:bg-stone-500 transition-colors text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcompModal;