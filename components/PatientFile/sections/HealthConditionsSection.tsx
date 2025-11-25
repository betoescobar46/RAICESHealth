import React, { ChangeEvent } from 'react';
import { Patient } from '@/types';
import DiagnosisSelector from '../../DiagnosisSelector';

interface HealthConditionsSectionProps {
    patient: Patient;
    formState: Patient;
    isEditingHealth: { [key: string]: boolean };
    canEditMedical: boolean;
    canEditPsychosocial: boolean;
    onEdit: (field: keyof Patient['diagnostico']) => void;
    onSave: (field: keyof Patient['diagnostico']) => void;
    onCancel: (field: keyof Patient['diagnostico']) => void;
    onFormChange: (e: ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: string } }) => void;
}

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const healthSectionColors: { [key in keyof Patient['diagnostico']]: string } = {
    saludMental: 'bg-blue-50',
    morbilidadMedica: 'bg-green-50',
    factoresPsicosociales: 'bg-yellow-50',
};

const HealthConditionsSection: React.FC<HealthConditionsSectionProps> = ({
    patient,
    formState,
    isEditingHealth,
    canEditMedical,
    canEditPsychosocial,
    onEdit,
    onSave,
    onCancel,
    onFormChange
}) => {
    const renderHealthSection = (title: string, field: keyof Patient['diagnostico'], canEdit: boolean) => {
        const hasChanged = patient.diagnostico[field] !== formState.diagnostico[field];

        return (
            <div className={`p-2 rounded-lg border border-gray-200 max-w-full ${healthSectionColors[field]}`}>
                <div className="flex justify-between items-center mb-1">
                    <h5 className="text-xs font-semibold text-gray-700">{title}</h5>
                    {canEdit && !isEditingHealth[field] && (
                        <button
                            onClick={() => onEdit(field)}
                            title="Editar"
                            className="text-gray-500 hover:text-zinc-700"
                        >
                            <PencilIcon />
                        </button>
                    )}
                </div>
                {isEditingHealth[field] ? (
                    <div>
                        {field === 'saludMental' || field === 'morbilidadMedica' ? (
                            <div className="relative">
                                <DiagnosisSelector
                                    value={formState.diagnostico[field]}
                                    onChange={(newValue) => onFormChange({
                                        target: { name: `diagnostico.${field}`, value: newValue }
                                    })}
                                />
                            </div>
                        ) : (
                            <textarea
                                name={`diagnostico.${field}`}
                                value={formState.diagnostico[field]}
                                onChange={onFormChange as any}
                                rows={5}
                                className="w-full p-1 border rounded-md text-xs"
                                autoFocus
                                placeholder={field === 'factoresPsicosociales' ? 'Puede ingresar texto libre (ej: estresor laboral) o códigos (ej: Z63.0)' : ''}
                            />
                        )}
                        <div className="flex justify-end gap-2 mt-1">
                            <button
                                onClick={() => onCancel(field)}
                                className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => onSave(field)}
                                disabled={!hasChanged}
                                className={`text-xs bg-zinc-600 text-white px-2 py-1 rounded transition-opacity ${!hasChanged ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-700'}`}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-gray-600 whitespace-pre-line">{patient.diagnostico[field] || 'No registra'}</p>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-2">
            <h4 className="text-base font-semibold">Condiciones de Salud</h4>
            <div className="space-y-2 w-[270px]">
                {renderHealthSection("Condiciones de salud mental", "saludMental", canEditMedical)}
                {renderHealthSection("Morbilidad médica (no psiquiátrica)", "morbilidadMedica", canEditMedical)}
                {renderHealthSection("Factores psicosociales", "factoresPsicosociales", canEditPsychosocial)}
            </div>
        </div>
    );
};

export default HealthConditionsSection;
