/**
 * ExportButton Component
 * A button component for exporting data with an icon
 */

import React from 'react';

const ExportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

interface ExportButtonProps {
  onClick: () => void;
  text?: string;
}

/**
 * Export button component with icon
 */
const ExportButton: React.FC<ExportButtonProps> = ({ onClick, text = 'Exportar' }) => (
  <button onClick={onClick} className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-1 px-3 rounded-md border">
    <ExportIcon />
    {text}
  </button>
);

export default ExportButton;
