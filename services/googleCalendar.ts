import { gapi } from 'gapi-script';
import { Prestacion, Patient } from '../types';

// Configuración de la API de Google Calendar
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let isInitialized = false;
let isSignedIn = false;

/**
 * Verifica si las credenciales están configuradas
 */
export const hasCredentials = (): boolean => {
    return !!(CLIENT_ID && API_KEY);
};

/**
 * Inicializa el cliente de Google API
 */
export const initGoogleCalendar = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (isInitialized) {
            resolve();
            return;
        }

        // Verificar si hay credenciales configuradas
        if (!hasCredentials()) {
            const error = new Error('No se han configurado las credenciales de Google Calendar. Consulta GOOGLE_CALENDAR_SETUP.md para obtener instrucciones.');
            console.warn(error.message);
            reject(error);
            return;
        }

        gapi.load('client:auth2', async () => {
            try {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                });

                // Escuchar cambios en el estado de autenticación
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                // Verificar estado inicial
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

                isInitialized = true;
                resolve();
            } catch (error) {
                console.error('Error al inicializar Google Calendar API:', error);
                reject(error);
            }
        });
    });
};

/**
 * Actualiza el estado de autenticación
 */
const updateSigninStatus = (signedIn: boolean) => {
    isSignedIn = signedIn;
};

/**
 * Inicia sesión en Google
 */
export const signInGoogle = async (): Promise<void> => {
    try {
        await gapi.auth2.getAuthInstance().signIn();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

/**
 * Cierra sesión en Google
 */
export const signOutGoogle = async (): Promise<void> => {
    try {
        await gapi.auth2.getAuthInstance().signOut();
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
    }
};

/**
 * Verifica si el usuario está autenticado
 */
export const isUserSignedIn = (): boolean => {
    return isSignedIn;
};

/**
 * Formatea una fecha en formato ISO para Google Calendar
 */
const formatDateForGoogle = (dateString: string, allDay: boolean = true): { date?: string; dateTime?: string; timeZone?: string } => {
    if (allDay) {
        return { date: dateString };
    }
    // Para eventos con hora específica (futuro)
    return {
        dateTime: `${dateString}T09:00:00`,
        timeZone: 'America/Santiago',
    };
};

/**
 * Convierte una prestación a un evento de Google Calendar
 */
const prestacionToGoogleEvent = (prestacion: Prestacion, patient: Patient) => {
    const eventTitle = `${prestacion.tipo} - ${patient.nombre}`;
    const eventDescription = `
Paciente: ${patient.nombre}
RUT: ${patient.rut}
Profesional: ${prestacion.profesional}
Estado: ${prestacion.estado}
${prestacion.observaciones ? `\nObservaciones: ${prestacion.observaciones}` : ''}
    `.trim();

    return {
        summary: eventTitle,
        description: eventDescription,
        start: formatDateForGoogle(prestacion.fecha),
        end: formatDateForGoogle(prestacion.fecha),
        colorId: getColorIdByTipo(prestacion.tipo),
        extendedProperties: {
            private: {
                simoraId: prestacion.id,
                prestacionTipo: prestacion.tipo,
                pacienteId: prestacion.pacienteId.toString(),
            },
        },
    };
};

/**
 * Asigna un color de Google Calendar basado en el tipo de prestación
 */
const getColorIdByTipo = (tipo: string): string => {
    const colorMap: Record<string, string> = {
        'Control de Psiquiatra': '7', // Azul cielo
        'Control de Psicólogo': '10', // Verde
        'Visita domiciliaria': '9', // Azul
        'Ingreso Multidisciplinario': '5', // Amarillo
        'Receta': '11', // Rojo
        'Informe médico': '6', // Naranja
    };
    return colorMap[tipo] || '8'; // Gris por defecto
};

/**
 * Exporta prestaciones a Google Calendar
 */
export const exportPrestacionesToGoogleCalendar = async (
    prestaciones: Prestacion[],
    patients: Patient[],
    onProgress?: (current: number, total: number) => void
): Promise<{ success: number; failed: number; errors: string[] }> => {
    if (!isSignedIn) {
        throw new Error('No está autenticado en Google Calendar');
    }

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < prestaciones.length; i++) {
        const prestacion = prestaciones[i];
        const patient = patients.find(p => p.id === prestacion.pacienteId);

        if (!patient) {
            failed++;
            errors.push(`Paciente no encontrado para prestación ${prestacion.id}`);
            continue;
        }

        try {
            const event = prestacionToGoogleEvent(prestacion, patient);
            await gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: event,
            });
            success++;
        } catch (error: any) {
            failed++;
            errors.push(`Error en prestación ${prestacion.id}: ${error.message || 'Error desconocido'}`);
        }

        if (onProgress) {
            onProgress(i + 1, prestaciones.length);
        }
    }

    return { success, failed, errors };
};

/**
 * Exporta prestaciones de un mes específico
 */
export const exportMonthToGoogleCalendar = async (
    year: number,
    month: number,
    prestaciones: Prestacion[],
    patients: Patient[],
    onProgress?: (current: number, total: number) => void
): Promise<{ success: number; failed: number; errors: string[] }> => {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const prestacionesDelMes = prestaciones.filter(p => p.fecha.startsWith(`${year}-${monthStr}`));

    return exportPrestacionesToGoogleCalendar(prestacionesDelMes, patients, onProgress);
};

/**
 * Elimina eventos de Google Calendar que correspondan a prestaciones SIMORA
 */
export const clearSIMORAEventsFromGoogle = async (
    year: number,
    month: number,
    onProgress?: (current: number, total: number) => void
): Promise<number> => {
    if (!isSignedIn) {
        throw new Error('No está autenticado en Google Calendar');
    }

    const monthStr = (month + 1).toString().padStart(2, '0');
    const timeMin = `${year}-${monthStr}-01T00:00:00Z`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const timeMax = `${year}-${monthStr}-${lastDay}T23:59:59Z`;

    try {
        const response = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin,
            timeMax,
            privateExtendedProperty: 'simoraId',
            maxResults: 2500,
        });

        const events = response.result.items || [];
        let deleted = 0;

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.id) {
                try {
                    await gapi.client.calendar.events.delete({
                        calendarId: 'primary',
                        eventId: event.id,
                    });
                    deleted++;
                } catch (error) {
                    console.error(`Error al eliminar evento ${event.id}:`, error);
                }
            }

            if (onProgress) {
                onProgress(i + 1, events.length);
            }
        }

        return deleted;
    } catch (error) {
        console.error('Error al limpiar eventos:', error);
        throw error;
    }
};

/**
 * Sincroniza prestaciones con Google Calendar (limpia y re-exporta)
 */
export const syncMonthWithGoogleCalendar = async (
    year: number,
    month: number,
    prestaciones: Prestacion[],
    patients: Patient[],
    onProgress?: (phase: string, current: number, total: number) => void
): Promise<{ success: number; failed: number; deleted: number; errors: string[] }> => {
    if (!isSignedIn) {
        throw new Error('No está autenticado en Google Calendar');
    }

    // Fase 1: Limpiar eventos existentes
    const deleted = await clearSIMORAEventsFromGoogle(year, month, (current, total) => {
        if (onProgress) onProgress('Limpiando eventos antiguos', current, total);
    });

    // Fase 2: Exportar prestaciones
    const result = await exportMonthToGoogleCalendar(year, month, prestaciones, patients, (current, total) => {
        if (onProgress) onProgress('Exportando prestaciones', current, total);
    });

    return {
        ...result,
        deleted,
    };
};
