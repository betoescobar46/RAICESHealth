import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#E8E9ED' }}>
          <div className="max-w-2xl w-full rounded-2xl p-8" style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={32} color="#E74C3C" />
              <h1 className="text-2xl font-semibold" style={{ color: '#E74C3C' }}>
                Error en la Aplicación
              </h1>
            </div>

            <p className="mb-4" style={{ color: '#2C3E50' }}>
              La aplicación encontró un error inesperado. Por favor, recarga la página.
            </p>

            <div className="mb-6 p-4 rounded-xl font-mono text-sm overflow-auto" style={{
              backgroundColor: '#F7F8FA',
              border: '1px solid #DFE1E6',
              color: '#E74C3C',
              maxHeight: '300px'
            }}>
              <strong>Error:</strong>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              {this.state.errorInfo && (
                <>
                  <strong className="block mt-4">Stack trace:</strong>
                  <pre className="text-xs">{this.state.errorInfo.componentStack}</pre>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-medium"
                style={{
                  backgroundColor: '#E4C6A1',
                  color: '#2C3E50',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Recargar Página
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="px-6 py-3 rounded-xl font-medium"
                style={{
                  backgroundColor: '#E8E9ED',
                  color: '#2C3E50',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Limpiar Datos y Recargar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
