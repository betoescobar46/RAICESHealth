import React, { ChangeEvent, useState } from 'react';
import { Patient } from '@/types';
import { COMUNAS_MAULE, DISPOSITIVOS_APS } from '../../../constants';
import { CopyButton } from '../../ui/CopyButton';
import { formatDateForDisplay } from '@/utils/dateUtils';

interface DemographicSectionProps {
    patient: Patient;
    isEditing: boolean;
    formState: Patient;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onFormChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onUpdatePatient: (updatedPatient: Patient) => void;
}

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-3.5 w-3.5"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-3.5 w-3.5"} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-3.5 w-3.5"} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

// Componente para campos editables individualmente
interface EditableFieldRowProps {
    label: string;
    displayValue: string;
    copyValue: string;
    fieldName: keyof Patient;
    inputType?: 'text' | 'select';
    options?: string[];
    onSave: (fieldName: keyof Patient, value: any) => void;
}

const EditableFieldRow: React.FC<EditableFieldRowProps> = ({
    label,
    displayValue,
    copyValue,
    fieldName,
    inputType = 'text',
    options = [],
    onSave
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(displayValue);

    const handleEdit = () => {
        setEditValue(displayValue);
        setIsEditing(true);
    };

    const handleSave = () => {
        onSave(fieldName, editValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(displayValue);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-1 hover:bg-zinc-100 pl-0.5 pr-1 py-0 rounded transition-colors">
                <div className="flex-1 flex items-center gap-2">
                    <p className="text-xs flex-shrink-0"><strong>{label}:</strong></p>
                    {inputType === 'select' ? (
                        <select
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 text-xs px-1 py-0.5 border border-gray-300 rounded"
                        >
                            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 text-xs px-1 py-0.5 border border-gray-300 rounded"
                            autoFocus
                        />
                    )}
                </div>
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={handleSave}
                        className="p-0.5 rounded hover:bg-green-200 text-green-700"
                        title="Guardar"
                    >
                        <CheckIcon />
                    </button>
                    <button
                        onClick={handleCancel}
                        className="p-0.5 rounded hover:bg-red-200 text-red-700"
                        title="Cancelar"
                    >
                        <XIcon />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-1 hover:bg-zinc-100 pl-0.5 pr-1 py-0 rounded transition-colors">
            <CopyButton value={copyValue} label={label} className="flex-1 !px-0">
                <p className="text-xs"><strong>{label}:</strong> {displayValue}</p>
            </CopyButton>
            <button
                onClick={handleEdit}
                className="opacity-0 group-hover:opacity-100 transition-all p-0.5 rounded hover:bg-zinc-200 text-gray-500 flex-shrink-0"
                title={`Editar ${label}`}
            >
                <PencilIcon />
            </button>
        </div>
    );
};

const EditableTextField: React.FC<{
    label: string;
    value: string;
    name: keyof Patient;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, name, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
    </div>
);

const EditableSelectField: React.FC<{
    label: string;
    value: string;
    name: keyof Patient;
    options: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, value, name, options, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const DemographicSection: React.FC<DemographicSectionProps> = ({
    patient,
    isEditing,
    formState,
    onEdit,
    onSave,
    onCancel,
    onFormChange,
    onUpdatePatient
}) => {
    const handleTelefonosChange = (e: ChangeEvent<HTMLInputElement>) => {
        const telefonos = e.target.value.split(',').map(t => t.trim());
        onFormChange({
            target: { name: 'telefonos', value: telefonos }
        } as any);
    };

    const handleFieldSave = (fieldName: keyof Patient, value: any) => {
        // Actualizar directamente el paciente con el nuevo valor
        const updatedPatient = {
            ...patient,
            [fieldName]: fieldName === 'telefonos' ? value.split(',').map((t: string) => t.trim()) : value
        };

        onUpdatePatient(updatedPatient);
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h4 className="text-base font-semibold">Datos del Paciente</h4>
            </div>
            {isEditing ? (
                <div className="p-4 bg-sky-50 rounded-lg border border-gray-200 space-y-3">
                    <EditableTextField label="Nombre" name="nombre" value={formState.nombre} onChange={onFormChange} />
                    <EditableTextField label="RUT" name="rut" value={formState.rut} onChange={onFormChange} />
                    <EditableTextField label="Fecha de Nacimiento" name="fechaNacimiento" value={formState.fechaNacimiento} onChange={onFormChange} />
                    <EditableSelectField label="Sexo" name="sexo" value={formState.sexo} options={['Masculino', 'Femenino', 'Otro']} onChange={onFormChange} />
                    <EditableTextField label="Dirección" name="direccion" value={formState.direccion} onChange={onFormChange} />
                    <EditableSelectField label="Comuna" name="comuna" value={formState.comuna} options={COMUNAS_MAULE} onChange={onFormChange} />
                    <EditableTextField label="Teléfono(s)" name="telefonos" value={formState.telefonos.join(', ')} onChange={handleTelefonosChange} />
                    <EditableTextField label="Correo Electrónico" name="email" value={formState.email} onChange={onFormChange} />
                    <EditableTextField label="Ocupación" name="ocupacion" value={formState.ocupacion} onChange={onFormChange} />
                    <div className="flex justify-end gap-2">
                        <button onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md text-sm">Cancelar</button>
                        <button onClick={onSave} className="bg-zinc-600 text-white font-bold py-2 px-4 rounded-md text-sm">Guardar Cambios</button>
                    </div>
                </div>
            ) : (
                <div className="py-0.5 bg-zinc-50 rounded-lg border border-gray-200 space-y-0 text-xs w-[270px]">
                    <EditableFieldRow
                        label="Nombre"
                        displayValue={patient.nombre}
                        copyValue={patient.nombre}
                        fieldName="nombre"
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="RUT"
                        displayValue={patient.rut}
                        copyValue={patient.rut}
                        fieldName="rut"
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Edad"
                        displayValue={`${patient.edad} años (${formatDateForDisplay(patient.fechaNacimiento)})`}
                        copyValue={`${patient.edad} años (${formatDateForDisplay(patient.fechaNacimiento)})`}
                        fieldName="fechaNacimiento"
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Sexo"
                        displayValue={patient.sexo}
                        copyValue={patient.sexo}
                        fieldName="sexo"
                        inputType="select"
                        options={['Masculino', 'Femenino', 'Otro']}
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Dirección"
                        displayValue={patient.direccion}
                        copyValue={patient.direccion}
                        fieldName="direccion"
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Comuna"
                        displayValue={patient.comuna}
                        copyValue={patient.comuna}
                        fieldName="comuna"
                        inputType="select"
                        options={COMUNAS_MAULE}
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Teléfono(s)"
                        displayValue={patient.telefonos.join(', ')}
                        copyValue={patient.telefonos.join(', ')}
                        fieldName="telefonos"
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Email"
                        displayValue={patient.email}
                        copyValue={patient.email}
                        fieldName="email"
                        onSave={handleFieldSave}
                    />
                    <EditableFieldRow
                        label="Ocupación"
                        displayValue={patient.ocupacion}
                        copyValue={patient.ocupacion}
                        fieldName="ocupacion"
                        onSave={handleFieldSave}
                    />
                </div>
            )}
        </div>
    );
};

export default DemographicSection;
