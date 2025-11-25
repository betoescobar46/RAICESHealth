# PowerShell Script - Configuración Completa OAuth SIMORA Health
$ErrorActionPreference = "SilentlyContinue"

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "  CONFIGURACION AUTOMATICA OAUTH" -ForegroundColor Yellow
Write-Host "  SIMORA Health" -ForegroundColor Yellow
Write-Host "=====================================`n" -ForegroundColor Cyan

$projectId = "simorahealth"
$testEmail = "betoescobar46@gmail.com"
$clientId = "360968687655-6jqtk4sn8iqt1bvam6pbjh1qjo4114h1.apps.googleusercontent.com"

Write-Host "[1/4] Verificando gcloud CLI..." -ForegroundColor Green
$gcloudPath = Get-Command gcloud -ErrorAction SilentlyContinue
if ($null -eq $gcloudPath) {
    Write-Host "X gcloud CLI no esta instalado" -ForegroundColor Red
    Write-Host "Descargalo desde: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow

    # Intentar abrir la página de descarga
    Start-Process "https://cloud.google.com/sdk/docs/install"
    exit 1
} else {
    Write-Host "OK - gcloud CLI encontrado" -ForegroundColor Green
}

Write-Host "`n[2/4] Configurando proyecto..." -ForegroundColor Green
gcloud config set project $projectId 2>$null

Write-Host "`n[3/4] Habilitando APIs necesarias..." -ForegroundColor Green
Write-Host "- Google Calendar API" -ForegroundColor Gray
gcloud services enable calendar-json.googleapis.com 2>$null

Write-Host "`n[4/4] Generando configuracion final..." -ForegroundColor Green

# Crear HTML mejorado con toda la información
$htmlContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración OAuth - SIMORA Health</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 900px;
            width: 100%;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            color: white;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px;
        }
        .alert {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
        }
        .alert h3 {
            color: #856404;
            margin-bottom: 10px;
        }
        .step-container {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 30px;
        }
        .step {
            display: flex;
            align-items: start;
            margin-bottom: 20px;
        }
        .step-number {
            background: #667eea;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .step-content {
            flex: 1;
        }
        .email-box {
            background: white;
            border: 2px solid #667eea;
            padding: 15px 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 18px;
            color: #667eea;
            text-align: center;
            margin: 20px 0;
            cursor: pointer;
            transition: all 0.3s;
        }
        .email-box:hover {
            background: #f0f4ff;
            transform: scale(1.02);
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            color: white;
            margin: 10px 10px 10px 0;
        }
        .btn-primary {
            background: #667eea;
        }
        .btn-primary:hover {
            background: #5a67d8;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        .btn-success {
            background: #28a745;
        }
        .btn-success:hover {
            background: #218838;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4);
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .info-card {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
        }
        .info-card h4 {
            color: #667eea;
            margin-bottom: 10px;
        }
        .info-card p {
            color: #6c757d;
            font-size: 14px;
            word-break: break-all;
        }
        .success-section {
            background: #d4edda;
            border: 2px solid #28a745;
            border-radius: 10px;
            padding: 30px;
            margin-top: 30px;
            text-align: center;
        }
        .success-section h3 {
            color: #155724;
            margin-bottom: 20px;
        }
        .copy-hint {
            font-size: 12px;
            color: #6c757d;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Configuración OAuth</h1>
            <p>SIMORA Health - Google Calendar Integration</p>
        </div>

        <div class="content">
            <div class="alert">
                <h3>⚠️ Acción Manual Requerida</h3>
                <p>Por seguridad, Google requiere que agregues manualmente los usuarios de prueba. Este es el único paso que no se puede automatizar.</p>
            </div>

            <div class="info-grid">
                <div class="info-card">
                    <h4>📁 Proyecto</h4>
                    <p>$projectId</p>
                </div>
                <div class="info-card">
                    <h4>🔑 Client ID</h4>
                    <p style="font-size: 12px;">$clientId</p>
                </div>
                <div class="info-card">
                    <h4>📧 Email a agregar</h4>
                    <p>$testEmail</p>
                </div>
            </div>

            <div class="step-container">
                <h2 style="margin-bottom: 25px; color: #333;">Pasos para completar la configuración:</h2>

                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <strong>Abre Google Cloud Console</strong><br>
                        <button class="btn btn-primary" onclick="openConsole()">
                            Abrir Google Cloud Console
                        </button>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <strong>En la página que se abre, busca la sección "Test users"</strong><br>
                        <small style="color: #6c757d;">Puede que necesites hacer scroll hacia abajo o buscar en el menú lateral</small>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <strong>Haz clic en el botón "+ ADD USERS"</strong>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <strong>Copia y pega este email:</strong>
                        <div class="email-box" onclick="copyEmail()">
                            $testEmail
                        </div>
                        <div class="copy-hint">Click para copiar al portapapeles</div>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <strong>Haz clic en "ADD" y luego en "SAVE"</strong>
                    </div>
                </div>
            </div>

            <div class="success-section">
                <h3>✅ Después de agregar el usuario de prueba:</h3>
                <p style="margin-bottom: 20px;">Tu aplicación estará lista para usar</p>
                <button class="btn btn-success" onclick="testConnection()">
                    Probar Conexión con Google Calendar
                </button>
            </div>
        </div>
    </div>

    <script>
        // Auto-copiar email al portapapeles al cargar la página
        window.onload = function() {
            navigator.clipboard.writeText('$testEmail').then(function() {
                console.log('Email copiado al portapapeles automáticamente');
            });
        };

        function copyEmail() {
            navigator.clipboard.writeText('$testEmail').then(function() {
                const box = document.querySelector('.email-box');
                const originalText = box.innerText;
                box.innerText = '✅ Copiado!';
                box.style.background = '#d4edda';
                box.style.borderColor = '#28a745';
                box.style.color = '#155724';

                setTimeout(() => {
                    box.innerText = originalText;
                    box.style.background = 'white';
                    box.style.borderColor = '#667eea';
                    box.style.color = '#667eea';
                }, 2000);
            });
        }

        function openConsole() {
            window.open('https://console.cloud.google.com/apis/credentials/consent?project=$projectId', '_blank');
        }

        function testConnection() {
            window.open('http://localhost:5173/calendario', '_blank');
        }
    </script>
</body>
</html>
"@

$htmlPath = Join-Path $PSScriptRoot "oauth-setup-final.html"
$htmlContent | Out-File -FilePath $htmlPath -Encoding UTF8

Write-Host "`n=====================================" -ForegroundColor Green
Write-Host " CONFIGURACION LISTA!" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Green

Write-Host "`nSe abrio una pagina con instrucciones detalladas." -ForegroundColor Cyan
Write-Host "Solo necesitas agregar tu email como usuario de prueba." -ForegroundColor Cyan

Write-Host "`nEmail a agregar: " -NoNewline
Write-Host $testEmail -ForegroundColor Yellow

# Abrir la página HTML
Start-Process $htmlPath

# También intentar abrir directamente Google Cloud Console
Start-Sleep -Seconds 2
Start-Process "https://console.cloud.google.com/apis/credentials/consent?project=$projectId"

Write-Host "`nPresiona Enter para salir..." -ForegroundColor Gray
Read-Host