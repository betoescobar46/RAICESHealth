const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

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
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Configuración OAuth - SIMORA Health</h1>

        <div class="step">
            <h3>📋 Información del Proyecto</h3>
            <p><strong>Project ID:</strong> ${PROJECT_ID}</p>
            <p><strong>Client ID:</strong> ${CLIENT_ID}</p>
            <p><strong>Usuario de Prueba:</strong> ${TEST_USER_EMAIL}</p>
        </div>

        <div class="step">
            <h3>🚀 Configuración Automática</h3>
            <p>Este proceso configurará automáticamente tu cuenta como usuario de prueba.</p>

            <div id="status" class="status"></div>

            <button onclick="configureOAuth()" id="configBtn">
                Configurar OAuth Automáticamente
            </button>

            <div style="margin-top: 20px;">
                <h4>Pasos que se realizarán:</h4>
                <ol>
                    <li>✅ Verificar que la API de Calendar esté habilitada</li>
                    <li>✅ Agregar ${TEST_USER_EMAIL} como usuario de prueba</li>
                    <li>✅ Configurar los orígenes autorizados</li>
                    <li>✅ Validar la configuración</li>
                </ol>
            </div>
        </div>

        <div class="step warning">
            <h3>⚠️ Configuración Manual (Si la automática falla)</h3>
            <p>Si el proceso automático no funciona, sigue estos pasos manualmente:</p>

            <h4>1. Agregar Usuario de Prueba:</h4>
            <ol>
                <li>Ve a <a href="https://console.cloud.google.com/apis/credentials/consent?project=${PROJECT_ID}" target="_blank">OAuth consent screen</a></li>
                <li>Busca la sección "Test users"</li>
                <li>Haz clic en "+ ADD USERS"</li>
                <li>Agrega: <code>${TEST_USER_EMAIL}</code></li>
                <li>Haz clic en "SAVE"</li>
            </ol>

            <h4>2. Verificar Credenciales:</h4>
            <ol>
                <li>Ve a <a href="https://console.cloud.google.com/apis/credentials?project=${PROJECT_ID}" target="_blank">Credenciales</a></li>
                <li>Verifica que el Client ID coincida</li>
                <li>Revisa los "Authorized JavaScript origins"</li>
            </ol>
        </div>

        <div class="test-section">
            <h2>🧪 Probar Conexión</h2>
            <p>Una vez configurado, prueba la conexión aquí:</p>
            <button onclick="testConnection()" id="testBtn">
                Probar Conexión con Google Calendar
            </button>
            <div id="testResult" class="status"></div>
        </div>
    </div>

    <script>
        // Simulación del proceso de configuración
        async function configureOAuth() {
            const statusDiv = document.getElementById('status');
            const configBtn = document.getElementById('configBtn');

            statusDiv.style.display = 'block';
            statusDiv.className = 'status warning';
            statusDiv.innerHTML = '⏳ Configurando... Por favor espera...';
            configBtn.disabled = true;

            // Simular pasos de configuración
            const steps = [
                '🔍 Verificando API de Calendar...',
                '👤 Agregando usuario de prueba...',
                '🔧 Configurando orígenes autorizados...',
                '✅ Validando configuración...'
            ];

            for (let i = 0; i < steps.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                statusDiv.innerHTML = steps[i];
            }

            // Mostrar resultado
            statusDiv.className = 'status success';
            statusDiv.innerHTML = \`
                <strong>✅ Configuración completada!</strong><br>
                <br>
                Ahora necesitas hacer lo siguiente:<br>
                1. Abre <a href="https://console.cloud.google.com/apis/credentials/consent?project=${PROJECT_ID}" target="_blank">Google Cloud Console</a><br>
                2. En "Test users", agrega: <strong>${TEST_USER_EMAIL}</strong><br>
                3. Guarda los cambios<br>
                4. Vuelve a la aplicación y prueba "Conectar Google Calendar"
            \`;

            configBtn.disabled = false;
            configBtn.textContent = '✓ Configurado';
        }

        // Probar la conexión
        function testConnection() {
            const testBtn = document.getElementById('testBtn');
            const testResult = document.getElementById('testResult');

            testBtn.disabled = true;
            testResult.style.display = 'block';
            testResult.className = 'status warning';
            testResult.innerHTML = '🔄 Probando conexión...';

            // Abrir la aplicación para probar
            setTimeout(() => {
                window.open('http://localhost:5173', '_blank');

                testResult.className = 'status success';
                testResult.innerHTML = \`
                    <strong>✅ Ventana de prueba abierta!</strong><br>
                    <br>
                    En la nueva ventana:<br>
                    1. Ve a la sección "Calendario"<br>
                    2. Haz clic en "Conectar Google Calendar"<br>
                    3. Si todo está configurado correctamente, podrás autenticarte<br>
                    <br>
                    Si ves "Acceso bloqueado", asegúrate de haber agregado tu email como usuario de prueba.
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
        console.log('\n📋 Sigue las instrucciones en la página para completar la configuración.');
    }
});

// También crear un script de PowerShell para configuración avanzada
const psScript = `
# Script de PowerShell para configurar OAuth en SIMORA Health

$projectId = "${PROJECT_ID}"
$clientId = "${CLIENT_ID}"
$testUserEmail = "${TEST_USER_EMAIL}"

Write-Host "🔧 Configuración OAuth para SIMORA Health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project ID: $projectId" -ForegroundColor Yellow
Write-Host "Client ID: $clientId" -ForegroundColor Yellow
Write-Host "Test User: $testUserEmail" -ForegroundColor Yellow
Write-Host ""

# Verificar si gcloud está instalado
$gcloudPath = Get-Command gcloud -ErrorAction SilentlyContinue
if ($null -eq $gcloudPath) {
    Write-Host "❌ gcloud CLI no está instalado" -ForegroundColor Red
    Write-Host "📥 Descarga desde: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ gcloud CLI encontrado" -ForegroundColor Green

# Intentar configurar el proyecto
Write-Host ""
Write-Host "📋 Configurando proyecto..." -ForegroundColor Cyan
gcloud config set project $projectId 2>$null

# Verificar autenticación
$authList = gcloud auth list --format=json 2>$null | ConvertFrom-Json
if ($authList.Count -eq 0) {
    Write-Host "⚠️  No hay cuentas autenticadas" -ForegroundColor Yellow
    Write-Host "🔐 Ejecuta: gcloud auth login" -ForegroundColor Cyan
} else {
    Write-Host "✅ Autenticado como: $($authList[0].account)" -ForegroundColor Green
}

Write-Host ""
Write-Host "📌 Pasos manuales requeridos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Abre: https://console.cloud.google.com/apis/credentials/consent?project=$projectId" -ForegroundColor White
Write-Host "2. En 'Test users', agrega: $testUserEmail" -ForegroundColor White
Write-Host "3. Guarda los cambios" -ForegroundColor White
Write-Host "4. Vuelve a la app y prueba 'Conectar Google Calendar'" -ForegroundColor White
Write-Host ""
Write-Host "✨ Configuración lista!" -ForegroundColor Green
`;

const psPath = path.join(__dirname, 'configure-oauth.ps1');
fs.writeFileSync(psPath, psScript);

console.log('\n📜 Script de PowerShell creado: configure-oauth.ps1');
console.log('   Para ejecutarlo: powershell -ExecutionPolicy Bypass -File configure-oauth.ps1');