/**
 * Script para Eliminar TODAS las Notas Clínicas
 *
 * ADVERTENCIA: Este script eliminará PERMANENTEMENTE todas las notas clínicas
 * de la colección 'clinicalNotes' en Firestore.
 *
 * Uso:
 *   node scripts/delete-all-clinical-notes.cjs --dry-run   # Simular eliminación
 *   node scripts/delete-all-clinical-notes.cjs --apply     # ELIMINAR REALMENTE
 */

const admin = require('firebase-admin');
const readline = require('readline');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

// Crear interfaz para input del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para preguntar al usuario
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function deleteAllClinicalNotes(isDryRun = true, skipConfirmation = false) {
  console.log('\n🗑️  ELIMINACIÓN DE NOTAS CLÍNICAS\n');
  console.log('═'.repeat(80));

  if (isDryRun) {
    console.log('⚠️  MODO: DRY RUN (simulación, no se borrará nada)');
  } else {
    console.log('🚨 MODO: APPLY (SE BORRARÁN LAS NOTAS PERMANENTEMENTE)');
  }
  console.log('═'.repeat(80));
  console.log();

  try {
    // Obtener todas las notas
    console.log('📥 Consultando todas las notas clínicas...');
    const snapshot = await db.collection('clinicalNotes').get();

    const totalNotas = snapshot.size;
    console.log(`   Total de notas encontradas: ${totalNotas}\n`);

    if (totalNotas === 0) {
      console.log('✅ No hay notas para eliminar.\n');
      return;
    }

    // Estadísticas por tipo
    const estadisticas = {};
    snapshot.forEach(doc => {
      const tipo = doc.data().tipo || 'SIN_TIPO';
      estadisticas[tipo] = (estadisticas[tipo] || 0) + 1;
    });

    console.log('📊 Estadísticas por tipo:');
    Object.entries(estadisticas)
      .sort((a, b) => b[1] - a[1])
      .forEach(([tipo, count]) => {
        console.log(`   ${tipo}: ${count}`);
      });
    console.log();

    // Mostrar algunos ejemplos
    console.log('📝 Ejemplos de notas a eliminar (primeras 5):');
    let count = 0;
    snapshot.forEach(doc => {
      if (count < 5) {
        const data = doc.data();
        console.log(`   - ${doc.id} | Tipo: ${data.tipo || 'N/A'} | Fecha: ${data.fecha || 'N/A'} | Paciente: ${data.pacienteId || 'N/A'}`);
        count++;
      }
    });
    console.log();

    if (isDryRun) {
      console.log('✅ DRY RUN COMPLETADO - No se eliminó ninguna nota\n');
      console.log('Para eliminar realmente, ejecuta:');
      console.log('   node scripts/delete-all-clinical-notes.cjs --apply\n');
      return;
    }

    // Confirmación final para modo --apply
    if (!skipConfirmation) {
      console.log('⚠️  CONFIRMACIÓN REQUERIDA ⚠️');
      console.log(`Estás a punto de eliminar ${totalNotas} notas clínicas PERMANENTEMENTE.`);
      console.log('Esta acción NO se puede deshacer.\n');

      const confirmacion = await askQuestion('Escribe "BORRAR TODO" para confirmar: ');

      if (confirmacion.trim() !== 'BORRAR TODO') {
        console.log('\n❌ Operación cancelada. No se eliminó ninguna nota.\n');
        return;
      }
    } else {
      console.log('⚠️  Confirmación automática activada (--confirm flag)\n');
    }

    console.log('\n🗑️  Eliminando notas...');

    // Eliminar en lotes (Firestore tiene límite de 500 operaciones por lote)
    const batchSize = 500;
    let deletedCount = 0;
    let batch = db.batch();
    let operationsInBatch = 0;

    for (const doc of snapshot.docs) {
      batch.delete(doc.ref);
      operationsInBatch++;
      deletedCount++;

      // Commit el batch cuando alcance el límite
      if (operationsInBatch === batchSize) {
        await batch.commit();
        console.log(`   Eliminadas ${deletedCount}/${totalNotas} notas...`);
        batch = db.batch();
        operationsInBatch = 0;
      }
    }

    // Commit el último batch si tiene operaciones pendientes
    if (operationsInBatch > 0) {
      await batch.commit();
      console.log(`   Eliminadas ${deletedCount}/${totalNotas} notas...`);
    }

    console.log('\n✅ ELIMINACIÓN COMPLETADA\n');
    console.log('═'.repeat(80));
    console.log(`📊 Total de notas eliminadas: ${deletedCount}`);
    console.log('═'.repeat(80));
    console.log();

  } catch (error) {
    console.error('\n❌ ERROR durante la eliminación:', error);
    throw error;
  } finally {
    rl.close();
  }
}

// Procesar argumentos de línea de comandos
const args = process.argv.slice(2);
const isDryRun = !args.includes('--apply');
const skipConfirmation = args.includes('--confirm');

if (args.length === 0 || (!args.includes('--dry-run') && !args.includes('--apply'))) {
  console.log('\n⚠️  Uso incorrecto\n');
  console.log('Uso:');
  console.log('  node scripts/delete-all-clinical-notes.cjs --dry-run           # Simular eliminación');
  console.log('  node scripts/delete-all-clinical-notes.cjs --apply             # ELIMINAR REALMENTE');
  console.log('  node scripts/delete-all-clinical-notes.cjs --apply --confirm   # ELIMINAR sin confirmación\n');
  process.exit(1);
}

deleteAllClinicalNotes(isDryRun, skipConfirmation)
  .then(() => {
    console.log('Script finalizado.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
