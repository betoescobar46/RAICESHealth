import { useState, useEffect, ChangeEvent } from 'react';
import { Patient } from '@/types';

type FormChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const usePatientForm = (patient: Patient) => {
    const [formState, setFormState] = useState(patient);
    const [isEditingDemographics, setIsEditingDemographics] = useState(false);
    const [isEditingHealth, setIsEditingHealth] = useState<{ [key: string]: boolean }>({});
    const [isEditingWarning, setIsEditingWarning] = useState(false);

    // Sync form state with patient prop
    useEffect(() => {
        setFormState(patient);
    }, [patient]);

    const handleFormChange = (e: FormChangeEvent) => {
        const { name, value } = e.target;
        if (name.startsWith('diagnostico.')) {
            const key = name.split('.')[1] as keyof Patient['diagnostico'];
            setFormState(prev => ({
                ...prev,
                diagnostico: { ...prev.diagnostico, [key]: value }
            }));
        } else {
            setFormState(prev => ({ ...prev, [name]: value as any }));
        }
    };

    const resetForm = () => {
        setFormState(patient);
    };

    return {
        formState,
        setFormState,
        isEditingDemographics,
        setIsEditingDemographics,
        isEditingHealth,
        setIsEditingHealth,
        isEditingWarning,
        setIsEditingWarning,
        handleFormChange,
        resetForm
    };
};
