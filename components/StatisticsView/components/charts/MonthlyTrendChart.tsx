/**
 * MonthlyTrendChart Component
 * Line chart for displaying KPI trends over time
 */

import React, { useState, useRef, useMemo } from 'react';

type KpiTrendKey = 'asistencias' | 'inasistencia';

interface TooltipData {
  x: number;
  y: number;
  content: string;
}

interface MonthlyTrendChartProps {
  data: any[];
  kpiKey: KpiTrendKey;
}

/**
 * Monthly trend line chart component
 * Displays KPI performance over months with interactive tooltips
 */
const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ data, kpiKey }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const kpiLabels: Record<KpiTrendKey, { num: string; den: string }> = {
    asistencias: { num: 'Realizadas', den: 'Agendadas' },
    inasistencia: { num: 'NSP', den: 'Agendadas' },
  };

  const chartData = useMemo(() => {
    const values = data.map(d => d[kpiKey].value);
    const maxValue = Math.max(0.01, ...values); // Avoid division by zero, ensure a minimum height
    const yMax = Math.ceil(maxValue * 10) / 10; // Round up to next 10%

    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const points = data.map((d, i) => {
      return {
        x: margin.left + (i / (data.length - 1)) * innerWidth,
        y: margin.top + innerHeight - (d[kpiKey].value / yMax) * innerHeight,
        month: d.month,
        ...d[kpiKey],
      };
    });

    const path = points.map(p => `${p.x},${p.y}`).join(' ');

    return { width, height, margin, innerWidth, innerHeight, yMax, points, path };
  }, [data, kpiKey]);

  const handleMouseOver = (point: typeof chartData.points[0]) => {
    const { num, den } = kpiLabels[kpiKey];
    const formattedValue = (point.value * 100).toFixed(1);
    const content = `${point.month}: ${formattedValue}% (${point.numerator} ${num} / ${point.denominator} ${den})`;
    setTooltipData({ x: point.x, y: point.y, content });
  };

  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md text-gray-500">No hay datos suficientes para mostrar la tendencia.</div>
  }

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
              <text x={chartData.margin.left - 8} y={y + 4} textAnchor="end" className="text-xs fill-current">
                {(value * 100).toFixed(0)}%
              </text>
            </g>
          );
        })}

        {/* X-axis */}
        {chartData.points.map((p, i) => (
          <text key={i} x={p.x} y={chartData.height - 5} textAnchor="middle" className="text-xs fill-current text-gray-500">
            {p.month}
          </text>
        ))}

        {/* Line */}
        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={chartData.path} />

        {/* Points and hover areas */}
        {chartData.points.map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y})`}>
            <circle
              r="10"
              fill="transparent"
              onMouseOver={() => handleMouseOver(p)}
              onMouseLeave={() => setTooltipData(null)}
              className="cursor-pointer"
            />
            <circle r="4" fill="#3b82f6" className="pointer-events-none" />
          </g>
        ))}
      </svg>
      {tooltipData && svgRef.current && (
        <div
          className="absolute p-2 text-sm bg-gray-800 text-white rounded-md shadow-lg pointer-events-none"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            transform: `translate(-50%, -120%)`,
          }}
        >
          {tooltipData.content}
        </div>
      )}
    </div>
  );
};

export default MonthlyTrendChart;
