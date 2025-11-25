import React from 'react';
import { User } from '@/types';
import { Users } from 'lucide-react';

interface UserTableProps {
    users: User[];
    profiles: string[];
    onUpdateUser: (user: User) => void;
    onEditPassword: (user: User) => void;
    onResetPassword: (user: User) => void;
    onUnlockUser: (user: User) => void;
    onDeleteUser: (userId: number) => void;
    onAssignPatients?: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
    users,
    profiles,
    onUpdateUser,
    onEditPassword,
    onResetPassword,
    onUnlockUser,
    onDeleteUser,
    onAssignPatients
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 w-1/4">Nombre</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 w-1/4">RUT</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 w-1/4">Rol</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Estado</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={e => onUpdateUser({ ...user, name: e.target.value })}
                                    className="w-full p-1 border rounded-md"
                                />
                            </td>
                            <td className="px-4 py-2 font-mono">
                                <input
                                    type="text"
                                    value={user.rut || ''}
                                    onChange={e => onUpdateUser({ ...user, rut: e.target.value })}
                                    className="w-full p-1 border rounded-md"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <select
                                    value={user.title}
                                    onChange={e => onUpdateUser({ ...user, title: e.target.value })}
                                    className="w-full p-1 border rounded-md bg-white"
                                >
                                    {profiles.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-4 py-2">
                                {user.isLocked ? (
                                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                                        Bloqueado
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                                        Activo
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                {onAssignPatients && (
                                    <button
                                        onClick={() => onAssignPatients(user)}
                                        className="inline-flex items-center gap-1 text-purple-600 hover:underline"
                                        title="Asignar pacientes"
                                    >
                                        <Users className="w-3.5 h-3.5" />
                                        <span>{user.allowedPatients?.length || 0}</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => onEditPassword(user)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Clave
                                </button>
                                <button
                                    onClick={() => onResetPassword(user)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Reset
                                </button>
                                {user.isLocked && (
                                    <button
                                        onClick={() => onUnlockUser(user)}
                                        className="text-green-600 hover:underline font-bold"
                                    >
                                        Desbloq.
                                    </button>
                                )}
                                <button
                                    onClick={() => onDeleteUser(user.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
