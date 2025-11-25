import React, { useMemo } from 'react';
import { User, PrestacionConfig, Patient } from '../types';
import { UserManagementSection } from './AdminView/UserManagement/UserManagementSection';
import { PrestacionManagementSection } from './AdminView/PrestacionManagement/PrestacionManagementSection';

interface AdminViewProps {
    users: User[];
    onUpdateUsers: (users: User[]) => void;
    notifications: string[];
    prestacionConfig: PrestacionConfig;
    onUpdatePrestacionConfig: (config: PrestacionConfig) => void;
    allPrestaciones: string[];
    onUpdateAllPrestaciones: (prestaciones: string[]) => void;
    patients: Patient[];
}

const AdminView: React.FC<AdminViewProps> = ({
    users,
    onUpdateUsers,
    notifications,
    prestacionConfig,
    onUpdatePrestacionConfig,
    allPrestaciones,
    onUpdateAllPrestaciones,
    patients
}) => {
    // Compute unique profiles from users
    const profiles = useMemo(() =>
        Array.from(new Set(users.map(u => u.title)))
            .sort((a: string, b: string) => a.localeCompare(b))
        , [users]);

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Panel de Administración</h3>
                <div className="flex gap-2">
                    {/* Botones de carga de datos eliminados en versión online */}
                </div>
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Notificaciones</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                            {notifications.map((note, index) => <li key={index}>{note}</li>)}
                        </ul>
                    </div>
                </div>
            )}

            {/* User Management Section */}
            <UserManagementSection
                users={users}
                profiles={profiles}
                patients={patients}
                onUpdateUsers={onUpdateUsers}
            />

            {/* Prestacion Management Section */}
            <PrestacionManagementSection
                profiles={profiles}
                prestacionConfig={prestacionConfig}
                allPrestaciones={allPrestaciones}
                onUpdatePrestacionConfig={onUpdatePrestacionConfig}
                onUpdateAllPrestaciones={onUpdateAllPrestaciones}
            />
        </div>
    );
};

export default AdminView;
