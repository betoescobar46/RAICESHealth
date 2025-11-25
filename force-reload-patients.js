import fs from 'fs';
import { extractPatientData } from './utils/extractPatientData.ts';

console.log('🔄 Forzando recarga de pacientes con datos extraídos...\n');

// Leer el JSON original
const data = JSON.parse(fs.readFileSync('public/data-migration/pacientes_completos.json', 'utf-8'));

console.log(`📊 Total de pacientes en JSON: ${data.length}\n`);

// Probar extracción en el primer paciente
const firstPatient = data[0];
console.log(`🧪 Probando extracción en: ${firstPatient.nombre}`);

const extracted = extractPatientData(firstPatient.contenidoCompleto);

console.log('\n✅ Datos extraídos:');
console.log('  RUT:', extracted.rut || '(no encontrado)');
console.log('  Edad:', extracted.edad);
console.log('  Fecha nacimiento:', extracted.fechaNacimiento);
console.log('  Sexo:', extracted.sexo);
console.log('  Dirección:', extracted.direccion || '(no encontrado)');
console.log('  Comuna:', extracted.comuna || '(no encontrado)');
console.log('  Teléfonos:', extracted.telefonos.length > 0 ? extracted.telefonos.join(', ') : '(no encontrado)');
console.log('  Email:', extracted.email || '(no encontrado)');
console.log('  Ocupación:', extracted.ocupacion || '(no encontrado)');
console.log('  Diagnóstico salud mental:', extracted.diagnostico.saludMental || '(no encontrado)');
console.log('  Fármacos:', extracted.farmacos.length);

// Ahora procesar TODOS los pacientes
console.log('\n\n📦 Procesando todos los pacientes...\n');

const processedPatients = data.map((p, index) => {
    const extractedData = extractPatientData(p.contenidoCompleto);

    if ((index + 1) % 50 === 0) {
        console.log(`  ⏳ Procesados: ${index + 1}/${data.length}`);
    }

    return {
        firestoreId: p.id,
        ficha: parseInt(p.numeroFicha) || Math.floor(Math.random() * 100000),
        nombre: p.nombre,
        rut: extractedData.rut,
        edad: extractedData.edad,
        sexo: extractedData.sexo,
        identidadGenero: '',
        fechaNacimiento: extractedData.fechaNacimiento,
        direccion: extractedData.direccion,
        comuna: extractedData.comuna,
        lat: -35.4264,
        lon: -71.6554,
        telefonos: extractedData.telefonos,
        email: extractedData.email,
        tutor: 'No aplica',
        ocupacion: extractedData.ocupacion,
        dispositivoAPS: '',
        alergias: extractedData.alergias,
        ram: '',
        objetivosTerapeuticos: '',
        diagnostico: extractedData.diagnostico,
        farmacos: extractedData.farmacos,
        pensionDiscapacidad: false,
        credencialDiscapacidad: false,
        consumoActivoDrogas: false,
        contenidoOriginal: p.contenidoCompleto,
        tags: p.tags || [],
        fechaCreacion: p.fechaCreacion,
        fechaActualizacion: p.fechaActualizacion,
        origen: p.origen
    };
});

console.log(`\n✅ Procesados ${processedPatients.length} pacientes`);

// Guardar en un archivo JSON que el navegador pueda leer
fs.writeFileSync(
    'public/processed-patients.json',
    JSON.stringify(processedPatients, null, 2)
);

console.log('\n💾 Pacientes procesados guardados en: public/processed-patients.json');
console.log('\n📊 Estadísticas de extracción:');

const stats = {
    conRUT: processedPatients.filter(p => p.rut).length,
    conEmail: processedPatients.filter(p => p.email).length,
    conTelefono: processedPatients.filter(p => p.telefonos.length > 0).length,
    conDireccion: processedPatients.filter(p => p.direccion).length,
    conDiagnostico: processedPatients.filter(p => p.diagnostico.saludMental).length,
    conFarmacos: processedPatients.filter(p => p.farmacos.length > 0).length,
};

console.log(`  Con RUT: ${stats.conRUT}/${processedPatients.length} (${Math.round(stats.conRUT/processedPatients.length*100)}%)`);
console.log(`  Con Email: ${stats.conEmail}/${processedPatients.length} (${Math.round(stats.conEmail/processedPatients.length*100)}%)`);
console.log(`  Con Teléfono: ${stats.conTelefono}/${processedPatients.length} (${Math.round(stats.conTelefono/processedPatients.length*100)}%)`);
console.log(`  Con Dirección: ${stats.conDireccion}/${processedPatients.length} (${Math.round(stats.conDireccion/processedPatients.length*100)}%)`);
console.log(`  Con Diagnóstico: ${stats.conDiagnostico}/${processedPatients.length} (${Math.round(stats.conDiagnostico/processedPatients.length*100)}%)`);
console.log(`  Con Fármacos: ${stats.conFarmacos}/${processedPatients.length} (${Math.round(stats.conFarmacos/processedPatients.length*100)}%)`);

console.log('\n✅ ¡Listo! Ahora actualiza la aplicación para usar este archivo procesado.');
