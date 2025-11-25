import React, { useState, useEffect } from 'react';
import { Patient, ClinicalNote } from '@/types';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { X, Copy, Check } from 'lucide-react';
import { getCollectionName } from '@/config/tenant.config';

interface PatientTextModalProps {
    patient: Patient;
    onClose: () => void;
}

const PatientTextModal: React.FC<PatientTextModalProps> = ({ patient, onClose }) => {
    const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notesQuery = query(
                    collection(db, getCollectionName('clinicalNotes')),
                    where('pacienteId', '==', patient.firestoreId)
                );
                const snapshot = await getDocs(notesQuery);
                const notes = snapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as ClinicalNote))
                    .sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''));
                console.log('📋 Ficha Completa - Notas cargadas:', notes.length, notes);
                setClinicalNotes(notes);
            } catch (error) {
                console.error('❌ Error fetching notes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [patient.firestoreId]);

    const generateText = () => {
        const lines: string[] = [];

        // Header
        lines.push('═'.repeat(60));
        lines.push(`FICHA CLÍNICA - ${patient.nombre}`);
        lines.push('═'.repeat(60));
        lines.push('');

        // Datos demográficos
        lines.push('▸ DATOS PERSONALES');
        lines.push(`  Nombre: ${patient.nombre}`);
        lines.push(`  RUT: ${patient.rut}`);
        lines.push(`  Edad: ${patient.edad} años`);
        lines.push(`  Sexo: ${patient.sexo}`);
        lines.push(`  Fecha Nacimiento: ${patient.fechaNacimiento || 'No registrada'}`);
        lines.push(`  Dirección: ${patient.direccion || 'No registrada'}`);
        lines.push(`  Comuna: ${patient.comuna || 'No registrada'}`);
        lines.push(`  Teléfonos: ${patient.telefonos?.join(', ') || 'No registrados'}`);
        lines.push(`  Email: ${patient.email || 'No registrado'}`);
        lines.push('');

        // Datos clínicos
        lines.push('▸ INFORMACIÓN CLÍNICA');
        lines.push(`  Dispositivo APS: ${patient.dispositivoAPS || 'No asignado'}`);
        lines.push(`  Centro Atención: ${patient.centroAtencion || 'default'}`);
        lines.push(`  Origen: ${patient.origen || 'No especificado'}`);
        lines.push('');

        // Diagnósticos
        if (patient.diagnostico) {
            lines.push('▸ DIAGNÓSTICOS');
            const sm = patient.diagnostico.saludMental;
            if (sm && Array.isArray(sm) && sm.length) {
                lines.push(`  Salud Mental: ${sm.map(d => typeof d === 'string' ? d : d.nombre || d).join(', ')}`);
            } else if (sm && typeof sm === 'string') {
                lines.push(`  Salud Mental: ${sm}`);
            }
            const mm = patient.diagnostico.morbilidadMedica;
            if (mm && Array.isArray(mm) && mm.length) {
                lines.push(`  Morbilidad Médica: ${mm.map(d => typeof d === 'string' ? d : d.nombre || d).join(', ')}`);
            } else if (mm && typeof mm === 'string') {
                lines.push(`  Morbilidad Médica: ${mm}`);
            }
            const fp = patient.diagnostico.factoresPsicosociales;
            if (fp && Array.isArray(fp) && fp.length) {
                lines.push(`  Factores Psicosociales: ${fp.map(d => typeof d === 'string' ? d : d.nombre || d).join(', ')}`);
            } else if (fp && typeof fp === 'string') {
                lines.push(`  Factores Psicosociales: ${fp}`);
            }
            lines.push('');
        }

        // Fármacos
        if (patient.farmacos?.length) {
            lines.push('▸ FARMACOTERAPIA ACTUAL');
            patient.farmacos.forEach(f => {
                lines.push(`  • ${f.nombre} ${f.dosis || ''} - ${f.frecuencia || ''}`);
            });
            lines.push('');
        }

        // Alergias y RAM
        lines.push('▸ ALERTAS');
        lines.push(`  Alergias: ${patient.alergias || 'Sin alergias conocidas'}`);
        lines.push(`  RAM: ${patient.ram || 'Sin reacciones adversas registradas'}`);
        lines.push('');

        // Administrativo
        lines.push('▸ DATOS ADMINISTRATIVOS');
        lines.push(`  Pensión Discapacidad: ${patient.pensionDiscapacidad ? 'Sí' : 'No'}`);
        lines.push(`  Credencial Discapacidad: ${patient.credencialDiscapacidad ? 'Sí' : 'No'}`);
        lines.push(`  Consumo Activo Drogas: ${patient.consumoActivoDrogas ? 'Sí' : 'No'}`);
        lines.push('');

        // Notas clínicas
        if (clinicalNotes.length > 0) {
            lines.push('═'.repeat(60));
            lines.push('HISTORIAL CLÍNICO');
            lines.push('═'.repeat(60));

            clinicalNotes.forEach((note, index) => {
                lines.push('');
                lines.push(`─── ${note.tipo || 'NOTA'} #${index + 1} (${note.fecha}) ───`);
                if (note.titulo) lines.push(`Título: ${note.titulo}`);
                if (note.profesional) lines.push(`Profesional: ${note.profesional}`);

                // Contenido principal - priorizar contenidoCompleto
                const textoNota = note.contenidoCompleto || note.contenido;
                if (textoNota) {
                    lines.push('');
                    lines.push(textoNota);
                }

                if (note.observacionesClinicamente) {
                    lines.push('');
                    lines.push(`Observaciones: ${note.observacionesClinicamente}`);
                }

                if (note.planTratamiento) {
                    lines.push('');
                    lines.push(`Plan: ${note.planTratamiento}`);
                }

                // Signos vitales si existen
                if (note.signosVitales) {
                    const sv = note.signosVitales;
                    const svText = [];
                    if (sv.presionSistolica && sv.presionDiastolica) svText.push(`PA: ${sv.presionSistolica}/${sv.presionDiastolica}`);
                    if (sv.frecuenciaCardiaca) svText.push(`FC: ${sv.frecuenciaCardiaca}`);
                    if (sv.peso) svText.push(`Peso: ${sv.peso}kg`);
                    if (svText.length) {
                        lines.push('');
                        lines.push(`Signos Vitales: ${svText.join(' | ')}`);
                    }
                }
            });
        }

        lines.push('');
        lines.push('═'.repeat(60));
        lines.push(`Generado: ${new Date().toLocaleString('es-CL')}`);

        return lines.join('\n');
    };

    const handleCopy = async () => {
        const text = generateText();
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[400px] max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Ficha Completa - {patient.nombre}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copiado!' : 'Copiar Todo'}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {loading ? (
                        <div className="text-center py-8 text-gray-500">Cargando...</div>
                    ) : (
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 bg-gray-50 p-4 rounded">
                            {generateText()}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientTextModal;
