import admin from 'firebase-admin';

console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function checkDateFormat() {
  console.log('\n🔍 Verificando formato de fechas en patients_raices...\n');

  try {
    const snapshot = await db.collection('patients_raices').limit(10).get();

    console.log(`📋 Mostrando primeros ${snapshot.size} pacientes:\n`);

    snapshot.forEach((doc, idx) => {
      const p = doc.data();
      console.log(`${idx + 1}. Ficha ${p.ficha}: ${p.nombre} ${p.apellidoPaterno}`);
      console.log(`   Fecha Nacimiento: ${p.fechaNacimiento || 'Sin fecha'}`);
      console.log(`   Fecha Ingreso: ${p.fechaIngreso || 'Sin fecha'}`);
      console.log(`   Fecha Alta: ${p.fechaAlta || 'Sin fecha'}`);
      console.log(`   Edad: ${p.edad || 'N/A'} años`);
      console.log('');
    });

    console.log('✅ Verificación completada!\n');

  } catch (error) {
    console.error('❌ Error al verificar:', error);
    process.exit(1);
  }
}

checkDateFormat()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
