import React from 'react';
import { FileText } from 'lucide-react';

const ClinicalRecordInput = ({ fichaClinica, onChange, onGenerate, isGenerating }) => {
  return (
    <div className="rounded-2xl p-4 flex flex-col h-full" style={{
      backgroundColor: '#ffffff',
      border: '1px solid #d6d3d1',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      width: '100%',
      minHeight: '300px'
    }}>
      <h2 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{
        color: '#292524',
        letterSpacing: '-0.01em'
      }}>
        <FileText size={18} strokeWidth={2} style={{ color: '#c2703a' }} />
        Ficha Clínica
      </h2>

      <textarea
        value={fichaClinica}
        onChange={onChange}
        placeholder="Pegue aquí la información de la ficha clínica del paciente..."
        spellCheck={false}
        className="rounded-xl resize-none transition-all flex-1"
        style={{
          border: '1px solid #d6d3d1',
          backgroundColor: '#fafaf9',
          color: '#292524',
          overflowY: 'auto',
          width: '100%',
          padding: '12px 16px',
          fontSize: '12px',
          lineHeight: '1.6',
          fontFamily: 'system-ui, sans-serif'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#c2703a';
          e.target.style.boxShadow = '0 0 0 3px rgba(194, 112, 58, 0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d6d3d1';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};

export default ClinicalRecordInput;
