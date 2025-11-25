import React from 'react';

interface ProfileSelectorProps {
    profiles: string[];
    selectedProfile: string | null;
    onSelectProfile: (profile: string) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({
    profiles,
    selectedProfile,
    onSelectProfile
}) => {
    const professionalProfiles = profiles.filter(p => p !== 'Admin' && p !== 'Estadísticas');

    return (
        <div className="w-1/3 border-r pr-4">
            <h6 className="font-semibold text-gray-600 mb-2">Perfiles Profesionales</h6>
            <ul className="space-y-1">
                {professionalProfiles.map(profile => (
                    <li key={profile}>
                        <button
                            onClick={() => onSelectProfile(profile)}
                            className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                                selectedProfile === profile
                                    ? 'bg-blue-100 text-blue-800 font-bold'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {profile}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
