import React, { useState, FormEvent, ChangeEvent, useMemo, useEffect, useRef, useCallback } from 'react';
import { Patient, Prestacion, User, NewPatientData, PrestacionConfig } from '../types';
import { getPrestacionesForProfile, NSP_REASONS } from '../constants';

// --- TYPE DEFINITIONS ---

// Represents the data for a single prestacion form/card
type PrestacionFormData = {
    key: string; // Unique ID for the card itself for React rendering
    pacienteId: number | null;
    fecha: string;
    profesional: string;
    tipo: string;
    observaciones: string;
    nspReason: string;
};

// Represents validation errors for a single card
type CardErrors = {
    paciente?: boolean;
    tipo?: boolean;
};

// Helper function to get date string in YYYY-MM-DD format from local time
const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// --- TOAST NOTIFICATION COMPONENT ---
const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 6000); // Auto-dismiss after 6 seconds

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed top-5 right-5 bg-emerald-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-toast-in z-50 max-w-sm" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
        </div>
    );
};


// --- REUSABLE MODAL (UNCHANGED) ---

const AddPatientModal: React.FC<{ onClose: () => void; onSave: (patientData: NewPatientData) => void; }> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState<NewPatientData>({ nombre: '', rut: '', fechaNacimiento: '', sexo: 'Masculino' });
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.nombre || !formData.rut || !formData.fechaNacimiento) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        setError('');
        onSave(formData);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" aria-modal="true" role="dialog">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Agregar Nuevo Paciente</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
                        <input type="text" id="rut" name="rut" value={formData.rut} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="12345678-9" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">Sexo</label>
                            <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </select>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-700">Guardar Paciente</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- NEW, COMPACT PRESTACION CARD COMPONENT ---

const COMBOBOX_PRESTACION_LIMIT = 5;

interface PrestacionCardProps {
    cardData: PrestacionFormData;
    onUpdate: (data: Partial<PrestacionFormData>) => void;
    onDelete: () => void;
    patients: Patient[];
    availablePrestaciones: string[];
    errors: CardErrors;
    autoFocusSearch: boolean;
}

const PrestacionCard: React.FC<PrestacionCardProps> = ({ cardData, onUpdate, onDelete, patients, availablePrestaciones, errors, autoFocusSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Patient[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Combobox state
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isListExpanded, setIsListExpanded] = useState(false);
    const [filter, setFilter] = useState('');
    const comboboxRef = useRef<HTMLDivElement>(null);

    const selectedPatient = useMemo(() => patients.find(p => p.id === cardData.pacienteId), [cardData.pacienteId, patients]);
    
    useEffect(() => {
        if (autoFocusSearch && searchInputRef.current) {
            // Focus is called directly after render. The animation might still be running,
            // but the element should be ready to receive focus.
            searchInputRef.current.focus();
        }
    }, [autoFocusSearch]);
    
    // Close combobox on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
                setIsListExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { 
        primaryPrestacionOptions, 
        egresoSubtypes, 
        isEgresoSelected, 
        selectedPrimaryType,
        selectedSubtype 
    } = useMemo(() => {
        const subtypes = availablePrestaciones
            .filter(p => p.startsWith('Egreso: '))
            .map(p => p.substring('Egreso: '.length))
            .sort();

        const hasEgreso = subtypes.length > 0;
        const otherOptions = availablePrestaciones.filter(p => !p.startsWith('Egreso: '));
        const primaryOptions = hasEgreso ? ['Egreso', ...otherOptions].sort() : otherOptions.sort();
        
        const currentPrimary = cardData.tipo.startsWith('Egreso: ') ? 'Egreso' : cardData.tipo;
        const isSelected = currentPrimary === 'Egreso';
        const currentSubtype = isSelected ? cardData.tipo.substring('Egreso: '.length) : '';
        
        return { 
            primaryPrestacionOptions: primaryOptions, 
            egresoSubtypes: subtypes, 
            isEgresoSelected: isSelected, 
            selectedPrimaryType: currentPrimary,
            selectedSubtype: currentSubtype 
        };
    }, [availablePrestaciones, cardData.tipo]);
    
    const filteredPrimaryOptions = useMemo(() =>
        primaryPrestacionOptions.filter(p =>
            p.toLowerCase().includes(filter.toLowerCase())
        ), [primaryPrestacionOptions, filter]
    );

    const displayOptions = useMemo(() => {
        if (isListExpanded) {
            return filteredPrimaryOptions;
        }
        return filteredPrimaryOptions.slice(0, COMBOBOX_PRESTACION_LIMIT);
    }, [filteredPrimaryOptions, isListExpanded]);


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setActiveIndex(-1);
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }
        const lowercasedValue = value.toLowerCase();
        setSearchResults(
            patients.filter(p =>
                p.nombre.toLowerCase().includes(lowercasedValue) || p.rut.includes(lowercasedValue)
            ).slice(0, 5)
        );
    };

    const handleSelectPatient = (patient: Patient) => {
        onUpdate({ pacienteId: patient.id });
        setSearchTerm('');
        setSearchResults([]);
        setActiveIndex(-1);
    };
    
    const handlePrestacionTypeSelect = (primaryType: string) => {
        if (primaryType === 'Egreso') {
            const firstSubtype = egresoSubtypes[0] || '';
            onUpdate({ tipo: `Egreso: ${firstSubtype}`, observaciones: '', nspReason: NSP_REASONS[0] });
        } else {
            onUpdate({ tipo: primaryType, observaciones: '', nspReason: NSP_REASONS[0] });
        }
        setFilter('');
        setDropdownOpen(false);
        setIsListExpanded(false);
    };

    const handleSubtypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onUpdate({ tipo: `Egreso: ${e.target.value}` });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (searchResults.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev + 1) % searchResults.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && searchResults[activeIndex]) {
                handleSelectPatient(searchResults[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            setSearchTerm('');
            setSearchResults([]);
        }
    };
    
    const hasError = errors.paciente || errors.tipo;
    const errorBorder = 'border-2 border-red-500';

    return (
        <div className="flex items-center gap-3 prestacion-card-enter">
            {/* The main card container */}
            <div 
                className={`flex-grow p-3 rounded-lg shadow-sm flex items-center ${
                    selectedPatient ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                } ${hasError ? errorBorder : 'border'}`}
                style={{ minHeight: '88px' }} // Ensures consistent height
            >
                {selectedPatient ? (
                    <div className="flex items-center justify-between w-full gap-4 flex-wrap">
                        {/* Patient Info (Left) */}
                        <div className="flex-shrink-0" style={{ minWidth: '240px', maxWidth: '300px' }}>
                            <p className="font-bold text-blue-800 truncate" title={selectedPatient.nombre}>{selectedPatient.nombre}</p>
                            <p className="text-sm text-blue-600">RUT: {selectedPatient.rut} | Ficha: {selectedPatient.ficha}</p>
                        </div>

                        {/* Form Fields (Middle) */}
                        <div className="flex items-start gap-3 flex-grow flex-wrap">
                            <input 
                                type="date" 
                                value={cardData.fecha} 
                                onChange={(e) => onUpdate({ fecha: e.target.value })} 
                                className="p-2 h-10 rounded-md border-gray-300 shadow-sm text-sm"
                                aria-label="Fecha de la prestación"
                            />
                             <div className="relative w-60" ref={comboboxRef}>
                                <input
                                    type="text"
                                    value={isDropdownOpen ? filter : selectedPrimaryType}
                                    onChange={(e) => {
                                        setFilter(e.target.value);
                                        if (!isDropdownOpen) setDropdownOpen(true);
                                    }}
                                    onFocus={() => {
                                        setFilter('');
                                        setDropdownOpen(true);
                                        setIsListExpanded(false);
                                    }}
                                    placeholder="Seleccione o busque..."
                                    className={`p-2 h-10 block w-full rounded-md shadow-sm text-sm ${errors.tipo ? 'border-red-500' : 'border-gray-300'}`}
                                    autoComplete="off"
                                />
                                {isDropdownOpen && (
                                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {displayOptions.length > 0 ? displayOptions.map(option => (
                                            <li key={option}>
                                                <button
                                                    type="button"
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => handlePrestacionTypeSelect(option)}
                                                    className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                >
                                                    {option}
                                                </button>
                                            </li>
                                        )) : <li className="p-2 text-sm text-gray-500">No se encontraron resultados</li>}
                                        {!isListExpanded && filteredPrimaryOptions.length > COMBOBOX_PRESTACION_LIMIT && (
                                            <li>
                                                <button
                                                    type="button"
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => setIsListExpanded(true)}
                                                    className="w-full p-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer font-semibold text-center"
                                                >
                                                    Ver más...
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                            {isEgresoSelected && (
                                <select 
                                    value={selectedSubtype} 
                                    onChange={handleSubtypeChange}
                                    className="p-2 h-10 block w-60 rounded-md border-gray-300 shadow-sm text-sm bg-white"
                                    aria-label="Subtipo de egreso"
                                >
                                    {egresoSubtypes.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                            )}
                            {cardData.tipo === 'NSP (No se presenta)' && (
                                 <select 
                                    value={cardData.nspReason} 
                                    onChange={(e) => onUpdate({ nspReason: e.target.value })} 
                                    className="p-2 h-10 block w-60 rounded-md border-gray-300 shadow-sm text-sm"
                                    aria-label="Motivo de la inasistencia"
                                >
                                    {NSP_REASONS.map(reason => (
                                        <option key={reason} value={reason}>{reason}</option>
                                    ))}
                                </select>
                            )}
                            <input 
                                type="text"
                                placeholder={cardData.tipo === 'NSP (No se presenta)' && cardData.nspReason === 'Otro (especificar)' ? 'Especifique el motivo...' : 'Observaciones (opcional)'}
                                value={cardData.observaciones}
                                onChange={(e) => onUpdate({ observaciones: e.target.value })}
                                className="p-2 h-10 block w-72 rounded-md border-gray-300 shadow-sm text-sm"
                                aria-label="Observaciones"
                                title={cardData.observaciones} // Tooltip for long text
                            />
                        </div>

                        {/* Change Button (Right) */}
                        <button 
                            onClick={() => onUpdate({ pacienteId: null })} 
                            className="text-sm font-semibold text-red-600 bg-white hover:bg-red-50 border border-red-300 rounded-md px-4 py-2 transition-colors"
                        >
                            Cambiar
                        </button>
                    </div>
                ) : (
                    <div className="relative w-full">
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Buscar paciente por Nombre o RUT..." 
                            value={searchTerm} 
                            onChange={handleSearch}
                            onKeyDown={handleKeyDown}
                            className={`w-full p-2 border rounded-md shadow-sm ${errors.paciente ? 'border-red-500' : 'border-gray-300'}`}
                        />
                         {searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 z-10 bg-white rounded-md border border-gray-200 shadow-lg mt-1 max-h-48 overflow-y-auto">
                                <ul className="divide-y divide-gray-200" role="listbox">
                                    {searchResults.map((p, index) => (
                                        <li 
                                            key={p.id} 
                                            onClick={() => handleSelectPatient(p)} 
                                            onMouseEnter={() => setActiveIndex(index)}
                                            className={`p-2 cursor-pointer ${activeIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                            role="option"
                                            aria-selected={activeIndex === index}
                                        >
                                            <p className="font-semibold text-sm">{p.nombre}</p>
                                            <p className="text-xs text-gray-500">{p.rut}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {errors.paciente && <p className="text-red-600 text-xs mt-1">Debe seleccionar un paciente.</p>}
                    </div>
                )}
            </div>

            {/* Delete Button (Outside Card) */}
            <button onClick={onDelete} className="text-red-500 hover:text-red-700 flex-shrink-0" title="Eliminar ficha">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};


// --- MAIN VIEW COMPONENT ---

interface IngresarPrestacionViewProps {
    patients: Patient[];
    user: User;
    onAddMultiplePrestaciones: (prestaciones: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp'>[]) => void;
    onAddPatient: (patientData: NewPatientData) => Patient;
    prestacionConfig: PrestacionConfig;
    focusIntentKey?: string | null;
}

const IngresarPrestacionView: React.FC<IngresarPrestacionViewProps> = ({ patients, user, onAddMultiplePrestaciones, onAddPatient, prestacionConfig, focusIntentKey }) => {
    const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
    const availablePrestaciones = useMemo(() => getPrestacionesForProfile(user.title, prestacionConfig), [user.title, prestacionConfig]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [autoFocusKey, setAutoFocusKey] = useState<string | null>(null);
    const viewContainerRef = useRef<HTMLDivElement>(null);

    const createNewCard = useCallback((): PrestacionFormData => {
        let initialType = availablePrestaciones[0] || '';
        // If the first available is an Egreso type, ensure it's set correctly
        if (initialType.startsWith('Egreso:')) {
            // The logic in the card will handle showing the primary/subtype dropdowns
        }

        return {
            key: Date.now().toString() + Math.random(),
            pacienteId: null,
            fecha: getLocalDateString(new Date()),
            profesional: user.name,
            tipo: initialType,
            observaciones: '',
            nspReason: NSP_REASONS[0],
        };
    }, [availablePrestaciones, user.name]);

    const [cards, setCards] = useState<PrestacionFormData[]>(() => [createNewCard()]);
    const [errors, setErrors] = useState<Record<string, CardErrors>>({});

    // This effect handles focusing the first card's input when navigated via global hotkey
    useEffect(() => {
        if (focusIntentKey && viewContainerRef.current) {
            // Use a timeout to ensure the element is rendered and ready for focus
            const timer = setTimeout(() => {
                const firstSearchInput = viewContainerRef.current?.querySelector('input[placeholder="Buscar paciente por Nombre o RUT..."]');
                if (firstSearchInput) {
                    (firstSearchInput as HTMLInputElement).focus();
                }
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [focusIntentKey]);

    useEffect(() => {
        if (autoFocusKey) {
            // Reset the key after the render cycle so it only triggers focus once.
            const timer = setTimeout(() => setAutoFocusKey(null), 0);
            return () => clearTimeout(timer);
        }
    }, [autoFocusKey]);

    const handleAddCard = useCallback(() => {
        const newCard = createNewCard();
        setCards(prev => [...prev, newCard]);
        setAutoFocusKey(newCard.key);
    }, [createNewCard]);

    const handleSaveAll = useCallback(() => {
        const prestacionesListas = cards.filter(card => card.pacienteId !== null);

        if (prestacionesListas.length === 0) {
            alert("No hay prestaciones con paciente seleccionado para guardar.");
            return;
        }

        const newErrors: Record<string, CardErrors> = {};
        let allValid = true;

        prestacionesListas.forEach(card => {
            const cardErrors: CardErrors = {};
            if (!card.tipo) {
                cardErrors.tipo = true;
                allValid = false;
            }
            if (Object.keys(cardErrors).length > 0) {
                newErrors[card.key] = cardErrors;
            }
        });
        
        setErrors(newErrors);

        if (allValid) {
            const prestacionesToSave = prestacionesListas.map(({ key, nspReason, ...data }) => {
                let finalObservaciones = data.observaciones;
                if (data.tipo === 'NSP (No se presenta)') {
                    let nspObs = `Motivo NSP: ${nspReason}`;
                    if (nspReason === 'Otro (especificar)') {
                        nspObs += ` - ${data.observaciones || 'No especificado.'}`;
                        finalObservaciones = nspObs;
                    } else {
                        if (data.observaciones) {
                            finalObservaciones = `${nspObs}. Observaciones adicionales: ${data.observaciones}`;
                        } else {
                            finalObservaciones = nspObs;
                        }
                    }
                }
                return {
                    pacienteId: data.pacienteId!,
                    fecha: data.fecha,
                    profesional: data.profesional,
                    tipo: data.tipo,
                    observaciones: finalObservaciones,
                };
            });
            onAddMultiplePrestaciones(prestacionesToSave);
            
            const count = prestacionesToSave.length;
            setToastMessage(`${count} prestaci${count === 1 ? 'ón guardada' : 'ones guardadas'} con éxito.`);
            
            setCards([createNewCard()]);
            setErrors({});
        } else {
            alert("Por favor, complete los campos obligatorios en las fichas marcadas en rojo.");
        }
    }, [cards, createNewCard, onAddMultiplePrestaciones]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Ctrl+S or Ctrl+Enter to save, works even when focused on an input
            if (event.ctrlKey && (event.key.toLowerCase() === 's' || event.key === 'Enter')) {
                event.preventDefault();
                handleSaveAll();
            }

            const isInputFocused = (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA');
            
            // Prevent other shortcuts when typing
            if (isInputFocused) return;

            if (event.altKey && event.key.toLowerCase() === 'o') {
                event.preventDefault();
                handleAddCard();
            }
            
            if (event.altKey && event.key.toLowerCase() === 'p') {
                event.preventDefault();
                setIsAddPatientModalOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleAddCard, handleSaveAll]);

    const handleUpdateCard = (index: number, data: Partial<PrestacionFormData>) => {
        setCards(prev => prev.map((card, i) => i === index ? { ...card, ...data } : card));
    };

    const handleDeleteCard = (index: number) => {
        if (cards.length > 1) {
            setCards(prev => prev.filter((_, i) => i !== index));
            // Also remove errors for the deleted card
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[cards[index].key];
                return newErrors;
            });
        } else {
            // If it's the last card, reset it to a fresh state instead of showing an alert.
            const newCard = createNewCard();
            setCards([newCard]);
            setErrors({}); // Clear all errors
        }
    };
    
    const handleSaveNewPatient = (patientData: NewPatientData) => {
        const newPatient = onAddPatient(patientData);
        setIsAddPatientModalOpen(false);
        // Find the first card without a patient and assign the new patient to it
        const firstEmptyIndex = cards.findIndex(c => c.pacienteId === null);
        if (firstEmptyIndex !== -1) {
            handleUpdateCard(firstEmptyIndex, { pacienteId: newPatient.id });
        } else {
            // Or add a new card for this patient
            const newCard = createNewCard();
            newCard.pacienteId = newPatient.id;
            setCards(prev => [...prev, newCard]);
        }
    };

    const readyCardsCount = cards.filter(c => c.pacienteId !== null).length;
    const isSaveDisabled = readyCardsCount === 0 || !!toastMessage;

    const ActionBlock = (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleAddCard}
                className="text-blue-600 rounded-full hover:bg-blue-100 p-1 transition-colors duration-200"
                aria-label="Agregar otra prestación"
                title="Agregar otra prestación (Alt + O)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>

            {readyCardsCount > 0 && (
                 <div className="text-center">
                     <p className="text-gray-600 mb-2">
                        {`${readyCardsCount} prestaci${readyCardsCount === 1 ? 'ón lista' : 'ones listas'} para guardar.`}
                    </p>
                    <button
                        onClick={handleSaveAll}
                        disabled={isSaveDisabled}
                        className={`font-bold py-3 px-8 rounded-md text-base transition-colors duration-300 w-64 text-center bg-green-600 text-white ${
                            isSaveDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                        }`}
                        title={`Guardar ${readyCardsCount} Prestaciones (Ctrl + S / Ctrl + Enter)`}
                    >
                        Guardar {readyCardsCount} Prestaci{readyCardsCount === 1 ? 'ón' : 'ones'}
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div ref={viewContainerRef} className="flex flex-col h-full overflow-hidden">
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
            <div className="flex-1 overflow-y-auto">
            {isAddPatientModalOpen && <AddPatientModal onClose={() => setIsAddPatientModalOpen(false)} onSave={handleSaveNewPatient} />}

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Registro de Prestaciones Múltiples</h3>
                 <button onClick={() => setIsAddPatientModalOpen(true)} className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 font-bold py-2 px-4 rounded-md hover:bg-blue-100 border border-blue-200 text-sm" title="Agregar Nuevo Paciente (Alt + P)">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Agregar Nuevo Paciente
                </button>
            </div>
            
            {readyCardsCount === 0 ? (
                <div className="flex flex-col items-center justify-center pt-16">
                    <div className="w-full mb-8 space-y-4">
                        {cards.map((card, index) => (
                            <PrestacionCard
                                key={card.key}
                                cardData={card}
                                onUpdate={(data) => handleUpdateCard(index, data)}
                                onDelete={() => handleDeleteCard(index)}
                                patients={patients}
                                availablePrestaciones={availablePrestaciones}
                                errors={errors[card.key] || {}}
                                autoFocusSearch={card.key === autoFocusKey || (index === 0 && !!focusIntentKey)}
                            />
                        ))}
                    </div>
                    {ActionBlock}
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cards.map((card, index) => (
                            <PrestacionCard
                                key={card.key}
                                cardData={card}
                                onUpdate={(data) => handleUpdateCard(index, data)}
                                onDelete={() => handleDeleteCard(index)}
                                patients={patients}
                                availablePrestaciones={availablePrestaciones}
                                errors={errors[card.key] || {}}
                                autoFocusSearch={card.key === autoFocusKey}
                            />
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                        {ActionBlock}
                    </div>
                </>
            )}
            </div>
        </div>
    );
};

export default IngresarPrestacionView;