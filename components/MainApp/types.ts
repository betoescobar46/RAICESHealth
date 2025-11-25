export type View =
    | 'registro'
    | 'calendario'
    | 'estadisticas'
    | 'patientIndex'
    | 'admin'
    | 'anexos'
    | 'buscar'
    | 'ingresarPrestacion'
    | 'actividadReciente'
    | 'ingresarActividad'
    | 'news';

export interface NavItem {
    key: string;
    label: string;
    view: string;
}

export interface NavShortcutMap {
    [key: string]: string;
}
