import React, { useMemo, useState } from 'react';
import { CIE10_DIAGNOSES } from '../constants';

interface DiagnosisSelectorProps {
    value: string;
    onChange: (newValue: string) => void;
}

/**
 * A specialized component for selecting multiple CIE-10 diagnoses
 * with autocomplete functionality.
 */
const DiagnosisSelector: React.FC<DiagnosisSelectorProps> = ({ value, onChange }) => {
    const selectedDiagnoses = useMemo(() => value ? value.split('\n').filter(d => d.trim() !== '') : [], [value]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const removeAccents = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const suggestions = useMemo(() => {
        if (!searchTerm) return [];
        const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
        return CIE10_DIAGNOSES.filter(diag =>
            !selectedDiagnoses.includes(`${diag.code} - ${diag.name}`) &&
            (removeAccents(diag.name.toLowerCase()).includes(normalizedSearchTerm) || diag.code.toLowerCase().includes(normalizedSearchTerm))
        ).slice(0, 7); // Limit suggestions for performance
    }, [searchTerm, selectedDiagnoses]);

    const handleSelect = (diagnosis: { code: string; name: string }) => {
        const newSelection = `${diagnosis.code} - ${diagnosis.name}`;
        const newDiagnoses = [...selectedDiagnoses, newSelection];
        onChange(newDiagnoses.join('\n'));
        setSearchTerm('');
    };

    const handleRemove = (diagnosisToRemove: string) => {
        const newDiagnoses = selectedDiagnoses.filter(d => d !== diagnosisToRemove);
        onChange(newDiagnoses.join('\n'));
    };

    return (
        <div className="relative" onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)}>
            <div className="flex flex-wrap gap-1 p-2 border border-gray-300 rounded-md bg-white shadow-sm min-h-[42px]">
                {selectedDiagnoses.map(diag => (
                    <div key={diag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                        <span>{diag}</span>
                        <button onClick={() => handleRemove(diag)} className="ml-1.5 -mr-1 text-blue-600 hover:text-blue-900 font-bold text-sm leading-none">
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder={selectedDiagnoses.length > 0 ? 'Añadir...' : 'Buscar diagnóstico...'}
                    className="flex-grow p-0 border-none focus:ring-0 text-sm bg-transparent"
                    aria-label="Buscar diagnóstico"
                />
            </div>
            {isFocused && suggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map(diag => (
                        <div
                            key={diag.code}
                            onMouseDown={() => handleSelect(diag)} // Use onMouseDown to prevent blur event from firing first
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            <strong className="text-blue-600">{diag.code}</strong> - {diag.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiagnosisSelector;
