import React from 'react';
import { AlertCircle, Save } from 'lucide-react';

const Alert = ({ type, message }) => {
  const isError = type === 'error';

  return (
    <div
      className="max-w-[1400px] mx-auto mb-4 px-4 py-3 rounded-xl flex items-center gap-3 transition-all text-sm"
      style={{
        backgroundColor: isError ? '#fee2e2' : '#dcfce7',
        border: `1px solid ${isError ? '#fecaca' : '#bbf7d0'}`,
        color: isError ? '#991b1b' : '#166534',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div style={{ color: isError ? '#dc2626' : '#16a34a' }}>
        {isError ? <AlertCircle size={20} strokeWidth={2} /> : <Save size={20} strokeWidth={2} />}
      </div>
      <span style={{
        fontWeight: '500',
        letterSpacing: '-0.01em'
      }}>{message}</span>
    </div>
  );
};

export default Alert;
