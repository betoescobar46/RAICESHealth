import { useState, useEffect, useMemo } from 'react';
import { PrestacionConfig } from '@/types';

interface UsePrestacionManagementReturn {
    localPrestacionConfig: PrestacionConfig;
    localAllPrestaciones: string[];
    isPrestacionesDirty: boolean;
    selectedProfile: string | null;
    setSelectedProfile: (profile: string | null) => void;
    filterTerm: string;
    setFilterTerm: (term: string) => void;
    enabledList: string[];
    disabledList: string[];
    newPrestacionName: string;
    setNewPrestacionName: (name: string) => void;
    handleCreatePrestacion: (e: React.FormEvent) => void;
    handleDeletePrestacion: (prestacion: string) => void;
    handleMovePrestacion: (prestacion: string, direction: 'up' | 'down') => void;
    handleEnable: (prestacion: string) => void;
    handleDisable: (prestacion: string) => void;
    handleSavePrestaciones: () => void;
    handleCancelPrestaciones: () => void;
}

export const usePrestacionManagement = (
    prestacionConfig: PrestacionConfig,
    allPrestaciones: string[],
    onUpdatePrestacionConfig: (config: PrestacionConfig) => void,
    onUpdateAllPrestaciones: (prestaciones: string[]) => void
): UsePrestacionManagementReturn => {
    const [localPrestacionConfig, setLocalPrestacionConfig] = useState<PrestacionConfig>(prestacionConfig);
    const [localAllPrestaciones, setLocalAllPrestaciones] = useState<string[]>(allPrestaciones);
    const [isPrestacionesDirty, setIsPrestacionesDirty] = useState(false);
    const [newPrestacionName, setNewPrestacionName] = useState('');
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
    const [filterTerm, setFilterTerm] = useState('');

    // Sync local state with parent props
    useEffect(() => {
        setLocalPrestacionConfig(prestacionConfig);
        setLocalAllPrestaciones(allPrestaciones);
        setIsPrestacionesDirty(false);
    }, [prestacionConfig, allPrestaciones]);

    const handleCreatePrestacion = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = newPrestacionName.trim();
        if (!trimmedName) {
            alert('El nombre de la prestación no puede estar vacío.');
            return;
        }
        if (localAllPrestaciones.some(p => p.toLowerCase() === trimmedName.toLowerCase())) {
            alert('Ya existe una prestación con este nombre.');
            return;
        }
        setLocalAllPrestaciones(prev => [...prev, trimmedName].sort());
        setNewPrestacionName('');
        setIsPrestacionesDirty(true);
    };

    const handleDeletePrestacion = (prestacionToDelete: string) => {
        if (!window.confirm(`¿Está seguro de que desea eliminar la prestación "${prestacionToDelete}" de forma PERMANENTE? Esta acción no se puede deshacer y la eliminará de todos los perfiles.`)) {
            return;
        }
        setLocalAllPrestaciones(prev => prev.filter(p => p !== prestacionToDelete));
        const newConfig = { ...localPrestacionConfig };
        Object.keys(newConfig).forEach(profile => {
            newConfig[profile] = newConfig[profile].filter(p => p !== prestacionToDelete);
        });
        setLocalPrestacionConfig(newConfig);
        setIsPrestacionesDirty(true);
    };

    const handleMovePrestacion = (prestacion: string, direction: 'up' | 'down') => {
        if (!selectedProfile) return;
        setLocalPrestacionConfig(prev => {
            const config = { ...prev };
            const enabled = [...(config[selectedProfile] || [])];
            const index = enabled.indexOf(prestacion);
            if (index === -1) return prev;

            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= enabled.length) return prev;

            [enabled[index], enabled[newIndex]] = [enabled[newIndex], enabled[index]];

            config[selectedProfile] = enabled;
            return config;
        });
        setIsPrestacionesDirty(true);
    };

    const handleEnable = (prestacion: string) => {
        if (!selectedProfile) return;
        setLocalPrestacionConfig(prev => {
            const currentEnabled = prev[selectedProfile] || [];
            if (currentEnabled.includes(prestacion)) return prev;
            const newEnabled = [...currentEnabled, prestacion];
            return { ...prev, [selectedProfile]: newEnabled };
        });
        setIsPrestacionesDirty(true);
    };

    const handleDisable = (prestacion: string) => {
        if (!selectedProfile) return;
        setLocalPrestacionConfig(prev => {
            const currentEnabled = prev[selectedProfile] || [];
            const newEnabled = currentEnabled.filter(p => p !== prestacion);
            return { ...prev, [selectedProfile]: newEnabled };
        });
        setIsPrestacionesDirty(true);
    };

    const handleSavePrestaciones = () => {
        onUpdateAllPrestaciones(localAllPrestaciones);
        onUpdatePrestacionConfig(localPrestacionConfig);
        setIsPrestacionesDirty(false);
        alert('Cambios de prestaciones guardados.');
    };

    const handleCancelPrestaciones = () => {
        setLocalAllPrestaciones(allPrestaciones);
        setLocalPrestacionConfig(prestacionConfig);
        setIsPrestacionesDirty(false);
    };

    const { enabledList, disabledList } = useMemo(() => {
        if (!selectedProfile) return { enabledList: [], disabledList: [] };

        const enabledForProfile = localPrestacionConfig[selectedProfile] || [];
        const disabledForProfile = localAllPrestaciones.filter(p => !enabledForProfile.includes(p)).sort();

        const lowerCaseFilter = filterTerm.toLowerCase();
        if (!lowerCaseFilter) {
            return { enabledList: enabledForProfile, disabledList: disabledForProfile };
        }

        return {
            enabledList: enabledForProfile.filter(p => p.toLowerCase().includes(lowerCaseFilter)),
            disabledList: disabledForProfile.filter(p => p.toLowerCase().includes(lowerCaseFilter)),
        };
    }, [selectedProfile, localPrestacionConfig, localAllPrestaciones, filterTerm]);

    return {
        localPrestacionConfig,
        localAllPrestaciones,
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
    };
};
