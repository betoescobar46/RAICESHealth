"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var papaparse_1 = require("papaparse");
var firebase_admin_1 = require("firebase-admin");
// Carga la configuración de Firebase desde tu archivo de credenciales
var serviceAccount = require('./serviceAccountKey.json');
// Inicializa la app de Firebase si aún no está inicializada
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount)
    });
}
var db = firebase_admin_1.default.firestore();
db.settings({ ignoreUndefinedProperties: true });
// Ruta al archivo CSV con las coordenadas
var CSV_COORDINATES_PATH = path.resolve(process.cwd(), 'rut_coordenadas.csv');
// Nombre de la colección en Firestore
var FIRESTORE_COLLECTION = 'patients';
/**
 * Procesa una fila del CSV de coordenadas.
 * @param row Fila del CSV
 * @returns Un objeto con el rut, latitud y longitud, o null si la fila es inválida.
 */
var processCoordinateRow = function (row) {
    var rut = row.rut;
    // Convierte la latitud y longitud a números. Si no son válidos, los deja como null.
    var lat = parseFloat(row.latitud);
    var lon = parseFloat(row.longitud);
    // Si no hay RUT o las coordenadas no son números válidos, la fila se ignora.
    if (!rut || isNaN(lat) || isNaN(lon)) {
        return null;
    }
    return { rut: rut, lat: lat, lon: lon };
};
/**
 * Función principal que lee el CSV y actualiza Firestore.
 */
function updateCoordinates() {
    return __awaiter(this, void 0, void 0, function () {
        var csvFile, rows, collectionRef, updatedCount_1, notFoundCount, _loop_1, _i, rows_1, row, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 8]);
                    console.log('Iniciando la actualización de coordenadas...');
                    csvFile = fs.readFileSync(CSV_COORDINATES_PATH, 'utf8');
                    rows = papaparse_1.default.parse(csvFile, {
                        header: true,
                        skipEmptyLines: true,
                    }).data;
                    if (!rows || rows.length === 0) {
                        console.log('No se encontraron filas válidas en el CSV de coordenadas.');
                        return [2 /*return*/];
                    }
                    console.log("Se encontraron ".concat(rows.length, " filas en el CSV. Buscando y actualizando pacientes en Firestore..."));
                    collectionRef = db.collection(FIRESTORE_COLLECTION);
                    updatedCount_1 = 0;
                    notFoundCount = 0;
                    _loop_1 = function (row) {
                        var coordData, querySnapshot;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    coordData = processCoordinateRow(row);
                                    if (!coordData) return [3 /*break*/, 2];
                                    return [4 /*yield*/, collectionRef.where('rut', '==', coordData.rut).get()];
                                case 1:
                                    querySnapshot = _b.sent();
                                    if (!querySnapshot.empty) {
                                        // Si encuentra uno o más pacientes (aunque debería ser uno)
                                        querySnapshot.forEach(function (doc) {
                                            // Actualiza el documento con las nuevas coordenadas
                                            doc.ref.update({
                                                lat: coordData.lat,
                                                lon: coordData.lon
                                            });
                                            updatedCount_1++;
                                            console.log("Paciente con RUT ".concat(coordData.rut, " actualizado."));
                                        });
                                    }
                                    else {
                                        // Si no se encuentra un paciente con ese RUT
                                        console.log("ADVERTENCIA: No se encontr\u00F3 paciente con RUT ".concat(coordData.rut, "."));
                                        notFoundCount++;
                                    }
                                    _b.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, rows_1 = rows;
                    _a.label = 1;
                case 1:
                    if (!(_i < rows_1.length)) return [3 /*break*/, 4];
                    row = rows_1[_i];
                    return [5 /*yield**/, _loop_1(row)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('\n--- Proceso Finalizado ---');
                    console.log("Pacientes actualizados exitosamente: ".concat(updatedCount_1));
                    console.log("RUTs no encontrados en la base de datos: ".concat(notFoundCount));
                    return [3 /*break*/, 8];
                case 5:
                    error_1 = _a.sent();
                    console.error('Ocurrió un error grave durante la actualización de coordenadas:', error_1);
                    return [3 /*break*/, 8];
                case 6: 
                // Cierra la conexión con Firebase
                return [4 /*yield*/, firebase_admin_1.default.app().delete()];
                case 7:
                    // Cierra la conexión con Firebase
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Ejecuta la función
updateCoordinates();
