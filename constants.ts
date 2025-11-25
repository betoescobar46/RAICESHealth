import { Farmaco } from './types';

export const COMUNAS_MAULE = [
  'Talca',
  'Maule',
  'Cauquenes',
  'Chanco',
  'Colbún',
  'Constitución',
  'Curepto',
  'Curicó',
  'Empedrado',
  'Hualañé',
  'Licantén',
  'Linares',
  'Longaví',
  'Molina',
  'Parral',
  'Pelarco',
  'Pelluhue',
  'Pencahue',
  'Rauco',
  'Retiro',
  'Río Claro',
  'Romeral',
  'Sagrada Familia',
  'San Clemente',
  'San Javier de Loncomilla',
  'San Rafael',
  'Teno',
  'Vichuquén',
  'Villa Alegre',
  'Yerbas Buenas',
];

export const DISPOSITIVOS_APS = [
  'CESFAM Maule',
  'CECOSF Villa Francia',
  'Posta Salud Rural Quiñipeumo',
  'CESFAM Talca Norte',
  'CESFAM La Florida (Talca)',
  'Otro',
];

export const COMUNA_COORDINATES: Record<string, { lat: number; lon: number }> = {
  'Talca': { lat: -35.428, lon: -71.655 },
  'Maule': { lat: -35.525, lon: -71.704 },
  'Cauquenes': { lat: -35.967, lon: -72.317 },
  'Curicó': { lat: -34.984, lon: -71.238 },
  'Linares': { lat: -35.845, lon: -71.594 },
  'Constitución': { lat: -35.333, lon: -72.413 },
  'San Clemente': { lat: -35.541, lon: -71.488 },
  'San Javier de Loncomilla': { lat: -35.594, lon: -71.741 },
  'Molina': { lat: -35.115, lon: -71.285 },
  'Parral': { lat: -36.143, lon: -71.825 },
  'default': { lat: -35.5, lon: -71.6 },
};

// --- Prestaciones Configuration ---

/**
 * A master list of all possible prestacion types in the system. All are configurable by an admin.
 * This serves as the initial seed data if no configuration is found in local storage.
 */
export const INITIAL_ALL_PRESTACIONES = [
    'Actividad comunitaria',
    'Administración de inyectable',
    'Aplicación de test de orina',
    'Asistencia a tribunal',
    'Consulta de enfermería',
    'Consulta de terapia ocupacional',
    'Control (Psicopedagoga)',
    'Control (TS)',
    'Control de Psicólogo',
    'Control de Psiquiatra',
    'Control de salud mental (Ed. Diferencial)',
    'Control de salud mental (Psicólogo)',
    'Control de signos vitales',
    'Coordinación intersectorial',
    'Despacho de fármaco a domicilio',
    'Egreso de lista de espera',
    'Egreso: Abandono de Tratamiento',
    'Egreso: Alta Clínica',
    'Egreso: Fallecimiento',
    'Egreso: Traslado',
    'Evaluación psicopedagógica',
    'Ingreso Multidisciplinario',
    'Informe a tribunales',
    'Informe biomédico funcional',
    'Informe médico',
    'Informe para pensión de discapacidad',
    'Informe psicopedagógico',
    'Informe social (otros fines)',
    'Informe social y de red de apoyo',
    'Intervención grupal (TS)',
    'Intervención psicosocial grupal',
    'Llamado telefónico',
    'NSP (No se presenta)',
    'PAP (Primeros Auxilios Psicológicos)',
    'PCI (Plan de Cuidado Integral)',
    'Psicometría',
    'Psicoterapia grupal',
    'Psicoterapia individual',
    'Receta',
    'Rescate telefónico',
    'Rescates',
    'Terapia familiar',
    'Visita domiciliaria',
].sort();


/**
 * Maps user titles (profiles) to the prestaciones they are allowed to perform by default.
 * This serves as the initial configuration if no custom settings are found in local storage.
 */
export const DEFAULT_PRESTACION_PERFIL_MAP: Record<string, string[]> = {
    'Psiquiatra Adultos': ['Control de Psiquiatra', 'Ingreso Multidisciplinario', 'Receta', 'Informe médico', 'PCI (Plan de Cuidado Integral)', 'Asistencia a tribunal', 'NSP (No se presenta)', 'Egreso: Alta Clínica', 'Egreso: Abandono de Tratamiento', 'Egreso: Traslado', 'Egreso: Fallecimiento'],
    'Psiquiatra Infanto-Juvenil': ['Control de Psiquiatra', 'Ingreso Multidisciplinario', 'Receta', 'Informe médico', 'PCI (Plan de Cuidado Integral)', 'Asistencia a tribunal', 'NSP (No se presenta)', 'Egreso: Alta Clínica', 'Egreso: Abandono de Tratamiento', 'Egreso: Traslado', 'Egreso: Fallecimiento'],
    'Médico en formación (Psiquiatría Infantojuvenil)': ['Control de Psiquiatra', 'Ingreso Multidisciplinario', 'Receta', 'Informe médico', 'PCI (Plan de Cuidado Integral)', 'NSP (No se presenta)', 'Egreso: Alta Clínica', 'Egreso: Abandono de Tratamiento', 'Egreso: Traslado', 'Egreso: Fallecimiento'],
    'Psicólogo / Psicóloga': ['Psicoterapia individual', 'Visita domiciliaria', 'Control de salud mental (Psicólogo)', 'Terapia familiar', 'Rescate telefónico', 'Psicoterapia grupal', 'Intervención psicosocial grupal', 'Psicometría', 'PAP (Primeros Auxilios Psicológicos)', 'PCI (Plan de Cuidado Integral)', 'Informe a tribunales', 'NSP (No se presenta)'],
    'Trabajador Social / Trabajadora Social': ['Control (TS)', 'Visita domiciliaria', 'Coordinación intersectorial', 'Informe social y de red de apoyo', 'Informe social (otros fines)', 'Informe para pensión de discapacidad', 'Rescates', 'Intervención grupal (TS)', 'Actividad comunitaria', 'PCI (Plan de Cuidado Integral)', 'Asistencia a tribunal', 'NSP (No se presenta)'],
    'Terapeuta Ocupacional': ['Consulta de terapia ocupacional', 'Visita domiciliaria', 'Intervención psicosocial grupal', 'PAP (Primeros Auxilios Psicológicos)', 'PCI (Plan de Cuidado Integral)', 'NSP (No se presenta)'],
    'Enfermera': ['Consulta de enfermería', 'Visita domiciliaria', 'Llamado telefónico', 'Egreso de lista de espera', 'PAP (Primeros Auxilios Psicológicos)', 'PCI (Plan de Cuidado Integral)', 'NSP (No se presenta)'],
    'TENS': ['Despacho de fármaco a domicilio', 'Administración de inyectable', 'Aplicación de test de orina', 'Control de signos vitales', 'NSP (No se presenta)'],
    'Educadora Diferencial': ['Informe psicopedagógico', 'Control de salud mental (Ed. Diferencial)', 'Visita domiciliaria', 'PCI (Plan de Cuidado Integral)', 'NSP (No se presenta)'],
    'Psicopedagoga': ['Evaluación psicopedagógica', 'Control (Psicopedagoga)', 'PCI (Plan de Cuidado Integral)', 'NSP (No se presenta)'],
};


/**
 * A list of non-patient-facing activities for logging general work time.
 */
export const GENERAL_ACTIVITIES = [
    'Reunión Clínica',
    'Reunión Administrativa (COSAM)',
    'Reunión de Red (Intersector)',
    'Capacitación / Formación',
    'Trabajo Administrativo',
    'Coordinación Territorial',
    'Otro (especificar en observaciones)',
].sort();


/**
 * A standardized list of reasons for patient no-shows (NSP).
 */
export const NSP_REASONS = [
  'Desconocido',
  'Olvido de hora',
  'Dificultad económica',
  'Dificultad de movilización',
  'Sin interés en la atención',
  'Coincidencia con otra hora de salud',
  'Enfermedad (propia o de familiar)',
  'Dificultad para obtener permiso laboral',
  'Motivos académicos',
  'Sintomatología psiquiátrica descompensada',
  'Otro (especificar)',
];

/**
 * A master list of all possible drugs, serving as the initial seed data.
 * Based on the "Listado de Fármacos Disponibles en COSAM (2025)".
 * The `disponibleAPS` flag is determined by cross-referencing with the Maule APS list.
 */
export const INITIAL_FARMACOS: Farmaco[] = [
    { id: 'f1', nombre: 'Ácido Valproico', disponibleAPS: true },
    { id: 'f2', nombre: 'Alprazolam', disponibleAPS: true },
    { id: 'f3', nombre: 'Amitriptilina', disponibleAPS: true },
    { id: 'f4', nombre: 'Aripiprazol', disponibleAPS: true },
    { id: 'f5', nombre: 'Bupropión', disponibleAPS: true },
    { id: 'f6', nombre: 'Carbamazepina', disponibleAPS: true },
    { id: 'f7', nombre: 'Citalopram', disponibleAPS: true },
    { id: 'f8', nombre: 'Clomipramina', disponibleAPS: true },
    { id: 'f9', nombre: 'Clonazepam', disponibleAPS: true },
    { id: 'f10', nombre: 'Clorpromazina', disponibleAPS: true },
    { id: 'f11', nombre: 'Clotiazepam', disponibleAPS: false },
    { id: 'f12', nombre: 'Diazepam', disponibleAPS: true },
    { id: 'f13', nombre: 'Disulfiram', disponibleAPS: false },
    { id: 'f14', nombre: 'Donepezilo', disponibleAPS: false },
    { id: 'f15', nombre: 'Duloxetina', disponibleAPS: false },
    { id: 'f16', nombre: 'Escitalopram', disponibleAPS: true },
    { id: 'f17', nombre: 'Eszopiclona', disponibleAPS: false },
    { id: 'f18', nombre: 'Flufenazina', disponibleAPS: true },
    { id: 'f19', nombre: 'Flupentixol Depot', disponibleAPS: false },
    { id: 'f20', nombre: 'Fluoxetina', disponibleAPS: true },
    { id: 'f21', nombre: 'Haloperidol', disponibleAPS: true },
    { id: 'f22', nombre: 'Imipramina', disponibleAPS: true },
    { id: 'f23', nombre: 'Lamotrigina', disponibleAPS: true },
    { id: 'f24', nombre: 'Levotiroxina Sódica', disponibleAPS: true },
    { id: 'f25', nombre: 'Litio Carbonato', disponibleAPS: true },
    { id: 'f26', nombre: 'Lorazepam', disponibleAPS: true },
    { id: 'f27', nombre: 'Melatonina', disponibleAPS: false },
    { id: 'f28', nombre: 'Metformina', disponibleAPS: true },
    { id: 'f29', nombre: 'Metilfenidato Clorhidrato XR', disponibleAPS: false },
    { id: 'f30', nombre: 'Mirtazapina', disponibleAPS: true },
    { id: 'f31', nombre: 'Modafinilo', disponibleAPS: false },
    { id: 'f32', nombre: 'Olanzapina', disponibleAPS: true },
    { id: 'f33', nombre: 'Paliperidona', disponibleAPS: true },
    { id: 'f34', nombre: 'Paroxetina', disponibleAPS: true },
    { id: 'f35', nombre: 'Propranolol', disponibleAPS: true },
    { id: 'f36', nombre: 'Quetiapina', disponibleAPS: true },
    { id: 'f37', nombre: 'Risperidona', disponibleAPS: true },
    { id: 'f38', nombre: 'Sertralina', disponibleAPS: true },
    { id: 'f39', nombre: 'Sulpirida', disponibleAPS: true },
    { id: 'f40', nombre: 'Topiramato', disponibleAPS: true },
    { id: 'f41', nombre: 'Trazodona', disponibleAPS: true },
    { id: 'f42', nombre: 'Trihexifenidilo Clorhidrato', disponibleAPS: true },
    { id: 'f43', nombre: 'Venlafaxina', disponibleAPS: true },
    { id: 'f44', nombre: 'Venlafaxina XR', disponibleAPS: false }, // Updated based on common availability
    { id: 'f45', nombre: 'Vitaminas B1, B6, B12', disponibleAPS: false },
    { id: 'f46', nombre: 'Zolpidem', disponibleAPS: true },
    { id: 'f47', nombre: 'Zopiclona', disponibleAPS: false },
].sort((a, b) => a.nombre.localeCompare(b.nombre));


/**
 * Gets the list of available (enabled) prestacion types for a given user profile based on the current configuration.
 * @param profile The user's title string.
 * @param config The current prestacion configuration from the app's state.
 * @returns An array of prestacion type names.
 */
export const getPrestacionesForProfile = (profile: string, config: Record<string, string[]>): string[] => {
    return config[profile] || [];
};

/**
 * A curated list of common CIE-10 diagnoses for mental health, general medicine, and psychosocial factors.
 * This list is used for the autocomplete search functionality.
 */
export const CIE10_DIAGNOSES = [
    // F00-F09: Organic, including symptomatic, mental disorders
    { code: 'F00', name: 'Demencia en la enfermedad de Alzheimer' },
    { code: 'F01', name: 'Demencia vascular' },
    { code: 'F03', name: 'Demencia, no especificada' },
    { code: 'F06.7', name: 'Trastorno cognoscitivo leve' },
    { code: 'F07.0', name: 'Trastorno orgánico de la personalidad' },

    // F10-F19: Mental and behavioural disorders due to psychoactive substance use
    { code: 'F10.2', name: 'Trastornos mentales y del comportamiento debidos al uso de alcohol: síndrome de dependencia' },
    { code: 'F11.2', name: 'Trastornos mentales y del comportamiento debidos al uso de opiáceos: síndrome de dependencia' },
    { code: 'F12.2', name: 'Trastornos mentales y del comportamiento debidos al uso de cannabinoides: síndrome de dependencia' },
    { code: 'F13.2', name: 'Trastornos mentales y del comportamiento debidos al uso de sedantes o hipnóticos: síndrome de dependencia' },
    { code: 'F14.2', name: 'Trastornos mentales y del comportamiento debidos al uso de cocaína: síndrome de dependencia' },
    { code: 'F15.2', name: 'Trastornos mentales y del comportamiento debidos al uso de otros estimulantes, incluida la cafeína: síndrome de dependencia' },
    { code: 'F17.2', name: 'Trastornos mentales y del comportamiento debidos al uso de tabaco: síndrome de dependencia' },

    // F20-F29: Schizophrenia, schizotypal and delusional disorders
    { code: 'F20.0', name: 'Esquizofrenia paranoide' },
    { code: 'F20.9', name: 'Esquizofrenia, no especificada' },
    { code: 'F22.0', name: 'Trastorno delirante' },
    { code: 'F23', name: 'Trastornos psicóticos agudos y transitorios' },
    { code: 'F25', name: 'Trastornos esquizoafectivos' },

    // F30-F39: Mood [affective] disorders
    { code: 'F31', name: 'Trastorno afectivo bipolar' },
    { code: 'F31.1', name: 'Trastorno afectivo bipolar, episodio maníaco actual sin síntomas psicóticos' },
    { code: 'F31.4', name: 'Trastorno afectivo bipolar, episodio depresivo actual grave sin síntomas psicóticos' },
    { code: 'F31.6', name: 'Trastorno afectivo bipolar, episodio actual mixto' },
    { code: 'F32', name: 'Episodios depresivos' },
    { code: 'F32.0', name: 'Episodio depresivo leve' },
    { code: 'F32.1', name: 'Episodio depresivo moderado' },
    { code: 'F32.2', name: 'Episodio depresivo grave sin síntomas psicóticos' },
    { code: 'F32.3', name: 'Episodio depresivo grave con síntomas psicóticos' },
    { code: 'F33', name: 'Trastorno depresivo recurrente' },
    { code: 'F34.1', name: 'Distimia' },

    // F40-F48: Neurotic, stress-related and somatoform disorders
    { code: 'F40.0', name: 'Agorafobia' },
    { code: 'F40.1', name: 'Fobias sociales' },
    { code: 'F41.0', name: 'Trastorno de pánico [ansiedad paroxística episódica]' },
    { code: 'F41.1', name: 'Trastorno de ansiedad generalizada' },
    { code: 'F41.2', name: 'Trastorno mixto de ansiedad y depresión' },
    { code: 'F42', name: 'Trastorno obsesivo-compulsivo' },
    { code: 'F43.1', name: 'Trastorno de estrés postraumático' },
    { code: 'F43.2', name: 'Trastornos de adaptación' },
    { code: 'F45.0', name: 'Trastorno de somatización' },

    // F50-F59: Behavioural syndromes...
    { code: 'F50.0', name: 'Anorexia nerviosa' },
    { code: 'F50.2', name: 'Bulimia nerviosa' },

    // F60-F69: Disorders of adult personality and behaviour
    { code: 'F60.0', name: 'Trastorno paranoide de la personalidad' },
    { code: 'F60.1', name: 'Trastorno esquizoide de la personalidad' },
    { code: 'F60.2', name: 'Trastorno asocial de la personalidad' },
    { code: 'F60.3', name: 'Trastorno de inestabilidad emocional de la personalidad (Límite / Impulsivo)' },
    { code: 'F60.4', name: 'Trastorno histriónico de la personalidad' },
    { code: 'F60.5', name: 'Trastorno anancástico de la personalidad (Obsesivo-Compulsivo)' },
    { code: 'F60.6', name: 'Trastorno de la personalidad por evitación [ansiedad]' },
    { code: 'F60.7', name: 'Trastorno de la personalidad por dependencia' },

    // F70-F79: Mental retardation
    { code: 'F70', name: 'Retraso mental leve' },
    { code: 'F71', name: 'Retraso mental moderado' },
    { code: 'F72', name: 'Retraso mental grave' },

    // F80-F89: Disorders of psychological development
    { code: 'F84.0', name: 'Autismo en la niñez' },
    { code: 'F84.5', name: 'Síndrome de Asperger' },
    { code: 'F81', name: 'Trastornos específicos del desarrollo del aprendizaje escolar' },

    // F90-F98: Behavioural and emotional disorders...
    { code: 'F90.0', name: 'Trastorno de la actividad y de la atención (TDAH)' },
    { code: 'F91.3', name: 'Trastorno desafiante y oposicionista' },
    { code: 'F94.0', name: 'Mutismo selectivo' },
    { code: 'F95', name: 'Trastornos de tics' },

    // E00-E90: Endocrine, nutritional and metabolic diseases
    { code: 'E03.9', name: 'Hipotiroidismo, no especificado' },
    { code: 'E10', name: 'Diabetes mellitus insulinodependiente (Tipo 1)' },
    { code: 'E11', name: 'Diabetes mellitus no insulinodependiente (Tipo 2)' },
    { code: 'E66', name: 'Obesidad' },
    { code: 'E78.2', name: 'Hiperlipidemia mixta' },
    { code: 'E78.5', name: 'Hiperlipidemia, no especificada' },

    // G00-G99: Diseases of the nervous system
    { code: 'G30', name: 'Enfermedad de Alzheimer' },
    { code: 'G40', name: 'Epilepsia' },
    { code: 'G43', name: 'Migraña' },
    { code: 'G47.0', name: 'Trastornos del inicio y del mantenimiento del sueño [insomnios]' },
    { code: 'G47.3', name: 'Apnea del sueño' },

    // I00-I99: Diseases of the circulatory system
    { code: 'I10', name: 'Hipertensión esencial (primaria)' },
    { code: 'I25.1', name: 'Enfermedad ateroesclerótica del corazón' },
    { code: 'I50', name: 'Insuficiencia cardíaca' },
    { code: 'I63', name: 'Infarto cerebral' },

    // J00-J99: Diseases of the respiratory system
    { code: 'J44', name: 'Otras enfermedades pulmonares obstructivas crónicas (EPOC)' },
    { code: 'J45', name: 'Asma' },

    // K00-K93: Diseases of the digestive system
    { code: 'K21', name: 'Enfermedad del reflujo gastroesofágico' },
    { code: 'K58', name: 'Síndrome del intestino irritable' },

    // M00-M99: Diseases of the musculoskeletal system
    { code: 'M54.5', name: 'Lumbago no especificado' },
    { code: 'M79.7', name: 'Fibromialgia' },

    // R00-R99: Symptoms, signs and abnormal findings
    { code: 'R07.4', name: 'Dolor en el pecho, no especificado' },
    { code: 'R51', name: 'Cefalea' },
    { code: 'R52.2', name: 'Otro dolor crónico' },
    { code: 'R53', name: 'Malestar y fatiga' },

    // Z00-Z99: Factors influencing health status and contact with health services
    { code: 'Z03.2', name: 'Observación por sospecha de trastorno mental y del comportamiento' },
    { code: 'Z56.3', name: 'Ritmo de trabajo penoso' },
    { code: 'Z56.5', name: 'Desempleo, no especificado' },
    { code: 'Z59.5', name: 'Pobreza extrema' },
    { code: 'Z60.2', name: 'Problemas relacionados con la vida en soledad' },
    { code: 'Z62.8', name: 'Otros problemas especificados relacionados con la crianza del niño' },
    { code: 'Z63.0', name: 'Problemas en la relación con el cónyuge o la pareja' },
    { code: 'Z63.4', name: 'Desaparición o muerte de un miembro de la familia' },
    { code: 'Z63.5', name: 'Ruptura familiar por separación o divorcio' },
    { code: 'Z72.0', name: 'Uso de tabaco' },
    { code: 'Z73.0', name: 'Agotamiento (Burn-out)' },
    { code: 'Z91.5', name: 'Historia personal de autoagresión' },
];


// FIX: Add missing function to determine appointment duration.
export const getAppointmentDuration = (type: string): string | null => {
    switch (type) {
        case 'Control de Psiquiatra':
            return '30 min';
        case 'Ingreso Multidisciplinario':
            return '60 min';
        case 'Control de Psicólogo':
            return '45 min';
        case 'Visita domiciliaria':
            return '60 min';
        case 'Receta':
            return '15 min';
        case 'Informe médico':
            return '30 min';
        default:
            return null;
    }
};