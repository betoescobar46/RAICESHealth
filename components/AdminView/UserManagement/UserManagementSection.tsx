import React, { useState } from 'react';
import { User, Patient } from '@/types';
import { useUserManagement } from '../hooks/useUserManagement';
import { UserTable } from './UserTable';
import { AddUserModal } from './AddUserModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { AssignPatientsModal } from './AssignPatientsModal';
import { ExportButton } from '../../ui/ExportButton';
import { exportToExcel } from '@/utils/excelUtils';

interface UserManagementSectionProps {
    users: User[];
    profiles: string[];
    patients: Patient[];
    onUpdateUsers: (users: User[]) => void;
}

export const UserManagementSection: React.FC<UserManagementSectionProps> = ({
    users,
    profiles,
    patients,
    onUpdateUsers
}) => {
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [userToAssignPatients, setUserToAssignPatients] = useState<User | null>(null);

    const {
        localUsers,
        isUsersDirty,
        handleUpdateLocalUser,
        handleAddUser,
        handleDeleteUser,
        handleResetPassword,
        handleUnlockUser,
        handleSaveNewPassword,
        handleSaveUsers,
        handleCancelUsers,
    } = useUserManagement(users, onUpdateUsers);

    const handleEditPassword = (user: User) => {
        setUserToEdit(user);
    };

    const handlePasswordSave = (password: string) => {
        if (userToEdit) {
            handleSaveNewPassword(userToEdit, password);
        }
    };

    const handleSaveAllowedPatients = (user: User, allowedPatients: string[]) => {
        handleUpdateLocalUser({ ...user, allowedPatients });
    };

    const handleExportUsers = () => {
        const dataToExport = localUsers.map(({ password, failedLoginAttempts, ...rest }) => ({
            ID: rest.id,
            Nombre: rest.name,
            RUT: rest.rut,
            Rol: rest.role,
            "Título/Perfil": rest.title,
            Bloqueado: rest.isLocked ? 'Sí' : 'No',
            "Bloqueado Hasta": rest.lockoutUntil ? new Date(rest.lockoutUntil).toLocaleString('es-CL') : 'N/A'
        }));
        exportToExcel(dataToExport, "Lista_Usuarios_RLP");
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            {/* Modals */}
            {userToEdit && (
                <ChangePasswordModal
                    user={userToEdit}
                    onClose={() => setUserToEdit(null)}
                    onSave={handlePasswordSave}
                />
            )}
            {isAddingUser && (
                <AddUserModal
                    profiles={profiles}
                    onClose={() => setIsAddingUser(false)}
                    onSave={handleAddUser}
                />
            )}
            {userToAssignPatients && (
                <AssignPatientsModal
                    user={userToAssignPatients}
                    patients={patients}
                    onClose={() => setUserToAssignPatients(null)}
                    onSave={handleSaveAllowedPatients}
                />
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                    <h4 className="text-lg font-semibold">Gestión de Usuarios</h4>
                    <button
                        onClick={() => setIsAddingUser(true)}
                        className="bg-green-100 text-green-800 font-bold py-1 px-3 rounded-md text-sm border border-green-200 hover:bg-green-200"
                    >
                        + Agregar Usuario
                    </button>
                    <ExportButton onClick={handleExportUsers} text="Exportar Usuarios" />
                </div>
                {isUsersDirty && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCancelUsers}
                            className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveUsers}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm animate-pulse"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                )}
            </div>

            {/* Table */}
            <UserTable
                users={localUsers}
                profiles={profiles}
                onUpdateUser={handleUpdateLocalUser}
                onEditPassword={handleEditPassword}
                onResetPassword={handleResetPassword}
                onUnlockUser={handleUnlockUser}
                onDeleteUser={handleDeleteUser}
                onAssignPatients={setUserToAssignPatients}
            />
        </div>
    );
};
