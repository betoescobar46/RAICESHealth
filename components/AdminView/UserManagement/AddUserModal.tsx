import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AddUserModalProps {
    profiles: string[];
    onClose: () => void;
    onSave: (newUser: Omit<User, 'id'>) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ profiles, onClose, onSave }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
        title: profiles[0] || ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        if (!newUser.name || !newUser.username || !newUser.title) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const role: UserRole = (newUser.title === 'Admin' || newUser.title === 'Estadísticas')
            ? (newUser.title === 'Admin' ? 'admin' : 'estadistica')
            : 'profesional';

        onSave({
            ...newUser,
            role,
            password: '1234',
            failedLoginAttempts: 0,
            isLocked: false,
            lockoutUntil: null
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Usuario</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={newUser.name}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">RUT (sin puntos, con guión)</label>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Perfil / Rol</label>
                        <select
                            name="title"
                            value={newUser.title}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md bg-white"
                        >
                            {profiles.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Crear Usuario
                    </button>
                </div>
            </div>
        </div>
    );
};
