import React, { useState } from 'react';
import { Patient } from '../types';

type SearchMode = 'nombre' | 'rut' | 'ficha';

interface PatientSearchViewProps {
    patients: Patient[];
    onSelectPatient: (id: number) => void;
}

const PatientSearchView: React.FC<PatientSearchViewProps> = ({ patients, onSelectPatient }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Patient[]>([]);
    const [filter, setFilter] = useState<SearchMode>('nombre');

    const placeholders: { [key in SearchMode]: string } = {
        nombre: 'Buscar por nombre completo...',
        rut: 'Buscar por RUT (ej: 12345678-9)...',
        ficha: 'Buscar por número de ficha...',
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setResults([]);
            return;
        }

        const lowercasedValue = value.toLowerCase();
        const filtered = patients.filter(patient =>
            patient[filter].toString().toLowerCase().includes(lowercasedValue)
        );
        setResults(filtered);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value as SearchMode);
        setSearchTerm('');
        setResults([]);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Búsqueda Unificada de Pacientes</h3>
            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                 <div className="flex-shrink-0">
                    <label htmlFor="search-filter" className="font-semibold text-slate-700">Buscar por:</label>
                    <select
                        id="search-filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="ml-3 px-4 py-2.5 border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-150 text-slate-700 font-medium cursor-pointer hover:bg-slate-50"
                    >
                        <option value="nombre">Nombre</option>
                        <option value="rut">RUT</option>
                        <option value="ficha">Ficha</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder={placeholders[filter]}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-150 text-slate-700 placeholder-slate-400"
                    aria-label="Campo de búsqueda"
                    autoFocus
                />
            </div>

            {searchTerm && (
                 <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
                    <ul className="divide-y divide-slate-200">
                        {results.length > 0 ? (
                            results.map(patient => (
                                <li key={patient.id} onClick={() => onSelectPatient(patient.id)} className="p-4 hover:bg-slate-50 cursor-pointer transition-all duration-150">
                                    <p className="font-semibold text-slate-800 text-lg">{patient.nombre}</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        <span className="font-medium">RUT:</span> {patient.rut} - <span className="font-medium">Ficha:</span> {patient.ficha}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li className="p-6 text-center text-slate-500">No se encontraron resultados.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientSearchView;