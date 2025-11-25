import React, { ChangeEvent } from 'react';
import { Patient } from '@/types';

interface WarningEditModalProps {
    onSave: () => void;
    onCancel: () => void;
    formState: Patient;
    onFormChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const WarningEditModal: React.FC<WarningEditModalProps> = ({
    onSave,
    onCancel,
    formState,
    onFormChange
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-base font-semibold mb-4">Agregar/Editar Advertencia</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="alergias" className="block text-sm font-medium text-gray-700">Alergias Conocidas</label>
                        <textarea
                            id="alergias"
                            name="alergias"
                            value={formState.alergias === 'No registra' ? '' : formState.alergias}
                            onChange={onFormChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="Ej: Penicilina, AINES..."
                        />
                    </div>
                    <div>
                        <label htmlFor="ram" className="block text-sm font-medium text-gray-700">Reacciones Adversas a Medicamentos (RAM)</label>
                        <textarea
                            id="ram"
                            name="ram"
                            value={formState.ram === 'No registra' ? '' : formState.ram}
                            onChange={onFormChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="Ej: Sertralina - cefalea, Olanzapina - sedación..."
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300">Cancelar</button>
                    <button onClick={onSave} className="bg-zinc-600 text-white px-4 py-2 rounded-md text-sm hover:bg-zinc-700">Guardar Advertencia</button>
                </div>
            </div>
        </div>
    );
};

export default WarningEditModal;
