/**
 * Script ROBUSTO para Extraer Controles Embebidos con Reintentos
 *
 * Versión mejorada que:
 * - Procesa en lotes pequeños para evitar timeouts
 * - Guarda progreso para poder reanudar
 * - Maneja errores de red con reintentos
 * - Evita duplicados verificando controles ya extraídos
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');
const BATCH_SIZE = 10; // Procesar de 10 en 10 para evitar timeouts

// Archivo de progreso
const progressFile = path.join(__dirname, 'progress', 'embedded-extraction-progress.json');
const progressDir = path.join(__dirname, 'progress');

// Crear directorio de progreso si no existe
if (!fs.existsSync(progressDir)) {
  fs.mkdirSync(progressDir);
}

// MESES en español
const MESES_FULL = 'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre';
const MESES_ABREV = 'ene|feb|mar|abr|may|jun|jul|ago|sep|sept|oct|nov|dic';
const MESES = `${MESES_FULL}|${MESES_ABREV}`;

// DÍAS de la semana
const DIAS = 'lunes|martes|miércoles|jueves|viernes|sábado|domingo';

/**
 * Cargar progreso previo
 */
function loadProgress() {
  if (fs.existsSync(progressFile)) {
    const content = fs.readFileSync(progressFile, 'utf8');
    return JSON.parse(content);
  }
  return {
    procesados: [],
    controlesCreados: 0,
    ultimoProcesado: null,
    timestamp: new Date().toISOString()
  };
}

/**
 * Guardar progreso
 */
function saveProgress(progress) {
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf8');
}

/**
 * Convertir nombre de mes a número
 */
function mesANumero(mes) {
  const meses = {
    'enero': '01', 'ene': '01',
    'febrero': '02', 'feb': '02',
    'marzo': '03', 'mar': '03',
    'abril': '04', 'abr': '04',
    'mayo': '05', 'may': '05',
    'junio': '06', 'jun': '06',
    'julio': '07', 'jul': '07',
    'agosto': '08', 'ago': '08',
    'septiembre': '09', 'sep': '09', 'sept': '09',
    'octubre': '10', 'oct': '10',
    'noviembre': '11', 'nov': '11',
    'diciembre': '12', 'dic': '12'
  };
  return meses[mes.toLowerCase()] || null;
}

/**
 * Extraer fecha de diferentes formatos
 */
function extraerFecha(texto) {
  // Formato: "29 enero 2024"
  let match = texto.match(new RegExp(`(\\d{1,2})\\s+(?:de\\s+)?(${MESES})\\s+(?:de\\s+)?(\\d{4})`, 'i'));
  if (match) {
    const dia = match[1].padStart(2, '0');
    const mes = mesANumero(match[2]);
    const año = match[3];
    if (mes) return `${año}-${mes}-${dia}`;
  }

  // Formato: "27-3-23" o "27/3/2023"
  match = texto.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (match) {
    const dia = match[1].padStart(2, '0');
    const mes = match[2].padStart(2, '0');
    let año = match[3];
    if (año.length === 2) {
      año = parseInt(año) > 50 ? '19' + año : '20' + año;
    }
    return `${año}-${mes}-${dia}`;
  }

  return null;
}

/**
 * Detectar controles embebidos simplificado
 */
function detectarControlesEmbebidos(contenido) {
  const lineas = contenido.split('\n');
  const controles = [];
  let controlActual = null;

  // Patrones principales
  const patronMarkdownBold = new RegExp(`\\*\\*(\\d{1,2}\\s+(?:de\\s+)?(?:${MESES})\\s+(?:de\\s+)?\\d{2,4})\\*\\*`, 'i');
  const patronControl = /control[:\s]/i;
  const patronFechaInicio = new RegExp(`^(?:${DIAS})?[,\\s]*(\\d{1,2}\\s+(?:de\\s+)?(?:${MESES})\\s+(?:de\\s+)?\\d{4})`, 'i');
  const patronFechaNumericaInicio = /^(\d{1,2}[\/\-.](\d{1,2})[\/\-.](\d{2,4}))/;

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();

    // Guardar control anterior si existe
    if (controlActual && (
      patronMarkdownBold.test(linea) ||
      patronControl.test(linea.toLowerCase()) ||
      patronFechaInicio.test(linea) ||
      patronFechaNumericaInicio.test(linea)
    )) {
      if (controlActual.contenido.trim().length > 50) {
        controles.push(controlActual);
      }
      controlActual = null;
    }

    // Detectar nuevos controles
    let match = linea.match(patronMarkdownBold);
    if (match) {
      controlActual = {
        titulo: match[1].trim(),
        fecha: extraerFecha(match[1]),
        contenido: linea + '\n',
        patron: 'markdown_bold'
      };
      continue;
    }

    if (patronControl.test(linea.toLowerCase())) {
      const fecha = extraerFecha(linea);
      controlActual = {
        titulo: linea.substring(0, 100),
        fecha: fecha,
        contenido: linea + '\n',
        patron: 'control_keyword'
      };
      continue;
    }

    match = linea.match(patronFechaInicio);
    if (match && !linea.toLowerCase().includes('ingreso')) {
      controlActual = {
        titulo: match[1].trim(),
        fecha: extraerFecha(match[1]),
        contenido: linea + '\n',
        patron: 'fecha_inicio'
      };
      continue;
    }

    match = linea.match(patronFechaNumericaInicio);
    if (match) {
      controlActual = {
        titulo: match[1],
        fecha: extraerFecha(match[1]),
        contenido: linea + '\n',
        patron: 'fecha_numerica'
      };
      continue;
    }

    // Agregar contenido al control actual
    if (controlActual) {
      controlActual.contenido += linea + '\n';

      // Limitar contenido a 20 líneas
      if (controlActual.contenido.split('\n').length > 20) {
        controles.push(controlActual);
        controlActual = null;
      }
    }
  }

  // Guardar último control
  if (controlActual && controlActual.contenido.trim().length > 50) {
    controles.push(controlActual);
  }

  return controles;
}

/**
 * Procesar un lote de notas
 */
async function procesarLote(notas, progress) {
  const resultados = {
    exitosos: 0,
    fallidos: 0,
    controlesCreados: 0
  };

  for (const nota of notas) {
    // Verificar si ya fue procesada
    if (progress.procesados.includes(nota.id)) {
      console.log(`   ⏭️  Ya procesado: ${nota.id}`);
      continue;
    }

    try {
      const pacienteId = nota.patientId || nota.pacienteId;
      const pacienteNombre = nota.pacienteNombre || nota.patientName || 'Sin nombre';

      if (!nota.contenidoCompleto || !pacienteId) {
        continue;
      }

      // Verificar si ya fue marcado como extraído
      if (nota.controlesEmbebidosExtraidos) {
        console.log(`   ✓ Ya extraído anteriormente: ${pacienteNombre}`);
        progress.procesados.push(nota.id);
        continue;
      }

      const controles = detectarControlesEmbebidos(nota.contenidoCompleto);

      if (controles.length === 0) {
        progress.procesados.push(nota.id);
        continue;
      }

      console.log(`   📝 Procesando: ${pacienteNombre} (${controles.length} controles)`);

      if (!DRY_RUN) {
        // Obtener orden máximo
        const notasExistentes = await db.collection('clinicalNotes')
          .where('patientId', '==', pacienteId)
          .get();

        let maxOrden = 0;
        notasExistentes.forEach(doc => {
          const data = doc.data();
          if (data.ordenEnHistorial && data.ordenEnHistorial > maxOrden) {
            maxOrden = data.ordenEnHistorial;
          }
        });

        // Crear controles
        for (const control of controles) {
          maxOrden++;

          const nuevaNota = {
            patientId: pacienteId,
            pacienteId: pacienteId,
            tipo: 'CONTROL',
            titulo: control.titulo,
            contenidoCompleto: control.contenido.trim(),
            contenido: control.contenido.substring(0, 500).trim(),
            fecha: control.fecha || nota.fecha,
            ordenEnHistorial: maxOrden,
            profesional: nota.profesional || 'Dr. Sistema',
            especialidad: nota.especialidad || 'Psiquiatría',
            createdAt: admin.firestore.Timestamp.now(),
            extraidoDeEmbebido: true,
            patronDeteccion: control.patron,
            notaIngresoOriginalId: nota.id
          };

          if (nota.numeroFicha) nuevaNota.numeroFicha = nota.numeroFicha;
          if (nota.pacienteNombre) nuevaNota.pacienteNombre = nota.pacienteNombre;

          await db.collection('clinicalNotes').add(nuevaNota);
          resultados.controlesCreados++;
        }

        // Limpiar el INGRESO
        let contenidoLimpio = nota.contenidoCompleto;
        for (const control of controles) {
          contenidoLimpio = contenidoLimpio.replace(control.contenido, '\n');
        }
        contenidoLimpio = contenidoLimpio.replace(/\n{3,}/g, '\n\n').trim();

        await db.collection('clinicalNotes').doc(nota.id).update({
          contenidoCompleto: contenidoLimpio,
          contenido: contenidoLimpio.substring(0, 500).trim(),
          controlesEmbebidosExtraidos: true,
          cantidadControlesExtraidos: controles.length,
          ultimaActualizacion: admin.firestore.Timestamp.now()
        });
      }

      resultados.exitosos++;
      progress.procesados.push(nota.id);
      progress.controlesCreados += controles.length;
      progress.ultimoProcesado = nota.id;

    } catch (error) {
      console.error(`   ❌ Error procesando ${nota.id}:`, error.message);
      resultados.fallidos++;

      // Esperar antes de continuar si hay error de red
      if (error.message.includes('UNAVAILABLE') || error.message.includes('ECONNRESET')) {
        console.log('   ⏳ Esperando 5 segundos antes de continuar...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  return resultados;
}

/**
 * Proceso principal
 */
async function procesarNotas() {
  console.log('\n🔍 EXTRACCIÓN ROBUSTA DE CONTROLES EMBEBIDOS\n');
  console.log('═'.repeat(80));
  console.log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN' : '⚠️  APLICAR CAMBIOS'}`);
  console.log(`Tamaño de lote: ${BATCH_SIZE} notas\n`);
  console.log('═'.repeat(80));

  try {
    // Cargar progreso previo
    const progress = loadProgress();

    if (progress.procesados.length > 0) {
      console.log(`\n📂 Continuando desde progreso anterior:`);
      console.log(`   Notas ya procesadas: ${progress.procesados.length}`);
      console.log(`   Controles creados: ${progress.controlesCreados}\n`);
    }

    // Obtener notas de INGRESO
    console.log('📥 Cargando notas de INGRESO...');
    const snapshot = await db.collection('clinicalNotes')
      .where('tipo', '==', 'INGRESO')
      .get();

    const notasSinProcesar = [];
    snapshot.forEach(doc => {
      const nota = { id: doc.id, ...doc.data() };

      // Solo agregar si no fue procesada
      if (!progress.procesados.includes(nota.id)) {
        notasSinProcesar.push(nota);
      }
    });

    console.log(`   Total INGRESO: ${snapshot.size}`);
    console.log(`   Ya procesadas: ${progress.procesados.length}`);
    console.log(`   Por procesar: ${notasSinProcesar.length}\n`);

    if (notasSinProcesar.length === 0) {
      console.log('✅ Todas las notas ya fueron procesadas\n');
      return;
    }

    // Procesar en lotes
    const totalLotes = Math.ceil(notasSinProcesar.length / BATCH_SIZE);
    let loteNum = 0;

    for (let i = 0; i < notasSinProcesar.length; i += BATCH_SIZE) {
      loteNum++;
      const lote = notasSinProcesar.slice(i, i + BATCH_SIZE);

      console.log(`\n📦 Procesando lote ${loteNum}/${totalLotes} (${lote.length} notas):`);

      const resultado = await procesarLote(lote, progress);

      console.log(`   ✅ Exitosos: ${resultado.exitosos}`);
      console.log(`   ❌ Fallidos: ${resultado.fallidos}`);
      console.log(`   📝 Controles creados: ${resultado.controlesCreados}`);

      // Guardar progreso después de cada lote
      saveProgress(progress);

      // Pausa entre lotes para evitar sobrecarga
      if (i + BATCH_SIZE < notasSinProcesar.length) {
        console.log('   ⏳ Esperando 2 segundos antes del siguiente lote...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Resumen final
    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 RESUMEN FINAL:');
    console.log(`   Total notas procesadas: ${progress.procesados.length}`);
    console.log(`   Total controles creados: ${progress.controlesCreados}`);

    if (!DRY_RUN) {
      console.log('\n✅ EXTRACCIÓN COMPLETADA EXITOSAMENTE');

      // Limpiar archivo de progreso
      if (fs.existsSync(progressFile)) {
        fs.unlinkSync(progressFile);
        console.log('   📄 Archivo de progreso eliminado');
      }
    } else {
      console.log('\n💡 Para aplicar los cambios, ejecute:');
      console.log('   node scripts/extract-embedded-robust.cjs --apply');
    }

  } catch (error) {
    console.error('\n❌ Error crítico:', error);
    console.log('\n💡 El progreso ha sido guardado. Puede reejecutar el script para continuar.');
    process.exit(1);
  }

  console.log('\n' + '═'.repeat(80) + '\n');
  process.exit(0);
}

// Ejecutar
procesarNotas();