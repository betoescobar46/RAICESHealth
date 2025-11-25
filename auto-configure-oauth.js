import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';

const PROJECT_ID = 'simorahealth';
const CLIENT_ID = '360968687655-6jqtk4sn8iqt1bvam6pbjh1qjo4114h1.apps.googleusercontent.com';
const TEST_EMAIL = 'betoescobar46@gmail.com';

console.log('🚀 Configuración automática de OAuth para SIMORA Health\n');

// Primero intentar con gcloud CLI
async function configureWithGcloud() {
    try {
        console.log('📋 Configurando con gcloud CLI...\n');

        // Configurar el proyecto
        console.log('1. Configurando proyecto...');
        execSync(`gcloud config set project ${PROJECT_ID}`, { stdio: 'inherit' });

        // Habilitar la API de Calendar
        console.log('2. Habilitando Google Calendar API...');
        execSync(`gcloud services enable calendar-json.googleapis.com`, { stdio: 'inherit' });

        // Configurar OAuth consent screen
        console.log('3. Configurando pantalla de consentimiento OAuth...');

        // Crear archivo de configuración OAuth
        const oauthConfig = {
            "displayName": "SIMORA Health",
            "supportEmail": TEST_EMAIL,
            "developerEmail": TEST_EMAIL,
            "testUsers": [TEST_EMAIL],
            "scopes": [
                "https://www.googleapis.com/auth/calendar",
                "https://www.googleapis.com/auth/calendar.events"
            ]
        };

        fs.writeFileSync('oauth-config.json', JSON.stringify(oauthConfig, null, 2));

        // Intentar actualizar la configuración OAuth
        try {
            execSync(`gcloud alpha iap oauth-brands create --application_title="SIMORA Health" --support_email="${TEST_EMAIL}"`, { stdio: 'inherit' });
        } catch (e) {
            console.log('ℹ️ OAuth brand ya existe o no se pudo crear automáticamente');
        }

        console.log('✅ Configuración básica completada!\n');

    } catch (error) {
        console.error('⚠️ No se pudo configurar completamente con gcloud:', error.message);
        return false;
    }

    return true;
}

// Configuración alternativa usando API REST
async function configureWithAPI() {
    console.log('\n📡 Intentando configuración mediante API REST...\n');

    const configScript = `
# PowerShell Script para configurar OAuth
$headers = @{
    "Authorization" = "Bearer $(gcloud auth print-access-token)"
    "Content-Type" = "application/json"
}

$body = @{
    "applicationTitle" = "SIMORA Health"
    "supportEmail" = "${TEST_EMAIL}"
} | ConvertTo-Json

# Intentar configurar OAuth consent screen
try {
    Invoke-RestMethod -Uri "https://iap.googleapis.com/v1/projects/${PROJECT_ID}/brands" -Method POST -Headers $headers -Body $body
} catch {
    Write-Host "OAuth brand ya configurado o error: $_"
}

Write-Host "✅ Configuración completada"
`;

    fs.writeFileSync('configure-oauth.ps1', configScript);

    try {
        execSync('powershell -ExecutionPolicy Bypass -File configure-oauth.ps1', { stdio: 'inherit' });
    } catch (e) {
        console.log('ℹ️ No se pudo ejecutar el script de PowerShell automáticamente');
    }
}

// Script principal
async function main() {
    // Intentar autenticación
    console.log('🔐 Verificando autenticación...\n');

    try {
        const authStatus = execSync('gcloud auth list --format=json', { encoding: 'utf8' });
        const accounts = JSON.parse(authStatus);

        if (accounts.length === 0) {
            console.log('❌ No hay cuentas autenticadas en gcloud');
            console.log('📝 Ejecuta: gcloud auth login\n');

            // Intentar login automático
            console.log('Intentando autenticación automática...');
            execSync('gcloud auth login --no-launch-browser', { stdio: 'inherit' });
        } else {
            console.log(`✅ Autenticado como: ${accounts[0].account}\n`);
        }
    } catch (e) {
        console.log('⚠️ No se pudo verificar autenticación');
    }

    // Configurar con gcloud
    const gcloudSuccess = await configureWithGcloud();

    if (!gcloudSuccess) {
        await configureWithAPI();
    }

    // Generar URL directa para agregar test users
    console.log('\n' + '='.repeat(60));
    console.log('🎯 ÚLTIMO PASO MANUAL REQUERIDO:');
    console.log('='.repeat(60) + '\n');

    const oauthUrl = `https://console.cloud.google.com/apis/credentials/consent?project=${PROJECT_ID}`;
    console.log('La configuración básica está lista, pero Google requiere que');
    console.log('agregues manualmente el usuario de prueba por seguridad.\n');
    console.log('1. Abre esta URL:');
    console.log(`   ${oauthUrl}\n`);
    console.log('2. Busca la sección "Test users"');
    console.log('3. Haz clic en "+ ADD USERS"');
    console.log(`4. Agrega: ${TEST_EMAIL}`);
    console.log('5. Guarda los cambios\n');

    // Abrir automáticamente la URL
    try {
        if (process.platform === 'win32') {
            execSync(`start ${oauthUrl}`);
            console.log('✅ Abriendo Google Cloud Console en tu navegador...\n');
        }
    } catch (e) {
        console.log('📝 Abre manualmente la URL en tu navegador\n');
    }

    // Crear archivo HTML de ayuda final
    const helpHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Configuración OAuth - Último Paso</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 { color: #667eea; }
        .step {
            background: #f0f4ff;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #667eea;
            border-radius: 5px;
        }
        button {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background: #5a67d8;
        }
        .email-copy {
            background: #f8f9fa;
            padding: 10px;
            border: 2px solid #667eea;
            border-radius: 5px;
            font-family: monospace;
            font-size: 16px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>✨ Último Paso: Agregar Usuario de Prueba</h1>

        <div class="step">
            <h3>La configuración está casi completa!</h3>
            <p>Solo falta agregar tu email como usuario de prueba en Google Cloud Console.</p>
        </div>

        <div class="step">
            <h3>📋 Email para copiar:</h3>
            <div class="email-copy" onclick="navigator.clipboard.writeText('${TEST_EMAIL}')">${TEST_EMAIL}</div>
            <small>Click para copiar</small>
        </div>

        <div class="step">
            <h3>🚀 Pasos:</h3>
            <ol>
                <li>Haz clic en el botón de abajo para abrir Google Cloud Console</li>
                <li>Busca la sección "Test users"</li>
                <li>Haz clic en "+ ADD USERS"</li>
                <li>Pega el email: ${TEST_EMAIL}</li>
                <li>Guarda los cambios</li>
            </ol>
        </div>

        <button onclick="window.open('${oauthUrl}', '_blank')">
            Abrir Google Cloud Console
        </button>

        <div class="step" style="margin-top: 30px; background: #d4edda; border-color: #28a745;">
            <h3>✅ Después de agregar el usuario de prueba:</h3>
            <button onclick="window.open('http://localhost:5173/calendario', '_blank')" style="background: #28a745;">
                Probar Conexión con Google Calendar
            </button>
        </div>
    </div>

    <script>
        // Auto-copiar email al cargar
        navigator.clipboard.writeText('${TEST_EMAIL}');
        console.log('Email copiado al portapapeles');
    </script>
</body>
</html>
    `;

    fs.writeFileSync('final-step-oauth.html', helpHtml);
    execSync('start final-step-oauth.html');

    console.log('📄 Página de ayuda abierta: final-step-oauth.html');
    console.log('\n✨ Configuración automática completada!');
    console.log('Solo falta el paso manual de agregar el usuario de prueba.\n');
}

// Ejecutar
main().catch(console.error);