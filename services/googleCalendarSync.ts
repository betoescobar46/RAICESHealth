/**
 * Servicio de sincronización bidireccional con Google Calendar
 * Permite leer eventos desde Google Calendar y exportar prestaciones de SIMORA
 */

import { Prestacion, Patient } from '../types';

// Configuración de la API de Google Calendar
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events';

// Variable global para almacenar el token de acceso
let accessToken: string | null = null;
let tokenClient: any = null;

export interface GoogleCalendarEvent {
    id: string;
    summary: string;
    description?: string;
    start: {
        date?: string;
        dateTime?: string;
    };
    end: {
        date?: string;
        dateTime?: string;
    };
    calendarId: string;
}

export interface CalendarList {
    id: string;
    summary: string;
    backgroundColor: string;
    selected: boolean;
}

/**
 * Inicializa el cliente de Google Identity Services
 */
export const initGoogleCalendarSync = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Verificar que exista la API de Google
        if (!window.google) {
            reject(new Error('Google Identity Services no está cargado'));
            return;
        }

        try {
            // Inicializar el cliente de token
            tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (response: any) => {
                    if (response.error) {
                        console.error('Error de autenticación:', response);
                        return;
                    }
                    accessToken = response.access_token;
                },
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Solicita autenticación del usuario
 */
export const requestAuth = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!tokenClient) {
            reject(new Error('Token client no inicializado'));
            return;
        }

        // Configurar callback temporal
        const originalCallback = tokenClient.callback;
        tokenClient.callback = (response: any) => {
            tokenClient.callback = originalCallback;
            if (response.error) {
                reject(response);
                return;
            }
            accessToken = response.access_token;
            resolve();
        };

        // Solicitar token
        if (accessToken) {
            // Ya tenemos token, verificar si es válido
            resolve();
        } else {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        }
    });
};

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
    return !!accessToken;
};

/**
 * Revoca la autenticación
 */
export const revokeAuth = (): void => {
    if (accessToken) {
        window.google.accounts.oauth2.revoke(accessToken, () => {
            console.log('Token revocado');
        });
        accessToken = null;
    }
};

/**
 * Obtiene la lista de calendarios del usuario
 */
export const getCalendarList = async (): Promise<CalendarList[]> => {
    if (!accessToken) {
        throw new Error('No autenticado');
    }

    const response = await fetch(
        'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Error al obtener lista de calendarios');
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
        id: item.id,
        summary: item.summary,
        backgroundColor: item.backgroundColor,
        selected: item.selected,
    }));
};

/**
 * Obtiene eventos de un calendario específico en un rango de fechas
 */
export const getCalendarEvents = async (
    calendarId: string,
    timeMin: string,
    timeMax: string
): Promise<GoogleCalendarEvent[]> => {
    if (!accessToken) {
        throw new Error('No autenticado');
    }

    const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    url.searchParams.append('timeMin', timeMin);
    url.searchParams.append('timeMax', timeMax);
    url.searchParams.append('singleEvents', 'true');
    url.searchParams.append('orderBy', 'startTime');

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener eventos del calendario');
    }

    const data = await response.json();
    return (data.items || []).map((item: any) => ({
        id: item.id,
        summary: item.summary,
        description: item.description,
        start: item.start,
        end: item.end,
        calendarId: calendarId,
    }));
};

/**
 * Obtiene eventos de múltiples calendarios
 */
export const getEventsFromMultipleCalendars = async (
    calendarIds: string[],
    timeMin: string,
    timeMax: string
): Promise<GoogleCalendarEvent[]> => {
    const promises = calendarIds.map((calendarId) =>
        getCalendarEvents(calendarId, timeMin, timeMax)
    );

    const results = await Promise.all(promises);
    return results.flat();
};

/**
 * Convierte un evento de Google Calendar a formato de prestación (solo para visualización)
 */
export const convertGoogleEventToPrestacion = (
    event: GoogleCalendarEvent,
    calendarName: string
): Partial<Prestacion> => {
    const fecha = event.start.date || event.start.dateTime?.split('T')[0] || '';

    return {
        id: `google-${event.id}`,
        fecha: fecha,
        tipo: calendarName,
        profesional: 'Google Calendar',
        pacienteId: 0, // ID especial para eventos de Google
        estado: 'Realizada',
        observaciones: event.description || event.summary,
    };
};

/**
 * Crea un evento en Google Calendar
 */
export const createCalendarEvent = async (
    calendarId: string,
    prestacion: Prestacion,
    patient: Patient
): Promise<void> => {
    if (!accessToken) {
        throw new Error('No autenticado');
    }

    const event = {
        summary: `${prestacion.tipo} - ${patient.nombre}`,
        description: `Paciente: ${patient.nombre}\nRUT: ${patient.rut}\nProfesional: ${prestacion.profesional}\nEstado: ${prestacion.estado}${prestacion.observaciones ? `\nObservaciones: ${prestacion.observaciones}` : ''}`,
        start: {
            date: prestacion.fecha,
            timeZone: 'America/Santiago',
        },
        end: {
            date: prestacion.fecha,
            timeZone: 'America/Santiago',
        },
        extendedProperties: {
            private: {
                simoraId: prestacion.id.toString(),
                source: 'SIMORA',
            },
        },
    };

    const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        }
    );

    if (!response.ok) {
        throw new Error('Error al crear evento en Google Calendar');
    }
};

/**
 * Exporta múltiples prestaciones a Google Calendar
 */
export const exportPrestacionesToGoogleCalendar = async (
    calendarId: string,
    prestaciones: Prestacion[],
    patients: Patient[],
    onProgress?: (current: number, total: number) => void
): Promise<{ success: number; failed: number; errors: string[] }> => {
    if (!accessToken) {
        throw new Error('No autenticado');
    }

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < prestaciones.length; i++) {
        const prestacion = prestaciones[i];
        const patient = patients.find((p) => p.id === prestacion.pacienteId);

        if (!patient) {
            failed++;
            errors.push(`Paciente no encontrado para prestación ${prestacion.id}`);
            continue;
        }

        try {
            await createCalendarEvent(calendarId, prestacion, patient);
            success++;
        } catch (error: any) {
            failed++;
            errors.push(`Error en prestación ${prestacion.id}: ${error.message}`);
        }

        if (onProgress) {
            onProgress(i + 1, prestaciones.length);
        }
    }

    return { success, failed, errors };
};

// Declarar tipos globales para TypeScript
declare global {
    interface Window {
        google: any;
    }
}
