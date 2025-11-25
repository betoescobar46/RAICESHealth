import React, { useState, useEffect } from 'react';

interface MatrixLabel {
  code: string;
  name: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const MatrixLabels: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle con tecla "M" (de Matrix)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) return null;

  const labels: MatrixLabel[] = [
    { code: 'NEO-001', name: 'Main Container', top: '150px', left: '50%' },
    { code: 'TRINITY-002', name: 'Header Navigation', top: '90px', left: '50%' },
    { code: 'MORPHEUS-003', name: 'Content Wrapper', top: '180px', left: '50%' },
    { code: 'CYPHER-301', name: 'Navigation Tabs', top: '120px', left: '50%' },
    { code: 'CYPHER-302', name: 'User Avatar', top: '100px', right: '200px' },
    { code: 'CYPHER-303', name: 'Action Icons', top: '100px', right: '50px' },
    { code: 'AGENT-401', name: 'HotkeysHelp', bottom: '20px', left: '20px' },
    { code: 'AGENT-402', name: 'ThemeSwitcher', bottom: '80px', left: '20px' },
  ];

  return (
    <>
      {/* Indicador de modo activo */}
      <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[9999] font-mono text-sm flex items-center gap-2 animate-pulse">
        <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
        MATRIX MODE ACTIVE
      </div>

      {/* Etiquetas flotantes */}
      {labels.map((label) => (
        <div
          key={label.code}
          className="fixed bg-black/90 text-green-400 px-3 py-2 rounded-md shadow-2xl z-[9998] font-mono text-xs border-2 border-green-500 pointer-events-none backdrop-blur-sm"
          style={{
            top: label.top,
            left: label.left,
            right: label.right,
            bottom: label.bottom,
            transform: label.left === '50%' ? 'translateX(-50%)' : undefined,
          }}
        >
          <div className="font-bold text-green-300">{label.code}</div>
          <div className="text-green-500 text-[10px]">{label.name}</div>
        </div>
      ))}

      {/* Instrucciones */}
      <div className="fixed bottom-4 right-4 bg-black/90 text-green-400 px-4 py-3 rounded-lg shadow-2xl z-[9999] font-mono text-xs border-2 border-green-500 max-w-xs">
        <div className="font-bold text-green-300 mb-2">🟢 MATRIX LABELS</div>
        <div className="space-y-1 text-[10px]">
          <div>Presiona <kbd className="bg-green-900 px-1 rounded">M</kbd> para mostrar/ocultar</div>
          <div className="text-green-600">Ver docs/MATRIX_UI_CODES.md para más info</div>
        </div>
      </div>
    </>
  );
};

export default MatrixLabels;
