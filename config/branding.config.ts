import { getCurrentTenant, TenantId } from './tenant.config';

export interface BrandingConfig {
  appName: string;
  appFullName: string;
  primaryColor: string;
  secondaryColor: string;
  htmlTitle: string;
  footerText: string;
  logoSvg: string;
}

const BRANDING_CONFIGS: Record<TenantId, BrandingConfig> = {
  simora: {
    appName: 'SIMORA',
    appFullName: 'SIMORA Health - Sistema de Información',
    primaryColor: '#c2703a',
    secondaryColor: '#d97b3a',
    htmlTitle: 'SIMORA - Registro Local de Prestaciones',
    footerText: 'SimoraAvantcare SPA',
    logoSvg: `<svg width="80" height="80" viewBox="0 0 56 56">
      <path d="M28 8C28 8 32 18 32 26C32 34 28 40 28 40C28 40 24 34 24 26C24 18 28 8 28 8Z" fill="#c2703a"/>
      <path d="M28 40C28 40 18 36 14 28C10 20 12 12 12 12C12 12 20 14 24 22C28 30 28 40 28 40Z" fill="#d97b3a" opacity="0.85"/>
      <path d="M28 40C28 40 38 36 42 28C46 20 44 12 44 12C44 12 36 14 32 22C28 30 28 40 28 40Z" fill="#d97b3a" opacity="0.85"/>
      <path d="M18 44C18 44 22 40 28 40C34 40 38 44 38 44" stroke="#c2703a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  raices: {
    appName: 'RAÍCES',
    appFullName: 'RAÍCES Health - Sistema de Registro COSAM',
    primaryColor: '#2d5a3d',
    secondaryColor: '#4a7c59',
    htmlTitle: 'RAÍCES - Sistema de Registro COSAM',
    footerText: 'COSAM Raíces - Salud Mental Comunitaria',
    logoSvg: `<svg width="80" height="80" viewBox="0 0 56 56">
      <path d="M28 8L28 24" stroke="#2d5a3d" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="14" r="6" fill="#4a7c59" opacity="0.8"/>
      <path d="M28 24C28 24 18 30 14 40C10 48 12 52 12 52" stroke="#2d5a3d" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M28 24C28 24 38 30 42 40C46 48 44 52 44 52" stroke="#2d5a3d" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M22 30C22 30 16 36 14 44" stroke="#4a7c59" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M34 30C34 30 40 36 42 44" stroke="#4a7c59" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  }
};

export const getBrandingConfig = (): BrandingConfig => {
  return BRANDING_CONFIGS[getCurrentTenant()];
};
