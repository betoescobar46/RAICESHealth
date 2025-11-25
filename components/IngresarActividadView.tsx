import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import { User, Prestacion } from '../types';
import { GENERAL_ACTIVITIES } from '../constants';

const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-5 right-5 bg-emerald-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-toast-in z-50 max-w-sm" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
        </div>
    );
};

interface IngresarActividadViewProps {
    user: User;
    onAddActivity: (actividad: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp' | 'pacienteId'> & { duracion_min_real: number }) => void;
}

const IngresarActividadView: React.FC<IngresarActividadViewProps> = ({ user, onAddActivity }) => {
    const [fecha, setFecha] = useState(getLocalDateString(new Date()));
    const [tipo, setTipo] = useState(GENERAL_ACTIVITIES[0]);
    const [duracion, setDuracion] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [error, setError] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const resetForm = useCallback(() => {
        setFecha(getLocalDateString(new Date()));
        setTipo(GENERAL_ACTIVITIES[0]);
        setDuracion('');
        setObservaciones('');
        setError('');
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const duracionNum = parseInt(duracion, 10);
        if (!tipo || !duracion || isNaN(duracionNum) || duracionNum <= 0) {
            setError('Por favor, complete todos los campos obligatorios con valores válidos.');
            return;
        }
        setError('');
        
        onAddActivity({
            fecha,
            profesional: user.name,
            tipo,
            observaciones,
            duracion_min_real: duracionNum,
        });

        setToastMessage(`Actividad "${tipo}" registrada con éxito.`);
        resetForm();
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="max-w-xl mx-auto flex-1 overflow-y-auto w-full">
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
            <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Registrar Actividad General</h3>
                <p className="text-gray-600 mt-2">
                    Use este formulario para registrar actividades no asociadas a un paciente, como reuniones, capacitaciones o trabajo administrativo.
                </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha de la Actividad</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="profesional" className="block text-sm font-medium text-gray-700">Profesional</label>
                            <input
                                type="text"
                                id="profesional"
                                value={user.name}
                                readOnly
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Actividad</label>
                            <select
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
                                required
                            >
                                {GENERAL_ACTIVITIES.map(act => (
                                    <option key={act} value={act}>{act}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">Duración (minutos)</label>
                            <input
                                type="number"
                                id="duracion"
                                value={duracion}
                                onChange={(e) => setDuracion(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Ej: 60"
                                min="1"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">Observaciones</label>
                        <textarea
                            id="observaciones"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="Añada detalles adicionales aquí..."
                        />
                    </div>
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-end gap-3 pt-4">
                         <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-300">
                            Limpiar
                        </button>
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md text-sm hover:bg-blue-700">
                            Guardar Actividad
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default IngresarActividadView;
