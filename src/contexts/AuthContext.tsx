/**
 * AuthContext
 *
 * Contexto global para autenticación y gestión de sesiones.
 * Integrado con Firebase Auth y AuthService de FASE 2.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { auth, db } from '../../services/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import * as AuthService from '../../services/auth/AuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => Promise<void>;
  changePassword: (username: string, oldPassword: string, newPassword: string) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Escuchar cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('🔐 Usuario autenticado:', firebaseUser.email);

        try {
          // Cargar metadata del usuario desde Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Crear objeto User compatible con el sistema actual
            const loadedUser: User = {
              id: parseInt(firebaseUser.uid) || 0,
              uid: firebaseUser.uid,
              username: userData.rut || userData.username,
              email: userData.email || undefined, // Email real para recuperacion
              name: userData.name,
              role: userData.role,
              title: userData.title,
              password: '', // No se almacena password con Firebase Auth
              failedLoginAttempts: 0,
              isLocked: false,
              lockoutUntil: null,
              centroAtencion: userData.centroAtencion || 'default',
              themeColor: userData.themeColor || 'blue',
              availableProfiles: userData.availableProfiles || [],
              activeProfileId: userData.activeProfileId || null,
              allowedPatients: userData.allowedPatients || []
            };

            console.log('✅ Usuario cargado desde Firestore:', loadedUser.name);
            setUser(loadedUser);
            AuthService.setCurrentUser(loadedUser);
          } else {
            console.error('❌ No se encontró metadata del usuario en Firestore');
            setUser(null);
          }
        } catch (error) {
          console.error('❌ Error cargando metadata del usuario:', error);
          setUser(null);
        }
      } else {
        // Usuario no autenticado
        console.log('🚪 Usuario no autenticado');
        setUser(null);
        AuthService.setCurrentUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Login usando AuthService
   */
  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> => {
    try {
      const result = AuthService.authenticate(username, password);

      if (result.success && result.user) {
        setUser(result.user);
        return { success: true, user: result.user };
      }

      return { success: false, message: result.message };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error de autenticación' };
    }
  };

  /**
   * Logout usando Firebase Auth y AuthService
   */
  const logout = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      AuthService.logout();
      setUser(null);
      console.log('✅ Logout exitoso');
    } catch (error) {
      console.error('❌ Error en logout:', error);
    }
  };

  /**
   * Cambiar contraseña usando AuthService
   */
  const changePassword = (username: string, oldPassword: string, newPassword: string): { success: boolean; message: string } => {
    return AuthService.changePassword(username, oldPassword, newPassword);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
