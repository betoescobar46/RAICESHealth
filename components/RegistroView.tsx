import React from 'react';

const RegistroView: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10h.01" />
            </svg>
            <h3 className="text-2xl font-semibold">Búsqueda de Pacientes</h3>
            <p className="mt-2">Seleccione un método de búsqueda en el menú de la izquierda para comenzar.</p>
        </div>
    );
};

export default RegistroView;
