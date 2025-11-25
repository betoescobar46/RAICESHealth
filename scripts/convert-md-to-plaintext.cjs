#!/usr/bin/env node

/**
 * Script para convertir archivos .md de pacientes a texto plano limpio
 *
 * Uso:
 *   node scripts/convert-md-to-plaintext.cjs --dry-run
 *   node scripts/convert-md-to-plaintext.cjs --apply
 */

const fs = require('fs');
const path = require('path');

// Rutas
const SOURCE_DIR = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema\\Pacientes extrasistema';
const OUTPUT_DIR = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema\\Pacientes extrasistema - Texto Plano';

// Archivos a excluir (adjuntos, certificados, guías, etc.)
const EXCLUDE_PATTERNS = [
  /certificado/i,
  /informe compin/i,
  /guia/i,
  /adjunto/i,
  /formato/i
];

/**
 * Convierte contenido markdown a texto plano legible
 */
function convertMarkdownToPlainText(content) {
  let text = content;

  // 1. Eliminar frontmatter YAML (--- ... ---)
  text = text.replace(/^---[\s\S]*?---\n*/m, '');

  // 2. Eliminar líneas vacías múltiples al inicio
  text = text.replace(/^\s+/, '');

  // 3. Convertir headers markdown a texto plano
  // ###### Header -> HEADER:
  // **Bold Header** -> Bold Header:
  text = text.replace(/^#{1,6}\s*\*\*(.*?)\*\*\s*$/gm, '$1:');
  text = text.replace(/^#{1,6}\s+(.*?)$/gm, '$1:');

  // 4. Convertir bold (**texto**) a texto plano
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');

  // 5. Convertir italic (*texto* o _texto_) a texto plano
  text = text.replace(/[*_](.*?)[*_]/g, '$1');

  // 6. Convertir blockquotes (>) a simple indentación
  text = text.replace(/^>\s*/gm, '  ');

  // 7. Convertir listas (-, *, +) manteniendo indentación
  text = text.replace(/^[\-\*\+]\s+/gm, '• ');

  // 8. Eliminar líneas de separación (---, ***, ___)
  text = text.replace(/^[\-\*\_]{3,}\s*$/gm, '');

  // 9. Convertir links [texto](url) a solo texto
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // 10. Eliminar código inline (`código`)
  text = text.replace(/`([^`]+)`/g, '$1');

  // 11. Limpiar líneas vacías múltiples (máximo 2 seguidas)
  text = text.replace(/\n{3,}/g, '\n\n');

  // 12. Trim final
  text = text.trim();

  return text;
}

/**
 * Verifica si un archivo debe ser excluido
 */
function shouldExcludeFile(filename) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filename));
}

/**
 * Busca archivos .md recursivamente en un directorio
 */
function findMdFilesRecursive(directory) {
  let mdFiles = [];

  try {
    const items = fs.readdirSync(directory);

    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Excluir carpeta "Adjuntos clinicos"
        if (!item.includes('Adjuntos')) {
          mdFiles = mdFiles.concat(findMdFilesRecursive(fullPath));
        }
      } else if (stat.isFile() && item.endsWith('.md') && !shouldExcludeFile(item)) {
        mdFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error leyendo ${directory}:`, error.message);
  }

  return mdFiles;
}

/**
 * Procesa todos los archivos .md
 */
async function processFiles(dryRun = true) {
  console.log('📂 Conversión de archivos .md a texto plano\n');
  console.log(`   Origen: ${SOURCE_DIR}`);
  console.log(`   Destino: ${OUTPUT_DIR}`);
  console.log(`   Modo: ${dryRun ? 'DRY-RUN (sin escribir)' : 'APLICAR CAMBIOS'}\n`);

  // Verificar que el directorio de origen existe
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: Directorio de origen no encontrado: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Crear directorio de salida si no existe (solo en modo apply)
  if (!dryRun && !fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Directorio de salida creado: ${OUTPUT_DIR}\n`);
  }

  // Buscar archivos .md recursivamente
  const mdFiles = findMdFilesRecursive(SOURCE_DIR);

  console.log(`📋 Archivos de pacientes encontrados: ${mdFiles.length}\n`);

  if (mdFiles.length === 0) {
    console.log('⚠️  No hay archivos .md de pacientes para procesar');
    return;
  }

  // Estadísticas
  let processed = 0;
  let errors = 0;

  // Procesar cada archivo
  for (const sourcePath of mdFiles) {
    try {
      const filename = path.basename(sourcePath);
      const outputPath = path.join(OUTPUT_DIR, filename.replace('.md', '.txt'));

      // Leer contenido original
      const content = fs.readFileSync(sourcePath, 'utf-8');

      // Convertir a texto plano
      const plainText = convertMarkdownToPlainText(content);

      // Mostrar preview del primer archivo
      if (processed === 0) {
        console.log('📄 PREVIEW - Primer archivo convertido:');
        console.log('─'.repeat(80));
        console.log(`Archivo: ${filename}`);
        console.log(`Original: ${content.length} caracteres`);
        console.log(`Convertido: ${plainText.length} caracteres`);
        console.log('─'.repeat(80));
        console.log(plainText.substring(0, 500) + '...\n');
        console.log('─'.repeat(80) + '\n');
      }

      // Escribir archivo (solo en modo apply)
      if (!dryRun) {
        fs.writeFileSync(outputPath, plainText, 'utf-8');
      }

      processed++;

      // Mostrar progreso cada 50 archivos
      if (processed % 50 === 0) {
        console.log(`✓ Procesados ${processed}/${mdFiles.length} archivos...`);
      }

    } catch (error) {
      console.error(`❌ Error procesando ${filename}:`, error.message);
      errors++;
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(80));
  console.log('📊 RESUMEN DE CONVERSIÓN');
  console.log('='.repeat(80));
  console.log(`✅ Archivos procesados exitosamente: ${processed}`);
  console.log(`❌ Errores: ${errors}`);

  if (dryRun) {
    console.log('\n⚠️  MODO DRY-RUN: No se escribieron archivos');
    console.log('   Para aplicar los cambios, ejecuta:');
    console.log('   node scripts/convert-md-to-plaintext.cjs --apply');
  } else {
    console.log(`\n✅ Archivos guardados en: ${OUTPUT_DIR}`);
  }
  console.log('='.repeat(80));
}

// Ejecutar script
const args = process.argv.slice(2);
const dryRun = !args.includes('--apply');

processFiles(dryRun).catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
