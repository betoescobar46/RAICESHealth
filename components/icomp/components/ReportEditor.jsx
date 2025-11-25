import React, { useRef, useEffect } from 'react';

const ReportEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const isUserTyping = useRef(false);

  useEffect(() => {
    // Solo actualizar el contenido si no está escribiendo el usuario
    if (editorRef.current && !isUserTyping.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const startOffset = range?.startOffset;
      const endOffset = range?.endOffset;
      const startContainer = range?.startContainer;

      editorRef.current.innerHTML = content;

      // Restaurar posición del cursor si es posible
      if (range && startContainer && editorRef.current.contains(startContainer)) {
        try {
          const newRange = document.createRange();
          newRange.setStart(startContainer, Math.min(startOffset, startContainer.length));
          newRange.setEnd(startContainer, Math.min(endOffset, startContainer.length));
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (e) {
          // Ignorar errores de restauración del cursor
        }
      }
    }
  }, [content]);

  const handleInput = (e) => {
    isUserTyping.current = true;
    onChange(e.currentTarget.innerHTML);
    setTimeout(() => {
      isUserTyping.current = false;
    }, 100);
  };

  const formatCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarButtons = [
    { cmd: 'bold', label: <strong>B</strong>, title: 'Negrita' },
    { cmd: 'italic', label: <em>I</em>, title: 'Cursiva' },
    { cmd: 'underline', label: <u>U</u>, title: 'Subrayado' },
    { divider: true },
    { cmd: 'justifyLeft', label: '≡', title: 'Alinear izquierda' },
    { cmd: 'justifyCenter', label: '≣', title: 'Centrar' },
    { cmd: 'justifyRight', label: '≢', title: 'Alinear derecha' },
    { divider: true },
    { cmd: 'undo', label: '↶', title: 'Deshacer' },
    { cmd: 'redo', label: '↷', title: 'Rehacer' },
  ];

  return (
    <div className="rounded-2xl p-4 flex flex-col h-full" style={{
      backgroundColor: '#ffffff',
      border: '1px solid #d6d3d1',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      width: '100%',
      minHeight: '300px'
    }}>
      <h2 className="font-semibold mb-3" style={{
        color: '#292524',
        letterSpacing: '-0.01em',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        Informe COMPIN - Editor
      </h2>

      {/* Toolbar */}
      <div className="flex mb-3 p-2 rounded-xl" style={{
        backgroundColor: '#f5f5f4',
        border: '1px solid #d6d3d1',
        gap: '8px',
        justifyContent: 'center',
        flexDirection: 'row'
      }}>
        {toolbarButtons.map((btn, idx) =>
          btn.divider ? (
            <div key={idx} className="w-px mx-1" style={{ backgroundColor: '#d6d3d1' }} />
          ) : (
            <button
              key={idx}
              onClick={() => formatCommand(btn.cmd)}
              title={btn.title}
              className="px-3 py-1.5 rounded-lg cursor-pointer text-sm transition-all"
              style={{
                border: '1px solid #d6d3d1',
                backgroundColor: '#ffffff',
                color: '#57534e',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c2703a';
                e.target.style.borderColor = '#c2703a';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#d6d3d1';
                e.target.style.color = '#57534e';
              }}
            >
              {btn.label}
            </button>
          )
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={true}
        spellCheck={false}
        onInput={handleInput}
        suppressContentEditableWarning={true}
        className="rounded-xl overflow-auto transition-all report-editor-content flex-1"
        style={{
          border: '1px solid #d6d3d1',
          backgroundColor: '#fafaf9',
          fontFamily: 'system-ui, sans-serif',
          color: '#292524',
          width: '100%',
          padding: '12px 16px',
          fontSize: '12px',
          lineHeight: '1.6'
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

export default ReportEditor;
