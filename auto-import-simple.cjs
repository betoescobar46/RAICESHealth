/**
 * Script simple de auto-importación
 * Genera una página HTML que se auto-ejecuta
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('\n🚀 Preparando importación automática...\n');

// Leer los pacientes
const patientsFile = path.join(__dirname, 'pacientes_migrados.json');
const patients = JSON.parse(fs.readFileSync(patientsFile, 'utf-8'));

console.log(`📁 Pacientes a importar: ${patients.length}\n`);

// Crear página HTML auto-ejecutable
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Importando Pacientes...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
        }
        h1 { color: #333; margin-bottom: 20px; }
        .status { font-size: 18px; color: #666; margin: 20px 0; }
        .success { color: #4caf50; font-weight: bold; }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
            text-decoration: none;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Importando Pacientes</h1>
        <div class="spinner" id="spinner"></div>
        <div class="status" id="status">Importando ${patients.length} pacientes...</div>
        <div id="result"></div>
    </div>

    <script>
        // Función para importar pacientes
        function importPatients() {
            const newPatients = ${JSON.stringify(patients)};

            try {
                // Obtener pacientes actuales
                const currentPatients = JSON.parse(localStorage.getItem('rlp_patients') || '[]');

                document.getElementById('status').textContent =
                    'Pacientes actuales: ' + currentPatients.length;

                // Combinar
                const allPatients = [...currentPatients, ...newPatients];

                // Guardar
                localStorage.setItem('rlp_patients', JSON.stringify(allPatients));

                // Éxito
                document.getElementById('spinner').style.display = 'none';
                document.getElementById('status').innerHTML =
                    '<div class="success">✅ ¡Importación Completada!</div>' +
                    '<div>Pacientes importados: ' + newPatients.length + '</div>' +
                    '<div>Total en sistema: ' + allPatients.length + '</div>';

                document.getElementById('result').innerHTML =
                    '<a href="http://localhost:3001" class="button">Ir a SIMORAHealth</a>';

                // Redirigir automáticamente en 3 segundos
                setTimeout(() => {
                    window.location.href = 'http://localhost:3001';
                }, 3000);

            } catch (error) {
                document.getElementById('spinner').style.display = 'none';
                document.getElementById('status').innerHTML =
                    '<div style="color: red;">❌ Error: ' + error.message + '</div>' +
                    '<div style="font-size: 14px; margin-top: 10px;">Intenta importar manualmente</div>';
            }
        }

        // Ejecutar al cargar
        setTimeout(importPatients, 1000);
    </script>
</body>
</html>`;

// Guardar HTML
const htmlFile = path.join(__dirname, 'auto-import.html');
fs.writeFileSync(htmlFile, htmlContent, 'utf-8');

console.log('✅ Página de importación creada\n');
console.log('🌐 Abriendo en el navegador...\n');

// Abrir en el navegador
const command = process.platform === 'win32'
    ? `start "" "${htmlFile}"`
    : process.platform === 'darwin'
    ? `open "${htmlFile}"`
    : `xdg-open "${htmlFile}"`;

exec(command, (error) => {
    if (error) {
        console.error('❌ Error al abrir navegador:', error.message);
        console.log(`\n💡 Abre manualmente: ${htmlFile}\n`);
    } else {
        console.log('📋 INSTRUCCIONES:\n');
        console.log('1. Se abrió una página en tu navegador');
        console.log('2. La importación se ejecutará automáticamente');
        console.log('3. Serás redirigido a SIMORAHealth en 3 segundos');
        console.log('4. Ve a "Registro" para ver tus 245 pacientes\n');
    }
});
