export type TenantId = 'simora' | 'raices';

export const getCurrentTenant = (): TenantId => {
  const envTenant = import.meta.env.VITE_TENANT_ID as TenantId;
  return envTenant || 'raices'; // Default: raices
};

export const getCollectionName = (baseCollection: string): string => {
  const tenant = getCurrentTenant();

  // Colecciones compartidas (sin sufijo tenant)
  const sharedCollections = ['users', 'farmacos', 'psychiatryNews'];
  if (sharedCollections.includes(baseCollection)) {
    return baseCollection;
  }

  // Colecciones por tenant
  return `${baseCollection}_${tenant}`;
};
