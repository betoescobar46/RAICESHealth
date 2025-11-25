/**
 * Script para verificar y corregir el rol del usuario admin
 *
 * Este script verifica que el usuario admin tenga el rol correcto en Firestore
 * para que las reglas de seguridad permitan el acceso a la colección de pacientes
 */

const admin = require('firebase-admin');
const path = require('path');

// Inicializar Firebase Admin
let serviceAccount;
try {
    serviceAccount = require('./service-account-key.json');
} catch (error) {
    console.error('❌ No se encontró el archivo de credenciales de Firebase Admin SDK');
    console.log('\n💡 Por favor descarga las credenciales siguiendo las instrucciones en:');
    console.log('   DESCARGAR_CREDENCIALES.md');
    console.log('\nO busca archivos *firebase-adminsdk*.json en tu computadora');
    console.log('y cópialos a la raíz del proyecto como service-account-key.json');
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const ADMIN_UID = 'hdTIPnXEX1XISYkh5sP4iUZGV0e2';
const ADMIN_EMAIL = 'admin@raiceshealth.cl';

async function checkAndFixUserRole() {
    try {
        console.log('🔍 Verificando usuario admin en Firestore...\n');

        // Obtener el documento del usuario
        const userRef = db.collection('users').doc(ADMIN_UID);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            console.log('❌ El usuario no existe en Firestore');
            console.log('📝 Creando documento de usuario...\n');

            // Crear el documento del usuario
            const newUser = {
                uid: ADMIN_UID,
                email: ADMIN_EMAIL,
                name: 'Administrador',
                role: 'admin',
                username: 'admin',
                title: 'Administrador del Sistema',
                rut: '00000000-0',
                centroAtencion: 'default',
                themeColor: 'blue',
                isActive: true,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                availableProfiles: [
                    {
                        id: 'profile-admin-default',
                        name: 'Perfil Administrador',
                        centroAtencion: 'default',
                        themeColor: 'blue'
                    }
                ],
                activeProfileId: 'profile-admin-default'
            };

            await userRef.set(newUser);
            console.log('✅ Usuario admin creado exitosamente\n');
            console.log('📋 Datos del usuario:');
            console.log('   UID:', ADMIN_UID);
            console.log('   Email:', ADMIN_EMAIL);
            console.log('   Role:', 'admin');
            console.log('   Centro:', 'default');

            return;
        }

        // El usuario existe, verificar su rol
        const userData = userDoc.data();
        console.log('✅ Usuario encontrado en Firestore\n');
        console.log('📋 Datos actuales:');
        console.log('   UID:', userData.uid);
        console.log('   Email:', userData.email || ADMIN_EMAIL);
        console.log('   Nombre:', userData.name);
        console.log('   Role:', userData.role);
        console.log('   Centro:', userData.centroAtencion);
        console.log('   AllowedPatients:', userData.allowedPatients?.length || 'sin restricciones');

        // Verificar si el rol es correcto
        if (userData.role !== 'admin') {
            console.log('\n⚠️ El rol no es "admin" (minúsculas)');
            console.log('🔧 Corrigiendo rol...\n');

            await userRef.update({
                role: 'admin',
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log('✅ Rol actualizado a "admin"');
        } else {
            console.log('\n✅ El rol es correcto: "admin"');
        }

        // Verificar que no tenga restricciones de allowedPatients
        if (userData.allowedPatients) {
            console.log('\n⚠️ El usuario admin tiene restricciones de allowedPatients');
            console.log('🔧 Removiendo restricciones...\n');

            await userRef.update({
                allowedPatients: admin.firestore.FieldValue.delete()
            });

            console.log('✅ Restricciones removidas');
        }

        // Verificar que centroAtencion sea default
        if (userData.centroAtencion && userData.centroAtencion !== 'default') {
            console.log(`\n⚠️ El centro de atención no es "default": ${userData.centroAtencion}`);
            console.log('🔧 Cambiando a "default"...\n');

            await userRef.update({
                centroAtencion: 'default',
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log('✅ Centro de atención actualizado a "default"');
        }

        console.log('\n✅ Usuario admin verificado y corregido');

        // Verificar que haya pacientes en la base de datos
        console.log('\n🔍 Verificando pacientes en Firestore...');
        const patientsSnapshot = await db.collection('patients').limit(5).get();

        console.log(`📦 Total de pacientes: ${patientsSnapshot.size}`);

        if (patientsSnapshot.size === 0) {
            console.log('\n⚠️ No hay pacientes en la base de datos');
            console.log('💡 Necesitas importar pacientes usando:');
            console.log('   npm run import:patients');
            console.log('   o');
            console.log('   node import-patients.cjs');
        } else {
            console.log('\n📋 Muestra de pacientes (primeros 5):');
            patientsSnapshot.forEach(doc => {
                const patient = doc.data();
                console.log(`   - ${patient.nombre} (RUT: ${patient.rut})`);
            });
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error(error);
    } finally {
        process.exit(0);
    }
}

// Ejecutar
console.log('🚀 === FIX: PERMISOS DE USUARIO ADMIN ===\n');
checkAndFixUserRole();
