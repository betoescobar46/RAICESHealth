import React, { useState, useEffect } from 'react';
import { User } from '@/types';

interface ChangePasswordModalProps {
    user: User;
    onClose: () => void;
    onSave: (password: string) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ user, onClose, onSave }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = () => {
        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres (requisito de Firebase).');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        onSave(newPassword);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-2">Cambiar Contraseña</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Para: <span className="font-bold">{user.name}</span>
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nueva Contraseña</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
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
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};
