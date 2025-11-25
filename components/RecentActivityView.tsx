import React, { useState, useMemo } from 'react';
import { Patient, Prestacion, User } from '../types';

type SortKey = 'fecha' | 'paciente' | 'tipo' | 'estado';
type SortDirection = 'ascending' | 'descending';

interface SortConfig {
    key: SortKey;
    direction: SortDirection;
}

interface RecentActivityViewProps {
    prestaciones: Prestacion[];
    patients: Patient[];
    user: User;
    onSelectPatient: (id: number) => void;
}

declare const XLSX: any;
const exportToExcel = (data: any[], fileName: string) => {
    if (typeof XLSX === 'undefined') {
        console.error("SheetJS (XLSX) library is not loaded.");
        alert("La funcionalidad de exportación no está disponible. Contacte al administrador.");
        return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    const safeFileName = fileName.replace(/[^a-z0-9_.-]/gi, '_');
    XLSX.writeFile(workbook, `${safeFileName}.xlsx`);
};

const ExportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const ExportButton: React.FC<{ onClick: () => void; text?: string }> = ({ onClick, text = 'Exportar' }) => (
    <button onClick={onClick} className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-1 px-3 rounded-md border">
        <ExportIcon />
        {text}
    </button>
);


const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
};


const RecentActivityView: React.FC<RecentActivityViewProps> = ({ prestaciones, patients, user, onSelectPatient }) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fecha', direction: 'descending' });

    const recentUserPrestaciones = useMemo(() => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        return prestaciones.filter(p => {
            const prestacionDate = new Date(p.fecha.replace(/-/g, '/')); // Correct timezone handling
            return p.profesional === user.name && prestacionDate >= thirtyDaysAgo;
        });
    }, [prestaciones, user.name]);

    const sortedPrestaciones = useMemo(() => {
        let sortableItems = [...recentUserPrestaciones];
        
        sortableItems.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            if (sortConfig.key === 'paciente') {
                aValue = patients.find(p => p.id === a.pacienteId)?.nombre || '';
                bValue = patients.find(p => p.id === b.pacienteId)?.nombre || '';
            } else if (sortConfig.key === 'fecha') {
                aValue = new Date(a.fecha.replace(/-/g, '/')).getTime();
                bValue = new Date(b.fecha.replace(/-/g, '/')).getTime();
            } else {
                aValue = a[sortConfig.key];
                bValue = b[sortConfig.key];
            }
            
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        
        return sortableItems;
    }, [recentUserPrestaciones, patients, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: SortKey) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };
    
    const estadoClasses: Record<Prestacion['estado'], string> = {
        'NSP': 'bg-red-200 text-red-800',
        'Realizada': 'bg-green-200 text-green-800',
        'Agendada': 'bg-blue-200 text-blue-800'
    };
    
    const handleExport = () => {
        // FIX: Explicitly type patientMap to ensure correct type inference for patient lookups.
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));
        const dataToExport = sortedPrestaciones.map(p => {
            const patient = patientMap.get(p.pacienteId);
            return {
                "Fecha": formatDateForDisplay(p.fecha),
                "Paciente": patient?.nombre || 'N/A',
                "RUT": patient?.rut || 'N/A',
                "Tipo Prestación": p.tipo,
                "Estado": p.estado,
                "Observaciones": p.observaciones,
            };
        });
        exportToExcel(dataToExport, `Actividad_Reciente_${user.name.replace(' ', '_')}`);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Mi Actividad Reciente (Últimos 30 días)</h3>
                <ExportButton onClick={handleExport} text="Exportar a Excel" />
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm flex-1">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th onClick={() => requestSort('fecha')} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left cursor-pointer">Fecha{getSortIndicator('fecha')}</th>
                            <th onClick={() => requestSort('paciente')} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left cursor-pointer">Paciente{getSortIndicator('paciente')}</th>
                            <th onClick={() => requestSort('tipo')} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left cursor-pointer">Tipo de Prestación{getSortIndicator('tipo')}</th>
                            <th onClick={() => requestSort('estado')} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left cursor-pointer">Estado{getSortIndicator('estado')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedPrestaciones.length > 0 ? (
                            sortedPrestaciones.map(prestacion => {
                                const patient = patients.find(p => p.id === prestacion.pacienteId);
                                return (
                                    <tr key={prestacion.id} onClick={() => onSelectPatient(prestacion.pacienteId)} className="hover:bg-gray-100 cursor-pointer">
                                        <td className="whitespace-nowrap px-4 py-2">{formatDateForDisplay(prestacion.fecha)}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{patient?.nombre || 'Paciente no encontrado'}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{prestacion.tipo}</td>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${estadoClasses[prestacion.estado] || 'bg-gray-200 text-gray-800'}`}>{prestacion.estado}</span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-500">
                                    No has registrado ninguna prestación en los últimos 30 días.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentActivityView;
