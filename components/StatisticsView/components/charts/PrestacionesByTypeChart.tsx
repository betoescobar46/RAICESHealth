/**
 * PrestacionesByTypeChart Component
 * Horizontal bar chart showing prestaciones by type
 */

import React, { useState, useMemo } from 'react';

interface PrestacionesByTypeData {
  tipo: string;
  realizadas: number;
  agendadas: number;
  tasa_realizacion: number;
}

interface PrestacionesByTypeChartProps {
  data: PrestacionesByTypeData[];
  onBarClick: (tipo: string) => void;
}

/**
 * Horizontal bar chart for prestaciones by type
 * Shows either absolute counts or percentage completion rates
 */
const PrestacionesByTypeChart: React.FC<PrestacionesByTypeChartProps> = ({ data, onBarClick }) => {
  const [displayMode, setDisplayMode] = useState<'absolute' | 'percentage'>('absolute');
  const [showAll, setShowAll] = useState(false);

  const chartData = useMemo(() => (showAll ? data : data.slice(0, 10)), [data, showAll]);
  const maxValue = useMemo(() => Math.max(1, ...data.map(d => d.realizadas)), [data]);

  return (
    <div id="bar_tipo_prestacion">
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-md p-0.5">
          <button
            onClick={() => setDisplayMode('absolute')}
            className={`px-3 py-1 text-sm rounded-md ${displayMode === 'absolute' ? 'bg-white shadow-sm font-semibold text-blue-600' : 'text-gray-500'}`}
          >
            # Absoluto
          </button>
          <button
            onClick={() => setDisplayMode('percentage')}
            className={`px-3 py-1 text-sm rounded-md ${displayMode === 'percentage' ? 'bg-white shadow-sm font-semibold text-blue-600' : 'text-gray-500'}`}
          >
            % Realización
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {chartData.map(item => {
          const barWidth = displayMode === 'absolute'
            ? `${(item.realizadas / maxValue) * 100}%`
            : `${item.tasa_realizacion * 100}%`;

          const label = displayMode === 'absolute'
            ? `${item.realizadas} (${(item.tasa_realizacion * 100).toFixed(0)}%)`
            : `${(item.tasa_realizacion * 100).toFixed(0)}% (${item.realizadas})`;

          return (
            <div key={item.tipo} className="grid grid-cols-3 gap-2 items-center text-sm group" onClick={() => onBarClick(item.tipo)}>
              <span className="col-span-1 truncate font-medium text-gray-600 group-hover:text-blue-600 cursor-pointer" title={item.tipo}>{item.tipo}</span>
              <div className="col-span-2 bg-gray-200 rounded-full h-5 relative cursor-pointer">
                <div
                  className="bg-slate-600 h-5 rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{ width: barWidth }}
                >
                  <span className="absolute left-2 top-0.5 text-white font-semibold text-xs">{label}</span>
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
            {showAll ? 'Ver top-10' : `Ver todo (${data.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PrestacionesByTypeChart;
