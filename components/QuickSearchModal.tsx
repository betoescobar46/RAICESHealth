import React, { useState, useEffect, useRef } from 'react';
import { Patient } from '../types';

interface QuickSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    patients: Patient[];
    onSelectPatient: (firestoreId: string) => void;
}

const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
    isOpen,
    onClose,
    patients,
    onSelectPatient,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredPatients = React.useMemo(() => {
        if (!searchTerm.trim()) return [];

        const term = searchTerm.toLowerCase().trim();
        return patients.filter(patient =>
            patient.nombre.toLowerCase().includes(term) ||
            patient.rut.toLowerCase().replace(/\./g, '').replace(/-/g, '').includes(term.replace(/\./g, '').replace(/-/g, ''))
        ).slice(0, 8); // Limitar a 8 resultados
    }, [searchTerm, patients]);

    useEffect(() => {
        if (isOpen) {
            setSearchTerm('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [searchTerm]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredPatients.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' && filteredPatients.length > 0) {
                e.preventDefault();
                const selected = filteredPatients[selectedIndex];
                if (selected) {
                    onSelectPatient(selected.firestoreId);
                    onClose();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredPatients, selectedIndex, onSelectPatient, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center pt-32 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="p-4 border-b border-stone-200">
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute left-3 top-3 text-stone-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Buscar paciente por nombre o RUT..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Results */}
                {searchTerm && (
                    <div className="max-h-96 overflow-y-auto">
                        {filteredPatients.length > 0 ? (
                            <ul className="divide-y divide-stone-100">
                                {filteredPatients.map((patient, idx) => (
                                    <li
                                        key={patient.firestoreId}
                                        onClick={() => {
                                            onSelectPatient(patient.firestoreId);
                                            onClose();
                                        }}
                                        className={`px-4 py-3 cursor-pointer transition-colors ${
                                            idx === selectedIndex
                                                ? 'bg-orange-50 border-l-4 border-orange-500'
                                                : 'hover:bg-stone-50'
                                        }`}
                                    >
                                        <p className="font-semibold text-stone-800 text-sm">{patient.nombre}</p>
                                        <p className="text-xs text-stone-600 mt-1">
                                            RUT: {patient.rut} · Ficha: {patient.ficha}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-8 text-center text-stone-500 text-sm">
                                No se encontraron pacientes.
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                {!searchTerm && (
                    <div className="px-4 py-3 bg-stone-50 border-t border-stone-200">
                        <p className="text-xs text-stone-500 text-center">
                            Escribe para buscar · <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-xs">ESC</kbd> para cerrar
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuickSearchModal;
