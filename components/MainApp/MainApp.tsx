import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import ViewRouter from './components/ViewRouter';
import { useCurrentView } from './hooks/useCurrentView';
import { useProfileManagement } from './hooks/useProfileManagement';
import { useNavigationShortcuts } from './hooks/useNavigationShortcuts';
import { Patient, Prestacion, User, NewPatientData, PrestacionConfig, Farmaco } from '@/types';
import { View, NavItem, NavShortcutMap } from './types';
import QuickSearchModal from '../QuickSearchModal';

interface MainAppProps {
    user: User;
    allUsers: User[];
    patients: Patient[];
    notifications: string[];
    onLogout: () => void;
    onUpdateUsers: (users: User[]) => void;
    LogoComponent: React.FC<{className?: string}>;
    prestacionConfig: PrestacionConfig;
    onUpdatePrestacionConfig: (config: PrestacionConfig) => void;
    allPrestaciones: string[];
    onUpdateAllPrestaciones: (prestaciones: string[]) => void;
    allFarmacos: Farmaco[];
    onUpdateAllFarmacos: (farmacos: Farmaco[]) => void;
    onUpdatePatient: (updatedPatient: Patient) => void;
}

const MainApp: React.FC<MainAppProps> = ({
    user,
    allUsers,
    patients,
    notifications,
    onLogout,
    onUpdateUsers,
    prestacionConfig,
    onUpdatePrestacionConfig,
    allPrestaciones,
    onUpdateAllPrestaciones,
    allFarmacos,
    onUpdateAllFarmacos,
    onUpdatePatient
}) => {
    const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
    const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

    // Custom hooks for state management
    const {
        activeView,
        selectedPatientId,
        focusIntent,
        setFocusIntent,
        handleNavClick,
        handleSelectPatient,
        handleBackToList,
    } = useCurrentView();

    const {
        activeProfile,
        accessiblePatients,
        handleProfileChange,
    } = useProfileManagement({
        user,
        allUsers,
        patients,
        onUpdateUsers,
    });

    // Setup navigation shortcuts
    useNavigationShortcuts({
        userRole: user.role,
        handleNavClick,
        setFocusIntent,
        openQuickSearch: () => setIsQuickSearchOpen(true),
    });

    // Load prestaciones from Firestore
    useEffect(() => {
        console.log("TODO: Cargar prestaciones desde Firestore.");
    }, [user]);

    // Handlers for prestaciones
    const handleAddPrestacion = (nuevaPrestacion: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp'>) => {
        const prestacionConId: Prestacion = {
            ...nuevaPrestacion,
            id: `p${Date.now()}`,
            estado: nuevaPrestacion.tipo === 'NSP (No se presenta)' ? 'NSP' : 'Realizada',
            usuarioPerfil: user.title,
            timestamp: new Date().toISOString(),
        };
        setPrestaciones(prev => [...prev, prestacionConId]);
        alert('Prestación registrada con éxito.');
    };

    const handleAddMultiplePrestaciones = (nuevasPrestaciones: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp'>[]) => {
        // TODO: Implement multiple prestaciones
    };

    const handleAddGeneralActivity = (actividad: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp' | 'pacienteId'> & { duracion_min_real: number }) => {
        // TODO: Implement general activity
    };

    const handleAddPatient = (data: NewPatientData): Patient => {
        // TODO: Implement patient creation
        return {} as Patient;
    };

    // Navigation items configuration
    const navItems: NavItem[] = [
        { key: 'news', label: 'News', view: 'news' },
        { key: 'actividadReciente', label: 'Actividad Reciente', view: 'actividadReciente' },
        { key: 'calendario', label: 'Calendario', view: 'calendario' },
        { key: 'registro', label: 'Índice de Pacientes', view: 'registro' },
        { key: 'estadisticas', label: 'Estadísticas', view: 'estadisticas' },
        { key: 'anexos', label: 'Recursos', view: 'anexos' },
    ];

    if (user.role === 'admin') {
        navItems.push({ key: 'admin', label: 'Administrar', view: 'admin' });
    }

    const navShortcutMap: NavShortcutMap = {
        ingresarActividad: 'Alt + R',
        news: 'Alt + 2',
        actividadReciente: 'Alt + 3',
        buscar: 'Alt + 4 / Ctrl + K',
        calendario: 'Alt + 5',
        registro: 'Alt + 6',
        estadisticas: 'Alt + 7',
        anexos: 'Alt + 8',
        admin: 'Alt + 9',
    };

    // Find selected patient
    const selectedPatient = selectedPatientId
        ? accessiblePatients.find(p => p.firestoreId === selectedPatientId) || null
        : null;

    return (
        <div className="flex flex-col pb-12 min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 transition-colors duration-300 relative overflow-hidden" style={{ zoom: '130%' }}>
            {/* Círculos decorativos estáticos */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col w-full">
            <NavigationBar
                user={user}
                activeProfile={activeProfile}
                activeView={activeView}
                navItems={navItems}
                navShortcutMap={navShortcutMap}
                onNavClick={handleNavClick}
                onProfileChange={handleProfileChange}
                onLogout={onLogout}
            />

            <main className="flex flex-col px-8 pb-8 w-full items-center">
                <div
                    key={activeView}
                    className="bg-white rounded-xl shadow-lg border-2 border-orange-200 w-full max-w-7xl mb-0 flex flex-col overflow-hidden"
                    style={{
                        animation: 'fadeInDiffuse 0.4s ease-out',
                        marginTop: '5px',
                        height: '700px'
                    }}
                >
                    <div className="pt-10 px-8 pb-8 flex flex-col h-full overflow-hidden">
                        <ViewRouter
                            activeView={activeView}
                            selectedPatient={selectedPatient}
                            patients={accessiblePatients}
                            prestaciones={prestaciones}
                            user={user}
                            allUsers={allUsers}
                            focusIntent={focusIntent}
                            prestacionConfig={prestacionConfig}
                            allPrestaciones={allPrestaciones}
                            allFarmacos={allFarmacos}
                            notifications={notifications}
                            onSelectPatient={handleSelectPatient}
                            onBackToList={handleBackToList}
                            onAddPrestacion={handleAddPrestacion}
                            onAddMultiplePrestaciones={handleAddMultiplePrestaciones}
                            onAddGeneralActivity={handleAddGeneralActivity}
                            onAddPatient={handleAddPatient}
                            onUpdatePatient={onUpdatePatient}
                            onUpdateUsers={onUpdateUsers}
                            onUpdatePrestacionConfig={onUpdatePrestacionConfig}
                            onUpdateAllPrestaciones={onUpdateAllPrestaciones}
                            onUpdateAllFarmacos={onUpdateAllFarmacos}
                        />
                    </div>
                </div>
            </main>
            </div>

            <QuickSearchModal
                isOpen={isQuickSearchOpen}
                onClose={() => setIsQuickSearchOpen(false)}
                patients={accessiblePatients}
                onSelectPatient={handleSelectPatient}
            />
        </div>
    );
};

export default MainApp;
