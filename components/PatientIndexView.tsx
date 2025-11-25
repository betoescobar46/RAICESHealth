import React, { useState, useMemo } from 'react';
import type { Patient, Farmaco, User } from '../types';
import { UserPlus, X } from 'lucide-react';

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


type SortKey = 'ficha' | 'nombre';
type SortDirection = 'ascending' | 'descending';

interface SortConfig {
    key: SortKey;
    direction: SortDirection;
}

interface PatientIndexViewProps {
    patients: Patient[];
    onSelectPatient: (id: string) => void;
    allFarmacos: Farmaco[];
    allUsers: User[];
    currentUser: User;
    onUpdateUsers: (users: User[]) => void;
}

const ApsCapsule: React.FC = () => (
    <svg width="24" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <linearGradient id="capsuleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#dc2626" />
            </linearGradient>
        </defs>
        <g transform="rotate(-30 50 50)">
            <rect 
                x="15" y="35" 
                width="70" height="30" 
                rx="15" ry="15" 
                fill="url(#capsuleGradient)" 
                stroke="#4b5563"
                strokeWidth="3"
            />
        </g>
    </svg>
);


const PatientIndexView: React.FC<PatientIndexViewProps> = ({ patients, onSelectPatient, allFarmacos, allUsers, currentUser, onUpdateUsers }) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'nombre', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPool, setSelectedPool] = useState<'todos' | 'cosam' | 'extrasistema'>('todos');
    const [showTratantesDropdown, setShowTratantesDropdown] = useState<string | null>(null);
    const [pendingChanges, setPendingChanges] = useState<boolean>(false);

    // Usuarios únicos por uid (eliminar duplicados de la BD)
    const uniqueUsers = useMemo(() => {
        const seen = new Set<string>();
        return allUsers.filter(u => {
            const key = u.uid || u.username;
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [allUsers]);

    // Verificar si el usuario actual puede asignar tratantes (admin o MEDICO)
    const canAssignTratantes = currentUser.role === 'admin' || currentUser.role === 'MEDICO' || currentUser.title?.toLowerCase().includes('psiquiatra');

    // Obtener tratantes de un paciente (usuarios únicos que tienen este paciente en allowedPatients)
    // Excluye a usuarios admin (no son tratantes)
    const getTratantes = (patientId: string) => {
        const fromAllowed = uniqueUsers.filter(u =>
            u.allowedPatients?.includes(patientId) && u.role !== 'admin'
        );

        // Si el usuario actual es MEDICO/psiquiatra (NO admin), agregarlo como tratante implícito
        const currentUserKey = currentUser.uid || currentUser.username;
        const isCurrentUserIncluded = fromAllowed.some(u => (u.uid || u.username) === currentUserKey);

        if (!isCurrentUserIncluded && canAssignTratantes && currentUser.role !== 'admin') {
            // Agregar usuario actual al inicio (solo si NO es admin)
            const currentInUnique = uniqueUsers.find(u => (u.uid || u.username) === currentUserKey);
            if (currentInUnique) {
                return [currentInUnique, ...fromAllowed];
            }
        }

        return fromAllowed;
    };

    // Obtener iniciales de un usuario
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Agregar tratante a un paciente
    const handleAddTratante = (patientId: string, userUid: string) => {
        const updatedUsers = allUsers.map(u => {
            if (u.uid === userUid || u.username === userUid) {
                const currentAllowed = u.allowedPatients || [];
                if (!currentAllowed.includes(patientId)) {
                    return { ...u, allowedPatients: [...currentAllowed, patientId] };
                }
            }
            return u;
        });
        onUpdateUsers(updatedUsers);
        setPendingChanges(true);
        setShowTratantesDropdown(null);
    };

    // Remover tratante de un paciente
    const handleRemoveTratante = (patientId: string, userUid: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedUsers = allUsers.map(u => {
            if (u.uid === userUid || u.username === userUid) {
                return { ...u, allowedPatients: (u.allowedPatients || []).filter(id => id !== patientId) };
            }
            return u;
        });
        onUpdateUsers(updatedUsers);
        setPendingChanges(true);
    };

    // Obtener nombre completo del paciente
    const getFullName = (patient: Patient): string => {
        const parts = [
            patient.nombre,
            patient.apellidoPaterno,
            patient.apellidoMaterno
        ].filter(Boolean);
        return parts.join(' ');
    };

    const sortedPatients = useMemo(() => {
        let sortableItems = [...patients];

        // Filtrar por pool/origen
        if (selectedPool !== 'todos') {
            const origenFilter = selectedPool === 'cosam' ? 'COSAM' : 'EXTRASISTEMA';
            sortableItems = sortableItems.filter(patient => patient.origen === origenFilter);
        }

        // Filtrar por búsqueda
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            sortableItems = sortableItems.filter(patient => {
                const fullName = getFullName(patient).toLowerCase();
                const cleanRut = patient.rut.toLowerCase().replace(/\./g, '').replace(/-/g, '');
                const cleanTerm = term.replace(/\./g, '').replace(/-/g, '');
                return fullName.includes(term) || cleanRut.includes(cleanTerm);
            });
        }

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue: string | number;
                let bValue: string | number;

                if (sortConfig.key === 'nombre') {
                    // Ordenar por nombre completo
                    aValue = getFullName(a);
                    bValue = getFullName(b);
                } else {
                    aValue = a[sortConfig.key];
                    bValue = b[sortConfig.key];
                }

                if (sortConfig.key === 'ficha') {
                    aValue = parseInt(String(aValue), 10);
                    bValue = parseInt(String(bValue), 10);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [patients, sortConfig, searchTerm, selectedPool]);

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

    const handleExport = () => {
        const dataToExport = sortedPatients.map(p => ({
            "Ficha": p.ficha,
            "Nombre": getFullName(p),
            "RUT": p.rut,
            "Edad": p.edad,
            "Sexo": p.sexo,
            "Comuna": p.comuna,
            "Dispositivo APS": p.dispositivoAPS,
            "Diagnóstico Salud Mental": p.diagnostico.saludMental,
            "Diagnóstico Morbilidad Médica": p.diagnostico.morbilidadMedica,
            "Factores Psicosociales": p.diagnostico.factoresPsicosociales,
            "Fármacos": p.farmacos.map(f => `${f.nombre} (${f.dosis})`).join('; '),
            "Pensión Discapacidad": p.pensionDiscapacidad ? 'Sí' : 'No',
            "Credencial Discapacidad": p.credencialDiscapacidad ? 'Sí' : 'No',
            "Consumo Activo Drogas": p.consumoActivoDrogas ? 'Sí' : 'No',
        }));
        exportToExcel(dataToExport, "Indice_Pacientes_RLP");
    };

    const getStatusBadgeColor = (status: string) => {
        if (status?.includes('Realizada') || status?.includes('P3')) return 'bg-priority-p3 text-white';
        if (status?.includes('Pendiente')) return 'bg-priority-p3-obs text-white';
        if (status?.includes('restantes')) return 'bg-priority-p2 text-white';
        if (status?.includes('P1')) return 'bg-priority-p1 text-white';
        if (status?.includes('P2')) return 'bg-priority-p2 text-white';
        return 'bg-primary-400 text-white';
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-gray-800 leading-8">Índice de Pacientes</h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o RUT..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-72"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {pendingChanges && (
                        <>
                            <span className="text-sm text-orange-600 font-medium">Cambios sin guardar</span>
                            <button
                                onClick={() => {
                                    // Recargar usuarios originales (cancelar cambios)
                                    window.location.reload();
                                }}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    // Los cambios ya se enviaron via onUpdateUsers, solo limpiar el flag
                                    setPendingChanges(false);
                                }}
                                className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                            >
                                Guardar
                            </button>
                        </>
                    )}
                    <ExportButton onClick={handleExport} text="Exportar a Excel"/>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto rounded-lg border border-stone-300 shadow-sm">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-stone-100 text-stone-800 border-b border-stone-400 sticky top-0">
                        <tr style={{ height: '28px' }}>
                            <th
                                className="font-semibold text-left border-r border-stone-300 cursor-pointer hover:bg-stone-200 transition-colors select-none text-sm"
                                style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px', width: '45%' }}
                                onClick={() => requestSort('nombre')}
                            >
                                PACIENTE {getSortIndicator('nombre')}
                            </th>
                            <th className="font-semibold text-left border-r border-stone-300 text-sm" style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px', width: '25%' }}>RUT</th>
                            <th className="font-semibold text-left text-sm" style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px', width: '30%' }}>TRATANTES</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                        {sortedPatients.map((patient, idx) => {
                            const tratantes = getTratantes(patient.firestoreId);
                            const availableUsers = uniqueUsers.filter(u => {
                                const isNotAlreadyAssigned = !u.allowedPatients?.includes(patient.firestoreId);
                                const isNotAdmin = u.role?.toLowerCase() !== 'admin';
                                const isNotCurrentUser = u.uid !== currentUser.uid && u.username !== currentUser.username;
                                return isNotAlreadyAssigned && isNotAdmin && isNotCurrentUser;
                            });

                            return (
                                <tr
                                    key={patient.firestoreId}
                                    className="hover:bg-orange-50/50 transition-colors text-stone-800 cursor-pointer"
                                    onClick={() => onSelectPatient(patient.firestoreId)}
                                    style={{ height: '32px' }}
                                >
                                    <td
                                        className="border-r border-stone-200 text-sm font-medium hover:text-orange-700 transition-colors"
                                        style={{
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            paddingTop: '4px',
                                            paddingBottom: '4px',
                                            lineHeight: '1.3',
                                            verticalAlign: 'middle'
                                        }}
                                    >
                                        {getFullName(patient)}
                                    </td>
                                    <td
                                        className="border-r border-stone-200 text-sm text-stone-600 font-mono"
                                        style={{
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            paddingTop: '4px',
                                            paddingBottom: '4px',
                                            lineHeight: '1.3',
                                            verticalAlign: 'middle'
                                        }}
                                    >
                                        {patient.rut}
                                    </td>
                                    <td
                                        className="text-sm"
                                        style={{
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            paddingTop: '2px',
                                            paddingBottom: '2px',
                                            verticalAlign: 'middle'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center gap-1 flex-wrap">
                                            {tratantes.map(t => (
                                                <span
                                                    key={t.uid || t.username}
                                                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium"
                                                    title={t.name}
                                                >
                                                    {getInitials(t.name)}
                                                    {canAssignTratantes && (
                                                        <button
                                                            onClick={(e) => handleRemoveTratante(patient.firestoreId, t.uid || t.username, e)}
                                                            className="ml-0.5 hover:text-red-600"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </span>
                                            ))}
                                            {canAssignTratantes && (
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowTratantesDropdown(showTratantesDropdown === patient.firestoreId ? null : patient.firestoreId);
                                                        }}
                                                        className="p-0.5 hover:bg-orange-100 rounded text-orange-500"
                                                        title="Agregar tratante"
                                                    >
                                                        <UserPlus className="w-4 h-4" />
                                                    </button>
                                                    {showTratantesDropdown === patient.firestoreId && (
                                                        <div className="absolute left-0 top-full mt-1 bg-white border border-stone-300 rounded-lg shadow-lg z-50 min-w-[180px]">
                                                            {availableUsers.length > 0 ? (
                                                                availableUsers.map(u => (
                                                                    <button
                                                                        key={u.uid || u.username}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleAddTratante(patient.firestoreId, u.uid || u.username);
                                                                        }}
                                                                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-orange-50 first:rounded-t-lg last:rounded-b-lg"
                                                                    >
                                                                        <span className="font-medium">{getInitials(u.name)}</span>
                                                                        <span className="text-stone-500 ml-2">{u.name}</span>
                                                                    </button>
                                                                ))
                                                            ) : (
                                                                <div className="px-3 py-2 text-sm text-stone-500">
                                                                    No hay usuarios disponibles
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientIndexView;
