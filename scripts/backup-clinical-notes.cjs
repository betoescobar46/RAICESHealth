/**
 * Script de Backup de Notas Clínicas
 *
 * Crea una copia de seguridad completa de todas las notas clínicas
 * antes de realizar modificaciones.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function backupClinicalNotes() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '..', 'backups');
  const backupFile = path.join(backupDir, `clinical-notes-backup-${timestamp}.json`);

  console.log('\n📦 CREANDO BACKUP DE NOTAS CLÍNICAS\n');
  console.log('═'.repeat(80));

  try {
    // Crear directorio de backups si no existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('✅ Creado directorio de backups\n');
    }

    // Obtener todas las notas
    console.log('📥 Descargando todas las notas clínicas de Firestore...');
    const snapshot = await db.collection('clinicalNotes').get();

    console.log(`   Total de notas: ${snapshot.size}\n`);

    // Convertir a array de objetos
    const notas = [];
    snapshot.forEach(doc => {
      notas.push({
        id: doc.id,
        ...doc.data(),
        // Convertir Timestamps a strings para JSON
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      });
    });

    // Crear metadata del backup
    const backup = {
      metadata: {
        timestamp: new Date().toISOString(),
        totalNotas: notas.length,
        firebaseProject: 'simorahealth',
        collection: 'clinicalNotes',
        version: '1.0'
      },
      notas: notas
    };

    // Guardar a archivo
    console.log('💾 Guardando backup...');
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), 'utf8');

    const fileSizeMB = (fs.statSync(backupFile).size / (1024 * 1024)).toFixed(2);

    console.log('\n✅ BACKUP COMPLETADO\n');
    console.log('═'.repeat(80));
    console.log(`\n📄 Archivo: ${backupFile}`);
    console.log(`📊 Tamaño: ${fileSizeMB} MB`);
    console.log(`📝 Notas respaldadas: ${notas.length}`);
    console.log('\n═'.repeat(80));

    // Mostrar estadísticas
    const tipoStats = {};
    notas.forEach(nota => {
      const tipo = nota.tipo || 'SIN_TIPO';
      tipoStats[tipo] = (tipoStats[tipo] || 0) + 1;
    });

    console.log('\n📊 Estadísticas por tipo:');
    Object.entries(tipoStats).forEach(([tipo, count]) => {
      console.log(`   ${tipo}: ${count}`);
    });

    console.log('\n');

  } catch (error) {
    console.error('\n❌ Error al crear backup:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar
backupClinicalNotes();
