/**
 * Script para importar pacientes directamente al localStorage
 * Se ejecuta en el navegador donde está corriendo SIMORAHealth
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo de pacientes migrados
const patientsFile = path.join(__dirname, 'pacientes_migrados.json');
const patients = JSON.parse(fs.readFileSync(patientsFile, 'utf-8'));

console.log('\n🚀 Importación Directa de Pacientes a SIMORAHealth\n');
console.log(`📁 Archivo: ${patientsFile}`);
console.log(`👥 Pacientes a importar: ${patients.length}\n`);

// Generar código JavaScript para copiar y pegar en la consola del navegador
const importCode = `
// ============================================
// CÓDIGO DE IMPORTACIÓN - SIMORAHealth
// ============================================

// 1. Obtener pacientes actuales
const currentPatients = JSON.parse(localStorage.getItem('rlp_patients') || '[]');
console.log('Pacientes actuales:', currentPatients.length);

// 2. Cargar nuevos pacientes
const newPatients = ${JSON.stringify(patients, null, 2)};
console.log('Pacientes a importar:', newPatients.length);

// 3. Combinar (agregar a los existentes)
const allPatients = [...currentPatients, ...newPatients];
console.log('Total de pacientes:', allPatients.length);

// 4. Guardar en localStorage
localStorage.setItem('rlp_patients', JSON.stringify(allPatients));

console.log('✅ ¡Importación completada!');
console.log('👉 Recarga la página (F5) para ver los cambios');

// Recargar automáticamente
setTimeout(() => {
    window.location.reload();
}, 2000);
`;

// Guardar el código en un archivo temporal
const outputFile = path.join(__dirname, 'import-code.js');
fs.writeFileSync(outputFile, importCode, 'utf-8');

console.log('✅ Código de importación generado\n');
console.log('📋 INSTRUCCIONES:\n');
console.log('1. Abre SIMORAHealth en tu navegador: http://localhost:3001');
console.log('2. Presiona F12 para abrir las Developer Tools');
console.log('3. Ve a la pestaña "Console"');
console.log('4. Copia TODO el contenido del archivo: import-code.js');
console.log('5. Pégalo en la consola y presiona Enter');
console.log('6. La página se recargará automáticamente');
console.log('7. Ve a "Registro" para ver tus 245 pacientes\n');

console.log(`📄 Archivo guardado en: ${outputFile}\n`);
console.log('💡 También puedes abrir el archivo import-code.js y copiar su contenido\n');
