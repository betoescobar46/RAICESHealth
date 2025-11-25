/**
 * Script de Validación Final de Estructura de Notas Clínicas
 *
 * Verifica que la estructura de las notas esté correcta después de las correcciones:
 * - Cada paciente tiene máximo 1 INGRESO
 * - Todos los CONTROL tienen ordenEnHistorial > 0
 * - No hay subsecciones mal clasificadas como controles
 * - Todos los campos requeridos están presentes
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Subsecciones que NO deben ser notas separadas
const SUBSECCIONES_PROHIBIDAS = [
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
  'farmacoterapia',
  'tratamiento',
  'evaluacion',
  'evaluación',
  'impresion diagnostica',
  'impresión diagnóstica'
];

/**
 * Imprime con color
 */
function print(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

/**
 * Validar estructura de notas
 */
async function validarEstructura() {
  print('\n🔍 VALIDACIÓN DE ESTRUCTURA DE NOTAS CLÍNICAS\n', 'bright');
  print('═'.repeat(80), 'cyan');

  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const reportFile = path.join(__dirname, 'reports', `validation-${timestamp}.json`);

  // Crear directorio de reportes si no existe
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  try {
    // Obtener todas las notas
    print('\n📥 Cargando notas de Firestore...', 'blue');
    const snapshot = await db.collection('clinicalNotes').get();
    print(`   Total: ${snapshot.size} notas\n`, 'cyan');

    // Estructuras de datos para validación
    const pacientes = new Map();
    const problemas = [];
    const estadisticas = {
      totalNotas: snapshot.size,
      totalPacientes: 0,
      notasPorTipo: {},
      camposFaltantes: {},
      subseccionesMalClasificadas: [],
      pacientesConMultiplesIngresos: [],
      notasSinOrden: [],
      notasConOrdenIncorrecto: [],
      pacientesCorrectos: 0
    };

    // Agrupar notas por paciente
    snapshot.forEach(doc => {
      const data = doc.data();
      const patientId = data.patientId || data.pacienteId;

      if (!patientId) {
        problemas.push({
          tipo: 'ERROR',
          notaId: doc.id,
          mensaje: 'Nota sin patientId o pacienteId'
        });
        return;
      }

      if (!pacientes.has(patientId)) {
        pacientes.set(patientId, {
          id: patientId,
          nombre: data.pacienteNombre || data.patientName || 'Sin nombre',
          notas: [],
          ingresos: [],
          controles: []
        });
      }

      const paciente = pacientes.get(patientId);
      const nota = { id: doc.id, ...data };
      paciente.notas.push(nota);

      if (nota.tipo === 'INGRESO') {
        paciente.ingresos.push(nota);
      } else if (nota.tipo === 'CONTROL') {
        paciente.controles.push(nota);
      }

      // Contar por tipo
      estadisticas.notasPorTipo[nota.tipo] = (estadisticas.notasPorTipo[nota.tipo] || 0) + 1;
    });

    estadisticas.totalPacientes = pacientes.size;

    // Validar cada paciente
    print('🔬 Validando estructura por paciente...\n', 'blue');

    let pacienteNum = 0;
    for (const [patientId, paciente] of pacientes.entries()) {
      pacienteNum++;
      let tieneProblemas = false;

      // Validación 1: Máximo 1 INGRESO
      if (paciente.ingresos.length > 1) {
        tieneProblemas = true;
        estadisticas.pacientesConMultiplesIngresos.push({
          patientId,
          nombre: paciente.nombre,
          cantidadIngresos: paciente.ingresos.length
        });
        problemas.push({
          tipo: 'ERROR',
          patientId,
          mensaje: `Tiene ${paciente.ingresos.length} notas de INGRESO (debe tener máximo 1)`
        });
      }

      // Validación 2: Al menos 1 INGRESO
      if (paciente.ingresos.length === 0) {
        tieneProblemas = true;
        problemas.push({
          tipo: 'ADVERTENCIA',
          patientId,
          mensaje: 'No tiene nota de INGRESO'
        });
      }

      // Validación 3: Orden correcto
      paciente.notas.forEach(nota => {
        // Verificar que tenga ordenEnHistorial
        if (nota.ordenEnHistorial === undefined || nota.ordenEnHistorial === null) {
          tieneProblemas = true;
          estadisticas.notasSinOrden.push({
            notaId: nota.id,
            tipo: nota.tipo,
            titulo: nota.titulo
          });
          problemas.push({
            tipo: 'ERROR',
            notaId: nota.id,
            mensaje: 'Nota sin ordenEnHistorial'
          });
        }

        // INGRESO debe tener orden 0
        if (nota.tipo === 'INGRESO' && nota.ordenEnHistorial !== 0) {
          tieneProblemas = true;
          estadisticas.notasConOrdenIncorrecto.push({
            notaId: nota.id,
            tipo: nota.tipo,
            ordenActual: nota.ordenEnHistorial,
            ordenEsperado: 0
          });
          problemas.push({
            tipo: 'ERROR',
            notaId: nota.id,
            mensaje: `INGRESO con orden ${nota.ordenEnHistorial} (debe ser 0)`
          });
        }

        // CONTROL debe tener orden > 0
        if (nota.tipo === 'CONTROL' && nota.ordenEnHistorial <= 0) {
          tieneProblemas = true;
          estadisticas.notasConOrdenIncorrecto.push({
            notaId: nota.id,
            tipo: nota.tipo,
            ordenActual: nota.ordenEnHistorial,
            ordenEsperado: '> 0'
          });
          problemas.push({
            tipo: 'ERROR',
            notaId: nota.id,
            mensaje: `CONTROL con orden ${nota.ordenEnHistorial} (debe ser > 0)`
          });
        }

        // Validación 4: Subsecciones mal clasificadas
        if (nota.tipo === 'CONTROL') {
          const titulo = (nota.titulo || '').toLowerCase().trim();
          const esSubseccionProhibida = SUBSECCIONES_PROHIBIDAS.some(sub =>
            titulo.includes(sub.toLowerCase())
          );

          if (esSubseccionProhibida) {
            tieneProblemas = true;
            estadisticas.subseccionesMalClasificadas.push({
              notaId: nota.id,
              titulo: nota.titulo,
              patientId
            });
            problemas.push({
              tipo: 'ERROR',
              notaId: nota.id,
              mensaje: `Control "${nota.titulo}" parece ser una subsección del INGRESO`
            });
          }
        }

        // Validación 5: Campos requeridos
        const camposRequeridos = ['tipo', 'fecha', 'contenidoCompleto'];
        camposRequeridos.forEach(campo => {
          if (!nota[campo]) {
            tieneProblemas = true;
            estadisticas.camposFaltantes[campo] = (estadisticas.camposFaltantes[campo] || 0) + 1;
            problemas.push({
              tipo: 'ADVERTENCIA',
              notaId: nota.id,
              mensaje: `Falta campo requerido: ${campo}`
            });
          }
        });

        // Validación 6: Campo titulo recomendado
        if (!nota.titulo) {
          estadisticas.camposFaltantes.titulo = (estadisticas.camposFaltantes.titulo || 0) + 1;
        }
      });

      if (!tieneProblemas) {
        estadisticas.pacientesCorrectos++;
      }

      // Mostrar progreso cada 50 pacientes
      if (pacienteNum % 50 === 0) {
        process.stdout.write(`   Procesados: ${pacienteNum}/${pacientes.size}\r`);
      }
    }

    console.log(''); // Nueva línea después del progreso

    // Mostrar resultados
    print('\n\n📊 RESULTADOS DE LA VALIDACIÓN', 'bright');
    print('═'.repeat(80), 'cyan');

    // Estadísticas generales
    print('\n📈 Estadísticas Generales:', 'yellow');
    print(`   Total de notas: ${estadisticas.totalNotas}`);
    print(`   Total de pacientes: ${estadisticas.totalPacientes}`);
    print(`   Pacientes correctos: ${estadisticas.pacientesCorrectos} (${(estadisticas.pacientesCorrectos / estadisticas.totalPacientes * 100).toFixed(1)}%)`);

    // Distribución por tipo
    print('\n📋 Distribución de notas:', 'yellow');
    Object.entries(estadisticas.notasPorTipo).forEach(([tipo, count]) => {
      print(`   ${tipo}: ${count} (${(count / estadisticas.totalNotas * 100).toFixed(1)}%)`);
    });

    // Problemas encontrados
    const totalProblemas = problemas.filter(p => p.tipo === 'ERROR').length;
    const totalAdvertencias = problemas.filter(p => p.tipo === 'ADVERTENCIA').length;

    print('\n⚠️  Problemas Detectados:', 'yellow');
    print(`   Errores críticos: ${totalProblemas}`, totalProblemas > 0 ? 'red' : 'green');
    print(`   Advertencias: ${totalAdvertencias}`, totalAdvertencias > 0 ? 'yellow' : 'green');

    if (estadisticas.pacientesConMultiplesIngresos.length > 0) {
      print('\n❌ Pacientes con múltiples INGRESO:', 'red');
      estadisticas.pacientesConMultiplesIngresos.slice(0, 5).forEach(p => {
        print(`   - ${p.nombre} (${p.patientId}): ${p.cantidadIngresos} ingresos`);
      });
      if (estadisticas.pacientesConMultiplesIngresos.length > 5) {
        print(`   ... y ${estadisticas.pacientesConMultiplesIngresos.length - 5} más`);
      }
    }

    if (estadisticas.subseccionesMalClasificadas.length > 0) {
      print('\n❌ Subsecciones mal clasificadas como CONTROL:', 'red');
      estadisticas.subseccionesMalClasificadas.slice(0, 5).forEach(s => {
        print(`   - "${s.titulo}" (Nota: ${s.notaId})`);
      });
      if (estadisticas.subseccionesMalClasificadas.length > 5) {
        print(`   ... y ${estadisticas.subseccionesMalClasificadas.length - 5} más`);
      }
    }

    if (estadisticas.notasSinOrden.length > 0) {
      print('\n❌ Notas sin ordenEnHistorial:', 'red');
      print(`   Total: ${estadisticas.notasSinOrden.length} notas`);
    }

    if (estadisticas.notasConOrdenIncorrecto.length > 0) {
      print('\n❌ Notas con orden incorrecto:', 'red');
      print(`   Total: ${estadisticas.notasConOrdenIncorrecto.length} notas`);
    }

    if (Object.keys(estadisticas.camposFaltantes).length > 0) {
      print('\n⚠️  Campos faltantes:', 'yellow');
      Object.entries(estadisticas.camposFaltantes).forEach(([campo, count]) => {
        const porcentaje = (count / estadisticas.totalNotas * 100).toFixed(1);
        const color = campo === 'titulo' ? 'yellow' : 'red';
        print(`   ${campo}: ${count} notas (${porcentaje}%)`, color);
      });
    }

    // Guardar reporte detallado
    const reporte = {
      timestamp: new Date().toISOString(),
      estadisticas,
      problemas: problemas.slice(0, 100), // Limitar a 100 problemas en el reporte
      totalProblemas,
      totalAdvertencias
    };

    fs.writeFileSync(reportFile, JSON.stringify(reporte, null, 2), 'utf8');

    // Resultado final
    print('\n' + '═'.repeat(80), 'cyan');

    if (totalProblemas === 0 && estadisticas.pacientesConMultiplesIngresos.length === 0 &&
        estadisticas.subseccionesMalClasificadas.length === 0) {
      print('\n✅ VALIDACIÓN EXITOSA', 'green');
      print('   Todas las notas están correctamente estructuradas\n', 'green');
    } else {
      print('\n❌ VALIDACIÓN FALLIDA', 'red');
      print('   Se encontraron problemas que requieren corrección\n', 'red');

      print('💡 Recomendaciones:', 'yellow');
      if (estadisticas.pacientesConMultiplesIngresos.length > 0) {
        print('   1. Ejecute: node scripts/fix-subsections-as-controls.cjs --apply');
      }
      if (estadisticas.subseccionesMalClasificadas.length > 0) {
        print('   2. Ejecute: node scripts/fix-subsections-as-controls.cjs --apply');
      }
      if (estadisticas.notasSinOrden.length > 0 || estadisticas.notasConOrdenIncorrecto.length > 0) {
        print('   3. Revise el script de migración para asegurar que asigna ordenEnHistorial');
      }
    }

    print(`\n📄 Reporte detallado guardado en: ${reportFile}`, 'blue');
    print('\n' + '═'.repeat(80) + '\n', 'cyan');

    // Retornar código de salida según resultado
    process.exit(totalProblemas === 0 ? 0 : 1);

  } catch (error) {
    print('\n❌ Error durante la validación:', 'red');
    console.error(error);
    process.exit(1);
  }
}

// Ejecutar
validarEstructura();