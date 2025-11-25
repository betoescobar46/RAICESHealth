import React, { useState, useMemo } from 'react';
import { User, Patient } from '@/types';
import { X, Search, Users } from 'lucide-react';

interface AssignPatientsModalProps {
    user: User;
    patients: Patient[];
    onClose: () => void;
    onSave: (user: User, allowedPatients: string[]) => void;
}

export const AssignPatientsModal: React.FC<AssignPatientsModalProps> = ({
    user,
    patients,
    onClose,
    onSave
}) => {
    const [selectedPatients, setSelectedPatients] = useState<string[]>(
        user.allowedPatients || []
    );
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = useMemo(() => {
        if (!searchTerm.trim()) return patients;
        const term = searchTerm.toLowerCase();
        return patients.filter(p =>
            p.nombreCompleto?.toLowerCase().includes(term) ||
            p.rut?.toLowerCase().includes(term) ||
            String(p.ficha).includes(term)
        );
    }, [patients, searchTerm]);

    const handleTogglePatient = (patientId: string) => {
        setSelectedPatients(prev =>
            prev.includes(patientId)
                ? prev.filter(id => id !== patientId)
                : [...prev, patientId]
        );
    };

    const handleSelectAll = () => {
        const filteredIds = filteredPatients.map(p => p.firestoreId).filter(Boolean) as string[];
        setSelectedPatients(prev => {
            const newSelection = new Set(prev);
            filteredIds.forEach(id => newSelection.add(id));
            return Array.from(newSelection);
        });
    };

    const handleDeselectAll = () => {
        const filteredIds = new Set(filteredPatients.map(p => p.firestoreId).filter(Boolean));
        setSelectedPatients(prev => prev.filter(id => !filteredIds.has(id)));
    };

    const handleSave = () => {
        onSave(user, selectedPatients);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">
                            Asignar Pacientes a {user.name}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search and actions */}
                <div className="p-4 border-b space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, RUT o ficha..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {selectedPatients.length} pacientes seleccionados
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSelectAll}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Seleccionar todos
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={handleDeselectAll}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Deseleccionar todos
                            </button>
                        </div>
                    </div>
                </div>

                {/* Patient list */}
                <div className="flex-1 overflow-y-auto p-4">
                    {filteredPatients.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No se encontraron pacientes
                        </p>
                    ) : (
                        <div className="space-y-1">
                            {filteredPatients.map(patient => {
                                const patientId = patient.firestoreId;
                                if (!patientId) return null;
                                const isSelected = selectedPatients.includes(patientId);

                                return (
                                    <label
                                        key={patientId}
                                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                            isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleTogglePatient(patientId)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {patient.nombreCompleto || 'Sin nombre'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                RUT: {patient.rut || 'N/A'} | Ficha: {patient.ficha || 'N/A'}
                                            </p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Guardar ({selectedPatients.length} pacientes)
                    </button>
                </div>
            </div>
        </div>
    );
};
