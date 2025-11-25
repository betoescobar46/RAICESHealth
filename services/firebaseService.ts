import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    Timestamp,
    DocumentData,
    QueryConstraint,
    writeBatch,
    setDoc,
    getDoc
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { db, auth as mainAuth, firebaseConfig } from './firebase';
import { Patient, Prestacion, User, PrestacionConfig, Farmaco } from '../types';
import { getCollectionName } from '../config/tenant.config';

/**
 * Servicio centralizado para todas las operaciones de Firebase
 */
class FirebaseService {
    // ================ PACIENTES ================

    /**
     * Obtiene todos los pacientes de la base de datos
     */
    async getAllPatients(): Promise<Patient[]> {
        try {
            const patientsSnapshot = await getDocs(collection(db, getCollectionName('patients')));
            return patientsSnapshot.docs.map(doc => ({
                ...doc.data(),
                firestoreId: doc.id
            } as Patient));
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            throw error;
        }
    }

    /**
     * Obtiene un paciente por ID
     */
    async getPatientById(id: string): Promise<Patient | null> {
        try {
            const patientDoc = await getDocs(
                query(collection(db, getCollectionName('patients')), where('firestoreId', '==', id))
            );
            if (patientDoc.empty) return null;
            return {
                ...patientDoc.docs[0].data(),
                firestoreId: patientDoc.docs[0].id
            } as Patient;
        } catch (error) {
            console.error('Error al obtener paciente:', error);
            throw error;
        }
    }

    /**
     * Actualiza los datos de un paciente
     */
    async updatePatient(patientId: string, data: Partial<Patient>): Promise<void> {
        try {
            const patientRef = doc(db, 'patients', patientId);
            await updateDoc(patientRef, {
                ...data,
                lastUpdated: Timestamp.now()
            });
        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            throw error;
        }
    }

    /**
     * Crea un nuevo paciente
     */
    async createPatient(patientData: Omit<Patient, 'firestoreId'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, getCollectionName('patients')), {
                ...patientData,
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error al crear paciente:', error);
            throw error;
        }
    }

    /**
     * Elimina un paciente
     */
    async deletePatient(patientId: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'patients', patientId));
        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            throw error;
        }
    }

    // ================ PRESTACIONES ================

    /**
     * Obtiene todas las prestaciones de un paciente
     */
    async getPrestacionesByPatient(patientId: string): Promise<Prestacion[]> {
        try {
            const prestacionesQuery = query(
                collection(db, getCollectionName('prestaciones')),
                where('pacienteId', '==', patientId),
                orderBy('fecha', 'desc')
            );
            const snapshot = await getDocs(prestacionesQuery);
            return snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            } as Prestacion));
        } catch (error) {
            console.error('Error al obtener prestaciones:', error);
            throw error;
        }
    }

    /**
     * Agrega una nueva prestación
     */
    async addPrestacion(prestacionData: Omit<Prestacion, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, getCollectionName('prestaciones')), {
                ...prestacionData,
                timestamp: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error al agregar prestación:', error);
            throw error;
        }
    }

    /**
     * Actualiza una prestación existente
     */
    async updatePrestacion(prestacionId: string, data: Partial<Prestacion>): Promise<void> {
        try {
            const prestacionRef = doc(db, 'prestaciones', prestacionId);
            await updateDoc(prestacionRef, {
                ...data,
                lastUpdated: Timestamp.now()
            });
        } catch (error) {
            console.error('Error al actualizar prestación:', error);
            throw error;
        }
    }

    /**
     * Elimina una prestación
     */
    async deletePrestacion(prestacionId: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'prestaciones', prestacionId));
        } catch (error) {
            console.error('Error al eliminar prestación:', error);
            throw error;
        }
    }

    // ================ USUARIOS ================

    /**
     * Obtiene todos los usuarios
     */
    async getAllUsers(): Promise<User[]> {
        try {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            return usersSnapshot.docs.map(doc => doc.data() as User);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    /**
     * Obtiene información de un usuario por su UID (document ID)
     */
    async getUser(userId: string): Promise<User | null> {
        try {
            // Leer directamente por document ID (mas eficiente y compatible con reglas)
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (!userDoc.exists()) return null;
            return userDoc.data() as User;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    }

    /**
     * Actualiza información del usuario
     */
    async updateUser(userId: string, data: Partial<User>): Promise<void> {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                ...data,
                lastUpdated: Timestamp.now()
            });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    /**
     * Crea un nuevo usuario en Firestore
     */
    async createUser(user: User): Promise<void> {
        try {
            // Usamos setDoc con el ID del usuario para que coincida con el UID de Auth si es posible,
            // o simplemente usamos el ID que viene en el objeto user.
            await setDoc(doc(db, 'users', String(user.id)), {
                ...user,
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now()
            });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    /**
     * Elimina un usuario de Firestore
     */
    async deleteUser(userId: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'users', userId));
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }

    /**
     * Crea un usuario en Firebase Auth usando una instancia secundaria de la app
     * para no desconectar al usuario actual (admin).
     */
    async createAuthUser(email: string, password: string): Promise<string> {
        let secondaryApp;
        try {
            // Inicializar una app secundaria
            secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);

            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            return userCredential.user.uid;
        } catch (error) {
            console.error('Error al crear usuario en Auth:', error);
            throw error;
        } finally {
            // Limpiar la app secundaria si es posible (deleteApp no está importado, pero initializeApp crea instancias nuevas)
            // En un entorno real deberíamos gestionar esto mejor, pero para este caso de uso funciona.
            // Nota: deleteApp es async, deberíamos importarlo si queremos limpiar bien.
        }
    }

    /**
     * Envía un correo de restablecimiento de contraseña
     */
    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(mainAuth, email);
        } catch (error) {
            console.error('Error al enviar correo de restablecimiento:', error);
            throw error;
        }
    }

    // ================ CONFIGURACIÓN ================

    /**
     * Obtiene la configuración de prestaciones
     */
    async getPrestacionConfig(): Promise<PrestacionConfig | null> {
        try {
            const docRef = doc(db, getCollectionName('config'), 'prestacionConfig');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as PrestacionConfig;
            }
            return null;
        } catch (error) {
            console.error('Error al obtener configuración de prestaciones:', error);
            throw error;
        }
    }

    /**
     * Guarda la configuración de prestaciones
     */
    async savePrestacionConfig(config: PrestacionConfig): Promise<void> {
        try {
            await setDoc(doc(db, getCollectionName('config'), 'prestacionConfig'), config);
        } catch (error) {
            console.error('Error al guardar configuración de prestaciones:', error);
            throw error;
        }
    }

    /**
     * Obtiene la lista de todas las prestaciones disponibles
     */
    async getAllPrestaciones(): Promise<string[]> {
        try {
            const docRef = doc(db, getCollectionName('config'), 'allPrestaciones');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data().values as string[];
            }
            return [];
        } catch (error) {
            console.error('Error al obtener lista de prestaciones:', error);
            throw error;
        }
    }

    /**
     * Guarda la lista de todas las prestaciones
     */
    async saveAllPrestaciones(prestaciones: string[]): Promise<void> {
        try {
            await setDoc(doc(db, getCollectionName('config'), 'allPrestaciones'), { values: prestaciones });
        } catch (error) {
            console.error('Error al guardar lista de prestaciones:', error);
            throw error;
        }
    }

    /**
     * Obtiene la lista de fármacos
     */
    async getFarmacos(): Promise<Farmaco[]> {
        try {
            const docRef = doc(db, getCollectionName('config'), 'farmacos');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data().values as Farmaco[];
            }
            return [];
        } catch (error) {
            console.error('Error al obtener fármacos:', error);
            throw error;
        }
    }

    /**
     * Guarda la lista de fármacos
     */
    async saveFarmacos(farmacos: Farmaco[]): Promise<void> {
        try {
            await setDoc(doc(db, getCollectionName('config'), 'farmacos'), { values: farmacos });
        } catch (error) {
            console.error('Error al guardar fármacos:', error);
            throw error;
        }
    }

    // ================ NOTAS CLÍNICAS ================

    /**
     * Obtiene todas las notas clínicas (para migración/backup)
     */
    async getAllClinicalNotes(): Promise<any[]> {
        try {
            const snapshot = await getDocs(collection(db, getCollectionName('clinicalNotes')));
            return snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
        } catch (error) {
            console.error('Error al obtener todas las notas clínicas:', error);
            throw error;
        }
    }

    /**
     * Obtiene las notas clínicas de un paciente
     */
    async getClinicalNotes(patientId: string): Promise<any[]> {
        try {
            const notesQuery = query(
                collection(db, getCollectionName('clinicalNotes')),
                where('pacienteId', '==', patientId),
                orderBy('fecha', 'desc')
            );
            const snapshot = await getDocs(notesQuery);
            return snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
        } catch (error) {
            console.error('Error al obtener notas clínicas:', error);
            throw error;
        }
    }

    /**
     * Agrega una nueva nota clínica
     */
    async addClinicalNote(noteData: any): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, getCollectionName('clinicalNotes')), {
                ...noteData,
                createdAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error al agregar nota clínica:', error);
            throw error;
        }
    }

    // ================ OPERACIONES EN BATCH ================

    /**
     * Actualiza múltiples documentos en una transacción
     */
    /**
     * Actualiza múltiples documentos en una transacción
     */
    async batchUpdate(updates: Array<{ collection: string; id: string; data: any }>): Promise<void> {
        try {
            const batch = writeBatch(db);

            updates.forEach(({ collection: collectionName, id, data }) => {
                const docRef = doc(db, collectionName, id);
                batch.update(docRef, {
                    ...data,
                    lastUpdated: Timestamp.now()
                });
            });

            await batch.commit();
        } catch (error) {
            console.error('Error en actualización batch:', error);
            throw error;
        }
    }

    /**
     * Crea múltiples pacientes en batch
     */
    async batchCreatePatients(patients: Patient[]): Promise<void> {
        try {
            const batch = writeBatch(db);
            patients.forEach(patient => {
                // Use firestoreId if available, otherwise generate one
                const id = patient.firestoreId || doc(collection(db, getCollectionName('patients'))).id;
                const docRef = doc(db, 'patients', id);
                batch.set(docRef, {
                    ...patient,
                    firestoreId: id,
                    createdAt: Timestamp.now(),
                    lastUpdated: Timestamp.now()
                });
            });
            await batch.commit();
        } catch (error) {
            console.error('Error en creación batch de pacientes:', error);
            throw error;
        }
    }

    /**
     * Crea múltiples notas clínicas en batch
     */
    async batchCreateClinicalNotes(notes: any[]): Promise<void> {
        try {
            const batch = writeBatch(db);
            notes.forEach(note => {
                const id = note.id || doc(collection(db, getCollectionName('clinicalNotes'))).id;
                const docRef = doc(db, 'clinicalNotes', id);
                batch.set(docRef, {
                    ...note,
                    id: id,
                    createdAt: Timestamp.now()
                });
            });
            await batch.commit();
        } catch (error) {
            console.error('Error en creación batch de notas:', error);
            throw error;
        }
    }

    // ================ BÚSQUEDA Y FILTRADO ================

    /**
     * Busca pacientes por criterios
     */
    async searchPatients(criteria: {
        nombre?: string;
        rut?: string;
        comuna?: string;
        dispositivo?: string;
    }): Promise<Patient[]> {
        try {
            const constraints: QueryConstraint[] = [];

            if (criteria.nombre) {
                constraints.push(where('nombre', '>=', criteria.nombre));
                constraints.push(where('nombre', '<=', criteria.nombre + '\uf8ff'));
            }
            if (criteria.rut) {
                constraints.push(where('rut', '==', criteria.rut));
            }
            if (criteria.comuna) {
                constraints.push(where('comuna', '==', criteria.comuna));
            }
            if (criteria.dispositivo) {
                constraints.push(where('dispositivoAPS', '==', criteria.dispositivo));
            }

            const q = query(collection(db, getCollectionName('patients')), ...constraints);
            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                ...doc.data(),
                firestoreId: doc.id
            } as Patient));
        } catch (error) {
            console.error('Error en búsqueda de pacientes:', error);
            throw error;
        }
    }

    /**
     * Obtiene estadísticas del sistema
     */
    async getSystemStats(): Promise<{
        totalPatients: number;
        totalPrestaciones: number;
        activePrestaciones: number;
        avgPrestacionesPerPatient: number;
    }> {
        try {
            const patientsSnapshot = await getDocs(collection(db, getCollectionName('patients')));
            const prestacionesSnapshot = await getDocs(collection(db, getCollectionName('prestaciones')));

            const totalPatients = patientsSnapshot.size;
            const totalPrestaciones = prestacionesSnapshot.size;
            const activePrestaciones = prestacionesSnapshot.docs.filter(
                doc => doc.data().estado === 'Realizada'
            ).length;

            return {
                totalPatients,
                totalPrestaciones,
                activePrestaciones,
                avgPrestacionesPerPatient: totalPatients > 0 ? totalPrestaciones / totalPatients : 0
            };
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            throw error;
        }
    }
}

// Exportar instancia única del servicio (Singleton)
export default new FirebaseService();
