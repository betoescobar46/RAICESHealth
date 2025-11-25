/**
 * FirebaseSyncService
 *
 * Servicio especializado para la sincronización con Firebase.
 * Responsabilidad única: Sincronización bidireccional entre localStorage y Firebase.
 */

/**
 * Sincroniza todos los datos de localStorage con Firebase
 * NO modifica localStorage, solo copia a Firebase como backup
 *
 * @returns Objeto con resultado de la sincronización
 */
export async function syncWithFirebase(): Promise<{success: boolean, message: string}> {
  try {
    // Importar dinámicamente para evitar problemas si Firebase no está configurado
    const { syncToFirebase } = await import('../../src/services/firebase');
    const result = await syncToFirebase();
    return result;
  } catch (error) {
    console.error('Error al sincronizar con Firebase:', error);
    return {
      success: false,
      message: `Error al sincronizar: ${error}`
    };
  }
}

/**
 * Verifica si Firebase está configurado y conectado
 *
 * @returns true si Firebase está disponible y conectado
 */
export async function checkFirebaseConnection(): Promise<boolean> {
  try {
    const { testFirebaseConnection } = await import('../../src/services/firebase');
    return await testFirebaseConnection();
  } catch (error) {
    console.error('Error al verificar conexión con Firebase:', error);
    return false;
  }
}
