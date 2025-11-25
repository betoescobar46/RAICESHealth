import { useState, useEffect } from 'react';
import { User } from '@/types';
import FirebaseService from '@/services/firebaseService';

interface UseUserManagementReturn {
    localUsers: User[];
    isUsersDirty: boolean; // Deprecated, kept for compatibility but always false
    handleUpdateLocalUser: (updatedUser: User) => Promise<void>;
    handleAddUser: (newUser: Omit<User, 'id'>) => Promise<void>;
    handleDeleteUser: (userIdToDelete: number) => Promise<void>;
    handleResetPassword: (user: User) => Promise<void>;
    handleUnlockUser: (user: User) => Promise<void>;
    handleSaveNewPassword: (user: User, password: string) => Promise<void>;
    handleSaveUsers: () => void; // Deprecated
    handleCancelUsers: () => void; // Deprecated
}

export const useUserManagement = (users: User[], onUpdateUsers: (users: User[]) => void): UseUserManagementReturn => {
    const [localUsers, setLocalUsers] = useState<User[]>(users);

    // Sync local state with parent props
    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const handleUpdateLocalUser = async (updatedUser: User) => {
        try {
            await FirebaseService.updateUser(String(updatedUser.id), updatedUser);
            // Optimistic update
            setLocalUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
            // Parent should update via listener, but we update local state for immediate feedback
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error al actualizar usuario.");
        }
    };

    const handleAddUser = async (newUser: Omit<User, 'id'>) => {
        try {
            // 1. Generate ID (numeric for compatibility, but we should move to string)
            // For now, we use max + 1
            const newId = Math.max(...localUsers.map(u => u.id), 0) + 1;

            // 2. Create Auth User
            // We assume username is RUT. We format it as email.
            const cleanRut = newUser.username.replace(/\./g, '');
            const rutParts = cleanRut.split('-');
            const body = rutParts[0].padStart(8, '0');
            const dv = rutParts[1] || '';
            const email = `${body}-${dv}@simorahealth.local`;
            const tempPassword = "simora." + body.slice(-4); // Temporary password

            // Create in Auth
            const uid = await FirebaseService.createAuthUser(email, tempPassword);

            // 3. Create in Firestore
            const userToCreate: User = {
                id: newId,
                ...newUser,
                uid: uid // Store Auth UID if possible, though User type might not have it. 
                // If User type doesn't have uid, we just store it as extra field or ignore.
                // But we need to link them. 
                // Actually, FirebaseService.createUser uses user.id as doc ID.
                // Ideally we should use uid as doc ID.
                // But to keep compatibility with numeric IDs, we use user.id.
                // We can add uid field to User type later.
            };

            await FirebaseService.createUser(userToCreate);

            // Optimistic update
            setLocalUsers(prev => [...prev, userToCreate]);
            alert(`Usuario creado exitosamente.\n\nCredenciales:\nUsuario: ${newUser.username}\nClave temporal: ${tempPassword}`);

        } catch (error: any) {
            console.error("Error adding user:", error);
            if (error.code === 'auth/email-already-in-use') {
                alert("El usuario ya existe en el sistema (Auth).");
            } else {
                alert("Error al crear usuario: " + error.message);
            }
        }
    };

    const handleDeleteUser = async (userIdToDelete: number) => {
        const user = localUsers.find(u => u.id === userIdToDelete);
        if (user && window.confirm(`¿Está seguro de que desea eliminar al usuario ${user.name}?`)) {
            try {
                await FirebaseService.deleteUser(String(userIdToDelete));
                setLocalUsers(prev => prev.filter(u => u.id !== userIdToDelete));
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error al eliminar usuario.");
            }
        }
    };

    const handleResetPassword = async (user: User) => {
        if (window.confirm(`¿Enviar correo de restablecimiento de contraseña a ${user.name}?`)) {
            try {
                const cleanRut = user.username.replace(/\./g, '');
                const rutParts = cleanRut.split('-');
                const body = rutParts[0].padStart(8, '0');
                const dv = rutParts[1] || '';
                const email = `${body}-${dv}@simorahealth.local`;

                await FirebaseService.sendPasswordResetEmail(email);
                alert(`Correo de restablecimiento enviado a ${email} (simulado si no es real).`);
            } catch (error) {
                console.error("Error resetting password:", error);
                alert("Error al enviar correo de restablecimiento.");
            }
        }
    };

    const handleUnlockUser = async (user: User) => {
        const unlockedUser = {
            ...user,
            isLocked: false,
            lockoutUntil: null,
            failedLoginAttempts: 0
        };
        await handleUpdateLocalUser(unlockedUser);
        alert(`Usuario ${user.name} desbloqueado.`);
    };

    const handleSaveNewPassword = async (user: User, password: string) => {
        try {
            // Import Firebase auth to get current user
            const { auth, functions } = await import('../../../services/firebase');
            const { updatePassword, EmailAuthProvider, reauthenticateWithCredential } = await import('firebase/auth');
            const { httpsCallable } = await import('firebase/functions');

            const currentUser = auth.currentUser;

            if (!currentUser) {
                alert("No hay usuario autenticado.");
                return;
            }

            // Check if the user is changing their own password
            if (user.uid && user.uid === currentUser.uid) {
                // User is changing their own password
                // Firebase requires re-authentication for sensitive operations

                // For simplicity, we'll ask for current password
                const currentPassword = prompt("Para cambiar tu contraseña, primero ingresa tu contraseña actual:");

                if (!currentPassword) {
                    return; // User cancelled
                }

                try {
                    // Re-authenticate
                    const credential = EmailAuthProvider.credential(currentUser.email!, currentPassword);
                    await reauthenticateWithCredential(currentUser, credential);

                    // Now update password
                    await updatePassword(currentUser, password);

                    alert(`Contraseña actualizada exitosamente para ${user.name}.`);
                } catch (error: any) {
                    if (error.code === 'auth/wrong-password') {
                        alert("Contraseña actual incorrecta.");
                    } else if (error.code === 'auth/weak-password') {
                        alert("La nueva contraseña es muy débil. Debe tener al menos 6 caracteres.");
                    } else {
                        console.error("Error updating password:", error);
                        alert("Error al actualizar contraseña: " + error.message);
                    }
                }
            } else {
                // Admin changing another user's password via Cloud Function
                if (!user.uid) {
                    alert("Este usuario no tiene UID de Firebase Auth. No se puede cambiar su contraseña.");
                    return;
                }

                try {
                    const adminChangePassword = httpsCallable(functions, 'adminChangePassword');
                    const result = await adminChangePassword({ uid: user.uid, newPassword: password });
                    const data = result.data as { success: boolean; message: string };

                    if (data.success) {
                        alert(`Contraseña actualizada exitosamente para ${user.name}.`);
                    } else {
                        alert("Error al cambiar contraseña.");
                    }
                } catch (error: any) {
                    console.error("Error calling adminChangePassword:", error);
                    if (error.code === 'functions/permission-denied') {
                        alert("No tienes permisos de administrador para cambiar contraseñas.");
                    } else {
                        alert("Error al cambiar contraseña: " + (error.message || "Error desconocido"));
                    }
                }
            }
        } catch (error) {
            console.error("Error in handleSaveNewPassword:", error);
            alert("Error al procesar cambio de contraseña.");
        }
    };

    const handleSaveUsers = () => {
        // Deprecated
        console.warn("handleSaveUsers is deprecated in online mode.");
    };

    const handleCancelUsers = () => {
        // Deprecated
        setLocalUsers(users);
    };

    return {
        localUsers,
        isUsersDirty: false, // Always false to hide "Save" buttons
        handleUpdateLocalUser,
        handleAddUser,
        handleDeleteUser,
        handleResetPassword,
        handleUnlockUser,
        handleSaveNewPassword,
        handleSaveUsers,
        handleCancelUsers,
    };
};
