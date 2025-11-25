import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Patient, Prestacion, User, PrestacionConfig, Farmaco, ClinicalNote } from '../types';
import ClinicalNotesSection from './ClinicalNotesSection';
import NewClinicalNoteForm from './NewClinicalNoteForm';
import MekidocModal from './MekidocModal';
import GmailModal from './GmailModal';
import IcompModal from './IcompModal';
import DrugInteractionChecker from './DrugInteractionChecker';
import DemographicSection from './PatientFile/sections/DemographicSection';
import HealthConditionsSection from './PatientFile/sections/HealthConditionsSection';
import WarningEditModal from './PatientFile/modals/WarningEditModal';
import PatientTextModal from './PatientFile/modals/PatientTextModal';
import { usePatientForm } from './PatientFile/hooks/usePatientForm';

interface PatientFileViewProps {
    patient: Patient;
    prestaciones: Prestacion[];
    user: User;
    onBack: () => void;
    onAddPrestacion: (prestacion: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp'>) => void;
    onUpdatePatient: (updatedPatient: Patient) => void;
    prestacionConfig: PrestacionConfig;
    allFarmacos: Farmaco[];
}

const WarningIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.636-1.1 2.296-1.1 2.932 0l6.877 11.998c.636 1.1-.164 2.403-1.466 2.403H2.846c-1.3 0-2.102-1.303-1.466-2.403L8.257 3.099zM10 12a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const AddWarningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const ApsCapsule: React.FC = () => (
    <svg width="24" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <linearGradient id="capsuleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#dc2626" />
            </linearGradient>
        </defs>
        <g transform="rotate(-30 50 50)">
            <rect
                x="15" y="35"
                width="70" height="30"
                rx="15" ry="15"
                fill="url(#capsuleGradient)"
                stroke="#4b5563"
                strokeWidth="3"
            />
        </g>
    </svg>
);

const PatientFileView: React.FC<PatientFileViewProps> = ({
    patient,
    prestaciones,
    user,
    onBack,
    onAddPrestacion,
    onUpdatePatient,
    prestacionConfig,
    allFarmacos
}) => {
    const [isMekidocModalOpen, setIsMekidocModalOpen] = useState(false);
    const [isGmailModalOpen, setIsGmailModalOpen] = useState(false);
    const [isIcompModalOpen, setIsIcompModalOpen] = useState(false);
        const [isInteractionCheckerOpen, setIsInteractionCheckerOpen] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [isGeneratingControl, setIsGeneratingControl] = useState(false);
    const [generatedControl, setGeneratedControl] = useState<string | null>(null);
    const [showControlModal, setShowControlModal] = useState(false);
    const [isGeneratingPsychoedu, setIsGeneratingPsychoedu] = useState(false);
    const [generatedPsychoedu, setGeneratedPsychoedu] = useState<string | null>(null);
    const [showPsychoeduModal, setShowPsychoeduModal] = useState(false);
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [translateY, setTranslateY] = useState(0);
    const [showNewNoteForm, setShowNewNoteForm] = useState(false);
    const [notesCount, setNotesCount] = useState(0);
    const [noteAddedTrigger, setNoteAddedTrigger] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);

    const {
        formState,
        setFormState,
        isEditingDemographics,
        setIsEditingDemographics,
        isEditingHealth,
        setIsEditingHealth,
        isEditingWarning,
        setIsEditingWarning,
        handleFormChange,
        resetForm
    } = usePatientForm(patient);

    // Efecto para manejar tecla Escape -> volver
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                // Solo si no hay modales abiertos
                const isAnyHealthEditing = Object.values(isEditingHealth).some(v => v);
                const anyModalOpen = isMekidocModalOpen || isGmailModalOpen || isIcompModalOpen || isInteractionCheckerOpen || isTextModalOpen || showNewNoteForm || isEditingDemographics || isAnyHealthEditing || isEditingWarning;
                if (!anyModalOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    onBack();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown, true); // capture phase
        return () => document.removeEventListener('keydown', handleKeyDown, true);
    }, [onBack, isMekidocModalOpen, isGmailModalOpen, isIcompModalOpen, isInteractionCheckerOpen, isTextModalOpen, showNewNoteForm, isEditingDemographics, isEditingHealth, isEditingWarning]);

    // Efecto para seguir el scroll de manera animada
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollTop = scrollContainer.scrollTop;
            // Los elementos siguen el scroll sin límite
            setTranslateY(scrollTop);
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const hasWarning = patient.alergias !== 'No registra' || patient.ram !== 'No registra';
    const canEditMedical = user.title.includes('Psiquiatra') || user.title.includes('Médico') || user.role === 'admin';
    const canEditWarning = canEditMedical;
    const canEditPsychosocial = true;

    const isApsCompatible = useMemo(() =>
        patient.farmacos &&
        patient.farmacos.length > 0 &&
        patient.farmacos.every(f => {
            const farmacoInfo = allFarmacos.find(master => master.nombre === f.nombre);
            return farmacoInfo?.disponibleAPS;
        }),
        [patient.farmacos, allFarmacos]
    );

    // Demographics handlers
    const handleSaveDemographics = () => {
        onUpdatePatient(formState);
        setIsEditingDemographics(false);
    };

    const handleCancelDemographics = () => {
        resetForm();
        setIsEditingDemographics(false);
    };

    // Health conditions handlers
    const handleSaveHealthCondition = (field: keyof Patient['diagnostico']) => {
        onUpdatePatient(formState);
        setIsEditingHealth(prev => ({ ...prev, [field]: false }));
    };

    const handleCancelHealthCondition = (field: keyof Patient['diagnostico']) => {
        resetForm();
        setIsEditingHealth(prev => ({ ...prev, [field]: false }));
    };

    // Warning handlers
    const handleOpenWarningModal = () => {
        setFormState(patient);
        setIsEditingWarning(true);
    };

    const handleSaveWarning = () => {
        const finalState = { ...formState };
        if (!finalState.alergias.trim()) finalState.alergias = 'No registra';
        if (!finalState.ram.trim()) finalState.ram = 'No registra';

        onUpdatePatient(finalState);
        setIsEditingWarning(false);
    };

    // Clinical notes handlers
    const handleToggleNewNoteForm = () => {
        setShowNewNoteForm(prev => !prev);
    };

    const handleNoteAdded = (nota: ClinicalNote) => {
        setShowNewNoteForm(false);
        setNoteAddedTrigger(prev => prev + 1);
    };

    const handleNotesCountUpdate = (count: number) => {
        setNotesCount(count);
    };

    const handleGenerateControl = async () => {
        setIsGeneratingControl(true);
        setShowControlModal(true);
        setGeneratedControl(null);

        try {
            // Obtener todas las notas clínicas del paciente desde Firestore
            const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
            const { db } = await import('../services/firebase');
            const { getCollectionName } = await import('../config/tenant.config');

            const notesQuery = query(
                collection(db, getCollectionName('clinicalNotes')),
                where('pacienteId', '==', patient.firestoreId),
                orderBy('ordenEnHistorial', 'asc')
            );

            const notesSnapshot = await getDocs(notesQuery);
            const allNotes = notesSnapshot.docs.map(doc => doc.data());

            // Construir contexto completo
            const activeNote = allNotes.map(note =>
                `[${note.tipo} - ${note.fecha}]\n${note.contenido}`
            ).join('\n\n---\n\n');

            const prompt = `según la siguiente información del paciente, genera un control psiquiátrico siguiendo estas instrucciones:

INFORMACIÓN DEL PACIENTE:
${activeNote}

INSTRUCCIONES:
1. Inserta fecha de hoy como encabezado tipo 1, junto a "Control psiquiatría"
2. Inserta subrayados: nombre: ${patient.nombre}, RUT: ${patient.rut}, número de ficha: ${patient.ficha}, psiquiatra tratante: Dr. Escobar
3. Pone en 1 bloque el último esquema farmacológico indicado
4. Analiza la información de todo el documento para insertar:
   - Síntomas a evaluar (no más de 2 líneas por cada uno)
   - Diagnósticos principales psiquiátricos por los que está en atención (solo nombrarlos)
   - Factores psicosociales (parte nombrando oficio y con quien vive, describe contexto de factores psicosociales completo)
5. Inserta de manera ultra sucinta los resultados de últimos exámenes
6. Expone si hay algún examen pendiente (laboratorio, imágenes, psicometría, etc.)
7. Finalmente, inserta subtítulo tipo encabezado tipo 3 con "Indicaciones", seguido por el esquema farmacológico indicado razonado (si la indicación de control anterior fue titular cierto fármaco, pon la dosis que correspondería según cómo ha pasado el tiempo)

Sin líneas horizontales ni saltos de página.
Aplica sangrías y negrita dentro de los subtítulos para mejor visualización.

Responde SOLO con el contenido del control, sin explicaciones adicionales.`;

            const response = await fetch('https://us-central1-simora-health.cloudfunctions.net/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    max_tokens: 4096
                })
            });

            if (!response.ok) {
                throw new Error('Error al generar control');
            }

            const data = await response.json();
            setGeneratedControl(data.response);
        } catch (error) {
            console.error('Error generando control:', error);
            setGeneratedControl('Error al generar el control. Por favor intenta nuevamente.');
        } finally {
            setIsGeneratingControl(false);
        }
    };

    const handleGeneratePsychoedu = async () => {
        setIsGeneratingPsychoedu(true);
        setShowPsychoeduModal(true);
        setGeneratedPsychoedu(null);

        try {
            // Obtener todas las notas clínicas del paciente desde Firestore
            const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
            const { db } = await import('../services/firebase');
            const { getCollectionName } = await import('../config/tenant.config');

            const notesQuery = query(
                collection(db, getCollectionName('clinicalNotes')),
                where('pacienteId', '==', patient.firestoreId),
                orderBy('ordenEnHistorial', 'asc')
            );

            const notesSnapshot = await getDocs(notesQuery);
            const allNotes = notesSnapshot.docs.map(doc => doc.data());

            // Construir contexto del paciente
            const patientContext = `
INFORMACIÓN DEL PACIENTE:
- Nombre: ${patient.nombre}
- RUT: ${patient.rut}
- Edad: ${patient.edad} años
- Diagnósticos principales: ${patient.diagnostico?.saludMental || 'No especificado'}
- Fármacos prescritos: ${patient.farmacos?.map(f => `${f.nombre} ${f.dosis} (${f.frecuencia})`).join(', ') || 'No especificado'}

HISTORIAL CLÍNICO:
${allNotes.map(note => `[${note.tipo} - ${note.fecha}]\n${note.contenido}`).join('\n\n---\n\n')}
`;

            const prompt = `Genera material psicoeducativo detallado para un paciente respecto a sus diagnósticos principales que suscitan su atención psiquiátrica.

Inicia el texto con una introducción que establezca el propósito del material. Dirígete al paciente como 'Estimado/a ${patient.nombre},'.

Incluye una explicación clara y comprensible de cada diagnóstico proporcionado en el contexto, detallando sus características principales y cómo pueden manifestarse en el paciente. Utiliza un estilo explicativo e impersonal.

Si se han prescrito fármacos, detalla para cada uno de los medicamentos proporcionados en el contexto:
[NOMBRE DEL FÁRMACO (Nombre comercial y/o Principio Activo)]
Clase farmacológica
Propósito del tratamiento
Posibles efectos de adaptación (efectos secundarios iniciales)
Tiempo estimado de inicio de efecto terapéutico
(y así sucesivamente para cada fármaco prescrito)

Si se han indicado otras modalidades de tratamiento (ej., psicoterapia, terapia ocupacional, cambios en el estilo de vida, etc.), explica su rol y relevancia en el plan terapéutico, basándote en la información proporcionada en el contexto.

Añade una sección con consideraciones importantes sobre el tratamiento, que incluya: la necesidad de constancia en la toma de medicación, la importancia de la paciencia ante el inicio de los efectos, la advertencia de no suspender los medicamentos abruptamente sin supervisión médica, y la relevancia de la comunicación abierta con el médico tratante ante cualquier duda o efecto adverso.

Finaliza con una sección sobre el proceso de adaptación y recuperación, ofreciendo una perspectiva realista sobre la evolución esperada.

El tono debe ser profesional, claro y empático, dirigido al paciente utilizando un lenguaje formal (Ud.). Asume que yo soy su único tratante y que el cierre debe reflejar profesionalismo, sin utilizar frases como 'estamos juntos en esto' o similares. No utilices viñetas en ninguna parte del texto.

CONTEXTO DEL PACIENTE:
${patientContext}

Responde SOLO con el material psicoeducativo, sin explicaciones adicionales.`;

            const response = await fetch('https://us-central1-simora-health.cloudfunctions.net/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    max_tokens: 4096
                })
            });

            if (!response.ok) {
                throw new Error('Error al generar material psicoeducativo');
            }

            const data = await response.json();
            setGeneratedPsychoedu(data.response);
        } catch (error) {
            console.error('Error generando material psicoeducativo:', error);
            setGeneratedPsychoedu('Error al generar el material psicoeducativo. Por favor intenta nuevamente.');
        } finally {
            setIsGeneratingPsychoedu(false);
        }
    };

    const handleGenerateSummary = async () => {
        setIsGeneratingSummary(true);
        setShowSummaryModal(true);
        setGeneratedSummary(null);

        try {
            // Obtener todas las notas clínicas del paciente desde Firestore
            const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
            const { db } = await import('../services/firebase');
            const { getCollectionName } = await import('../config/tenant.config');

            const notesQuery = query(
                collection(db, getCollectionName('clinicalNotes')),
                where('pacienteId', '==', patient.firestoreId),
                orderBy('ordenEnHistorial', 'asc')
            );

            const notesSnapshot = await getDocs(notesQuery);
            const allNotes = notesSnapshot.docs.map(doc => doc.data());

            const patientContext = `
INFORMACIÓN DEL PACIENTE:
- Nombre: ${patient.nombre}
- Edad: ${patient.edad} años
- Oficio: ${patient.ocupacion || 'No especificado'}
- Con quien vive: ${patient.diagnostico?.factoresPsicosociales || 'No especificado'}

HISTORIAL CLÍNICO:
${allNotes.map(note => `[${note.tipo} - ${note.fecha}]\n${note.contenido}`).join('\n\n---\n\n')}
`;

            const prompt = `Genera un resumen clínico conciso del paciente con la siguiente estructura:

Nombre, edad, oficio, con quien vive, de donde viene derivado, fecha de ingreso a tratamiento con quien suscribe.

Al momento de ingreso (estilo telegráfico, preciso, lacónico):
- Síntomas
- Factores psicosociales
- Diagnósticos
- Indicaciones
- Dosis de fármacos que usa hasta momento de ingreso

Luego cronología de aspectos más relevantes a nivel clínico.

Finaliza con más detalle respecto a último control: fecha, sintomatología predominante, factores asociados, esquema farmacológico completo (siempre precisar si aumentó, disminuyó o mantuvo).

Aplica sangrías y negrita dentro de los subtítulos para mejor visualización.

REQUISITO FUNDAMENTAL: OUTPUT DE MÁXIMO 250 PALABRAS

CONTEXTO DEL PACIENTE:
${patientContext}

Responde SOLO con el resumen, sin explicaciones adicionales.`;

            const response = await fetch('https://us-central1-simora-health.cloudfunctions.net/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                throw new Error('Error al generar resumen');
            }

            const data = await response.json();
            setGeneratedSummary(data.response);
        } catch (error) {
            console.error('Error generando resumen:', error);
            setGeneratedSummary('Error al generar el resumen. Por favor intenta nuevamente.');
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Modals */}
            <DrugInteractionChecker
                isOpen={isInteractionCheckerOpen}
                onClose={() => setIsInteractionCheckerOpen(false)}
            />
            {isEditingWarning && (
                <WarningEditModal
                    onSave={handleSaveWarning}
                    onCancel={() => setIsEditingWarning(false)}
                    formState={formState}
                    onFormChange={handleFormChange as any}
                />
            )}

            <div ref={scrollContainerRef} className="flex-1 overflow-hidden relative">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Volver a la lista de pacientes"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Volver
                    </button>

                    <h2 className="text-xl font-bold text-gray-800">{patient.nombre}</h2>

                    {/* Settings/Tools button with hover menu */}
                    <div className="group relative">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Herramientas"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>

                        {/* Dropdown menu - appears on hover */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="py-1">
                                <button
                                    onClick={() => window.open('https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize%3Fresponse_type%3Dcode%26client_id%3D91f3f86897ff4ae39e50cbd7035fa8af%26redirect_uri%3Dhttps%253A%252F%252Fapi-receta.minsal.cl%252Fauthenticated%252Fclaveunica%26scope%3Dopenid%2520run%2520name', 'prescripcion', 'width=600,height=600,left=200,top=50')}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    Prescripción MINSAL
                                </button>
                                <button
                                    onClick={() => setIsMekidocModalOpen(true)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    Mekidoc
                                </button>
                                <button
                                    onClick={() => setIsInteractionCheckerOpen(true)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    Interacciones
                                </button>
                                <button
                                    onClick={() => setIsIcompModalOpen(true)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    ICOMP
                                </button>
                                <button
                                    onClick={() => setIsGmailModalOpen(true)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    Gmail
                                </button>
                                <button
                                    onClick={handleGenerateControl}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors border-t border-gray-200"
                                >
                                    Generar Control
                                </button>
                                <button
                                    onClick={handleGeneratePsychoedu}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                                >
                                    Material Psicoeducativo
                                </button>
                                <button
                                    onClick={handleGenerateSummary}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                                >
                                    Resumen Conciso (250p)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Three-column layout: Demographics + Health Conditions | Clinical Notes | Action Buttons */}
                <div className="flex gap-4 mb-[150px]">
                    {/* Left column: Patient Demographics and Health Conditions */}
                    <div className="w-[400px] h-[600px] overflow-y-auto border-2 border-slate-300 rounded-lg bg-white p-3">
                        <div
                            ref={leftColumnRef}
                            className="space-y-4 transition-transform duration-700 ease-out"
                            style={{ transform: `translateY(${translateY}px)` }}
                        >
                            <DemographicSection
                                patient={patient}
                                isEditing={isEditingDemographics}
                                formState={formState}
                                onEdit={() => setIsEditingDemographics(true)}
                                onSave={handleSaveDemographics}
                                onCancel={handleCancelDemographics}
                                onFormChange={handleFormChange as any}
                                onUpdatePatient={onUpdatePatient}
                            />

                            <HealthConditionsSection
                                patient={patient}
                                formState={formState}
                                isEditingHealth={isEditingHealth}
                                canEditMedical={canEditMedical}
                                canEditPsychosocial={canEditPsychosocial}
                                onEdit={(field) => setIsEditingHealth(prev => ({ ...prev, [field]: true }))}
                                onSave={handleSaveHealthCondition}
                                onCancel={handleCancelHealthCondition}
                                onFormChange={handleFormChange}
                            />
                        </div>
                    </div>

                    {/* Middle column: Clinical Notes */}
                    <div className="w-[400px] h-[600px] overflow-y-auto border-2 border-slate-300 rounded-lg bg-white p-3">
                        <ClinicalNotesSection
                            pacienteId={patient.firestoreId}
                            pacienteNombre={patient.nombre}
                            profesional={user.name}
                            showNewNoteForm={showNewNoteForm}
                            onToggleNewNoteForm={handleToggleNewNoteForm}
                            onNoteAdded={handleNoteAdded}
                            onNotesCountUpdate={handleNotesCountUpdate}
                            reloadTrigger={noteAddedTrigger}
                            onOpenTextModal={() => setIsTextModalOpen(true)}
                        />
                    </div>

                    {/* Right column: New note form */}
                    <div className="w-[400px] h-[600px] overflow-y-auto border-2 border-slate-300 rounded-lg bg-white p-3">
                        <div className="flex justify-between items-center mb-2">
                            <button
                                onClick={handleToggleNewNoteForm}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition text-xs"
                            >
                                + Nueva Nota
                            </button>
                        </div>
                        {showNewNoteForm && (
                            <NewClinicalNoteForm
                                pacienteId={patient.firestoreId}
                                profesional={user.name}
                                onNoteAdded={handleNoteAdded}
                                onCancel={() => setShowNewNoteForm(false)}
                                existingNotesCount={notesCount}
                            />
                        )}
                    </div>
                </div>

                {/* External Modals */}
                <GmailModal
                    isOpen={isGmailModalOpen}
                    onClose={() => setIsGmailModalOpen(false)}
                />

                <MekidocModal
                    isOpen={isMekidocModalOpen}
                    onClose={() => setIsMekidocModalOpen(false)}
                />

                <IcompModal
                    isOpen={isIcompModalOpen}
                    onClose={() => setIsIcompModalOpen(false)}
                    patientName={patient.nombre}
                    patientRut={patient.rut}
                />

                {/* Modal Ficha Completa en Texto */}
                {isTextModalOpen && (
                    <PatientTextModal
                        patient={patient}
                        onClose={() => setIsTextModalOpen(false)}
                    />
                )}

                {/* Modal Control Generado */}
                {showControlModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowControlModal(false)}>
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                            style={{ cursor: 'move' }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
                                <h3 className="text-lg font-semibold text-gray-800">Control Psiquiatría Generado</h3>
                                <button
                                    onClick={() => setShowControlModal(false)}
                                    className="p-1 hover:bg-orange-200 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                {isGeneratingControl ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                                        <p className="text-gray-600">Generando control con IA...</p>
                                    </div>
                                ) : generatedControl ? (
                                    <div className="prose prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{generatedControl}</pre>
                                    </div>
                                ) : null}
                            </div>

                            {/* Footer */}
                            {!isGeneratingControl && generatedControl && (
                                <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedControl);
                                            alert('Control copiado al portapapeles');
                                        }}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
                                    >
                                        Copiar
                                    </button>
                                    <button
                                        onClick={() => setShowControlModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal Material Psicoeducativo */}
                {showPsychoeduModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowPsychoeduModal(false)}>
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                            style={{ cursor: 'move' }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                                <h3 className="text-lg font-semibold text-gray-800">Material Psicoeducativo Generado</h3>
                                <button
                                    onClick={() => setShowPsychoeduModal(false)}
                                    className="p-1 hover:bg-blue-200 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                {isGeneratingPsychoedu ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                        <p className="text-gray-600">Generando material psicoeducativo con IA...</p>
                                    </div>
                                ) : generatedPsychoedu ? (
                                    <div className="prose prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">{generatedPsychoedu}</pre>
                                    </div>
                                ) : null}
                            </div>

                            {/* Footer */}
                            {!isGeneratingPsychoedu && generatedPsychoedu && (
                                <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedPsychoedu);
                                            alert('Material psicoeducativo copiado al portapapeles');
                                        }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                                    >
                                        Copiar
                                    </button>
                                    <button
                                        onClick={() => setShowPsychoeduModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal Resumen Conciso */}
                {showSummaryModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowSummaryModal(false)}>
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[75vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                            style={{ cursor: 'move' }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
                                <h3 className="text-lg font-semibold text-gray-800">Resumen Clínico Conciso</h3>
                                <button
                                    onClick={() => setShowSummaryModal(false)}
                                    className="p-1 hover:bg-green-200 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                {isGeneratingSummary ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                                        <p className="text-gray-600">Generando resumen conciso con IA...</p>
                                    </div>
                                ) : generatedSummary ? (
                                    <div className="prose prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{generatedSummary}</pre>
                                    </div>
                                ) : null}
                            </div>

                            {/* Footer */}
                            {!isGeneratingSummary && generatedSummary && (
                                <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedSummary);
                                            alert('Resumen copiado al portapapeles');
                                        }}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                                    >
                                        Copiar
                                    </button>
                                    <button
                                        onClick={() => setShowSummaryModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientFileView;
