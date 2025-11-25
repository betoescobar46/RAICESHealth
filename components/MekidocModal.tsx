import React, { useState, useEffect, useRef } from 'react';

interface MekidocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MekidocModal: React.FC<MekidocModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(50);
  const [position, setPosition] = useState({ x: window.innerWidth - 620, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          handleZoomIn();
        } else if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          handleZoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          handleResetZoom();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 500));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 25));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON' && (e.target as HTMLElement).tagName !== 'svg' && (e.target as HTMLElement).tagName !== 'path') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="bg-white rounded-lg shadow-2xl h-5/6 flex flex-col pointer-events-auto absolute border border-slate-200"
        style={{
          width: '300px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-2 border-b border-gray-200 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-sm font-semibold text-gray-800">Mekidoc</h3>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Alejar"
              aria-label="Alejar zoom"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5 8a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 8z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors min-w-[45px]"
              title="Restablecer zoom"
            >
              {zoom}%
            </button>

            <button
              onClick={handleZoomIn}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Acercar"
              aria-label="Acercar zoom"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                <path d="M8 5.5a.5.5 0 01.5.5v1.5H10a.5.5 0 010 1H8.5V10a.5.5 0 01-1 0V8.5H6a.5.5 0 010-1h1.5V6a.5.5 0 01.5-.5z" />
              </svg>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors ml-1"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto relative">
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
              width: `${(100 / zoom) * 100}%`,
              height: `${(100 / zoom) * 100}%`
            }}
          >
            <iframe
              ref={iframeRef}
              src="https://mekidoc.cl/app/solicitudes"
              className="border-0"
              style={{
                width: '100%',
                height: '100%'
              }}
              title="Mekidoc Solicitudes"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MekidocModal;
