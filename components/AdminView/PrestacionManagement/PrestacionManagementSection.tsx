import React, { useEffect } from 'react';
import { PrestacionConfig } from '@/types';
import { usePrestacionManagement } from '../hooks/usePrestacionManagement';
import { ProfileSelector } from './ProfileSelector';
import { PrestacionConfigEditor } from './PrestacionConfigEditor';

interface PrestacionManagementSectionProps {
    profiles: string[];
    prestacionConfig: PrestacionConfig;
    allPrestaciones: string[];
    onUpdatePrestacionConfig: (config: PrestacionConfig) => void;
    onUpdateAllPrestaciones: (prestaciones: string[]) => void;
}

export const PrestacionManagementSection: React.FC<PrestacionManagementSectionProps> = ({
    profiles,
    prestacionConfig,
    allPrestaciones,
    onUpdatePrestacionConfig,
    onUpdateAllPrestaciones
}) => {
    const {
        isPrestacionesDirty,
        selectedProfile,
        setSelectedProfile,
        filterTerm,
        setFilterTerm,
        enabledList,
        disabledList,
        newPrestacionName,
        setNewPrestacionName,
        handleCreatePrestacion,
        handleDeletePrestacion,
        handleMovePrestacion,
        handleEnable,
        handleDisable,
        handleSavePrestaciones,
        handleCancelPrestaciones,
    } = usePrestacionManagement(
        prestacionConfig,
        allPrestaciones,
        onUpdatePrestacionConfig,
        onUpdateAllPrestaciones
    );

    // Set initial profile on mount
    useEffect(() => {
        if (!selectedProfile && profiles.length > 0) {
            const initialProfile = profiles.find(p => p !== 'Admin' && p !== 'Estadísticas') || profiles[0];
            setSelectedProfile(initialProfile);
        }
    }, [profiles, selectedProfile, setSelectedProfile]);

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mt-6">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">Gestión de Prestaciones</h4>
                {isPrestacionesDirty && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCancelPrestaciones}
                            className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSavePrestaciones}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm animate-pulse"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                )}
            </div>

            <div className="p-3 bg-gray-50 border rounded-md mb-6">
                <h5 className="font-semibold text-gray-600 mb-2">Administrar Catálogo de Prestaciones</h5>
                <form onSubmit={handleCreatePrestacion} className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Nombre de la nueva prestación"
                        value={newPrestacionName}
                        onChange={(e) => setNewPrestacionName(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm"
                    >
                        Agregar Prestación
                    </button>
                </form>
            </div>

            <h5 className="font-semibold mb-2">Configurar Prestaciones por Perfil</h5>
            <div className="flex gap-6 mt-4">
                <ProfileSelector
                    profiles={profiles}
                    selectedProfile={selectedProfile}
                    onSelectProfile={setSelectedProfile}
                />
                <div className="w-2/3">
                    <PrestacionConfigEditor
                        selectedProfile={selectedProfile}
                        filterTerm={filterTerm}
                        setFilterTerm={setFilterTerm}
                        enabledList={enabledList}
                        disabledList={disabledList}
                        onMovePrestacion={handleMovePrestacion}
                        onEnable={handleEnable}
                        onDisable={handleDisable}
                        onDeletePrestacion={handleDeletePrestacion}
                    />
                </div>
            </div>
        </div>
    );
};
