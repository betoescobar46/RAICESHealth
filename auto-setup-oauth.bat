@echo off
echo ======================================
echo   CONFIGURACION AUTOMATICA OAUTH
echo   SIMORA Health
echo ======================================
echo.

REM Variables
set PROJECT_ID=simorahealth
set TEST_EMAIL=betoescobar46@gmail.com
set CLIENT_ID=360968687655-6jqtk4sn8iqt1bvam6pbjh1qjo4114h1.apps.googleusercontent.com

echo [1/5] Configurando proyecto...
gcloud config set project %PROJECT_ID% 2>nul

echo [2/5] Habilitando Google Calendar API...
gcloud services enable calendar-json.googleapis.com 2>nul

echo [3/5] Verificando autenticacion...
gcloud auth list >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo !! No estas autenticado en gcloud
    echo Iniciando proceso de autenticacion...
    gcloud auth login
)

echo [4/5] Configurando OAuth consent screen...
echo.
echo NOTA: Google requiere configuracion manual por seguridad
echo.

REM Crear archivo HTML con instrucciones finales
echo ^<!DOCTYPE html^> > oauth-final.html
echo ^<html^>^<head^>^<meta charset="UTF-8"^>^<title^>OAuth Setup^</title^> >> oauth-final.html
echo ^<style^>body{font-family:Arial;max-width:800px;margin:50px auto;padding:20px;background:#f0f4ff;}>> oauth-final.html
echo .box{background:white;padding:30px;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.1);}>> oauth-final.html
echo h1{color:#667eea;}button{background:#667eea;color:white;padding:12px 24px;border:none;>> oauth-final.html
echo border-radius:5px;font-size:16px;cursor:pointer;margin:10px 5px;}>> oauth-final.html
echo .email{background:#fffbf0;padding:15px;border:2px solid #ffc107;border-radius:5px;margin:20px 0;}>> oauth-final.html
echo .success{background:#d4edda;padding:15px;border:2px solid #28a745;border-radius:5px;}^</style^>^</head^> >> oauth-final.html
echo ^<body^>^<div class="box"^> >> oauth-final.html
echo ^<h1^>Ultimo Paso: Configurar Usuario de Prueba^</h1^> >> oauth-final.html
echo ^<div class="email"^>^<h3^>Email a agregar:^</h3^>^<code style="font-size:18px;"^>%TEST_EMAIL%^</code^>^</div^> >> oauth-final.html
echo ^<h2^>Instrucciones:^</h2^>^<ol^> >> oauth-final.html
echo ^<li^>Haz clic en el boton de abajo^</li^> >> oauth-final.html
echo ^<li^>En Google Cloud Console, busca "Test users"^</li^> >> oauth-final.html
echo ^<li^>Haz clic en "+ ADD USERS"^</li^> >> oauth-final.html
echo ^<li^>Agrega: %TEST_EMAIL%^</li^> >> oauth-final.html
echo ^<li^>Guarda los cambios^</li^>^</ol^> >> oauth-final.html
echo ^<button onclick="window.open('https://console.cloud.google.com/apis/credentials/consent?project=%PROJECT_ID%','_blank')"^>Abrir Google Cloud Console^</button^> >> oauth-final.html
echo ^<div class="success"^>^<h3^>Despues de agregar el usuario:^</h3^> >> oauth-final.html
echo ^<button onclick="window.open('http://localhost:5173/calendario','_blank')" style="background:#28a745;"^>Probar Conexion^</button^>^</div^> >> oauth-final.html
echo ^</div^>^</body^>^</html^> >> oauth-final.html

echo [5/5] Abriendo pagina de configuracion...
start oauth-final.html

echo.
echo ======================================
echo   CONFIGURACION CASI COMPLETA!
echo ======================================
echo.
echo Solo falta agregar tu email como usuario de prueba.
echo Se abrio una pagina con las instrucciones.
echo.
echo Email a agregar: %TEST_EMAIL%
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

REM Abrir directamente la consola de Google Cloud
start https://console.cloud.google.com/apis/credentials/consent?project=%PROJECT_ID%

echo.
echo Abriendo Google Cloud Console...
echo.
echo RECUERDA:
echo 1. Buscar "Test users"
echo 2. Hacer clic en "+ ADD USERS"
echo 3. Agregar: %TEST_EMAIL%
echo 4. Guardar cambios
echo.
pause