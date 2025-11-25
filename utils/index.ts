/**
 * Utils Barrel Export
 * Centralized export point for all utility modules
 *
 * This allows imports like:
 * import { exportToExcel, formatDateForDisplay, validateRUT } from '@/utils';
 * instead of:
 * import { exportToExcel } from '@/utils/excelUtils';
 * import { formatDateForDisplay } from '@/utils/dateUtils';
 * import { validateRUT } from '@/utils/helpers';
 */

// =============================================================================
// EXCEL UTILITIES
// =============================================================================
export {
  exportToExcel,
  isExcelExportAvailable
} from './excelUtils';

// =============================================================================
// DATE UTILITIES
// =============================================================================
export {
  getLocalDateString,
  formatDateForDisplay,
  formatDateWithTime,
  formatDate,
  calculateAge,
  getCurrentDateString,
  parseDate
} from './dateUtils';

// =============================================================================
// HELPER UTILITIES
// =============================================================================
export {
  cn,
  standardizeRUT,
  validateRUT,
  validateCompleteRUT,
  formatRUT,
  removeAccents,
  capitalizeWords,
  sanitizeFileName
} from './helpers';

// =============================================================================
// TYPE RE-EXPORTS (if needed in the future)
// =============================================================================
// Add type exports here if utility modules define types that should be accessible
