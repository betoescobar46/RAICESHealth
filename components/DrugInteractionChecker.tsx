import React, { useState } from 'react';

interface DrugInteractionCheckerProps {
    isOpen: boolean;
    onClose: () => void;
}

const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleOpenMedscape = () => {
        window.open(
            'https://www.medscape.com/drug-interaction-checker',
            'medscape-interaction-checker',
            'width=900,height=700,left=100,top=100,resizable=yes,scrollbars=yes'
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs text-blue-600 font-semibold mb-1">Tools & Reference</p>
                        <h2 className="text-2xl font-bold text-slate-900">Drug Interaction Checker</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Medscape Interaction Checker Container */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Interaction Checker</h3>
                            <p className="text-sm text-gray-600">Search for prescription drugs, OTC medications, or herbal supplements</p>
                        </div>
                    </div>

                    {/* Placeholder Input */}
                    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-sm text-gray-500">Enter multiple medication names</span>
                    </div>

                    {/* Info text */}
                    <p className="text-xs text-gray-600 text-center">
                        Click below to open the full Medscape interaction checker in a new window
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={handleOpenMedscape}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        Abrir Medscape Interaction Checker
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DrugInteractionChecker;
