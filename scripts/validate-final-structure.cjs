/**
 * Script de Validación Final de Estructura de Notas Clínicas
 *
 * Verifica que la organización de notas clínicas sea correcta después de las operaciones de división:
 * - Phase 1: División de notas con headers (#)
 * - Phase 2: División de controles sin headers (texto plano)
 *
 * Uso:
 *   node scripts/validate-final-structure.cjs                    # Validación completa
 *   node scripts/validate-final-structure.cjs --patient [RUT]    # Paciente específico
 *   node scripts/validate-final-structure.cjs --patient [ID]     # Paciente específico
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Estadísticas globales
const stats = {
  totalNotas: 0,
  totalPacientes: 0,
  notasPorTipo: {},
  promedioNotasPorPaciente: 0,

  // Validaciones
  notasConTitulo: 0,
  notasSinTitulo: 0,
  notasConOrden: 0,
  notasSinOrden: 0,
  notasConFecha: 0,
  notasSinFecha: 0,
  notasConTipo: 0,
  notasSinTipo: 0,

  // Problemas
  pacientesConMultiplesIngresos: [],
  ingresosConOrdenIncorrecto: [],
  controlesConOrdenCero: [],
  notasConCamposFaltantes: [],
  ingresosConControlesEmbebidos: [],

  // Contadores de problemas
  totalProblemas: 0
};

/**
 * Detecta si el contenido tiene controles embebidos (patrón de texto plano)
 */
function tieneControlesEmbebidos(contenido) {
  if (!contenido) return false;

  const lineas = contenido.split('\n');

  for (let i = 0; i < lineas.length - 1; i++) {
    const linea = lineas[i].trim();
    const lineaSiguiente = lineas[i + 1].trim();

    // Patrón: "DD month YYYY" seguido de "control presencial/telemedicina"
    const patronFecha = /^[0-9]{1,2}\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?[0-9]{4}\s*$/i;
    const patronControl = /^control\s+(?:presencial|telemedicina|psiquiatría|psiquiatria|por|en)/i;

    if (patronFecha.test(linea) && patronControl.test(lineaSiguiente)) {
      return true;
    }
  }

  return false;
}

/**
 * Valida la estructura de un paciente individual
 */
function validarPaciente(patientId, notas) {
  const problemas = [];

  // Ordenar notas por ordenEnHistorial
  const notasOrdenadas = [...notas].sort((a, b) => {
    const ordenA = a.ordenEnHistorial ?? 999;
    const ordenB = b.ordenEnHistorial ?? 999;
    return ordenA - ordenB;
  });

  // Contar INGRESOS
  const ingresos = notasOrdenadas.filter(n => n.tipo === 'INGRESO');

  if (ingresos.length > 1) {
    problemas.push({
      tipo: 'MULTIPLE_INGRESOS',
      mensaje: `Paciente tiene ${ingresos.length} notas de INGRESO (debería tener máximo 1)`,
      notasAfectadas: ingresos.map(i => ({ id: i.id, titulo: i.titulo }))
    });
    stats.pacientesConMultiplesIngresos.push({
      patientId,
      pacienteNombre: notas[0]?.pacienteNombre || 'Sin nombre',
      cantidadIngresos: ingresos.length,
      ingresos: ingresos.map(i => ({ id: i.id, titulo: i.titulo, fecha: i.fecha }))
    });
  }

  // Validar cada nota
  notasOrdenadas.forEach(nota => {
    const camposFaltantes = [];

    // Validar campos obligatorios
    if (!nota.titulo) {
      stats.notasSinTitulo++;
      camposFaltantes.push('titulo');
    } else {
      stats.notasConTitulo++;
    }

    if (nota.ordenEnHistorial === undefined || nota.ordenEnHistorial === null) {
      stats.notasSinOrden++;
      camposFaltantes.push('ordenEnHistorial');
    } else {
      stats.notasConOrden++;
    }

    if (!nota.fecha) {
      stats.notasSinFecha++;
      camposFaltantes.push('fecha');
    } else {
      stats.notasConFecha++;
    }

    if (!nota.tipo) {
      stats.notasSinTipo++;
      camposFaltantes.push('tipo');
    } else {
      stats.notasConTipo++;
    }

    // Guardar nota con campos faltantes
    if (camposFaltantes.length > 0) {
      stats.notasConCamposFaltantes.push({
        patientId,
        pacienteNombre: notas[0]?.pacienteNombre || 'Sin nombre',
        notaId: nota.id,
        titulo: nota.titulo || 'Sin título',
        camposFaltantes
      });
    }

    // Validar INGRESO
    if (nota.tipo === 'INGRESO') {
      // INGRESO debe tener ordenEnHistorial = 0
      if (nota.ordenEnHistorial !== 0 && nota.ordenEnHistorial !== undefined) {
        stats.ingresosConOrdenIncorrecto.push({
          patientId,
          pacienteNombre: notas[0]?.pacienteNombre || 'Sin nombre',
          notaId: nota.id,
          titulo: nota.titulo,
          ordenActual: nota.ordenEnHistorial
        });
        problemas.push({
          tipo: 'INGRESO_ORDEN_INCORRECTO',
          mensaje: `INGRESO tiene ordenEnHistorial=${nota.ordenEnHistorial} (debería ser 0)`,
          notaId: nota.id
        });
      }

      // Verificar si tiene controles embebidos
      if (tieneControlesEmbebidos(nota.contenidoCompleto)) {
        stats.ingresosConControlesEmbebidos.push({
          patientId,
          pacienteNombre: notas[0]?.pacienteNombre || 'Sin nombre',
          notaId: nota.id,
          titulo: nota.titulo
        });
        problemas.push({
          tipo: 'CONTROLES_EMBEBIDOS',
          mensaje: 'INGRESO contiene controles embebidos sin procesar',
          notaId: nota.id
        });
      }
    }

    // Validar CONTROL
    if (nota.tipo === 'CONTROL') {
      // CONTROL debe tener ordenEnHistorial > 0
      if (nota.ordenEnHistorial === 0) {
        stats.controlesConOrdenCero.push({
          patientId,
          pacienteNombre: notas[0]?.pacienteNombre || 'Sin nombre',
          notaId: nota.id,
          titulo: nota.titulo
        });
        problemas.push({
          tipo: 'CONTROL_ORDEN_CERO',
          mensaje: 'CONTROL tiene ordenEnHistorial=0 (debería ser > 0)',
          notaId: nota.id
        });
      }
    }
  });

  return {
    notas: notasOrdenadas,
    problemas,
    tieneProblemas: problemas.length > 0
  };
}

/**
 * Muestra detalles de un paciente específico
 */
function mostrarDetallesPaciente(patientId, notas, validacion) {
  const pacienteNombre = notas[0]?.pacienteNombre || 'Sin nombre';

  console.log(`\n${colors.cyan}${colors.bright}Paciente: ${pacienteNombre}${colors.reset}`);
  console.log(`${colors.dim}ID: ${patientId}${colors.reset}`);
  console.log(`Total de notas: ${notas.length}`);

  if (validacion.tieneProblemas) {
    console.log(`${colors.red}Problemas detectados: ${validacion.problemas.length}${colors.reset}`);
  } else {
    console.log(`${colors.green}Sin problemas${colors.reset}`);
  }

  console.log('\nNotas:');
  validacion.notas.forEach((nota, index) => {
    const tipoColor = nota.tipo === 'INGRESO' ? colors.blue : colors.magenta;
    const fechaStr = nota.fecha || 'Sin fecha';
    const ordenStr = nota.ordenEnHistorial !== undefined ? nota.ordenEnHistorial : '?';

    console.log(`  ${index + 1}. ${tipoColor}[${nota.tipo}]${colors.reset} ${nota.titulo || 'Sin título'}`);
    console.log(`     ${colors.dim}Fecha: ${fechaStr} | Orden: ${ordenStr} | ID: ${nota.id}${colors.reset}`);
  });

  if (validacion.problemas.length > 0) {
    console.log(`\n${colors.yellow}Problemas:${colors.reset}`);
    validacion.problemas.forEach((problema, index) => {
      console.log(`  ${index + 1}. ${colors.red}${problema.tipo}${colors.reset}: ${problema.mensaje}`);
    });
  }

  console.log('');
}

/**
 * Procesa todas las notas y genera el reporte
 */
async function validarEstructura() {
  console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}   VALIDACIÓN FINAL DE ESTRUCTURA DE NOTAS CLÍNICAS${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // Verificar si se solicita un paciente específico
  const patientArg = process.argv.find((arg, index) =>
    process.argv[index - 1] === '--patient'
  );

  if (patientArg) {
    await validarPacienteEspecifico(patientArg);
    return;
  }

  try {
    console.log(`${colors.blue}📥 Cargando notas de Firestore...${colors.reset}`);
    const snapshot = await db.collection('clinicalNotes').get();

    stats.totalNotas = snapshot.size;
    console.log(`   Total: ${stats.totalNotas} notas\n`);

    // Agrupar por paciente
    const notasPorPaciente = new Map();

    snapshot.forEach(doc => {
      const data = doc.data();
      const patientId = data.patientId || data.pacienteId;

      if (!notasPorPaciente.has(patientId)) {
        notasPorPaciente.set(patientId, []);
      }

      notasPorPaciente.get(patientId).push({
        id: doc.id,
        ...data
      });

      // Contar por tipo
      const tipo = data.tipo || 'SIN_TIPO';
      stats.notasPorTipo[tipo] = (stats.notasPorTipo[tipo] || 0) + 1;
    });

    stats.totalPacientes = notasPorPaciente.size;
    stats.promedioNotasPorPaciente = stats.totalNotas / stats.totalPacientes;

    console.log(`${colors.blue}🔍 Analizando estructura de notas...${colors.reset}\n`);

    // Validar cada paciente
    const pacientesConProblemas = [];
    const pacientesSinProblemas = [];

    for (const [patientId, notas] of notasPorPaciente.entries()) {
      const validacion = validarPaciente(patientId, notas);

      if (validacion.tieneProblemas) {
        pacientesConProblemas.push({ patientId, notas, validacion });
        stats.totalProblemas += validacion.problemas.length;
      } else {
        pacientesSinProblemas.push({ patientId, notas, validacion });
      }
    }

    // Mostrar resultados
    mostrarResultadosCompletos(pacientesConProblemas, pacientesSinProblemas);

    // Determinar código de salida
    const hayProblemas = stats.totalProblemas > 0;
    process.exit(hayProblemas ? 1 : 0);

  } catch (error) {
    console.error(`\n${colors.red}❌ Error durante la validación:${colors.reset}`, error);
    process.exit(1);
  }
}

/**
 * Valida un paciente específico
 */
async function validarPacienteEspecifico(identifier) {
  console.log(`${colors.blue}🔍 Buscando paciente: ${identifier}${colors.reset}\n`);

  try {
    // Buscar por patientId o RUT
    let snapshot = await db.collection('clinicalNotes')
      .where('patientId', '==', identifier)
      .get();

    if (snapshot.empty) {
      // Intentar buscar en la colección de pacientes por RUT
      const patientsSnapshot = await db.collection('patients')
        .where('rut', '==', identifier)
        .get();

      if (!patientsSnapshot.empty) {
        const patientDoc = patientsSnapshot.docs[0];
        const patientId = patientDoc.id;

        snapshot = await db.collection('clinicalNotes')
          .where('patientId', '==', patientId)
          .get();
      }
    }

    if (snapshot.empty) {
      console.log(`${colors.yellow}⚠️  No se encontraron notas para el paciente: ${identifier}${colors.reset}\n`);
      process.exit(0);
      return;
    }

    const notas = [];
    snapshot.forEach(doc => {
      notas.push({ id: doc.id, ...doc.data() });
    });

    const patientId = notas[0].patientId;
    const validacion = validarPaciente(patientId, notas);

    mostrarDetallesPaciente(patientId, notas, validacion);

    process.exit(validacion.tieneProblemas ? 1 : 0);

  } catch (error) {
    console.error(`\n${colors.red}❌ Error:${colors.reset}`, error);
    process.exit(1);
  }
}

/**
 * Muestra los resultados completos de la validación
 */
function mostrarResultadosCompletos(pacientesConProblemas, pacientesSinProblemas) {
  // 1. CONTEOS Y REPORTES
  console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.green}   1. CONTEOS Y REPORTES${colors.reset}`);
  console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.bright}Total de notas clínicas:${colors.reset} ${stats.totalNotas}`);
  console.log(`${colors.bright}Total de pacientes:${colors.reset} ${stats.totalPacientes}`);
  console.log(`${colors.bright}Promedio de notas por paciente:${colors.reset} ${stats.promedioNotasPorPaciente.toFixed(2)}\n`);

  console.log(`${colors.bright}Desglose por tipo:${colors.reset}`);
  Object.entries(stats.notasPorTipo).forEach(([tipo, count]) => {
    const porcentaje = ((count / stats.totalNotas) * 100).toFixed(1);
    const tipoColor = tipo === 'INGRESO' ? colors.blue : tipo === 'CONTROL' ? colors.magenta : colors.yellow;
    console.log(`  ${tipoColor}${tipo}:${colors.reset} ${count} (${porcentaje}%)`);
  });

  // 2. VALIDACIÓN DE ESTRUCTURA
  console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}   2. VALIDACIÓN DE ESTRUCTURA${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // Campo: titulo
  console.log(`${colors.bright}Campo "titulo":${colors.reset}`);
  const tituloOk = stats.notasConTitulo === stats.totalNotas;
  console.log(`  ${tituloOk ? colors.green + '✅' : colors.red + '❌'} Con título: ${stats.notasConTitulo}/${stats.totalNotas}${colors.reset}`);
  if (stats.notasSinTitulo > 0) {
    console.log(`  ${colors.red}❌ Sin título: ${stats.notasSinTitulo}${colors.reset}`);
  }

  // Campo: ordenEnHistorial
  console.log(`\n${colors.bright}Campo "ordenEnHistorial":${colors.reset}`);
  const ordenOk = stats.notasConOrden === stats.totalNotas;
  console.log(`  ${ordenOk ? colors.green + '✅' : colors.red + '❌'} Con orden: ${stats.notasConOrden}/${stats.totalNotas}${colors.reset}`);
  if (stats.notasSinOrden > 0) {
    console.log(`  ${colors.red}❌ Sin orden: ${stats.notasSinOrden}${colors.reset}`);
  }

  // Campo: fecha
  console.log(`\n${colors.bright}Campo "fecha":${colors.reset}`);
  const fechaOk = stats.notasConFecha === stats.totalNotas;
  console.log(`  ${fechaOk ? colors.green + '✅' : colors.red + '❌'} Con fecha: ${stats.notasConFecha}/${stats.totalNotas}${colors.reset}`);
  if (stats.notasSinFecha > 0) {
    console.log(`  ${colors.red}❌ Sin fecha: ${stats.notasSinFecha}${colors.reset}`);
  }

  // Campo: tipo
  console.log(`\n${colors.bright}Campo "tipo":${colors.reset}`);
  const tipoOk = stats.notasConTipo === stats.totalNotas;
  console.log(`  ${tipoOk ? colors.green + '✅' : colors.red + '❌'} Con tipo: ${stats.notasConTipo}/${stats.totalNotas}${colors.reset}`);
  if (stats.notasSinTipo > 0) {
    console.log(`  ${colors.red}❌ Sin tipo: ${stats.notasSinTipo}${colors.reset}`);
  }

  // Validaciones específicas
  console.log(`\n${colors.bright}Validaciones específicas:${colors.reset}`);

  const ingresoOrdenOk = stats.ingresosConOrdenIncorrecto.length === 0;
  console.log(`  ${ingresoOrdenOk ? colors.green + '✅' : colors.red + '❌'} INGRESO con ordenEnHistorial=0: ${ingresoOrdenOk ? 'Correcto' : stats.ingresosConOrdenIncorrecto.length + ' incorrectos'}${colors.reset}`);

  const controlOrdenOk = stats.controlesConOrdenCero.length === 0;
  console.log(`  ${controlOrdenOk ? colors.green + '✅' : colors.red + '❌'} CONTROL con ordenEnHistorial>0: ${controlOrdenOk ? 'Correcto' : stats.controlesConOrdenCero.length + ' incorrectos'}${colors.reset}`);

  const multipleIngresosOk = stats.pacientesConMultiplesIngresos.length === 0;
  console.log(`  ${multipleIngresosOk ? colors.green + '✅' : colors.red + '❌'} Pacientes con máximo 1 INGRESO: ${multipleIngresosOk ? 'Correcto' : stats.pacientesConMultiplesIngresos.length + ' con múltiples'}${colors.reset}`);

  // 3. PROBLEMAS DETECTADOS
  console.log(`\n${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.yellow}   3. PROBLEMAS DETECTADOS${colors.reset}`);
  console.log(`${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.bright}Total de problemas:${colors.reset} ${stats.totalProblemas}\n`);

  // Pacientes con múltiples INGRESOS
  if (stats.pacientesConMultiplesIngresos.length > 0) {
    console.log(`${colors.red}❌ Pacientes con múltiples INGRESO (${stats.pacientesConMultiplesIngresos.length}):${colors.reset}`);
    stats.pacientesConMultiplesIngresos.slice(0, 5).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.pacienteNombre} - ${p.cantidadIngresos} INGRESOS`);
      p.ingresos.forEach(ing => {
        console.log(`     ${colors.dim}- ${ing.titulo} (${ing.fecha})${colors.reset}`);
      });
    });
    if (stats.pacientesConMultiplesIngresos.length > 5) {
      console.log(`  ${colors.dim}... y ${stats.pacientesConMultiplesIngresos.length - 5} más${colors.reset}`);
    }
    console.log('');
  }

  // INGRESO con controles embebidos
  if (stats.ingresosConControlesEmbebidos.length > 0) {
    console.log(`${colors.red}❌ INGRESO con controles embebidos (${stats.ingresosConControlesEmbebidos.length}):${colors.reset}`);
    stats.ingresosConControlesEmbebidos.slice(0, 5).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.pacienteNombre} - "${p.titulo}"`);
      console.log(`     ${colors.dim}ID: ${p.notaId}${colors.reset}`);
    });
    if (stats.ingresosConControlesEmbebidos.length > 5) {
      console.log(`  ${colors.dim}... y ${stats.ingresosConControlesEmbebidos.length - 5} más${colors.reset}`);
    }
    console.log('');
  }

  // INGRESO con orden incorrecto
  if (stats.ingresosConOrdenIncorrecto.length > 0) {
    console.log(`${colors.red}❌ INGRESO con ordenEnHistorial ≠ 0 (${stats.ingresosConOrdenIncorrecto.length}):${colors.reset}`);
    stats.ingresosConOrdenIncorrecto.slice(0, 5).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.pacienteNombre} - Orden: ${p.ordenActual}`);
      console.log(`     ${colors.dim}Nota: "${p.titulo}"${colors.reset}`);
    });
    if (stats.ingresosConOrdenIncorrecto.length > 5) {
      console.log(`  ${colors.dim}... y ${stats.ingresosConOrdenIncorrecto.length - 5} más${colors.reset}`);
    }
    console.log('');
  }

  // CONTROL con orden cero
  if (stats.controlesConOrdenCero.length > 0) {
    console.log(`${colors.red}❌ CONTROL con ordenEnHistorial = 0 (${stats.controlesConOrdenCero.length}):${colors.reset}`);
    stats.controlesConOrdenCero.slice(0, 5).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.pacienteNombre} - "${p.titulo}"`);
      console.log(`     ${colors.dim}ID: ${p.notaId}${colors.reset}`);
    });
    if (stats.controlesConOrdenCero.length > 5) {
      console.log(`  ${colors.dim}... y ${stats.controlesConOrdenCero.length - 5} más${colors.reset}`);
    }
    console.log('');
  }

  // Notas con campos faltantes
  if (stats.notasConCamposFaltantes.length > 0) {
    console.log(`${colors.red}❌ Notas con campos faltantes (${stats.notasConCamposFaltantes.length}):${colors.reset}`);
    stats.notasConCamposFaltantes.slice(0, 5).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.pacienteNombre} - "${p.titulo}"`);
      console.log(`     ${colors.dim}Campos faltantes: ${p.camposFaltantes.join(', ')}${colors.reset}`);
    });
    if (stats.notasConCamposFaltantes.length > 5) {
      console.log(`  ${colors.dim}... y ${stats.notasConCamposFaltantes.length - 5} más${colors.reset}`);
    }
    console.log('');
  }

  // 4. MUESTRA DE VALIDACIÓN (5 pacientes)
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}   4. MUESTRA DE VALIDACIÓN (5 pacientes)${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);

  // Mostrar 3 pacientes sin problemas y 2 con problemas
  const muestraSinProblemas = pacientesSinProblemas.slice(0, 3);
  const muestraConProblemas = pacientesConProblemas.slice(0, 2);

  muestraSinProblemas.forEach(({ patientId, notas, validacion }) => {
    mostrarDetallesPaciente(patientId, notas, validacion);
  });

  muestraConProblemas.forEach(({ patientId, notas, validacion }) => {
    mostrarDetallesPaciente(patientId, notas, validacion);
  });

  // RESUMEN FINAL
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}   RESUMEN FINAL${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  if (stats.totalProblemas === 0) {
    console.log(`${colors.green}${colors.bright}✅ VALIDACIÓN EXITOSA${colors.reset}`);
    console.log(`${colors.green}   Todas las notas están correctamente estructuradas${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bright}❌ VALIDACIÓN FALLIDA${colors.reset}`);
    console.log(`${colors.red}   Se detectaron ${stats.totalProblemas} problemas que requieren atención${colors.reset}`);
    console.log(`${colors.yellow}   Pacientes afectados: ${pacientesConProblemas.length}/${stats.totalPacientes}${colors.reset}\n`);
  }

  console.log(`${colors.dim}💡 Para ver detalles de un paciente específico:${colors.reset}`);
  console.log(`${colors.dim}   node scripts/validate-final-structure.cjs --patient [RUT o ID]${colors.reset}\n`);
}

// Ejecutar
validarEstructura();
