/**
 * Componente para importar y exportar pacientes
 */

import React, { useState, useRef } from 'react';
import { importFromCSV, importFromJSON, exportToCSV, exportToJSON, downloadFile, readFile } from '../utils/importPatients';
import { importClinicalNotesFromJSON, importPatientsFromJSON, importAll } from '../src/utils/batchImporter';
import FirebaseService from '../services/firebaseService';

interface ImportExportViewProps {
  onImportComplete?: () => void;
}

const ImportExportView: React.FC<ImportExportViewProps> = ({ onImportComplete }) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notesInputRef = useRef<HTMLInputElement>(null);
  const patientsV2InputRef = useRef<HTMLInputElement>(null);

  const handleExportCSV = async () => {
    setLoading(true);
    try {
      const csv = await exportToCSV();
      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(csv, `pacientes_${timestamp}.csv`, 'text/csv');
      setMessage({ type: 'success', text: 'Pacientes exportados a CSV exitosamente' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error al exportar: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const handleExportJSON = async () => {
    setLoading(true);
    try {
      const json = await exportToJSON();
      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(json, `pacientes_${timestamp}.json`, 'application/json');
      setMessage({ type: 'success', text: 'Pacientes exportados a JSON exitosamente' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error al exportar: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      const content = await readFile(file);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      let count = 0;
      if (fileExtension === 'csv') {
        count = await importFromCSV(content, false);
      } else if (fileExtension === 'json') {
        count = await importFromJSON(content, false);
      } else {
        throw new Error('Formato de archivo no soportado. Use CSV o JSON.');
      }

      setMessage({ type: 'success', text: `${count} pacientes importados exitosamente` });
      onImportComplete?.();
    } catch (error) {
      setMessage({ type: 'error', text: `Error al importar: ${error}` });
    } finally {
      setLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearAllPatients = () => {
    alert("Esta función ha sido deshabilitada en la versión online por seguridad. Contacte al administrador para realizar borrados masivos.");
  };

  const handleExportAllData = async () => {
    setLoading(true);
    try {
      // Fetch all data
      const patients = await FirebaseService.getAllPatients();
      const users = await FirebaseService.getAllUsers();
      const prestacionConfig = await FirebaseService.getPrestacionConfig();
      const allPrestaciones = await FirebaseService.getAllPrestaciones();
      const farmacos = await FirebaseService.getFarmacos();
      const clinicalNotes = await FirebaseService.getAllClinicalNotes();

      const allData = {
        patients,
        users,
        prestacionConfig,
        allPrestaciones,
        farmacos,
        clinicalNotes,
        exportDate: new Date().toISOString(),
        version: "2.0-online"
      };

      const json = JSON.stringify(allData, null, 2);
      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(json, `backup_completo_${timestamp}.json`, 'application/json');
      setMessage({ type: 'success', text: 'Backup completo exportado exitosamente' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error al exportar backup: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const handleImportClinicalNotes = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      const content = await readFile(file);
      const result = await importClinicalNotesFromJSON(content);

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message + (result.errors ? ` (${result.errors.length} errores)` : '')
        });
        onImportComplete?.();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error al importar notas: ${error}` });
    } finally {
      setLoading(false);
      if (notesInputRef.current) {
        notesInputRef.current.value = '';
      }
    }
  };

  const handleImportPatientsV2 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      const content = await readFile(file);
      const result = await importPatientsFromJSON(content);

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message + (result.errors ? ` (${result.errors.length} errores)` : '')
        });
        onImportComplete?.();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error al importar pacientes V2: ${error}` });
    } finally {
      setLoading(false);
      if (patientsV2InputRef.current) {
        patientsV2InputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Importar/Exportar Pacientes</h2>

      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
            }`}
        >
          {message.text}
        </div>
      )}

      {/* Sección de Exportación */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Exportar Pacientes</h3>
        <p className="text-gray-600 mb-4">
          Descargue todos los pacientes en formato CSV o JSON para respaldo o transferencia.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleExportCSV}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? '⏳ Exportando...' : '📄 Exportar CSV'}
          </button>
          <button
            onClick={handleExportJSON}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? '⏳ Exportando...' : '📋 Exportar JSON'}
          </button>
        </div>
      </div>

      {/* Sección de Importación */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Importar Pacientes</h3>
        <p className="text-gray-600 mb-4">
          Importe pacientes desde un archivo CSV o JSON. Los pacientes se agregarán a los existentes.
        </p>
        <div className="mb-4">
          <label
            htmlFor="file-input"
            className={`inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? '⏳ Importando...' : '📂 Seleccionar Archivo'}
          </label>
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleImportFile}
            disabled={loading}
            className="hidden"
          />
        </div>
        <div className="text-sm text-gray-500">
          <p className="mb-2">
            <strong>Formato CSV esperado:</strong>
          </p>
          <ul className="list-disc list-inside pl-4 mb-4">
            <li>Debe incluir encabezados con los nombres de los campos</li>
            <li>Campos mínimos: nombre, rut, fechaNacimiento, sexo</li>
            <li>Los teléfonos deben separarse con comas</li>
            <li>Los fármacos deben tener formato: "nombre|dosis,nombre2|dosis2"</li>
          </ul>
          <p className="mb-2">
            <strong>Formato JSON esperado:</strong>
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Un array de objetos con la estructura del tipo Patient</li>
            <li>Puede exportar primero para ver el formato exacto</li>
          </ul>
        </div>
      </div>

      {/* Sección de Importación V2 - Migración desde Markdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Importar Datos desde Migración V2</h3>
        <p className="text-gray-600 mb-4">
          Importe pacientes y notas clínicas generados por el script de migración desde archivos Markdown.
        </p>

        <div className="space-y-4">
          {/* Importar Pacientes V2 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-lg mb-2">Pacientes Migrados</h4>
            <p className="text-gray-600 mb-3 text-sm">
              Importe el archivo <code>pacientes_completos.json</code> generado por la migración.
            </p>
            <label
              htmlFor="patients-v2-input"
              className={`inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? '⏳ Importando...' : '📥 Importar Pacientes V2'}
            </label>
            <input
              id="patients-v2-input"
              ref={patientsV2InputRef}
              type="file"
              accept=".json"
              onChange={handleImportPatientsV2}
              disabled={loading}
              className="hidden"
            />
          </div>

          {/* Importar Notas Clínicas */}
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-lg mb-2">Notas Clínicas</h4>
            <p className="text-gray-600 mb-3 text-sm">
              Importe el archivo <code>notas_clinicas_completas.json</code> generado por la migración.
            </p>
            <label
              htmlFor="notes-input"
              className={`inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? '⏳ Importando...' : '📝 Importar Notas Clínicas'}
            </label>
            <input
              id="notes-input"
              ref={notesInputRef}
              type="file"
              accept=".json"
              onChange={handleImportClinicalNotes}
              disabled={loading}
              className="hidden"
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Importante:</strong> Los archivos JSON deben ser los generados por el script de migración
            ubicados en <code>C:\Users\betoe\SIMORAHealth\data-migration</code>
          </p>
        </div>
      </div>

      {/* Sección de Backup Completo */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Backup Completo del Sistema</h3>
        <p className="text-gray-600 mb-4">
          Exporte TODOS los datos del sistema (pacientes, usuarios, configuración, etc.) en un solo archivo JSON.
        </p>
        <button
          onClick={handleExportAllData}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400"
        >
          {loading ? '⏳ Exportando...' : '💾 Descargar Backup Completo'}
        </button>
      </div>

      {/* Sección de Limpieza (Zona de Peligro) */}
      <div className="bg-red-50 rounded-lg border-2 border-red-300 p-6 opacity-50">
        <h3 className="text-xl font-semibold mb-4 text-red-800">⚠️ Zona de Peligro (Deshabilitada)</h3>
        <p className="text-red-700 mb-4">
          <strong>ADVERTENCIA:</strong> Esta acción ha sido deshabilitada en la versión online para proteger la integridad de los datos.
        </p>
        <button
          onClick={handleClearAllPatients}
          className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
          disabled
        >
          🗑️ Eliminar Todos los Pacientes
        </button>
      </div>

      {/* Instrucciones */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-semibold mb-2">💡 Consejos:</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Realice backups regulares de sus datos</li>
          <li>Verifique los archivos importados antes de cargarlos</li>
          <li>Use CSV para compatibilidad con Excel y Google Sheets</li>
          <li>Use JSON para transferencias exactas entre sistemas</li>
          <li>Los IDs de pacientes se generarán automáticamente al importar</li>
        </ul>
      </div>
    </div>
  );
};

export default ImportExportView;
