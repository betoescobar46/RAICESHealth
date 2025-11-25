import React from 'react';
import Calendar from '../../Calendar';
import AnexosView from '../../AnexosView';
import NewsView from '../../NewsView';
import PatientSearchView from '../../PatientSearchView';
import PatientIndexView from '../../PatientIndexView';
import PatientFileView from '../../PatientFileView';
import StatisticsView from '../../StatisticsView';
import AdminView from '../../AdminView';
import IngresarActividadView from '../../IngresarActividadView';
import RecentActivityView from '../../RecentActivityView';
import { Patient, Prestacion, User, NewPatientData, PrestacionConfig, Farmaco } from '@/types';
import { View } from '../types';

interface ViewRouterProps {
    activeView: View;
    selectedPatient: Patient | null;
    patients: Patient[];
    prestaciones: Prestacion[];
    user: User;
    allUsers: User[];
    focusIntent: string | null;
    prestacionConfig: PrestacionConfig;
    allPrestaciones: string[];
    allFarmacos: Farmaco[];
    notifications: string[];
    onSelectPatient: (id: string) => void;
    onBackToList: () => void;
    onAddPrestacion: (prestacion: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp'>) => void;
    onAddMultiplePrestaciones: (prestaciones: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp'>[]) => void;
    onAddGeneralActivity: (actividad: Omit<Prestacion, 'id' | 'estado' | 'usuarioPerfil' | 'timestamp' | 'pacienteId'> & { duracion_min_real: number }) => void;
    onAddPatient: (data: NewPatientData) => Patient;
    onUpdatePatient: (updatedPatient: Patient) => void;
    onUpdateUsers: (users: User[]) => void;
    onUpdatePrestacionConfig: (config: PrestacionConfig) => void;
    onUpdateAllPrestaciones: (prestaciones: string[]) => void;
    onUpdateAllFarmacos: (farmacos: Farmaco[]) => void;
}

const ViewRouter: React.FC<ViewRouterProps> = ({
    activeView,
    selectedPatient,
    patients,
    prestaciones,
    user,
    allUsers,
    focusIntent,
    prestacionConfig,
    allPrestaciones,
    allFarmacos,
    notifications,
    onSelectPatient,
    onBackToList,
    onAddPrestacion,
    onAddMultiplePrestaciones,
    onAddGeneralActivity,
    onAddPatient,
    onUpdatePatient,
    onUpdateUsers,
    onUpdatePrestacionConfig,
    onUpdateAllPrestaciones,
    onUpdateAllFarmacos,
}) => {
    // If a patient is selected, show PatientFileView
    if (selectedPatient) {
        return (
            <PatientFileView
                patient={selectedPatient}
                prestaciones={prestaciones.filter(p => p.pacienteId === selectedPatient.firestoreId)}
                onBack={onBackToList}
                onAddPrestacion={onAddPrestacion}
                onUpdatePatient={onUpdatePatient}
                user={user}
                prestacionConfig={prestacionConfig}
                allFarmacos={allFarmacos}
            />
        );
    }

    // Route to appropriate view based on activeView
    switch (activeView) {
        case 'ingresarActividad':
            return (
                <IngresarActividadView
                    user={user}
                    onAddActivity={onAddGeneralActivity}
                />
            );
        case 'news':
            return <NewsView />;
        case 'actividadReciente':
            return (
                <RecentActivityView
                    prestaciones={prestaciones}
                    patients={patients}
                    user={user}
                    onSelectPatient={onSelectPatient}
                />
            );
        case 'buscar':
            return (
                <PatientSearchView
                    patients={patients}
                    onSelectPatient={onSelectPatient}
                />
            );
        case 'calendario':
            return (
                <Calendar
                    currentDate={new Date(2025, 8, 1)}
                    prestaciones={prestaciones}
                    patients={patients}
                    user={user}
                    onSelectPatient={onSelectPatient}
                />
            );
        case 'estadisticas':
            return (
                <StatisticsView
                    prestaciones={prestaciones}
                    patients={patients}
                    user={user}
                    allUsers={allUsers}
                    allPrestaciones={allPrestaciones}
                    prestacionConfig={prestacionConfig}
                />
            );
        case 'anexos':
            return <AnexosView user={user} />;
        case 'admin':
            return user.role === 'admin' ? (
                <AdminView
                    users={allUsers}
                    onUpdateUsers={onUpdateUsers}
                    notifications={notifications}
                    prestacionConfig={prestacionConfig}
                    onUpdatePrestacionConfig={onUpdatePrestacionConfig}
                    allPrestaciones={allPrestaciones}
                    onUpdateAllPrestaciones={onUpdateAllPrestaciones}
                    allFarmacos={allFarmacos}
                    onUpdateAllFarmacos={onUpdateAllFarmacos}
                    patients={patients}
                />
            ) : (
                <p>Acceso denegado.</p>
            );
        case 'registro':
        default:
            return (
                <PatientIndexView
                    patients={patients}
                    onSelectPatient={onSelectPatient}
                    allFarmacos={allFarmacos}
                    allUsers={allUsers}
                    currentUser={user}
                    onUpdateUsers={onUpdateUsers}
                />
            );
    }
};

export default ViewRouter;
