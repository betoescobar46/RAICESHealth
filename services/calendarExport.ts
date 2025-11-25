import { Prestacion, Patient } from '../types';

/**
 * Servicio de exportación a formato iCalendar (ICS)
 * Este formato es compatible con Google Calendar, Outlook, Apple Calendar, etc.
 * No requiere autenticación - el usuario solo descarga el archivo y lo importa.
 */

/**
 * Escapa caracteres especiales para formato iCalendar
 */
const escapeICalValue = (str: string): string => {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
};

/**
 * Formatea una fecha para iCalendar (formato: YYYYMMDD)
 */
const formatDateForICal = (dateString: string): string => {
    return dateString.replace(/-/g, '');
};

/**
 * Genera un UID único para el evento
 */
const generateUID = (prestacion: Prestacion): string => {
    return `prestacion-${prestacion.id}@simorahealth.app`;
};

/**
 * Convierte una prestación a formato iCalendar (VEVENT)
 */
const prestacionToICalEvent = (prestacion: Prestacion, patient: Patient): string => {
    const uid = generateUID(prestacion);
    const summary = escapeICalValue(`${prestacion.tipo} - ${patient.nombre}`);
    const description = escapeICalValue(`
Paciente: ${patient.nombre}
RUT: ${patient.rut}
Profesional: ${prestacion.profesional}
Estado: ${prestacion.estado}
${prestacion.observaciones ? `\nObservaciones: ${prestacion.observaciones}` : ''}
    `.trim());

    const dtstart = formatDateForICal(prestacion.fecha);
    const dtend = dtstart; // Evento de día completo
    const dtstamp = formatDateForICal(new Date().toISOString().split('T')[0]);

    // Categoría basada en el tipo de prestación
    const category = prestacion.tipo.split(' ')[0]; // Ej: "Control", "Visita", etc.

    return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}T000000Z
DTSTART;VALUE=DATE:${dtstart}
DTEND;VALUE=DATE:${dtend}
SUMMARY:${summary}
DESCRIPTION:${description}
CATEGORIES:${escapeICalValue(category)}
STATUS:${prestacion.estado === 'Realizada' ? 'CONFIRMED' : 'TENTATIVE'}
TRANSP:OPAQUE
END:VEVENT`;
};

/**
 * Genera un archivo iCalendar completo con todas las prestaciones
 */
export const generateICalendarFile = (
    prestaciones: Prestacion[],
    patients: Patient[],
    calendarName: string = 'SIMORA Health - Prestaciones'
): string => {
    const events = prestaciones
        .map(p => {
            const patient = patients.find(pat => pat.id === p.pacienteId);
            if (!patient) return null;
            return prestacionToICalEvent(p, patient);
        })
        .filter(Boolean)
        .join('\n');

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SIMORA Health//Calendar Export//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${escapeICalValue(calendarName)}
X-WR-TIMEZONE:America/Santiago
X-WR-CALDESC:Prestaciones exportadas desde SIMORA Health
${events}
END:VCALENDAR`;
};

/**
 * Descarga un archivo iCalendar
 */
export const downloadICalendar = (
    prestaciones: Prestacion[],
    patients: Patient[],
    fileName: string = 'simora-prestaciones.ics'
): void => {
    const calendarContent = generateICalendarFile(prestaciones, patients);
    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Exporta prestaciones de un mes específico
 */
export const exportMonthToICalendar = (
    year: number,
    month: number,
    prestaciones: Prestacion[],
    patients: Patient[]
): void => {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const monthName = new Date(year, month).toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const prestacionesDelMes = prestaciones.filter(p =>
        p.fecha.startsWith(`${year}-${monthStr}`)
    );

    const fileName = `simora-${year}-${monthStr}.ics`;
    const calendarName = `SIMORA Health - ${monthName}`;

    const calendarContent = generateICalendarFile(prestacionesDelMes, patients, calendarName);
    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Genera un enlace de Google Calendar para importar directamente
 */
export const generateGoogleCalendarImportUrl = (
    prestaciones: Prestacion[],
    patients: Patient[]
): string => {
    const calendarContent = generateICalendarFile(prestaciones, patients);
    const encodedContent = encodeURIComponent(calendarContent);

    // Google Calendar puede importar desde una URL, pero necesitamos hostear el archivo
    // Por ahora, retornamos la URL base de Google Calendar
    return `https://calendar.google.com/calendar/r`;
};
