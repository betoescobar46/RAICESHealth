/**
 * Script de migración de pacientes desde archivos Markdown a SIMORAHealth
 *
 * ⚠️ IMPORTANTE: Este script SOLO LEE los archivos originales, NO los modifica
 * Los archivos .md originales permanecerán intactos
 *
 * Genera un archivo JSON que puede ser revisado e importado manualmente
 */

import * as fs from 'fs';
import * as path from 'path';
import { Patient, ClinicalNote, FarmacoPrescrito } from './types.js';

// ============== CONFIGURACIÓN ==============
const SOURCE_DIR = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema\\Pacientes extrasistema';
const OUTPUT_FILE = './pacientes_migrados.json';
const CLINICAL_NOTES_FILE = './notas_clinicas_migradas.json';

interface ParsedPatient {
  patient: Patient;
  clinicalNotes: ClinicalNote[];
}

/**
 * Genera un ID único
 */
function generateId(prefix: string = 'patient'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calcula edad desde fecha de nacimiento
 */
function calcularEdad(fechaNacimiento: string): number {
  if (!fechaNacimiento) return 0;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

/**
 * Extrae el RUT del texto (formato: 12345678-9)
 */
function extractRUT(text: string): string {
  const rutMatch = text.match(/\b\d{7,8}-[\dkK]\b/);
  return rutMatch ? rutMatch[0] : '';
}

/**
 * Extrae la fecha de nacimiento (formato: DD/MM/YYYY o YYYY-MM-DD)
 */
function extractFechaNacimiento(text: string): string {
  // Formato DD/MM/YYYY o DD/M/YYYY
  const dateMatch1 = text.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (dateMatch1) {
    const [, day, month, year] = dateMatch1;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Formato YYYY-MM-DD
  const dateMatch2 = text.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
  if (dateMatch2) {
    const [, year, month, day] = dateMatch2;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return '';
}

/**
 * Extrae email del texto
 */
function extractEmail(text: string): string {
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return emailMatch ? emailMatch[0] : '';
}

/**
 * Extrae teléfonos del texto (formato: +569XXXXXXXX o 9XXXXXXXX)
 */
function extractTelefonos(text: string): string[] {
  const phoneRegex = /(?:\+56)?9\d{8}/g;
  const matches = text.match(phoneRegex) || [];
  return [...new Set(matches.map(phone => phone.startsWith('+56') ? phone : `+56${phone}`))];
}

/**
 * Extrae dirección del texto
 */
function extractDireccion(text: string): string {
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes('dirección') ||
        line.toLowerCase().includes('direccion') ||
        /^[A-Z][a-z]+\s+\d+/.test(line.trim())) {
      return line.replace(/dirección:?/i, '').replace(/direccion:?/i, '').trim();
    }
  }
  return '';
}

/**
 * Extrae fármacos del texto
 */
function extractFarmacos(text: string): FarmacoPrescrito[] {
  const farmacos: FarmacoPrescrito[] = [];
  const seen = new Set<string>();

  // Buscar patrones como "Sertralina 50mg vo: 1 cada noche"
  const farmacoPatterns = [
    /([A-Z][a-z]+(?:ina|pan|zam|tam|pam|lam|xina|lina|xetina|tina|pina|mida|zolam|pram|vir|tan|tran|zepam))\s+(\d+\s?mg[^\n]*)/gi,
    /([A-Z][a-z]{3,})\s+(\d+\s?mg[^\n]*)/gi,
  ];

  for (const pattern of farmacoPatterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      const nombre = match[1].trim();
      const dosis = match[2].trim();
      const key = nombre.toLowerCase();

      // Evitar duplicados
      if (!seen.has(key)) {
        seen.add(key);
        farmacos.push({ nombre, dosis });
      }
    }
  }

  return farmacos;
}

/**
 * Extrae diagnósticos del texto
 */
function extractDiagnosticos(text: string): {
  saludMental: string;
  morbilidadMedica: string;
  factoresPsicosociales: string;
} {
  const diagnosticos = {
    saludMental: '',
    morbilidadMedica: '',
    factoresPsicosociales: '',
  };

  // Buscar sección de diagnósticos
  const diagSection = text.match(/##\s*Diagnósticos?([\s\S]*?)(?=##|$)/i);
  if (diagSection) {
    const diagText = diagSection[1];

    // Extraer diagnósticos de salud mental (CIE-10: F00-F99)
    const mentalDiagMatch = diagText.match(/[Ff]\d{2}\.?\d?\s*-?\s*[^\n]+/g);
    if (mentalDiagMatch) {
      diagnosticos.saludMental = mentalDiagMatch.join('; ');
    } else {
      // Si no hay códigos CIE-10, tomar las primeras líneas relevantes
      const lines = diagText.trim().split('\n').filter(l => l.trim() && !l.startsWith('#'));
      if (lines.length > 0) {
        diagnosticos.saludMental = lines[0].trim();
      }
    }

    // Buscar morbilidad médica
    const medicalKeywords = ['hipertensión', 'diabetes', 'obesidad', 'tiroides', 'gastritis', 'asma', 'alergia', 'manga gástrica'];
    for (const keyword of medicalKeywords) {
      const regex = new RegExp(`${keyword}[^\\n.]*`, 'i');
      const match = diagText.match(regex);
      if (match) {
        if (diagnosticos.morbilidadMedica) diagnosticos.morbilidadMedica += '; ';
        diagnosticos.morbilidadMedica += match[0].trim();
      }
    }
  }

  return diagnosticos;
}

/**
 * Extrae el sexo del paciente
 */
function extractSexo(text: string, nombre: string): 'Masculino' | 'Femenino' {
  const lowerText = text.toLowerCase();

  // Buscar indicadores explícitos
  if (lowerText.includes('masculino') || lowerText.includes('hombre') || lowerText.includes('varón')) {
    return 'Masculino';
  }
  if (lowerText.includes('femenino') || lowerText.includes('mujer')) {
    return 'Femenino';
  }

  // Inferir por nombre (heurística)
  const nombreLower = nombre.toLowerCase();
  const nombresMasculinos = ['juan', 'pedro', 'carlos', 'josé', 'manuel', 'francisco', 'alberto', 'alfonso', 'jaime', 'leonardo', 'diego', 'miguel', 'pablo', 'eduardo', 'luis', 'fernando', 'antonio', 'javier', 'felipe'];
  const nombresFemeninos = ['maría', 'carmen', 'ana', 'patricia', 'isabel', 'laura', 'paula', 'daniela', 'camila', 'javiera', 'fernanda', 'valentina', 'catalina', 'carolina', 'andrea', 'gabriela', 'francisca', 'alejandra'];

  for (const m of nombresMasculinos) {
    if (nombreLower.includes(m)) return 'Masculino';
  }
  for (const f of nombresFemeninos) {
    if (nombreLower.includes(f)) return 'Femenino';
  }

  return 'Femenino'; // Por defecto
}

/**
 * Extrae ocupación del texto
 */
function extractOcupacion(text: string): string {
  const occupations = [
    'abogado', 'ingeniero', 'profesor', 'médico', 'enfermera', 'psicólogo',
    'administrativo', 'contador', 'estudiante', 'dueña de casa', 'comerciante',
    'técnico', 'obrero', 'jubilado', 'pensionado', 'arquitecto', 'diseñador'
  ];

  const lines = text.split('\n');
  for (const line of lines) {
    for (const occ of occupations) {
      if (line.toLowerCase().includes(occ)) {
        return line.trim().substring(0, 100);
      }
    }
  }
  return '';
}

/**
 * Extrae alergias del texto
 */
function extractAlergias(text: string): string {
  const allergiesMatch = text.match(/(?:alergias?|ram):\s*([^\n]+)/i);
  if (allergiesMatch) {
    const alergias = allergiesMatch[1].trim();
    if (alergias.toLowerCase() === 'ninguna' || alergias.toLowerCase() === 'no' || alergias.toLowerCase().includes('sin alergia')) {
      return 'Sin alergias conocidas';
    }
    return alergias;
  }
  return 'Sin alergias conocidas';
}

/**
 * Extrae notas clínicas/evoluciones del archivo
 */
function extractClinicalNotes(text: string, patientId: string): ClinicalNote[] {
  const notes: ClinicalNote[] = [];

  // Buscar secciones de control/evolución con fechas
  const controlRegex = /#\s*(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})[^\n]*(?:control|consulta|evolución|ingreso)/gi;
  let match;

  while ((match = controlRegex.exec(text)) !== null) {
    const fechaStr = match[1];
    const startIndex = match.index;

    // Encontrar el fin de esta sección
    const nextSectionIndex = text.indexOf('##', startIndex + 1);
    const endIndex = nextSectionIndex === -1 ? text.length : nextSectionIndex;
    const contenido = text.substring(startIndex, endIndex).trim();

    // Convertir fecha al formato YYYY-MM-DD
    const fechaMatch = fechaStr.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
    if (fechaMatch) {
      const [, day, monthStr, year] = fechaMatch;
      const meses: { [key: string]: string } = {
        'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
        'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
        'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
      };
      const month = meses[monthStr.toLowerCase()] || '01';
      const fecha = `${year}-${month}-${day.padStart(2, '0')}`;

      notes.push({
        id: generateId('note'),
        pacienteId: patientId,
        fecha,
        hora: '00:00',
        profesional: 'Dr. Escobar',
        titulo: match[0].replace('#', '').trim(),
        contenido,
        observacionesClinicamente: '',
        planTratamiento: '',
        timestamp: new Date(fecha).toISOString(),
      });
    }
  }

  return notes;
}

/**
 * Parsea un archivo Markdown de paciente
 */
function parsePatientFile(filePath: string, fichaNumber: number): ParsedPatient | null {
  try {
    // SOLO LECTURA - no modifica el archivo original
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');

    // Filtrar archivos que no son pacientes
    const excludeFiles = [
      'pacientes extrasistema', 'index', 'guía', 'informe', 'certificado',
      'derivación', 'sin título', 'ic a urgencia', 'tagger', 'normaliza'
    ];

    if (excludeFiles.some(ex => fileName.toLowerCase().includes(ex))) {
      return null;
    }

    // Extraer nombre del paciente
    let nombre = fileName.replace(/_/g, ' ').trim();

    // Intentar encontrar el nombre en el contenido
    const lines = content.split('\n');
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('---') && !line.startsWith('#') &&
          line.length < 100 && /^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]+$/.test(line)) {
        nombre = line;
        break;
      }
    }

    // Extraer todos los datos
    const rut = extractRUT(content);
    const fechaNacimiento = extractFechaNacimiento(content);
    const edad = fechaNacimiento ? calcularEdad(fechaNacimiento) : 0;
    const sexo = extractSexo(content, nombre);
    const email = extractEmail(content);
    const telefonos = extractTelefonos(content);
    const direccion = extractDireccion(content);
    const ocupacion = extractOcupacion(content);
    const alergias = extractAlergias(content);
    const farmacos = extractFarmacos(content);
    const diagnosticos = extractDiagnosticos(content);

    const patientId = generateId('patient');

    // Extraer objetivos terapéuticos
    let objetivosTerapeuticos = '';
    const objetivosMatch = content.match(/##\s*Objetivos?\s*terapéuticos?([\s\S]*?)(?=##|$)/i);
    if (objetivosMatch) {
      objetivosTerapeuticos = objetivosMatch[1].trim().substring(0, 500);
    }

    const patient: Patient = {
      firestoreId: patientId,
      ficha: fichaNumber,
      nombre,
      rut: rut || `pendiente-${fichaNumber}`,
      edad,
      sexo,
      identidadGenero: sexo === 'Masculino' ? 'Hombre cisgénero' : 'Mujer cisgénero',
      fechaNacimiento: fechaNacimiento || '1990-01-01',
      direccion,
      comuna: '',
      lat: 0,
      lon: 0,
      telefonos,
      email,
      tutor: 'No aplica',
      ocupacion,
      dispositivoAPS: 'Consulta Privada',
      alergias,
      ram: '',
      objetivosTerapeuticos,
      diagnostico: diagnosticos,
      farmacos,
      pensionDiscapacidad: false,
      credencialDiscapacidad: false,
      consumoActivoDrogas: false,
    };

    // Extraer notas clínicas
    const clinicalNotes = extractClinicalNotes(content, patientId);

    return { patient, clinicalNotes };

  } catch (error) {
    console.error(`Error al procesar archivo ${filePath}:`, error);
    return null;
  }
}

/**
 * Busca archivos .md recursivamente en el directorio
 */
function findMdFiles(dir: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursivamente buscar en subdirectorios
      files.push(...findMdFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Procesa todos los archivos .md en el directorio fuente (recursivamente)
 */
function migrateAllPatients(): void {
  console.log('🚀 Iniciando migración de pacientes desde Markdown...\n');
  console.log('⚠️  MODO DE SOLO LECTURA: Los archivos originales NO serán modificados\n');

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: El directorio ${SOURCE_DIR} no existe`);
    return;
  }

  console.log('🔍 Buscando archivos .md en todas las carpetas...\n');
  const allFiles = findMdFiles(SOURCE_DIR);

  console.log(`📁 Encontrados ${allFiles.length} archivos .md en total\n`);

  const allPatients: Patient[] = [];
  const allClinicalNotes: ClinicalNote[] = [];
  let fichaCounter = 1;

  for (const filePath of allFiles) {
    const fileName = path.basename(filePath);
    const result = parsePatientFile(filePath, fichaCounter);

    if (result) {
      allPatients.push(result.patient);
      allClinicalNotes.push(...result.clinicalNotes);
      console.log(`✅ ${fichaCounter}. ${result.patient.nombre} (${result.patient.rut})`);
      fichaCounter++;
    } else {
      // Solo mostrar omitidos ocasionalmente para no saturar la consola
      if (fichaCounter % 20 === 0 || fichaCounter < 10) {
        console.log(`⏭️  Omitido: ${fileName}`);
      }
    }
  }

  // Guardar pacientes en JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPatients, null, 2), 'utf-8');
  console.log(`\n✅ ${allPatients.length} pacientes exportados a ${OUTPUT_FILE}`);

  // Guardar notas clínicas en JSON separado
  if (allClinicalNotes.length > 0) {
    fs.writeFileSync(CLINICAL_NOTES_FILE, JSON.stringify(allClinicalNotes, null, 2), 'utf-8');
    console.log(`✅ ${allClinicalNotes.length} notas clínicas exportadas a ${CLINICAL_NOTES_FILE}`);
  }

  console.log('\n🎉 ¡Migración completada!');
  console.log('\n✅ Archivos originales intactos (no modificados)');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Revisar el archivo pacientes_migrados.json');
  console.log('2. Abrir SIMORAHealth en el navegador');
  console.log('3. Ir a Admin > Importar/Exportar');
  console.log('4. Seleccionar el archivo pacientes_migrados.json');
  console.log('5. Verificar que los datos se importaron correctamente');
  console.log('\n💡 Si algo sale mal, tus archivos .md originales están seguros\n');
}

// Ejecutar migración
migrateAllPatients();
