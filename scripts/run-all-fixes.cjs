/**
 * Master Script - Ejecuta todas las correcciones de notas clínicas en orden
 *
 * Este script coordina la ejecución de todos los scripts de corrección
 * en el orden correcto, con validación entre cada paso.
 *
 * Uso:
 *   node scripts/run-all-fixes.cjs --dry-run  # Modo análisis
 *   node scripts/run-all-fixes.cjs --apply    # Aplicar cambios
 */

const { spawn } = require('child_process');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');
const SKIP_BACKUP = process.argv.includes('--skip-backup');

// Scripts a ejecutar en orden
const SCRIPTS = [
  {
    name: 'split-clinical-notes.cjs',
    description: 'Dividir notas con headers markdown (#)',
    file: 'split-clinical-notes.cjs'
  },
  {
    name: 'split-controls-no-header.cjs',
    description: 'Extraer controles sin headers (texto plano)',
    file: 'split-controls-no-header.cjs'
  },
  {
    name: 'fix-subsections-as-controls.cjs',
    description: 'Reintegrar subsecciones incorrectamente separadas',
    file: 'fix-subsections-as-controls.cjs'
  }
];

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
const logFile = path.join(logsDir, `run-all-fixes-${timestamp}.log`);

/**
 * Escribir al log
 */
function log(message) {
  const logMessage = `[${new Date().toISOString()}] ${message}`;
  console.log(message);
  fs.appendFileSync(logFile, logMessage + '\n', 'utf8');
}

/**
 * Ejecutar un script hijo
 */
function runScript(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const scriptName = path.basename(scriptPath);
    log(`\n📄 Ejecutando: ${scriptName} ${args.join(' ')}`);

    const child = spawn('node', [scriptPath, ...args], {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'pipe'
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      const text = data.toString();
      stdout += text;
      process.stdout.write(text);
      fs.appendFileSync(logFile, text, 'utf8');
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      stderr += text;
      process.stderr.write(text);
      fs.appendFileSync(logFile, `[ERROR] ${text}`, 'utf8');
    });

    child.on('error', (error) => {
      log(`❌ Error ejecutando ${scriptName}: ${error.message}`);
      reject(error);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        log(`❌ ${scriptName} terminó con código ${code}`);
        reject(new Error(`Script failed with code ${code}`));
      } else {
        log(`✅ ${scriptName} completado exitosamente`);
        resolve({ stdout, stderr });
      }
    });
  });
}

/**
 * Obtener estadísticas actuales de la base de datos
 */
async function getStats() {
  const snapshot = await db.collection('clinicalNotes').get();

  const stats = {
    total: snapshot.size,
    porTipo: {},
    pacientes: new Set(),
    sinTitulo: 0,
    sinOrden: 0,
    conMultiplesIngresos: new Map()
  };

  snapshot.forEach(doc => {
    const data = doc.data();

    // Contar por tipo
    stats.porTipo[data.tipo] = (stats.porTipo[data.tipo] || 0) + 1;

    // Contar pacientes únicos
    const patientId = data.patientId || data.pacienteId;
    if (patientId) {
      stats.pacientes.add(patientId);

      // Rastrear múltiples INGRESO
      if (data.tipo === 'INGRESO') {
        const count = stats.conMultiplesIngresos.get(patientId) || 0;
        stats.conMultiplesIngresos.set(patientId, count + 1);
      }
    }

    // Verificar campos faltantes
    if (!data.titulo) stats.sinTitulo++;
    if (data.ordenEnHistorial === undefined) stats.sinOrden++;
  });

  // Contar pacientes con múltiples INGRESO
  stats.pacientesConMultiplesIngresos = 0;
  stats.conMultiplesIngresos.forEach((count) => {
    if (count > 1) stats.pacientesConMultiplesIngresos++;
  });

  return stats;
}

/**
 * Crear backup de las notas
 */
async function createBackup() {
  log('\n📦 Creando backup de seguridad...\n');

  const backupDir = path.join(__dirname, 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

  const snapshot = await db.collection('clinicalNotes').get();
  const backup = [];

  snapshot.forEach(doc => {
    backup.push({
      id: doc.id,
      data: doc.data()
    });
  });

  fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), 'utf8');
  log(`✅ Backup creado: ${backupFile}`);
  log(`   Total de notas respaldadas: ${backup.length}`);

  return backupFile;
}

/**
 * Mostrar resumen de estadísticas
 */
function showStats(stats, title) {
  log(`\n${title}`);
  log('═'.repeat(60));
  log(`   Total de notas: ${stats.total}`);
  log(`   Pacientes únicos: ${stats.pacientes.size}`);
  log(`   Notas por tipo:`);
  Object.entries(stats.porTipo).forEach(([tipo, count]) => {
    log(`      - ${tipo}: ${count}`);
  });
  log(`   Notas sin título: ${stats.sinTitulo}`);
  log(`   Notas sin ordenEnHistorial: ${stats.sinOrden}`);
  log(`   Pacientes con múltiples INGRESO: ${stats.pacientesConMultiplesIngresos}`);
  log('═'.repeat(60));
}

/**
 * Proceso principal
 */
async function main() {
  try {
    log('\n🚀 CORRECCIÓN MASIVA DE NOTAS CLÍNICAS\n');
    log('═'.repeat(80));
    log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN (análisis)' : '⚠️  APLICAR CAMBIOS REALES'}`);
    log(`Hora de inicio: ${new Date().toISOString()}`);
    log(`Log guardado en: ${logFile}`);
    log('\n' + '═'.repeat(80));

    // Obtener estadísticas iniciales
    log('\n📊 Obteniendo estadísticas iniciales...');
    const statsInicial = await getStats();
    showStats(statsInicial, '📊 ESTADO INICIAL DE LA BASE DE DATOS');

    // Crear backup si no es dry-run y no se omitió
    let backupFile = null;
    if (!DRY_RUN && !SKIP_BACKUP) {
      backupFile = await createBackup();
    } else if (SKIP_BACKUP) {
      log('\n⚠️  Backup omitido por parámetro --skip-backup');
    }

    // Ejecutar cada script en orden
    const mode = DRY_RUN ? '--dry-run' : '--apply';

    for (let i = 0; i < SCRIPTS.length; i++) {
      const script = SCRIPTS[i];

      log(`\n\n${'='.repeat(80)}`);
      log(`PASO ${i + 1}/${SCRIPTS.length}: ${script.description}`);
      log(`${'='.repeat(80)}`);

      const scriptPath = path.join(__dirname, script.file);

      try {
        await runScript(scriptPath, [mode]);

        // Obtener estadísticas después de cada paso
        const statsActual = await getStats();
        log(`\n📈 Estadísticas después del paso ${i + 1}:`);
        log(`   Cambio en total de notas: ${statsInicial.total} → ${statsActual.total}`);
        log(`   Cambio en tipos:`);
        Object.keys({...statsInicial.porTipo, ...statsActual.porTipo}).forEach(tipo => {
          const antes = statsInicial.porTipo[tipo] || 0;
          const despues = statsActual.porTipo[tipo] || 0;
          if (antes !== despues) {
            log(`      - ${tipo}: ${antes} → ${despues} (${despues > antes ? '+' : ''}${despues - antes})`);
          }
        });

      } catch (error) {
        log(`\n❌ ERROR CRÍTICO en paso ${i + 1}: ${error.message}`);
        log('\n⚠️  Proceso detenido. Revise el log para más detalles.');

        if (backupFile) {
          log(`\n💾 Puede restaurar desde el backup: ${backupFile}`);
        }

        process.exit(1);
      }
    }

    // Estadísticas finales
    log('\n\n📊 Obteniendo estadísticas finales...');
    const statsFinal = await getStats();
    showStats(statsFinal, '📊 ESTADO FINAL DE LA BASE DE DATOS');

    // Resumen de cambios
    log('\n\n📋 RESUMEN DE CAMBIOS');
    log('═'.repeat(80));
    log(`   Total de notas: ${statsInicial.total} → ${statsFinal.total} (${statsFinal.total >= statsInicial.total ? '+' : ''}${statsFinal.total - statsInicial.total})`);
    log(`   Pacientes únicos: ${statsInicial.pacientes.size} → ${statsFinal.pacientes.size}`);
    log(`   Tipos de notas:`);
    Object.keys({...statsInicial.porTipo, ...statsFinal.porTipo}).forEach(tipo => {
      const antes = statsInicial.porTipo[tipo] || 0;
      const despues = statsFinal.porTipo[tipo] || 0;
      log(`      - ${tipo}: ${antes} → ${despues} (${despues >= antes ? '+' : ''}${despues - antes})`);
    });
    log(`   Pacientes con múltiples INGRESO: ${statsInicial.pacientesConMultiplesIngresos} → ${statsFinal.pacientesConMultiplesIngresos}`);
    log('═'.repeat(80));

    // Validación final
    if (statsFinal.pacientesConMultiplesIngresos > 0) {
      log('\n⚠️  ADVERTENCIA: Aún hay pacientes con múltiples INGRESO');
      log('   Puede ser necesario revisar manualmente estos casos.');
    } else {
      log('\n✅ Validación exitosa: Ningún paciente tiene múltiples INGRESO');
    }

    if (statsFinal.sinOrden > 0) {
      log('\n⚠️  ADVERTENCIA: Hay notas sin ordenEnHistorial');
    } else {
      log('\n✅ Validación exitosa: Todas las notas tienen ordenEnHistorial');
    }

    // Finalización
    log('\n\n' + '═'.repeat(80));
    if (DRY_RUN) {
      log('\n✅ ANÁLISIS COMPLETADO (Modo Dry-Run)');
      log('\n💡 Para aplicar los cambios, ejecute:');
      log('   node scripts/run-all-fixes.cjs --apply');
    } else {
      log('\n✅ CORRECCIONES APLICADAS EXITOSAMENTE');
      if (backupFile) {
        log(`\n💾 Backup guardado en: ${backupFile}`);
      }
    }

    log(`\nHora de finalización: ${new Date().toISOString()}`);
    log(`Log completo guardado en: ${logFile}`);
    log('\n' + '═'.repeat(80) + '\n');

  } catch (error) {
    log(`\n❌ Error inesperado: ${error.message}`);
    log(error.stack);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
main();