/**
 * Script para Limpiar Símbolos Markdown de Notas Clínicas
 *
 * Problema: Las notas clínicas contienen símbolos de formato Markdown (##, **, >, ---)
 * que aparecen como ruido visual cuando se muestran como texto plano.
 *
 * Solución: Eliminar todos los símbolos Markdown y convertir el contenido a texto
 * plano limpio, manteniendo la estructura pero sin decoraciones de formato.
 *
 * Uso:
 *   node scripts/clean-markdown-from-notes.cjs --dry-run   # Preview de cambios
 *   node scripts/clean-markdown-from-notes.cjs --apply     # Aplicar cambios reales
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

const DRY_RUN = process.argv.includes('--dry-run') || !process.argv.includes('--apply');

/**
 * Limpia todos los símbolos Markdown de un texto
 */
function cleanMarkdownSymbols(content) {
  if (!content) return '';

  let cleaned = content;

  // Estadísticas de limpieza
  const stats = {
    blockquotes: 0,
    bold: 0,
    headers: 0,
    horizontalRules: 0,
    italic: 0
  };

  // 1. BLOCKQUOTES (>) - CRÍTICO - ~50-60 líneas por nota
  // Eliminar > al inicio de líneas, preservando el contenido
  const blockquoteLines = cleaned.match(/^>\s*/gm) || [];
  stats.blockquotes = blockquoteLines.length;
  cleaned = cleaned
    .split('\n')
    .map(line => line.replace(/^>\s*/, ''))
    .join('\n');

  // 2. NEGRITAS (**texto**) - MUY ALTO - ~20-30 instancias
  // Eliminar ** pero mantener el texto
  const boldMatches = cleaned.match(/\*\*[^*]+\*\*/g) || [];
  stats.bold = boldMatches.length;
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');

  // 3. ENCABEZADOS (###, ##, #) - ALTO/MEDIO
  // Eliminar símbolos # al inicio de líneas, mantener el texto
  const headerMatches = cleaned.match(/^#{1,6}\s+/gm) || [];
  stats.headers = headerMatches.length;
  cleaned = cleaned
    .split('\n')
    .map(line => line.replace(/^#{1,6}\s+/, ''))
    .join('\n');

  // 4. LÍNEAS HORIZONTALES (---) - MEDIO - 3 instancias
  // Eliminar líneas que sean solo guiones
  const hrMatches = cleaned.match(/^-{3,}\s*$/gm) || [];
  stats.horizontalRules = hrMatches.length;
  cleaned = cleaned.replace(/^-{3,}\s*$/gm, '');

  // 5. CURSIVAS (_texto_ o *texto*) - BAJO - 0 encontrado pero por si acaso
  // Eliminar _ o * individuales pero mantener el texto
  const italicMatches = cleaned.match(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g) || [];
  const underscoreMatches = cleaned.match(/_([^_]+)_/g) || [];
  stats.italic = italicMatches.length + underscoreMatches.length;
  cleaned = cleaned.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '$1'); // *texto*
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1'); // _texto_

  // 6. Limpiar múltiples líneas vacías consecutivas (dejando máximo 2)
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');

  // 7. Limpiar espacios al final de líneas
  cleaned = cleaned
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n');

  // 8. Limpiar espacios al inicio y final del contenido completo
  cleaned = cleaned.trim();

  return { cleaned, stats };
}

/**
 * Crea un backup antes de aplicar cambios
 */
async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '..', 'backups');
  const backupFile = path.join(backupDir, `clinical-notes-pre-markdown-clean-${timestamp}.json`);

  console.log('\n📦 Creando backup de seguridad...');

  try {
    // Crear directorio de backups si no existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Obtener todas las notas
    const snapshot = await db.collection('clinicalNotes').get();

    const notas = [];
    snapshot.forEach(doc => {
      notas.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      });
    });

    const backup = {
      metadata: {
        timestamp: new Date().toISOString(),
        totalNotas: notas.length,
        firebaseProject: 'simorahealth',
        collection: 'clinicalNotes',
        purpose: 'Pre-Markdown cleaning backup',
        version: '1.0'
      },
      notas: notas
    };

    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), 'utf8');

    const fileSizeMB = (fs.statSync(backupFile).size / (1024 * 1024)).toFixed(2);

    console.log(`✅ Backup creado: ${backupFile}`);
    console.log(`   Tamaño: ${fileSizeMB} MB | Notas: ${notas.length}\n`);

    return backupFile;

  } catch (error) {
    console.error('❌ Error al crear backup:', error);
    throw error;
  }
}

/**
 * Proceso principal
 */
async function cleanMarkdownFromNotes() {
  console.log('\n🧹 LIMPIEZA DE SÍMBOLOS MARKDOWN EN NOTAS CLÍNICAS\n');
  console.log('═'.repeat(80));
  console.log(`\nModo: ${DRY_RUN ? '🔎 DRY-RUN (solo análisis)' : '⚠️  APLICAR CAMBIOS REALES'}\n`);

  if (DRY_RUN) {
    console.log('💡 Para aplicar cambios reales, ejecuta:');
    console.log('   node scripts/clean-markdown-from-notes.cjs --apply\n');
  }

  console.log('═'.repeat(80));

  try {
    // Obtener todas las notas clínicas
    const snapshot = await db.collection('clinicalNotes').get();

    console.log('\n📥 Analizando notas clínicas...');
    console.log(`   Total de notas: ${snapshot.size}\n`);

    // Estadísticas globales
    const globalStats = {
      notasAnalizadas: 0,
      notasModificadas: 0,
      notasSinCambios: 0,
      totalBlockquotes: 0,
      totalBold: 0,
      totalHeaders: 0,
      totalHorizontalRules: 0,
      totalItalic: 0,
      caracteresOriginales: 0,
      caracteresLimpios: 0
    };

    const notasConCambios = [];
    const ejemplos = [];

    // Analizar cada nota
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const contenidoOriginal = data.contenidoCompleto || data.contenido || '';

      if (!contenidoOriginal) {
        globalStats.notasSinCambios++;
        continue;
      }

      globalStats.notasAnalizadas++;
      globalStats.caracteresOriginales += contenidoOriginal.length;

      // Limpiar contenido
      const { cleaned, stats } = cleanMarkdownSymbols(contenidoOriginal);

      globalStats.caracteresLimpios += cleaned.length;

      // Verificar si hubo cambios
      const hubocambios = cleaned !== contenidoOriginal;

      if (hubocambios) {
        globalStats.notasModificadas++;
        globalStats.totalBlockquotes += stats.blockquotes;
        globalStats.totalBold += stats.bold;
        globalStats.totalHeaders += stats.headers;
        globalStats.totalHorizontalRules += stats.horizontalRules;
        globalStats.totalItalic += stats.italic;

        notasConCambios.push({
          id: doc.id,
          pacienteNombre: data.pacienteNombre || data.patientName || 'Sin nombre',
          tipo: data.tipo || 'SIN_TIPO',
          titulo: data.titulo || 'Sin título',
          fecha: data.fecha || 'Sin fecha',
          contenidoOriginal,
          contenidoLimpio: cleaned,
          stats
        });

        // Guardar primeros 3 ejemplos para mostrar
        if (ejemplos.length < 3) {
          ejemplos.push({
            paciente: data.pacienteNombre || data.patientName || 'Sin nombre',
            tipo: data.tipo,
            titulo: data.titulo,
            antes: contenidoOriginal.substring(0, 300),
            despues: cleaned.substring(0, 300),
            stats
          });
        }
      } else {
        globalStats.notasSinCambios++;
      }
    }

    // Mostrar estadísticas
    console.log('📊 ESTADÍSTICAS GLOBALES\n');
    console.log('═'.repeat(80));
    console.log(`\n   Notas analizadas: ${globalStats.notasAnalizadas}`);
    console.log(`   ✅ Notas sin cambios: ${globalStats.notasSinCambios}`);
    console.log(`   🧹 Notas con símbolos Markdown: ${globalStats.notasModificadas}`);
    console.log(`\n   Símbolos eliminados por tipo:`);
    console.log(`      > (blockquotes): ${globalStats.totalBlockquotes}`);
    console.log(`      ** (negritas): ${globalStats.totalBold}`);
    console.log(`      # (encabezados): ${globalStats.totalHeaders}`);
    console.log(`      --- (líneas horizontales): ${globalStats.totalHorizontalRules}`);
    console.log(`      _ /* (cursivas): ${globalStats.totalItalic}`);
    console.log(`\n   Caracteres originales: ${globalStats.caracteresOriginales.toLocaleString()}`);
    console.log(`   Caracteres limpios: ${globalStats.caracteresLimpios.toLocaleString()}`);
    console.log(`   Reducción: ${(globalStats.caracteresOriginales - globalStats.caracteresLimpios).toLocaleString()} caracteres`);
    console.log('\n' + '═'.repeat(80));

    // Mostrar ejemplos
    if (ejemplos.length > 0) {
      console.log('\n📝 EJEMPLOS DE TRANSFORMACIÓN:\n');

      ejemplos.forEach((ejemplo, i) => {
        console.log(`${i + 1}. ${ejemplo.paciente} - ${ejemplo.tipo} - "${ejemplo.titulo}"`);
        console.log(`   Símbolos eliminados: > (${ejemplo.stats.blockquotes}), ** (${ejemplo.stats.bold}), # (${ejemplo.stats.headers})`);
        console.log('\n   ANTES:');
        console.log('   ' + '─'.repeat(76));
        ejemplo.antes.split('\n').forEach(line => {
          console.log('   ' + line);
        });
        if (ejemplo.antes.length >= 300) console.log('   ...');
        console.log('\n   DESPUÉS:');
        console.log('   ' + '─'.repeat(76));
        ejemplo.despues.split('\n').forEach(line => {
          console.log('   ' + line);
        });
        if (ejemplo.despues.length >= 300) console.log('   ...');
        console.log('\n');
      });
    }

    // Aplicar cambios si no es dry-run
    if (!DRY_RUN && notasConCambios.length > 0) {
      console.log('\n═'.repeat(80));
      console.log('\n⚠️  APLICANDO CAMBIOS A LA BASE DE DATOS...\n');

      // Crear backup primero
      const backupFile = await createBackup();
      console.log(`✅ Backup guardado en: ${backupFile}\n`);

      console.log('🔧 Actualizando notas en Firestore...\n');

      let batch = db.batch();
      let batchCount = 0;
      let totalProcessed = 0;

      for (const nota of notasConCambios) {
        const docRef = db.collection('clinicalNotes').doc(nota.id);

        // Actualizar contenidoCompleto y contenido (preview)
        batch.update(docRef, {
          contenidoCompleto: nota.contenidoLimpio,
          contenido: nota.contenidoLimpio.substring(0, 500).trim(),
          markdownLimpiado: true,
          fechaLimpiezaMarkdown: admin.firestore.Timestamp.now()
        });

        batchCount++;
        totalProcessed++;

        // Firestore permite máximo 500 operaciones por batch
        if (batchCount >= 500) {
          await batch.commit();
          console.log(`   Procesadas ${totalProcessed}/${notasConCambios.length} notas...`);
          batch = db.batch(); // Crear nuevo batch después de commit
          batchCount = 0;
        }
      }

      // Commit del último batch si quedaron operaciones
      if (batchCount > 0) {
        await batch.commit();
      }

      console.log(`\n✅ Todas las notas actualizadas: ${totalProcessed} notas`);
      console.log('\n═'.repeat(80));
      console.log('\n✅ LIMPIEZA COMPLETADA EXITOSAMENTE');
      console.log(`\n📦 Backup guardado en: ${backupFile}`);
    }

    console.log('\n═'.repeat(80));

    if (DRY_RUN && notasConCambios.length > 0) {
      console.log('\n💡 Para aplicar estos cambios, ejecuta:');
      console.log('   node scripts/clean-markdown-from-notes.cjs --apply\n');
    } else if (notasConCambios.length === 0) {
      console.log('\n✅ No se encontraron símbolos Markdown. Todo está limpio.\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error);
    console.error(error.stack);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
cleanMarkdownFromNotes();
