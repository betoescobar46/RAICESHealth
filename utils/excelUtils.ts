/**
 * Excel Export Utilities
 * Provides functions for exporting data to Excel format using SheetJS (XLSX)
 */

declare const XLSX: any;

/**
 * Exports data to an Excel file
 * @param data - Array of objects to export
 * @param fileName - Name for the output file (without extension)
 * @throws Alert if XLSX library is not loaded
 */
export const exportToExcel = (data: any[], fileName: string): void => {
  if (typeof XLSX === 'undefined') {
    console.error("SheetJS (XLSX) library is not loaded.");
    alert("La funcionalidad de exportación no está disponible. Contacte al administrador.");
    return;
  }

  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Sanitize filename to remove invalid characters
    const safeFileName = fileName.replace(/[^a-z0-9_.-]/gi, '_');

    XLSX.writeFile(workbook, `${safeFileName}.xlsx`);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    alert("Ocurrió un error al exportar los datos. Por favor, intente nuevamente.");
  }
};

/**
 * Checks if the XLSX library is available
 * @returns boolean indicating if XLSX is loaded
 */
export const isExcelExportAvailable = (): boolean => {
  return typeof XLSX !== 'undefined';
};
