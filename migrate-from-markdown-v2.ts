import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

interface PatientData {
  id: string;
  numeroFicha: string;
  nombre: string;
  origen: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  tags: string[];
  contenidoCompleto: string;
  evoluciones: any[];
  adjuntosReferencias: string[];
}

interface ClinicalNote {
  id: string;
  patientId: string;
  numeroFicha: string;
  tipo: 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | 'OTRO';
  fecha: string;
  contenido: string;
  contenidoCompleto: string;
  profesional?: string;
  especialidad?: string;
  tags: string[];
  adjuntosReferencias: string[];
}

// Función para extraer referencias a archivos adjuntos
function extractAttachmentReferences(content: string): string[] {
  const attachmentPattern = /\[\[([^\]]+)\]\]/g;
  const matches = content.matchAll(attachmentPattern);
  const attachments = new Set<string>();

  for (const match of matches) {
    attachments.add(match[1]);
  }

  return Array.from(attachments);
}

// Función para detectar el tipo de nota
function detectNoteType(content: string): 'INGRESO' | 'CONTROL' | 'INTERCONSULTA' | 'OTRO' {
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes('ingreso') || lowerContent.includes('primera consulta')) {
    return 'INGRESO';
  } else if (lowerContent.includes('control')) {
    return 'CONTROL';
  } else if (lowerContent.includes('interconsulta')) {
    return 'INTERCONSULTA';
  }

  return 'OTRO';
}

// Función para extraer evoluciones del contenido
function extractEvolutions(content: string): any[] {
  const evolutions = [];
  const lines = content.split('\n');

  let currentEvolution: any = null;
  let currentContent: string[] = [];

  // Patrón para detectar fechas de control (e.g., "# 15 nov 2023 Control")
  const datePattern = /^#\s+(\d{1,2})\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene|feb|mar|abr|may|jun|jul|ago|sept|sep|oct|nov|dic)\s+(\d{4})/i;

  for (const line of lines) {
    const dateMatch = line.match(datePattern);

    if (dateMatch) {
      // Si hay una evolución previa, guardarla
      if (currentEvolution) {
        currentEvolution.contenido = currentContent.join('\n').trim();
        if (currentEvolution.contenido) {
          evolutions.push(currentEvolution);
        }
      }

      // Iniciar nueva evolución
      currentEvolution = {
        fecha: parseDate(dateMatch[1], dateMatch[2], dateMatch[3]),
        tipo: detectNoteType(line),
        titulo: line.replace(/^#\s*/, '').trim(),
        contenido: ''
      };
      currentContent = [];
    } else if (currentEvolution) {
      // Agregar línea al contenido de la evolución actual
      currentContent.push(line);
    }
  }

  // Guardar la última evolución si existe
  if (currentEvolution) {
    currentEvolution.contenido = currentContent.join('\n').trim();
    if (currentEvolution.contenido) {
      evolutions.push(currentEvolution);
    }
  }

  return evolutions;
}

// Función para parsear fechas en español
function parseDate(day: string, month: string, year: string): string {
  const months: Record<string, string> = {
    'enero': '01', 'ene': '01',
    'febrero': '02', 'feb': '02',
    'marzo': '03', 'mar': '03',
    'abril': '04', 'abr': '04',
    'mayo': '05', 'may': '05',
    'junio': '06', 'jun': '06',
    'julio': '07', 'jul': '07',
    'agosto': '08', 'ago': '08',
    'septiembre': '09', 'sept': '09', 'sep': '09',
    'octubre': '10', 'oct': '10',
    'noviembre': '11', 'nov': '11',
    'diciembre': '12', 'dic': '12'
  };

  const monthNum = months[month.toLowerCase()] || '01';
  const dayNum = day.padStart(2, '0');

  return `${year}-${monthNum}-${dayNum}T00:00:00Z`;
}

// Función para generar ID único
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función recursiva para encontrar todos los archivos .md
function findMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursivamente buscar en subdirectorios
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function migratePatientsFromMarkdown() {
  const sourceDir = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema';
  const outputDir = 'C:\\Users\\betoe\\SIMORAHealth\\data-migration';

  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const patients: PatientData[] = [];
  const clinicalNotes: ClinicalNote[] = [];
  const allAttachments: Set<string> = new Set();

  console.log('🔍 Iniciando migración desde:', sourceDir);

  // Verificar que el directorio existe
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ El directorio fuente no existe:', sourceDir);
    return;
  }

  // Buscar todos los archivos .md recursivamente
  const files = findMarkdownFiles(sourceDir).filter(file =>
    !file.includes('\\Adjuntos clinicos\\') &&
    !file.includes('\\.claude\\') &&
    !file.endsWith('\\Pacientes Extrasistema.md') &&
    !file.endsWith('\\Pacientes extrasistema.md')
  );

  console.log(`📁 Encontrados ${files.length} archivos .md`);

  for (const filePath of files) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    try {
      // Parsear frontmatter y contenido
      const { data: frontmatter, content } = matter(fileContent);

      // Extraer nombre del paciente
      const patientName = frontmatter.paciente || fileName.replace('.md', '');
      const fichaId = frontmatter.ficha_id || generateId();

      console.log(`  📋 Procesando: ${patientName}`);

      // Extraer referencias a adjuntos
      const attachmentRefs = extractAttachmentReferences(content);
      attachmentRefs.forEach(ref => allAttachments.add(ref));

      // Crear objeto de paciente
      const patient: PatientData = {
        id: fichaId,
        numeroFicha: fichaId,
        nombre: patientName,
        origen: frontmatter.origen || 'EXTRASISTEMA',
        fechaCreacion: frontmatter.created || new Date().toISOString(),
        fechaActualizacion: frontmatter.updated || new Date().toISOString(),
        tags: frontmatter.tags || [],
        contenidoCompleto: fileContent, // Guardar TODO el contenido original
        evoluciones: extractEvolutions(content),
        adjuntosReferencias: attachmentRefs
      };

      patients.push(patient);

      // Crear nota clínica principal (de ingreso)
      const mainNote: ClinicalNote = {
        id: generateId(),
        patientId: fichaId,
        numeroFicha: fichaId,
        tipo: 'INGRESO',
        fecha: patient.fechaCreacion,
        contenido: content.substring(0, 500) + '...', // Resumen
        contenidoCompleto: content, // Contenido completo
        profesional: 'Dr. Sistema',
        especialidad: 'Psiquiatría',
        tags: patient.tags,
        adjuntosReferencias: attachmentRefs
      };

      clinicalNotes.push(mainNote);

      // Crear notas adicionales para cada evolución
      for (const evolution of patient.evoluciones) {
        const evolutionNote: ClinicalNote = {
          id: generateId(),
          patientId: fichaId,
          numeroFicha: fichaId,
          tipo: evolution.tipo || 'CONTROL',
          fecha: evolution.fecha,
          contenido: evolution.contenido.substring(0, 500) + '...',
          contenidoCompleto: evolution.contenido,
          profesional: 'Dr. Sistema',
          especialidad: 'Psiquiatría',
          tags: [],
          adjuntosReferencias: extractAttachmentReferences(evolution.contenido)
        };

        clinicalNotes.push(evolutionNote);
      }

    } catch (error) {
      console.error(`❌ Error procesando ${fileName}:`, error);
    }
  }

  // Guardar los JSON generados
  const patientsFile = path.join(outputDir, 'pacientes_completos.json');
  const notesFile = path.join(outputDir, 'notas_clinicas_completas.json');
  const attachmentsFile = path.join(outputDir, 'adjuntos_referencias.json');

  fs.writeFileSync(patientsFile, JSON.stringify(patients, null, 2));
  fs.writeFileSync(notesFile, JSON.stringify(clinicalNotes, null, 2));
  fs.writeFileSync(attachmentsFile, JSON.stringify(Array.from(allAttachments), null, 2));

  // Generar reporte
  const report = `
REPORTE DE MIGRACIÓN
====================
Fecha: ${new Date().toISOString()}
Directorio fuente: ${sourceDir}
Directorio salida: ${outputDir}

RESULTADOS:
-----------
✅ Total de pacientes procesados: ${patients.length}
✅ Total de notas clínicas generadas: ${clinicalNotes.length}
✅ Total de referencias a adjuntos encontradas: ${allAttachments.size}

ARCHIVOS GENERADOS:
-------------------
1. ${patientsFile} (${(fs.statSync(patientsFile).size / 1024).toFixed(2)} KB)
2. ${notesFile} (${(fs.statSync(notesFile).size / 1024).toFixed(2)} KB)
3. ${attachmentsFile} (${(fs.statSync(attachmentsFile).size / 1024).toFixed(2)} KB)

VERIFICACIÓN:
-------------
${patients.length === 219 ? '✅' : '⚠️'} Esperados 219 pacientes, encontrados ${patients.length}

PRÓXIMOS PASOS:
---------------
1. Verificar los archivos JSON generados
2. Importar a la aplicación usando el importador batch
3. Verificar en la UI que todos los datos están completos
`;

  const reportFile = path.join(outputDir, 'migration-report.txt');
  fs.writeFileSync(reportFile, report);

  console.log(report);
  console.log('\n✅ Migración completada exitosamente');
}

// Ejecutar la migración
migratePatientsFromMarkdown().catch(console.error);