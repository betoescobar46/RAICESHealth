import fs from 'fs';
import path from 'path';

function buscarArchivosMdRecursivo(carpeta) {
  let archivos = [];

  try {
    const items = fs.readdirSync(carpeta);

    for (const item of items) {
      const rutaCompleta = path.join(carpeta, item);
      const stat = fs.statSync(rutaCompleta);

      if (stat.isDirectory()) {
        // Recursivamente buscar en subcarpetas
        archivos = archivos.concat(buscarArchivosMdRecursivo(rutaCompleta));
      } else if (stat.isFile() && item.endsWith('.md')) {
        archivos.push(rutaCompleta);
      }
    }
  } catch (error) {
    console.error(`Error leyendo carpeta ${carpeta}:`, error.message);
  }

  return archivos;
}

const CARPETA_ORIGEN = 'C:\\boveda725OB\\beto725\\Pacientes Extrasistema';

console.log('📂 Escaneando archivos .md...\n');
const archivos = buscarArchivosMdRecursivo(CARPETA_ORIGEN);

// Filtrar archivos que NO son pacientes (adjuntos, certificados, etc.)
const archivosPacientes = archivos.filter(archivo => {
  const nombre = path.basename(archivo).toLowerCase();
  const carpetaPadre = path.dirname(archivo);

  // Excluir archivos de carpeta "Adjuntos clinicos"
  if (carpetaPadre.includes('Adjuntos clinicos') || carpetaPadre.includes('Adjuntos clínicos')) {
    return false;
  }

  // Excluir certificados, guías, etc.
  if (nombre.includes('certificado') ||
      nombre.includes('guia') ||
      nombre.includes('guía') ||
      nombre.includes('explicativo')) {
    return false;
  }

  return true;
});

console.log(`✅ Total archivos .md encontrados: ${archivos.length}`);
console.log(`✅ Archivos de pacientes (filtrados): ${archivosPacientes.length}\n`);

console.log('📋 Primeros 10 archivos de pacientes:\n');
archivosPacientes.slice(0, 10).forEach((archivo, index) => {
  console.log(`${index + 1}. ${path.basename(archivo)}`);
});

console.log('\n📄 Leyendo archivo de muestra...\n');
if (archivosPacientes.length > 0) {
  const archivoMuestra = archivosPacientes[0];
  const contenido = fs.readFileSync(archivoMuestra, 'utf-8');
  const preview = contenido.substring(0, 2000);

  console.log(`Archivo: ${path.basename(archivoMuestra)}`);
  console.log(`Tamaño: ${contenido.length} caracteres\n`);
  console.log('='.repeat(80));
  console.log(preview);
  console.log('='.repeat(80));
  console.log('\n[... contenido truncado ...]');
}
