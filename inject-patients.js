// Script para inyectar pacientes directamente en la consola del navegador
// INSTRUCCIONES:
// 1. Abre http://localhost:3000 en Chrome
// 2. Presiona F12 para abrir DevTools
// 3. Ve a la pestaña Console
// 4. Copia y pega TODO este código
// 5. Presiona Enter
// 6. Recarga la página con F5

(async function() {
    console.log('🚀 Iniciando inyección de pacientes...');

    try {
        // Fetch the JSON file
        const response = await fetch('/data-migration/pacientes_completos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de pacientes');
        }

        const importedPatients = await response.json();
        console.log(`📊 Se encontraron ${importedPatients.length} pacientes para importar`);

        // Transform patients to the expected format
        const patients = importedPatients.map(p => ({
            firestoreId: p.id,
            ficha: parseInt(p.numeroFicha) || Math.floor(Math.random() * 100000),
            nombre: p.nombre,
            rut: '',
            edad: 0,
            sexo: 'Masculino',
            identidadGenero: '',
            fechaNacimiento: '2000-01-01',
            direccion: '',
            comuna: '',
            lat: -35.4264,
            lon: -71.6554,
            telefonos: [],
            email: '',
            tutor: 'No aplica',
            ocupacion: '',
            dispositivoAPS: '',
            alergias: '',
            ram: '',
            objetivosTerapeuticos: '',
            diagnostico: {
                saludMental: '',
                morbilidadMedica: '',
                factoresPsicosociales: ''
            },
            farmacos: [],
            pensionDiscapacidad: false,
            credencialDiscapacidad: false,
            consumoActivoDrogas: false,
            contenidoOriginal: p.contenidoCompleto,
            tags: p.tags || [],
            fechaCreacion: p.fechaCreacion,
            fechaActualizacion: p.fechaActualizacion,
            origen: p.origen
        }));

        // Clear existing patients and save new ones
        localStorage.removeItem('patients');
        localStorage.setItem('patients', JSON.stringify(patients));

        console.log('✅ Pacientes importados exitosamente');
        console.log(`📝 Total: ${patients.length} pacientes`);
        console.log('🔄 Recarga la página con F5 para ver los cambios');

        // Show success message
        alert(`✅ Se importaron ${patients.length} pacientes correctamente.\n\nRecarga la página con F5 para ver los cambios.`);

    } catch (error) {
        console.error('❌ Error durante la importación:', error);
        alert('Error: ' + error.message);
    }
})();