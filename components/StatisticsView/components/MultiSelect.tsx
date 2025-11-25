/**
 * MultiSelect Component
 * A dropdown component with search and multi-selection capabilities
 */

import React, { useMemo, useState, useEffect, useRef } from 'react';

interface MultiSelectProps {
  id: string;
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

/**
 * MultiSelect component with search functionality
 * Allows users to select multiple options from a list with search filtering
 */
const MultiSelect: React.FC<MultiSelectProps> = ({ id, label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() =>
    options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    ), [options, searchTerm]);

  const handleToggleAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange(options);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const getButtonLabel = () => {
    if (selected.length === 0 || selected.length === options.length) {
      return `Todos (${options.length})`;
    }
    if (selected.length === 1) {
      return selected[0];
    }
    return `${selected.length} seleccionados`;
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-left flex justify-between items-center text-sm"
      >
        <span className="truncate">{getButtonLabel()}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" /></svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-1.5 border border-gray-300 rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto p-2">
            <li>
              <label className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer font-semibold">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300"
                  checked={selected.length === options.length}
                  onChange={handleToggleAll}
                />
                <span className="ml-3 text-sm">Seleccionar Todos</span>
              </label>
            </li>
            {filteredOptions.map(option => (
              <li key={option}>
                <label className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300"
                    checked={selected.includes(option)}
                    onChange={() => {
                      const newSelected = selected.includes(option)
                        ? selected.filter(item => item !== option)
                        : [...selected, option];
                      onChange(newSelected);
                    }}
                  />
                  <span className="ml-3 text-sm truncate" title={option}>{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
