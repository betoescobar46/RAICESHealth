import { useEffect } from 'react';
import { View } from '../types';

interface UseNavigationShortcutsProps {
    userRole: string;
    handleNavClick: (view: View) => void;
    setFocusIntent: (intent: string | null) => void;
    openQuickSearch: () => void;
}

export const useNavigationShortcuts = ({
    userRole,
    handleNavClick,
    setFocusIntent,
    openQuickSearch,
}: UseNavigationShortcutsProps): void => {
    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            const isInputFocused = (
                document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA'
            );

            // Ctrl + Shift + S: Toggle sidebar (not implemented in this version, kept for compatibility)
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 's') {
                event.preventDefault();
                // Sidebar toggle would be handled here
            }

            // Ctrl + K: Open quick search modal
            if (event.ctrlKey && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                openQuickSearch();
            }

            // Alt + R: Go to ingresar actividad
            if (event.altKey && event.key.toLowerCase() === 'r' && !isInputFocused) {
                event.preventDefault();
                handleNavClick('ingresarActividad');
            }

            // Alt + 1-9: Navigate between views
            if (event.altKey && /^[1-9]$/.test(event.key) && !isInputFocused) {
                event.preventDefault();
                const navMap: { [key: string]: View } = {
                    '1': 'news',
                    '2': 'actividadReciente',
                    '3': 'calendario',
                    '4': 'registro',
                    '5': 'estadisticas',
                    '6': 'anexos',
                    '7': 'admin'
                };
                const targetView = navMap[event.key];
                if (targetView) {
                    // Check admin access
                    if (targetView === 'admin' && userRole !== 'admin') return;
                    handleNavClick(targetView);
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [userRole, handleNavClick, setFocusIntent, openQuickSearch]);
};
