import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, Timestamp } from 'firebase/firestore';

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CARPETA_ORIGEN = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema';
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 50;

// Configuración de Firebase (cliente - requires open rules temporarily)
const firebaseConfig = {
  apiKey: "AIzaSyD_u3VMT7cWOkmOMLTfW7v0NeJjwkalAlI",
  authDomain: "simorahealth.firebaseapp.com",
  projectId: "simorahealth",
  storageBucket: "simorahealth.firebasestorage.app",
  messagingSenderId: "360968687655",
  appId: "1:360968687655:web:d6fe9e58c840a819457e02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================================
// UTILIDADES
// ============================================================================

function standardizeRUT(rut) {
  if (!rut) return '';

  // Limpiar RUT
  const cleaned = rut.replace(/[.\s-]/g, '').toUpperCase();

  if (cleaned.length < 2) return '';

  // Separar número y dígito verificador
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  // Formatear: 00000000-0
  return `${body.padStart(8, '0')}-${dv}`;
}

function extractRUT(contenido) {
  // Buscar patrón de RUT chileno
  const patterns = [
    /\b(\d{1,2}\.\d{3}\.\d{3}-[\dKk])\b/,  // 12.345.678-9
    /\b(\d{7,8}-[\dKk])\b/,                 // 12345678-9
    /\b(\d{7,8}[\dKk])\b/                   // 123456789
  ];

  for (const pattern of patterns) {
    const match = contenido.match(pattern);
    if (match) {
      return standardizeRUT(match[1]);
    }
  }

  return '';
}

function extractEdad(contenido) {
  const patterns = [
    /(\d{1,3})\s*años/i,
    /edad:\s*(\d{1,3})/i
  ];

  for (const pattern of patterns) {
    const match = contenido.match(pattern);
    if (match) {
      return parseInt(match[1]);
    }
  }

  return null;
}

function extractFechaNacimiento(contenido) {
  const patterns = [
    /(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?(\d{4})/i,
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
    /fecha\s+(?:de\s+)?nacimiento:\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
  ];

  const meses = {
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
    'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
    'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
  };

  for (const pattern of patterns) {
    const match = contenido.match(pattern);
    if (match) {
      if (pattern.source.includes('enero|febrero')) {
        // Formato: 3 marzo 1984
        const dia = match[1].padStart(2, '0');
        const mes = meses[match[2].toLowerCase()];
        const anio = match[3];
        return `${anio}-${mes}-${dia}`;
      } else {
        // Formato: 03/03/1984 o 03-03-1984
        const partes = match[0].split(/[\/\-]/);
        if (partes.length === 3) {
          const dia = partes[0].padStart(2, '0');
          const mes = partes[1].padStart(2, '0');
          const anio = partes[2];
          return `${anio}-${mes}-${dia}`;
        }
      }
    }
  }

  return '';
}

function extractSexo(contenido) {
  const lower = contenido.toLowerCase();

  if (lower.includes('femenino') || lower.includes('mujer') || lower.includes('femenina')) {
    return 'Femenino';
  }
  if (lower.includes('masculino') || lower.includes('hombre') || lower.includes('varón')) {
    return 'Masculino';
  }

  return 'Otro';
}

function extractEmail(contenido) {
  const pattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = contenido.match(pattern);
  return match ? match[1] : '';
}

function extractTelefono(contenido) {
  const patterns = [
    /(\+?56\s*9\s*\d{4}\s*\d{4})/,  // +56912345678
    /(9\s*\d{4}\s*\d{4})/,           // 912345678
    /(\d{8})/                         // 61234567
  ];

  for (const pattern of patterns) {
    const match = contenido.match(pattern);
    if (match) {
      return match[1].replace(/\s/g, '');
    }
  }

  return '';
}

function extractDireccion(contenido) {
  // Buscar patrones de dirección
  const patterns = [
    /(\d+\s+[A-Za-z]+\s+\d+)/,  // "14 Sur 696"
    /([A-Z][a-z]+\s+\d+)/        // "Cooper 123"
  ];

  for (const pattern of patterns) {
    const match = contenido.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return '';
}

function extractDiagnostico(contenido) {
  const lower = contenido.toLowerCase();

  // Buscar diagnósticos comunes
  if (lower.includes('trastorno de ansiedad generalizada') || lower.includes('tag')) {
    return 'F41.1 - Trastorno de ansiedad generalizada';
  }
  if (lower.includes('depresión') || lower.includes('episodio depresivo')) {
    return 'F32.1 - Episodio depresivo moderado';
  }
  if (lower.includes('trastorno adaptativo')) {
    return 'F43.2 - Trastorno de adaptación';
  }
  if (lower.includes('trastorno de pánico')) {
    return 'F41.0 - Trastorno de pánico';
  }

  return 'En evaluación';
}

function extractMedicamentos(contenido) {
  const medicamentos = [];
  const farmacos = [
    'fluoxetina', 'sertralina', 'paroxetina', 'citalopram', 'escitalopram',
    'clonazepam', 'alprazolam', 'lorazepam',
    'quetiapina', 'risperidona', 'olanzapina',
    'mirtazapina', 'venlafaxina', 'bupropión',
    'zolpidem', 'zopiclona'
  ];

  const lower = contenido.toLowerCase();

  for (const farmaco of farmacos) {
    if (lower.includes(farmaco)) {
      medicamentos.push(farmaco.charAt(0).toUpperCase() + farmaco.slice(1));
    }
  }

  return medicamentos;
}

function extractAlergias(contenido) {
  const patterns = [
    /alergias?:\s*([^\n]+)/i,
    /alérgico a:\s*([^\n]+)/i
  ];

  for (const pattern of patterns) {
    const match = contenido.match(pattern);
    if (match) {
      const alergia = match[1].trim();
      if (alergia.toLowerCase() !== 'no' && alergia !== '-') {
        return alergia;
      }
    }
  }

  return '';
}

// ============================================================================
// FUNCIONES DE MIGRACIÓN
// ============================================================================

function buscarArchivosMdRecursivo(carpeta) {
  let archivos = [];

  try {
    const items = fs.readdirSync(carpeta);

    for (const item of items) {
      const rutaCompleta = path.join(carpeta, item);
      const stat = fs.statSync(rutaCompleta);

      if (stat.isDirectory()) {
        archivos = archivos.concat(buscarArchivosMdRecursivo(rutaCompleta));
      } else if (stat.isFile() && item.endsWith('.md')) {
        archivos.push(rutaCompleta);
      }
    }
  } catch (error) {
    console.error(`❌ Error leyendo carpeta ${carpeta}:`, error.message);
  }

  return archivos;
}

function filtrarArchivosPacientes(archivos) {
  return archivos.filter(archivo => {
    const nombre = path.basename(archivo).toLowerCase();
    const carpetaPadre = path.dirname(archivo);

    // Excluir adjuntos clínicos
    if (carpetaPadre.includes('Adjuntos clinicos') || carpetaPadre.includes('Adjuntos clínicos')) {
      return false;
    }

    // Excluir certificados, guías, etc.
    if (nombre.includes('certificado') ||
        nombre.includes('guia') ||
        nombre.includes('guía') ||
        nombre.includes('explicativo') ||
        nombre.includes('informe compin')) {
      return false;
    }

    return true;
  });
}

function dividirPorEncabezados(contenido) {
  const lineas = contenido.split('\n');
  const secciones = [];
  let seccionActual = { titulo: '', contenido: '', orden: 0 };
  let orden = 0;

  for (const linea of lineas) {
    // Detectar encabezado nivel 2: ## Título
    if (linea.trim().startsWith('## ')) {
      // Guardar sección anterior si tiene contenido
      if (seccionActual.contenido.trim()) {
        secciones.push({ ...seccionActual });
        orden++;
      }

      // Nueva sección
      seccionActual = {
        titulo: linea.replace(/^##\s*/, '').trim(),
        contenido: '',
        orden: orden
      };
    } else {
      // Acumular contenido
      seccionActual.contenido += linea + '\n';
    }
  }

  // Última sección
  if (seccionActual.contenido.trim()) {
    secciones.push(seccionActual);
  }

  // Si no hay secciones con ##, toda es una sección de ingreso
  if (secciones.length === 0) {
    secciones.push({
      titulo: 'Ingreso',
      contenido: contenido,
      orden: 0
    });
  }

  return secciones;
}

function inferirFecha(titulo, contenido) {
  // 1. Buscar fecha en título
  const fechaEnTitulo = titulo.match(/(\d{1,2})\s+(?:de\s+)?(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)[a-z]*\s+(\d{4})/i);
  if (fechaEnTitulo) {
    const meses = {
      'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04', 'may': '05', 'jun': '06',
      'jul': '07', 'ago': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
    };
    const dia = fechaEnTitulo[1].padStart(2, '0');
    const mes = meses[fechaEnTitulo[2].toLowerCase().substring(0, 3)];
    const anio = fechaEnTitulo[3];
    return `${anio}-${mes}-${dia}`;
  }

  // 2. Buscar fecha en primeras líneas
  const primerasLineas = contenido.split('\n').slice(0, 5).join(' ');
  const fechaEnContenido = primerasLineas.match(/(\d{1,2})\s+(?:de\s+)?(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)[a-z]*\s+(\d{4})/i);
  if (fechaEnContenido) {
    const meses = {
      'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04', 'may': '05', 'jun': '06',
      'jul': '07', 'ago': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
    };
    const dia = fechaEnContenido[1].padStart(2, '0');
    const mes = meses[fechaEnContenido[2].toLowerCase().substring(0, 3)];
    const anio = fechaEnContenido[3];
    return `${anio}-${mes}-${dia}`;
  }

  // 3. Fecha actual como fallback
  return new Date().toISOString().split('T')[0];
}

async function procesarArchivoMd(rutaArchivo) {
  try {
    const contenidoCompleto = fs.readFileSync(rutaArchivo, 'utf-8');

    // Intentar parsear frontmatter, pero ser tolerante a errores
    let frontmatter = {};
    let content = contenidoCompleto;

    try {
      const parsed = matter(contenidoCompleto);
      frontmatter = parsed.data;
      content = parsed.content;
    } catch (yamlError) {
      // Si falla el parseo YAML, usar el contenido completo
      console.warn(`   ⚠️  Frontmatter inválido en ${path.basename(rutaArchivo)}, usando contenido completo`);
      content = contenidoCompleto;
    }

    // Extraer nombre
    const nombre = frontmatter.paciente ||
                   path.basename(rutaArchivo, '.md').replace(/-/g, ' ');

    // Dividir contenido en secciones
    const secciones = dividirPorEncabezados(content);

    // Extraer datos estructurados del contenido completo
    const rut = extractRUT(contenidoCompleto);
    const edad = extractEdad(contenidoCompleto);
    const fechaNacimiento = extractFechaNacimiento(contenidoCompleto);
    const sexo = extractSexo(contenidoCompleto);
    const email = extractEmail(contenidoCompleto);
    const telefono = extractTelefono(contenidoCompleto);
    const direccion = extractDireccion(contenidoCompleto);
    const diagnostico = extractDiagnostico(contenidoCompleto);
    const medicamentos = extractMedicamentos(contenidoCompleto);
    const alergias = extractAlergias(contenidoCompleto);

    return {
      nombre,
      frontmatter,
      secciones,
      contenidoCompleto,
      datosExtraidos: {
        rut,
        edad,
        fechaNacimiento,
        sexo,
        email,
        telefono,
        direccion,
        diagnostico,
        medicamentos,
        alergias
      },
      archivoOrigen: rutaArchivo
    };
  } catch (error) {
    console.error(`❌ Error procesando ${rutaArchivo}:`, error.message);
    return null;
  }
}

async function limpiarFirebase() {
  console.log('\n🗑️  LIMPIANDO FIREBASE...\n');

  try {
    // Borrar pacientes
    const patientsSnapshot = await getDocs(collection(db, 'patients'));

    console.log(`   Pacientes a borrar: ${patientsSnapshot.size}`);

    if (!DRY_RUN) {
      for (const docSnapshot of patientsSnapshot.docs) {
        await deleteDoc(doc(db, 'patients', docSnapshot.id));
      }
    }

    console.log(`   ✅ Pacientes borrados: ${patientsSnapshot.size}`);

    // Borrar notas clínicas si existen
    const notesSnapshot = await getDocs(collection(db, 'clinicalNotes'));

    console.log(`   Notas clínicas a borrar: ${notesSnapshot.size}`);

    if (!DRY_RUN) {
      for (const docSnapshot of notesSnapshot.docs) {
        await deleteDoc(doc(db, 'clinicalNotes', docSnapshot.id));
      }
    }

    console.log(`   ✅ Notas clínicas borradas: ${notesSnapshot.size}`);

  } catch (error) {
    console.error(`   ❌ Error limpiando Firebase:`, error.message);
    throw error;
  }
}

async function crearPacienteEnFirebase(datos) {
  const { nombre, datosExtraidos, archivoOrigen } = datos;

  const patientData = {
    nombre: nombre,
    rut: datosExtraidos.rut || '00000000-0',
    fechaNacimiento: datosExtraidos.fechaNacimiento || '2000-01-01',
    edad: datosExtraidos.edad || 0,
    sexo: datosExtraidos.sexo,

    // Contacto
    email: datosExtraidos.email || 'sin-email@extrasistema.local',
    telefonos: datosExtraidos.telefono ? [datosExtraidos.telefono] : [],
    direccion: datosExtraidos.direccion || 'Sin dirección registrada',
    comuna: 'Talca',  // Default
    region: 'Maule',

    // Origen CRÍTICO
    origen: 'EXTRASISTEMA',

    // Datos clínicos
    dispositivoAPS: 'Consulta Privada',
    diagnostico: {
      saludMental: datosExtraidos.diagnostico,
      morbilidadMedica: '',
      factoresPsicosociales: ''
    },
    farmacos: datosExtraidos.medicamentos.map(nombre => ({
      nombre,
      dosis: '',
      frecuencia: ''
    })),
    alergias: datosExtraidos.alergias,

    // Administrativos (defaults seguros)
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false,
    isActive: true,

    // Metadata de migración
    archivoOrigenMd: archivoOrigen,
    migradoDesdeObsidian: true,
    fechaMigracion: Timestamp.now()
  };

  if (DRY_RUN) {
    console.log(`   [DRY-RUN] Crearía paciente: ${nombre}`);
    return 'dry-run-id';
  }

  const docRef = await addDoc(collection(db, 'patients'), patientData);
  return docRef.id;
}

async function crearNotasClinicas(pacienteId, datos) {
  const { nombre, secciones, archivoOrigen } = datos;

  for (const seccion of secciones) {
    const nota = {
      pacienteId,
      pacienteNombre: nombre,
      tipo: seccion.orden === 0 ? 'INGRESO' : 'CONTROL',
      titulo: seccion.titulo,
      fecha: inferirFecha(seccion.titulo, seccion.contenido),
      contenidoCompleto: seccion.contenido.trim(),
      ordenEnHistorial: seccion.orden,
      archivoOrigen,
      createdAt: Timestamp.now()
    };

    if (!DRY_RUN) {
      await addDoc(collection(db, 'clinicalNotes'), nota);
    }
  }
}

async function migrarTodos() {
  console.log('\n🚀 INICIANDO MIGRACIÓN DE PACIENTES EXTRASISTEMA A FIREBASE\n');
  console.log('='.repeat(80));

  if (DRY_RUN) {
    console.log('\n⚠️  MODO DRY-RUN: No se escribirá en Firebase\n');
  }

  // Fase 0: Limpiar Firebase
  if (!DRY_RUN) {
    await limpiarFirebase();
  }

  // Fase 1: Escanear archivos
  console.log('\n📂 ESCANEANDO ARCHIVOS...\n');
  const todosArchivos = buscarArchivosMdRecursivo(CARPETA_ORIGEN);
  const archivosPacientes = filtrarArchivosPacientes(todosArchivos);

  console.log(`   Total archivos .md: ${todosArchivos.length}`);
  console.log(`   Archivos de pacientes: ${archivosPacientes.length}`);

  // Fase 2: Migración
  console.log('\n📥 MIGRANDO PACIENTES...\n');

  const stats = {
    total: archivosPacientes.length,
    exitosos: 0,
    errores: 0,
    pacientesCreados: [],
    erroresDetalle: []
  };

  for (let i = 0; i < archivosPacientes.length; i++) {
    const archivo = archivosPacientes[i];

    try {
      const datos = await procesarArchivoMd(archivo);

      if (!datos) {
        stats.errores++;
        continue;
      }

      // Crear paciente
      const pacienteId = await crearPacienteEnFirebase(datos);

      // Crear notas clínicas
      await crearNotasClinicas(pacienteId, datos);

      console.log(`   ✅ [${i + 1}/${archivosPacientes.length}] ${datos.nombre} (${datos.secciones.length} notas)`);

      stats.exitosos++;
      stats.pacientesCreados.push({
        nombre: datos.nombre,
        firestoreId: pacienteId,
        secciones: datos.secciones.length
      });

      // Pausa cada 50 pacientes
      if ((i + 1) % BATCH_SIZE === 0) {
        console.log(`\n   ⏸️  Pausa después de ${i + 1} pacientes...\n`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`   ❌ [${i + 1}/${archivosPacientes.length}] Error en ${path.basename(archivo)}:`, error.message);
      stats.errores++;
      stats.erroresDetalle.push({
        archivo: path.basename(archivo),
        error: error.message
      });
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESUMEN DE MIGRACIÓN:\n');
  console.log(`   Total archivos procesados: ${stats.total}`);
  console.log(`   ✅ Exitosos: ${stats.exitosos}`);
  console.log(`   ❌ Errores: ${stats.errores}`);
  console.log(`   📈 Tasa de éxito: ${((stats.exitosos / stats.total) * 100).toFixed(1)}%`);

  if (stats.errores > 0) {
    console.log('\n⚠️  ERRORES ENCONTRADOS:\n');
    stats.erroresDetalle.forEach((error, idx) => {
      console.log(`   ${idx + 1}. ${error.archivo}: ${error.error}`);
    });
  }

  // Guardar log
  const log = {
    fecha: new Date().toISOString(),
    modo: DRY_RUN ? 'DRY-RUN' : 'PRODUCCIÓN',
    stats,
    timestamp: Date.now()
  };

  const logPath = path.join(process.cwd(), `migracion-log-${Date.now()}.json`);
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

  console.log(`\n📝 Log guardado en: ${logPath}`);
  console.log('\n✅ MIGRACIÓN COMPLETADA\n');
}

// ============================================================================
// EJECUCIÓN
// ============================================================================

migrarTodos().catch(error => {
  console.error('\n💥 ERROR FATAL:', error);
  process.exit(1);
});
