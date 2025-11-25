"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// test-write.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Carga la clave de servicio usando el método require
const serviceAccount = require('./serviceAccountKey.json');
// Inicializa la aplicación de Firebase Admin
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
const db = firebase_admin_1.default.firestore();
async function testFirestoreWrite() {
    try {
        console.log('Intentando escribir en Firestore...');
        const testCollection = db.collection('test_collection');
        const docRef = await testCollection.add({
            message: 'La conexión y escritura funcionan correctamente.',
            timestamp: new Date()
        });
        console.log('¡Éxito! Se escribió el documento con ID:', docRef.id);
        console.log('Por favor, revisa la colección "test_collection" en tu consola de Firestore.');
    }
    catch (error) {
        console.error('¡Error al escribir en Firestore!', error);
        console.log('\nEl problema parece estar en la configuración de Firestore o en las reglas de seguridad.');
    }
}
testFirestoreWrite();
