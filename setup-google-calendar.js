/**
 * Script automatizado para configurar Google Calendar
 *
 * Este script te ayuda a configurar las credenciales de Google Calendar
 * de forma más sencilla.
 */

console.log('\n===========================================');
console.log('  CONFIGURACIÓN DE GOOGLE CALENDAR');
console.log('===========================================\n');

console.log('📋 PASOS PARA CONFIGURAR GOOGLE CALENDAR:\n');

console.log('1️⃣  Ve a Google Cloud Console:');
console.log('   https://console.cloud.google.com/\n');

console.log('2️⃣  Proyecto:');
console.log('   - Puedes usar el proyecto existente: rlppilotomaule');
console.log('   - O crear uno nuevo para SIMORA Health\n');

console.log('3️⃣  Habilitar Google Calendar API:');
console.log('   - Ve a: APIs y servicios > Biblioteca');
console.log('   - Busca: "Google Calendar API"');
console.log('   - Haz clic en "Habilitar"\n');

console.log('4️⃣  Crear credenciales OAuth 2.0:');
console.log('   - Ve a: APIs y servicios > Credenciales');
console.log('   - Haz clic: "+ Crear credenciales" > "ID de cliente de OAuth"');
console.log('   - Tipo: Aplicación web');
console.log('   - Nombre: SIMORA Health Calendar');
console.log('   - Orígenes autorizados:');
console.log('     • http://localhost:5173');
console.log('     • https://simorahealth.web.app');
console.log('     • https://simorahealth.firebaseapp.com');
console.log('   - URIs de redirección:');
console.log('     • http://localhost:5173');
console.log('     • https://simorahealth.web.app');
console.log('     • https://simorahealth.firebaseapp.com\n');

console.log('5️⃣  Copiar el Client ID:');
console.log('   - Después de crear, copia el "ID de cliente"');
console.log('   - Se verá como: xxxxx.apps.googleusercontent.com\n');

console.log('6️⃣  Actualizar el archivo .env:');
console.log('   - Abre el archivo .env');
console.log('   - Reemplaza la línea:');
console.log('     VITE_GOOGLE_CLIENT_ID=""');
console.log('   - Con tu Client ID:');
console.log('     VITE_GOOGLE_CLIENT_ID="tu-client-id.apps.googleusercontent.com"\n');

console.log('7️⃣  Reiniciar el servidor:');
console.log('   - Detén el servidor (Ctrl+C)');
console.log('   - Ejecuta: npm run dev\n');

console.log('✅ Una vez configurado:');
console.log('   - Ve a la vista de Calendario');
console.log('   - Verás el botón "Conectar Google Calendar"');
console.log('   - Haz clic y autoriza el acceso');
console.log('   - ¡Listo para sincronizar!\n');

console.log('===========================================\n');

console.log('💡 TIP: La API Key de Firebase ya está configurada.');
console.log('   Solo necesitas el Client ID de OAuth 2.0\n');

console.log('📖 Documentación completa: GOOGLE_CALENDAR_SETUP.md\n');

// Abrir Google Cloud Console automáticamente
const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('¿Quieres abrir Google Cloud Console ahora? (s/n): ', (answer) => {
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'y') {
        console.log('\n🌐 Abriendo Google Cloud Console...\n');
        exec('start https://console.cloud.google.com/apis/credentials', (error) => {
            if (error) {
                console.log('❌ No se pudo abrir el navegador automáticamente');
                console.log('   Ve manualmente a: https://console.cloud.google.com/apis/credentials\n');
            }
        });
    }

    console.log('👋 ¡Buena suerte con la configuración!\n');
    rl.close();
});
