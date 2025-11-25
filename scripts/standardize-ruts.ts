/**
 * Script para estandarizar todos los RUTs en la base de datos al formato: 00000000-0
 * Este script actualiza tanto pacientes como usuarios
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de Firebase (usar las mismas credenciales del proyecto)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Estandariza un RUT al formato 00000000-0
 */
function standardizeRUT(rut: string): string {
  if (!rut) return '';

  // Remover todos los puntos, espacios y guiones
  const cleaned = rut.replace(/[.\s-]/g, '').toUpperCase();

  if (cleaned.length === 0) return '';

  // Extraer cuerpo (todos menos último carácter) y dígito verificador (último carácter)
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  // Rellenar con ceros a la izquierda hasta 8 dígitos
  const paddedBody = body.padStart(8, '0');

  // Retornar formato estandarizado
  return `${paddedBody}-${dv}`;
}

/**
 * Actualiza RUTs de pacientes
 */
async function updatePatientRUTs() {
  console.log('🔄 Actualizando RUTs de pacientes...\n');

  const patientsRef = collection(db, 'patients');
  const snapshot = await getDocs(patientsRef);

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const docSnapshot of snapshot.docs) {
    const patient = docSnapshot.data();
    const originalRUT = patient.rut;

    if (!originalRUT) {
      console.log(`⚠️  Paciente sin RUT: ${patient.nombre} (${docSnapshot.id})`);
      skippedCount++;
      continue;
    }

    const standardizedRUT = standardizeRUT(originalRUT);

    // Solo actualizar si el RUT cambió
    if (originalRUT !== standardizedRUT) {
      try {
        await updateDoc(doc(db, 'patients', docSnapshot.id), {
          rut: standardizedRUT
        });

        console.log(`✅ ${patient.nombre}`);
        console.log(`   ${originalRUT} → ${standardizedRUT}\n`);
        updatedCount++;
      } catch (error) {
        console.error(`❌ Error actualizando paciente ${patient.nombre}:`, error);
        errorCount++;
      }
    } else {
      skippedCount++;
    }
  }

  console.log('\n📊 Resumen de pacientes:');
  console.log(`   Actualizados: ${updatedCount}`);
  console.log(`   Sin cambios: ${skippedCount}`);
  console.log(`   Errores: ${errorCount}`);
  console.log(`   Total: ${snapshot.docs.length}\n`);
}

/**
 * Actualiza RUTs de usuarios
 */
async function updateUserRUTs() {
  console.log('🔄 Actualizando RUTs de usuarios...\n');

  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const docSnapshot of snapshot.docs) {
    const user = docSnapshot.data();
    const originalRUT = user.username || user.rut; // username es el RUT en el sistema de login

    if (!originalRUT) {
      console.log(`⚠️  Usuario sin RUT: ${user.name} (${docSnapshot.id})`);
      skippedCount++;
      continue;
    }

    const standardizedRUT = standardizeRUT(originalRUT);

    // Solo actualizar si el RUT cambió
    if (originalRUT !== standardizedRUT) {
      try {
        const updateData: any = {};

        // Actualizar username si existe
        if (user.username) {
          updateData.username = standardizedRUT;
        }

        // Actualizar rut si existe
        if (user.rut) {
          updateData.rut = standardizedRUT;
        }

        await updateDoc(doc(db, 'users', docSnapshot.id), updateData);

        console.log(`✅ ${user.name}`);
        console.log(`   ${originalRUT} → ${standardizedRUT}\n`);
        updatedCount++;
      } catch (error) {
        console.error(`❌ Error actualizando usuario ${user.name}:`, error);
        errorCount++;
      }
    } else {
      skippedCount++;
    }
  }

  console.log('\n📊 Resumen de usuarios:');
  console.log(`   Actualizados: ${updatedCount}`);
  console.log(`   Sin cambios: ${skippedCount}`);
  console.log(`   Errores: ${errorCount}`);
  console.log(`   Total: ${snapshot.docs.length}\n`);
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando estandarización de RUTs\n');
  console.log('📋 Formato objetivo: 00000000-0 (8 dígitos sin puntos, con guion)\n');

  try {
    await updatePatientRUTs();
    await updateUserRUTs();

    console.log('✨ Estandarización completada exitosamente\n');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar script
main();
