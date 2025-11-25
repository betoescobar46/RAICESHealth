/**
 * Script para configurar OAuth 2.0 de Google Calendar automáticamente
 *
 * Este script te guiará para crear las credenciales necesarias.
 * Solo necesitas seguir el link y pegar el código resultante.
 */

console.log('\n=================================');
console.log('CONFIGURACIÓN DE GOOGLE CALENDAR');
console.log('=================================\n');

console.log('Para habilitar la sincronización directa con Google Calendar, necesitas crear credenciales OAuth 2.0.\n');

console.log('📋 PASOS A SEGUIR:\n');

console.log('1. Ve a Google Cloud Console:');
console.log('   https://console.cloud.google.com/apis/credentials?project=simorahealth\n');

console.log('2. Habilita la API de Google Calendar:');
console.log('   https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=simorahealth\n');

console.log('3. Crea credenciales OAuth 2.0:');
console.log('   a) Haz clic en "+ CREAR CREDENCIALES" → "ID de cliente de OAuth"');
console.log('   b) Si es la primera vez, configura la pantalla de consentimiento:');
console.log('      - Tipo de usuario: Externo');
console.log('      - Nombre de la aplicación: "SIMORA Health"');
console.log('      - Correo de soporte del usuario: tu email');
console.log('      - Dominios autorizados: (dejar en blanco)');
console.log('      - Información de contacto del desarrollador: tu email');
console.log('   c) Tipo de aplicación: "Aplicación web"');
console.log('   d) Nombre: "SIMORA Health Web Client"');
console.log('   e) Orígenes de JavaScript autorizados:');
console.log('      - http://localhost:5173');
console.log('      - https://simorahealth.web.app');
console.log('      - https://simorahealth.firebaseapp.com');
console.log('   f) URIs de redirección autorizados:');
console.log('      - http://localhost:5173');
console.log('      - https://simorahealth.web.app');
console.log('      - https://simorahealth.firebaseapp.com\n');

console.log('4. COPIA el "ID de cliente" que se genere\n');

console.log('5. Pega el ID de cliente en el archivo .env:');
console.log('   VITE_GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com\n');

console.log('6. Reinicia el servidor de desarrollo:');
console.log('   npm run dev\n');

console.log('=================================\n');

console.log('💡 NOTA: Si ya configuraste Firebase Authentication con Google,');
console.log('         puedes reutilizar esas credenciales OAuth.\n');
