import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, UserProfile, ThemeColor, Patient } from '@/types';
import { filterPatientsByAccess } from '@/utils/patientAccessControl';
import { getThemeClasses } from '@/utils/themeUtils';
import LocalStorageService from '@/services/LocalStorageService';

interface UseProfileManagementProps {
    user: User;
    allUsers: User[];
    patients: Patient[];
    onUpdateUsers: (users: User[]) => void;
}

interface UseProfileManagementReturn {
    activeProfile: UserProfile | null;
    currentTheme: ThemeColor;
    theme: ReturnType<typeof getThemeClasses>;
    accessiblePatients: Patient[];
    handleProfileChange: (profileId: string) => void;
    handleThemeChange: (newTheme: ThemeColor) => void;
}

export const useProfileManagement = ({
    user,
    allUsers,
    patients,
    onUpdateUsers,
}: UseProfileManagementProps): UseProfileManagementReturn => {
    const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);

    // Determinar el perfil activo
    useEffect(() => {
        if (user.availableProfiles && user.availableProfiles.length > 0) {
            const profileId = user.activeProfileId || user.availableProfiles[0].id;
            const profile = user.availableProfiles.find(p => p.id === profileId) || user.availableProfiles[0];
            setActiveProfile(profile);
        }
    }, [user]);

    // Tema actual basado en el perfil activo o preferencia del usuario
    const currentTheme = useMemo(() => {
        return activeProfile?.themeColor || user.themeColor || 'blue';
    }, [activeProfile, user.themeColor]);

    // Obtener clases de tema
    const theme = useMemo(() => getThemeClasses(currentTheme), [currentTheme]);

    // Filtrar pacientes según permisos del usuario y centro de atención del perfil activo
    const accessiblePatients = useMemo(() => {
        let filtered = filterPatientsByAccess(patients, user);

        // Usar el centro de atención del perfil activo si está disponible
        const centroToFilter = activeProfile?.centroAtencion || user.centroAtencion;

        console.log('🔍 Filtro de pacientes:');
        console.log('   Perfil activo:', activeProfile?.name || 'ninguno');
        console.log('   Centro a filtrar:', centroToFilter);
        console.log('   Total pacientes antes de filtrar:', filtered.length);

        // Si hay un centro de atención específico, filtrar por ese centro
        if (centroToFilter && centroToFilter !== 'default') {
            filtered = filtered.filter(p => p.centroAtencion === centroToFilter);
            console.log('   Total pacientes después de filtrar:', filtered.length);
        }

        return filtered;
    }, [patients, user, activeProfile]);

    // Función para cambiar de perfil
    const handleProfileChange = useCallback((profileId: string) => {
        if (!user.availableProfiles) return;

        const newProfile = user.availableProfiles.find(p => p.id === profileId);
        if (!newProfile) return;

        // Actualizar el perfil activo
        setActiveProfile(newProfile);

        // Actualizar el usuario con el nuevo perfil activo
        const updatedUser = {
            ...user,
            activeProfileId: profileId,
            centroAtencion: newProfile.centroAtencion,
            themeColor: newProfile.themeColor
        };

        const updatedUsers = allUsers.map(u => u.id === user.id ? updatedUser : u);
        onUpdateUsers(updatedUsers);
        LocalStorageService.updateUser(updatedUser);
    }, [user, allUsers, onUpdateUsers]);

    // Función para cambiar el tema
    const handleThemeChange = useCallback((newTheme: ThemeColor) => {
        // Si hay un perfil activo, actualizar el tema del perfil
        if (activeProfile) {
            const updatedProfile = { ...activeProfile, themeColor: newTheme };
            setActiveProfile(updatedProfile);

            // Actualizar el perfil en la lista de perfiles del usuario
            const updatedProfiles = user.availableProfiles?.map(p =>
                p.id === activeProfile.id ? updatedProfile : p
            ) || [];

            const updatedUser = {
                ...user,
                availableProfiles: updatedProfiles,
                themeColor: newTheme
            };

            const updatedUsers = allUsers.map(u => u.id === user.id ? updatedUser : u);
            onUpdateUsers(updatedUsers);
            LocalStorageService.updateUser(updatedUser);
        } else {
            // Si no hay perfil activo, actualizar el tema del usuario directamente
            const updatedUser = { ...user, themeColor: newTheme };
            const updatedUsers = allUsers.map(u => u.id === user.id ? updatedUser : u);
            onUpdateUsers(updatedUsers);
            LocalStorageService.updateUser(updatedUser);
        }
    }, [user, allUsers, onUpdateUsers, activeProfile]);

    return {
        activeProfile,
        currentTheme,
        theme,
        accessiblePatients,
        handleProfileChange,
        handleThemeChange,
    };
};
