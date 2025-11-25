import React, { useState } from 'react';
import { Prestacion, Patient } from '../types';

interface GoogleCalendarSimpleProps {
    prestaciones: Prestacion[];
    patients: Patient[];
    currentYear: number;
    currentMonth: number;
}

const GoogleCalendarSimple: React.FC<GoogleCalendarSimpleProps> = ({
    prestaciones,
    patients,
    currentYear,
    currentMonth,
}) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const [calendarUrl, setCalendarUrl] = useState('');

    // Generar eventos para Google Calendar
    const generateGoogleCalendarEvents = () => {
        const monthStr = (currentMonth + 1).toString().padStart(2, '0');
        const prestacionesDelMes = prestaciones.filter(p => p.fecha.startsWith(`${currentYear}-${monthStr}`));

        const events = prestacionesDelMes.map(prestacion => {
            const patient = patients.find(p => p.id === prestacion.patientId);
            const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Paciente';

            const fechaHora = new Date(prestacion.fecha);
            const startTime = fechaHora.toISOString().replace(/-|:|\.\d\d\d/g, '');
            const endTime = new Date(fechaHora.getTime() + 30 * 60000).toISOString().replace(/-|:|\.\d\d\d/g, '');

            const title = `${patientName} - ${prestacion.prestacion}`;
            const details = `Paciente: ${patientName}%0AServicio: ${prestacion.prestacion}%0AProfesional: ${prestacion.profesional}`;

            return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${details}`;
        });

        return events;
    };

    // Abrir eventos en Google Calendar
    const handleAddToGoogleCalendar = () => {
        const events = generateGoogleCalendarEvents();

        if (events.length === 0) {
            alert('No hay prestaciones para agregar en este mes');
            return;
        }

        // Mostrar instrucciones
        setShowInstructions(true);

        // Abrir el primer evento (los demás se pueden agregar manualmente)
        if (events[0]) {
            window.open(events[0], '_blank');
        }

        // Guardar URLs para referencia
        localStorage.setItem('pendingGoogleEvents', JSON.stringify(events));
    };

    // Método alternativo: Generar archivo CSV para importar
    const handleExportCSV = () => {
        const monthStr = (currentMonth + 1).toString().padStart(2, '0');
        const prestacionesDelMes = prestaciones.filter(p => p.fecha.startsWith(`${currentYear}-${monthStr}`));

        let csv = 'Subject,Start Date,Start Time,End Date,End Time,Description,Location\n';

        prestacionesDelMes.forEach(prestacion => {
            const patient = patients.find(p => p.id === prestacion.patientId);
            const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Paciente';

            const fecha = new Date(prestacion.fecha);
            const fechaStr = fecha.toLocaleDateString('en-US');
            const horaInicio = fecha.toLocaleTimeString('en-US', { hour12: false });
            const fechaFin = new Date(fecha.getTime() + 30 * 60000);
            const horaFin = fechaFin.toLocaleTimeString('en-US', { hour12: false });

            const subject = `${patientName} - ${prestacion.prestacion}`;
            const description = `Paciente: ${patientName} | Servicio: ${prestacion.prestacion} | Profesional: ${prestacion.profesional}`;

            csv += `"${subject}","${fechaStr}","${horaInicio}","${fechaStr}","${horaFin}","${description}","Consultorio"\n`;
        });

        // Descargar archivo CSV
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `simora-calendar-${currentYear}-${monthStr}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('Archivo CSV descargado. Puedes importarlo en Google Calendar desde Configuración > Importar y exportar');
    };

    // Usar Google Calendar embebido
    const handleEmbedCalendar = () => {
        const email = prompt('Ingresa tu email de Google Calendar:');
        if (email) {
            const embedUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(email)}&ctz=America/Argentina/Buenos_Aires`;
            setCalendarUrl(embedUrl);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2 flex-wrap">
                {/* Opción 1: Agregar eventos directamente */}
                <button
                    onClick={handleAddToGoogleCalendar}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                    title="Agregar eventos a Google Calendar"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Agregar a Google Calendar</span>
                </button>

                {/* Opción 2: Exportar CSV */}
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-md transition-all duration-200"
                    title="Exportar como CSV para importar"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    <span>Exportar CSV</span>
                </button>

                {/* Opción 3: Ver calendario embebido */}
                <button
                    onClick={handleEmbedCalendar}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 hover:shadow-md transition-all duration-200"
                    title="Ver calendario embebido"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Ver Mi Calendario</span>
                </button>
            </div>

            {/* Instrucciones */}
            {showInstructions && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">✅ Evento agregado a Google Calendar</h3>
                    <p className="text-blue-700 text-sm">
                        Se abrió Google Calendar con el primer evento. Para agregar más eventos,
                        repite el proceso o usa la opción de exportar CSV para importar todos a la vez.
                    </p>
                    <button
                        onClick={() => setShowInstructions(false)}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                        Cerrar
                    </button>
                </div>
            )}

            {/* Calendario embebido */}
            {calendarUrl && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Tu Google Calendar</h3>
                        <button
                            onClick={() => setCalendarUrl('')}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕ Cerrar
                        </button>
                    </div>
                    <iframe
                        src={calendarUrl}
                        style={{ border: 0 }}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        scrolling="no"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default GoogleCalendarSimple;