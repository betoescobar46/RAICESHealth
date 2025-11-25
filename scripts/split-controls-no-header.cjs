/**
 * Script para Dividir Controles SIN Headers (texto plano)
 *
 * Detecta controles escritos como texto plano dentro de notas INGRESO:
 *   2 diciembre 2024
 *   control presencial
 *   [contenido...]
 *
 * Y los separa en notas CONTROL independientes.
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');

/**
 * Detecta si una línea tiene formato de fecha de control
 * Ejemplos: "2 diciembre 2024", "22 de mayo de 2025", "3 febrero 2025"
 */
function esFechaControl(linea) {
  const patron = /^[0-9]{1,2}\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?[0-9]{4}\s*$/i;
  return patron.test(linea.trim());
}

/**
 * Detecta si una línea indica "control"
 */
function esLineaControl(linea) {
  const patron = /^control\s+(?:presencial|telemedicina|psiquiatría|psiquiatria|por|en)/i;
  return patron.test(linea.trim());
}

/**
 * Extrae fecha en formato YYYY-MM-DD de una línea de texto
 */
function extraerFecha(linea) {
  const match = linea.match(/(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?(\d{4})/i);

  if (!match) return null;

  const meses = {
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
    'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
    'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
  };

  const dia = match[1].padStart(2, '0');
  const mes = meses[match[2].toLowerCase()];
  const año = match[3];

  return `${año}-${mes}-${dia}`;
}

/**
 * Divide el contenido detectando controles sin headers
 */
function dividirPorControlesSinHeader(contenido) {
  const lineas = contenido.split('\n');
  const secciones = [];

  let seccionActual = {
    tipo: 'INGRESO',
    titulo: 'Ingreso',
    contenido: '',
    fecha: null,
    esControl: false
  };

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i];
    const lineaSiguiente = i + 1 < lineas.length ? lineas[i + 1] : '';

    // Detectar patrón: fecha + "control" en la siguiente línea
    if (esFechaControl(linea) && esLineaControl(lineaSiguiente)) {
      // Guardar sección anterior si tiene contenido
      if (seccionActual.contenido.trim()) {
        secciones.push({ ...seccionActual });
      }

      // Iniciar nueva sección de control
      const fecha = extraerFecha(linea);
      const tituloControl = `${linea.trim()} - ${lineaSiguiente.trim()}`;

      seccionActual = {
        tipo: 'CONTROL',
        titulo: tituloControl,
        contenido: linea + '\n' + lineaSiguiente + '\n',
        fecha: fecha,
        esControl: true
      };

      // Saltar la siguiente línea (ya la procesamos)
      i++;
      continue;
    }

    // Detectar separadores como final de sección
    if (linea.trim() === '---' && seccionActual.esControl) {
      seccionActual.contenido += linea + '\n';

      // Guardar sección de control
      secciones.push({ ...seccionActual });

      // Iniciar nueva sección (probablemente vuelva a INGRESO o sea otro control)
      seccionActual = {
        tipo: 'INGRESO',
        titulo: 'Ingreso (continuación)',
        contenido: '',
        fecha: null,
        esControl: false
      };
      continue;
    }

    // Acumular contenido
    seccionActual.contenido += linea + '\n';
  }

  // Agregar última sección
  if (seccionActual.contenido.trim()) {
    secciones.push(seccionActual);
  }

  return secciones;
}

/**
 * Analiza una nota INGRESO para ver si tiene controles sin headers
 */
function analizarNotaIngreso(nota) {
  if (!nota.contenidoCompleto) {
    return {
      necesitaDivision: false,
      razon: 'No tiene contenidoCompleto'
    };
  }

  if (nota.tipo !== 'INGRESO') {
    return {
      necesitaDivision: false,
      razon: 'No es una nota de INGRESO'
    };
  }

  const secciones = dividirPorControlesSinHeader(nota.contenidoCompleto);

  // Filtrar solo las secciones de control
  const controlesSinHeader = secciones.filter(s => s.tipo === 'CONTROL');

  if (controlesSinHeader.length === 0) {
    return {
      necesitaDivision: false,
      razon: 'No se detectaron controles sin headers',
      secciones: secciones
    };
  }

  return {
    necesitaDivision: true,
    controlesDetectados: controlesSinHeader.length,
    secciones: secciones,
    controles: controlesSinHeader
  };
}

/**
 * Proceso principal
 */
async function procesarNotas() {
  console.log('\n🔍 ANÁLISIS DE CONTROLES SIN HEADERS\n');
  console.log('═'.repeat(80));
  console.log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN (solo análisis)' : '⚠️  APLICAR CAMBIOS REALES'}\n`);

  if (DRY_RUN) {
    console.log('💡 Para aplicar cambios reales, ejecuta: node scripts/split-controls-no-header.cjs --apply\n');
  }

  console.log('═'.repeat(80));

  try {
    // Obtener solo notas de INGRESO
    console.log('\n📥 Cargando notas de INGRESO de Firestore...');
    const snapshot = await db.collection('clinicalNotes')
      .where('tipo', '==', 'INGRESO')
      .get();

    console.log(`   Total: ${snapshot.size} notas de INGRESO\n`);

    // Estadísticas
    const stats = {
      totalNotas: snapshot.size,
      notasAnalizadas: 0,
      notasConControlesSinHeader: 0,
      notasSinCambios: 0,
      controlesDetectados: 0,
      pacientesAfectados: new Set()
    };

    const notasParaDividir = [];

    // Analizar cada nota
    console.log('🔬 Analizando contenido de notas de INGRESO...\n');

    snapshot.forEach(doc => {
      const nota = { id: doc.id, ...doc.data() };
      stats.notasAnalizadas++;

      const analisis = analizarNotaIngreso(nota);

      if (analisis.necesitaDivision) {
        stats.notasConControlesSinHeader++;
        stats.controlesDetectados += analisis.controlesDetectados;
        stats.pacientesAfectados.add(nota.patientId);

        notasParaDividir.push({
          notaOriginal: nota,
          analisis: analisis
        });
      } else {
        stats.notasSinCambios++;
      }
    });

    // Mostrar resultados del análisis
    console.log('📊 RESULTADOS DEL ANÁLISIS\n');
    console.log('═'.repeat(80));
    console.log(`\n   Total de notas INGRESO analizadas: ${stats.notasAnalizadas}`);
    console.log(`   ✅ Notas que NO necesitan cambios: ${stats.notasSinCambios}`);
    console.log(`   ⚠️  Notas con controles sin headers: ${stats.notasConControlesSinHeader}`);
    console.log(`   📝 Total de controles detectados: ${stats.controlesDetectados}`);
    console.log(`   👥 Pacientes afectados: ${stats.pacientesAfectados.size}`);
    console.log('\n' + '═'.repeat(80));

    // Mostrar detalles
    if (notasParaDividir.length > 0) {
      console.log('\n📋 DETALLES DE NOTAS CON CONTROLES SIN HEADERS:\n');

      notasParaDividir.slice(0, 10).forEach((item, i) => {
        const { notaOriginal, analisis } = item;
        console.log(`${i + 1}. Paciente: ${notaOriginal.patientId}`);
        console.log(`   Nota ID: ${notaOriginal.id}`);
        console.log(`   Controles detectados: ${analisis.controlesDetectados}`);

        analisis.controles.forEach((control, j) => {
          console.log(`      ${j + 1}. "${control.titulo}" - ${control.fecha}`);
          const preview = control.contenido.substring(0, 100).replace(/\n/g, ' ');
          console.log(`         Preview: ${preview}...`);
        });

        console.log('');
      });

      if (notasParaDividir.length > 10) {
        console.log(`   ... y ${notasParaDividir.length - 10} notas más\n`);
      }
    }

    // Aplicar cambios si no es dry-run
    if (!DRY_RUN && notasParaDividir.length > 0) {
      console.log('\n🔧 APLICANDO CAMBIOS...\n');
      console.log('═'.repeat(80));

      let procesadas = 0;

      for (const { notaOriginal, analisis } of notasParaDividir) {
        procesadas++;
        console.log(`\n[${procesadas}/${notasParaDividir.length}] Procesando nota ${notaOriginal.id}...`);

        // Obtener el orden actual más alto para este paciente
        const notasExistentes = await db.collection('clinicalNotes')
          .where('patientId', '==', notaOriginal.patientId)
          .get();

        let maxOrden = 0;
        notasExistentes.forEach(doc => {
          const data = doc.data();
          if (data.ordenEnHistorial !== undefined && data.ordenEnHistorial > maxOrden) {
            maxOrden = data.ordenEnHistorial;
          }
        });

        // Crear las nuevas notas de CONTROL
        for (const control of analisis.controles) {
          maxOrden++;

          const nuevaNota = {
            patientId: notaOriginal.patientId,
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
            divididoDeSinHeader: true,
            notaIngresoOriginalId: notaOriginal.id
          };

          if (notaOriginal.numeroFicha) {
            nuevaNota.numeroFicha = notaOriginal.numeroFicha;
          }
          if (notaOriginal.pacienteId) {
            nuevaNota.pacienteId = notaOriginal.pacienteId;
          }

          await db.collection('clinicalNotes').add(nuevaNota);
          console.log(`   ✅ Creado control: ${control.titulo}`);
        }

        // Actualizar nota de INGRESO: remover los controles
        const ingresoLimpio = analisis.secciones
          .filter(s => s.tipo === 'INGRESO')
          .map(s => s.contenido)
          .join('\n');

        await db.collection('clinicalNotes').doc(notaOriginal.id).update({
          contenidoCompleto: ingresoLimpio.trim(),
          contenido: ingresoLimpio.substring(0, 500).trim(),
          controlesExtraidosSinHeader: true
        });

        console.log(`   ✏️  Actualizado INGRESO (controles removidos)`);
      }

      console.log('\n═'.repeat(80));
      console.log('\n✅ CAMBIOS APLICADOS EXITOSAMENTE');
    }

    console.log('\n═'.repeat(80));

    if (DRY_RUN && notasParaDividir.length > 0) {
      console.log('\n💡 TIP: Para aplicar estos cambios, ejecuta:');
      console.log('   node scripts/split-controls-no-header.cjs --apply\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
procesarNotas();
