/**
 * Statistics Calculation Utilities
 * Pure functions for statistical calculations and data processing
 */

/**
 * Safely divides two numbers, returning 0 if denominator is 0
 * @param numerator - The numerator
 * @param denominator - The denominator
 * @returns Division result or 0 if denominator is 0
 */
export const safeDivide = (numerator: number, denominator: number): number => {
  if (denominator === 0) return 0;
  return numerator / denominator;
};

/**
 * Default durations for different prestacion types (in minutes)
 */
export const PRESTACION_DURATIONS: Record<string, number> = {
  'Ingreso Multidisciplinario': 60,
  'Control de Psiquiatra': 30,
  'Control de Psicólogo': 45,
  'Visita domiciliaria': 60,
  'Receta': 15,
  'Informe médico': 20,
  'default': 25,
};

/**
 * Gets the duration for a prestacion type
 * @param tipo - Type of prestacion
 * @returns Duration in minutes
 */
export const getPrestacionDuration = (tipo: string): number => {
  return PRESTACION_DURATIONS[tipo] || PRESTACION_DURATIONS['default'];
};

/**
 * Month names in Spanish (short form)
 */
export const MONTH_NAMES_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/**
 * Month names in Spanish (full form)
 */
export const MONTH_NAMES_FULL = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/**
 * Month options for select inputs
 */
export const MONTH_OPTIONS = [
  { value: 1, label: 'Enero' }, { value: 2, label: 'Febrero' }, { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' }, { value: 5, label: 'Mayo' }, { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' }, { value: 8, label: 'Agosto' }, { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' }, { value: 11, label: 'Noviembre' }, { value: 12, label: 'Diciembre' }
];

/**
 * NSP Reasons - reasons for no-shows
 */
export const NSP_REASONS_LIST = [
  'No se presenta',
  'Cancelada por paciente',
  'Cancelada por profesional',
  'Reagendada'
];

/**
 * Gets short month label from month key (YYYY-MM)
 * @param monthKey - Month key in format YYYY-MM
 * @returns Short month name (e.g., "Ene")
 */
export const getMonthLabel = (monthKey: string): string => {
  const [, monthNum] = monthKey.split('-');
  const monthIndex = parseInt(monthNum, 10) - 1;
  return MONTH_NAMES_SHORT[monthIndex] || '';
};

/**
 * Gets full month label from month key (YYYY-MM)
 * @param monthKey - Month key in format YYYY-MM
 * @returns Full month name with year (e.g., "Enero 2024")
 */
export const getFullMonthLabel = (monthKey: string): string => {
  const [year, monthNum] = monthKey.split('-');
  const monthIndex = parseInt(monthNum, 10) - 1;
  return `${MONTH_NAMES_FULL[monthIndex]} ${year}`;
};

/**
 * Calculates KPI values from filtered prestaciones
 * @param filteredPrestaciones - Array of filtered prestaciones
 * @returns Object containing KPI values
 */
export const calculateKpiData = (filteredPrestaciones: any[]) => {
  const agendadas = filteredPrestaciones;
  const realizadas = agendadas.filter(p => p.estado === 'Realizada');
  const nsps = agendadas.filter(p => p.estado === 'NSP');
  const confirmadas = [...realizadas, ...nsps];

  const currentAsistencias = safeDivide(realizadas.length, agendadas.length);
  const currentInasistencia = safeDivide(nsps.length, confirmadas.length);

  return {
    agendadas: { value: agendadas.length },
    realizadas: { value: realizadas.length },
    asistencias: {
      value: currentAsistencias,
      numerator: realizadas.length,
      denominator: agendadas.length,
    },
    inasistencia: {
      value: currentInasistencia,
      numerator: nsps.length,
      denominator: confirmadas.length,
    },
  };
};
