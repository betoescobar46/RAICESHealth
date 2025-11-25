import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/data-migration/pacientes_completos.json', 'utf-8'));
const p = data.find(x => x.nombre.includes('Gabriela Espinoza'));

console.log('Patient found:', p ? 'YES' : 'NO');
if(p) {
    console.log('Name:', p.nombre);
    console.log('Has contenidoCompleto:', !!p.contenidoCompleto);
    console.log('Content length:', p.contenidoCompleto?.length);
    console.log('\nFirst 1000 chars of content:');
    console.log(p.contenidoCompleto?.substring(0, 1000));
}
