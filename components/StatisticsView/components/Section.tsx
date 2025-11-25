/**
 * Section Component
 * A collapsible section component for organizing content
 */

import React, { useState } from 'react';
import ExportButton from './ExportButton';

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  isInitiallyOpen?: boolean;
  onExport?: () => void;
}

/**
 * Collapsible section component with optional export functionality
 */
const Section: React.FC<SectionProps> = ({ title, id, children, isInitiallyOpen = true, onExport }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <section id={id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="w-full flex justify-between items-center text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-grow flex items-center gap-2"
          aria-expanded={isOpen}
          aria-controls={`section-content-${id}`}
        >
          <h3 className="text-xl font-semibold">{title}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
          </svg>
        </button>
        {onExport && <ExportButton onClick={onExport} />}
      </div>
      {isOpen && <div id={`section-content-${id}`} className="mt-4">{children}</div>}
    </section>
  );
};

export default Section;
