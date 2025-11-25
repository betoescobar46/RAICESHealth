/**
 * Script para agregar usuario PaulaHernandez
 * Ejecutar en la consola del navegador (F12)
 */

// Obtener usuarios actuales
const currentUsers = JSON.parse(localStorage.getItem('rlp_users') || '[]');

// Encontrar el siguiente ID disponible
const maxId = currentUsers.length > 0 ? Math.max(...currentUsers.map(u => u.id)) : 0;
const newId = maxId + 1;

// Crear nuevo usuario
const newUser = {
  id: newId,
  username: '25678901-2',  // RUT chileno válido para Paula
  password: '1234',
  name: 'Paula Hernandez',
  role: 'profesional',
  title: 'Profesional',
  failedLoginAttempts: 0,
  isLocked: false,
  lockoutUntil: null
};

// Agregar el nuevo usuario
currentUsers.push(newUser);

// Guardar en localStorage
localStorage.setItem('rlp_users', JSON.stringify(currentUsers));

console.log('✓ Usuario PaulaHernandez creado exitosamente');
console.log('Detalles del usuario:');
console.log('- RUT (Username): 25678901-2');
console.log('- Contraseña: 1234');
console.log('- Nombre: Paula Hernandez');
console.log('- Rol: profesional');
console.log('');
console.log('Puedes recargar la página y loguearte con estas credenciales');
