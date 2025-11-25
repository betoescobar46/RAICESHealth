/**
 * ThemeContext
 *
 * Contexto global para gestión de tema visual y zoom.
 * Maneja colores de tema, perfiles de usuario, y zoom global.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { ThemeColor, UserProfile } from '../types';
import { getThemeClasses } from '../../utils/themeUtils';

interface ThemeContextType {
  // Tema actual
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;

  // Clases CSS del tema actual
  theme: ReturnType<typeof getThemeClasses>;

  // Perfiles de usuario (para usuarios con múltiples contextos)
  availableProfiles: UserProfile[];
  activeProfile: UserProfile | null;
  setActiveProfile: (profile: UserProfile | null) => void;
  setAvailableProfiles: (profiles: UserProfile[]) => void;

  // Zoom global
  zoom: number;
  setZoom: (zoom: number) => void;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialThemeColor?: ThemeColor;
  initialProfiles?: UserProfile[];
  initialActiveProfileId?: string;
}

const ZOOM_STORAGE_KEY = 'rlp_global_zoom';
const DEFAULT_ZOOM = 100;
const MIN_ZOOM = 75;
const MAX_ZOOM = 150;
const ZOOM_STEP = 5;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialThemeColor = 'blue',
  initialProfiles = [],
  initialActiveProfileId
}) => {
  const [themeColor, setThemeColorState] = useState<ThemeColor>(initialThemeColor);
  const [availableProfiles, setAvailableProfiles] = useState<UserProfile[]>(initialProfiles);
  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
  const [zoom, setZoomState] = useState<number>(() => {
    // Cargar zoom desde localStorage
    const saved = localStorage.getItem(ZOOM_STORAGE_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_ZOOM;
  });

  /**
   * Determinar perfil activo al montar o cuando cambien los perfiles
   */
  useEffect(() => {
    if (availableProfiles && availableProfiles.length > 0) {
      const profileId = initialActiveProfileId || availableProfiles[0].id;
      const profile = availableProfiles.find(p => p.id === profileId) || availableProfiles[0];
      setActiveProfile(profile);
    } else {
      setActiveProfile(null);
    }
  }, [availableProfiles, initialActiveProfileId]);

  /**
   * Actualizar tema cuando cambia el perfil activo
   */
  useEffect(() => {
    if (activeProfile?.themeColor) {
      setThemeColorState(activeProfile.themeColor);
    } else if (initialThemeColor) {
      setThemeColorState(initialThemeColor);
    }
  }, [activeProfile, initialThemeColor]);

  /**
   * Obtener clases CSS del tema actual
   */
  const theme = useMemo(() => getThemeClasses(themeColor), [themeColor]);

  /**
   * Actualizar zoom y persistir en localStorage
   */
  const setZoom = useCallback((newZoom: number) => {
    const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    setZoomState(clampedZoom);
    localStorage.setItem(ZOOM_STORAGE_KEY, clampedZoom.toString());

    // Aplicar el zoom al documento
    document.documentElement.style.fontSize = `${clampedZoom}%`;
  }, []);

  /**
   * Incrementar zoom
   */
  const increaseZoom = useCallback(() => {
    setZoom(zoom + ZOOM_STEP);
  }, [zoom, setZoom]);

  /**
   * Decrementar zoom
   */
  const decreaseZoom = useCallback(() => {
    setZoom(zoom - ZOOM_STEP);
  }, [zoom, setZoom]);

  /**
   * Resetear zoom al valor por defecto
   */
  const resetZoom = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
  }, [setZoom]);

  /**
   * Aplicar zoom inicial al montar
   */
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom}%`;
  }, [zoom]);

  /**
   * Cambiar color de tema manualmente
   */
  const setThemeColor = useCallback((color: ThemeColor) => {
    setThemeColorState(color);
  }, []);

  const value: ThemeContextType = {
    themeColor,
    setThemeColor,
    theme,
    availableProfiles,
    activeProfile,
    setActiveProfile,
    setAvailableProfiles,
    zoom,
    setZoom,
    increaseZoom,
    decreaseZoom,
    resetZoom
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de tema
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
