// Función para cargar pacientes desde el archivo JSON
export async function loadPatientsFromJSON() {
  try {
    // Intentar cargar el archivo procesado primero
    const response = await fetch('/processed-patients.json');

    if (!response.ok) {
      console.error('Error al cargar el archivo de pacientes procesados');
      return null;
    }

    const patients = await response.json();

    if (!Array.isArray(patients)) {
      console.error('El archivo JSON debe contener un array de pacientes');
      return null;
    }

    console.log(`✅ Cargados ${patients.length} pacientes desde JSON`);
    return patients;

  } catch (error) {
    console.error('Error al cargar pacientes desde JSON:', error);
    return null;
  }
}