import React, { useState, useEffect } from 'react';
import { ClinicalNote } from '../types';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, orderBy, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import ClinicalNoteModal from './ClinicalNoteModal';
import { getCollectionName } from '../config/tenant.config';

// Función para limpiar símbolos ">" al inicio de las líneas
const cleanContentForDisplay = (content: string): string => {
  if (!content) return '';
  return content
    .split('\n')
    .map(line => line.replace(/^>\s*/, ''))
    .join('\n');
};

interface ClinicalNotesSectionProps {
  pacienteId: string;
  pacienteNombre: string;
  profesional: string;
  showNewNoteForm?: boolean;
  onToggleNewNoteForm?: () => void;
  onNoteAdded?: () => void;
  onNotesCountUpdate?: (count: number) => void;
  reloadTrigger?: number;
  onOpenTextModal?: () => void;
}

const ClinicalNotesSection: React.FC<ClinicalNotesSectionProps> = ({
  pacienteId,
  pacienteNombre,
  profesional,
  showNewNoteForm,
  onToggleNewNoteForm,
  onNoteAdded,
  onNotesCountUpdate,
  reloadTrigger,
  onOpenTextModal
}) => {
  const [notas, setNotas] = useState<ClinicalNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [planTratamiento, setPlanTratamiento] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [selectedNoteForModal, setSelectedNoteForModal] = useState<ClinicalNote | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContenido, setEditContenido] = useState('');
  const [editObservaciones, setEditObservaciones] = useState('');
  const [editPlanTratamiento, setEditPlanTratamiento] = useState('');
  const [isNotesListExpanded, setIsNotesListExpanded] = useState(true); // Expandir por defecto

  // Función para auto-detectar el tipo de nota
  const detectNoteType = (content: string, title: string = ''): 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | 'OTRO' => {
    const combined = `${title} ${content}`.toLowerCase();
    if (combined.includes('ingreso') || combined.includes('primera consulta')) return 'INGRESO';
    if (combined.includes('control')) return 'CONTROL';
    if (combined.includes('interconsulta')) return 'INTERCONSULTA';
    return 'OTRO';
  };

  // Función para formatear fecha a formato chileno (DD-MM-YYYY)
  const formatFechaChilena = (fecha: string): string => {
    if (!fecha) return '';

    // Si ya está en formato ISO (YYYY-MM-DD)
    if (fecha.includes('-') && fecha.split('-')[0].length === 4) {
      const [year, month, day] = fecha.split('-');
      return `${day}-${month}-${year}`;
    }

    // Si ya está en otro formato, devolverlo tal cual
    return fecha;
  };

  // Función para obtener el estilo del badge según el tipo
  const getBadgeStyle = (tipo?: string) => {
    switch (tipo) {
      case 'INGRESO':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTROL':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'INTERCONSULTA':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Auto-expand first note if there's only one
  useEffect(() => {
    if (notas.length === 1 && !expandedNoteId) {
      setExpandedNoteId(notas[0].id);
    }
  }, [notas, expandedNoteId]);

  // Load clinical notes from Firebase
  useEffect(() => {
    const loadNotas = async () => {
      setLoading(true);
      try {
        console.log('🔍 Buscando notas clínicas para pacienteId:', pacienteId);
        console.log('   Nombre del paciente:', pacienteNombre);

        // Query clinical notes from Firebase
        // IMPORTANTE: Firebase usa 'pacienteId' (español) según migración
        // NO ordenamos en el query para evitar requerir índice compuesto (ordenaremos en memoria)
        const q = query(
          collection(db, getCollectionName('clinicalNotes')),
          where('pacienteId', '==', pacienteId)
        );

        const querySnapshot = await getDocs(q);
        console.log(`📋 Encontradas ${querySnapshot.docs.length} notas en Firebase`);

        if (querySnapshot.docs.length > 0) {
          console.log('   Primera nota:', {
            id: querySnapshot.docs[0].id,
            pacienteId: querySnapshot.docs[0].data().pacienteId,
            tipo: querySnapshot.docs[0].data().tipo,
            ordenEnHistorial: querySnapshot.docs[0].data().ordenEnHistorial
          });
        }

        const notasFirebase: ClinicalNote[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            pacienteId: data.patientId || data.pacienteId, // Soporte para ambos nombres
            fecha: data.fecha || new Date(data.createdAt?.toDate?.() || Date.now()).toISOString().split('T')[0],
            hora: data.hora || new Date(data.createdAt?.toDate?.() || Date.now()).toTimeString().slice(0, 5),
            profesional: data.profesional || profesional,
            titulo: data.titulo || 'Sin título',
            contenido: data.contenidoCompleto || data.contenido || '',
            contenidoCompleto: data.contenidoCompleto,
            observacionesClinicamente: data.observacionesClinicamente || '',
            planTratamiento: data.planTratamiento || '',
            timestamp: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            tipo: data.tipo,
            ordenEnHistorial: data.ordenEnHistorial || 0
          };
        });

        // Ordenar en memoria por ordenEnHistorial
        const notasOrdenadas = notasFirebase.sort((a, b) =>
          (a.ordenEnHistorial || 0) - (b.ordenEnHistorial || 0)
        );
        setNotas(notasOrdenadas);

        // Notificar al padre sobre el conteo de notas
        if (onNotesCountUpdate) {
          onNotesCountUpdate(notasOrdenadas.length);
        }

        console.log(`✅ ${notasOrdenadas.length} notas cargadas desde Firebase`);
      } catch (error) {
        console.error('❌ Error loading clinical notes from Firebase:', error);
        alert('Error al cargar las notas clínicas desde Firebase');
        setNotas([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotas();
  }, [pacienteId, profesional, reloadTrigger]);

  const handleAgregarNota = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !contenido.trim()) {
      alert('El título y contenido de la nota son obligatorios');
      return;
    }

    try {
      const ahora = new Date();
      const fecha = ahora.toISOString().split('T')[0];
      const hora = ahora.toTimeString().slice(0, 5);

      // Determinar el tipo de nota y orden en el historial
      const tipoNota = detectNoteType(contenido, titulo);

      // Calcular el siguiente ordenEnHistorial
      const ultimoOrden = notas.length > 0
        ? Math.max(...notas.map(n => n.ordenEnHistorial || 0))
        : -1;
      const siguienteOrden = ultimoOrden + 1;

      const nuevaNotaData = {
        pacienteId,
        fecha,
        hora,
        profesional,
        titulo,
        contenido,
        observacionesClinicamente: observaciones,
        planTratamiento,
        tipo: tipoNota,
        ordenEnHistorial: siguienteOrden,
        createdAt: Timestamp.now()
      };

      // Guardar en Firebase
      const docRef = await addDoc(collection(db, getCollectionName('clinicalNotes')), nuevaNotaData);

      // Crear objeto para el estado local
      const nuevaNota: ClinicalNote = {
        id: docRef.id,
        ...nuevaNotaData,
        timestamp: ahora.toISOString()
      };

      // Update local state
      setNotas(prev => [...prev, nuevaNota].sort((a, b) =>
        (a.ordenEnHistorial || 0) - (b.ordenEnHistorial || 0)
      ));

      // Reset form
      setTitulo('');
      setContenido('');
      setObservaciones('');
      setPlanTratamiento('');
      setMostrarFormulario(false);

      alert('Nota clínica agregada exitosamente en Firebase');
    } catch (error) {
      console.error('Error al agregar nota clínica:', error);
      alert('Error al guardar la nota clínica en Firebase');
    }
  };

  const handleEliminarNota = async (notaId: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta nota clínica?')) {
      try {
        // Eliminar de Firebase
        await deleteDoc(doc(db, 'clinicalNotes', notaId));

        // Actualizar estado local
        setNotas(prev => prev.filter(nota => nota.id !== notaId));

        alert('Nota clínica eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar nota clínica:', error);
        alert('Error al eliminar la nota clínica de Firebase');
      }
    }
  };

  const handleOpenModal = (nota: ClinicalNote) => {
    setSelectedNoteForModal(nota);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNoteForModal(null);
  };

  const handleUpdateNote = (updatedNote: ClinicalNote) => {
    setNotas(prev => prev.map(nota =>
      nota.id === updatedNote.id ? updatedNote : nota
    ));
  };

  const handleEditarNota = (nota: ClinicalNote) => {
    setEditingNoteId(nota.id);
    setEditContenido(nota.contenido);
    setEditObservaciones(nota.observacionesClinicamente || '');
    setEditPlanTratamiento(nota.planTratamiento || '');
  };

  const handleGuardarEdicion = async (notaId: string) => {
    try {
      const noteRef = doc(db, 'clinicalNotes', notaId);
      await updateDoc(noteRef, {
        contenido: editContenido,
        observacionesClinicamente: editObservaciones,
        planTratamiento: editPlanTratamiento,
        updatedAt: Timestamp.now()
      });

      setNotas(prev => prev.map(nota =>
        nota.id === notaId
          ? {
              ...nota,
              contenido: editContenido,
              observacionesClinicamente: editObservaciones,
              planTratamiento: editPlanTratamiento
            }
          : nota
      ));

      setEditingNoteId(null);
      setEditContenido('');
      setEditObservaciones('');
      setEditPlanTratamiento('');

      alert('Nota actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar nota:', error);
      alert('Error al actualizar la nota clínica');
    }
  };

  const handleCancelarEdicion = () => {
    setEditingNoteId(null);
    setEditContenido('');
    setEditObservaciones('');
    setEditPlanTratamiento('');
  };

  return (
    <div className="space-y-2">
      <ClinicalNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        nota={selectedNoteForModal}
        onUpdate={handleUpdateNote}
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold">Ficha Clínica - Evolución</h4>
          {onOpenTextModal && (
            <button
              onClick={onOpenTextModal}
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Ver ficha completa en texto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">

      {mostrarFormulario && (
        <form onSubmit={handleAgregarNota} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                style={{ width: '200px' }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Evolución</label>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                rows={4}
                className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Plan de Tratamiento</label>
              <textarea
                value={planTratamiento}
                onChange={(e) => setPlanTratamiento(e.target.value)}
                rows={2}
                className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition text-sm font-semibold"
              >
                Guardar Nota
              </button>
              <button
                type="button"
                onClick={() => {
                  setMostrarFormulario(false);
                  setTitulo('');
                  setContenido('');
                  setObservaciones('');
                  setPlanTratamiento('');
                }}
                className="bg-slate-300 text-gray-700 px-4 py-2 rounded-md hover:bg-slate-400 transition text-sm font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-8 text-center text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="text-sm mt-2">Cargando notas clínicas...</p>
        </div>
      ) : notas.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p className="text-sm">No hay notas clínicas registradas para este paciente.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Botón compacto que siempre se muestra */}
          <button
            onClick={() => setIsNotesListExpanded(!isNotesListExpanded)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium text-gray-700">
              Notas clínicas ({notas.length})
            </span>
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ml-auto ${isNotesListExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Lista expandida al hacer click */}
          <div
            className={`transition-all duration-200 overflow-hidden ${
              isNotesListExpanded ? 'max-h-[600px] opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-1 bg-white border border-slate-200 rounded-md shadow-lg p-1">
              {notas.filter(nota => expandedNoteId === null || nota.id === expandedNoteId).map((nota, index) => {
                const tipoNota = nota.tipo || detectNoteType(nota.contenido, nota.titulo);
                const esIngreso = tipoNota === 'INGRESO' || nota.ordenEnHistorial === 0;

                // Determinar la etiqueta a mostrar
                let etiquetaNota = '';
                if (esIngreso) {
                  etiquetaNota = 'Ingreso';
                } else {
                  etiquetaNota = 'Control';
                }

                return (
                  <div key={nota.id} className="border border-slate-200 rounded-md overflow-hidden hover:shadow-sm transition">
                    <button
                      onClick={() => setExpandedNoteId(expandedNoteId === nota.id ? null : nota.id)}
                      className="w-full px-3 py-1.5 bg-slate-50 hover:bg-slate-100 transition text-left flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-medium text-gray-800">
                          {etiquetaNota}
                        </span>
                        {nota.fecha && (
                          <span className="text-[10px] text-gray-500">
                            {formatFechaChilena(nota.fecha)}
                          </span>
                        )}
                      </div>
                      <svg
                        className={`w-3 h-3 text-gray-400 transition-transform ${expandedNoteId === nota.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedNoteId === nota.id && (
                      <div className="p-2 bg-white border-t border-slate-200 max-h-[534px] overflow-y-auto">
                        <div className="space-y-1.5">
                          {editingNoteId === nota.id ? (
                            // Modo edición
                            <>
                              {/* Botones guardar/cancelar */}
                              <div className="flex gap-2 pb-2 border-b border-slate-100">
                                <button
                                  onClick={() => handleGuardarEdicion(nota.id)}
                                  className="px-3 py-1 text-xs font-semibold text-white bg-zinc-600 hover:bg-zinc-700 rounded transition"
                                >
                                  Guardar
                                </button>
                                <button
                                  onClick={handleCancelarEdicion}
                                  className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition"
                                >
                                  Cancelar
                                </button>
                              </div>

                              {/* Evaluación Clínica - editable */}
                              <div>
                                <textarea
                                  value={editContenido}
                                  onChange={(e) => setEditContenido(e.target.value)}
                                  rows={6}
                                  className="w-full p-2 border border-slate-300 rounded-md text-[10px] leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                  placeholder="Contenido de la evaluación clínica..."
                                />
                              </div>

                              {/* Grid para Observaciones y Plan - editables */}
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 mb-1">Observaciones</label>
                                  <textarea
                                    value={editObservaciones}
                                    onChange={(e) => setEditObservaciones(e.target.value)}
                                    rows={4}
                                    className="w-full p-2 border border-slate-300 rounded-md text-[10px] leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 mb-1">Plan</label>
                                  <textarea
                                    value={editPlanTratamiento}
                                    onChange={(e) => setEditPlanTratamiento(e.target.value)}
                                    rows={4}
                                    className="w-full p-2 border border-slate-300 rounded-md text-[10px] leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            // Modo visualización
                            <>
                              {/* Botones de acción como iconos - movidos arriba */}
                              <div className="flex gap-1 pb-2 border-b border-slate-100">
                                <button
                                  onClick={() => handleEditarNota(nota)}
                                  className="p-1 text-gray-600 hover:bg-gray-50 rounded transition"
                                  title="Editar nota"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleEliminarNota(nota.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                                  title="Eliminar nota"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>

                              {/* Evaluación Clínica */}
                              <div>
                                <p className="text-[10px] leading-relaxed text-gray-600 whitespace-pre-wrap">
                                  {cleanContentForDisplay(nota.contenidoCompleto || nota.contenido)}
                                </p>
                              </div>

                              {/* Grid para Observaciones y Plan */}
                              {(nota.observacionesClinicamente || nota.planTratamiento) && (
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                  {nota.observacionesClinicamente && (
                                    <div>
                                      <h5 className="font-semibold text-gray-700 text-xs mb-0.5">Observaciones</h5>
                                      <p className="text-[10px] leading-relaxed text-gray-600 whitespace-pre-wrap">
                                        {cleanContentForDisplay(nota.observacionesClinicamente)}
                                      </p>
                                    </div>
                                  )}

                                  {nota.planTratamiento && (
                                    <div>
                                      <h5 className="font-semibold text-gray-700 text-xs mb-0.5">Plan</h5>
                                      <p className="text-[10px] leading-relaxed text-gray-600 whitespace-pre-wrap">
                                        {cleanContentForDisplay(nota.planTratamiento)}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ClinicalNotesSection;
