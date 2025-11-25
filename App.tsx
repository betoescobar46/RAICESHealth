import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';
import { User, Patient, PrestacionConfig, Farmaco } from './types';
import { DEFAULT_PRESTACION_PERFIL_MAP, INITIAL_ALL_PRESTACIONES, INITIAL_FARMACOS } from './constants';
import FirebaseService from './services/firebaseService';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { getBrandingConfig } from './config/branding.config';

// Types for login result and password change (kept for compatibility)
export type LoginResult = {
    success: boolean;
    reason?: 'invalid_credentials' | 'locked';
    lockoutTimeRemaining?: number;
    user?: User;
};

export type ChangePasswordResult = {
    success: boolean;
    message: string;
};

// Dynamic logo component based on tenant
const AppLogo: React.FC<{ version?: string; className?: string }> = ({ version, className }) => {
    const branding = getBrandingConfig();

    return (
        <div className={`flex flex-col items-center py-6 text-center ${className}`}>
            <div dangerouslySetInnerHTML={{ __html: branding.logoSvg }} />
            <span className="text-xl font-semibold tracking-wide">{branding.appName}</span>
            {version && <p className="text-gray-400 text-xs mt-2">{version}</p>}
        </div>
    );
};

const App: React.FC = () => {
    // State variables
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [prestacionConfig, setPrestacionConfig] = useState<PrestacionConfig>(DEFAULT_PRESTACION_PERFIL_MAP);
    const [allPrestaciones, setAllPrestaciones] = useState<string[]>(INITIAL_ALL_PRESTACIONES);
    const [allFarmacos, setAllFarmacos] = useState<Farmaco[]>(INITIAL_FARMACOS);
    const [adminNotifications, setAdminNotifications] = useState<string[]>([]);

    // Listen to Firebase auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                console.log('🔐 Usuario autenticado:', firebaseUser.email);
                try {
                    const user = await FirebaseService.getUser(firebaseUser.uid);
                    if (user) {
                        console.log('✅ Usuario cargado desde Firestore:', user.name);
                        setCurrentUser(user);
                    } else {
                        console.error('❌ No se encontró metadata del usuario en Firestore');
                        alert(`Usuario autenticado pero sin perfil en el sistema.\n\nEmail: ${firebaseUser.email}\nUID: ${firebaseUser.uid}\n\nContacta al administrador para que cree tu perfil.`);
                        await signOut(auth);
                        setCurrentUser(null);
                    }
                } catch (error) {
                    console.error('❌ Error cargando metadata del usuario:', error);
                    alert(`Error al cargar perfil de usuario.\n\nEmail: ${firebaseUser.email}\nUID: ${firebaseUser.uid}\n\nContacta al administrador.`);
                    await signOut(auth);
                    setCurrentUser(null);
                }
            } else {
                console.log('🚪 Usuario no autenticado');
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Load data when a user is authenticated
    useEffect(() => {
        if (!currentUser) {
            setPatients([]);
            setUsers([]);
            return;
        }
        const loadDataFromFirebase = async () => {
            try {
                console.log('📦 Cargando datos desde Firebase...');
                const patientsFromFirebase = await FirebaseService.getAllPatients();
                console.log(`✅ Cargados ${patientsFromFirebase.length} pacientes`);
                setPatients(patientsFromFirebase);

                const usersFromFirebase = await FirebaseService.getAllUsers();
                console.log(`✅ Cargados ${usersFromFirebase.length} usuarios`);
                setUsers(usersFromFirebase);

                const config = await FirebaseService.getPrestacionConfig();
                if (config) setPrestacionConfig(config);

                const prestaciones = await FirebaseService.getAllPrestaciones();
                if (prestaciones.length > 0) setAllPrestaciones(prestaciones);

                const farmacos = await FirebaseService.getFarmacos();
                if (farmacos.length > 0) setAllFarmacos(farmacos);
            } catch (error) {
                console.error('❌ Error cargando datos desde Firebase:', error);
            }
        };
        loadDataFromFirebase();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('✅ Logout exitoso');
            setCurrentUser(null);
            setPatients([]);
            setUsers([]);
        } catch (error) {
            console.error('❌ Error en logout:', error);
        }
    };

    const handleUpdatePatient = async (updatedPatient: Patient) => {
        if (!currentUser) {
            console.error('No hay usuario autenticado para actualizar paciente.');
            return;
        }
        if (!updatedPatient.firestoreId) {
            console.error('El paciente a actualizar no tiene un ID.');
            return;
        }
        try {
            await FirebaseService.updatePatient(updatedPatient.firestoreId, updatedPatient);
            setPatients((prev) =>
                prev.map((p) => (p.firestoreId === updatedPatient.firestoreId ? updatedPatient : p))
            );
            console.log('Paciente actualizado con éxito en Firebase.', updatedPatient.firestoreId);
        } catch (error) {
            console.error('Error actualizando paciente en Firebase:', error);
        }
    };

    const handleUpdateUsers = async (updatedUsers: User[]) => {
        // For now, just update local state. Persistence should be handled per‑user elsewhere.
        setUsers(updatedUsers);
        console.warn('handleUpdateUsers called. Persistencia masiva no está implementada; use actualizaciones individuales.');
    };

    const handleUpdatePrestacionConfig = async (newConfig: PrestacionConfig) => {
        try {
            await FirebaseService.savePrestacionConfig(newConfig);
            setPrestacionConfig(newConfig);
        } catch (error) {
            console.error('Error guardando configuración:', error);
        }
    };

    const handleUpdateAllPrestaciones = async (newAllPrestaciones: string[]) => {
        try {
            await FirebaseService.saveAllPrestaciones(newAllPrestaciones);
            setAllPrestaciones(newAllPrestaciones);
        } catch (error) {
            console.error('Error guardando lista de prestaciones:', error);
        }
    };

    const handleUpdateAllFarmacos = async (newAllFarmacos: Farmaco[]) => {
        try {
            await FirebaseService.saveFarmacos(newAllFarmacos);
            setAllFarmacos(newAllFarmacos);
        } catch (error) {
            console.error('Error guardando fármacos:', error);
        }
    };

    const handleChangePassword = (rut: string, oldPass: string, newPass: string): ChangePasswordResult => {
        console.warn('handleChangePassword no soportado en modo Firebase Auth directo.');
        return { success: false, message: 'Por favor use la opción de recuperar contraseña de Firebase.' };
    };

    const handleNotifyAdmin = (rut: string) => {
        console.log('Notificación para admin:', rut);
        setAdminNotifications((prev) => [`Notificación para ${rut}`, ...prev]);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="animate-[fadeInOut_2s_ease-in-out_infinite]">
                    <AppLogo className="text-orange-700" />
                </div>
                <p className="text-slate-500 text-sm mt-2 animate-pulse">cargando...</p>
                <style>{`
                    @keyframes fadeInOut {
                        0%, 100% { opacity: 0.4; transform: scale(0.95); }
                        50% { opacity: 1; transform: scale(1); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="text-sm text-gray-800">
            {currentUser ? (
                <MainApp
                    user={currentUser}
                    allUsers={users}
                    patients={patients}
                    onLogout={handleLogout}
                    onUpdateUsers={handleUpdateUsers}
                    LogoComponent={AppLogo}
                    notifications={adminNotifications}
                    prestacionConfig={prestacionConfig}
                    onUpdatePrestacionConfig={handleUpdatePrestacionConfig}
                    allPrestaciones={allPrestaciones}
                    onUpdateAllPrestaciones={handleUpdateAllPrestaciones}
                    allFarmacos={allFarmacos}
                    onUpdateAllFarmacos={handleUpdateAllFarmacos}
                    onUpdatePatient={handleUpdatePatient}
                />
            ) : (
                <LoginPage
                    LogoComponent={AppLogo}
                    onChangePassword={handleChangePassword}
                    onNotifyAdmin={handleNotifyAdmin}
                />
            )}
        </div>
    );
};

export default App;