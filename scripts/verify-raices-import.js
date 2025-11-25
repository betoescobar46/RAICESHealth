import admin from 'firebase-admin';

console.log('🔧 Inicializando Firebase Admin...');
admin.initializeApp({
  projectId: 'simorahealth'
});

const db = admin.firestore();

async function verifyImport() {
  console.log('\n🔍 Verificando importación en patients_raices...\n');

  try {
    const snapshot = await db.collection('patients_raices').get();

    console.log(`📊 Total documentos: ${snapshot.size}`);

    if (snapshot.size === 0) {
      console.log('❌ No se encontraron documentos en patients_raices');
      process.exit(1);
    }

    // Análisis de los datos
    let activos = 0;
    let conRUT = 0;
    let conDiagnostico = 0;
    const sexos = {};
    const situaciones = {};

    snapshot.forEach(doc => {
      const data = doc.data();

      if (data.activo) activos++;
      if (data.rut) conRUT++;
      if (data.diagnosticoPrincipal) conDiagnostico++;

      sexos[data.sexo] = (sexos[data.sexo] || 0) + 1;
      if (data.situacion) {
        situaciones[data.situacion] = (situaciones[data.situacion] || 0) + 1;
      }
    });

    console.log('\n📈 Estadísticas:');
    console.log(`   Activos: ${activos}`);
    console.log(`   Inactivos: ${snapshot.size - activos}`);
    console.log(`   Con RUT: ${conRUT}`);
    console.log(`   Con diagnóstico: ${conDiagnostico}`);

    console.log('\n👥 Distribución por sexo:');
    Object.entries(sexos).forEach(([sexo, count]) => {
      console.log(`   ${sexo}: ${count}`);
    });

    console.log('\n📋 Situaciones:');
    Object.entries(situaciones)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([situacion, count]) => {
        console.log(`   ${situacion}: ${count}`);
      });

    // Mostrar primeros 5 pacientes
    console.log('\n📋 Primeros 5 pacientes:');
    snapshot.docs.slice(0, 5).forEach((doc, idx) => {
      const p = doc.data();
      console.log(`\n   ${idx + 1}. Ficha ${p.ficha}: ${p.nombre} ${p.apellidoPaterno}`);
      console.log(`      RUT: ${p.rut}`);
      console.log(`      Activo: ${p.activo ? 'Sí' : 'No'}`);
      console.log(`      Diagnóstico: ${p.diagnosticoPrincipal || 'Sin diagnóstico'}`);
    });

    console.log('\n✅ Verificación completada exitosamente!\n');

  } catch (error) {
    console.error('❌ Error al verificar:', error);
    process.exit(1);
  }
}

verifyImport()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
