/**
 * Script para resetear el sistema y crear nuevo usuario admin
 *
 * INSTRUCCIONES:
 * 1. Abre la consola del navegador (F12)
 * 2. Copia y pega TODO este código
 * 3. Presiona Enter
 * 4. Recarga la página (F5)
 * 5. Inicia sesión con: 1234-5 / 12345
 */

// Limpiar todo el LocalStorage
localStorage.clear();

// Crear el nuevo usuario admin directamente
const DEFAULT_ADMIN_USER = {
  id: 1,
  username: '1234-5',
  password: '12345',
  name: 'Administrador',
  role: 'admin',
  title: 'Administrador del Sistema',
  failedLoginAttempts: 0,
  isLocked: false,
  lockoutUntil: null,
};

// Guardar el usuario en LocalStorage
localStorage.setItem('rlp_users', JSON.stringify([DEFAULT_ADMIN_USER]));

console.log('✅ Usuario admin creado exitosamente!');
console.log('📋 Credenciales:');
console.log('   RUT: 1234-5');
console.log('   Contraseña: 12345');
console.log('');
console.log('🔄 Ahora recarga la página (F5) para iniciar sesión.');
