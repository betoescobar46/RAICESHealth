// Simple test to verify data extraction works
import fs from 'fs';

// Read the JSON file
const jsonPath = './public/data-migration/pacientes_completos.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log('Testing data extraction on first patient...\n');
console.log('Patient name:', data[0].nombre);
console.log('Content preview (first 500 chars):');
console.log(data[0].contenidoCompleto.substring(0, 500));
console.log('\n\nSearching for key data fields:');

// RUT
const rutMatch = data[0].contenidoCompleto.match(/\b(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])\b/);
console.log('RUT found:', rutMatch ? rutMatch[1] : 'NOT FOUND');

// Phone
const phoneMatches = [...data[0].contenidoCompleto.matchAll(/\b(?:\+?56\s*)?([69]\d{8})\b/g)];
console.log('Phones found:', phoneMatches.map(m => m[1]));

// Email
const emailMatch = data[0].contenidoCompleto.match(/\b([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)\b/);
console.log('Email found:', emailMatch ? emailMatch[1] : 'NOT FOUND');

// Age
const edadMatch = data[0].contenidoCompleto.match(/\b(\d{1,3})\s*\n.*\d{1,2}\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i);
console.log('Age found:', edadMatch ? edadMatch[1] : 'NOT FOUND');

// Birth date
const birthMatch = data[0].contenidoCompleto.match(/(\d{1,2})\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(19\d{2}|200[0-2])/i);
console.log('Birth date found:', birthMatch ? `${birthMatch[1]} ${birthMatch[2]} ${birthMatch[3]}` : 'NOT FOUND');

// Address
const addressMatch = data[0].contenidoCompleto.match(/(\d+\s+(?:norte|sur|oriente|poniente|nte|ote|pte)\s+[^\n\r]{5,50}(?:Talca|Santiago|Valparaíso|Concepción)?)/i);
console.log('Address found:', addressMatch ? addressMatch[1] : 'NOT FOUND');

console.log('\n\nTotal patients in file:', data.length);
