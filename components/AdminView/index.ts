/**
 * AdminView Module - Exports
 *
 * Módulo refactorizado de administración con arquitectura modular
 */

// Main AdminView component (re-exported from parent directory)
export { default } from '../AdminView';

// User Management Components
export { UserManagementSection } from './UserManagement/UserManagementSection';
export { UserTable } from './UserManagement/UserTable';
export { AddUserModal } from './UserManagement/AddUserModal';
export { ChangePasswordModal } from './UserManagement/ChangePasswordModal';

// Prestacion Management Components
export { PrestacionManagementSection } from './PrestacionManagement/PrestacionManagementSection';
export { PrestacionConfigEditor } from './PrestacionManagement/PrestacionConfigEditor';
export { ProfileSelector } from './PrestacionManagement/ProfileSelector';
export { ActionButton } from './PrestacionManagement/ActionButton';

// Hooks
export { useUserManagement } from './hooks/useUserManagement';
export { usePrestacionManagement } from './hooks/usePrestacionManagement';
