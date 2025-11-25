import React from 'react';
import { UserProfile } from '../types';
import { Check } from 'lucide-react';

interface ProfileSwitcherProps {
  profiles: UserProfile[];
  activeProfileId: string;
  onProfileChange: (profileId: string) => void;
  onClose: () => void;
}

const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({
  profiles,
  activeProfileId,
  onProfileChange,
  onClose
}) => {
  return (
    <div className="fixed left-4 top-16 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[320px] max-w-[400px] z-[100]">
      <div className="text-xs font-semibold text-gray-700 mb-2 px-2">Seleccionar Perfil</div>
      <div className="space-y-1">
        {profiles.map((profile) => {
          const isActive = activeProfileId === profile.id;
          const bgColorClass = `bg-${profile.themeColor}-50`;
          const borderColorClass = isActive ? `border-${profile.themeColor}-500` : 'border-gray-200';
          const textColorClass = `text-${profile.themeColor}-700`;

          return (
            <button
              key={profile.id}
              onClick={() => {
                onProfileChange(profile.id);
                onClose();
              }}
              className={`
                w-full text-left px-3 py-3 rounded-md
                transition-all duration-200
                border-2 ${borderColorClass}
                ${isActive ? bgColorClass : 'hover:bg-gray-50'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                    {profile.name}
                    {isActive && (
                      <Check className={`w-4 h-4 ${textColorClass}`} />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{profile.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500 px-2">
          Al cambiar de perfil se actualizará el tema y los pacientes visibles
        </div>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
