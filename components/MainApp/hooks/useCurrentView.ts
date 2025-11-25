import { useState, useCallback } from 'react';
import { View } from '../types';

interface UseCurrentViewReturn {
    activeView: View;
    selectedPatientId: string | null;
    focusIntent: string | null;
    setActiveView: (view: View) => void;
    setSelectedPatientId: (id: string | null) => void;
    setFocusIntent: (intent: string | null) => void;
    handleNavClick: (view: View) => void;
    handleSelectPatient: (id: string) => void;
    handleBackToList: () => void;
}

export const useCurrentView = (): UseCurrentViewReturn => {
    const [activeView, setActiveView] = useState<View>('ingresarPrestacion');
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [focusIntent, setFocusIntent] = useState<string | null>(null);

    const handleNavClick = useCallback((view: View) => {
        setActiveView(view);
        setSelectedPatientId(null);
    }, []);

    const handleSelectPatient = useCallback((id: string) => {
        setSelectedPatientId(id);
        setActiveView('buscar');
    }, []);

    const handleBackToList = useCallback(() => {
        setSelectedPatientId(null);
        setActiveView('registro');
    }, []);

    return {
        activeView,
        selectedPatientId,
        focusIntent,
        setActiveView,
        setSelectedPatientId,
        setFocusIntent,
        handleNavClick,
        handleSelectPatient,
        handleBackToList,
    };
};
