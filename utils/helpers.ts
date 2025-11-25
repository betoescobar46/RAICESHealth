/**
 * Helper Utilities
 * Provides common utility functions for the application
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * Useful for conditional and dynamic className composition
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// =============================================================================
// RUT VALIDATION UTILITIES
// =============================================================================

/**
 * Standardizes a Chilean RUT to the format: 00000000-0
 * Removes dots, ensures 8 digits with leading zeros, and adds hyphen before check digit
 * @param rut - RUT in any format (12345678-9, 12.345.678-9, 1234567-8, etc.)
 * @returns Standardized RUT in format 00000000-0
 * @example
 * standardizeRUT('12.345.678-9') // Returns '12345678-9'
 * standardizeRUT('1234567-8')    // Returns '01234567-8'
 */
export const standardizeRUT = (rut: string): string => {
  if (!rut) return '';

  // Remove all dots, spaces, and hyphens
  const cleaned = rut.replace(/[.\s-]/g, '').toUpperCase();

  if (cleaned.length === 0) return '';

  // Extract body (all but last character) and check digit (last character)
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  // Pad body with leading zeros to 8 digits
  const paddedBody = body.padStart(8, '0');

  // Return standardized format
  return `${paddedBody}-${dv}`;
};

/**
 * Validates a Chilean RUT using the verification digit algorithm
 * @param rut - RUT number without check digit
 * @param dv - Check digit (can be 0-9 or 'k'/'K')
 * @returns boolean indicating if RUT is valid
 * @example
 * validateRUT('12345678', '5') // Returns true if valid
 */
export const validateRUT = (rut: string, dv: string): boolean => {
  if (!rut || !dv) return false;

  let M = 0, S = 1;
  for (let T = parseInt(rut); T; T = Math.floor(T / 10)) {
    S = (S + T % 10 * (9 - M++ % 6)) % 11;
  }

  const calculatedDV = S ? String(S - 1) : 'k';
  return calculatedDV === dv.toLowerCase();
};

/**
 * Validates a complete RUT string (with or without formatting)
 * @param fullRut - Complete RUT string (e.g., '12345678-9' or '12.345.678-9')
 * @returns boolean indicating if RUT is valid
 * @example
 * validateCompleteRUT('12.345.678-5') // Returns true if valid
 */
export const validateCompleteRUT = (fullRut: string): boolean => {
  if (!fullRut) return false;

  const cleaned = fullRut.replace(/[.\s-]/g, '');
  if (cleaned.length < 2) return false;

  const rut = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  return validateRUT(rut, dv);
};

/**
 * Formats a RUT string with dots and hyphen for display
 * @param rut - RUT string in any format
 * @returns Formatted RUT (e.g., '12.345.678-9')
 * @example
 * formatRUT('123456789') // Returns '12.345.678-9'
 */
export const formatRUT = (rut: string): string => {
  if (!rut) return '';

  // First standardize the RUT
  const standardized = standardizeRUT(rut);
  if (!standardized) return '';

  // Split into body and dv
  const [body, dv] = standardized.split('-');

  // Add dots to body (every 3 digits from right to left)
  const bodyWithDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${bodyWithDots}-${dv}`;
};

// =============================================================================
// STRING UTILITIES
// =============================================================================

/**
 * Removes accents from a string (useful for search/filtering)
 * @param str - String to process
 * @returns String without accents
 * @example
 * removeAccents('José María') // Returns 'Jose Maria'
 */
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str - String to capitalize
 * @returns Capitalized string
 * @example
 * capitalizeWords('juan pérez') // Returns 'Juan Pérez'
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Sanitizes a filename by removing invalid characters
 * @param fileName - Original filename
 * @returns Safe filename for file systems
 * @example
 * sanitizeFileName('My File: Test/2024') // Returns 'My_File__Test_2024'
 */
export const sanitizeFileName = (fileName: string): string => {
  if (!fileName) return 'archivo';
  return fileName.replace(/[^a-z0-9_.-]/gi, '_');
};
