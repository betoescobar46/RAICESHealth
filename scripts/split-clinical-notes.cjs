/**
 * Script para Dividir Notas Clínicas Mezcladas
 *
 * Analiza notas que tienen múltiples visitas mezcladas y las separa correctamente:
 * - 1 nota de INGRESO
 * - N notas de CONTROL (una por cada visita de seguimiento)
 *
 * Uso:
 *   node scripts/split-clinical-notes.cjs --dry-run  # Ver qué se haría sin modificar
 *   node scripts/split-clinical-notes.cjs --apply     # Aplicar cambios reales
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');

// Subsecciones estándar que pertenecen al ingreso (NO son visitas separadas)
const SUBSECCIONES_ESTANDAR = [
  'anamnesis remota',
  'anamnesis proxima',
  'anamnesis próxima',
  'examen mental',
  'examen fisico',
  'examen físico',
  'otros examenes',
  'otros exámenes',
  'diagnosticos',
  'diagnósticos',
  'indicaciones',
  'plan terapeutico',
  'plan terapéutico',
  'antecedentes',
  'antecedentes mórbidos',
  'antecedentes morbidos',
  'farmacoterapia',
  'tratamiento',
  'evaluacion',
  'evaluación',
  'impresion diagnostica',
  'impresión diagnóstica',
  'exámenes',
  'examenes',
  'medicación',
  'medicacion'
];

/**
 * Detecta si un header representa una visita separada (control)
 */
function esVisitaSeparada(linea) {
  const lineaTrim = linea.trim();

  // Debe ser un header (# o ##)
  if (!lineaTrim.startsWith('#')) return false;

  // Extraer el título sin los # iniciales
  const titulo = lineaTrim.replace(/^#+\s*/, '');

  // Patrón de fecha en formato: "22 de octubre de 2025" o "22 octubre 2025"
  const patronFecha = /\d{1,2}\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?\d{4}/i;

  // Palabras clave de visita
  const esControl = /control|seguimiento|evaluaci[oó]n/i.test(titulo);

  // Es visita separada si tiene fecha Y palabra clave
  return patronFecha.test(titulo) && esControl;
}

/**
 * Detecta si un header es una subsección estándar
 */
function esSubseccionEstandar(linea) {
  const lineaTrim = linea.trim().toLowerCase();

  // Debe ser un header ##
  if (!lineaTrim.startsWith('##')) return false;

  const titulo = lineaTrim.replace(/^##\s*/, '').trim();

  return SUBSECCIONES_ESTANDAR.some(sub => titulo.includes(sub));
}

/**
 * Extrae la fecha de un header de visita
 */
function extraerFecha(titulo) {
  // Buscar patrón: "22 de octubre de 2025" o "22 octubre 2025"
  const match = titulo.match(/(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?(\d{4})/i);

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
 * Divide el contenido de una nota en secciones (ingreso + controles)
 */
function dividirNota(contenidoCompleto) {
  const lineas = contenidoCompleto.split('\n');
  const secciones = [];

  let seccionActual = {
    tipo: 'INGRESO',
    titulo: 'Ingreso',
    contenido: '',
    fecha: null,
    orden: 0
  };

  for (const linea of lineas) {
    // Detectar si es una visita separada (control)
    if (esVisitaSeparada(linea)) {
      // Guardar sección anterior si tiene contenido
      if (seccionActual.contenido.trim()) {
        secciones.push({ ...seccionActual });
      }

      // Iniciar nueva sección de control
      const titulo = linea.replace(/^#+\s*/, '').trim();
      const fecha = extraerFecha(titulo);

      seccionActual = {
        tipo: 'CONTROL',
        titulo: titulo,
        contenido: linea + '\n',
        fecha: fecha,
        orden: secciones.length
      };
    }
    // Subsecciones estándar o contenido normal
    else {
      seccionActual.contenido += linea + '\n';
    }
  }

  // Agregar última sección
  if (seccionActual.contenido.trim()) {
    secciones.push(seccionActual);
  }

  return secciones;
}

/**
 * Analiza una nota y determina si necesita ser dividida
 */
function analizarNota(nota) {
  if (!nota.contenidoCompleto) {
    return {
      necesitaDivision: false,
      razon: 'No tiene contenidoCompleto'
    };
  }

  const secciones = dividirNota(nota.contenidoCompleto);

  if (secciones.length <= 1) {
    return {
      necesitaDivision: false,
      razon: 'Solo tiene 1 sección (no necesita división)',
      secciones: secciones
    };
  }

  return {
    necesitaDivision: true,
    seccionesOriginales: 1,
    seccionesNuevas: secciones.length,
    secciones: secciones
  };
}

/**
 * Proceso principal
 */
async function procesarNotas() {
  console.log('\n🔍 ANÁLISIS Y DIVISIÓN DE NOTAS CLÍNICAS\n');
  console.log('═'.repeat(80));
  console.log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN (solo análisis)' : '⚠️  APLICAR CAMBIOS REALES'}\n`);

  if (DRY_RUN) {
    console.log('💡 Para aplicar cambios reales, ejecuta: node scripts/split-clinical-notes.cjs --apply\n');
  }

  console.log('═'.repeat(80));

  try {
    // Obtener todas las notas
    console.log('\n📥 Cargando notas de Firestore...');
    const snapshot = await db.collection('clinicalNotes').get();
    console.log(`   Total: ${snapshot.size} notas\n`);

    // Estadísticas
    const stats = {
      totalNotas: snapshot.size,
      notasAnalizadas: 0,
      notasQueDividir: 0,
      notasSinCambios: 0,
      nuevasNotasCreadas: 0,
      pacientesAfectados: new Set()
    };

    const notasParaDividir = [];

    // Analizar cada nota
    console.log('🔬 Analizando contenido de notas...\n');

    snapshot.forEach(doc => {
      const nota = { id: doc.id, ...doc.data() };
      stats.notasAnalizadas++;

      const analisis = analizarNota(nota);

      if (analisis.necesitaDivision) {
        stats.notasQueDividir++;
        stats.pacientesAfectados.add(nota.patientId);
        stats.nuevasNotasCreadas += (analisis.seccionesNuevas - 1); // -1 porque reemplaza la original

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
    console.log(`\n   Total de notas analizadas: ${stats.notasAnalizadas}`);
    console.log(`   ✅ Notas que NO necesitan cambios: ${stats.notasSinCambios}`);
    console.log(`   ⚠️  Notas que necesitan división: ${stats.notasQueDividir}`);
    console.log(`   👥 Pacientes afectados: ${stats.pacientesAfectados.size}`);
    console.log(`   ➕ Nuevas notas a crear: ${stats.nuevasNotasCreadas}`);
    console.log('\n' + '═'.repeat(80));

    // Mostrar detalles de las notas a dividir
    if (notasParaDividir.length > 0) {
      console.log('\n📋 DETALLES DE NOTAS A DIVIDIR:\n');

      notasParaDividir.slice(0, 10).forEach((item, i) => {
        const { notaOriginal, analisis } = item;
        console.log(`${i + 1}. Paciente: ${notaOriginal.patientId}`);
        console.log(`   Nota ID: ${notaOriginal.id}`);
        console.log(`   Tipo actual: ${notaOriginal.tipo}`);
        console.log(`   Secciones detectadas: ${analisis.seccionesNuevas}`);

        analisis.secciones.forEach((seccion, j) => {
          const preview = seccion.contenido.substring(0, 60).replace(/\n/g, ' ');
          console.log(`      ${j + 1}. [${seccion.tipo}] ${seccion.titulo} - ${seccion.fecha || 'sin fecha'}`);
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

        // Crear nuevas notas (una por cada sección)
        for (let i = 0; i < analisis.secciones.length; i++) {
          const seccion = analisis.secciones[i];

          const nuevaNota = {
            patientId: notaOriginal.patientId,
            tipo: seccion.tipo,
            titulo: seccion.titulo,
            contenidoCompleto: seccion.contenido.trim(),
            contenido: seccion.contenido.substring(0, 500).trim(), // Preview
            fecha: seccion.fecha || notaOriginal.fecha,
            ordenEnHistorial: seccion.orden,
            profesional: notaOriginal.profesional || 'Dr. Sistema',
            especialidad: notaOriginal.especialidad || 'Psiquiatría',
            tags: notaOriginal.tags || [],
            adjuntosReferencias: notaOriginal.adjuntosReferencias || [],
            createdAt: admin.firestore.Timestamp.now(),
            migradoDividido: true, // Flag para saber que fue dividida
            notaOriginalId: notaOriginal.id
          };

          // Agregar campos opcionales solo si existen
          if (notaOriginal.numeroFicha) {
            nuevaNota.numeroFicha = notaOriginal.numeroFicha;
          }
          if (notaOriginal.pacienteId) {
            nuevaNota.pacienteId = notaOriginal.pacienteId;
          }

          await db.collection('clinicalNotes').add(nuevaNota);
          console.log(`   ✅ Creada: [${seccion.tipo}] ${seccion.titulo}`);
        }

        // Eliminar nota original
        await db.collection('clinicalNotes').doc(notaOriginal.id).delete();
        console.log(`   🗑️  Eliminada nota original ${notaOriginal.id}`);
      }

      console.log('\n═'.repeat(80));
      console.log('\n✅ CAMBIOS APLICADOS EXITOSAMENTE');
    }

    console.log('\n═'.repeat(80));

    if (DRY_RUN && notasParaDividir.length > 0) {
      console.log('\n💡 TIP: Para aplicar estos cambios, ejecuta:');
      console.log('   node scripts/split-clinical-notes.cjs --apply\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
procesarNotas();
