/**
 * Date Utilities
 * Provides functions for date formatting and manipulation
 */

/**
 * Converts a Date object to YYYY-MM-DD format using local time
 * @param date - Date object to convert
 * @returns String in YYYY-MM-DD format
 */
export const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a date string for display in Chilean format (DD-MM-YYYY)
 * @param dateString - Date string in YYYY-MM-DD format or ISO format
 * @returns Formatted string in DD-MM-YYYY format for es-CL locale
 */
export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';

  // Replace hyphens with slashes to ensure consistent parsing across browsers
  const date = new Date(dateString.replace(/-/g, '/'));

  // Check for invalid date
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string: ${dateString}`);
    return '';
  }

  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formats a Date object with both date and time in Chilean format
 * @param date - Date object to format
 * @returns Formatted string in DD-MM-YYYY HH:mm format
 */
export const formatDateWithTime = (date: Date): string => {
  const datePart = date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const timePart = date.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${datePart} ${timePart}`;
};

/**
 * Alias for formatDateForDisplay to maintain compatibility
 * @deprecated Use formatDateForDisplay instead
 */
export const formatDate = formatDateForDisplay;

/**
 * Calculates age from a birth date string
 * @param birthDateString - Birth date in any valid date format
 * @returns Age in years as a number, or empty string if invalid
 */
export const calculateAge = (birthDateString: string): number | string => {
  if (!birthDateString) return '';

  const birthDate = new Date(birthDateString);

  // Check for invalid date
  if (isNaN(birthDate.getTime())) {
    console.warn(`Invalid birth date: ${birthDateString}`);
    return '';
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Gets current date in YYYY-MM-DD format
 * @returns Current date string
 */
export const getCurrentDateString = (): string => {
  return getLocalDateString(new Date());
};

/**
 * Parses a date string and returns a Date object
 * Handles various formats by replacing hyphens with slashes
 * @param dateString - Date string to parse
 * @returns Date object or null if invalid
 */
export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const date = new Date(dateString.replace(/-/g, '/'));

  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string: ${dateString}`);
    return null;
  }

  return date;
};
