/**
 * Script DEFINITIVO para Extraer TODOS los Controles Embebidos
 *
 * Este script detecta y extrae TODOS los patrones de controles embebidos
 * encontrados en las notas de INGRESO, incluyendo:
 * - Fechas con asteriscos markdown (**fecha**)
 * - Palabra "control:" seguida de fecha
 * - Fechas al inicio de línea con contenido clínico
 * - Secciones de seguimiento telefónico/mail
 * - Controles sin formato claro pero con contenido clínico
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');

// MESES en español y abreviaturas
const MESES_FULL = 'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre';
const MESES_ABREV = 'ene|feb|mar|abr|may|jun|jul|ago|sep|sept|oct|nov|dic';
const MESES = `${MESES_FULL}|${MESES_ABREV}`;

// DÍAS de la semana
const DIAS = 'lunes|martes|miércoles|jueves|viernes|sábado|domingo';

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
  // Formato: "29 enero 2024" o "29 de enero de 2024"
  let match = texto.match(/(\d{1,2})\s+(?:de\s+)?(${MESES})\s+(?:de\s+)?(\d{4})/i);
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
      año = '20' + año;
    }
    return `${año}-${mes}-${dia}`;
  }

  return null;
}

/**
 * Detectar todos los controles embebidos en el contenido
 */
function detectarControlesEmbebidos(contenido, notaId, pacienteId) {
  const lineas = contenido.split('\n');
  const controles = [];
  let controlActual = null;
  let dentroDePlansSection = false;

  // Patrones de detección
  const patronMarkdownBold = new RegExp(`\\*\\*(\\d{1,2}\\s+(?:de\\s+)?(?:${MESES})\\s+(?:de\\s+)?\\d{2,4})\\*\\*`, 'i');
  const patronControl = new RegExp(`control[:\\s]+(?:psiq(?:uiatría)?\\s+)?(?:presencial|telemedicina)?\\s*(?:el\\s+)?(.*)`, 'i');
  const patronControlFechaHora = new RegExp(`control.*?(\\d{1,2}\\s+(?:de\\s+)?(?:${MESES}).*?\\d{2,4})`, 'i');
  const patronFechaInicio = new RegExp(`^(?:${DIAS})?[,\\s]*(\\d{1,2}\\s+(?:de\\s+)?(?:${MESES})\\s+(?:de\\s+)?\\d{4})\\s*[:.-]?(.*)`, 'i');
  const patronFechaNumericaInicio = new RegExp(`^(\\d{1,2}[\\/-]\\d{1,2}[\\/-]\\d{2,4})\\s*[:.-]?(.*)`, 'i');
  const patronSeguimiento = new RegExp(`(?:seguimiento|evaluación)\\s+(?:x\\s+)?(?:mail|telefónico|telemedicina|presencial)`, 'i');

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    const lineaLower = linea.toLowerCase();

    // Guardar control anterior si existe y estamos iniciando uno nuevo
    if (controlActual && (
      patronMarkdownBold.test(linea) ||
      patronControl.test(lineaLower) ||
      (i > 0 && patronFechaInicio.test(linea))
    )) {
      if (controlActual.contenido.trim().length > 50) { // Mínimo contenido significativo
        controles.push(controlActual);
      }
      controlActual = null;
    }

    // PATRÓN 1: Markdown bold **fecha**
    let match = linea.match(patronMarkdownBold);
    if (match) {
      const fecha = extraerFecha(match[1]);
      controlActual = {
        tipo: 'CONTROL',
        titulo: match[1].trim(),
        fecha: fecha,
        contenido: linea + '\n',
        patron: 'markdown_bold',
        lineaInicio: i
      };
      continue;
    }

    // PATRÓN 2: "control:" seguido de información
    if (lineaLower.startsWith('control:') || lineaLower.startsWith('control ')) {
      match = linea.match(patronControlFechaHora);
      if (match) {
        const fecha = extraerFecha(match[1]);
        controlActual = {
          tipo: 'CONTROL',
          titulo: linea,
          fecha: fecha,
          contenido: linea + '\n',
          patron: 'control_keyword',
          lineaInicio: i
        };
        continue;
      }
    }

    // PATRÓN 3: Fecha al inicio de línea (con o sin día de semana)
    match = linea.match(patronFechaInicio);
    if (match && !lineaLower.includes('ingreso')) {
      const fecha = extraerFecha(match[1]);
      const restoLinea = match[2] || '';

      // Verificar que no sea solo una fecha suelta
      if (restoLinea || (i + 1 < lineas.length && lineas[i + 1].trim())) {
        controlActual = {
          tipo: 'CONTROL',
          titulo: match[1].trim() + (restoLinea ? ' - ' + restoLinea.substring(0, 50) : ''),
          fecha: fecha,
          contenido: linea + '\n',
          patron: 'fecha_inicio',
          lineaInicio: i
        };
        continue;
      }
    }

    // PATRÓN 4: Fecha numérica al inicio (27-3-23, 12/9/22)
    match = linea.match(patronFechaNumericaInicio);
    if (match) {
      const fecha = extraerFecha(match[1]);
      const restoLinea = match[2] || '';

      controlActual = {
        tipo: 'CONTROL',
        titulo: match[1] + (restoLinea ? ' - ' + restoLinea.substring(0, 50) : ''),
        fecha: fecha,
        contenido: linea + '\n',
        patron: 'fecha_numerica',
        lineaInicio: i
      };
      continue;
    }

    // PATRÓN 5: Líneas con "Control" + fecha/hora en el texto
    if (lineaLower.includes('control') && !lineaLower.startsWith('control')) {
      match = linea.match(/control\s+(\d{1,2})\s+(${MESES})/i);
      if (match) {
        // Es una referencia a próximo control, no un control actual
        // Pero si estamos en un control, agregarlo al contenido
        if (controlActual) {
          controlActual.contenido += linea + '\n';
        }
        continue;
      }
    }

    // Si estamos en un control actual, seguir agregando contenido
    if (controlActual) {
      // Detectar fin de control por líneas vacías múltiples o nuevo encabezado
      if (linea === '' && i + 1 < lineas.length && lineas[i + 1].trim() === '') {
        // Dos líneas vacías consecutivas, probablemente fin de sección
        if (controlActual.contenido.trim().length > 50) {
          controles.push(controlActual);
        }
        controlActual = null;
      } else if (linea.toLowerCase().startsWith('ingreso') ||
                 linea.toLowerCase().startsWith('## ingreso')) {
        // Nuevo ingreso, terminar control actual
        if (controlActual.contenido.trim().length > 50) {
          controles.push(controlActual);
        }
        controlActual = null;
      } else {
        // Agregar contenido al control actual
        controlActual.contenido += linea + '\n';
      }
    }

    // Detectar sección "Plan" que puede contener referencias a controles
    if (lineaLower === 'plan' || lineaLower === 'plan:') {
      dentroDePlansSection = true;
    } else if (dentroDePlansSection && linea === '') {
      dentroDePlansSection = false;
    }
  }

  // Guardar último control si existe
  if (controlActual && controlActual.contenido.trim().length > 50) {
    controles.push(controlActual);
  }

  // Validar y limpiar controles detectados
  return controles.filter(control => {
    // Filtrar controles que son solo referencias futuras
    const contenidoLower = control.contenido.toLowerCase();
    if (contenidoLower.includes('próximo control') ||
        contenidoLower.includes('proximo control') ||
        contenidoLower.includes('citar para') ||
        contenidoLower.includes('control en ')) {
      // Es solo una cita futura, no un control real
      if (control.contenido.split('\n').length < 3) {
        return false;
      }
    }

    // Debe tener contenido médico relevante
    const tieneMedicacion = /\d+\s*mg|mcg|gr|ml|gotas|comprimidos|tabletas|cápsulas/i.test(control.contenido);
    const tieneEvaluacion = /mejor|peor|estable|síntomas|ansiedad|depresión|ánimo|sueño/i.test(control.contenido);
    const tienePlan = /mantener|continuar|suspender|aumentar|disminuir|iniciar|cambiar/i.test(control.contenido);

    return tieneMedicacion || tieneEvaluacion || tienePlan || control.contenido.split('\n').length > 5;
  });
}

/**
 * Proceso principal
 */
async function procesarNotas() {
  console.log('\n🔍 EXTRACCIÓN EXHAUSTIVA DE CONTROLES EMBEBIDOS\n');
  console.log('═'.repeat(80));
  console.log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN (análisis)' : '⚠️  APLICAR CAMBIOS REALES'}\n`);

  if (DRY_RUN) {
    console.log('💡 Para aplicar cambios: node scripts/extract-all-embedded-controls.cjs --apply\n');
  }

  console.log('═'.repeat(80));

  // Crear directorio de reportes
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const reportFile = path.join(reportsDir, `embedded-controls-${timestamp}.json`);

  try {
    // Obtener solo notas de INGRESO
    console.log('\n📥 Cargando notas de INGRESO...');
    const snapshot = await db.collection('clinicalNotes')
      .where('tipo', '==', 'INGRESO')
      .get();

    console.log(`   Total: ${snapshot.size} notas de INGRESO\n`);

    // Estadísticas
    const stats = {
      totalIngresos: snapshot.size,
      ingresosConControles: 0,
      totalControlesDetectados: 0,
      controlesPorPatron: {
        markdown_bold: 0,
        control_keyword: 0,
        fecha_inicio: 0,
        fecha_numerica: 0,
        otro: 0
      },
      pacientesAfectados: new Set()
    };

    const notasConControles = [];
    const reporteDetallado = [];

    // Analizar cada nota
    console.log('🔬 Analizando notas en busca de controles embebidos...\n');

    let procesadas = 0;
    snapshot.forEach(doc => {
      const nota = { id: doc.id, ...doc.data() };
      procesadas++;

      if (!nota.contenidoCompleto) {
        return;
      }

      const controlesDetectados = detectarControlesEmbebidos(
        nota.contenidoCompleto,
        nota.id,
        nota.patientId || nota.pacienteId
      );

      if (controlesDetectados.length > 0) {
        stats.ingresosConControles++;
        stats.totalControlesDetectados += controlesDetectados.length;
        stats.pacientesAfectados.add(nota.patientId || nota.pacienteId);

        // Contar por patrón
        controlesDetectados.forEach(control => {
          stats.controlesPorPatron[control.patron || 'otro']++;
        });

        notasConControles.push({
          notaOriginal: nota,
          controles: controlesDetectados
        });

        // Agregar al reporte
        reporteDetallado.push({
          notaId: nota.id,
          pacienteId: nota.patientId || nota.pacienteId,
          pacienteNombre: nota.pacienteNombre || nota.patientName || 'Sin nombre',
          cantidadControles: controlesDetectados.length,
          controles: controlesDetectados.map(c => ({
            titulo: c.titulo,
            fecha: c.fecha,
            patron: c.patron,
            primeras50Chars: c.contenido.substring(0, 50).replace(/\n/g, ' ')
          }))
        });
      }

      // Mostrar progreso
      if (procesadas % 50 === 0) {
        process.stdout.write(`   Procesadas: ${procesadas}/${snapshot.size}\r`);
      }
    });

    console.log(`   Procesadas: ${snapshot.size}/${snapshot.size}\n`);

    // Guardar reporte
    fs.writeFileSync(reportFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      modo: DRY_RUN ? 'DRY_RUN' : 'APLICADO',
      estadisticas: {
        ...stats,
        pacientesAfectados: stats.pacientesAfectados.size
      },
      detalles: reporteDetallado
    }, null, 2), 'utf8');

    // Mostrar resultados
    console.log('📊 RESULTADOS DEL ANÁLISIS\n');
    console.log('═'.repeat(80));
    console.log(`\n   Notas INGRESO analizadas: ${stats.totalIngresos}`);
    console.log(`   ⚠️  Notas con controles embebidos: ${stats.ingresosConControles}`);
    console.log(`   📝 Total controles detectados: ${stats.totalControlesDetectados}`);
    console.log(`   👥 Pacientes afectados: ${stats.pacientesAfectados.size}`);

    console.log('\n   📈 Controles por patrón detectado:');
    console.log(`      • Markdown bold (**fecha**): ${stats.controlesPorPatron.markdown_bold}`);
    console.log(`      • Control keyword: ${stats.controlesPorPatron.control_keyword}`);
    console.log(`      • Fecha al inicio: ${stats.controlesPorPatron.fecha_inicio}`);
    console.log(`      • Fecha numérica: ${stats.controlesPorPatron.fecha_numerica}`);
    console.log(`      • Otros: ${stats.controlesPorPatron.otro}`);

    console.log('\n' + '═'.repeat(80));

    // Mostrar ejemplos
    if (notasConControles.length > 0) {
      console.log('\n📋 EJEMPLOS DE CONTROLES DETECTADOS:\n');

      notasConControles.slice(0, 5).forEach((item, i) => {
        const { notaOriginal, controles } = item;
        console.log(`${i + 1}. ${notaOriginal.pacienteNombre || notaOriginal.patientName || 'Sin nombre'}`);
        console.log(`   Paciente ID: ${notaOriginal.patientId || notaOriginal.pacienteId}`);
        console.log(`   Nota ID: ${notaOriginal.id}`);
        console.log(`   Controles detectados: ${controles.length}`);

        controles.slice(0, 3).forEach((control, j) => {
          console.log(`\n      ${j + 1}. ${control.titulo}`);
          console.log(`         Fecha: ${control.fecha || 'Sin fecha'}`);
          console.log(`         Patrón: ${control.patron}`);
          const preview = control.contenido.substring(0, 150).replace(/\n/g, ' ');
          console.log(`         Vista previa: ${preview}...`);
        });

        console.log('');
      });

      if (notasConControles.length > 5) {
        console.log(`   ... y ${notasConControles.length - 5} notas más con controles embebidos\n`);
      }
    }

    // Aplicar cambios si no es dry-run
    if (!DRY_RUN && notasConControles.length > 0) {
      console.log('\n🔧 APLICANDO EXTRACCIÓN DE CONTROLES...\n');
      console.log('═'.repeat(80));

      let procesadas = 0;
      let controlesCreados = 0;

      for (const { notaOriginal, controles } of notasConControles) {
        procesadas++;
        console.log(`\n[${procesadas}/${notasConControles.length}] Procesando: ${notaOriginal.pacienteNombre || 'Sin nombre'}`);
        console.log(`   Paciente ID: ${notaOriginal.patientId || notaOriginal.pacienteId}`);

        // Obtener el orden máximo actual
        const notasExistentes = await db.collection('clinicalNotes')
          .where('patientId', '==', notaOriginal.patientId || notaOriginal.pacienteId)
          .get();

        let maxOrden = 0;
        notasExistentes.forEach(doc => {
          const data = doc.data();
          if (data.ordenEnHistorial && data.ordenEnHistorial > maxOrden) {
            maxOrden = data.ordenEnHistorial;
          }
        });

        // Crear nuevas notas de CONTROL
        for (const control of controles) {
          maxOrden++;

          const nuevaNota = {
            patientId: notaOriginal.patientId,
            pacienteId: notaOriginal.pacienteId,
            tipo: 'CONTROL',
            titulo: control.titulo,
            contenidoCompleto: control.contenido.trim(),
            contenido: control.contenido.substring(0, 500).trim(),
            fecha: control.fecha || notaOriginal.fecha,
            ordenEnHistorial: maxOrden,
            profesional: notaOriginal.profesional || 'Dr. Sistema',
            especialidad: notaOriginal.especialidad || 'Psiquiatría',
            tags: notaOriginal.tags || [],
            adjuntosReferencias: [],
            createdAt: admin.firestore.Timestamp.now(),
            extraidoDeEmbebido: true,
            patronDeteccion: control.patron,
            notaIngresoOriginalId: notaOriginal.id
          };

          // Copiar campos opcionales si existen
          if (notaOriginal.numeroFicha) {
            nuevaNota.numeroFicha = notaOriginal.numeroFicha;
          }
          if (notaOriginal.pacienteNombre) {
            nuevaNota.pacienteNombre = notaOriginal.pacienteNombre;
          }
          if (notaOriginal.patientName) {
            nuevaNota.patientName = notaOriginal.patientName;
          }

          await db.collection('clinicalNotes').add(nuevaNota);
          controlesCreados++;
          console.log(`   ✅ Control creado: ${control.titulo}`);
        }

        // Limpiar el INGRESO original (remover controles extraídos)
        let contenidoLimpio = notaOriginal.contenidoCompleto;

        // Ordenar controles por línea de inicio (de mayor a menor para no afectar índices)
        const controlesOrdenados = controles.sort((a, b) => b.lineaInicio - a.lineaInicio);

        for (const control of controlesOrdenados) {
          // Remover el control del contenido
          contenidoLimpio = contenidoLimpio.replace(control.contenido, '\n');
        }

        // Limpiar líneas vacías múltiples
        contenidoLimpio = contenidoLimpio.replace(/\n{3,}/g, '\n\n').trim();

        // Actualizar el INGRESO
        await db.collection('clinicalNotes').doc(notaOriginal.id).update({
          contenidoCompleto: contenidoLimpio,
          contenido: contenidoLimpio.substring(0, 500).trim(),
          controlesEmbebidosExtraidos: true,
          cantidadControlesExtraidos: controles.length,
          ultimaActualizacion: admin.firestore.Timestamp.now()
        });

        console.log(`   ✏️  INGRESO actualizado (${controles.length} controles removidos)`);
      }

      console.log('\n═'.repeat(80));
      console.log(`\n✅ EXTRACCIÓN COMPLETADA`);
      console.log(`   Notas procesadas: ${procesadas}`);
      console.log(`   Controles creados: ${controlesCreados}`);
    }

    console.log(`\n📄 Reporte guardado en: ${reportFile}`);
    console.log('\n═'.repeat(80));

    if (DRY_RUN && notasConControles.length > 0) {
      console.log('\n💡 Para aplicar la extracción, ejecute:');
      console.log('   node scripts/extract-all-embedded-controls.cjs --apply\n');
    } else if (notasConControles.length === 0) {
      console.log('\n✅ No se detectaron controles embebidos.\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
procesarNotas();