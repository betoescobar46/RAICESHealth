import React, { useState } from 'react';
import GlobalZoom from '../../GlobalZoom';
import ProfileSwitcher from '../../ProfileSwitcher';
import { User, UserProfile } from '@/types';
import { View, NavItem, NavShortcutMap } from '../types';

interface NavigationBarProps {
    user: User;
    activeProfile: UserProfile | null;
    activeView: View;
    navItems: NavItem[];
    navShortcutMap: NavShortcutMap;
    onNavClick: (view: View) => void;
    onProfileChange: (profileId: string) => void;
    onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    user,
    activeProfile,
    activeView,
    navItems,
    navShortcutMap,
    onNavClick,
    onProfileChange,
    onLogout,
}) => {
    const [isProfileSwitcherOpen, setIsProfileSwitcherOpen] = useState(false);

    return (
        <>
            <div className="w-full flex justify-center px-8 mt-0" style={{ paddingTop: '5px' }}>
                <header className="bg-white border-2 border-orange-200 rounded-xl transition-all duration-300 flex items-center justify-between p-0 w-full max-w-7xl shadow-lg">
                    <div className="flex items-center gap-8">
                        <div className="relative pl-4">
                            <button
                                onClick={() => {
                                    if (user.availableProfiles && user.availableProfiles.length > 1) {
                                        setIsProfileSwitcherOpen(!isProfileSwitcherOpen);
                                    } else {
                                        onNavClick('registro');
                                    }
                                }}
                                className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-150 cursor-pointer"
                                title={user.availableProfiles && user.availableProfiles.length > 1 ? 'Cambiar perfil' : user.name}
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0 shadow-md">
                                    {user.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                </div>
                            </button>
                            {isProfileSwitcherOpen && user.availableProfiles && user.availableProfiles.length > 1 && (
                                <>
                                    <div
                                        className="fixed inset-0 z-[90]"
                                        onClick={() => setIsProfileSwitcherOpen(false)}
                                    />
                                    <ProfileSwitcher
                                        profiles={user.availableProfiles}
                                        activeProfileId={activeProfile?.id || user.availableProfiles[0].id}
                                        onProfileChange={onProfileChange}
                                        onClose={() => setIsProfileSwitcherOpen(false)}
                                    />
                                </>
                            )}
                        </div>

                        <nav className="flex items-center gap-2">
                            {navItems.map(item => {
                                const shortcut = navShortcutMap[item.view];
                                const title = shortcut ? `${item.label} (${shortcut})` : item.label;
                                return (
                                    <button
                                        key={item.key}
                                        onClick={() => onNavClick(item.view as View)}
                                        title={title}
                                        className={`py-3 px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-lg relative ${
                                            activeView === item.view
                                                ? 'bg-orange-100 text-orange-900'
                                                : 'text-gray-700 hover:bg-orange-50 hover:text-orange-800'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 pr-4">
                        <GlobalZoom />
                        <button
                            onClick={() => onLogout()}
                            className="p-2.5 rounded-lg text-orange-700 hover:bg-orange-100 hover:text-orange-900 transition-all duration-200"
                            title="Salir"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </header>
            </div>
        </>
    );
};

export default NavigationBar;
