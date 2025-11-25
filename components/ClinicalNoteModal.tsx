import React, { useState, useEffect } from 'react';
import { ClinicalNote } from '../types';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Función para limpiar símbolos ">" al inicio de las líneas
const cleanContentForDisplay = (content: string): string => {
  if (!content) return '';
  return content
    .split('\n')
    .map(line => line.replace(/^>\s*/, ''))
    .join('\n');
};

interface ClinicalNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  nota: ClinicalNote | null;
  onUpdate: (updatedNote: ClinicalNote) => void;
}

const ClinicalNoteModal: React.FC<ClinicalNoteModalProps> = ({ isOpen, onClose, nota, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContenido, setEditContenido] = useState('');
  const [editObservaciones, setEditObservaciones] = useState('');
  const [editPlanTratamiento, setEditPlanTratamiento] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    if (nota) {
      setEditContenido(nota.contenido);
      setEditObservaciones(nota.observacionesClinicamente || '');
      setEditPlanTratamiento(nota.planTratamiento || '');
      setIsEditing(false);
      setShowFullContent(false);
    }
  }, [nota]);

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

  if (!isOpen || !nota) return null;

  const handleGuardarEdicion = async () => {
    try {
      const noteRef = doc(db, 'clinicalNotes', nota.id);
      await updateDoc(noteRef, {
        contenido: editContenido,
        observacionesClinicamente: editObservaciones,
        planTratamiento: editPlanTratamiento,
        updatedAt: Timestamp.now()
      });

      const updatedNote = {
        ...nota,
        contenido: editContenido,
        observacionesClinicamente: editObservaciones,
        planTratamiento: editPlanTratamiento
      };

      onUpdate(updatedNote);
      setIsEditing(false);
      alert('Nota actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar nota:', error);
      alert('Error al actualizar la nota clínica');
    }
  };

  const handleCancelarEdicion = () => {
    setEditContenido(nota.contenido);
    setEditObservaciones(nota.observacionesClinicamente || '');
    setEditPlanTratamiento(nota.planTratamiento || '');
    setIsEditing(false);
  };

  const tipoNota = nota.tipo || 'OTRO';
  const esIngreso = tipoNota === 'INGRESO' || nota.ordenEnHistorial === 0;
  const etiquetaNota = esIngreso ? 'Ingreso' : 'Control';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{etiquetaNota}</h3>
            {nota.fecha && (
              <p className="text-xs text-gray-500 mt-0.5">
                {nota.fecha} {nota.hora && `- ${nota.hora}`} | {nota.profesional}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                title="Editar nota"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition"
              title="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            // Modo edición
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Evaluación Clínica</label>
                <textarea
                  value={editContenido}
                  onChange={(e) => setEditContenido(e.target.value)}
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Observaciones</label>
                  <textarea
                    value={editObservaciones}
                    onChange={(e) => setEditObservaciones(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plan de Tratamiento</label>
                  <textarea
                    value={editPlanTratamiento}
                    onChange={(e) => setEditPlanTratamiento(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                </div>
              </div>
            </div>
          ) : (
            // Modo visualización
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Evaluación Clínica</h5>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {showFullContent && nota.contenidoCompleto ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-content">
                      {cleanContentForDisplay(nota.contenidoCompleto)}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm">{cleanContentForDisplay(nota.contenido)}</p>
                  )}
                </div>

                {nota.contenidoCompleto && (
                  <button
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="mt-3 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-semibold px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                  >
                    {showFullContent ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Contraer
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Expandir contenido completo
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {nota.observacionesClinicamente && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Observaciones</h5>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{cleanContentForDisplay(nota.observacionesClinicamente)}</p>
                  </div>
                )}

                {nota.planTratamiento && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Plan de Tratamiento</h5>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{cleanContentForDisplay(nota.planTratamiento)}</p>
                  </div>
                )}
              </div>

              {nota.adjuntosReferencias && nota.adjuntosReferencias.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Referencias a Archivos</h5>
                  <div className="flex flex-wrap gap-2">
                    {nota.adjuntosReferencias.map((ref, index) => (
                      <span key={index} className="px-3 py-1 text-xs bg-gray-100 rounded-md">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelarEdicion}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarEdicion}
                className="px-4 py-2 text-sm font-semibold text-white bg-zinc-600 rounded-md hover:bg-zinc-700 transition"
              >
                Guardar Cambios
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalNoteModal;
