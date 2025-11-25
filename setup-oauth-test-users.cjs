const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuración
const PROJECT_ID = 'simorahealth';
const CLIENT_ID = '360968687655-6jqtk4sn8iqt1bvam6pbjh1qjo4114h1.apps.googleusercontent.com';
const TEST_USER_EMAIL = 'betoescobar46@gmail.com';

console.log('🔧 Configurando OAuth para SIMORA Health...\n');

// Primero, vamos a crear un archivo HTML que permita configurar todo localmente
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración OAuth - SIMORA Health</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .step {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .step h3 {
            margin-top: 0;
            color: #667eea;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px 5px;
            transition: all 0.3s;
        }
        button:hover {
            background: #5a67d8;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        .success {
            background: #d4edda;
            border-color: #28a745;
            color: #155724;
        }
        .warning {
            background: #fff3cd;
            border-color: #ffc107;
            color: #856404;
        }
        .error {
            background: #f8d7da;
            border-color: #dc3545;
            color: #721c24;
        }
        .status {
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            display: none;
        }
        a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        a:hover {
            text-decoration: underline;
        }
        .code-block {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
            margin: 10px 0;
        }
        .test-section {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #e9ecef;
        }
        .important-note {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Configuración OAuth - SIMORA Health</h1>

        <div class="important-note">
            <h3>⚠️ Acción Requerida</h3>
            <p>Para que la aplicación funcione, necesitas agregar tu email como usuario de prueba en Google Cloud Console.</p>
            <p>Este es un paso manual que no se puede automatizar por seguridad de Google.</p>
        </div>

        <div class="step">
            <h3>📋 Información del Proyecto</h3>
            <p><strong>Project ID:</strong> ${PROJECT_ID}</p>
            <p><strong>Client ID:</strong> ${CLIENT_ID}</p>
            <p><strong>Usuario de Prueba a Agregar:</strong> ${TEST_USER_EMAIL}</p>
        </div>

        <div class="step success">
            <h3>✅ Paso 1: Agregar Usuario de Prueba</h3>
            <p>Sigue estos pasos exactos:</p>
            <ol>
                <li>
                    <button onclick="window.open('https://console.cloud.google.com/apis/credentials/consent?project=${PROJECT_ID}', '_blank')">
                        📂 Abrir Google Cloud Console
                    </button>
                </li>
                <li>En la sección <strong>"OAuth consent screen"</strong>, busca <strong>"Test users"</strong></li>
                <li>Haz clic en el botón <strong>"+ ADD USERS"</strong></li>
                <li>En el campo de texto, escribe: <code>${TEST_USER_EMAIL}</code></li>
                <li>Haz clic en <strong>"ADD"</strong></li>
                <li>Haz clic en <strong>"SAVE"</strong> al final de la página</li>
            </ol>

            <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 5px;">
                <strong>💡 Tip:</strong> Copia este email para pegarlo fácilmente:<br>
                <input type="text" value="${TEST_USER_EMAIL}" readonly style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #4caf50; border-radius: 3px;" onclick="this.select()">
            </div>
        </div>

        <div class="step">
            <h3>📋 Paso 2: Verificar Configuración</h3>
            <p>Mientras estás en Google Cloud Console, verifica también:</p>
            <button onclick="window.open('https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=${PROJECT_ID}', '_blank')">
                🔍 Verificar que Google Calendar API esté habilitada
            </button>
            <button onclick="window.open('https://console.cloud.google.com/apis/credentials?project=${PROJECT_ID}', '_blank')">
                🔍 Verificar Credenciales OAuth
            </button>
        </div>

        <div class="test-section">
            <h2>🧪 Paso 3: Probar Conexión</h2>
            <p>Una vez que hayas agregado tu email como usuario de prueba, prueba la conexión:</p>
            <button onclick="testConnection()" id="testBtn" style="background: #28a745;">
                ✨ Probar Conexión con Google Calendar
            </button>
            <div id="testResult" class="status"></div>
        </div>

        <div class="step warning">
            <h3>🔧 Solución de Problemas</h3>
            <h4>Si ves "Acceso bloqueado":</h4>
            <ul>
                <li>Asegúrate de haber agregado <strong>${TEST_USER_EMAIL}</strong> en Test users</li>
                <li>Verifica que guardaste los cambios (botón SAVE)</li>
                <li>Espera 1-2 minutos para que los cambios se propaguen</li>
                <li>Intenta en una ventana de incógnito</li>
            </ul>

            <h4>Si no puedes acceder a Google Cloud Console:</h4>
            <ul>
                <li>Asegúrate de estar logueado con la cuenta correcta</li>
                <li>El proyecto debe existir: <code>${PROJECT_ID}</code></li>
            </ul>
        </div>
    </div>

    <script>
        // Auto-copiar email al portapapeles al cargar la página
        window.onload = function() {
            const email = '${TEST_USER_EMAIL}';
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    console.log('Email copiado al portapapeles:', email);
                });
            }
        };

        // Probar la conexión
        function testConnection() {
            const testBtn = document.getElementById('testBtn');
            const testResult = document.getElementById('testResult');

            testBtn.disabled = true;
            testResult.style.display = 'block';
            testResult.className = 'status warning';
            testResult.innerHTML = '🔄 Abriendo aplicación para probar...';

            // Abrir la aplicación para probar
            setTimeout(() => {
                window.open('http://localhost:5173/calendario', '_blank');

                testResult.className = 'status success';
                testResult.innerHTML = \`
                    <strong>✅ Ventana de prueba abierta!</strong><br>
                    <br>
                    <strong>En la nueva ventana:</strong><br>
                    1. Ve a la sección "Calendario" (si no estás ahí)<br>
                    2. Haz clic en "Conectar Google Calendar"<br>
                    3. Autoriza el acceso cuando se te solicite<br>
                    4. Si todo está bien, verás tus calendarios disponibles<br>
                    <br>
                    <strong>⚠️ Si ves "Acceso bloqueado":</strong><br>
                    - Vuelve al Paso 1 y asegúrate de haber agregado tu email como usuario de prueba
                \`;

                testBtn.disabled = false;
            }, 1000);
        }
    </script>
</body>
</html>`;

// Crear el archivo HTML
const htmlPath = path.join(__dirname, 'configure-oauth.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Archivo de configuración creado: configure-oauth.html');
console.log('📂 Ubicación:', htmlPath);
console.log('\n🌐 Abriendo configurador en el navegador...\n');

// Abrir el archivo en el navegador
const openCommand = process.platform === 'win32' ? 'start' :
                   process.platform === 'darwin' ? 'open' : 'xdg-open';

exec(`${openCommand} "${htmlPath}"`, (error) => {
    if (error) {
        console.error('❌ Error al abrir el navegador:', error);
        console.log('\n📝 Abre manualmente el archivo:', htmlPath);
    } else {
        console.log('✅ Configurador abierto en el navegador');
        console.log('\n📋 IMPORTANTE: Sigue estos pasos en orden:');
        console.log('   1. En la página que se abrió, haz clic en "Abrir Google Cloud Console"');
        console.log('   2. Agrega tu email como usuario de prueba: ' + TEST_USER_EMAIL);
        console.log('   3. Guarda los cambios');
        console.log('   4. Vuelve a la página y prueba la conexión');
    }
});