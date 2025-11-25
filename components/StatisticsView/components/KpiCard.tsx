/**
 * KpiCard Component
 * A card component for displaying key performance indicators (KPIs)
 */

import React from 'react';

interface KpiCardProps {
  id: string;
  title: string;
  value: string;
  formula?: string;
  numerator?: number;
  denominator?: number;
  valueColor?: string;
}

/**
 * KPI Card component with tooltip support
 * Displays a metric value with optional formula information
 */
const KpiCard: React.FC<KpiCardProps> = ({
  id,
  title,
  value,
  formula,
  numerator,
  denominator,
  valueColor
}) => {
  let tooltipContent = title;
  if (formula && numerator !== undefined && denominator !== undefined) {
    tooltipContent += `\nFórmula: ${formula} (${numerator.toLocaleString('es-CL')} / ${denominator.toLocaleString('es-CL')})`;
  }

  return (
    <div id={id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between group relative">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-pre-wrap text-center">
        {tooltipContent}
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-500">{title}</h4>
        <div className="flex items-baseline gap-2 mt-1">
          <p className={`text-3xl font-bold ${valueColor || 'text-gray-800'}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
