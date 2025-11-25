/**
 * Script para Corregir Subsecciones que fueron divididas como Controles
 *
 * Problema: Algunas subsecciones estándar del ingreso (como "anamnesis remota",
 * "examen mental", etc.) fueron erróneamente separadas como notas de CONTROL.
 *
 * Solución: Fusionar estas subsecciones de vuelta al INGRESO y eliminar las
 * notas de CONTROL incorrectas.
 */

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');

// Subsecciones estándar que NO deberían ser notas separadas
const SUBSECCIONES_INGRESO = [
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
  'medicacion',
  'lab 14 oct 2025' // Caso específico encontrado
];

/**
 * Detecta si una nota es una subsección del ingreso
 */
function esSubseccionIngreso(nota) {
  if (nota.tipo !== 'CONTROL') return false;

  const titulo = (nota.titulo || '').toLowerCase().trim();

  return SUBSECCIONES_INGRESO.some(subseccion =>
    titulo.includes(subseccion.toLowerCase())
  );
}

/**
 * Proceso principal
 */
async function corregirSubsecciones() {
  console.log('\n🔧 CORRECCIÓN DE SUBSECCIONES MAL CLASIFICADAS COMO CONTROLES\n');
  console.log('═'.repeat(80));
  console.log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN (solo análisis)' : '⚠️  APLICAR CAMBIOS REALES'}\n`);

  if (DRY_RUN) {
    console.log('💡 Para aplicar cambios reales, ejecuta:');
    console.log('   node scripts/fix-subsections-as-controls.cjs --apply\n');
  }

  console.log('═'.repeat(80));

  try {
    // Obtener todos los pacientes con múltiples INGRESO o subsecciones mal clasificadas
    const snapshot = await db.collection('clinicalNotes').get();

    console.log('\n📥 Analizando notas clínicas...');
    console.log(`   Total: ${snapshot.size} notas\n`);

    // Agrupar por paciente
    const notasPorPaciente = new Map();

    snapshot.forEach(doc => {
      const data = doc.data();
      const pacienteId = data.patientId || data.pacienteId;

      if (!notasPorPaciente.has(pacienteId)) {
        notasPorPaciente.set(pacienteId, []);
      }

      notasPorPaciente.get(pacienteId).push({
        id: doc.id,
        ...data
      });
    });

    // Estadísticas
    const stats = {
      pacientesAnalizados: notasPorPaciente.size,
      pacientesConProblemas: 0,
      subseccionesMalClasificadas: 0,
      pacientesConMultiplesIngresos: 0
    };

    const pacientesParaCorregir = [];

    // Analizar cada paciente
    for (const [pacienteId, notas] of notasPorPaciente.entries()) {
      const ingresos = notas.filter(n => n.tipo === 'INGRESO');
      const subseccionesMalClasificadas = notas.filter(n => esSubseccionIngreso(n));

      if (ingresos.length > 1 || subseccionesMalClasificadas.length > 0) {
        stats.pacientesConProblemas++;

        if (ingresos.length > 1) {
          stats.pacientesConMultiplesIngresos++;
        }

        stats.subseccionesMalClasificadas += subseccionesMalClasificadas.length;

        pacientesParaCorregir.push({
          pacienteId,
          pacienteNombre: notas[0].pacienteNombre || notas[0].patientName || 'Sin nombre',
          ingresos,
          subseccionesMalClasificadas,
          todasLasNotas: notas
        });
      }
    }

    // Mostrar resultados del análisis
    console.log('📊 RESULTADOS DEL ANÁLISIS\n');
    console.log('═'.repeat(80));
    console.log(`\n   Pacientes analizados: ${stats.pacientesAnalizados}`);
    console.log(`   ✅ Pacientes sin problemas: ${stats.pacientesAnalizados - stats.pacientesConProblemas}`);
    console.log(`   ⚠️  Pacientes con problemas: ${stats.pacientesConProblemas}`);
    console.log(`   📝 Subsecciones mal clasificadas: ${stats.subseccionesMalClasificadas}`);
    console.log(`   🔄 Pacientes con múltiples INGRESO: ${stats.pacientesConMultiplesIngresos}`);
    console.log('\n' + '═'.repeat(80));

    // Mostrar detalles
    if (pacientesParaCorregir.length > 0) {
      console.log('\n📋 DETALLES DE CORRECCIONES NECESARIAS:\n');

      pacientesParaCorregir.slice(0, 10).forEach((paciente, i) => {
        console.log(`${i + 1}. ${paciente.pacienteNombre}`);
        console.log(`   ID: ${paciente.pacienteId}`);

        if (paciente.ingresos.length > 1) {
          console.log(`   🔄 ${paciente.ingresos.length} notas de INGRESO (se fusionarán)`);
          paciente.ingresos.forEach(ing => {
            console.log(`      - "${ing.titulo || 'Sin título'}" (${ing.fecha})`);
          });
        }

        if (paciente.subseccionesMalClasificadas.length > 0) {
          console.log(`   📝 ${paciente.subseccionesMalClasificadas.length} subsecciones a reintegrar:`);
          paciente.subseccionesMalClasificadas.forEach(sub => {
            console.log(`      - "${sub.titulo}" (orden: ${sub.ordenEnHistorial})`);
          });
        }

        console.log('');
      });

      if (pacientesParaCorregir.length > 10) {
        console.log(`   ... y ${pacientesParaCorregir.length - 10} pacientes más\n`);
      }
    }

    // Aplicar correcciones si no es dry-run
    if (!DRY_RUN && pacientesParaCorregir.length > 0) {
      console.log('\n🔧 APLICANDO CORRECCIONES...\n');
      console.log('═'.repeat(80));

      let procesados = 0;

      for (const paciente of pacientesParaCorregir) {
        procesados++;
        console.log(`\n[${procesados}/${pacientesParaCorregir.length}] Procesando: ${paciente.pacienteNombre}`);

        // Ordenar todas las notas
        const notasOrdenadas = paciente.todasLasNotas.sort((a, b) =>
          (a.ordenEnHistorial || 0) - (b.ordenEnHistorial || 0)
        );

        // Encontrar o crear el INGRESO principal
        let ingresoPrincipal = paciente.ingresos[0];
        if (!ingresoPrincipal) {
          console.log('   ⚠️ No hay INGRESO, creando uno nuevo...');
          // Crear un INGRESO vacío si no existe
          const nuevoIngreso = {
            patientId: paciente.pacienteId,
            tipo: 'INGRESO',
            titulo: 'Ingreso',
            contenidoCompleto: '',
            contenido: '',
            fecha: new Date().toISOString().split('T')[0],
            ordenEnHistorial: 0,
            profesional: 'Dr. Sistema',
            especialidad: 'Psiquiatría',
            createdAt: admin.firestore.Timestamp.now()
          };

          const docRef = await db.collection('clinicalNotes').add(nuevoIngreso);
          ingresoPrincipal = { ...nuevoIngreso, id: docRef.id };
          console.log('   ✅ INGRESO creado');
        }

        // Combinar contenido de todos los ingresos y subsecciones
        let contenidoCombinado = ingresoPrincipal.contenidoCompleto || ingresoPrincipal.contenido || '';

        // Agregar otros ingresos si hay múltiples
        for (let i = 1; i < paciente.ingresos.length; i++) {
          const otroIngreso = paciente.ingresos[i];
          console.log(`   📄 Fusionando INGRESO duplicado: "${otroIngreso.titulo || 'Sin título'}"`);

          contenidoCombinado += '\n\n---\n\n';
          contenidoCombinado += otroIngreso.contenidoCompleto || otroIngreso.contenido || '';

          // Eliminar el ingreso duplicado
          await db.collection('clinicalNotes').doc(otroIngreso.id).delete();
          console.log(`   🗑️ Eliminado INGRESO duplicado ${otroIngreso.id}`);
        }

        // Agregar subsecciones mal clasificadas
        for (const subseccion of paciente.subseccionesMalClasificadas) {
          console.log(`   📄 Reintegrando subsección: "${subseccion.titulo}"`);

          contenidoCombinado += '\n\n## ' + subseccion.titulo + '\n\n';
          contenidoCombinado += subseccion.contenidoCompleto || subseccion.contenido || '';

          // Eliminar la nota de control incorrecta
          await db.collection('clinicalNotes').doc(subseccion.id).delete();
          console.log(`   🗑️ Eliminada nota incorrecta ${subseccion.id}`);
        }

        // Actualizar el INGRESO principal con el contenido combinado
        await db.collection('clinicalNotes').doc(ingresoPrincipal.id).update({
          contenidoCompleto: contenidoCombinado.trim(),
          contenido: contenidoCombinado.substring(0, 500).trim(),
          subseccionesReintegradas: true,
          ultimaActualizacion: admin.firestore.Timestamp.now()
        });

        console.log(`   ✅ INGRESO actualizado con contenido fusionado`);

        // Reordenar las notas restantes
        const notasRestantes = notasOrdenadas.filter(n =>
          n.tipo === 'CONTROL' && !esSubseccionIngreso(n)
        );

        for (let i = 0; i < notasRestantes.length; i++) {
          const nota = notasRestantes[i];
          const nuevoOrden = i + 1;

          if (nota.ordenEnHistorial !== nuevoOrden) {
            await db.collection('clinicalNotes').doc(nota.id).update({
              ordenEnHistorial: nuevoOrden
            });
            console.log(`   📝 Reordenada nota "${nota.titulo}" (orden: ${nuevoOrden})`);
          }
        }
      }

      console.log('\n═'.repeat(80));
      console.log('\n✅ CORRECCIONES APLICADAS EXITOSAMENTE');
    }

    console.log('\n═'.repeat(80));

    if (DRY_RUN && pacientesParaCorregir.length > 0) {
      console.log('\n💡 TIP: Para aplicar estas correcciones, ejecuta:');
      console.log('   node scripts/fix-subsections-as-controls.cjs --apply\n');
    } else if (pacientesParaCorregir.length === 0) {
      console.log('\n✅ No se detectaron problemas. Todo está correcto.\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
corregirSubsecciones();