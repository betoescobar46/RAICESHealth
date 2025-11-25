import React, { useState } from 'react';
import { ThemeColor } from '../types';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: ThemeColor;
  onThemeChange: (theme: ThemeColor) => void;
}

const THEME_OPTIONS: { value: ThemeColor; label: string; colorClass: string }[] = [
  { value: 'blue', label: 'Azul', colorClass: 'bg-blue-600' },
  { value: 'purple', label: 'Morado', colorClass: 'bg-purple-600' },
  { value: 'green', label: 'Verde', colorClass: 'bg-green-600' },
  { value: 'orange', label: 'Naranja', colorClass: 'bg-orange-600' },
  { value: 'red', label: 'Rojo', colorClass: 'bg-red-600' },
  { value: 'teal', label: 'Turquesa', colorClass: 'bg-teal-600' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-2 bg-white rounded-lg shadow-xl p-3 border border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Tema de Color</div>
          <div className="grid grid-cols-2 gap-2">
            {THEME_OPTIONS.map((theme) => (
              <button
                key={theme.value}
                onClick={() => {
                  onThemeChange(theme.value);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm
                  transition-all duration-200
                  ${
                    currentTheme === theme.value
                      ? 'bg-gray-100 border-2 border-gray-400'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                <div className={`w-4 h-4 rounded-full ${theme.colorClass}`} />
                <span className="text-gray-700">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-3 rounded-full shadow-lg border-2
          transition-all duration-200
          ${isOpen ? 'bg-gradient-to-br from-orange-600 to-orange-700 border-orange-300 text-white' : 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-300 text-white'}
          hover:from-orange-600 hover:to-orange-700 hover:scale-110
        `}
        title="Cambiar tema de color"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
