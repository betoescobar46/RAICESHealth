import { User } from './types';

export const USERS: User[] = [
    { id: 1, username: '99999999-9', password: '1234', name: 'Administrador', role: 'admin', title: 'Admin', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 2, username: '18123456-7', password: '1234', name: 'Katherine Labra', role: 'profesional', title: 'Psicólogo / Psicóloga', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 3, username: '19234567-8', password: '1234', name: 'Evelyn González', role: 'profesional', title: 'Psicólogo / Psicóloga', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 4, username: '20345678-9', password: '1234', name: 'Elías Sandoval', role: 'profesional', title: 'Psicólogo / Psicóloga', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    {
        id: 5,
        username: '17685576-2',
        password: '1234',
        name: 'Humberto Escobar',
        role: 'profesional',
        title: 'Psiquiatra Adultos',
        failedLoginAttempts: 0,
        isLocked: false,
        lockoutUntil: null,
        centroAtencion: 'cosam-maule',
        themeColor: 'purple',
        availableProfiles: [
            {
                id: 'cosam',
                name: 'COSAM Maule',
                centroAtencion: 'cosam-maule',
                themeColor: 'purple',
                description: 'Atención en COSAM Maule'
            },
            {
                id: 'extrasistema',
                name: 'Extrasistema',
                centroAtencion: 'extrasistema',
                themeColor: 'teal',
                description: 'Consulta privada / Extrasistema'
            }
        ],
        activeProfileId: 'cosam'
    },
    { id: 6, username: '15987654-3', password: '1234', name: 'Michael Acuña', role: 'profesional', title: 'Psiquiatra Adultos', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 7, username: '14876543-2', password: '1234', name: 'Anita Infante', role: 'profesional', title: 'Psiquiatra Infanto-Juvenil', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 9, username: '13654321-K', password: '1234', name: 'Héctor López', role: 'profesional', title: 'Trabajador Social / Trabajadora Social', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 10, username: '12543210-9', password: '1234', name: 'Maritza Martínez', role: 'profesional', title: 'Trabajador Social / Trabajadora Social', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 11, username: '11432109-8', password: '1234', name: 'Gloria Ramírez', role: 'profesional', title: 'Terapeuta Ocupacional', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 12, username: '10321098-7', password: '1234', name: 'Erika Rojas', role: 'profesional', title: 'Terapeuta Ocupacional', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 13, username: '9210987-6', password: '1234', name: 'María José Chandía', role: 'profesional', title: 'Educadora Diferencial', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 14, username: '8109876-5', password: '1234', name: 'Ana Pérez', role: 'profesional', title: 'Psicopedagoga', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 15, username: '88888888-8', password: '1234', name: 'Usuario Estadísticas', role: 'estadistica', title: 'Estadísticas', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 16, username: '1234-4', password: '1234', name: 'Usuario de Prueba', role: 'profesional', title: 'Psicólogo / Psicóloga', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 17, username: '7123456-7', password: '1234', name: 'Francisca Fuentes', role: 'profesional', title: 'Enfermera', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 18, username: '6123456-8', password: '1234', name: 'Constanza González', role: 'profesional', title: 'TENS', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    { id: 19, username: '16120432-3', password: '1234', name: 'Paula Hernandez', role: 'profesional', title: 'Psicóloga', failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
];