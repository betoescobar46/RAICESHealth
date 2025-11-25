import { Patient } from './types';

/**
 * Pool of 5 fictional patients for testing and demonstration
 */
export const MOCK_PATIENTS: Patient[] = [
  {
    firestoreId: 'patient-001',
    ficha: 1001,
    nombre: 'María González Rodríguez',
    rut: '15234567-8',
    edad: 34,
    sexo: 'Femenino',
    identidadGenero: 'Mujer cisgénero',
    fechaNacimiento: '1990-05-15',
    direccion: 'Calle Principal 456, Talca',
    comuna: 'Talca',
    lat: -35.4267,
    lon: -71.6566,
    telefonos: ['912345678', '712345678'],
    email: 'maria.gonzalez@email.com',
    tutor: 'No aplica',
    ocupacion: 'Enfermera',
    dispositivoAPS: 'Centro de Salud Familiar Oriente',
    alergias: 'Penicilina',
    ram: 'Reacciones alérgicas a antibióticos',
    objetivosTerapeuticos: 'Manejo del estrés y ansiedad',
    diagnostico: {
      saludMental: 'F32.1 - Episodio depresivo moderado',
      morbilidadMedica: 'E11 - Diabetes mellitus tipo 2',
      factoresPsicosociales: 'Z55.8 - Problemas relacionados con educación'
    },
    farmacos: [
      { nombre: 'Sertralina', dosis: '50mg cada 12 horas' },
      { nombre: 'Metformina', dosis: '1000mg cada 8 horas' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false
  },
  {
    firestoreId: 'patient-002',
    ficha: 1002,
    nombre: 'Juan Carlos Fernández López',
    rut: '18456789-5',
    edad: 28,
    sexo: 'Masculino',
    identidadGenero: 'Hombre cisgénero',
    fechaNacimiento: '1996-08-22',
    direccion: 'Avenida Secundaria 123, Curicó',
    comuna: 'Curicó',
    lat: -35.3084,
    lon: -71.2387,
    telefonos: ['987654321'],
    email: 'jcarlos.fernandez@email.com',
    tutor: 'No aplica',
    ocupacion: 'Técnico en electrónica',
    dispositivoAPS: 'Centro de Salud Familiar Poniente',
    alergias: 'Ninguna conocida',
    ram: 'Ninguna reportada',
    objetivosTerapeuticos: 'Control de síntomas ansiosos y mejora del sueño',
    diagnostico: {
      saludMental: 'F41.2 - Trastorno de ansiedad mixto',
      morbilidadMedica: 'I10 - Hipertensión esencial',
      factoresPsicosociales: 'Z60.2 - Problemas relacionados con vida laboral'
    },
    farmacos: [
      { nombre: 'Venlafaxina', dosis: '75mg cada 24 horas' },
      { nombre: 'Amlodipino', dosis: '5mg cada 24 horas' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false
  },
  {
    firestoreId: 'patient-003',
    ficha: 1003,
    nombre: 'Claudia Inés Martínez Riquelme',
    rut: '12678901-2',
    edad: 52,
    sexo: 'Femenino',
    identidadGenero: 'Mujer cisgénero',
    fechaNacimiento: '1972-03-10',
    direccion: 'Pasaje Sur 789, Maule',
    comuna: 'Maule',
    lat: -35.5500,
    lon: -71.6500,
    telefonos: ['976543210', '712345679'],
    email: 'claudia.martinez@email.com',
    tutor: 'No aplica',
    ocupacion: 'Profesora jubilada',
    dispositivoAPS: 'Centro de Salud Comunitario Maule',
    alergias: 'AINE',
    ram: 'Úlceras gástricas',
    objetivosTerapeuticos: 'Estabilización del ánimo y reintegro social',
    diagnostico: {
      saludMental: 'F33.1 - Trastorno depresivo recurrente, episodio actual moderado',
      morbilidadMedica: 'K29.7 - Gastritis crónica sin hemorragia',
      factoresPsicosociales: 'Z60.0 - Problemas relacionados con aislamiento social'
    },
    farmacos: [
      { nombre: 'Amitriptilina', dosis: '25mg cada 12 horas' },
      { nombre: 'Omeprazol', dosis: '20mg cada 12 horas' }
    ],
    pensionDiscapacidad: true,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false
  },
  {
    firestoreId: 'patient-004',
    ficha: 1004,
    nombre: 'Roberto Miguel Soto Vergara',
    rut: '17890234-9',
    edad: 41,
    sexo: 'Masculino',
    identidadGenero: 'Hombre cisgénero',
    fechaNacimiento: '1983-11-05',
    direccion: 'Calle Norte 234, Linares',
    comuna: 'Linares',
    lat: -35.8497,
    lon: -71.5542,
    telefonos: ['965432101'],
    email: 'rmiguel.soto@email.com',
    tutor: 'No aplica',
    ocupacion: 'Chofer profesional',
    dispositivoAPS: 'Centro de Salud Familiar Linares',
    alergias: 'Ninguna conocida',
    ram: 'Ninguna reportada',
    objetivosTerapeuticos: 'Reducción del consumo de alcohol y estabilidad emocional',
    diagnostico: {
      saludMental: 'F10.1 - Trastorno por uso de alcohol, forma moderada',
      morbilidadMedica: 'E78.5 - Hiperlipidemias mixtas',
      factoresPsicosociales: 'Z59.9 - Problemas relacionados con vivienda e integración social'
    },
    farmacos: [
      { nombre: 'Naltrexona', dosis: '50mg cada 24 horas' },
      { nombre: 'Atorvastatina', dosis: '20mg cada 24 horas' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false
  },
  {
    firestoreId: 'patient-005',
    ficha: 1005,
    nombre: 'Daniela Alejandra Silva Contreras',
    rut: '19123456-3',
    edad: 26,
    sexo: 'Femenino',
    identidadGenero: 'Mujer cisgénero',
    fechaNacimiento: '1998-07-30',
    direccion: 'Avenida Central 567, Talca',
    comuna: 'Talca',
    lat: -35.4267,
    lon: -71.6566,
    telefonos: ['998765432', '712345680'],
    email: 'daniela.silva@email.com',
    tutor: 'Madre - Rosa Contreras García',
    ocupacion: 'Estudiante de Psicología',
    dispositivoAPS: 'Centro de Salud Familiar Oriente',
    alergias: 'Sulfamidas',
    ram: 'Exantema alérgico',
    objetivosTerapeuticos: 'Manejo de fobia social y mejora de habilidades interpersonales',
    diagnostico: {
      saludMental: 'F40.10 - Fobia social (trastorno de ansiedad social)',
      morbilidadMedica: 'Z00 - Examen general de salud sin hallazgos anormales',
      factoresPsicosociales: 'Z55.0 - Problemas asociados con educación'
    },
    farmacos: [
      { nombre: 'Paroxetina', dosis: '20mg cada 24 horas' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false
  }
];

/**
 * Pacientes de COSAM Maule - Para el Dr. Humberto Escobar
 */
export const COSAM_MAULE_PATIENTS: Patient[] = [
  {
    firestoreId: 'cosam-patient-001',
    ficha: 2001,
    nombre: 'Rosa Elena Morales Díaz',
    rut: '12345678-9',
    edad: 52,
    sexo: 'Femenino',
    identidadGenero: 'Mujer cisgénero',
    fechaNacimiento: '1972-03-10',
    direccion: 'Calle Los Aromos 234, Maule',
    comuna: 'Maule',
    lat: -35.5236,
    lon: -71.6995,
    telefonos: ['987654321'],
    email: 'rosa.morales@email.com',
    tutor: 'No aplica',
    ocupacion: 'Dueña de casa',
    dispositivoAPS: 'COSAM Maule',
    alergias: 'Ninguna conocida',
    ram: 'No reportadas',
    objetivosTerapeuticos: 'Estabilización del ánimo, manejo de síntomas psicóticos',
    diagnostico: {
      saludMental: 'F31.6 - Trastorno afectivo bipolar, episodio actual mixto',
      morbilidadMedica: 'I10 - Hipertensión esencial',
      factoresPsicosociales: 'Z63.0 - Problemas en la relación con la pareja'
    },
    farmacos: [
      { nombre: 'Litio', dosis: '900mg cada 24 horas' },
      { nombre: 'Quetiapina', dosis: '200mg cada 12 horas' },
      { nombre: 'Enalapril', dosis: '10mg cada 24 horas' }
    ],
    pensionDiscapacidad: true,
    credencialDiscapacidad: true,
    consumoActivoDrogas: false,
    centroAtencion: 'cosam-maule'
  },
  {
    firestoreId: 'cosam-patient-002',
    ficha: 2002,
    nombre: 'Pedro Antonio Soto Ramírez',
    rut: '14567890-3',
    edad: 41,
    sexo: 'Masculino',
    identidadGenero: 'Hombre cisgénero',
    fechaNacimiento: '1983-07-22',
    direccion: 'Avenida Principal 567, Maule',
    comuna: 'Maule',
    lat: -35.5310,
    lon: -71.7021,
    telefonos: ['976543210'],
    email: 'pedro.soto@email.com',
    tutor: 'No aplica',
    ocupacion: 'Trabajador agrícola',
    dispositivoAPS: 'COSAM Maule',
    alergias: 'Sulfonamidas',
    ram: 'Erupción cutánea con sulfonamidas',
    objetivosTerapeuticos: 'Control de síntomas positivos, mejorar funcionalidad social',
    diagnostico: {
      saludMental: 'F20.0 - Esquizofrenia paranoide',
      morbilidadMedica: 'Z00 - Examen general sin hallazgos anormales',
      factoresPsicosociales: 'Z59.0 - Falta de vivienda'
    },
    farmacos: [
      { nombre: 'Risperidona', dosis: '3mg cada 12 horas' },
      { nombre: 'Biperideno', dosis: '2mg cada 8 horas' }
    ],
    pensionDiscapacidad: true,
    credencialDiscapacidad: true,
    consumoActivoDrogas: false,
    centroAtencion: 'cosam-maule'
  },
  {
    firestoreId: 'cosam-patient-003',
    ficha: 2003,
    nombre: 'Carmen Gloria Vásquez Torres',
    rut: '16789012-7',
    edad: 35,
    sexo: 'Femenino',
    identidadGenero: 'Mujer cisgénero',
    fechaNacimiento: '1989-11-05',
    direccion: 'Pasaje Los Copihues 89, Maule',
    comuna: 'Maule',
    lat: -35.5190,
    lon: -71.6950,
    telefonos: ['965432109', '712345679'],
    email: 'carmen.vasquez@email.com',
    tutor: 'No aplica',
    ocupacion: 'Comerciante',
    dispositivoAPS: 'COSAM Maule',
    alergias: 'Ninguna conocida',
    ram: 'No reportadas',
    objetivosTerapeuticos: 'Manejo de ansiedad y pánico, reducción de consumo de alcohol',
    diagnostico: {
      saludMental: 'F41.0 - Trastorno de pánico',
      morbilidadMedica: 'Z00 - Examen general sin hallazgos anormales',
      factoresPsicosociales: 'Z72.1 - Uso de alcohol'
    },
    farmacos: [
      { nombre: 'Clonazepam', dosis: '0.5mg cada 8 horas' },
      { nombre: 'Fluoxetina', dosis: '20mg cada 24 horas' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: true,
    centroAtencion: 'cosam-maule'
  }
];

/**
 * Pacientes de Extrasistema - Para el Dr. Humberto Escobar (Consulta Privada)
 */
export const EXTRASISTEMA_PATIENTS: Patient[] = [
  {
    firestoreId: 'extra-patient-001',
    ficha: 3001,
    nombre: 'Andrés Felipe Gutiérrez Mora',
    rut: '18234567-1',
    edad: 38,
    sexo: 'Masculino',
    identidadGenero: 'Hombre cisgénero',
    fechaNacimiento: '1986-04-15',
    direccion: 'Las Condes, Santiago',
    comuna: 'Las Condes',
    lat: -33.4172,
    lon: -70.5847,
    telefonos: ['998765432'],
    email: 'andres.gutierrez@empresa.cl',
    tutor: 'No aplica',
    ocupacion: 'Ejecutivo comercial',
    dispositivoAPS: 'Consulta Privada',
    alergias: 'Ninguna conocida',
    ram: 'No reportadas',
    objetivosTerapeuticos: 'Manejo de estrés laboral, ansiedad generalizada',
    diagnostico: {
      saludMental: 'F41.1 - Trastorno de ansiedad generalizada',
      morbilidadMedica: 'Z00 - Examen general sin hallazgos anormales',
      factoresPsicosociales: 'Z56.6 - Problemas relacionados con el trabajo'
    },
    farmacos: [
      { nombre: 'Escitalopram', dosis: '10mg cada 24 horas' },
      { nombre: 'Clonazepam', dosis: '0.25mg cada 12 horas SOS' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false,
    centroAtencion: 'extrasistema'
  },
  {
    firestoreId: 'extra-patient-002',
    ficha: 3002,
    nombre: 'María Fernanda Rojas Ulloa',
    rut: '19876543-2',
    edad: 32,
    sexo: 'Femenino',
    identidadGenero: 'Mujer cisgénero',
    fechaNacimiento: '1992-09-20',
    direccion: 'Providencia, Santiago',
    comuna: 'Providencia',
    lat: -33.4309,
    lon: -70.6133,
    telefonos: ['987654321', '223456789'],
    email: 'm.rojas@email.com',
    tutor: 'No aplica',
    ocupacion: 'Arquitecta',
    dispositivoAPS: 'Consulta Privada',
    alergias: 'Ninguna conocida',
    ram: 'No reportadas',
    objetivosTerapeuticos: 'Tratamiento de depresión post-parto, apoyo en maternidad',
    diagnostico: {
      saludMental: 'F53.0 - Trastornos mentales y del comportamiento leves asociados con el puerperio',
      morbilidadMedica: 'Z39.2 - Atención y examen de salud posparto',
      factoresPsicosociales: 'Z63.1 - Problemas en la relación con los padres y la familia política'
    },
    farmacos: [
      { nombre: 'Sertralina', dosis: '50mg cada 24 horas' }
    ],
    pensionDiscapacidad: false,
    credencialDiscapacidad: false,
    consumoActivoDrogas: false,
    centroAtencion: 'extrasistema'
  }
];
