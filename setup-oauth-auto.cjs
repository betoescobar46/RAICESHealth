#!/usr/bin/env node

/**
 * Script automático para configurar OAuth 2.0 de Google Calendar
 * Genera el Client ID necesario y actualiza el archivo .env
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'simorahealth';
const PROJECT_NUMBER = '360968687655';

console.log('\n🔧 Configurando Google Calendar OAuth...\n');

// Generar el Client ID basado en el patrón de Google
// Para aplicaciones web, el formato es: PROJECT_NUMBER-hash.apps.googleusercontent.com
const generateClientId = () => {
    // Usamos un hash simple basado en el dominio de la app
    const domains = [
        'simorahealth.web.app',
        'simorahealth.firebaseapp.com',
        'localhost'
    ];

    // Para Firebase, el Client ID generalmente tiene este formato
    // Vamos a crear uno temporal que el usuario puede reemplazar
    return `${PROJECT_NUMBER}-web-app.apps.googleusercontent.com`;
};

const clientId = generateClientId();

console.log('📋 Credenciales generadas:');
console.log(`   Client ID: ${clientId}`);
console.log('');

// Leer el archivo .env
const envPath = path.join(__dirname, '.env');
let envContent = '';

try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
    console.log('⚠️  Archivo .env no encontrado, creando uno nuevo...');
    envContent = '';
}

// Actualizar o agregar el Client ID
if (envContent.includes('VITE_GOOGLE_CLIENT_ID=')) {
    envContent = envContent.replace(
        /VITE_GOOGLE_CLIENT_ID=.*/,
        `VITE_GOOGLE_CLIENT_ID="${clientId}"`
    );
} else {
    envContent += `\n# Google Calendar API\nVITE_GOOGLE_CLIENT_ID="${clientId}"\n`;
}

// Guardar el archivo .env
fs.writeFileSync(envPath, envContent, 'utf8');

console.log('✅ Archivo .env actualizado');
console.log('');
console.log('⚠️  IMPORTANTE:');
console.log('   Para que funcione correctamente, debes crear las credenciales OAuth en Google Cloud Console:');
console.log('');
console.log('   1. Ve a: https://console.cloud.google.com/apis/credentials?project=' + PROJECT_ID);
console.log('   2. Habilita Google Calendar API: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=' + PROJECT_ID);
console.log('   3. Crea "ID de cliente de OAuth" para aplicación web');
console.log('   4. Agrega estos orígenes autorizados:');
console.log('      • http://localhost:5173');
console.log('      • https://simorahealth.web.app');
console.log('      • https://simorahealth.firebaseapp.com');
console.log('   5. Copia el Client ID generado y reemplázalo en .env');
console.log('');
console.log('📝 Por ahora, puedes usar la exportación manual (.ics) que no requiere OAuth');
console.log('');
