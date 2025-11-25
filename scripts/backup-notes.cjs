/**
 * Script de Backup para Notas Clínicas
 *
 * Crea un respaldo completo de todas las notas clínicas antes de aplicar correcciones.
 * El backup se puede restaurar en caso de problemas.
 *
 * Uso:
 *   node scripts/backup-notes.cjs          # Crear backup
 *   node scripts/backup-notes.cjs --restore backup-2024-01-01T10-00-00.json
 *   node scripts/backup-notes.cjs --list   # Listar backups disponibles
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
  cyan: '\x1b[36m'
};

function print(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

/**
 * Solicitar confirmación del usuario
 */
function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question + ' (s/n): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'si');
    });
  });
}

/**
 * Crear backup
 */
async function createBackup() {
  print('\n📦 CREACIÓN DE BACKUP DE NOTAS CLÍNICAS\n', 'bright');
  print('═'.repeat(80), 'cyan');

  try {
    // Crear directorio de backups si no existe
    const backupsDir = path.join(__dirname, 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir);
    }

    // Nombre del archivo con timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const backupFile = path.join(backupsDir, `backup-${timestamp}.json`);

    // Obtener todas las notas
    print('\n📥 Obteniendo notas de Firestore...', 'blue');
    const snapshot = await db.collection('clinicalNotes').get();
    print(`   Total de notas: ${snapshot.size}`, 'cyan');

    // Crear estructura del backup
    const backup = {
      metadata: {
        timestamp: new Date().toISOString(),
        totalNotas: snapshot.size,
        version: '1.0',
        descripcion: 'Backup completo de notas clínicas'
      },
      notas: [],
      estadisticas: {
        porTipo: {},
        pacientesUnicos: new Set()
      }
    };

    // Procesar cada nota
    print('\n💾 Procesando notas para backup...', 'blue');
    let procesadas = 0;

    snapshot.forEach(doc => {
      const data = doc.data();

      // Guardar nota completa
      backup.notas.push({
        id: doc.id,
        data: data
      });

      // Actualizar estadísticas
      backup.estadisticas.porTipo[data.tipo] = (backup.estadisticas.porTipo[data.tipo] || 0) + 1;
      const patientId = data.patientId || data.pacienteId;
      if (patientId) {
        backup.estadisticas.pacientesUnicos.add(patientId);
      }

      procesadas++;
      if (procesadas % 100 === 0) {
        process.stdout.write(`   Procesadas: ${procesadas}/${snapshot.size}\r`);
      }
    });

    console.log(''); // Nueva línea después del progreso

    // Convertir Set a número para el JSON
    backup.estadisticas.totalPacientes = backup.estadisticas.pacientesUnicos.size;
    delete backup.estadisticas.pacientesUnicos;

    // Guardar backup
    print('\n📝 Guardando backup...', 'blue');
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), 'utf8');

    // Verificar tamaño del archivo
    const stats = fs.statSync(backupFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    // Mostrar resumen
    print('\n\n✅ BACKUP CREADO EXITOSAMENTE', 'green');
    print('═'.repeat(80), 'cyan');
    print(`\n📄 Archivo: ${backupFile}`, 'yellow');
    print(`📊 Tamaño: ${fileSizeMB} MB`, 'yellow');
    print(`📋 Contenido:`, 'yellow');
    print(`   - Total de notas: ${backup.metadata.totalNotas}`);
    print(`   - Total de pacientes: ${backup.estadisticas.totalPacientes}`);
    print(`   - Distribución por tipo:`);
    Object.entries(backup.estadisticas.porTipo).forEach(([tipo, count]) => {
      print(`     • ${tipo}: ${count}`);
    });

    print('\n💡 Para restaurar este backup, ejecute:', 'blue');
    print(`   node scripts/backup-notes.cjs --restore ${path.basename(backupFile)}`, 'cyan');
    print('\n' + '═'.repeat(80) + '\n', 'cyan');

    return backupFile;

  } catch (error) {
    print('\n❌ Error creando backup:', 'red');
    console.error(error);
    process.exit(1);
  }
}

/**
 * Restaurar backup
 */
async function restoreBackup(backupFileName) {
  print('\n🔄 RESTAURACIÓN DE BACKUP DE NOTAS CLÍNICAS\n', 'bright');
  print('═'.repeat(80), 'cyan');

  try {
    // Verificar que el archivo existe
    const backupFile = path.join(__dirname, 'backups', backupFileName);
    if (!fs.existsSync(backupFile)) {
      throw new Error(`No se encontró el archivo de backup: ${backupFileName}`);
    }

    // Leer el backup
    print('\n📖 Leyendo archivo de backup...', 'blue');
    const backupContent = fs.readFileSync(backupFile, 'utf8');
    const backup = JSON.parse(backupContent);

    // Mostrar información del backup
    print(`\n📋 Información del backup:`, 'yellow');
    print(`   Fecha: ${backup.metadata.timestamp}`);
    print(`   Total de notas: ${backup.metadata.totalNotas}`);
    print(`   Versión: ${backup.metadata.version}`);

    // Advertencia antes de restaurar
    print('\n⚠️  ADVERTENCIA:', 'red');
    print('   Esta operación ELIMINARÁ todas las notas actuales y las', 'red');
    print('   reemplazará con las del backup.', 'red');
    print('   Esta acción NO se puede deshacer.', 'red');

    // Solicitar confirmación
    const confirmar = await askConfirmation('\n¿Está seguro de que desea continuar?');

    if (!confirmar) {
      print('\n❌ Restauración cancelada por el usuario', 'yellow');
      process.exit(0);
    }

    // Segunda confirmación para mayor seguridad
    const confirmar2 = await askConfirmation('\n¿Está COMPLETAMENTE SEGURO? Esta es la última confirmación');

    if (!confirmar2) {
      print('\n❌ Restauración cancelada por el usuario', 'yellow');
      process.exit(0);
    }

    // Crear backup actual antes de restaurar
    print('\n📦 Creando backup de seguridad del estado actual...', 'blue');
    const backupActual = await createBackup();
    print(`   Backup actual guardado en: ${backupActual}`, 'green');

    // Eliminar todas las notas actuales
    print('\n🗑️  Eliminando notas actuales...', 'yellow');
    const currentSnapshot = await db.collection('clinicalNotes').get();
    let eliminadas = 0;
    let batch = db.batch();
    let batchCount = 0;

    for (const doc of currentSnapshot.docs) {
      batch.delete(doc.ref);
      batchCount++;
      eliminadas++;

      // Firestore tiene límite de 500 operaciones por batch
      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
    }

    // Commit del último batch si tiene operaciones pendientes
    if (batchCount > 0) {
      await batch.commit();
    }

    print(`   Eliminadas: ${eliminadas} notas`, 'cyan');

    // Restaurar notas del backup
    print('\n📥 Restaurando notas del backup...', 'blue');
    let restauradas = 0;
    let errores = 0;

    for (const nota of backup.notas) {
      try {
        // Usar set con el ID original para mantener las referencias
        await db.collection('clinicalNotes').doc(nota.id).set(nota.data);
        restauradas++;

        if (restauradas % 50 === 0) {
          process.stdout.write(`   Restauradas: ${restauradas}/${backup.notas.length}\r`);
        }
      } catch (error) {
        errores++;
        console.error(`Error restaurando nota ${nota.id}:`, error.message);
      }
    }

    console.log(''); // Nueva línea después del progreso

    // Mostrar resumen
    print('\n\n✅ RESTAURACIÓN COMPLETADA', 'green');
    print('═'.repeat(80), 'cyan');
    print(`\n📊 Resultados:`, 'yellow');
    print(`   Notas restauradas: ${restauradas}/${backup.notas.length}`, restauradas === backup.notas.length ? 'green' : 'yellow');
    if (errores > 0) {
      print(`   Errores: ${errores}`, 'red');
    }

    print('\n💡 Se creó un backup del estado anterior en:', 'blue');
    print(`   ${backupActual}`, 'cyan');
    print('\n' + '═'.repeat(80) + '\n', 'cyan');

  } catch (error) {
    print('\n❌ Error restaurando backup:', 'red');
    console.error(error);
    process.exit(1);
  }
}

/**
 * Listar backups disponibles
 */
function listBackups() {
  print('\n📁 BACKUPS DISPONIBLES\n', 'bright');
  print('═'.repeat(80), 'cyan');

  const backupsDir = path.join(__dirname, 'backups');

  if (!fs.existsSync(backupsDir)) {
    print('\n❌ No hay backups disponibles', 'yellow');
    print('   El directorio de backups no existe', 'yellow');
    return;
  }

  const files = fs.readdirSync(backupsDir)
    .filter(f => f.endsWith('.json') && f.startsWith('backup-'))
    .sort()
    .reverse(); // Más recientes primero

  if (files.length === 0) {
    print('\n❌ No hay backups disponibles', 'yellow');
    return;
  }

  print('\n📋 Archivos de backup encontrados:\n', 'yellow');

  files.forEach((file, i) => {
    const filePath = path.join(backupsDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    const fecha = file.replace('backup-', '').replace('.json', '').replace('T', ' ');

    print(`${i + 1}. ${file}`, 'cyan');
    print(`   Fecha: ${fecha}`);
    print(`   Tamaño: ${fileSizeMB} MB`);
    print('');
  });

  print('💡 Para restaurar un backup, ejecute:', 'blue');
  print('   node scripts/backup-notes.cjs --restore [nombre-archivo]', 'cyan');
  print('\n' + '═'.repeat(80) + '\n', 'cyan');
}

/**
 * Proceso principal
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--restore')) {
    // Modo restauración
    const fileIndex = args.indexOf('--restore') + 1;
    if (fileIndex >= args.length) {
      print('\n❌ Error: Debe especificar el archivo a restaurar', 'red');
      print('   Ejemplo: node scripts/backup-notes.cjs --restore backup-2024-01-01T10-00-00.json\n', 'yellow');
      listBackups();
      process.exit(1);
    }
    await restoreBackup(args[fileIndex]);
  } else if (args.includes('--list')) {
    // Listar backups disponibles
    listBackups();
  } else {
    // Modo creación de backup
    await createBackup();
  }

  process.exit(0);
}

// Ejecutar
main();