import React, { useState, useMemo, useEffect } from 'react';
import { Patient, Prestacion, User } from '../types';
import GoogleCalendarSync from './GoogleCalendarSync';

// --- PROPS INTERFACE ---
interface CalendarProps {
    currentDate: Date;
    prestaciones: Prestacion[];
    patients: Patient[];
    user: User;
    onSelectPatient: (id: number) => void;
}

// --- COLOR & STYLE CONSTANTS ---
const PRESTACION_COLORS: Record<string, { bg: string, text: string, border: string }> = {
    'Control de Psiquiatra': { bg: 'bg-slate-200', text: 'text-slate-900', border: 'border-slate-300' },
    'Control de Psicólogo': { bg: 'bg-slate-300', text: 'text-slate-900', border: 'border-slate-400' },
    'Visita domiciliaria': { bg: 'bg-zinc-200', text: 'text-zinc-900', border: 'border-zinc-300' },
    'Ingreso Multidisciplinario': { bg: 'bg-gray-300', text: 'text-gray-900', border: 'border-gray-400' },
    'Receta': { bg: 'bg-slate-400', text: 'text-white', border: 'border-slate-500' },
    'Informe médico': { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-500' },
    'default': { bg: 'bg-zinc-100', text: 'text-zinc-800', border: 'border-zinc-200' },
};

// --- HELPER FUNCTIONS ---
const getPatientById = (patients: Patient[], id: number) => patients.find(p => p.id === id);

// --- OVERFLOW MODAL COMPONENT ---
interface OverflowModalProps {
    day: number;
    monthName: string;
    prestaciones: Prestacion[];
    patients: Patient[];
    onClose: () => void;
    onSelectPatient: (id: number) => void;
}

const OverflowModal: React.FC<OverflowModalProps> = ({ day, monthName, prestaciones, patients, onClose, onSelectPatient }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold">Agenda Completa - {day} de {monthName}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200" aria-label="Cerrar modal">&times;</button>
                </div>
                <ul className="list-none space-y-2 max-h-96 overflow-y-auto">
                    {prestaciones.map(p => {
                        const patient = getPatientById(patients, p.pacienteId);
                        const colorInfo = PRESTACION_COLORS[p.tipo] || PRESTACION_COLORS.default;
                        const isNSP = p.estado === 'NSP';
                        return (
                            <li key={p.id} className={`p-2 rounded-md border flex justify-between items-center ${colorInfo.bg} ${isNSP ? 'opacity-60' : ''}`}>
                                <div>
                                    <p className={`font-semibold ${colorInfo.text}`}>{patient?.nombre || 'Paciente no encontrado'}</p>
                                    <p className={`text-sm ${colorInfo.text}`}>{p.tipo} - <span className={isNSP ? 'line-through' : ''}>{p.estado}</span></p>
                                </div>
                                <button onClick={() => onSelectPatient(p.pacienteId)} className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">Ver Ficha</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

// --- MAIN CALENDAR COMPONENT ---
const Calendar: React.FC<CalendarProps> = ({ currentDate, prestaciones, patients, user, onSelectPatient }) => {
    const [displayDate, setDisplayDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    const [overflowModalData, setOverflowModalData] = useState<OverflowModalProps | null>(null);
    const [googleEvents, setGoogleEvents] = useState<any[]>([]);
    const [zoomLevel, setZoomLevel] = useState<'small' | 'medium' | 'large'>('medium');

    const filteredPrestaciones = useMemo(() => {
        if (user.role === 'admin' || user.role === 'estadistica') return prestaciones;
        return prestaciones.filter(p => p.profesional === user.name);
    }, [prestaciones, user]);

    // Combinar prestaciones locales con eventos de Google Calendar
    const combinedPrestaciones = useMemo(() => {
        // Convertir eventos de Google a formato de prestación para visualización
        const googlePrestaciones = googleEvents.map(event => ({
            id: `google-${event.id}`,
            fecha: event.start?.date || event.start?.dateTime?.split('T')[0] || '',
            tipo: `📅 ${event.calendarName || 'Google Calendar'}`,
            profesional: event.calendarName || 'Google Calendar',
            pacienteId: -1, // ID especial para eventos de Google
            estado: 'Google',
            observaciones: event.summary || '',
            calendarColor: event.calendarColor || '#f97316', // Color naranja por defecto
            calendarName: event.calendarName || 'Google Calendar'
        }));

        // Combinar prestaciones locales con eventos de Google
        return [...filteredPrestaciones, ...googlePrestaciones];
    }, [filteredPrestaciones, googleEvents]);

    const calendarData = useMemo(() => {
        const y = displayDate.getFullYear();
        const m = displayDate.getMonth();
        const mName = displayDate.toLocaleString('es-ES', { month: 'long' });
        const title = `${mName.charAt(0).toUpperCase() + mName.slice(1)} ${y}`;
        
        const firstDayOfMonth = (new Date(y, m, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        
        const grid: any[] = Array.from({ length: firstDayOfMonth }, (_, i) => ({ key: `empty-${i}`, isEmpty: true }));
        const visibleTypes = new Set<string>();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDateStr = `${y}-${(m + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            const dayPrestaciones = combinedPrestaciones.filter(p => p.fecha === dayDateStr);
            dayPrestaciones.forEach(p => visibleTypes.add(p.tipo));

            grid.push({
                key: `day-${i}`,
                day: i,
                isWeekend: new Date(y, m, i).getDay() % 6 === 0,
                prestaciones: dayPrestaciones,
            });
        }
        return { title, monthName: mName, grid, daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], visibleTypes: Array.from(visibleTypes).sort() };
    }, [displayDate, combinedPrestaciones]);

    const changeMonth = (offset: number) => {
        setDisplayDate(current => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    };

    const goToToday = () => {
        setDisplayDate(new Date());
    };

    // Hotkeys del calendario
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignorar si el usuario está escribiendo en un input o textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch(e.key.toLowerCase()) {
                case 't':
                    goToToday();
                    break;
                case 'm':
                    setZoomLevel('medium');
                    break;
                case 'y':
                    setZoomLevel('small');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Configuración de zoom
    const zoomConfig = {
        small: {
            maxItems: 3,
            fontSize: 'text-[6px]',
            padding: 'p-0.5',
            cellHeight: 'min-h-[140px]',
            dayTextSize: 'text-xs'
        },
        medium: {
            maxItems: 5,
            fontSize: 'text-[7px]',
            padding: 'p-0.5',
            cellHeight: 'min-h-[180px]',
            dayTextSize: 'text-sm'
        },
        large: {
            maxItems: 7,
            fontSize: 'text-[8px]',
            padding: 'p-1',
            cellHeight: 'min-h-[220px]',
            dayTextSize: 'text-base'
        }
    };

    const currentZoomConfig = zoomConfig[zoomLevel];
    const MAX_ITEMS_VISIBLE = currentZoomConfig.maxItems;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {overflowModalData && <OverflowModal {...overflowModalData} />}

            <div className="flex justify-between items-center border-b border-gray-300 pb-6 mb-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Mes anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900">{calendarData.title}</h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Mes siguiente">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <GoogleCalendarSync
                        prestaciones={filteredPrestaciones}
                        patients={patients}
                        currentYear={displayDate.getFullYear()}
                        currentMonth={displayDate.getMonth()}
                        onGoogleEventsLoaded={(events) => {
                            console.log('Eventos de Google Calendar cargados:', events);
                            setGoogleEvents(events);
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                <div className="grid grid-cols-7 text-center font-medium flex-shrink-0 text-xs bg-gray-100 border-t border-gray-300">
                    {calendarData.daysOfWeek.map(day => <div key={day} className="py-2 px-1 text-gray-700 border-r border-gray-300 last:border-r-0 w-[150px]">{day}</div>)}
                </div>
                <div className="flex-1 min-h-0 overflow-auto">
                    <div className="grid grid-cols-7 border-l border-t border-gray-300" style={{ gridAutoRows: '150px' }}>
                {calendarData.grid.map(cell => {
                    const prestacionesCount = cell.prestaciones?.length || 0;
                    // FIX: Corrected typo from 'prestazioniCount' to 'prestacionesCount'.
                    const hasOverflow = prestacionesCount > MAX_ITEMS_VISIBLE + 1;
                    const visiblePrestaciones = cell.prestaciones; // Mostrar todos los eventos con scroll

                    return (
                        <div key={cell.key} className={`border-r border-b border-gray-300 p-2 relative ${cell.isWeekend ? 'bg-gray-50' : 'bg-white'} flex flex-col w-[150px] h-[150px]`}>
                            {!cell.isEmpty && <>
                                <span className="font-semibold text-sm text-gray-900 mb-2 flex-shrink-0">{cell.day}</span>
                                <div className="space-y-1 text-xs overflow-y-auto flex-1 min-h-0" style={{ scrollbarWidth: 'thin' }}>
                                   {visiblePrestaciones?.map((p: Prestacion) => {
                                        const isGoogleEvent = p.pacienteId === -1;

                                        if (isGoogleEvent) {
                                            // Evento de Google Calendar
                                            const bgColor = p.calendarColor ?
                                                `${p.calendarColor}20` : // Agregar transparencia al color del calendario
                                                '#fed7aa'; // naranja claro por defecto
                                            const borderColor = p.calendarColor || '#f97316';
                                            const textColor = p.calendarColor ?
                                                `${p.calendarColor}` :
                                                '#ea580c';

                                            return (
                                                <div
                                                    key={p.id}
                                                    className="w-full px-2 py-1 rounded-md text-left border text-xs"
                                                    style={{
                                                        backgroundColor: bgColor,
                                                        borderColor: borderColor,
                                                        color: textColor
                                                    }}
                                                    title={`${p.calendarName}: ${p.observaciones}`}
                                                >
                                                    <p className="truncate text-xs leading-tight">
                                                        {p.observaciones}
                                                    </p>
                                                </div>
                                            );
                                        } else {
                                            // Prestación local de SIMORA
                                            const patient = getPatientById(patients, p.pacienteId);
                                            const colorInfo = PRESTACION_COLORS[p.tipo] || PRESTACION_COLORS.default;
                                            const isNSP = p.estado === 'NSP';
                                            return (
                                                <button
                                                    key={p.id}
                                                    onClick={() => patient && onSelectPatient(patient.id)}
                                                    className={`w-full px-2 py-1 rounded-md text-left ${colorInfo.bg} ${colorInfo.text} text-xs ${isNSP ? 'line-through opacity-70' : ''} hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-400`}
                                                >
                                                    <p className="truncate text-xs leading-tight" title={patient?.nombre}>{patient?.nombre || 'Desconocido'}</p>
                                                </button>
                                            );
                                        }
                                   })}
                                </div>
                            </>}
                        </div>
                    );
                })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Calendar;
