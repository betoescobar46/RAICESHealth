import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ClinicalNote } from '../types';
import { getCollectionName } from '../config/tenant.config';

interface NewClinicalNoteFormProps {
  pacienteId: string;
  profesional: string;
  onNoteAdded: (nota: ClinicalNote) => void;
  onCancel: () => void;
  existingNotesCount: number;
}

// Función para auto-detectar el tipo de nota
const detectNoteType = (content: string, title: string = ''): 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | 'OTRO' => {
  const combined = `${title} ${content}`.toLowerCase();
  if (combined.includes('ingreso') || combined.includes('primera consulta')) return 'INGRESO';
  if (combined.includes('control')) return 'CONTROL';
  if (combined.includes('interconsulta')) return 'INTERCONSULTA';
  return 'OTRO';
};

const NewClinicalNoteForm: React.FC<NewClinicalNoteFormProps> = ({
  pacienteId,
  profesional,
  onNoteAdded,
  onCancel,
  existingNotesCount
}) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [planTratamiento, setPlanTratamiento] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !contenido.trim()) {
      alert('El título y contenido de la nota son obligatorios');
      return;
    }

    setSaving(true);

    try {
      const ahora = new Date();
      const fecha = ahora.toISOString().split('T')[0];
      const hora = ahora.toTimeString().slice(0, 5);

      // Determinar el tipo de nota y orden en el historial
      const tipoNota = detectNoteType(contenido, titulo);

      // Calcular el siguiente ordenEnHistorial
      const siguienteOrden = existingNotesCount;

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

      // Crear objeto para retornar
      const nuevaNota: ClinicalNote = {
        id: docRef.id,
        ...nuevaNotaData,
        timestamp: ahora.toISOString()
      };

      // Notificar al componente padre
      onNoteAdded(nuevaNota);

      // Reset form
      setTitulo('');
      setContenido('');
      setObservaciones('');
      setPlanTratamiento('');

      alert('Nota clínica agregada exitosamente en Firebase');
    } catch (error) {
      console.error('Error al agregar nota clínica:', error);
      alert('Error al guardar la nota clínica en Firebase');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold">Nueva Nota Clínica</h4>

      <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
        <div className="space-y-2.5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Fecha</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-[10px] focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Evolución</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={3}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-[10px] leading-relaxed focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none resize-none"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Plan</label>
            <textarea
              value={planTratamiento}
              onChange={(e) => setPlanTratamiento(e.target.value)}
              rows={2}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-[10px] leading-relaxed focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none resize-none"
              disabled={saving}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition ${
                saving
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition ${
                saving
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
              }`}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewClinicalNoteForm;
