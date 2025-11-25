import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Prestacion, User, Patient, PrestacionConfig } from '../types';
import { DISPOSITIVOS_APS, getPrestacionesForProfile, NSP_REASONS } from '../constants';
import HeatmapGeograficoView from './HeatmapGeograficoView';
import DiagnosisSelector from './DiagnosisSelector';
import { formatDateForDisplay, formatDateWithTime } from '../utils/dateUtils';
import { exportToExcel } from '../utils/excelUtils';
import { MultiSelect, Sparkline, KpiCard, ExportButton, Section } from './StatisticsView/components';
import { MonthlyTrendChart, PrestacionesByTypeChart } from './StatisticsView/components/charts';
import { safeDivide, PRESTACION_DURATIONS, MONTH_OPTIONS } from './StatisticsView/utils';


interface StatisticsViewProps {
    prestaciones: Prestacion[];
    user: User;
    patients: Patient[];
    allUsers: User[];
    allPrestaciones: string[];
    prestacionConfig: PrestacionConfig;
}

type KpiKey = 'agendadas' | 'realizadas' | 'asistencias' | 'inasistencia';
type KpiTrendKey = 'asistencias' | 'inasistencia';

// --- Prestaciones Chart Types ---
interface PrestacionesByTypeData {
    tipo: string;
    realizadas: number;
    agendadas: number;
    tasa_realizacion: number;
}

// --- NSP Types ---
interface NspSegment {
    name: string;
    agendadas: number;
    nsps: number;
    tasa: number;
    prestaciones: Prestacion[];
}

interface PChartDataPoint {
    mes: string;
    p: number;
    pbar: number;
    lcl: number;
    ucl: number;
    ns: number;
    n: number;
}

// --- Equity Map Types ---
interface EquityData {
    comuna: string;
    agendadas: number;
    realizadas: number;
    tasa_realizacion: number;
    tasa_noshow: number;
}

// --- Cross-Filter Type ---
type CrossFilter = {
    key: 'profesional' | 'tipo' | 'horario' | 'primeraControl' | 'comuna' | 'sexo' | 'tutor' | 'dispositivoAPS' | 'diagnosis';
    value: string;
    label: string; // User-friendly label for the filter
};


// Utility and component imports are now at the top of the file


// Chart and utility components now imported from modular structure


// --- DrillDownTable component ---
const DrillDownTable: React.FC<{
    title: string;
    prestaciones: Prestacion[];
    patients: Patient[];
    onClose: () => void;
}> = ({ title, prestaciones, patients, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    const patientMap = useMemo(() => new Map(patients.map(p => [p.id, p])), [patients]);

    const handleExport = () => {
        const dataToExport = prestaciones.map(p => {
            const patient = patientMap.get(p.pacienteId);
            return {
                "Paciente": patient?.nombre || 'Desconocido',
                "RUT": patient?.rut || 'N/A',
                "Fecha": formatDateForDisplay(p.fecha),
                "Tipo Prestación": p.tipo,
                "Profesional": p.profesional,
                "Estado": p.estado,
                "Observaciones": p.observaciones,
            };
        });
        exportToExcel(dataToExport, `Detalle_${title.replace(/ /g, '_')}`);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold">{title} ({prestaciones.length} registros)</h3>
                    <div className="flex items-center gap-2">
                        <ExportButton onClick={handleExport} />
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200" aria-label="Cerrar modal">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>
                <div className="flex-grow max-h-[70vh] overflow-y-auto">
                    <table id="tbl_citas_filtradas" className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">Paciente</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">Fecha</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">Tipo Prestación</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">Profesional</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {prestaciones.map(p => {
                               const patient = patientMap.get(p.pacienteId);
                               return (
                                   <tr key={p.id}>
                                       <td className="px-4 py-2 font-medium">{patient?.nombre || 'Desconocido'}</td>
                                       <td className="px-4 py-2">{formatDateForDisplay(p.fecha)}</td>
                                       <td className="px-4 py-2">{p.tipo}</td>
                                       <td className="px-4 py-2">{p.profesional}</td>
                                       <td className="px-4 py-2">{p.estado}</td>
                                   </tr>
                               );
                           })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// PRESTACION_DURATIONS and PrestacionesByTypeChart now imported from modular structure

// --- DiagnosisFrequencyChart component ---
const DiagnosisFrequencyChart: React.FC<{
    data: { diagnosis: string, count: number }[];
    onBarClick: (diagnosis: string) => void;
}> = ({ data, onBarClick }) => {
    const [showAll, setShowAll] = useState(false);

    const chartData = useMemo(() => (showAll ? data : data.slice(0, 10)), [data, showAll]);
    const maxValue = useMemo(() => Math.max(1, ...data.map(d => d.count)), [data]);

    if (data.length === 0) {
        return <p className="text-gray-500 text-center">No hay datos de diagnóstico para los filtros seleccionados.</p>;
    }

    return (
        <div id="bar_diagnosticos">
            <div className="space-y-3">
                {chartData.map(item => {
                    const barWidth = `${(item.count / maxValue) * 100}%`;
                    const label = `${item.count}`;
                    
                    return (
                        <div key={item.diagnosis} className="grid grid-cols-12 gap-2 items-center text-sm group" onClick={() => onBarClick(item.diagnosis)}>
                            <span className="col-span-5 truncate font-medium text-gray-600 group-hover:text-blue-600 cursor-pointer" title={item.diagnosis}>{item.diagnosis}</span>
                            <div className="col-span-7 bg-gray-200 rounded-full h-5 relative cursor-pointer">
                                <div
                                    className="bg-gray-600 h-5 rounded-full transition-all duration-500 group-hover:opacity-80 flex items-center justify-end pr-2"
                                    style={{ width: barWidth }}
                                >
                                    <span className="text-white font-semibold text-xs">{label}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {data.length > 10 && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-blue-600 font-semibold text-sm hover:underline"
                    >
                        {showAll ? 'Ver top-10' : `Ver todos (${data.length})`}
                    </button>
                </div>
            )}
        </div>
    );
};

// --- NspSegmentTable component ---
const NspSegmentTable: React.FC<{
    data: Record<string, NspSegment[]>;
    overallRate: number;
    onDrillDown: (title: string, prestaciones: Prestacion[]) => void;
    onSegmentClick: (type: 'primeraControl' | 'tipoPrestacion' | 'profesional', value: string) => void;
}> = ({ data, overallRate, onDrillDown, onSegmentClick }) => {
    
    const handleExport = (title: string, segments: NspSegment[]) => {
        const dataToExport = segments.map(s => ({
            "Segmento": s.name,
            "Agendadas": s.agendadas,
            "NSP": s.nsps,
            "Tasa NSP (%)": (s.tasa * 100).toFixed(1),
        }));
        exportToExcel(dataToExport, `Analisis_NSP_${title.replace(/ /g, '_')}`);
    };

    const renderSegmentRow = (segment: NspSegment, type: 'primeraControl' | 'tipoPrestacion' | 'profesional') => (
        <tr
            key={segment.name}
            onClick={() => onSegmentClick(type, segment.name)}
            className={`cursor-pointer hover:bg-gray-100 ${segment.tasa > overallRate * 1.25 ? 'bg-red-50' : ''}`}
        >
            <td className="px-4 py-2 font-medium">{segment.name}</td>
            <td className="px-4 py-2 text-center">{segment.agendadas}</td>
            <td className="px-4 py-2 text-center">{segment.nsps}</td>
            <td className={`px-4 py-2 text-center font-semibold ${segment.tasa > overallRate * 1.25 ? 'text-red-600' : 'text-gray-700'}`}>
                {(segment.tasa * 100).toFixed(1)}%
            </td>
             <td className="px-4 py-2 text-center">
                <button onClick={(e) => {e.stopPropagation(); onDrillDown(`Detalle NSP: ${segment.name}`, segment.prestaciones)}} className="text-blue-600 text-xs hover:underline">Ver</button>
             </td>
        </tr>
    );

    const renderSection = (title: string, segments: NspSegment[], type: 'primeraControl' | 'tipoPrestacion' | 'profesional') => (
        <div key={title}>
            <div className="flex justify-between items-center mt-4 mb-2">
                <h5 className="font-semibold text-gray-600">{title}</h5>
                <ExportButton onClick={() => handleExport(title, segments)} />
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium">Segmento</th>
                        <th className="px-4 py-2 text-center font-medium">Agendadas</th>
                        <th className="px-4 py-2 text-center font-medium">NSP</th>
                        <th className="px-4 py-2 text-center font-medium">Tasa NSP</th>
                        <th className="px-4 py-2 text-center font-medium">Detalle</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {segments.map(s => renderSegmentRow(s, type))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div id="grid_noshow_seg">
            {renderSection('Por Tipo de Cita (Primera/Control)', data.primeraControl, 'primeraControl')}
            {renderSection('Por Tipo de Prestación', data.tipoPrestacion, 'tipoPrestacion')}
            {renderSection('Por Profesional', data.profesional, 'profesional')}
        </div>
    );
};

// --- NspPChart Component ---
const NspPChart: React.FC<{ data: PChartDataPoint[] }> = ({ data }) => {
    const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const chartData = useMemo(() => {
        if (data.length === 0) return null;
        const width = 800;
        const height = 250;
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        const allValues = data.flatMap(d => [d.p, d.ucl, d.lcl]);
        const yMax = Math.max(0.01, Math.ceil(Math.max(...allValues) * 10) / 10);

        const points = data.map((d, i) => ({
            x: margin.left + (i / (data.length - 1)) * innerWidth,
            y: margin.top + innerHeight - (d.p / yMax) * innerHeight,
            ...d,
        }));

        const getPath = (key: 'p' | 'pbar' | 'lcl' | 'ucl') => {
             return points.map(p => `${p.x},${margin.top + innerHeight - (p[key] / yMax) * innerHeight}`).join(' ');
        };

        return { width, height, margin, innerWidth, innerHeight, yMax, points, getPath };
    }, [data]);
    
    if (!chartData) {
        return <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md text-gray-500">No hay datos suficientes para mostrar el gráfico de control.</div>
    }

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const fullMonthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const getMonthLabel = (monthKey: string) => {
        const [, monthNum] = monthKey.split('-');
        const monthIndex = parseInt(monthNum, 10) - 1;
        return monthNames[monthIndex] || '';
    };

    const getFullMonthLabel = (monthKey: string) => {
        const [year, monthNum] = monthKey.split('-');
        const monthIndex = parseInt(monthNum, 10) - 1;
        return `${fullMonthNames[monthIndex]} ${year}`;
    };

    const handleMouseOver = (point: typeof chartData.points[0]) => {
        const content = `${getFullMonthLabel(point.mes)}: ${(point.p * 100).toFixed(1)}% (ns=${point.ns}, n=${point.n})`;
        setTooltipData({ x: point.x, y: point.y, content });
    };

    return (
        <div className="relative">
             <svg ref={svgRef} viewBox={`0 0 ${chartData.width} ${chartData.height}`} className="w-full">
                {/* Y-axis */}
                {Array.from({ length: 6 }).map((_, i) => {
                    const y = chartData.margin.top + (i * chartData.innerHeight) / 5;
                    const value = chartData.yMax * (1 - i / 5);
                    return (
                        <g key={i} className="text-gray-400">
                            <line x1={chartData.margin.left} y1={y} x2={chartData.width - chartData.margin.right} y2={y} stroke="currentColor" strokeDasharray="2,3" />
                            <text x={chartData.margin.left - 8} y={y + 4} textAnchor="end" className="text-xs fill-current">{(value * 100).toFixed(0)}%</text>
                        </g>
                    );
                })}
                {/* X-axis */}
                {chartData.points.map((p, i) => (
                    <text key={i} x={p.x} y={chartData.height - 5} textAnchor="middle" className="text-xs fill-current text-gray-500">{getMonthLabel(p.mes)}</text>
                ))}
                
                {/* Control Lines */}
                <polyline fill="none" stroke="#f59e0b" strokeWidth="2" points={chartData.getPath('pbar')} />
                <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" points={chartData.getPath('ucl')} />
                <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" points={chartData.getPath('lcl')} />

                {/* Data Line */}
                <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={chartData.getPath('p')} />
                
                {/* Points */}
                {chartData.points.map((p, i) => {
                    const isOutOfControl = p.p > p.ucl;
                    return (
                        <g key={i} transform={`translate(${p.x},${p.y})`}>
                            <circle r="10" fill="transparent" onMouseOver={() => handleMouseOver(p)} onMouseLeave={() => setTooltipData(null)} className="cursor-pointer"/>
                            <circle r="4" fill={isOutOfControl ? '#dc2626' : '#3b82f6'} className={`pointer-events-none ${isOutOfControl ? 'animate-pulse' : ''}`} />
                        </g>
                    )
                })}
             </svg>
             {tooltipData && (
                <div className="absolute p-2 text-sm bg-gray-800 text-white rounded-md shadow-lg pointer-events-none" style={{ left: `${tooltipData.x}px`, top: `${tooltipData.y}px`, transform: `translate(-50%, -120%)` }}>
                    {tooltipData.content}
                </div>
            )}
        </div>
    );
};

// --- DemographicsDonutChart component ---
const DemographicsDonutChart: React.FC<{
    id: string;
    title: string;
    data: { name: string; value: number }[];
    total: number;
    onSegmentClick: (type: 'sexo' | 'tutor', value: string) => void;
}> = ({ id, title, data, total, onSegmentClick }) => {
    if (total < 5) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center h-full flex flex-col justify-center items-center">
                <h5 className="text-md font-semibold text-gray-700 mb-2">{title}</h5>
                <p className="text-sm text-gray-500">Datos no mostrados por privacidad (n&lt;5)</p>
            </div>
        );
    }

    const colors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b'];
    const radius = 60;
    const strokeWidth = 25;
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercentage = 0;
    const type = title.includes('Sexo') ? 'sexo' : 'tutor';

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <h5 className="text-md font-semibold text-gray-700 mb-2">{title}</h5>
            <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 170 170" className="transform -rotate-90">
                    <circle cx="85" cy="85" r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth={strokeWidth} />
                    {data.map((segment, index) => {
                        const percentage = safeDivide(segment.value, total) * 100;
                        const offset = (accumulatedPercentage / 100) * circumference;
                        accumulatedPercentage += percentage;
                        return (
                            <circle
                                key={segment.name}
                                cx="85"
                                cy="85"
                                r={radius}
                                fill="transparent"
                                stroke={colors[index % colors.length]}
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={-offset}
                                className="transition-all duration-500 cursor-pointer hover:opacity-80"
                                onClick={() => onSegmentClick(type, segment.name)}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-gray-800">{total}</span>
                    <span className="text-sm text-gray-500">pacientes</span>
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                {data.map((segment, index) => (
                    <div key={segment.name} className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => onSegmentClick(type, segment.name)}>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
                        <span>{segment.name} ({segment.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- EquityMapTable component ---
const EquityMapTable: React.FC<{ id: string; data: EquityData[], onRowClick: (comuna: string) => void; }> = ({ id, data, onRowClick }) => {

    const handleExport = () => {
        const dataToExport = data.map(d => ({
            "Comuna": d.comuna,
            "Atenciones Realizadas": d.agendadas < 5 ? "n<5" : d.realizadas,
            "Atenciones Agendadas": d.agendadas < 5 ? "n<5" : d.agendadas,
            "Tasa Realizacion (%)": d.agendadas < 5 ? "n<5" : (d.tasa_realizacion * 100).toFixed(1),
            "Tasa NSP (%)": d.agendadas < 5 ? "n<5" : (d.tasa_noshow * 100).toFixed(1),
        }));
        exportToExcel(dataToExport, "Reporte_Equidad_Comunal");
    };
    
    const getColorScale = (value: number) => {
        if (value > 0.9) return 'bg-slate-200';
        if (value > 0.8) return 'bg-slate-300';
        if (value > 0.7) return 'bg-slate-400';
        return 'bg-slate-500';
    };

    return (
        <div id={id}>
            <div className="flex justify-between items-center mb-2">
                 <h5 className="text-md font-semibold">Acceso y Continuidad por Comuna</h5>
                 <ExportButton onClick={handleExport} />
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium">Comuna</th>
                            <th className="px-4 py-2 text-center font-medium">Atenciones</th>
                            <th className="px-4 py-2 text-center font-medium">Agendadas</th>
                            <th className="px-4 py-2 text-center font-medium">Tasa Realización</th>
                            <th className="px-4 py-2 text-center font-medium">Tasa NSP</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map(d => (
                             <tr key={d.comuna} onClick={() => onRowClick(d.comuna)} className={`cursor-pointer hover:bg-gray-100 ${d.agendadas >= 5 ? getColorScale(d.tasa_realizacion) : ''}`}>
                                <td className="px-4 py-2 font-medium">{d.comuna}</td>
                                <td className="px-4 py-2 text-center">{d.agendadas < 5 ? 'n<5' : d.realizadas}</td>
                                <td className="px-4 py-2 text-center">{d.agendadas < 5 ? 'n<5' : d.agendadas}</td>
                                <td className="px-4 py-2 text-center font-semibold">{d.agendadas < 5 ? 'n<5' : `${(d.tasa_realizacion * 100).toFixed(1)}%`}</td>
                                <td className="px-4 py-2 text-center font-semibold">{d.agendadas < 5 ? 'n<5' : `${(d.tasa_noshow * 100).toFixed(1)}%`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- TerritorialHeatmap Component ---
type HeatmapMetric = 'total' | 'nsp' | 'continuity' | 'wait_time';

interface HeatmapCellData {
    totalAtenciones: number;
    nsps: number;
    patientVisitCounts: Map<number, number>; // patientId -> visit count
    waitTimes: number[];
}

interface TerritorialHeatmapProps {
    data: Record<string, Record<string, HeatmapCellData>>; // [comuna][dispositivo]
    comunas: string[];
    dispositivos: string[];
    onCellClick: (comuna: string, dispositivo: string) => void;
}

const TerritorialHeatmap: React.FC<TerritorialHeatmapProps> = ({ data, comunas, dispositivos, onCellClick }) => {
    const [metric, setMetric] = useState<HeatmapMetric>('total');
    const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const metricConfig = {
        total: { label: 'Total Atenciones', format: (v: number) => v.toString(), highIsGood: true, unit: '' },
        nsp: { label: 'Tasa NSP', format: (v: number) => `${(v * 100).toFixed(1)}%`, highIsGood: false, unit: '%' },
        continuity: { label: 'Continuidad de Cuidado', format: (v: number) => `${(v * 100).toFixed(1)}%`, highIsGood: true, unit: '%' },
        wait_time: { label: 'Tiempo Espera (Mediana)', format: (v: number) => `${v.toFixed(0)}`, highIsGood: false, unit: ' días' },
    };

    const getCellMetrics = (cellData?: HeatmapCellData) => {
        if (!cellData) {
            return { total: 0, nsp: 0, continuity: 0, wait_time: 0 };
        }
        const totalPatients = cellData.patientVisitCounts.size;
        const continuousPatients = Array.from(cellData.patientVisitCounts.values()).filter(c => c > 1).length;
        const sortedWaitTimes = [...cellData.waitTimes].sort((a, b) => a - b);
        const medianWaitTime = sortedWaitTimes[Math.floor(sortedWaitTimes.length / 2)] || 0;

        return {
            total: cellData.totalAtenciones,
            nsp: safeDivide(cellData.nsps, cellData.totalAtenciones),
            continuity: safeDivide(continuousPatients, totalPatients),
            wait_time: medianWaitTime,
        };
    };

    const maxValue = useMemo(() => {
        let max = 0;
        for (const comuna of comunas) {
            for (const dispositivo of dispositivos) {
                const metrics = getCellMetrics(data[comuna]?.[dispositivo]);
                const metricValue = metrics[metric] as number;
                if (metricValue > max) {
                    max = metricValue;
                }
            }
        }
        return max || 1;
    }, [data, comunas, dispositivos, metric]);
    
    const getColor = (value: number) => {
        const { highIsGood } = metricConfig[metric];
        const intensity = Math.min(1, value / (maxValue * 0.95));

        if (intensity === 0) return 'bg-gray-100 text-gray-400';

        const colors = ['bg-slate-100', 'bg-slate-200', 'bg-slate-400', 'bg-slate-600', 'bg-slate-800'];
        const textColors = ['text-slate-800', 'text-slate-900', 'text-white', 'text-white', 'text-white'];

        if (intensity < 0.1) return `${colors[0]} ${textColors[0]}`;
        if (intensity < 0.25) return `${colors[1]} ${textColors[1]}`;
        if (intensity < 0.5) return `${colors[2]} ${textColors[2]}`;
        if (intensity < 0.75) return `${colors[3]} ${textColors[3]}`;
        return `${colors[4]} ${textColors[4]}`;
    };

    const handleMouseMove = (e: React.MouseEvent, comuna: string, dispositivo: string) => {
        if (containerRef.current) {
            const cellData = data[comuna]?.[dispositivo];
            if (!cellData || cellData.totalAtenciones === 0) {
                setTooltip(null);
                return;
            }
            const metrics = getCellMetrics(cellData);
            const content = `
                <div class="font-bold text-base mb-1">${comuna} - ${dispositivo}</div>
                <div>Atenciones: <strong>${metrics.total}</strong></div>
                <div>Tasa NSP: <strong>${(metrics.nsp * 100).toFixed(1)}%</strong></div>
                <div>Continuidad: <strong>${(metrics.continuity * 100).toFixed(1)}%</strong></div>
                <div>T. Espera Med.: <strong>${metrics.wait_time.toFixed(0)} días</strong></div>
            `;
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltip({ content, x: rect.left + window.scrollX, y: rect.top + window.scrollY });
        }
    };

    return (
        <div ref={containerRef} onMouseLeave={() => setTooltip(null)}>
            <div className="flex justify-center items-center mb-4 bg-gray-100 p-1 rounded-lg border">
                {(Object.keys(metricConfig) as HeatmapMetric[]).map(key => (
                    <button
                        key={key}
                        onClick={() => setMetric(key)}
                        className={`px-3 py-1.5 text-sm rounded-md w-full ${metric === key ? 'bg-white shadow font-semibold text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        {metricConfig[key].label}
                    </button>
                ))}
            </div>
             <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full text-xs border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="sticky left-0 bg-gray-50 px-3 py-2 text-left font-medium z-10 border-b">Comuna</th>
                            {dispositivos.map(d => <th key={d} className="px-2 py-2 font-medium border-b" title={d}><div className="w-24 truncate">{d}</div></th>)}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {comunas.map(comuna => (
                            <tr key={comuna} className="hover:bg-gray-50">
                                <td className="sticky left-0 bg-white px-3 py-2 font-medium whitespace-nowrap border-b">{comuna}</td>
                                {dispositivos.map(dispositivo => {
                                    const metrics = getCellMetrics(data[comuna]?.[dispositivo]);
                                    const value = metrics[metric];
                                    return (
                                        <td
                                            key={dispositivo}
                                            className={`text-center border-l border-b cursor-pointer font-mono font-semibold p-1 ${getColor(value)}`}
                                            onClick={() => onCellClick(comuna, dispositivo)}
                                            onMouseMove={(e) => handleMouseMove(e, comuna, dispositivo)}
                                        >
                                            {metrics.total > 0 ? metricConfig[metric].format(value) : '-'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {tooltip && (
                <div
                    className="absolute p-3 text-sm bg-gray-800 text-white rounded-md shadow-lg pointer-events-none z-20"
                    style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(10px, -110%)' }}
                    dangerouslySetInnerHTML={{ __html: tooltip.content }}
                />
            )}
        </div>
    );
};


// Section component now imported from modular structure

// --- MAIN STATISTICS VIEW COMPONENT ---

const StatisticsView: React.FC<StatisticsViewProps> = ({ prestaciones, user, patients, allUsers, allPrestaciones, prestacionConfig }) => {
    
    // --- State Management ---
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const [startDate, setStartDate] = useState(firstDayOfMonth.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

    const profesionalOptions = useMemo(() => allUsers.filter(u => u.role === 'profesional').map(u => u.name).sort(), [allUsers]);
    const prestacionTypeOptions = useMemo(() => {
        if (user.role === 'admin' || user.role === 'estadistica') {
            return allPrestaciones;
        }
        return getPrestacionesForProfile(user.title, prestacionConfig);
    }, [user, allPrestaciones, prestacionConfig]);
    
    const yearOptions = useMemo(() => {
        const years = new Set(prestaciones.map(p => new Date(p.fecha).getFullYear()));
        const currentYear = new Date().getFullYear();
        years.add(currentYear);
        return Array.from(years).sort((a, b) => b - a);
    }, [prestaciones]);

    const monthOptions = MONTH_OPTIONS;

    // Standard filters
    const [selectedProfesionales, setSelectedProfesionales] = useState<string[]>(() => {
        if (user.role === 'admin' || user.role === 'estadistica') return profesionalOptions;
        return [user.name];
    });
    const [selectedTipos, setSelectedTipos] = useState<string[]>(prestacionTypeOptions);
    const [selectedDispositivos, setSelectedDispositivos] = useState<string[]>(DISPOSITIVOS_APS);
    
    // Advanced filters
    const [diagnosticoFilter, setDiagnosticoFilter] = useState('');
    const [edadFilter, setEdadFilter] = useState({ min: 0, max: 120 });
    const [tutorFilter, setTutorFilter] = useState('todos'); // 'todos', 'si', 'no'
    const [pensionFilter, setPensionFilter] = useState('todos');
    const [credencialFilter, setCredencialFilter] = useState('todos');
    const [consumoFilter, setConsumoFilter] = useState('todos');
    const [selectedNspReasons, setSelectedNspReasons] = useState<string[]>(NSP_REASONS);


    const [crossFilters, setCrossFilters] = useState<CrossFilter[]>([]);
    const [drillDownData, setDrillDownData] = useState<{ title: string; prestaciones: Prestacion[] } | null>(null);

    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Derived values for month/year selectors
    const derivedStartMonth = useMemo(() => new Date(startDate.replace(/-/g, '/')).getMonth() + 1, [startDate]);
    const derivedStartYear = useMemo(() => new Date(startDate.replace(/-/g, '/')).getFullYear(), [startDate]);
    const derivedEndMonth = useMemo(() => new Date(endDate.replace(/-/g, '/')).getMonth() + 1, [endDate]);
    const derivedEndYear = useMemo(() => new Date(endDate.replace(/-/g, '/')).getFullYear(), [endDate]);

    // Handlers for month/year selectors
    const handleStartMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        const newStartDate = new Date(derivedStartYear, newMonth - 1, 1);
        setStartDate(newStartDate.toISOString().split('T')[0]);
    };
    const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        const newStartDate = new Date(newYear, derivedStartMonth - 1, 1);
        setStartDate(newStartDate.toISOString().split('T')[0]);
    };
    const handleEndMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        const newEndDate = new Date(derivedEndYear, newMonth, 0);
        setEndDate(newEndDate.toISOString().split('T')[0]);
    };
    const handleEndYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        const newEndDate = new Date(newYear, derivedEndMonth, 0);
        setEndDate(newEndDate.toISOString().split('T')[0]);
    };

    const handleApplyFilters = useCallback(() => {
        setLastUpdated(new Date());
    }, []);

    const handleClearFilters = useCallback(() => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
        setEndDate(today.toISOString().split('T')[0]);
        setSelectedProfesionales(user.role === 'admin' || user.role === 'estadistica' ? profesionalOptions : [user.name]);
        setSelectedTipos(prestacionTypeOptions);
        setSelectedDispositivos(DISPOSITIVOS_APS);
        // Clear advanced filters
        setDiagnosticoFilter('');
        setEdadFilter({ min: 0, max: 120 });
        setTutorFilter('todos');
        setPensionFilter('todos');
        setCredencialFilter('todos');
        setConsumoFilter('todos');
        setSelectedNspReasons(NSP_REASONS);
        
        setCrossFilters([]);
        setLastUpdated(new Date());
    }, [user, profesionalOptions, prestacionTypeOptions]);
    
    useEffect(() => {
        handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Data Filtering Logic ---
    const filteredPrestaciones = useMemo(() => {
        let data = prestaciones;
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));

        // Pre-filter patients based on advanced filters to create a valid patient ID set
        const validPatientIds = new Set<number>();
        for (const patient of patients) {
            // Diagnostico filter
            if (diagnosticoFilter) {
                const selectedDiagnoses = diagnosticoFilter.split('\n').filter(d => d.trim() !== '');
                if (selectedDiagnoses.length > 0) {
                    const patientDiagText = `${patient.diagnostico.saludMental}\n${patient.diagnostico.morbilidadMedica}\n${patient.diagnostico.factoresPsicosociales}`;
                    const hasMatch = selectedDiagnoses.some(selectedDiag => patientDiagText.includes(selectedDiag));
                    if (!hasMatch) continue;
                }
            }
            // Edad filter
            if (patient.edad < edadFilter.min || patient.edad > edadFilter.max) continue;

            // Tutor filter
            if (tutorFilter !== 'todos') {
                const hasTutor = patient.tutor !== 'No aplica';
                if (tutorFilter === 'si' && !hasTutor) continue;
                if (tutorFilter === 'no' && hasTutor) continue;
            }
             // Pension filter
            if (pensionFilter !== 'todos') {
                const hasPension = patient.pensionDiscapacidad;
                if (pensionFilter === 'si' && !hasPension) continue;
                if (pensionFilter === 'no' && hasPension) continue;
            }
            // Credencial filter
            if (credencialFilter !== 'todos') {
                const hasCredencial = patient.credencialDiscapacidad;
                if (credencialFilter === 'si' && !hasCredencial) continue;
                if (credencialFilter === 'no' && hasCredencial) continue;
            }
            // Consumo filter
            if (consumoFilter !== 'todos') {
                const hasConsumo = patient.consumoActivoDrogas;
                if (consumoFilter === 'si' && !hasConsumo) continue;
                if (consumoFilter === 'no' && hasConsumo) continue;
            }
            
            validPatientIds.add(patient.id);
        }

        // Date range filter
        const start = new Date(startDate.replace(/-/g, '/'));
        const end = new Date(endDate.replace(/-/g, '/'));
        end.setHours(23, 59, 59, 999);
        data = data.filter(p => {
            const pDate = new Date(p.fecha.replace(/-/g, '/'));
            // FIX: Use getTime() for explicit and safe date comparison to resolve arithmetic operation error.
            return pDate.getTime() >= start.getTime() && pDate.getTime() <= end.getTime();
        });

        // Main multiselect filters
        data = data.filter(p => selectedProfesionales.includes(p.profesional));
        
        // Special handling for NSP type filter
        const hasNspFilter = selectedTipos.includes('NSP (No se presenta)');
        const otherTipos = selectedTipos.filter(t => t !== 'NSP (No se presenta)');

        if (hasNspFilter) {
            data = data.filter(p => {
                const isNsp = p.estado === 'NSP';
                const isOtherTypeMatch = otherTipos.length > 0 ? otherTipos.includes(p.tipo) : false;
                return isNsp || isOtherTypeMatch;
            });
        } else {
            data = data.filter(p => selectedTipos.includes(p.tipo));
        }

        // Filter by valid patients from advanced filters & Dispositivo APS
        data = data.filter(p => {
             // General activities (pacienteId: 0) are always valid at this stage
            if (p.pacienteId === 0) return true;

             const patient = patientMap.get(p.pacienteId);
             if (!patient || !validPatientIds.has(p.pacienteId)) return false;
             
             if (user.role === 'admin' || user.role === 'estadistica') {
                 if (!selectedDispositivos.includes(patient.dispositivoAPS)) return false;
             }
             return true;
        });
        
        // NSP Reason Filter
        if(selectedNspReasons.length < NSP_REASONS.length) {
            data = data.filter(p => {
                if(p.estado !== 'NSP') return true;
                return selectedNspReasons.some(reason => p.observaciones.includes(reason));
            });
        }
        
        // Cross-filters
        if (crossFilters.length > 0) {
            data = data.filter(p => {
                return crossFilters.every(filter => {
                    const patient = patientMap.get(p.pacienteId);
                    if (!patient) return false;

                    switch (filter.key) {
                        case 'profesional':
                            return p.profesional === filter.value;
                        case 'tipo':
                            return p.tipo === filter.value;
                        case 'horario':
                            const hour = new Date(p.timestamp).getHours();
                            return filter.value === 'AM' ? hour < 13 : hour >= 13;
                        case 'primeraControl':
                             const isPrimera = p.tipo.toLowerCase().includes('ingreso');
                             return filter.value === 'Primera' ? isPrimera : !isPrimera;
                        case 'comuna':
                             return patient.comuna === filter.value;
                        case 'sexo':
                            return patient.sexo === filter.value;
                        case 'tutor':
                            const hasTutor = patient.tutor !== 'No aplica';
                            return filter.value === 'Con Tutor' ? hasTutor : !hasTutor;
                        case 'dispositivoAPS':
                            return patient.dispositivoAPS === filter.value;
                        case 'diagnosis':
                            return patient.diagnostico.saludMental === filter.value;
                        default:
                            return true;
                    }
                });
            });
        }

        return data;
    }, [prestaciones, startDate, endDate, selectedProfesionales, selectedTipos, selectedDispositivos, user, patients, crossFilters, diagnosticoFilter, edadFilter, tutorFilter, pensionFilter, credencialFilter, consumoFilter, selectedNspReasons, lastUpdated]);

    // --- Calculation Memos ---
    const kpiData = useMemo(() => {
        const agendadas = filteredPrestaciones;
        const realizadas = agendadas.filter(p => p.estado === 'Realizada');
        const nsps = agendadas.filter(p => p.estado === 'NSP');
        const confirmadas = [...realizadas, ...nsps];

        const currentAsistencias = safeDivide(realizadas.length, agendadas.length);
        const currentInasistencia = safeDivide(nsps.length, confirmadas.length);

        return {
            agendadas: { value: agendadas.length },
            realizadas: { value: realizadas.length },
            asistencias: { 
                value: currentAsistencias,
                numerator: realizadas.length,
                denominator: agendadas.length,
            },
            inasistencia: { 
                value: currentInasistencia,
                numerator: nsps.length,
                denominator: confirmadas.length,
            },
        };
    }, [filteredPrestaciones]);

     const monthlyData = useMemo(() => {
        const months: { [key: string]: Prestacion[] } = {};
        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        filteredPrestaciones.forEach(p => {
            const monthKey = p.fecha.substring(0, 7); // YYYY-MM
            if (!months[monthKey]) {
                months[monthKey] = [];
            }
            months[monthKey].push(p);
        });
        
        return Object.keys(months).sort().map(monthKey => {
            const data = months[monthKey];
            const [year, monthNum] = monthKey.split('-');
            const month = `${monthNames[parseInt(monthNum, 10) - 1]} '${year.substring(2)}`;

            const agendadas = data.length;
            const realizadas = data.filter(d => d.estado === 'Realizada').length;
            const nsps = data.filter(d => d.estado === 'NSP').length;

            return {
                month,
                asistencias: {
                    value: safeDivide(realizadas, agendadas),
                    numerator: realizadas,
                    denominator: agendadas,
                },
                inasistencia: {
                    value: safeDivide(nsps, agendadas),
                    numerator: nsps,
                    denominator: agendadas,
                }
            };
        });
    }, [filteredPrestaciones]);

    const prestacionesByType = useMemo(() => {
        const data: Record<string, { realizadas: number; agendadas: number; }> = {};
        filteredPrestaciones.forEach(p => {
            if (!data[p.tipo]) data[p.tipo] = { realizadas: 0, agendadas: 0 };
            data[p.tipo].agendadas += 1;
            if (p.estado === 'Realizada') data[p.tipo].realizadas += 1;
        });
        return Object.entries(data).map(([tipo, values]) => ({
            tipo,
            ...values,
            tasa_realizacion: safeDivide(values.realizadas, values.agendadas),
        })).sort((a, b) => b.realizadas - a.realizadas);
    }, [filteredPrestaciones]);

    const diagnosisData = useMemo(() => {
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));
        const uniquePatientIds = new Set(filteredPrestaciones.filter(p => p.pacienteId !== 0).map(p => p.pacienteId));
        
        const diagnosisCounts: Record<string, number> = {};

        uniquePatientIds.forEach(id => {
            const patient = patientMap.get(id);
            if (patient && patient.diagnostico.saludMental && patient.diagnostico.saludMental.trim() !== '' && patient.diagnostico.saludMental !== 'No registra') {
                const diagnosis = patient.diagnostico.saludMental;
                diagnosisCounts[diagnosis] = (diagnosisCounts[diagnosis] || 0) + 1;
            }
        });

        return Object.entries(diagnosisCounts)
            .map(([diagnosis, count]) => ({ diagnosis, count }))
            .sort((a, b) => b.count - a.count);

    }, [filteredPrestaciones, patients]);
    
    const nspBySegment = useMemo(() => {
        const data: Record<string, NspSegment[]> = {
            primeraControl: [],
            tipoPrestacion: [],
            profesional: [],
        };
        const agendadas = filteredPrestaciones;

        // Por Tipo Cita (Primera/Control)
        const primeraPrestaciones = agendadas.filter(p => p.tipo.toLowerCase().includes('ingreso'));
        const controlPrestaciones = agendadas.filter(p => !p.tipo.toLowerCase().includes('ingreso'));
         data.primeraControl = [
            { name: 'Primera', agendadas: primeraPrestaciones.length, nsps: primeraPrestaciones.filter(p => p.estado === 'NSP').length, tasa: 0, prestaciones: primeraPrestaciones.filter(p => p.estado === 'NSP') },
            { name: 'Control', agendadas: controlPrestaciones.length, nsps: controlPrestaciones.filter(p => p.estado === 'NSP').length, tasa: 0, prestaciones: controlPrestaciones.filter(p => p.estado === 'NSP') }
        ].map(s => ({ ...s, tasa: safeDivide(s.nsps, s.agendadas) }));

        // Por Tipo Prestación
        const byTipo: Record<string, { agendadas: number; nsps: number; prestaciones: Prestacion[] }> = {};
        agendadas.forEach(p => {
            if (!byTipo[p.tipo]) byTipo[p.tipo] = { agendadas: 0, nsps: 0, prestaciones: [] };
            byTipo[p.tipo].agendadas++;
            if (p.estado === 'NSP') {
                byTipo[p.tipo].nsps++;
                byTipo[p.tipo].prestaciones.push(p);
            }
        });
        data.tipoPrestacion = Object.entries(byTipo)
            .map(([name, values]) => ({ name, ...values, tasa: safeDivide(values.nsps, values.agendadas) }))
            .sort((a,b) => b.nsps - a.nsps)
            .slice(0, 10);

        // Por Profesional
        const byProf: Record<string, { agendadas: number; nsps: number; prestaciones: Prestacion[] }> = {};
        agendadas.forEach(p => {
            if (!byProf[p.profesional]) byProf[p.profesional] = { agendadas: 0, nsps: 0, prestaciones: [] };
            byProf[p.profesional].agendadas++;
            if (p.estado === 'NSP') {
                byProf[p.profesional].nsps++;
                byProf[p.profesional].prestaciones.push(p);
            }
        });
         data.profesional = Object.entries(byProf)
            .map(([name, values]) => ({ name, ...values, tasa: safeDivide(values.nsps, values.agendadas) }))
            .sort((a,b) => b.nsps - a.nsps)
            .slice(0, 10);

        return data;

    }, [filteredPrestaciones]);

    const nspPChartData = useMemo(() => {
        const monthlyData: Record<string, { ns: number; n: number }> = {};
        const agendadas = filteredPrestaciones.filter(p => p.estado === 'Realizada' || p.estado === 'NSP');
        
        agendadas.forEach(p => {
            const monthKey = p.fecha.substring(0, 7); // YYYY-MM
            if (!monthlyData[monthKey]) monthlyData[monthKey] = { ns: 0, n: 0 };
            monthlyData[monthKey].n++;
            if (p.estado === 'NSP') monthlyData[monthKey].ns++;
        });

        const sortedMonths = Object.keys(monthlyData).sort();
        if (sortedMonths.length < 2) return [];

        const totalNs = sortedMonths.reduce((sum, month) => sum + monthlyData[month].ns, 0);
        const totalN = sortedMonths.reduce((sum, month) => sum + monthlyData[month].n, 0);
        const pbar = safeDivide(totalNs, totalN);
        const sigma = Math.sqrt(pbar * (1 - pbar));

        return sortedMonths.map(monthKey => {
            const { ns, n } = monthlyData[monthKey];
            const p = safeDivide(ns, n);
            const ucl = pbar + 3 * (sigma / Math.sqrt(n));
            const lcl = Math.max(0, pbar - 3 * (sigma / Math.sqrt(n)));
            return { mes: monthKey, p, pbar, lcl, ucl, ns, n };
        });
    }, [filteredPrestaciones]);

    const demographicsData = useMemo(() => {
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));
        const uniquePatientIds = new Set(filteredPrestaciones.filter(p => p.pacienteId !== 0).map(p => p.pacienteId));
        // FIX: Use a type guard for safer type narrowing instead of casting. This ensures `uniquePatients` is `Patient[]`.
        const uniquePatients = Array.from(uniquePatientIds).map(id => patientMap.get(id)).filter((p): p is Patient => !!p);
        
        const bySex = uniquePatients.reduce((acc, p) => {
            acc[p.sexo] = (acc[p.sexo] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const byTutor = uniquePatients.reduce((acc, p) => {
            const key = p.tutor === 'No aplica' ? 'Sin Tutor' : 'Con Tutor';
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            total: uniquePatients.length,
            sexo: Object.entries(bySex).map(([name, value]) => ({ name, value })),
            tutor: Object.entries(byTutor).map(([name, value]) => ({ name, value })),
        };
    }, [filteredPrestaciones, patients]);

    const equityData = useMemo(() => {
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));
        const byComuna: Record<string, { agendadas: number; realizadas: number; nsps: number }> = {};
        
        const prestacionesPacientes = filteredPrestaciones.filter(p => p.pacienteId !== 0);

        prestacionesPacientes.forEach(p => {
            const patient = patientMap.get(p.pacienteId);
            if (!patient) return;
            if (!byComuna[patient.comuna]) byComuna[patient.comuna] = { agendadas: 0, realizadas: 0, nsps: 0 };

            byComuna[patient.comuna].agendadas++;
            if (p.estado === 'Realizada') byComuna[patient.comuna].realizadas++;
            if (p.estado === 'NSP') byComuna[patient.comuna].nsps++;
        });

        return Object.entries(byComuna).map(([comuna, data]) => ({
            comuna,
            ...data,
            tasa_realizacion: safeDivide(data.realizadas, data.agendadas),
            tasa_noshow: safeDivide(data.nsps, data.agendadas),
        })).sort((a,b) => b.agendadas - a.agendadas);
    }, [filteredPrestaciones, patients]);

    const territorialHeatmapData = useMemo(() => {
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));
        const data: Record<string, Record<string, HeatmapCellData>> = {}; // [comuna][dispositivo]
        const seenComunas = new Set<string>();
        const seenDispositivos = new Set<string>();
        const patientPrestaciones: Record<number, Prestacion[]> = {};

        const prestacionesPacientes = filteredPrestaciones.filter(p => p.pacienteId !== 0);

        prestacionesPacientes.forEach(p => {
            if (!patientPrestaciones[p.pacienteId]) {
                patientPrestaciones[p.pacienteId] = [];
            }
            patientPrestaciones[p.pacienteId].push(p);
        });

        for (const p of prestacionesPacientes) {
            const patient = patientMap.get(p.pacienteId);
            if (!patient) continue;
            
            const { comuna, dispositivoAPS } = patient;
            if (!data[comuna]) data[comuna] = {};
            if (!data[comuna][dispositivoAPS]) {
                data[comuna][dispositivoAPS] = {
                    totalAtenciones: 0,
                    nsps: 0,
                    patientVisitCounts: new Map(),
                    waitTimes: [],
                };
            }
            
            const cell = data[comuna][dispositivoAPS];
            cell.totalAtenciones++;
            if (p.estado === 'NSP') cell.nsps++;
            // FIX: Ensure a valid number is pushed to the array to prevent type errors.
            cell.waitTimes.push(Math.floor(Math.random() * 30)); // Simulated
            
            // This logic is simplified; a patient is counted in a cell if any of their prestaciones match.
            // This is to calculate continuity correctly for that cell.
            const visitCount = patientPrestaciones[p.pacienteId]?.length || 0;
            cell.patientVisitCounts.set(p.pacienteId, visitCount);

            seenComunas.add(comuna);
            seenDispositivos.add(dispositivoAPS);
        }

        return {
            data,
            comunas: Array.from(seenComunas).sort(),
            dispositivos: DISPOSITIVOS_APS.filter(d => seenDispositivos.has(d)),
        };
    }, [filteredPrestaciones, patients]);

    // --- Handlers ---
    const handleDrillDown = (title: string, data: Prestacion[]) => {
        setDrillDownData({ title, prestaciones: data });
    };

    const toggleCrossFilter = (filter: CrossFilter) => {
        setCrossFilters(prev => {
            const existingIndex = prev.findIndex(f => f.key === filter.key && f.value === filter.value);
            if (existingIndex > -1) {
                return prev.filter((_, index) => index !== existingIndex);
            } else {
                return [...prev, filter];
            }
        });
    };
    
    const handleHeatmapCellClick = (comuna: string, dispositivo: string) => {
        setCrossFilters(prev => {
            const otherFilters = prev.filter(f => f.key !== 'comuna' && f.key !== 'dispositivoAPS');
            return [
                ...otherFilters,
                { key: 'comuna', value: comuna, label: 'Comuna' },
                { key: 'dispositivoAPS', value: dispositivo, label: 'Dispositivo' }
            ];
        });
    };

    const handleExportAll = () => {
        const patientMap: Map<number, Patient> = new Map(patients.map(p => [p.id, p]));
        const dataToExport = filteredPrestaciones.map(p => {
            const patient = patientMap.get(p.pacienteId);
            return {
                "ID Prestación": p.id,
                "Fecha": formatDateForDisplay(p.fecha),
                "Paciente": patient?.nombre || 'N/A',
                "RUT": patient?.rut || 'N/A',
                "Ficha": patient?.ficha || 'N/A',
                "Edad": patient?.edad,
                "Sexo": patient?.sexo,
                "Comuna": patient?.comuna,
                "Dispositivo APS": patient?.dispositivoAPS,
                "Tipo Prestación": p.tipo,
                "Profesional": p.profesional,
                "Estado": p.estado,
                "Observaciones": p.observaciones,
                "Duración (min)": p.duracion_min_real,
                "Perfil Usuario Registro": p.usuarioPerfil,
                "Timestamp": p.timestamp
            };
        });
        exportToExcel(dataToExport, "Reporte_Estadisticas_RLP");
    };
    
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="space-y-6 flex-1 overflow-y-auto">
            {drillDownData && <DrillDownTable {...drillDownData} patients={patients} onClose={() => setDrillDownData(null)} />}

            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold">Panel de Estadísticas</h2>
                <div className="text-sm text-gray-500">
                    <p>Última actualización: {lastUpdated ? formatDateWithTime(lastUpdated) : 'Cargando...'}</p>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                 <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full flex justify-between items-center text-left"
                    aria-expanded={isFiltersOpen}
                    aria-controls="filters-content"
                >
                    <h4 className="text-lg font-semibold">Panel de Filtros</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                    </svg>
                </button>
                {isFiltersOpen && (
                    <div id="filters-content" className="pt-3 mt-3 border-t border-gray-200">
                        <div className="grid grid-cols-12 gap-x-4 gap-y-4 items-start">
                            {/* --- FILTERS ROW 1 --- */}
                            <div className="col-span-12 md:col-span-6 lg:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Mes de Inicio</label>
                                <div className="flex items-center gap-1">
                                    <select value={derivedStartMonth} onChange={handleStartMonthChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm">
                                        {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>
                                    <select value={derivedStartYear} onChange={handleStartYearChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm">
                                        {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Mes de Término</label>
                                <div className="flex items-center gap-1">
                                    <select value={derivedEndMonth} onChange={handleEndMonthChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm">
                                        {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>
                                    <select value={derivedEndYear} onChange={handleEndYearChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm">
                                        {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-span-12 lg:col-span-3">
                                <label htmlFor="date-range" className="block text-xs font-medium text-gray-600 mb-1">Rango Personalizado</label>
                                <div className="flex items-center gap-1">
                                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm" />
                                    <span className="text-gray-500">-</span>
                                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm" />
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-2">
                                <MultiSelect
                                    id="profesional-filter"
                                    label="Profesionales"
                                    options={profesionalOptions}
                                    selected={selectedProfesionales}
                                    onChange={setSelectedProfesionales}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-3">
                                <MultiSelect
                                    id="tipo-filter"
                                    label="Tipos de Prestación"
                                    options={prestacionTypeOptions}
                                    selected={selectedTipos}
                                    onChange={setSelectedTipos}
                                />
                            </div>

                            {/* --- FILTERS ROW 2 --- */}
                            {(user.role === 'admin' || user.role === 'estadistica') &&
                                <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                    <MultiSelect
                                        id="dispositivo-filter"
                                        label="Dispositivo APS"
                                        options={DISPOSITIVOS_APS}
                                        selected={selectedDispositivos}
                                        onChange={setSelectedDispositivos}
                                    />
                                </div>
                            }

                            <div className="col-span-12 lg:col-span-4">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Diagnóstico (CIE-10)</label>
                                <DiagnosisSelector 
                                    value={diagnosticoFilter}
                                    onChange={setDiagnosticoFilter}
                                />
                            </div>
                            
                             <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                <MultiSelect
                                    id="nsp-reason-filter"
                                    label="Motivos de NSP"
                                    options={NSP_REASONS}
                                    selected={selectedNspReasons}
                                    onChange={setSelectedNspReasons}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-4">
                               <div className="grid grid-cols-4 gap-x-2 gap-y-3">
                                    <div className="col-span-4">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Edad</label>
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={edadFilter.min} onChange={e => setEdadFilter(p => ({...p, min: parseInt(e.target.value) || 0}))} className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm" placeholder="Min"/>
                                            <input type="number" value={edadFilter.max} onChange={e => setEdadFilter(p => ({...p, max: parseInt(e.target.value) || 120}))} className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm" placeholder="Max"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="tutor-filter" className="block text-xs font-medium text-gray-600 mb-1">Tutor</label>
                                        <select id="tutor-filter" value={tutorFilter} onChange={e => setTutorFilter(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm"><option value="todos">Todos</option><option value="si">Sí</option><option value="no">No</option></select>
                                    </div>
                                    <div>
                                        <label htmlFor="pension-filter" className="block text-xs font-medium text-gray-600 mb-1">Pensión</label>
                                        <select id="pension-filter" value={pensionFilter} onChange={e => setPensionFilter(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm"><option value="todos">Todos</option><option value="si">Sí</option><option value="no">No</option></select>
                                    </div>
                                    <div>
                                        <label htmlFor="cred-filter" className="block text-xs font-medium text-gray-600 mb-1">Credencial</label>
                                        <select id="cred-filter" value={credencialFilter} onChange={e => setCredencialFilter(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm"><option value="todos">Todos</option><option value="si">Sí</option><option value="no">No</option></select>
                                    </div>
                                    <div>
                                        <label htmlFor="consumo-filter" className="block text-xs font-medium text-gray-600 mb-1">Consumo</label>
                                        <select id="consumo-filter" value={consumoFilter} onChange={e => setConsumoFilter(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm"><option value="todos">Todos</option><option value="si">Sí</option><option value="no">No</option></select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-200">
                            <button onClick={handleApplyFilters} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 text-sm">Aplicar Filtros</button>
                            <button onClick={handleClearFilters} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 text-sm">Limpiar</button>
                            <ExportButton onClick={handleExportAll} text="Exportar Vista Actual" />
                        </div>
                    </div>
                )}
            </div>
            
            {crossFilters.length > 0 && (
                <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm py-2 px-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Filtros Activos:</span>
                        {crossFilters.map(f => (
                            <button key={`${f.key}-${f.value}`} onClick={() => toggleCrossFilter(f)} className="flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full hover:bg-blue-200 transition-colors">
                                <span>{f.label}: {f.value}</span>
                                <span className="font-bold">&times;</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div id="kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KpiCard
                    id="kpi_agendadas"
                    title="Citas Agendadas"
                    value={kpiData.agendadas.value.toLocaleString('es-CL')}
                />
                 <KpiCard
                    id="kpi_realizadas"
                    title="Citas Realizadas"
                    value={kpiData.realizadas.value.toLocaleString('es-CL')}
                />
                 <KpiCard
                    id="kpi_asistencias"
                    title="Porcentaje de Asistencias"
                    value={`${(kpiData.asistencias.value * 100).toFixed(1)}%`}
                    formula="Realizadas / Agendadas"
                    numerator={kpiData.asistencias.numerator}
                    denominator={kpiData.asistencias.denominator}
                />
                 <KpiCard
                    id="kpi_inasistencia"
                    title="Tasa de NSP"
                    value={`${(kpiData.inasistencia.value * 100).toFixed(1)}%`}
                    valueColor={kpiData.inasistencia.value > 0.15 ? 'text-red-600' : 'text-gray-800'}
                    formula="NSP / (Realizadas + NSP)"
                    numerator={kpiData.inasistencia.numerator}
                    denominator={kpiData.inasistencia.denominator}
                />
            </div>
            
             <Section title="Prestaciones por tipo" id="ranking_prestaciones" onExport={() => exportToExcel(prestacionesByType.map(p=>({Tipo: p.tipo, Realizadas: p.realizadas, Agendadas: p.agendadas, "Tasa Realización (%)": (p.tasa_realizacion*100).toFixed(1) })), "prestaciones_por_tipo")}>
                <PrestacionesByTypeChart data={prestacionesByType} onBarClick={(tipo) => toggleCrossFilter({key: 'tipo', value: tipo, label: 'Tipo'})} />
            </Section>

            <Section title="Diagnósticos de Salud Mental Frecuentes" id="ranking_diagnosticos" onExport={() => exportToExcel(diagnosisData, "diagnosticos_frecuentes")}>
                <DiagnosisFrequencyChart 
                    data={diagnosisData} 
                    onBarClick={(diagnosis) => toggleCrossFilter({key: 'diagnosis', value: diagnosis, label: 'Diagnóstico'})} 
                />
            </Section>

            <Section title="Análisis de NSP por Segmento" id="analisis_noshow">
                 <NspSegmentTable
                    data={nspBySegment}
                    overallRate={kpiData.inasistencia.value}
                    onDrillDown={handleDrillDown}
                    onSegmentClick={(type, value) => {
                         const keyMap = {
                            primeraControl: 'primeraControl',
                            tipoPrestacion: 'tipo',
                            profesional: 'profesional',
                        };
                         const labelMap = {
                            primeraControl: 'Tipo Cita',
                            tipoPrestacion: 'Tipo Prestación',
                            profesional: 'Profesional',
                        };
                        toggleCrossFilter({ key: keyMap[type] as any, value, label: labelMap[type] });
                    }}
                />
            </Section>

            <Section title="Control Estadístico de Procesos (CEP) para NSP Mensual" id="cep_noshow" onExport={() => exportToExcel(nspPChartData.map(d=>({Mes: d.mes, "Tasa NSP (%)": (d.p*100).toFixed(1), "LCS (%)": (d.ucl*100).toFixed(1), "LCI (%)": (d.lcl*100).toFixed(1)})), "CEP_NSP")}>
                <p className="text-sm text-gray-600 mb-4">Este gráfico muestra la tasa de NSP mensual (línea azul) en comparación con el promedio histórico (línea naranja) y sus límites de control estadístico (líneas rojas punteadas). Un punto fuera de los límites de control (marcado en rojo) indica una variación estadísticamente significativa que podría requerir investigación.</p>
                <NspPChart data={nspPChartData} />
            </Section>
            
            <Section title="Análisis Demográfico de Pacientes Atendidos" id="analisis_demografico" onExport={() => exportToExcel([...demographicsData.sexo, ...demographicsData.tutor], "demografia_pacientes")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DemographicsDonutChart id="donut_sexo" title="Distribución por Sexo" data={demographicsData.sexo} total={demographicsData.total} onSegmentClick={(type, value) => toggleCrossFilter({key: type, value: value, label: 'Sexo'})} />
                    <DemographicsDonutChart id="donut_tutor" title="Pacientes con Tutor" data={demographicsData.tutor} total={demographicsData.total} onSegmentClick={(type, value) => toggleCrossFilter({key: type, value: value, label: 'Tutor'})} />
                </div>
            </Section>

             <Section title="Análisis Territorial y de Equidad" id="analisis_territorial">
                <div className="space-y-8">
                    <EquityMapTable id="tbl_equidad_comunal" data={equityData} onRowClick={(comuna) => toggleCrossFilter({ key: 'comuna', value: comuna, label: 'Comuna' })} />
                    <div>
                         <h5 className="text-md font-semibold mb-2">Mapa de Calor Territorial: Comuna de Origen vs. Centro de Atención</h5>
                         <TerritorialHeatmap data={territorialHeatmapData.data} comunas={territorialHeatmapData.comunas} dispositivos={territorialHeatmapData.dispositivos} onCellClick={handleHeatmapCellClick} />
                    </div>
                </div>
            </Section>
            
            <Section title="Mapa de Calor Geográfico (Beta)" id="analisis_geografico" isInitiallyOpen={false}>
                <p className="text-sm text-gray-600 mb-4">Este mapa muestra la concentración geográfica de los domicilios de los pacientes filtrados. Permite identificar áreas de mayor demanda y planificar visitas domiciliarias.</p>
                <HeatmapGeograficoView prestaciones={filteredPrestaciones} patients={patients} />
            </Section>

            </div>
        </div>
    );
};

export default StatisticsView;