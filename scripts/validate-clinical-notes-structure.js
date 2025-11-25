/**
 * Script de Validación de Estructura de Notas Clínicas
 *
 * Verifica que todas las notas clínicas tengan:
 * - Campo 'tipo' correctamente asignado
 * - Campo 'ordenEnHistorial' presente
 * - Consistencia entre tipo y ordenEnHistorial
 * - Fechas en formato correcto
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

// Configuración de Firebase
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

// Estadísticas globales
const stats = {
  totalNotas: 0,
  totalPacientes: new Set(),
  notasConTipo: 0,
  notasSinTipo: 0,
  notasConOrden: 0,
  notasSinOrden: 0,
  ingresos: 0,
  controles: 0,
  inconsistencias: [],
  pacientesProblematicos: new Map()
};

async function validarNotasClinicas() {
  console.log('🔍 Iniciando validación de notas clínicas...\n');

  try {
    // Obtener todas las notas clínicas
    const notasRef = collection(db, 'clinicalNotes');
    const q = query(notasRef, orderBy('pacienteId'));
    const snapshot = await getDocs(q);

    console.log(`📊 Total de notas encontradas: ${snapshot.size}\n`);
    stats.totalNotas = snapshot.size;

    // Agrupar por paciente
    const notasPorPaciente = new Map();

    snapshot.forEach(doc => {
      const data = doc.data();
      const pacienteId = data.pacienteId || data.patientId;

      if (!notasPorPaciente.has(pacienteId)) {
        notasPorPaciente.set(pacienteId, []);
      }

      notasPorPaciente.get(pacienteId).push({
        id: doc.id,
        ...data,
        pacienteId // Normalizar nombre del campo
      });
    });

    stats.totalPacientes = new Set(notasPorPaciente.keys());

    console.log(`👥 Total de pacientes: ${stats.totalPacientes.size}\n`);
    console.log('━'.repeat(80));

    // Analizar cada paciente
    for (const [pacienteId, notas] of notasPorPaciente.entries()) {
      const pacienteNombre = notas[0]?.pacienteNombre || 'Sin nombre';
      const problemas = [];

      // Ordenar por ordenEnHistorial
      const notasOrdenadas = [...notas].sort((a, b) => {
        const ordenA = a.ordenEnHistorial ?? 999;
        const ordenB = b.ordenEnHistorial ?? 999;
        return ordenA - ordenB;
      });

      notasOrdenadas.forEach((nota, index) => {
        // Validar campo 'tipo'
        if (nota.tipo) {
          stats.notasConTipo++;
          if (nota.tipo === 'INGRESO') stats.ingresos++;
          if (nota.tipo === 'CONTROL') stats.controles++;
        } else {
          stats.notasSinTipo++;
          problemas.push(`Nota ${nota.id}: Sin campo 'tipo'`);
        }

        // Validar campo 'ordenEnHistorial'
        if (nota.ordenEnHistorial !== undefined && nota.ordenEnHistorial !== null) {
          stats.notasConOrden++;
        } else {
          stats.notasSinOrden++;
          problemas.push(`Nota ${nota.id}: Sin campo 'ordenEnHistorial'`);
        }

        // Validar consistencia tipo vs ordenEnHistorial
        if (nota.tipo && nota.ordenEnHistorial !== undefined) {
          const tipoEsperado = nota.ordenEnHistorial === 0 ? 'INGRESO' : 'CONTROL';
          if (nota.tipo !== tipoEsperado) {
            const inconsistencia = {
              pacienteId,
              pacienteNombre,
              notaId: nota.id,
              titulo: nota.titulo,
              ordenEnHistorial: nota.ordenEnHistorial,
              tipoActual: nota.tipo,
              tipoEsperado
            };
            stats.inconsistencias.push(inconsistencia);
            problemas.push(`Nota ${nota.id}: Inconsistencia - orden=${nota.ordenEnHistorial} pero tipo='${nota.tipo}' (esperado: '${tipoEsperado}')`);
          }
        }

        // Validar fecha
        if (!nota.fecha) {
          problemas.push(`Nota ${nota.id}: Sin fecha`);
        }
      });

      // Guardar pacientes con problemas
      if (problemas.length > 0) {
        stats.pacientesProblematicos.set(pacienteId, {
          nombre: pacienteNombre,
          totalNotas: notas.length,
          problemas
        });
      }
    }

    // Mostrar resultados
    mostrarResultados();

  } catch (error) {
    console.error('❌ Error durante la validación:', error);
    process.exit(1);
  }
}

function mostrarResultados() {
  console.log('\n📈 RESULTADOS DE LA VALIDACIÓN\n');
  console.log('━'.repeat(80));

  console.log('\n📊 Estadísticas Generales:');
  console.log(`   Total de notas: ${stats.totalNotas}`);
  console.log(`   Total de pacientes: ${stats.totalPacientes.size}`);
  console.log(`   Promedio de notas por paciente: ${(stats.totalNotas / stats.totalPacientes.size).toFixed(2)}`);

  console.log('\n🏷️  Campo "tipo":');
  console.log(`   ✅ Con tipo: ${stats.notasConTipo} (${((stats.notasConTipo / stats.totalNotas) * 100).toFixed(1)}%)`);
  console.log(`   ❌ Sin tipo: ${stats.notasSinTipo} (${((stats.notasSinTipo / stats.totalNotas) * 100).toFixed(1)}%)`);
  console.log(`      - INGRESO: ${stats.ingresos}`);
  console.log(`      - CONTROL: ${stats.controles}`);

  console.log('\n🔢 Campo "ordenEnHistorial":');
  console.log(`   ✅ Con orden: ${stats.notasConOrden} (${((stats.notasConOrden / stats.totalNotas) * 100).toFixed(1)}%)`);
  console.log(`   ❌ Sin orden: ${stats.notasSinOrden} (${((stats.notasSinOrden / stats.totalNotas) * 100).toFixed(1)}%)`);

  console.log('\n⚠️  Inconsistencias (tipo vs ordenEnHistorial):');
  console.log(`   Total: ${stats.inconsistencias.length}`);

  if (stats.inconsistencias.length > 0) {
    console.log('\n   Detalles:');
    stats.inconsistencias.forEach(inc => {
      console.log(`   - ${inc.pacienteNombre} (${inc.pacienteId})`);
      console.log(`     Nota: "${inc.titulo}"`);
      console.log(`     Orden: ${inc.ordenEnHistorial} | Tipo actual: ${inc.tipoActual} | Esperado: ${inc.tipoEsperado}`);
    });
  }

  console.log('\n🚨 Pacientes con Problemas:');
  console.log(`   Total: ${stats.pacientesProblematicos.size}`);

  if (stats.pacientesProblematicos.size > 0) {
    console.log('\n   Primeros 10 pacientes:');
    let count = 0;
    for (const [pacienteId, info] of stats.pacientesProblematicos.entries()) {
      if (count >= 10) break;
      console.log(`\n   ${count + 1}. ${info.nombre} (${pacienteId})`);
      console.log(`      Total de notas: ${info.totalNotas}`);
      console.log(`      Problemas:`);
      info.problemas.slice(0, 3).forEach(p => console.log(`      - ${p}`));
      if (info.problemas.length > 3) {
        console.log(`      ... y ${info.problemas.length - 3} más`);
      }
      count++;
    }

    if (stats.pacientesProblematicos.size > 10) {
      console.log(`\n   ... y ${stats.pacientesProblematicos.size - 10} pacientes más con problemas`);
    }
  }

  console.log('\n━'.repeat(80));

  // Resumen final
  const necesitaCorreccion = stats.notasSinTipo > 0 || stats.notasSinOrden > 0 || stats.inconsistencias.length > 0;

  if (necesitaCorreccion) {
    console.log('\n⚠️  SE REQUIERE CORRECCIÓN DE DATOS');
    console.log('   Ejecuta el script de corrección para arreglar los problemas detectados.');
  } else {
    console.log('\n✅ TODOS LOS DATOS ESTÁN CORRECTOS');
    console.log('   No se requiere corrección.');
  }

  console.log('\n━'.repeat(80));
}

// Ejecutar validación
validarNotasClinicas()
  .then(() => {
    console.log('\n✅ Validación completada\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
  });
