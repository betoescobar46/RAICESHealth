import React from 'react';
import { ActionButton } from './ActionButton';

interface PrestacionConfigEditorProps {
    selectedProfile: string | null;
    filterTerm: string;
    setFilterTerm: (term: string) => void;
    enabledList: string[];
    disabledList: string[];
    onMovePrestacion: (prestacion: string, direction: 'up' | 'down') => void;
    onEnable: (prestacion: string) => void;
    onDisable: (prestacion: string) => void;
    onDeletePrestacion: (prestacion: string) => void;
}

export const PrestacionConfigEditor: React.FC<PrestacionConfigEditorProps> = ({
    selectedProfile,
    filterTerm,
    setFilterTerm,
    enabledList,
    disabledList,
    onMovePrestacion,
    onEnable,
    onDisable,
    onDeletePrestacion
}) => {
    if (!selectedProfile) {
        return <p className="text-center text-gray-500 pt-16">Seleccione un perfil para comenzar.</p>;
    }

    return (
        <>
            <h6 className="font-semibold text-gray-600 mb-2">
                Configurar para: <span className="text-blue-700">{selectedProfile}</span>
            </h6>
            <input
                type="text"
                placeholder="Buscar prestación..."
                value={filterTerm}
                onChange={e => setFilterTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h6 className="font-bold text-green-700 mb-2">Habilitadas ({enabledList.length})</h6>
                    <ul className="space-y-1 p-2 border rounded-md h-96 overflow-y-auto bg-green-50">
                        {enabledList.map((p, index) => (
                            <li key={p} className="flex justify-between items-center p-1 rounded hover:bg-white group">
                                <span className="text-sm text-gray-800 flex-grow mr-2">{p}</span>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => onMovePrestacion(p, 'up')}
                                        disabled={index === 0}
                                        className="p-0.5 disabled:opacity-20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onMovePrestacion(p, 'down')}
                                        disabled={index === enabledList.length - 1}
                                        className="p-0.5 disabled:opacity-20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M19 9l-7 7-7 7" />
                                        </svg>
                                    </button>
                                    <ActionButton type="disable" onClick={() => onDisable(p)} title="Deshabilitar" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold text-red-700 mb-2">No Habilitadas ({disabledList.length})</h6>
                    <ul className="space-y-1 p-2 border rounded-md h-96 overflow-y-auto bg-red-50">
                        {disabledList.map(p => (
                            <li key={p} className="flex justify-between items-center p-1 rounded hover:bg-white group">
                                <span className="text-sm text-gray-800 flex-grow mr-2">{p}</span>
                                <ActionButton type="enable" onClick={() => onEnable(p)} title="Habilitar" />
                                <ActionButton type="delete" onClick={() => onDeletePrestacion(p)} title="Eliminar permanentemente" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
