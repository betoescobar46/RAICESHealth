import React, { useState, useEffect } from 'react';

const GlobalZoom = () => {
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        document.body.style.zoom = `${zoomLevel}`;
    }, [zoomLevel]);

    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.1, 2)); // Cap zoom at 200%
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Cap zoom at 50%
    };

    return (
        <div className="flex flex-row gap-1">
            <button
                onClick={zoomIn}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all duration-150"
                title="Acercar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
            <button
                onClick={zoomOut}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all duration-150"
                title="Alejar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default GlobalZoom;
