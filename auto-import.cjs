/**
 * Script automático para importar pacientes a SIMORAHealth
 * Inyecta el código directamente en el navegador usando Puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function autoImportPatients() {
  console.log('\n🚀 Importación Automática de Pacientes\n');

  try {
    // Leer los pacientes migrados
    const patientsFile = path.join(__dirname, 'pacientes_migrados.json');
    const patients = JSON.parse(fs.readFileSync(patientsFile, 'utf-8'));

    console.log(`📁 Pacientes a importar: ${patients.length}\n`);
    console.log('🌐 Abriendo navegador...\n');

    // Lanzar navegador
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized']
    });

    const page = await browser.newPage();

    // Ir a SIMORAHealth
    console.log('📡 Conectando a http://localhost:3001...\n');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });

    // Esperar un momento para que cargue
    await page.waitForTimeout(2000);

    console.log('💾 Inyectando pacientes al localStorage...\n');

    // Ejecutar el código de importación en el navegador
    await page.evaluate((patientsData) => {
      // Obtener pacientes actuales
      const currentPatients = JSON.parse(localStorage.getItem('rlp_patients') || '[]');
      console.log('Pacientes actuales:', currentPatients.length);

      // Agregar nuevos pacientes
      const allPatients = [...currentPatients, ...patientsData];
      console.log('Nuevos pacientes:', patientsData.length);
      console.log('Total:', allPatients.length);

      // Guardar
      localStorage.setItem('rlp_patients', JSON.stringify(allPatients));

      return allPatients.length;
    }, patients);

    console.log('✅ Pacientes importados exitosamente!\n');
    console.log('🔄 Recargando página...\n');

    // Recargar la página
    await page.reload({ waitUntil: 'networkidle0' });

    await page.waitForTimeout(3000);

    console.log('🎉 ¡IMPORTACIÓN COMPLETADA!\n');
    console.log('👉 Ve a la sección "Registro" para ver tus pacientes\n');
    console.log('El navegador quedará abierto para que verifiques.\n');

    // NO cerrar el navegador para que el usuario vea el resultado
    // await browser.close();

  } catch (error) {
    console.error('❌ Error durante la importación:', error.message);
    console.error('\nIntenta importar manualmente siguiendo las instrucciones anteriores.\n');
    process.exit(1);
  }
}

autoImportPatients();
