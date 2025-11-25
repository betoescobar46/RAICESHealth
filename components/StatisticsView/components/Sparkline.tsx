/**
 * Sparkline Component
 * A minimal line chart component for visualizing trends in small spaces
 */

import React from 'react';

interface SparklineProps {
  data: number[];
}

/**
 * Sparkline visualization component
 * Renders a simple line chart for displaying trend data
 * @param data - Array of numeric values to plot
 */
const Sparkline: React.FC<SparklineProps> = ({ data }) => {
  if (data.length < 2) return <div className="h-8 w-full bg-gray-100 rounded" />;

  const width = 100;
  const height = 30;
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (range === 0 ? height / 2 : ((val - minVal) / range) * (height - 4)) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#60a5fa" // blue-400
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
};

export default Sparkline;
