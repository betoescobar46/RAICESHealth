/**
 * Exportaciones centralizadas de todos los Contexts y Hooks
 *
 * USO:
 * import { useAuth, usePatients, usePrestaciones, useConfig, useTheme, AppProviders } from '@/contexts';
 */

// Providers
export { AppProviders } from './AppProviders';
export { AuthProvider } from './AuthContext';
export { PatientsProvider } from './PatientsContext';
export { PrestacionesProvider } from './PrestacionesContext';
export { ConfigProvider } from './ConfigContext';
export { ThemeProvider } from './ThemeContext';

// Hooks personalizados
export { useAuth } from './AuthContext';
export { usePatients } from './PatientsContext';
export { usePrestaciones } from './PrestacionesContext';
export { useConfig } from './ConfigContext';
export { useTheme } from './ThemeContext';

// Types (re-exportar para conveniencia)
export type { default as AuthContextType } from './AuthContext';
export type { default as PatientsContextType } from './PatientsContext';
export type { default as PrestacionesContextType } from './PrestacionesContext';
export type { default as ConfigContextType } from './ConfigContext';
export type { default as ThemeContextType } from './ThemeContext';
