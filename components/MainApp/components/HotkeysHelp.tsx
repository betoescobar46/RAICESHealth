import React from 'react';

const Kbd: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <kbd className="font-mono bg-amber-100 text-orange-900 py-0.5 px-1.5 rounded-md border border-orange-400 text-xs shadow-sm">
        {children}
    </kbd>
);

const HotkeysHelp: React.FC = () => {
    return (
        <div className="fixed bottom-4 left-4 z-50 group" title="Ver lista de atajos">
            <div className="absolute bottom-full mb-2 w-80 bg-white text-gray-900 text-xs rounded-lg p-3 shadow-xl border-2 border-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <h4 className="font-bold text-sm mb-2 border-b-2 border-orange-200 pb-1 text-orange-900">Atajos de Teclado</h4>
                <div className="space-y-2">
                    <div>
                        <p className="font-semibold text-gray-700">Navegación Global</p>
                        <ul className="list-disc list-inside ml-1 space-y-1 mt-1">
                            <li><Kbd>Alt</Kbd> + <Kbd>1-9</Kbd>: Navegar entre vistas</li>
                            <li><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>: Ir a Buscar Paciente</li>
                            <li><Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd>: Mostrar/Ocultar Menú</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Acciones Frecuentes</p>
                        <ul className="list-disc list-inside ml-1 space-y-1 mt-1">
                            <li><Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>: Guardar Prestaciones</li>
                            <li><Kbd>Alt</Kbd> + <Kbd>R</Kbd>: Registrar Actividad General</li>
                            <li><Kbd>Alt</Kbd> + <Kbd>O</Kbd>: Agregar nueva prestación</li>
                            <li><Kbd>Alt</Kbd> + <Kbd>P</Kbd>: Agregar nuevo paciente</li>
                        </ul>
                    </div>
                </div>
                <div className="absolute left-4 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}></div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-full shadow-lg border-2 border-orange-300 cursor-help hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
        </div>
    );
};

export default HotkeysHelp;
