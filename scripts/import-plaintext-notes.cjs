#!/usr/bin/env node

/**
 * Script para importar archivos .txt como notas clínicas únicas en Firestore
 *
 * Uso:
 *   node scripts/import-plaintext-notes.cjs --dry-run
 *   node scripts/import-plaintext-notes.cjs --apply
 *   node scripts/import-plaintext-notes.cjs --delete-first --apply  (limpia todo primero)
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'simorahealth'
  });
}

const db = admin.firestore();

// Rutas
const SOURCE_DIR = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema\\Pacientes extrasistema - Texto Plano';

/**
 * Normaliza un nombre para comparación (quita acentos, espacios extra, etc.)
 */
function normalizarNombre(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/\s+/g, ' ') // Espacios múltiples a uno
    .trim();
}

/**
 * Extrae el nombre del paciente del nombre del archivo
 * Ejemplo: "Ana Villar.txt" -> "Ana Villar"
 */
function extraerNombreDeArchivo(filename) {
  return filename.replace('.txt', '');
}

/**
 * Busca un paciente en Firestore por nombre
 */
async function buscarPacientePorNombre(nombreArchivo) {
  const nombreBuscado = normalizarNombre(nombreArchivo);

  // Obtener todos los pacientes
  const patientsSnap = await db.collection('patients').get();

  for (const doc of patientsSnap.docs) {
    const patient = doc.data();
    const nombreCompleto = `${patient.nombre || ''} ${patient.apellidoPaterno || ''} ${patient.apellidoMaterno || ''}`.trim();
    const nombreNormalizado = normalizarNombre(nombreCompleto);

    // Comparación flexible
    if (nombreNormalizado.includes(nombreBuscado) || nombreBuscado.includes(nombreNormalizado)) {
      return {
        firestoreId: doc.id,
        ...patient
      };
    }
  }

  return null;
}

/**
 * Elimina todas las notas clínicas de Firestore
 */
async function eliminarTodasLasNotas(dryRun = true) {
  console.log('\n🗑️  Eliminando todas las notas clínicas existentes...\n');

  if (dryRun) {
    console.log('   [DRY-RUN] No se eliminarán notas en modo dry-run\n');
    return { eliminadas: 0, errores: 0 };
  }

  const notesSnap = await db.collection('clinicalNotes').get();
  console.log(`   Total notas a eliminar: ${notesSnap.size}\n`);

  let eliminadas = 0;
  let errores = 0;
  const batchSize = 500;

  // Eliminar en lotes
  for (let i = 0; i < notesSnap.docs.length; i += batchSize) {
    const batch = db.batch();
    const chunk = notesSnap.docs.slice(i, i + batchSize);

    chunk.forEach(doc => {
      batch.delete(doc.ref);
    });

    try {
      await batch.commit();
      eliminadas += chunk.length;
      console.log(`   ✓ Eliminadas ${eliminadas}/${notesSnap.size} notas...`);
    } catch (error) {
      console.error(`   ❌ Error eliminando lote: ${error.message}`);
      errores += chunk.length;
    }
  }

  console.log(`\n   ✅ Total notas eliminadas: ${eliminadas}`);
  console.log(`   ❌ Errores: ${errores}\n`);

  return { eliminadas, errores };
}

/**
 * Importa todos los archivos .txt como notas clínicas
 */
async function importarNotas(dryRun = true) {
  console.log('📂 Importación de notas clínicas desde archivos de texto plano\n');
  console.log(`   Origen: ${SOURCE_DIR}`);
  console.log(`   Modo: ${dryRun ? 'DRY-RUN (sin escribir)' : 'APLICAR CAMBIOS'}\n`);

  // Verificar que el directorio existe
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: Directorio no encontrado: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Leer archivos .txt
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.txt'));
  console.log(`📋 Total archivos .txt encontrados: ${files.length}\n`);

  if (files.length === 0) {
    console.log('⚠️  No hay archivos .txt para procesar');
    return;
  }

  // Estadísticas
  let importadas = 0;
  let pacientesNoEncontrados = 0;
  let errores = 0;
  const noEncontrados = [];

  // Procesar cada archivo
  for (const filename of files) {
    try {
      const nombrePaciente = extraerNombreDeArchivo(filename);
      const filePath = path.join(SOURCE_DIR, filename);
      const contenido = fs.readFileSync(filePath, 'utf-8');

      // Buscar paciente en Firestore
      const paciente = await buscarPacientePorNombre(nombrePaciente);

      if (!paciente) {
        console.log(`⚠️  Paciente no encontrado: ${nombrePaciente}`);
        pacientesNoEncontrados++;
        noEncontrados.push(nombrePaciente);
        continue;
      }

      // Crear nota clínica
      const nota = {
        pacienteId: paciente.firestoreId,
        tipo: 'INGRESO',
        titulo: `Ficha completa - ${nombrePaciente}`,
        fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        hora: '00:00',
        timestamp: new Date().toISOString(),
        profesional: 'Importación desde archivos',
        profesionalId: 'sistema',
        ordenEnHistorial: 0,
        contenido: contenido.substring(0, 500), // Preview
        contenidoCompleto: contenido, // Texto completo
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
        importadoDesdeArchivo: true,
        archivoOrigen: filename
      };

      // Mostrar preview de la primera nota
      if (importadas === 0) {
        console.log('📄 PREVIEW - Primera nota a importar:');
        console.log('─'.repeat(80));
        console.log(`Paciente: ${nombrePaciente}`);
        console.log(`Firebase ID: ${paciente.firestoreId}`);
        console.log(`Contenido (primeros 300 chars):`);
        console.log(contenido.substring(0, 300) + '...');
        console.log('─'.repeat(80) + '\n');
      }

      // Escribir a Firestore (solo en modo apply)
      if (!dryRun) {
        await db.collection('clinicalNotes').add(nota);
      }

      importadas++;

      // Mostrar progreso cada 50 archivos
      if (importadas % 50 === 0) {
        console.log(`✓ Importadas ${importadas}/${files.length} notas...`);
      }

    } catch (error) {
      console.error(`❌ Error procesando ${filename}:`, error.message);
      errores++;
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(80));
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('='.repeat(80));
  console.log(`✅ Notas importadas exitosamente: ${importadas}`);
  console.log(`⚠️  Pacientes no encontrados: ${pacientesNoEncontrados}`);
  console.log(`❌ Errores: ${errores}`);

  if (noEncontrados.length > 0) {
    console.log('\n📝 Pacientes no encontrados en Firestore:');
    noEncontrados.slice(0, 20).forEach((nombre, i) => {
      console.log(`   ${i + 1}. ${nombre}`);
    });
    if (noEncontrados.length > 20) {
      console.log(`   ... y ${noEncontrados.length - 20} más`);
    }
  }

  if (dryRun) {
    console.log('\n⚠️  MODO DRY-RUN: No se escribieron notas en Firestore');
    console.log('   Para aplicar los cambios, ejecuta:');
    console.log('   node scripts/import-plaintext-notes.cjs --apply');
  } else {
    console.log(`\n✅ Notas importadas en Firestore collection: clinicalNotes`);
  }
  console.log('='.repeat(80));
}

// Ejecutar script
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  const deleteFirst = args.includes('--delete-first');

  try {
    if (deleteFirst) {
      await eliminarTodasLasNotas(dryRun);
    }

    await importarNotas(dryRun);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  }
}

main();
