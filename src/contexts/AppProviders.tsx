/**
 * AppProviders
 *
 * Provider principal que agrupa todos los contexts de la aplicación.
 * Estructura de anidamiento optimizada para dependencias entre contexts.
 *
 * ORDEN DE ANIDAMIENTO:
 * 1. AuthContext (sin dependencias)
 * 2. IdleTimeoutContext (depende de AuthContext para logout)
 * 3. ConfigContext (necesita estar disponible para otros contexts)
 * 4. ThemeContext (usa datos de usuario de AuthContext)
 * 5. PatientsContext (puede depender de Auth para permisos)
 * 6. PrestacionesContext (depende de Config para configuraciones)
 */

import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { IdleTimeoutProvider } from './IdleTimeoutContext';
import { ConfigProvider } from './ConfigContext';
import { ThemeProvider } from './ThemeContext';
import { PatientsProvider } from './PatientsContext';
import { PrestacionesProvider } from './PrestacionesContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Provider principal que envuelve toda la aplicación con los contexts necesarios
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <IdleTimeoutProvider>
        <ConfigProvider>
          <ThemeProvider>
            <PatientsProvider>
              <PrestacionesProvider>
                {children}
              </PrestacionesProvider>
            </PatientsProvider>
          </ThemeProvider>
        </ConfigProvider>
      </IdleTimeoutProvider>
    </AuthProvider>
  );
};
