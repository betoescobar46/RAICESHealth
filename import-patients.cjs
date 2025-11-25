"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import-patients.ts (Versión Final - Nombres de columna corregidos)
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const papaparse_1 = __importDefault(require("papaparse"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = require('./serviceAccountKey.json');
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount)
    });
}
const db = firebase_admin_1.default.firestore();
db.settings({ ignoreUndefinedProperties: true });
const CSV_FILE_PATH = path.resolve(process.cwd(), 'pacientes.csv');
// --- Apuntamos a la colección final ---
const FIRESTORE_COLLECTION = 'patients';
const processRow = (row) => {
    // --- CAMBIO CLAVE: Usamos los nombres de columna correctos de tu CSV ---
    if (!row['Columna 1'] || !row['NOMBRE']) {
        return null;
    }
    // Combinamos los nombres y apellidos
    const nombreCompleto = [row['NOMBRE'], row['APELLIDO PATERNO'], row['APELLIDO MATERNO']].filter(Boolean).join(' ');
    return {
        id: parseInt(row['Columna 1'], 10) || undefined,
        nombre: Buffer.from(nombreCompleto, 'latin1').toString('utf8'),
        rut: row['RUN'],
        ficha: row['FICHA'] || '',
        edad: parseInt(row['EDAD'], 10) || undefined,
        sexo: row['SEXO'] === 'M' ? 'Masculino' : 'Femenino',
        fechaNacimiento: row['F. NACIMIENTO'],
        direccion: Buffer.from(row['DOMICILIO'], 'latin1').toString('utf8'),
        comuna: Buffer.from(row['COMUNA'] || 'Maule', 'latin1').toString('utf8'), // Asumimos Maule si está vacío
        lat: 0, // Las coordenadas no están en este CSV, las dejamos en 0
        lon: 0,
        telefonos: [row['CONTACTO'], row['CONTACTO 2']].filter(Boolean),
        email: row['CORREO'] || '',
        tutor: Buffer.from(row['TUTOR'] || '', 'latin1').toString('utf8'),
        ocupacion: Buffer.from(row['OCUPACION'] || '', 'latin1').toString('utf8'),
        dispositivoAPS: Buffer.from(row['DERIVACIÓN'] || '', 'latin1').toString('utf8'), // Mapeamos DERIVACIÓN a dispositivoAPS
        alergias: Buffer.from(row['ALERGIAS'] || '', 'latin1').toString('utf8'),
        ram: Buffer.from(row['RAM'] || '', 'latin1').toString('utf8'),
        objetivosTerapeuticos: '',
        diagnostico: {
            saludMental: Buffer.from(row['EJE I DIAGNÓSTICO '] || '', 'latin1').toString('utf8'),
            morbilidadMedica: Buffer.from(row['EJE III DIAGNÓSTICO '] || '', 'latin1').toString('utf8'),
            factoresPsicosociales: Buffer.from(row['EJE IVEJE IV DIAGNÓSTICO '] || '', 'latin1').toString('utf8'),
        },
        farmacos: [],
        pensionDiscapacidad: row['CREDENCIAL DISCAPACIDAD'] === 'SI', // Mapeamos CREDENCIAL
        credencialDiscapacidad: row['CREDENCIAL DISCAPACIDAD'] === 'SI',
        consumoActivoDrogas: false, // Esta columna no está en el CSV
    };
};
async function runImport() {
    try {
        console.log('Iniciando la importación final...');
        const csvFile = fs.readFileSync(CSV_FILE_PATH, 'utf8');
        const { data: rows } = papaparse_1.default.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
        });
        if (!rows || rows.length === 0) {
            console.log('No se encontraron filas válidas en el CSV.');
            return;
        }
        console.log(`Se encontraron ${rows.length} filas. Preparando lotes para la colección "${FIRESTORE_COLLECTION}"...`);
        const collectionRef = db.collection(FIRESTORE_COLLECTION);
        const commitPromises = [];
        let batch = db.batch();
        let operations = 0;
        let processedCount = 0;
        for (const row of rows) {
            const processedData = processRow(row);
            if (processedData) {
                processedCount++;
                const docRef = collectionRef.doc();
                batch.set(docRef, processedData);
                operations++;
            }
            if (operations === 499) {
                console.log(`Enviando lote de ${operations} pacientes...`);
                commitPromises.push(batch.commit());
                batch = db.batch();
                operations = 0;
            }
        }
        if (operations > 0) {
            console.log(`Enviando último lote de ${operations} pacientes...`);
            commitPromises.push(batch.commit());
        }
        console.log(`Total de pacientes procesados y válidos: ${processedCount}`);
        console.log('Esperando confirmación de Firestore...');
        await Promise.all(commitPromises);
        console.log('\n¡ÉXITO DEFINITIVO! La importación se ha completado.');
        console.log('Por favor, recarga la consola de Firestore para ver la colección "patients".');
    }
    catch (error) {
        console.error('Ocurrió un error grave durante el proceso de importación:', error);
    }
    finally {
        await firebase_admin_1.default.app().delete();
    }
}
runImport();
