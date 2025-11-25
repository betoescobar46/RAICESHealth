import React, { useState, useMemo } from 'react';
import { User, Anexo } from '../types';
import { ANEXOS_DATA } from '../anexosData';

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


const AnexosView: React.FC<{ user: User }> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'recursos' | 'ayuda'>('recursos');
    const [isEditing, setIsEditing] = useState(false);
    const [anexos, setAnexos] = useState<Anexo[]>(ANEXOS_DATA);
    const [backupAnexos, setBackupAnexos] = useState<Anexo[]>(ANEXOS_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: 'funcionario' | 'mail'; direction: 'ascending' | 'descending' } | null>(null);
    const [isLinksOpen, setIsLinksOpen] = useState(false);
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

    const filteredAndSortedAnexos = useMemo(() => {
        let processedAnexos = [...anexos];

        if (searchTerm) {
            processedAnexos = processedAnexos.filter(anexo =>
                anexo.funcionario.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortConfig !== null) {
            processedAnexos.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return processedAnexos;
    }, [anexos, searchTerm, sortConfig]);

    const requestSort = (key: 'funcionario' | 'mail') => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: 'funcionario' | 'mail') => {
        if (!sortConfig || sortConfig.key !== key) return '';
        return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };

    const handleEdit = () => {
        setBackupAnexos(anexos);
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setAnexos(backupAnexos);
        setIsEditing(false);
    };

    const handleInputChange = (id: number, field: keyof Anexo, value: string) => {
        const updatedAnexos = anexos.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setAnexos(updatedAnexos);
    };

    const handleExport = () => {
        const dataToExport = filteredAndSortedAnexos.map(({ id, ...rest }) => ({
            "Funcionario(a)": rest.funcionario,
            "Mail": rest.mail,
        }));
        exportToExcel(dataToExport, "Directorio_Anexos");
    };

    const quickLinks = [
        {
            name: 'Receta Electrónica MINSAL',
            url: 'https://recetaelectronica.minsal.cl/',
            icon: '💊',
            description: 'Sistema de receta electrónica'
        },
        {
            name: 'Medipass',
            url: 'https://www.medipass.cl/',
            icon: '🏥',
            description: 'Agendamiento y gestión'
        },
        {
            name: 'FONASA',
            url: 'https://www.fonasa.cl/',
            icon: '📋',
            description: 'Fondo Nacional de Salud'
        },
        {
            name: 'DEIS MINSAL',
            url: 'https://deis.minsal.cl/',
            icon: '📊',
            description: 'Estadísticas e información'
        },
        {
            name: 'Superintendencia de Salud',
            url: 'https://www.supersalud.gob.cl/',
            icon: '⚖️',
            description: 'Superintendencia de Salud'
        },
        {
            name: 'ISP Chile',
            url: 'https://www.ispch.cl/',
            icon: '🔬',
            description: 'Instituto de Salud Pública'
        }
    ];

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('recursos')}
                    className={`px-4 py-2 font-medium transition-colors relative ${
                        activeTab === 'recursos'
                            ? 'text-slate-900'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Recursos y Contactos
                    {activeTab === 'recursos' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('ayuda')}
                    className={`px-4 py-2 font-medium transition-colors relative ${
                        activeTab === 'ayuda'
                            ? 'text-slate-900'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Ayuda
                    {activeTab === 'ayuda' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'recursos' ? (
                    <div className="space-y-4">
                        {/* Links de Uso Frecuente - Desplegable */}
                        <div>
                            <button
                                onClick={() => setIsLinksOpen(!isLinksOpen)}
                                className="flex items-center justify-between w-full px-4 py-2 font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                <span>Links de Uso Frecuente</span>
                                <svg
                                    className={`h-5 w-5 transition-transform ${isLinksOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isLinksOpen && (
                                <div className="mt-2 p-2 border border-slate-200 rounded-lg bg-white space-y-1">
                                    {quickLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between px-2 py-1 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors group"
                                        >
                                            <span className="font-medium">{link.name}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-4l6-6m0 0V2m0 4h4" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Directorio de Contactos - Desplegable */}
                        <div>
                            <button
                                onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
                                className="flex items-center justify-between w-full px-4 py-2 font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                <span>Directorio de Contactos</span>
                                <svg
                                    className={`h-5 w-5 transition-transform ${isDirectoryOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isDirectoryOpen && (
                                <div className="mt-2 p-3 border border-slate-200 rounded-lg bg-white">
                                    <div className="flex justify-between items-center mb-3 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Buscar funcionario..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="flex-1 p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                            aria-label="Buscar funcionario"
                                        />
                                        <div className="flex items-center gap-2">
                                            <ExportButton onClick={handleExport} text="Exportar" />
                                            {user.role === 'admin' && (
                                                <>
                                                    {isEditing ? (
                                                        <>
                                                            <button onClick={handleSave} className="bg-green-600 text-white font-medium py-1.5 px-3 rounded-md text-xs hover:bg-green-700">Guardar</button>
                                                            <button onClick={handleCancel} className="bg-gray-200 text-gray-800 font-medium py-1.5 px-3 rounded-md text-xs hover:bg-gray-300">Cancelar</button>
                                                        </>
                                                    ) : (
                                                        <button onClick={handleEdit} className="bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md text-xs hover:bg-blue-700">Editar</button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th onClick={() => requestSort('funcionario')} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left cursor-pointer select-none">Funcionario(a){getSortIndicator('funcionario')}</th>
                                                    <th onClick={() => requestSort('mail')} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left cursor-pointer select-none">Mail{getSortIndicator('mail')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredAndSortedAnexos.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50">
                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    value={item.funcionario}
                                                                    onChange={(e) => handleInputChange(item.id, 'funcionario', e.target.value)}
                                                                    className="w-full p-1 border rounded-md bg-white"
                                                                />
                                                            ) : (
                                                                item.funcionario
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-500 italic">
                                                            {isEditing ? (
                                                                 <input
                                                                    type="text"
                                                                    value={item.mail}
                                                                    onChange={(e) => handleInputChange(item.id, 'mail', e.target.value)}
                                                                    className="w-full p-1 border rounded-md bg-white"
                                                                    placeholder="correo@ejemplo.com"
                                                                />
                                                            ) : (
                                                               item.mail || 'No disponible'
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-zinc-600 py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">Ayuda y Documentación</h3>
                        <p className="text-sm text-gray-500 mb-4">Sección en construcción</p>
                        <div className="bg-slate-50 p-4 rounded-lg max-w-md text-left">
                            <p className="text-sm text-gray-600">
                                Para soporte técnico o consultas, por favor contacte al administrador del sistema.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnexosView;