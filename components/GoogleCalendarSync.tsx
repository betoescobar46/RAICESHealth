import React, { useState, useEffect } from 'react';
import {
    initGoogleCalendarSync,
    requestAuth,
    isAuthenticated,
    revokeAuth,
    getCalendarList,
    exportPrestacionesToGoogleCalendar,
    getCalendarEvents,
    CalendarList,
    GoogleCalendarEvent
} from '../services/googleCalendarSync';
import { Prestacion, Patient } from '../types';

interface GoogleCalendarSyncProps {
    prestaciones: Prestacion[];
    patients: Patient[];
    currentYear: number;
    currentMonth: number;
    onCalendarSync?: () => void;
    onGoogleEventsLoaded?: (events: GoogleCalendarEvent[]) => void;
}

const GoogleCalendarSync: React.FC<GoogleCalendarSyncProps> = ({
    prestaciones,
    patients,
    currentYear,
    currentMonth,
    onCalendarSync,
    onGoogleEventsLoaded,
}) => {
    const [isExporting, setIsExporting] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [calendars, setCalendars] = useState<CalendarList[]>([]);
    const [selectedCalendar, setSelectedCalendar] = useState<string>('');
    const [showCalendarSelect, setShowCalendarSelect] = useState(false);
    const [syncProgress, setSyncProgress] = useState<{ current: number; total: number } | null>(null);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);

    const monthName = new Date(currentYear, currentMonth).toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    // Inicializar Google Calendar API
    useEffect(() => {
        const init = async () => {
            try {
                await initGoogleCalendarSync();
                setIsInitialized(true);
                setIsSignedIn(isAuthenticated());
            } catch (error) {
                console.warn('Google Calendar no disponible:', error);
                setIsInitialized(false);
            }
        };

        // Esperar a que se cargue el script de Google
        if (window.google) {
            init();
        } else {
            const checkGoogle = setInterval(() => {
                if (window.google) {
                    clearInterval(checkGoogle);
                    init();
                }
            }, 100);

            // Timeout después de 5 segundos
            setTimeout(() => clearInterval(checkGoogle), 5000);
        }
    }, []);

    // Cargar calendarios cuando el usuario inicie sesión
    useEffect(() => {
        if (isSignedIn) {
            loadCalendars();
        }
    }, [isSignedIn]);

    // Recargar eventos cuando cambie el mes/año
    useEffect(() => {
        if (isSignedIn && selectedCalendar) {
            if (selectedCalendar === 'all') {
                loadAllCalendarsEvents();
            } else {
                loadGoogleEvents(selectedCalendar);
            }
        }
    }, [currentYear, currentMonth]);

    const loadCalendars = async () => {
        try {
            const calendarList = await getCalendarList();
            setCalendars(calendarList);

            // Buscar el calendario "CONSULTA PRIVADA" automáticamente
            const consultaCalendar = calendarList.find(cal =>
                cal.summary.toLowerCase().includes('consulta') ||
                cal.summary.toLowerCase().includes('privada')
            );

            if (consultaCalendar) {
                setSelectedCalendar(consultaCalendar.id);
                // Cargar eventos inmediatamente al seleccionar el calendario
                await loadGoogleEvents(consultaCalendar.id);
            } else if (calendarList.length > 0) {
                setSelectedCalendar(calendarList[0].id);
                // Cargar eventos del primer calendario
                await loadGoogleEvents(calendarList[0].id);
            }
        } catch (error) {
            console.error('Error al cargar calendarios:', error);
        }
    };

    // Cargar eventos desde Google Calendar
    const loadGoogleEvents = async (calendarId?: string) => {
        if (!calendarId && !selectedCalendar) return;

        const targetCalendarId = calendarId || selectedCalendar;
        setIsLoadingEvents(true);

        try {
            // Obtener el rango de fechas para el mes actual
            const startDate = new Date(currentYear, currentMonth, 1);
            const endDate = new Date(currentYear, currentMonth + 1, 0);

            const timeMin = startDate.toISOString();
            const timeMax = endDate.toISOString();

            // Cargar eventos del calendario seleccionado
            const events = await getCalendarEvents(targetCalendarId, timeMin, timeMax);

            // Notificar al componente padre sobre los eventos cargados
            if (onGoogleEventsLoaded) {
                onGoogleEventsLoaded(events);
            }

            console.log(`Cargados ${events.length} eventos de Google Calendar`);
        } catch (error) {
            console.error('Error al cargar eventos de Google Calendar:', error);
        } finally {
            setIsLoadingEvents(false);
        }
    };

    // Cargar eventos de TODOS los calendarios
    const loadAllCalendarsEvents = async () => {
        setIsLoadingEvents(true);

        try {
            // Obtener el rango de fechas para el mes actual
            const startDate = new Date(currentYear, currentMonth, 1);
            const endDate = new Date(currentYear, currentMonth + 1, 0);

            const timeMin = startDate.toISOString();
            const timeMax = endDate.toISOString();

            // Cargar eventos de todos los calendarios en paralelo
            const allEventsPromises = calendars.map(calendar =>
                getCalendarEvents(calendar.id, timeMin, timeMax).then(events =>
                    // Agregar información del calendario a cada evento
                    events.map(event => ({
                        ...event,
                        calendarName: calendar.summary,
                        calendarId: calendar.id,
                        calendarColor: calendar.backgroundColor
                    }))
                ).catch(err => {
                    console.error(`Error cargando calendario ${calendar.summary}:`, err);
                    return [];
                })
            );

            const allEventsArrays = await Promise.all(allEventsPromises);
            const allEvents = allEventsArrays.flat();

            // Notificar al componente padre sobre los eventos cargados
            if (onGoogleEventsLoaded) {
                onGoogleEventsLoaded(allEvents);
            }

            console.log(`Cargados ${allEvents.length} eventos de ${calendars.length} calendarios`);
        } catch (error) {
            console.error('Error al cargar eventos de todos los calendarios:', error);
        } finally {
            setIsLoadingEvents(false);
        }
    };

    // Manejar inicio de sesión
    const handleSignIn = async () => {
        try {
            await requestAuth();
            setIsSignedIn(true);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al conectar con Google Calendar');
        }
    };

    // Manejar cierre de sesión
    const handleSignOut = () => {
        revokeAuth();
        setIsSignedIn(false);
        setCalendars([]);
        setSelectedCalendar('');
    };

    // Sincronizar directamente con Google Calendar
    const handleSyncToGoogle = async () => {
        if (!selectedCalendar) {
            alert('Por favor, selecciona un calendario primero');
            return;
        }

        const monthStr = (currentMonth + 1).toString().padStart(2, '0');
        const prestacionesDelMes = prestaciones.filter(p => p.fecha.startsWith(`${currentYear}-${monthStr}`));

        if (prestacionesDelMes.length === 0) {
            alert('No hay prestaciones para sincronizar en este mes.');
            return;
        }

        const confirm = window.confirm(
            `¿Deseas exportar ${prestacionesDelMes.length} prestaciones de ${monthName} al calendario "${calendars.find(c => c.id === selectedCalendar)?.summary}"?`
        );

        if (!confirm) return;

        setIsExporting(true);
        setSyncProgress({ current: 0, total: prestacionesDelMes.length });

        try {
            const result = await exportPrestacionesToGoogleCalendar(
                selectedCalendar,
                prestacionesDelMes,
                patients,
                (current, total) => setSyncProgress({ current, total })
            );

            alert(
                `Sincronización completada!\n\n` +
                `✓ Exitosas: ${result.success}\n` +
                `✗ Fallidas: ${result.failed}\n` +
                (result.errors.length > 0 ? `\nErrores:\n${result.errors.slice(0, 3).join('\n')}` : '')
            );

            if (onCalendarSync) {
                onCalendarSync();
            }
        } catch (error: any) {
            console.error('Error al sincronizar:', error);
            alert('Error al sincronizar: ' + error.message);
        } finally {
            setIsExporting(false);
            setSyncProgress(null);
        }
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {/* Botón de autenticación con Google */}
            {isInitialized && (
                isSignedIn ? (
                    <>
                        {/* Indicador de carga de eventos */}
                        {isLoadingEvents && (
                            <span className="flex items-center gap-2 text-sm text-blue-600">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4"/>
                                    <path d="M12 2a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="4"/>
                                </svg>
                                Cargando eventos...
                            </span>
                        )}

                        {/* Selector de calendario */}
                        {calendars.length > 0 && (
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedCalendar}
                                    onChange={(e) => {
                                        setSelectedCalendar(e.target.value);
                                        if (e.target.value === 'all') {
                                            loadAllCalendarsEvents();
                                        } else {
                                            loadGoogleEvents(e.target.value);
                                        }
                                    }}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">Seleccionar calendario...</option>
                                    <option value="all">📅 Todos los calendarios</option>
                                    <option disabled>──────────</option>
                                    {calendars.map((cal) => (
                                        <option key={cal.id} value={cal.id}>
                                            📅 {cal.summary}
                                        </option>
                                    ))}
                                </select>

                                {/* Botón de sincronización directa */}
                                <button
                                    onClick={handleSyncToGoogle}
                                    disabled={isExporting || !selectedCalendar}
                                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-md transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    title={`Exportar a ${calendars.find(c => c.id === selectedCalendar)?.summary || 'Google Calendar'}`}
                                >
                                    {isExporting && syncProgress ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {syncProgress.current}/{syncProgress.total}
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                                            </svg>
                                            Exportar
                                        </>
                                    )}
                                </button>

                                {/* Botón de cerrar sesión */}
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-1.5 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-all duration-200"
                                    title="Desconectar Google Calendar"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                    </svg>
                                    <span className="hidden sm:inline">Desconectar</span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <button
                        onClick={handleSignIn}
                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 shadow-sm"
                        title="Conectar con Google Calendar para sincronizar tus prestaciones"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="-translate-y-1">Conectar con Google Calendar</span>
                    </button>
                )
            )}

        </div>
    );
};

export default GoogleCalendarSync;
