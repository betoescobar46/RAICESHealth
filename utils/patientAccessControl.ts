import { User, Patient } from '../types';

/**
 * Filtra la lista de pacientes según los permisos del usuario
 * - Administradores (role: 'admin'): Ven todos los pacientes
 * - Profesionales sin allowedPatients definido: Ven todos los pacientes
 * - Usuarios con allowedPatients definido: Solo ven los pacientes en su lista
 */
export function filterPatientsByAccess(patients: Patient[], user: User): Patient[] {
    // Normalizar el role a minúsculas para comparaciones
    const normalizedRole = user.role.toLowerCase();

    // Si es admin, puede ver todos los pacientes
    if (normalizedRole === 'admin') {
        return patients;
    }

    // Si tiene allowedPatients definido, filtrar solo esos
    if (user.allowedPatients && user.allowedPatients.length > 0) {
        return patients.filter(patient =>
            user.allowedPatients!.includes(patient.firestoreId)
        );
    }

    // Si es profesional o médico sin restricciones, ve todos los pacientes
    if (normalizedRole === 'profesional' || normalizedRole === 'medico') {
        return patients;
    }

    // Para otros roles (estadística, etc.), no ven pacientes por defecto
    return [];
}

/**
 * Verifica si un usuario tiene acceso a un paciente específico
 */
export function hasAccessToPatient(patientId: string, user: User): boolean {
    // Normalizar el role a minúsculas para comparaciones
    const normalizedRole = user.role.toLowerCase();

    // Admin tiene acceso a todos
    if (normalizedRole === 'admin') {
        return true;
    }

    // Médicos y profesionales tienen acceso a todos por defecto
    if (normalizedRole === 'medico' || normalizedRole === 'profesional') {
        return true;
    }

    // Verificar si está en la lista de pacientes permitidos
    return user.allowedPatients?.includes(patientId) || false;
}

/**
 * Obtiene la lista de pacientes disponibles para asignar a un usuario
 * (útil para la interfaz de administración)
 */
export function getAvailablePatientsForAssignment(patients: Patient[]): Patient[] {
    return patients.sort((a, b) => a.nombre.localeCompare(b.nombre));
}
