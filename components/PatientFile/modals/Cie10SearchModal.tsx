import React, { useState, useMemo } from 'react';
import { CIE10_DIAGNOSES } from '../../../constants';

interface Cie10SearchModalProps {
    onClose: () => void;
    onSelect: (diagnosis: string) => void;
}

const Cie10SearchModal: React.FC<Cie10SearchModalProps> = ({ onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const removeAccents = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const filteredDiagnoses = useMemo(() => {
        const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
        if (!normalizedSearchTerm) {
            return CIE10_DIAGNOSES.slice(0, 20); // Show first 20 by default
        }
        return CIE10_DIAGNOSES.filter(d =>
            removeAccents(d.toLowerCase()).includes(normalizedSearchTerm)
        ).slice(0, 50); // Limit results for performance
    }, [searchTerm]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
                <h3 className="text-lg font-semibold mb-4">Buscar Diagnóstico CIE-10</h3>
                <input
                    type="text"
                    placeholder="Buscar por código o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                    autoFocus
                />
                <ul className="max-h-96 overflow-y-auto border rounded-md">
                    {filteredDiagnoses.map(diagnosis => (
                        <li
                            key={diagnosis}
                            onClick={() => onSelect(diagnosis)}
                            className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                        >
                            {diagnosis}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md text-sm">Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default Cie10SearchModal;
