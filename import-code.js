
// ============================================
// CÓDIGO DE IMPORTACIÓN - SIMORAHealth
// ============================================

// 1. Obtener pacientes actuales
const currentPatients = JSON.parse(localStorage.getItem('rlp_patients') || '[]');
console.log('Pacientes actuales:', currentPatients.length);

// 2. Cargar nuevos pacientes
const newPatients = [
  {
    "firestoreId": "patient_1763052417890_9s8ccefrv",
    "ficha": 1,
    "nombre": "Abigailt Troncoso Gonzalez",
    "rut": "15599048-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-05-16",
    "direccion": "Ingreso 28 oct 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "abigailt.stg@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Vive con esposo Raul 49 fiscalizador en SII + hijo Mateo 9 + madre (ocasional) Silvia 60 años dueña ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "20mg que luego bajó a 10mg vo, luego se lo cambiaron a fluoxetina (porque tuvo asociacion temporal a alza de peso), que un dia se le olvidó a inico de año y desde entonces no retomó. Alcanzó a tomar fluoxetina menos de un mes. Notó que al suspender escitalopram bajó de peso y cedió reaccion adversa de tipo sexual. Resultado de RM salió normal. Apetito normal."
      },
      {
        "nombre": "prednisona",
        "dosis": "20mg hace tres dias y ahora por 4 dias desde hoy subió a 40mg dia. Ademas paracetamol cada ocho horas."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: medio en la mañana, medio en la tarde (17.00hrs)"
      },
      {
        "nombre": "Seronex",
        "dosis": "50mg vo: medio en la mañana por seis dias, luego 1 cada mañana."
      },
      {
        "nombre": "sertac",
        "dosis": "50mg vo: 1 cada mañana. está haciendo el tto con vitamina D. retomó ejercicio hace tres semanas. El sueño de repente algo alterado , en ocasiones recurre a armonil y le da algo de estreñimiento. Vuelve en cinco dias al trabajo. Madre está en radioterapia, le queda una semana para empezar con quimioterapia. En ocasiones cierto mareo inespecifico, pero no vertigo como tal, pero si viene ahi cierta ansiedad anticipatoria, lo puntua como un 10% parecida. Logró suspender dilasedan, solo lo anda trayendo como sos, andaba en control rutinario de su quimio, en esa circunstancia fue. O sea, hay cierta sintomatologia ansiosa pero bien leve a su juicio. Igual aparecen pensamientos de ansiedad de si volviera el cancer. Lo relaciona en parte a noticia que vio hace poco de una persona que murió por recidiva de cáncer. Tomando zinc plus. Ya le pidieron exámenees de laboratorio y de imágenes."
      },
      {
        "nombre": "Minfel",
        "dosis": "18 mg vo: 1 cada mañana por 4 días, luego 2 cada mañana. Al cabo de llevar 8 días con 2 cada mañana, enviarme un mail contándome cómo se ha sentido."
      },
      {
        "nombre": "osmetil",
        "dosis": "36mg vo: 1 cada mañana, receta x1m."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417898_32wssht3i",
    "ficha": 2,
    "nombre": "Alberto Guerrero Bustamante",
    "rut": "9379452-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 28 diciembre 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56957861891"
    ],
    "email": "Alberto-guerrero@live.com",
    "tutor": "No aplica",
    "ocupacion": "Sugiero evaluación con médico general si cefalea se hace más frecuente.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "sert",
        "dosis": "50mg 1 al dia y zolpidem 10mg media en la noche (estuvo aprox 2 meses), Dra no le mandó más receta.Sintió beneficio parcial y muy leve. Su lm le dura hasta hoy 28, por dg de TAG. Hace aprox 2 meses y medio con LM."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: medio en la mañana, medio en la tarde (16.00hrs)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417903_ny4lsiv05",
    "ficha": 3,
    "nombre": "Alejandra Gatica Vallejos",
    "rut": "13790989-8",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 29 febrero 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56998488935"
    ],
    "email": "Algava.1980@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Dueña de casa, adm en centro medico 7am - 00hrs.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Prozac",
        "dosis": "20mg medio en la mañana por una semana y luego 1 cada mañana."
      },
      {
        "nombre": "Dominium",
        "dosis": "20mgvo 1-0-0"
      },
      {
        "nombre": "Subelan",
        "dosis": "75mg vo OR: 1-0-0"
      },
      {
        "nombre": "Zolpidem",
        "dosis": "12mg vo: 0-0-1"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo: 1/4 cada noche."
      },
      {
        "nombre": "retard",
        "dosis": "75mg vo: 1 cada mañana por 14 días. Luego suspender y continuar con depurol retard de 150mg vo: 1 cada mañana."
      },
      {
        "nombre": "samexid",
        "dosis": "50mg vo, envio receta."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417907_snq2lanl0",
    "ficha": 4,
    "nombre": "Alejandra Lucero Flores",
    "rut": "15088652-K",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 4 agosto 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56979379177",
      "+56948551282"
    ],
    "email": "janitalucero@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Con su jefa tenian una relacion de amistad, Alejandra de hecho es la madrina de su hijo. Comenta que",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Fluoxetina",
        "dosis": "20mg vo: 1/2 en la mañana por 6 días, luego 1 cada mañana por 2 semanas, luego 2 cada mañana. Enviarme reporte de cómo se ha sentido, cuando lleve 2 semanas tomando 1 comprimido entero de fluoxetina. Sugiero usar presentaciones de fluoxetina: Sostac o Dominium."
      },
      {
        "nombre": "Lorazepam",
        "dosis": "2mgvo: 1 cada noche."
      },
      {
        "nombre": "Topiramato",
        "dosis": "50mgvo: 1/2 cada noche por 10 dias, luego 1 cada noche (sugiero topamax o toprel)"
      },
      {
        "nombre": "Sostac",
        "dosis": "20mg vo: 2-0-0"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mg vo: 1 cada mañana, se agrega."
      },
      {
        "nombre": "osmetil",
        "dosis": "18mg vo: 1 en la mañana por cuatro dias, luego 2 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417914_umyjkkf25",
    "ficha": 5,
    "nombre": "Alejandra Verdugo Arevalo",
    "rut": "17146704-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 30 enero 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56995172967"
    ],
    "email": "averdugoarevalo@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "Profesora san javier san josé",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg, vuelta colombia tomando 20mg. Ademas eutiroxi 100mcg, anovulatorios microdosis generico."
      },
      {
        "nombre": "Dominium",
        "dosis": "20mg: 2-0-0, hace casi 1 mes y medio."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mg vo: 1 cada noche por dos semanas y luego suspender."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417916_c6igu981e",
    "ficha": 6,
    "nombre": "Alessandra Manzo Parada",
    "rut": "17040184-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56968676608"
    ],
    "email": "Alessmanzo28@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Vive con: papá jubilado 77 colectivo + madre 65 peluquera + hijo 11 años gonzalo + matilde 2 años + ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "actan",
        "dosis": "20mg día. Tomó aprox 1 caja."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417919_kn4191f7u",
    "ficha": 7,
    "nombre": "Alexander Vega Marchant",
    "rut": "pendiente-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 10 Jul 2021",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "alexander.vega.marchant@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "20mgvo 0-0-1_"
      },
      {
        "nombre": "rize",
        "dosis": "10mgvo ½ -0- ½"
      },
      {
        "nombre": "lexapro",
        "dosis": "10mgvo 0-0- ½ por 10 dias luego 0-0-2, le explico que no es lo habitual y que estamos adecuados en temporalidades y en otro contexto quiza hubiesemos esperado con los 10mg"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3 mg sos o medio comp sos"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417924_yugfwy9x7",
    "ficha": 8,
    "nombre": "Alexis Humberto Fernández Andrades",
    "rut": "12965201-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-07-23",
    "direccion": "Camino Quirihue, sector Las Margaritas, parcela 247, Cauquenes",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56975804093"
    ],
    "email": "afernandezandrades112@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Grupo familiar (composición): Esposa Cecilia (aprox. 45 años, dueña de casa), hija Magdalena (18 año",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sertralina",
        "dosis": "50 mg y Ciclobenzaprina 10 mg en CESFAM, que aún no inicia."
      },
      {
        "nombre": "Duloxetina",
        "dosis": "30 mg: 1 cada noche por 4 días, luego aumentar a 2 cada noche. Cuando se acabe la de 30 mg, seguir con Duloxetina 60 mg: 1 cada noche. Ciclobenzaprina 10 mg: 1/2 cada noche, suspender si produce mucho sueño. Indicación de no tomar sertralina."
      },
      {
        "nombre": "Ciclobenzaprina",
        "dosis": "10 mg: 1/2 cada noche, suspender si produce mucho sueño"
      },
      {
        "nombre": "Mirtazapina",
        "dosis": "30mg vo: 1/2 en la noche (inicia)"
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75mg vo: 1 cada mañana (inicia)"
      },
      {
        "nombre": "Amlodipino",
        "dosis": "5 mg (1 en la noche). Hoy le indicaron Celecoxib 200 mg, Sertralina 50 mg y Ciclobenzaprina 10 mg en CESFAM, que aún no inicia."
      },
      {
        "nombre": "hacia",
        "dosis": "60mg."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mg vo: 1/2 en la mañana por 4 días, luego 1 cada mañana por 10 días, luego 2 cada mañana hasta que se acabe la caja. Luego continuar con escitavitae 20mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417927_b4u4xddak",
    "ficha": 9,
    "nombre": "material psicoeducativo adherencia alexis fernandez",
    "rut": "pendiente-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "*   Comunique estos sentimientos a su esposa y a su médico. No está solo en este proceso.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417930_wwvozk6gx",
    "ficha": 10,
    "nombre": "Alfonso Luis Mella Guilarte",
    "rut": "23590065-3",
    "edad": 37,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1988-04-17",
    "direccion": "Ancud 2160, Arica",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Alfonsoluismellaguilarte@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Abogado/Administrativo Poder Judicial/estudiante de psicología",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "Tno mixto ansioso depresivo. Obs. Depresión recurrente.",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg\tdesde marzo 2025 aprox. Antes ya habia tomado."
      },
      {
        "nombre": "melatonina",
        "dosis": "3mg vo: 1 cada noche"
      },
      {
        "nombre": "Samexid",
        "dosis": "50mg, ezopiclona 3mg, escitalopram 10mg\tdesde marzo 2025 aprox. Antes ya habia tomado."
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg vo: 1 cada noche  (aumenta dosis de escitalopram)"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1/2 en la mañana y 1/2 en la tarde (16.00hrs) (inicia)"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "2mg vo: 1 cada noche (disminuye)"
      },
      {
        "nombre": "Concerta",
        "dosis": "54 mg vo: 1 cada mañana (inicia)"
      },
      {
        "nombre": "requiriendo",
        "dosis": "10mg en la noche, luego en la mañana y luego en la tarde. Gemita, compañera, es con quien se apoyan para presentar la tesis. Sin ideación suicida. Se siente con poca capacidad de autocontrol respecto a que algun estresor pueda gatillar alguna crisis de angustia o descompensación. Se siente traicionado por su psicologa que quiere que se vaya a hospitalizacion psiquiatrica. Hoy tuvo primera sesion con su nuevo psicologo, lo verá de nuevo la proxima semana. Ademas refiere que necesita informe para apelar a rechazo que le hizo isapre de su licencia medica. Se ha replanteado de si es saludable o no seguir tbjando en el poder judicial , querer rindiendo y cumplir con todo a costa de estimulantes."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mg vo: 1 1/2 cada noche."
      },
      {
        "nombre": "Minfel",
        "dosis": "54 mg vo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417932_v6bhdl0b3",
    "ficha": 11,
    "nombre": "Ana Maria Gonzalez del Rio",
    "rut": "pendiente-11",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "2 Norte 4793, Depto. 1301, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "anamagonde@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ocupación: Dueña de casa durante toda su vida",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "atorvastatina",
        "dosis": "20 mg 1 cada noche, Janumet XR 100/1000 mg, quetiapina 25 mg VO (½ cada noche, en uso reciente con buena respuesta). Existe duda sobre uso actual de Januvia 100 mg/día."
      },
      {
        "nombre": "Pristiq",
        "dosis": "100 mg VO 1 cada mañana, Jardiance 25 mg (½ comprimido al día), atorvastatina 20 mg 1 cada noche, Janumet XR 100/1000 mg, quetiapina 25 mg VO (½ cada noche, en uso reciente con buena respuesta). Existe duda sobre uso actual de Januvia 100 mg/día."
      },
      {
        "nombre": "ayunas",
        "dosis": "118 mg/dL. HbA1c 7.7% (se mantiene tratamiento actual). Ácido úrico 3.4 mg/dL. Pruebas hepáticas, albúmina, calcemia, fosfemia y cinética de hierro normales. Saturación de transferrina 19%. Hemograma: Hb 13.5, leucocitos y plaquetas normales. Ferritina 7.1 ng/mL (valor inferior al rango de referencia). TSH 1.81, T4 libre 1.13. Vitamina B12: 245 pg/mL (la paciente comenzó automedicación con B12 hace 5 días). Orina completa normal, salvo glucosuria esperable."
      },
      {
        "nombre": "Trittico",
        "dosis": "100 mg VO: ¼ comprimido cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417936_1w3kve09x",
    "ficha": 12,
    "nombre": "Ana María Prieto Parodi",
    "rut": "9259746-6",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Fundo San armando, Parral",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "amprietop@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Enviarme contacto y nombre de psicólogo tratante.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Lamotrigina",
        "dosis": "100mgvo: 0-0-1"
      },
      {
        "nombre": "clotiazepam",
        "dosis": "10mg que la calmó y la hizo dormir mejor. Se percibe sensible pero menos que antes que lloraba todos los dias. Niega consumo de marihuana (ultimo fue en noviembre). Impresiona cursando fase depresiva ** con sintomas de exaltacion (menos requerimiento de sueño, irritabilidad, ansiedad). Sin ideacion suicida, sin sintomas psicoticos."
      },
      {
        "nombre": "Diazepam",
        "dosis": "10mg vo: 1 cada 8 horas."
      },
      {
        "nombre": "Litio",
        "dosis": "300mgvo: 1-1-1"
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5mgvo: medio cada mañana por cuatro dias, luego 1 cada mañana por cuatro dias, luego 1 1/2 cada mañana por cuatro dias, luego 2 cada mañana. Enviarme reporte de cómo se ha sentido, cada cuatro días."
      },
      {
        "nombre": "Minfel",
        "dosis": "36 mg vo: 1 cada mañana"
      },
      {
        "nombre": "Arizol",
        "dosis": "5mg vo: 1/2 en la noche por 4 dias, luego 1 cada noche."
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mg vo: 1-0-0"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mg vo: 1/2 en la mañana por 10 días y luego suspender"
      },
      {
        "nombre": "risperdal",
        "dosis": "1mg vo: ½ en la noche por 4 días, luego 1 cada noche."
      },
      {
        "nombre": "Adax",
        "dosis": "1mg. 1 a 2 veces al día."
      },
      {
        "nombre": "propranolol",
        "dosis": "40mg vo: medio cada ocho horas"
      },
      {
        "nombre": "Luradon",
        "dosis": "20mg vo: 1 cada mañana por 10 días, luego 2 cada mañana hasta agotar la caja. Luego continuar con Luradon 40mg vo: 1 cada mañana."
      },
      {
        "nombre": "Trihexifenidilo",
        "dosis": "2mg: medio comprimido cada 8 horas por 3 días, luego aumentar a un comprimido cada 8 horas."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417938_ibfq6jxsn",
    "ficha": 13,
    "nombre": "Ana María Veliz",
    "rut": "12295548-6",
    "edad": 55,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1970-07-20",
    "direccion": "Escitalopram 10 mg vo: 1/2 comprimido en la noche por 6 días, luego 1 comprimido cada noche",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56983246264"
    ],
    "email": "anitamaria77020@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Paciente de 54 años acude a control de seguimiento. Refiere persistencia de sintomatología ansiosa s",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10 mg vo: 1/2 comprimido en la noche por 6 días, luego 1 comprimido cada noche"
      },
      {
        "nombre": "atorvastatina",
        "dosis": "40 mg)."
      },
      {
        "nombre": "Xarelto",
        "dosis": "15mg"
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg y modificando posología de Dilasedán a esquema fraccionado cada 8 horas. Se extiende licencia médica por 30 días adicionales. Laboratorio reciente evidencia alteraciones metabólicas relevantes: glicemia 127 mg/dL, perfil lipídico alterado (Colesterol total 273, LDL 199.4) y déficit de vitamina D. Se sugiere derivación a CSMC Raíces Maule a través de médico de atención primaria para manejo integral."
      },
      {
        "nombre": "previa",
        "dosis": "127 mg/dL) e inició atorvastatina para manejo de dislipidemia detectada en laboratorio previo. Reporta pérdida ponderal significativa de aproximadamente 10kg desde inicio de cuadro en abril mediante modificación de hábitos alimentarios, lo que su médico tratante consideró favorable para manejo metabólico, programando control en dos meses. Refiere comorbilidad de artrosis de columna, previamente en tratamiento kinesiológico que suspendió durante episodio agudo de TVP, lo que ha generado recurrencia de dolor lumbar irradiado a extremidad inferior izquierda y limitación funcional para deambulación."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417940_l94yq93me",
    "ficha": 14,
    "nombre": "Andrea Estefany Flores Barros",
    "rut": "pendiente-14",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "**** Pasaje 16 1/2 oriente A con 7 norte #1812, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982763243"
    ],
    "email": "Andrea.86030010@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg: Iniciar con 1/2 comprimido en la mañana por 4 días, luego aumentar a 1 comprimido cada mañana."
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg: 1/2 comprimido en la mañana y 1/2 a las 17:00 hrs por 2 semanas. En crisis: 1/2 comprimido SOS sublingual (máx. 2/día)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417940_v72kzufi1",
    "ficha": 15,
    "nombre": "ficha 1",
    "rut": "pendiente-15",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417942_755wzxva4",
    "ficha": 16,
    "nombre": "Angel Valenzuela Gonzalez",
    "rut": "14017841-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Angelvalenzuelacontruccion@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: 1 cada día (primeros seis dias solo la mitad."
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mg vo: 1 en la noche por 2 semanas, luego suspender."
      },
      {
        "nombre": "eszopicloan",
        "dosis": "3mg vo: 0-0-1, a las 22. hrs."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417945_5w95evrg8",
    "ficha": 17,
    "nombre": "Angela Bergez Valdes",
    "rut": "17825086-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 20 jul 20.00hrs.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "angela.bergez264@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Venlafaxina",
        "dosis": "150mg vo: 1 cada mañana + Venlafaxina 75mg vo: 1 cada mañana"
      },
      {
        "nombre": "oxibutinina",
        "dosis": "5mg vo: 1 cada noche."
      },
      {
        "nombre": "Cloti",
        "dosis": "10mgvo ½ - ½ -0,"
      },
      {
        "nombre": "subelan",
        "dosis": "75mg or solo 10 dias y luego aumentar a 150 y ahi suspender bpp"
      },
      {
        "nombre": "receta",
        "dosis": "225mg."
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mgvo 0-0- 1/2 , ser consistente"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417947_d5i6l9z8v",
    "ficha": 18,
    "nombre": "Antoine Monne Bergez",
    "rut": "21492404-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "eszopiclona",
        "dosis": "3mg vo: 1 sos en la noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417948_vcjne7j7o",
    "ficha": 19,
    "nombre": "Antonia Javiera Perez Chacon",
    "rut": "pendiente-19",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417949_qmzstyqco",
    "ficha": 20,
    "nombre": "Antonia Javiera Perez Chacon",
    "rut": "22063388-8",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Altruline 100mg vo (suspendido durante febrero marzo) 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56986014919"
    ],
    "email": "anto.perezchacon@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "[[Informe médico 15 abril 2025|Informe médico 15 abril 2025]]",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Melatonina",
        "dosis": "3mg 1 a 2 en la noche. SOS."
      },
      {
        "nombre": "Sertralina",
        "dosis": "100mg vo: medio cada mañana."
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Altruline",
        "dosis": "100mg vo (suspendido durante febrero marzo) 1 cada mañana."
      },
      {
        "nombre": "Neoaradix",
        "dosis": "10mg vo: 1/4 en la mañana por 4 dias. Luego 1/2 cada mañana por cuatro dias. Luego escribirme un correo contándome cómo te has sentido respecto al uso de este fármaco."
      },
      {
        "nombre": "minfel",
        "dosis": "36 mg vo: 1 cada mañana"
      },
      {
        "nombre": "efecor",
        "dosis": "75mg. Indico aumentar a efexor 150mg 1 -0-0"
      },
      {
        "nombre": "samexid",
        "dosis": "50mg vo: 1 cada mañana"
      },
      {
        "nombre": "Neurok",
        "dosis": "50mg vo: 1 cada mañana (iniciar luego de que se acabe el samexid de 50)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417951_ok40zr2f5",
    "ficha": 21,
    "nombre": "Arlene Edith Delgado Diaz",
    "rut": "10751187-3",
    "edad": 57,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1968-01-10",
    "direccion": "Tiene 1 hija solamente.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "arlenerr@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "Revisados, sugiero mantener controles con médico general, debido a valores alterados en LDL y en gli",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "fluoxetina",
        "dosis": "60mg."
      },
      {
        "nombre": "Samexid",
        "dosis": "30mg vo: 1 en la mañana por 1 semana. Luego suspender y seguir con Samexid 50mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417952_a6w67cvja",
    "ficha": 22,
    "nombre": "Belen Saavedra Maturana",
    "rut": "19541639-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 10 julio 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Noemimaturana959@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "||19541639-7  <br>26  <br>12 marzo 97  <br>12 oriente b 21 norte 3223 Talca  <br>Noemimaturana959@gm",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Dominium",
        "dosis": "20mg vo: 1/2 en la noche por 6 dias y luego 1 cada noche  <br>Solicito exámenes de laboratorio  <br>Considerar terapia de parejas  <br>Psicoeduco respecto ISRS  <br>Envío recomendación de psicólogo/a.  <br>Pendiente hacer ges prox control.|||"
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mgvo: 1/2 en la mañana por 8 días, luego 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417952_h6ssze1bl",
    "ficha": 23,
    "nombre": "Camila Teresa Pinilla herrera",
    "rut": "17126934-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-10-22",
    "direccion": "Balmaceda 615 laja",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56978792339"
    ],
    "email": "cpinilla.h89@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Refiere el psicólogo: tiene 35 años, mamá de dos niños, con una infancia marcada por violencia intra",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "5mg sos , cuando se ha sentido muy angustiada y no para de llorar y tiene q tbjar, le daba sueño al inicio pero ya no. irritable a veces pero prefiere callar. Sintomas ansiosos marcados, sin crisis de panico. cocacola zero 2 latas al dia."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1/2 cada 8 horas"
      },
      {
        "nombre": "tomando",
        "dosis": "75mg de subelan, envíame un mail contándome cómo has estado."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417954_swflmpixw",
    "ficha": 24,
    "nombre": "Camila Rojas Gallardo",
    "rut": "19399305-2",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 10mg vo : ½ en la mañana por 10 días, luego 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56930008160"
    ],
    "email": "Camirojgall@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "médico general, psr San Clemente, carretones psr, egresó hace 2 años.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo : ½ en la mañana por 10 días, luego 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417955_i6uq9e8fp",
    "ficha": 25,
    "nombre": "Camila Tejos Montoya",
    "rut": "16836279-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 18 DIC",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "camilatejosmontoya@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg: 0-0-1"
      },
      {
        "nombre": "Altruline",
        "dosis": "50mg vo: medio cada mañana por seis días, luego 1 cada mañana. Al cabo de dos semanas con una entera, enviarme reporte de cómo te has sentido."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 cada noche. Si no duermes bien, puedes aumentar a medio cada noche o luego a 3/4 cada noche. Máximo 100mg cada noche"
      },
      {
        "nombre": "Dominium",
        "dosis": "20mg vo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417956_zpr9ke50p",
    "ficha": 26,
    "nombre": "Camila Ávila Lara",
    "rut": "17459791-K",
    "edad": 35,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-07-27",
    "direccion": "2 orte 832. actual: 37 oriente parcela 63 Talca.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982279256"
    ],
    "email": "profesoracamilaavila@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Oficio: Profesora",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "welbutrin",
        "dosis": "150mgvo 1-0-0 por 7 dias luego 1-1-0"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg vo: 0-0- ½ ."
      },
      {
        "nombre": "Wellbutrin",
        "dosis": "300mg XL vo: 1 cada mañana."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mgvo: medio cada noche por 4 noches y luego 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417956_8g7apn4uv",
    "ficha": 27,
    "nombre": "Carla Clavelle Roa",
    "rut": "pendiente-27",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417957_wiekfzjhp",
    "ficha": 28,
    "nombre": "ficha 1",
    "rut": "pendiente-28",
    "edad": 36,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1989-09-05",
    "direccion": "**** Ruta K-555, Loteo Quillahue, Parcela 2K",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "carla.clavelle@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**Profesión:** Médico internista en el Hospital Regional de Talca, con turnos en clínica y docencia ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "rupatadina",
        "dosis": "10 mg VO una vez al día, Symbicort y Nasonex."
      },
      {
        "nombre": "Vortioxetina",
        "dosis": "10 mg VO una vez cada noche, iniciando con 5 mg por los primeros 10 días. Trittico 100 mg VO, ¼ de comprimido cada noche. Enviar resultados de exámenes de laboratorio. Psicoterapia individual con Álvaro Valdés +56 9 6608 2428 (dile que vas derivada de mi parte). Se sugiere plantear terapia de pareja a Daniel. Control programado para el 14 de abril a las 18:30 hrs, presencial."
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75mg vo: 1 cada mañana"
      },
      {
        "nombre": "trazodona",
        "dosis": "100mg vo un cuarto noche. sin casis, sin sintomas psicoticos."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417957_g667wsv9n",
    "ficha": 29,
    "nombre": "Solicitud de Internación Voluntaria 18 abril 2025",
    "rut": "pendiente-29",
    "edad": 36,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1989-09-05",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "**ANTECEDENTES MÉDICOS RELEVANTES**",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Venlafaxina",
        "dosis": "75mg VO una vez al día"
      },
      {
        "nombre": "Vortioxetina",
        "dosis": "10mg VO una vez al día"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg VO (fracción) SOS nocturno"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417959_f65945sm1",
    "ficha": 30,
    "nombre": "Carla Constanza Saavedra Cancino",
    "rut": "16998589-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-10-10",
    "direccion": "Cursando 11 sem embarazo, eco normal reciente. Jacinta demandante. Acompañada hoy de esposo e hija. Intolerancia a olores varios, pirosis. Julio con fallas en atencion, memoria; adquirio trabajo adicional, pero presente en quehaceres de casa y asociados a Jacinta. Carla pasó acostada gran parte de agosto, por desanimo, mareo, inapetencia, rumiacion de porvenir, se preguntó si abortar. Julio se ve sobrepasado, evidente, Carla ha estado muy irritable.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "carlasaavedracancino@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "oficio: profesora basica, trabaja en colegio en san clemente, jornada completa algunos dias sale a l",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo: 1/2 en la mañana por 4 días, luego 1 cada mañana por 14 días, luego 1 y medio cada mañana."
      },
      {
        "nombre": "neopresol",
        "dosis": "10mg vo: 1/2 en la noche por 4 dias, luego 1 cada noche. Al cabo de llevar 10 dias tomando 1 entero, enviarme correo electronico con reporte acerca de como te has sentido, siendo lo más exhaustiva posible."
      },
      {
        "nombre": "sertac",
        "dosis": "50mg vo: 1/2 cada mañana por 6 días, luego 1 cada mañana"
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mgvo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417959_croaoxffq",
    "ficha": 31,
    "nombre": "Julio Cesar Ravello Jauregui",
    "rut": "16299418-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "jravellojauregui@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417960_1kleo7d9e",
    "ficha": 32,
    "nombre": "Medidas no farmacológicas para cese de lactancia",
    "rut": "pendiente-32",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Cabergolina 0.5 mg vo: 1/2 cada 12 horas por 1 día. Tomar con alimentos.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "Si aparecen cefalea intensa, mareo, hipotensión o náuseas, suspender y comunicar al médico tratante.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "paracetamol",
        "dosis": "500 mg cada 8 horas o ibuprofeno 400 mg cada 8 horas, por pocos días."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417961_bjvgwbszo",
    "ficha": 33,
    "nombre": "Carlos Benjamin Contreras Araya",
    "rut": "21470203-7",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2025-05-30",
    "direccion": "Samexid 50mg vo: 1 cada mañana. Todos los días, incluyendo fines de semana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56976243211"
    ],
    "email": "benjacontreras2612@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "estudiante de derecho UTAL cuarto año, con ramos de 2do y tercero.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Vortioxetina",
        "dosis": "15mg/día como antidepresivo"
      },
      {
        "nombre": "samexid",
        "dosis": "50mg vo: 1 cada mañama solo en temporada de exámenes (desde fines 2024), brintellix 15 mg vo 1 cada dia (mediados 2024 desde ahi ) zolpidem 10mg: 1 cada noche.."
      },
      {
        "nombre": "Zolpidem",
        "dosis": "10mg/noche para manejo del insomnio"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 en la noche por 4 días, luego 1 cada noche por 14 días, luego 1 y medio cada noche."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 cada noche por 2 semanas, luego suspender, con posibilidad de usar como SOS en caso de insomnio."
      },
      {
        "nombre": "Neurok",
        "dosis": "50mg vo: 1 cada mañana (cambia presentación)"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20 mg vo: 1 cada noche (aumenta)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417962_2yyg1as4a",
    "ficha": 34,
    "nombre": "Carlos Cabrera Troncoso",
    "rut": "18692829-6",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 13 enero 2025",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56950007375",
      "+56950007356"
    ],
    "email": "carlos.cabrera.troncoso@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "trabaja en minería, ingeniero mecánico, trabajando ahora como planificador de mantenimiento a equipo",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "seronex",
        "dosis": "50mg vo: ½ en la mañana por seis días, luego 1 cada mañana por 10 días, luego 2 cada mañana hasta agotar la caja. Luego continuar con seronex 100mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417965_kis58t8bd",
    "ficha": 35,
    "nombre": "Carlos Inostroza Bravo",
    "rut": "19044801-0",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram 10mg vo 1-0-0 hace 2 semanas q inició. Ethon",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56933880484"
    ],
    "email": "Inostroza.cf@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Sugiero controlar con médico general en 3 meses: perfil lipídico y perfil hepático.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo 1-0-0 hace 2 semanas q inició. Ethon"
      },
      {
        "nombre": "escitalorpam",
        "dosis": "10mg 1 cada noche."
      },
      {
        "nombre": "Cloti",
        "dosis": "5mg vo SOS. (planiden odt SL)."
      },
      {
        "nombre": "hasta",
        "dosis": "30mg escitalopram con cloti 10 día + qtp dosis baja. Hasta dic 2020. siguió con los faramcos un tiempo más, llegó a acuerdo en Kaufman q tbjaria desde aca talca, no se cumplio, estuvo idpete un tiempo con cuñado, luego desde oct 2021  (deja de tomar porq se sentia bien ya) tbjando en lo actual."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo: 1 cada noche ( desde el lunes 24 de julio). Mientras mantener escitalorpam 10mg 1 cada noche."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1 en la mañana, 1 en la tarde (ej 19.00hrs)."
      },
      {
        "nombre": "Reax",
        "dosis": "10mg vo: 1 cada mañana."
      },
      {
        "nombre": "Samexid",
        "dosis": "30 mg vo: 1 cada mañana por…"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417968_udgw7xa2v",
    "ficha": 36,
    "nombre": "Carol Castillo Astaburuaga",
    "rut": "13722262-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Parcela 15 Alto Las Cruces, Las Rastras",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56978892219"
    ],
    "email": "astaburuaga.cc@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75 mg vo 1-0-0"
      },
      {
        "nombre": "melatonina",
        "dosis": "6 mg noche."
      },
      {
        "nombre": "Wellbutrin",
        "dosis": "150 mg vo XL 1 en la mañana por 4 días y luego 1-1-0."
      },
      {
        "nombre": "Noptic",
        "dosis": "3 mg vo 0-0-1"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3 mg vo 0-0-1/2 ."
      },
      {
        "nombre": "mantener",
        "dosis": "6 mg melatonina."
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo un cuarto por noche o intentar con medio. Suspender eszopiclona. Otra vez educo por estimulantes (toma te rojo y negro en grandes cantidades)."
      },
      {
        "nombre": "aradix",
        "dosis": "10mgvo 1-0-0 por 30 días."
      },
      {
        "nombre": "tritico",
        "dosis": "100mgvo 0-0- ¼"
      },
      {
        "nombre": "minfel",
        "dosis": "27mgvo liche 1-0-0"
      },
      {
        "nombre": "liche",
        "dosis": "20mg vo 1-0-0, por 30 dias."
      },
      {
        "nombre": "venlavitae",
        "dosis": "75mg: 2-0-0"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417970_1lnhj6cxc",
    "ficha": 37,
    "nombre": "Carolina Cifuentes Cifuentes",
    "rut": "16416142-0",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Sostac 20mg vía oral: 1/2 comprimido en la mañana por 4 días, luego suspender.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56964610396"
    ],
    "email": "carolina1845@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "quetiapina . proxima semana empezaria con prednisona y progendo intravaginal y ademas clexane empeza",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "f412)  ; F412.; F412, desde 28 abril, por 30 días",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "quetiapina",
        "dosis": "25mg noche. Estuvo con licencia médica por 3-4 meses. Actualmente intenta reducir medicación psiquiátrica antes de iniciar nuevo tratamiento de fertilidad, experimentando síntomas de abstinencia (náuseas, cefaleas, ansiedad)."
      },
      {
        "nombre": "escitalopram",
        "dosis": "10mg en la mañana (durante 9 meses), quetiapina 25mg por la noche para dormir, probióticos, ácido fólico, anticonceptivo para preparación de tratamiento de fertilidad. Exámenes recientes: hemoglobina **11,5**. Test de Coombs indirecto negativo. TSH normal en 1,2. T4 libre normal en 1,23. Vitamina D en 26. Vitamina B12 en **259**. **Resistencia a la proteína C activada en 1,7**. Valores normales para Factor 5, mutación del Factor 2, homocisteína, anticoagulante lúpico, antitrombina 3, Proteína C y Proteína S libre."
      },
      {
        "nombre": "lexapro",
        "dosis": "10mg dia y quetiapina 25mg noche. Estuvo con licencia médica por 3-4 meses. Actualmente intenta reducir medicación psiquiátrica antes de iniciar nuevo tratamiento de fertilidad, experimentando síntomas de abstinencia (náuseas, cefaleas, ansiedad)."
      },
      {
        "nombre": "Sostac",
        "dosis": "20mg vía oral: 1/2 comprimido en la mañana por 4 días, luego suspender."
      },
      {
        "nombre": "primakin",
        "dosis": "6mg dia, pradaxa 150mg dia (por estudio de trombofilia. ademas con probioticos, acido folico 5mg, omega 3, citrato de magnesio, vitaminab12, neurobionta (por hematologia, que le detectaron anemia leve), ademas le inyectaron 1gr de hierro. si bien hematologa dice q no tiene trombofilia, le indicaron igual usar el pradaxa por precaucion."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417972_pvmcusqt2",
    "ficha": 38,
    "nombre": "Carolina Concha",
    "rut": "pendiente-38",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-07-23",
    "direccion": "Control 24 oct c3",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Topiramato",
        "dosis": "12mg, Vitamina D 800 , Orlistat 60 , Metformina 260 , Ademas usando saxenda dosis minima.  Qlaira (terapia hormonal)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417973_7fw0vygp5",
    "ficha": 39,
    "nombre": "Catalina Bustos",
    "rut": "17497470-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Avda 21 poniente 0852, dpto 2 D Torre C",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56973238304"
    ],
    "email": "Catalinabustosvillalobos@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Al dia despues de episodio del 30 julio, fue ramon a la impresora que está al lado de su escritorio ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Trazodona",
        "dosis": "25mg vo: 1 cada noche"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 en la mañana por seis dias, luego 1 cada mañana"
      },
      {
        "nombre": "seronex",
        "dosis": "50mg vo: ½ cada mañana por 6 dias, luego 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417975_2argaraku",
    "ficha": 40,
    "nombre": "Catherine Valeria Inostroza Fuentes",
    "rut": "17494877-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Sertralina 50mg vo (sugiero sertac o seronex): 1/2 cada mañana por 4 dias y luego 1 cada mañana por 10 días , luego 1 y media cada mañana (junto con el desayuno).",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56978338344"
    ],
    "email": "catherineinostrozafuentes@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "De inmediato al entrar actitud abatida, insomnio persistente, muy angustiada, preocupada por su hija",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sertralina",
        "dosis": "50mg vo (sugiero sertac o seronex): 1/2 cada mañana por 4 dias y luego 1 cada mañana por 10 días , luego 1 y media cada mañana (junto con el desayuno)."
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "75mg vo: 1 cada mañana, refiere no compró el otro o aumentar por problema económico."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: medio en la mañana y medio en la tarde (18.00hrs). Si causara somnolencia, tomarlo solo en la noche."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo:1 cada mañana (mientras puede usar dos de 75mg)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417978_ymdxezzql",
    "ficha": 41,
    "nombre": "Cecilia Almonacid Fierro",
    "rut": "8993227-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-08-29",
    "direccion": "Ingreso 14 marzo 2022",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Cecyal08@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "20mg: 0-0-1 (escitavitae)."
      },
      {
        "nombre": "Rosuvastatina",
        "dosis": "20mg: 0-0- 1 1/2"
      },
      {
        "nombre": "Duloxetina",
        "dosis": "60mg vo (1 cada noche) (Cymbalta)"
      },
      {
        "nombre": "lexapro",
        "dosis": "10mg noche. plan: control 12 mayo 19.00hrs tele. rize 2.5mg noche por 6 dias. lexapro 15mg noche por 6 días y luego 20mg noche. LM por 30 dias desde el 14 abril? por TMAD."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo 0-0-1"
      },
      {
        "nombre": "Lexpapro",
        "dosis": "20mg: 1 cada noche"
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5mg vo: 1 cada mañana por 6 días, luego 1 ½ cada mañana por 6 días, ahí escribirme contándome cómo se ha sentido."
      },
      {
        "nombre": "topiramato",
        "dosis": "25mg 0-0-1 y eletriptan. Migraña. Además le pidió tac cerebral sc. Lleva aprox 2 semanas con topiramato. Compin rechazo disminucion de dias de la isapre."
      },
      {
        "nombre": "Cymbalta",
        "dosis": "30mg vo: 1 cada noche por 6 dias, luego 2 cada noche. Al acabar la caja, continuar con Cymbalta 60mg vo: 1 cada noche."
      },
      {
        "nombre": "Binax",
        "dosis": "60mg vo (1 cada noche), Betaloc (1 cada mañana), Esomeprazol (1 cada mañana), Rosuvastatina 20mg (1 cada noche)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417980_7w19i1ii5",
    "ficha": 42,
    "nombre": "Irma Cecilia del Carmen Novoa Herrera",
    "rut": "11134271-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "ceci.novoa.h@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> Mi hijo Maximiliano Morales Novoa edad 14 años y es Estudiante.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mgvo 0-0-1 desde hoy, psicoeduco."
      },
      {
        "nombre": "tomado",
        "dosis": "5 mg por temor ya que le causó ciertas parestesias y entumecimiento en hemicuerpo izquierdo. Refiere estar “estresada”, pero con alta discordancia ideoafectiva, posición “playa”."
      },
      {
        "nombre": "tomando",
        "dosis": "15mg. Le explico que puede ser el estrés y el resfrío intercurrente."
      },
      {
        "nombre": "Deslafax",
        "dosis": "50mg vo: 1 cada mañana por 10 días, luego 2 cada mañana hasta agotar la caja. Luego seguir con Deslafax 100mg vo: 1 cada mañana."
      },
      {
        "nombre": "Zopinom",
        "dosis": "3mg vo: 1 cada noche."
      },
      {
        "nombre": "Ciblex",
        "dosis": "15mgvo: medio en la noche por 6 días, luego 1 cada noche"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1 en la mañana, 1 en la tarde a las siete de la tarde."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417981_9we8nrdoc",
    "ficha": 43,
    "nombre": "Cecilia Andrea Roco Villareal",
    "rut": "10691594-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Boris 18 medicina UCM",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56997001524"
    ],
    "email": "rocovcecilia@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Siento que debo tbjar mucho, vi el esfuerzo de mis padres (llora, orgullo padres profesores). Siempr",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Luvox",
        "dosis": "100mg vo: medio cada noche por 10 días, luego seguir con 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417982_plxhv7kv4",
    "ficha": 44,
    "nombre": "Claudia Alejandra Giménez Vignolo",
    "rut": "17591468-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Eutirox 137mcg 1-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56952272284"
    ],
    "email": "clau.gimenez.vignolo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Psicologa, prog mi abogado (apreciacion a nivel de salud mental de los niños). Los designa tribunal ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Melatonina",
        "dosis": "3mgvo 0-0-1"
      },
      {
        "nombre": "Atenolol",
        "dosis": "50 mg: 1-0-0 (le dijeron por tema de retencion de liq)"
      },
      {
        "nombre": "Minfel",
        "dosis": "18 mg vo: 1 cada mañana por 6 dias, luego 2 cada mañana por 10 dias. En ese momento, enviarme reporte por mail acerca de cómo te has sentido."
      },
      {
        "nombre": "wellbutrin",
        "dosis": "300mg xl , esta con esa dosis desde hace aprox 3 semanas."
      },
      {
        "nombre": "osmetil",
        "dosis": "27mg vo 1 cada mañana x 1 mes."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417983_shro5irzz",
    "ficha": 45,
    "nombre": "Claudia florentina vargas medina",
    "rut": "10993710-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Luego 2 dias libres.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56984194668"
    ],
    "email": "Clauvargasmedina@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Enfermera, hace 24 años urgencias HRT.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Citalopram",
        "dosis": "20mg vo: 1 cada noche."
      },
      {
        "nombre": "Pristiq",
        "dosis": "50mgvo: 1-0-0 hace 3 años (hace 6 meses le habian subido a 100, hace 3 meses se lo cambiaron de nuevo a 50mg."
      },
      {
        "nombre": "Trittico",
        "dosis": "50mg noche cabeza abombada."
      },
      {
        "nombre": "Cipramil",
        "dosis": "20mg hace 20 dias a las 18.00hrs."
      },
      {
        "nombre": "esomeprazol",
        "dosis": "40mg. , magnesio 2 capsulas tarde + b6, omega 3 3 capsulas al día."
      },
      {
        "nombre": "Vigisom",
        "dosis": "2mg una hora antes de dormir + eszopiclona 3mg: 1 comp. Una hora antes de dormir."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo: 0-0-1"
      },
      {
        "nombre": "Cimal",
        "dosis": "20mgvo: 1 cada noche."
      },
      {
        "nombre": "Valnoc",
        "dosis": "2 mgvo: media cada noche (puede usar una entera)"
      },
      {
        "nombre": "omeprazol",
        "dosis": "20mg vía"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417984_d6calt4yd",
    "ficha": 46,
    "nombre": "gemini cli 5 oct 2025",
    "rut": "pendiente-46",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417985_wajkjdpxg",
    "ficha": 47,
    "nombre": "Claudia Zárate Hernandez",
    "rut": "14018390-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Dilasedan 10mg: 1 sos sublingual",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "zarate.rrhh@hotmail.cl",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Dilasedan",
        "dosis": "10mg: 1 sos sublingual"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1 cada mañana (la mitad los primeros diez días)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417986_7ui598jmc",
    "ficha": 48,
    "nombre": "Cynthia Andrea Villarroel Acuña",
    "rut": "12163387-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 5 octubre 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56987644852"
    ],
    "email": "Cynthia.villarroel@live.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Losartan",
        "dosis": "50mg cada doce"
      },
      {
        "nombre": "Citalopram",
        "dosis": "20mg vo: 1-0-0 hace 2 meses y algo"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3 mgvo 0-0-1"
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mgvo: medio cada noche (inicia)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417987_du890h66f",
    "ficha": 49,
    "nombre": "Daniela Calquin Valdés",
    "rut": "15133049-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Levotiroxina 50mcg vo 1-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56992115516"
    ],
    "email": "danielacalquin@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Realizo informe médico para que presente en proceso investigativo laboral.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Clotiazepam",
        "dosis": "5mg sos"
      },
      {
        "nombre": "rize",
        "dosis": "5mg vo cada noche, sin efecto para dormir y sin rams. No le han indicado AD. Siente que va progresivamente mal, angustia y temor es cada vez mas intenso. Ultimo lab fue en sept. Bajo apetito, a ratos antojos de cosas mas caloricas sobretodo en la noche. Nota que ha bajado algo de peso. Sin ideacion suicida, nunca. Sin psicoterapia . Primera vez de algo de salud mental. Aun no sale RECA, deberia ser en 1-2 semanas."
      },
      {
        "nombre": "Ipran",
        "dosis": "10mgvo: medio cada mañana por seis días, luego 1 cada noche."
      },
      {
        "nombre": "Ravotril",
        "dosis": "2mgvo: medio cada noche."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mg vo: 1 en la mañana"
      },
      {
        "nombre": "Zopinom",
        "dosis": "3mgvo: 1 cada noche (inicia)"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mg vo: 1 cada noche"
      },
      {
        "nombre": "retard",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Uricont",
        "dosis": "5mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417989_x3dqfb8yg",
    "ficha": 50,
    "nombre": "Daniela Cecilia Batikoff Chico",
    "rut": "10433653-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-09-08",
    "direccion": "Tobalaba 20 Depto 602",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56965862260"
    ],
    "email": "danielabatikoff@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Contacto: Psicólogo Christian Beraud, teléfono 9535 8237.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "No referidas.",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Quetiapina",
        "dosis": "100 mg VO: ½ comprimido en la noche."
      },
      {
        "nombre": "Fluoxetina",
        "dosis": "20mg vo: 1 en la mañana por 2 días, luego suspender."
      },
      {
        "nombre": "aspirina",
        "dosis": "100mg cada doce hrs"
      },
      {
        "nombre": "atorvastatina",
        "dosis": "80mg vo cada noche"
      },
      {
        "nombre": "empaglifozina",
        "dosis": "10mg día"
      },
      {
        "nombre": "losartan",
        "dosis": "25 mg cada doce"
      },
      {
        "nombre": "levocetirizina",
        "dosis": "5mg cada doce hrs"
      },
      {
        "nombre": "diazepam",
        "dosis": "10mg noche vo"
      },
      {
        "nombre": "lorazepam",
        "dosis": "2 mg vo: 1/2 cada noche"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "2 mg VO: 1 comprimido en la noche."
      },
      {
        "nombre": "Neurok",
        "dosis": "30 mg VO: 1 comprimido cada mañana."
      },
      {
        "nombre": "hasta",
        "dosis": "100 mg diarios (½ comprimido en la mañana y 1 en la noche)."
      },
      {
        "nombre": "Topamax",
        "dosis": "50mg vo: 1/2 -0- 1/2"
      },
      {
        "nombre": "Topiramato",
        "dosis": "50mg: 1 1/2 cada doce horas."
      },
      {
        "nombre": "Quetidin",
        "dosis": "100 mg VO: 1 cada noche durante 1 mes, luego disminuir a media tableta cada noche."
      },
      {
        "nombre": "samexid",
        "dosis": "50mg vo 1 cada mañana (se suspende neurok)"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: ½ en la noche por 7 dias, luego 1 cada noche"
      },
      {
        "nombre": "dominium",
        "dosis": "20mg vo: ½ en la mañana por 6 días, luego 1 cada mañana por 14 días, luego 2 cada mañana."
      },
      {
        "nombre": "Trazodona",
        "dosis": "100 mg VO: 1 ½ cada noche."
      },
      {
        "nombre": "Tronsalan",
        "dosis": "100mg vo: 2 cada noche"
      },
      {
        "nombre": "altruline",
        "dosis": "50mg vo: 1/2 en la mañana por 4 dias, luego 1 cada mañana por 10 dias, luego 1 1/2 cada mañana hasta acabar la caja. Luego seguir con altruline 100mg vo: 1 cada mañana."
      },
      {
        "nombre": "clopidogrel",
        "dosis": "75mg vo cada doce hrs"
      },
      {
        "nombre": "omeprazol",
        "dosis": "20mg cada doce"
      },
      {
        "nombre": "espironolactona",
        "dosis": "25mg mg vo dia"
      },
      {
        "nombre": "sertac",
        "dosis": "100mg cada mañana"
      },
      {
        "nombre": "vigisom",
        "dosis": "2 mg vo: 1 cada noche (inicia)"
      },
      {
        "nombre": "ecetimibe",
        "dosis": "10mg dia, entresto 50mg dia. (valsartán) , jardiance 10mg dia, bisoprolol 1.25 cada doce, espironolactona 25mg día."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417990_8yot2fjiq",
    "ficha": 51,
    "nombre": "recomendaciones higiene sueño daniela",
    "rut": "pendiente-51",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417990_3aa4nqoux",
    "ficha": 52,
    "nombre": "Daniela Soto Salazar",
    "rut": "21383040-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 29 mayo 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56932505266"
    ],
    "email": "Danysoto2003@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417992_jxt566fn9",
    "ficha": 53,
    "nombre": "Daniela Urra Sanchez",
    "rut": "16367567-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Hace 1 mes que nota que sintomatologia es notoria. Esta persona que la dejó mal es del trabajo, ahi al contacto cero  le exacerbó sintomas.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56942366409"
    ],
    "email": "danielaurrasanchez@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "abogado 511, Puente Alto",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sincris",
        "dosis": "5mg vo: 1/2 cada noche por 2 días, luego 1 cada noche por 4 días, luego 1 1/2 cada noche hasta el control."
      },
      {
        "nombre": "Litio",
        "dosis": "300mg vo: 1/2 cada noche por 4 dias, luego 1/2 cada 12 horas por 6 días , luego 1/2 en la mañana y 1 en la noche , por 6 días, luego 1 cada doce horas."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg 1/2 sublingual SOS.  no más de 1 comp entero en 1 día."
      },
      {
        "nombre": "Arizol",
        "dosis": "5mg vo: medio por 6 días, luego 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417995_uyix7nwae",
    "ficha": 54,
    "nombre": "Dante Avaca Baladron",
    "rut": "9296138-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Olanvitae 10mg vo: 1-0-1",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56962262998"
    ],
    "email": "Dante.avacbaladron@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Dante Avaca Baladrón, de 60 años, trabaja en agua potable y dirige reuniones comunitarias relacionad",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "desvenlafaxina",
        "dosis": "50mg vo y sin respuesta, uso tambien lorazepam (nunca uso clotiazepam), estuvo tambien con luvox no recuerda dosis, refiere q 1 al dia. En este cuadro que inicia en pandemia se agrega despues hiperalerta a ruidos."
      },
      {
        "nombre": "olanzapina",
        "dosis": "10mg, paroxetina CR 25mg, risperidona 1mg y zolpidem 3mg. Antecedentes psiquiátricos desde los 18 años, con ansiedad, falta de energía y crisis de pánico durante aproximadamente tres años. Entre 2010 y 2015, estrés asociado al cierre de la universidad mientras estudiaba derecho. Hace 15 años, conductas de TOC de comprobación, como regresar durante las vacaciones para corroborar la seguridad. Durante la pandemia, se exacerban síntomas de ansiedad mientras trabajaba desde casa, con crisis de pánico. Ensayos con desvenlafaxina 50mg y lorazepam sin respuesta, además de luvox en dosis que no recuerda. Durante este período, hiperalerta a ruidos. Hace poco más de dos meses, se evaluó para pensión de discapacidad y le otorgaron un 49%, pero no asistió a la comisión médica posterior. Al ingreso con quien suscribe, con ansiedad, crisis de pánico, hiperalerta a ruidos, pseudoalucinaciones auditivas, miedo generalizado y sintomatología depresiva secundaria a clínica ansiosa. Diagnóstico: de F41.2 (tno mixto ansioso depresivo) y F41.0 (trastorno de pánico). Manejo con paroxetina CR, olanzapina, risperidona y zolpidem, además de licencia médica. Se solicitó TAC cerebral sin contraste. Evolución fluctuante en ánimo. Ajustes en dosis posteriores, se agrega luego clonazepam. Exámenes de laboratorio mostraron PSA levemente elevado, causando ansiedad por posible cáncer de próstata. Le solicitaron resonancia magnética de próstata. En ultimo control el 4 nov 2024, persisten crisis de ansiedad, aislamiento social y sobresalto a ruidos. Se agregaron quetiapina XR y pregabalina. No se ha podido realizar examenes de laboratorio solicitados por ansiedad al salir de casa. Indicado psicoterapia y siguiente esquema:"
      },
      {
        "nombre": "Clomipramina",
        "dosis": "75mg vo: medio comprimido en la noche por 6 días, luego 1 cada noche."
      },
      {
        "nombre": "Olanvitae",
        "dosis": "10mg vo: 1-0-1"
      },
      {
        "nombre": "Dagotil",
        "dosis": "1mg vo: 1-0-1"
      },
      {
        "nombre": "Noptic",
        "dosis": "3mg 0-0-1, acabo dos semanas y duerme mal ahora."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1 cada ocho horas"
      },
      {
        "nombre": "Lyrica",
        "dosis": "75mg vo: 1 en la mañana y 1 en la noche"
      },
      {
        "nombre": "Qurax",
        "dosis": "200mg vo: 1 cada noche (no se toma 2 de 150 indicados)."
      },
      {
        "nombre": "prestat",
        "dosis": "150mg vo: 1 en la mañana y 1 en la tarde (18:00hrs)"
      },
      {
        "nombre": "venlavitae",
        "dosis": "75mg vo: 1 cada mañana"
      },
      {
        "nombre": "hasta",
        "dosis": "2 mg de dagotil, sin rams. Persiste con licencia médica por patología psiquiátrica. No hay stock de clomipramina en Chile en este momento, desde hace más de un mes. Toma fármacos noche a las 21.00hrs, concilia cerca de las 00 hrs. se despierta a las 7 y se queda acostado hasta las 10 aprox. Siestas de 1 hora y media a diario. Preocupacion comprensible por ITU de su esposa. Persiste sintomatologia de TOC significativa en areas ya conocidas. No logra salir solo a a algun lugar, salvo a un negocio a un par de cuadras. Sin sijntomas psicoticos, sin ideacion suicida-heteroagresiva. Apetito normal, no nota cambios en peso."
      },
      {
        "nombre": "Rimox",
        "dosis": "1mg vo: 1 cada noche por 10 días, luego 2 cada noche por 10 días, luego suspender y continuar con Rimox 3mg vo: 1 cada noche."
      },
      {
        "nombre": "Ausentron",
        "dosis": "75 mg vo: 1/2 cada noche por 6 días, luego 1 cada noche por 10 días, luego 1 1/2 cada noche."
      },
      {
        "nombre": "Anafranil",
        "dosis": "75 mg vo: 1 cada noche (ya no seguiría usando el Ausentron al iniciar Anafranil)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417996_dfya6e2ap",
    "ficha": 55,
    "nombre": "David Berrios",
    "rut": "13487878-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "berriosdav@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417996_ok9wau5y5",
    "ficha": 56,
    "nombre": "Diego Fuentes Perez",
    "rut": "18252513-8",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "fuentes.diegoalexis@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "hasta",
        "dosis": "15 mg poco mas de 30 dias y noto mejoria pero lo asocia a Ramadan y a mas deporte que hizo ese tiempo."
      },
      {
        "nombre": "ipran",
        "dosis": "10mgvo 0-0-1 medio 6 primeros dias"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417998_rtqfpdip3",
    "ficha": 57,
    "nombre": "Diego Marin",
    "rut": "21776574-9",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 14 diciembre 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Diegomarin.cro@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Apoyo con terapeuta ocupacional y psicólogo.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Oxibutinina",
        "dosis": "5mg vo: 1 cada noche (dermatología por hiperhodrisis nocturna, buena respuesta)."
      },
      {
        "nombre": "Brintellix",
        "dosis": "10mgvo: medio en la mañana por 10 días, luego suspender."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: medio en la mañana y medio en la tarde."
      },
      {
        "nombre": "Samexid",
        "dosis": "30mgvo: 1 cada mañana por 14 dias y luego continuar con samexid de 50mg vo 1 cada mañana"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mg vo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052417998_8t2a4lcs3",
    "ficha": 58,
    "nombre": "Doris Córdova Rojas",
    "rut": "8204596-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 10mg vo: 1/2 en la mañana por 6 días, luego 1 cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56994176728"
    ],
    "email": "dorisgrecia1893@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: Sergio esposo, 62, trabajo administrativo en ambito comercial.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "metformina",
        "dosis": "850mg cada doce hrs"
      },
      {
        "nombre": "losartan",
        "dosis": "50mg 1 cada mañana"
      },
      {
        "nombre": "sertralina",
        "dosis": "50mg vo: 1 cada mañana, hace aprox 2 años, genérica."
      },
      {
        "nombre": "trazodona",
        "dosis": "50mg noche, todo sin titular. Asocia que tomando duloxetina le subía la presión arterial. Ahí le dijo que hiciera traslape a venlafaxina (hace mes y medio), leyó chatGPT y prefirió seguir con sertralina. Al reiniciar estos ttos le ha dado hiperhidrosis nocturna , que va en descenso y es intensidad de tener que cambiarse pijama. Despierta seguido a las 4 de la mañana y con la presión alta (170/104), mientras tenia pesadillas, se tomó dilasedan y se le pasó. Motivo de ansiedad actual: madre con dependencia severa, requiere silla de ruedas o acostada. Vive cerca de casa, se siente culpable de no poder ayudarla mas producto de sintomatologia ansiosa. Dice que es aprehensiva con hijos; uno de sus hijos  se fue de casa hace ocho meses y se comunica poco con ella, le afecta harto. Esta semana cambia contexto y Sebastian viajará mucho menos a Talca, lo que asocia a mas sintomatologia ansiosa ultimamente."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 en la mañana por 6 días, luego 1 cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1/2 en la mañana , 1/2 en la tarde (16.hrs), 1 en la noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418000_ofzk65fb5",
    "ficha": 59,
    "nombre": "Edgard Matteo Dubreuil",
    "rut": "4497715-K",
    "edad": 2,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2023-03-27",
    "direccion": "Sertralina 100mgvo: 2-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "Enfermera lo evaluo y le dijo que este prob de equilibrio habia que tenerlo presente para prevenir c",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sertralina",
        "dosis": "100mgvo: 2-0-0"
      },
      {
        "nombre": "Melatonina",
        "dosis": "3mgvo: 0-0-1"
      },
      {
        "nombre": "Mirtazapina",
        "dosis": "15mg vo: media cada noche por 6 días, luego 1 cada noche."
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "75mgvo 1-0-0"
      },
      {
        "nombre": "memantina",
        "dosis": "20mgvo 0-0-1"
      },
      {
        "nombre": "levetiracetam",
        "dosis": "500mgnoche"
      },
      {
        "nombre": "Rosuvastatina",
        "dosis": "10mg vo: 1/2 en la noche por 10 días, luego 1 cada noche."
      },
      {
        "nombre": "Risperidona",
        "dosis": "3mgvo 0-0-1"
      },
      {
        "nombre": "Memanvitae",
        "dosis": "10mgvo: medio cada noche por diez días, luego 1 cada noche por diez días, luego 1 y medio cada noche por 10 días, luego suspender y seguir con Vivimex 20mg vo: 1 cada noche."
      },
      {
        "nombre": "Vivimex",
        "dosis": "20mgvo: 0-0-1"
      },
      {
        "nombre": "Esomeprazol",
        "dosis": "40mgvo: 0-1-0, inicia, suspender omeprazol."
      },
      {
        "nombre": "Seronex",
        "dosis": "100mgvo: 2 cada noche (cambia horario hacia la noche)"
      },
      {
        "nombre": "amlodipino",
        "dosis": "5mg noche,trelegy, levetiracetam 500mgnoche"
      },
      {
        "nombre": "retard",
        "dosis": "150mg vo 1 cada mañana + depurol retard 75mg vo 1 cada mañana + memantina 20mg cada noche + risperidona 1mg cada noche."
      },
      {
        "nombre": "nuevo",
        "dosis": "150mg, No logró identificar algun cambio."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418002_0qg8zcuy6",
    "ficha": 60,
    "nombre": "Edith Moreno Carrión",
    "rut": "11343044-3",
    "edad": 2,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2023-10-27",
    "direccion": "24 y media norte A, 4192 Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56998836735"
    ],
    "email": "edithmoreno@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ocupación: Médico de Urgencias HRT y Docente UCM",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Rash cutáneo por lamotrigina",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "DSM",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg"
      },
      {
        "nombre": "Bupropion",
        "dosis": "150mg vo 1 cada mañana"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mg vo: medio comprimido"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: ½ comprimido cada noche"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: ½ comprimido cada mañana por 6 días, luego 1 comprimido cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1 comprimido en la mañana y 1 en la tarde (16:00 hrs). Como medicamento de rescate: 1 comprimido sublingual (máximo una vez al día)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418004_bl8rj3es5",
    "ficha": 61,
    "nombre": "Edith Reyes Pilser",
    "rut": "5030053-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Est 6 to en la normal.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "edithinzulzareyes@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Dueña de casa",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Melatonina",
        "dosis": "3mgvo 0-0-1"
      },
      {
        "nombre": "Sertralina",
        "dosis": "100mg vo 1 1/2 cada mañana. Risperidona 3mg vo: 1/2 cada noche. RM 6 sept 2024: focos hiperintensos de la sustancia blanca supratentorial de aspecto microangiopatico. Leves signos involutivos difusos de predominio en ambos valles silvianos. Resto de estudio sin hallazgos de significado patologico. Le pidieron holter de arritmias. Lab 2 julio tsh 2.7, t4l 1.04."
      },
      {
        "nombre": "Memantina",
        "dosis": "10mg vo: 1 cada noche"
      },
      {
        "nombre": "atorvastatina",
        "dosis": "10mg noche."
      },
      {
        "nombre": "Omeprazol",
        "dosis": "20mgvo 0-1-0"
      },
      {
        "nombre": "titulado",
        "dosis": "75mg : 0-0-1"
      },
      {
        "nombre": "Risperidona",
        "dosis": "1mg/ml vo: 10 gotas cada noche por 10 días, luego 20 gotas cada noche por 10 días, luego 30 gotas cada noche por 10 días."
      },
      {
        "nombre": "Altruline",
        "dosis": "50mgvo: 1/2 en la mañana por 10 días, luego 1 cada mañana."
      },
      {
        "nombre": "Seronex",
        "dosis": "100mg vo: 1 1/2 cada mañana (aumenta)."
      },
      {
        "nombre": "Donepecilo",
        "dosis": "10mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418005_3o4dv5na1",
    "ficha": 62,
    "nombre": "Eduardo Rodrigo Moraga Toledo",
    "rut": "18476116-5",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Sertac 100mg vo: 1 cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56944617308"
    ],
    "email": "e.moraga93@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: padre Eduardo 60 años tbja en empresa Dimarc en ventas, madre Monica 60 jubilada dueña de ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "sertac",
        "dosis": "50mg vo: 1 cada mañana, hace 2 semanas, estuvo antes 2 semanas con media."
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5 mg vo: 1/4 cada mañana por 14 días, luego 1/2 cada mañana.  (arizol)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418007_ke17yg658",
    "ficha": 63,
    "nombre": "Elvira Jarpa Pérez",
    "rut": "16997790-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "2 y media norte 3770",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "elvira.jarpa@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ocupación: Diseñadora gráfica, profesora de talleres (manualidades y cocina)",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sertralina",
        "dosis": "100mg vo: 1 cada mañana desde marzo 2025, sin respuesta terapéutica referida. Vitamina D 800UI: 1 al día, desde hace aproximadamente 1 mes"
      },
      {
        "nombre": "Glicemia",
        "dosis": "86 mg/dL, BUN 17.0 mg/dL, Uremia 36.4 mg/dL, Creatinina 0.64 mg/dL, VFG >60, Na 137 mmol/L, K 4.3 mmol/L, Cl 106 mmol/L."
      },
      {
        "nombre": "total",
        "dosis": "245 mg/dL (≤200), Colesterol LDL 155 mg/dL (≤130)**, Colesterol HDL 75 mg/dL, VLDL 15 mg/dL, Triglicéridos 74 mg/dL, Col total/HDL 3.3."
      },
      {
        "nombre": "seronex",
        "dosis": "100mg vo: 1 y medio cada mañana. A la vez, sugiero llevar nivel de vitamina D a valores más óptimos por estar cursando episodio anímico actual (idealmente 50-60). Te sugiero usar Osteodyn 100.000 UI/2ml, vo., 1 shot por 1 vez. Luego de una semana, retomar dosis de mantención de vitamina D que ya usas (los 800 UI diarios)."
      },
      {
        "nombre": "Osmetil",
        "dosis": "18 mg vo: 1 en la mañana por 6 días, luego 2 cada mañana. Enviarme reporte de cómo te has sentido, al cabo de 1 semana tomando 2 en la mañana."
      },
      {
        "nombre": "minfel",
        "dosis": "36mg vo: 1 cada mañana (cambia presentación; iniciar al cabo de 10 días de haber aumentado el seronex)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418008_hrm27hgg4",
    "ficha": 64,
    "nombre": "Ena Lucia Rocco Castro",
    "rut": "11071499-8",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 3 octubre 11.30hrs",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56986848494"
    ],
    "email": "enaroc54@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "despues vino la pandemia, rabia porq familiares querian aprovecharse de temas legales de herencias y",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "sertralina",
        "dosis": "100mg vo: 1 cada mañana"
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75 mg XR vo: 1 cada mañana (inicia)"
      },
      {
        "nombre": "tronsalan",
        "dosis": "100mg vo:  1/4 cada noche, hace 2 semanas"
      },
      {
        "nombre": "neuryl",
        "dosis": "2mg vo: 1 cada noche, hace 3 años que lo toma, pero ha requerido aumentar ultimamente."
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: medio en la mañana, medio en la tarde (17.00hrs)"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg vo: 1/2 cada noche (reiniciar)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418009_l9h56jr48",
    "ficha": 65,
    "nombre": "Eric Castillo Acevedo",
    "rut": "19386481-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Ecastilloacevedo7@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg vo: 1 SOS (en caso de presentar síntomas como ansiedad intensa, asociada a correlato físico como taquicardia, dficultad para respirar, temblor, sudoración, que se gatillen frente a factores laborales)."
      },
      {
        "nombre": "melatonina",
        "dosis": "3 mg vo: 0-0-2"
      },
      {
        "nombre": "sert",
        "dosis": "100mg, parox20mg."
      },
      {
        "nombre": "litio",
        "dosis": "300mg vo: 1-0-2"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418012_nrtr1assx",
    "ficha": 66,
    "nombre": "Evelyn Loreto Gaete Rios",
    "rut": "16997651-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitavitae 20mg vo: 1/2 cada noche.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56956573687"
    ],
    "email": "Evelyn.gaete.rios@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**Antecedentes Médicos**",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "NiegaAntecedentes quirúrgicos: Tiroidectomía y 2 cesáreasHistoria familiar psiquiátrica: No se registra",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 1/2 en la mañana por seis dias, luego 1 cada mañana"
      },
      {
        "nombre": "sertralina",
        "dosis": "100mg vo: 1/4 cada mañana por 4 días, luego 1/2 cada mañana por 10 dias, luego 3/4 cada mañana por 10 días, luego 1 cada mañana."
      },
      {
        "nombre": "atorvastatina",
        "dosis": "20mg vo: 1/2 cada noche."
      },
      {
        "nombre": "retard",
        "dosis": "75mg: 1 cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5mg: 1 cada noche"
      },
      {
        "nombre": "venlavitae",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "ectiban",
        "dosis": "20mg vo: 1 cada mañana por 10 días, luego 1½ cada mañana"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mg vo: 1 en la noche, por 21 días, luego suspender."
      },
      {
        "nombre": "hasta",
        "dosis": "100mg hace siete años por estrés laboral, sin reacciones adversas."
      },
      {
        "nombre": "escitavitae",
        "dosis": "20mg vo: 1 cada noche por 14 días, luego 1/2 cada noche (disminuye, cambia la presentación y horario)"
      },
      {
        "nombre": "Buspirona",
        "dosis": "10mg vo: 1/2 en la mañana y 1/2  en la tarde, por 14 días, luego aumentar a 1 en la mañana y 1 en la tarde (17.00hrs)"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg vo: 1//4 en la noche por 10 días, luego seguir con 1/2 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418013_ejiqbbamz",
    "ficha": 67,
    "nombre": "Evelyn Patricia Cornejo Matamala",
    "rut": "10926150-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 10 junio 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "contactoevelyncornejo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Vive con pareja Claudio, abogado 42, llevan 1 año",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Eszopiclona",
        "dosis": "3mg noche"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mg vo: 1/2 cada noche por 6 dias, luego 1 cada noche."
      },
      {
        "nombre": "Zopinom",
        "dosis": "3mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418015_ipygefqml",
    "ficha": 68,
    "nombre": "Fabiola Sazo Espinoza",
    "rut": "12589737-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Parcela 21 San Diego Norte San Clemente",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56978788175"
    ],
    "email": "fabiolasazoespinoza@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "solicito evaluación por médico internista / médico familiar , para estudio etiológico de anemia micr",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "losartan",
        "dosis": "50mg dia, venlafxina 150mg 1 cada mañana, quetiapina 25 mg noche, lamotrigina 100mg 1 cada mañana, rexulti 1mg vo: 1 cada mañana."
      },
      {
        "nombre": "quetiapina",
        "dosis": "25mg vo: ½ por 7 dias y luego suspender"
      },
      {
        "nombre": "lamotrigina",
        "dosis": "100mg vo: 1 cada noche"
      },
      {
        "nombre": "tomado",
        "dosis": "150mg de venlafaxina. Le causa hiperhidrosis nocturna. No hay clara asociacion temporal con calor e hiperhidrosis. Rexulti lo empezó hace dos meses, con 0.5mg., hace un mes le aumentó a 1mg. Este año sin examenes de laboratorio. Nunca con ideacion suicida ni intentos. Nota ademas olvidos frecuentes, fallas en atencion y memoria."
      },
      {
        "nombre": "rexulti",
        "dosis": "1mg vo: medio en la noche por 7 dias y luego suspender"
      },
      {
        "nombre": "retard",
        "dosis": "75mg vo: 1 cada mañana"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mg vo: 1 en la noche"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 cada noche, puede aumentar de a cuartos, hasta incluso usar 1 comprimido por noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418016_er7iwlol2",
    "ficha": 69,
    "nombre": "Felipe Ignacio Rodriguez Morales",
    "rut": "18575751-k",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Estudios 4ens media",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56947565916"
    ],
    "email": "Frodriguezmorales23@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418018_bv4hoa06c",
    "ficha": 70,
    "nombre": "Felipe Nuñez Varas",
    "rut": "15994629-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 14 nov 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56932269059"
    ],
    "email": "nunez.varas@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "fue demandado recientemente por madre de su hijo por deudas de pension, pero afirma que no seria jus",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: ½ en la mañana por 6 dias, luego 1 cada mañana"
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: ½ en la mañana y ½ en la tarde (18.00hrs)"
      },
      {
        "nombre": "Neozentius",
        "dosis": "10 mg cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418022_y7vwug6zo",
    "ficha": 71,
    "nombre": "Felipe Tapia Montecinos",
    "rut": "17468412-K",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 12 agosto 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "fltapia@uc.cl",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mgvo 0-0-1"
      },
      {
        "nombre": "Venlafxina",
        "dosis": "150mg lib prolongada de Hospifarma. (no hay relacion temporal de cambio de presentacion)."
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "150mg vo: 2 cada mañana"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mgvo: 1 cada noche (medio los primeros seis dias)."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: medio en la mañana, medio después de almuerzo (prohibido el alcohol mientras estés tomando el dilasedan)."
      },
      {
        "nombre": "Betis",
        "dosis": "10mgvo 1/2 - 1/2 - 0 (8 AM y 15 hrs)."
      },
      {
        "nombre": "Subelan",
        "dosis": "75mg vo OR: 1 cada mañana por 10 días, luego 2 cada mañana hasta agotar la caja (comprar solo 1 caja de 75mg). Luego continuar con subelan OR 150mg vo: 1 cada mañana."
      },
      {
        "nombre": "venlaf",
        "dosis": "150mg vo 2-0-0, además folipil y colágeno."
      },
      {
        "nombre": "Aradix",
        "dosis": "10mg vo: medio en la mañana por 4 dias, luego 1 en la mañana por 4 días, luego 1 y medio en la mañana por 4 dias, luego 2 cada mañana. Enviarme reporte al final del tratamiento."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418024_1ypxi9mdu",
    "ficha": 72,
    "nombre": "Fernanda Mejias Maripangui",
    "rut": "16624849-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 31 julio 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56999140601"
    ],
    "email": "Fermejias.maripangui@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mgvo: 1 cada noche (primeros seis dias la mitad)"
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg vo: 1 cada noche."
      },
      {
        "nombre": "Neozentius",
        "dosis": "20mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418026_clv15iwo3",
    "ficha": 73,
    "nombre": "Fernando Ernesto Vasquez Orellana",
    "rut": "10448943-5",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Luradon 20mg vo: 1 cada noche, acompañado de al menos 300 cal.  (inicia)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56995470010"
    ],
    "email": "vasfero@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "pregabalina",
        "dosis": "75mg vo 0-0-1, rosuvastatina 20mg vo cada noche, eszopiclona 3 mg vo una cada noche, receta magistral de vitamina D indicada x 8 semanas, unidades desconoce."
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg  vo:  1/2 en la mañana, 1/2 en la tarde (18.00hrs)"
      },
      {
        "nombre": "Luradon",
        "dosis": "20mg vo: 1 cada noche, acompañado de al menos 300 cal.  (inicia)"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3 mg vo: 1 cada noche (mantener)"
      },
      {
        "nombre": "lurasidona",
        "dosis": "20mg vo 2 cada noche. Sin somnolencia excesiva. Sin insomnio de conciliacion evidente, asociado a falta de higiene del sueño. Hay noches que duerme de corrido, ocasionalmente ha tenido despertar nocturno y prende la tv, sin intentar volver a dormir. Despertando a las 11.00hrs."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418031_yl9qdfta6",
    "ficha": 74,
    "nombre": "Francesca Antonia Lorenza Capozzo Chamorro",
    "rut": "19696938-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-06-10",
    "direccion": "Avenida Rauquen 2589 torre 11, depto 503, Curicó",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56976302752"
    ],
    "email": "fcappozzo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ocupación: Enfermera",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ritlecitinib",
        "dosis": "50mg/día (desde 2019, ensayo clínico Pfizer para alopecia areata)"
      },
      {
        "nombre": "Neozentius",
        "dosis": "10mg vo cada mañana (primeros 16 días mitad de dosis)"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vía oral cada mañana (iniciado el 4 de junio 2025)"
      },
      {
        "nombre": "escitavitae",
        "dosis": "10mg vo: 1 cada noche (cambia horario, presentacion y baja dosis)"
      },
      {
        "nombre": "escitalorapm",
        "dosis": "10mg noche)."
      },
      {
        "nombre": "sertac",
        "dosis": "100mg vo: 1/2  cada mañana por 12 días, luego 1 cada mañana. (mejor de inmediato partir con medio**)"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 sos en la noche"
      },
      {
        "nombre": "Buspirona",
        "dosis": "10mg vo: 1/2 cada doce horas por 10 días, luego 1 cada doce horas."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418034_vpet8ayu0",
    "ficha": 75,
    "nombre": "Franchesca Mendoza",
    "rut": "17495316-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Butrino 150mgvo 2-0-0 , mantener",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56974202424"
    ],
    "email": "fmendozad@icloud.com",
    "tutor": "No aplica",
    "ocupacion": "Tiene padres Luis 53 chofer gas, consumo prob cocaína con crisis en 206. Madre Isabel d.c. de 48 año",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "memantina",
        "dosis": "10mg: medio por noche aumentando cada 1 semana en medio hasta llegar a 20mg noche."
      },
      {
        "nombre": "glifortex",
        "dosis": "1000mg noche por resistencia insulina desde meses."
      },
      {
        "nombre": "aripiprazol",
        "dosis": "10mgvo 0-0- ¼ por 5 días, luego 0-0- ½ por 5 días luego 0-0-1"
      },
      {
        "nombre": "arip",
        "dosis": "10mgvo 0-0-1 algo cansancio. planteo quiza fluvoxamina pero no, se abordara con no famracologico. estuvo un tiempo con liraglutide por peso hasta marzo , por 2 meses. haciendo pagos por inet acceso por compy, sin acceso a tarjetas de credito. efectivo 25 mil por semana. 1 regalo chico 1 vez al mes a si misma. va al lider, cotizando. examenes laboratorio ok."
      },
      {
        "nombre": "aripirprazol",
        "dosis": "10mg noche. sugiero pst ej abordar tematica consumo de padre. mantener TO. control 11 noviembre."
      },
      {
        "nombre": "bupropion",
        "dosis": "150mgvo 1-0-0 por 20 dias, luego subir a 300."
      },
      {
        "nombre": "wellbutrin",
        "dosis": "300mg XL 1-0-0 + aripiprazol 10 0-0- 1/2"
      },
      {
        "nombre": "Butrino",
        "dosis": "150mgvo 2-0-0 , mantener"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo 0-0- 1 los domingos durante 1 mes."
      },
      {
        "nombre": "Elontril",
        "dosis": "300mg xl 1-0-0"
      },
      {
        "nombre": "Vivimex",
        "dosis": "20mg: 0-0-1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418037_ub9mid1oc",
    "ficha": 76,
    "nombre": "Franchesca Isabel Mendoza Díaz",
    "rut": "17495316-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Butrino 150mgvo 2-0-0 , mantener",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56974202424"
    ],
    "email": "fmendozad@icloud.com",
    "tutor": "No aplica",
    "ocupacion": "Tiene padres Luis 53 chofer gas, consumo prob cocaína con crisis en 206. Madre Isabel d.c. de 48 año",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "memantina",
        "dosis": "10mg: medio por noche aumentando cada 1 semana en medio hasta llegar a 20mg noche."
      },
      {
        "nombre": "glifortex",
        "dosis": "1000mg noche por resistencia insulina desde meses."
      },
      {
        "nombre": "aripiprazol",
        "dosis": "10mgvo 0-0- ¼ por 5 días, luego 0-0- ½ por 5 días luego 0-0-1"
      },
      {
        "nombre": "arip",
        "dosis": "10mgvo 0-0-1 algo cansancio. planteo quiza fluvoxamina pero no, se abordara con no famracologico. estuvo un tiempo con liraglutide por peso hasta marzo , por 2 meses. haciendo pagos por inet acceso por compy, sin acceso a tarjetas de credito. efectivo 25 mil por semana. 1 regalo chico 1 vez al mes a si misma. va al lider, cotizando. examenes laboratorio ok."
      },
      {
        "nombre": "aripirprazol",
        "dosis": "10mg noche. sugiero pst ej abordar tematica consumo de padre. mantener TO. control 11 noviembre."
      },
      {
        "nombre": "bupropion",
        "dosis": "150mgvo 1-0-0 por 20 dias, luego subir a 300."
      },
      {
        "nombre": "wellbutrin",
        "dosis": "300mg XL 1-0-0 + aripiprazol 10 0-0- 1/2"
      },
      {
        "nombre": "Butrino",
        "dosis": "150mgvo 2-0-0 , mantener"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo 0-0- 1 los domingos durante 1 mes."
      },
      {
        "nombre": "Elontril",
        "dosis": "300mg xl 1-0-0"
      },
      {
        "nombre": "Vivimex",
        "dosis": "20mg: 0-0-1"
      },
      {
        "nombre": "pluriamin",
        "dosis": "10mg vo: 1 sos por insomnio ocasional de conciliacion."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418039_skkfvv2ix",
    "ficha": 77,
    "nombre": "Francisca Alejandra Pérez Ibarra",
    "rut": "17717855-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Bonavid 50000 UI vo: 1 cápsula cada semana por 4 semanas",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56999181782"
    ],
    "email": "perezfrancisca2010@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "trittico",
        "dosis": "100mg vo: 1/4 cada noche. Puede usar medio comprimido en caso de no lograr dormir bien."
      },
      {
        "nombre": "altruline",
        "dosis": "50mg vo y necesita tomar media trazodona en la noche para dormir mejor."
      },
      {
        "nombre": "trazodona",
        "dosis": "100 mg vo: medio cada noche"
      },
      {
        "nombre": "Total",
        "dosis": "214 mg/dL**, Colesterol HDL 60 mg/dL, **Colesterol LDL 136 mg/dL**, Triglicéridos 91 mg/dL, VLDL 18 mg/dL; General: Creatinina 0.78 mg/dL, **Glucosa 106 mg/dL**."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418042_vjffg0mrw",
    "ficha": 78,
    "nombre": "Francisca Toro Moscoso",
    "rut": "20952786-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Clotiazepam 10mg VO: ½ comprimido en la mañana, ½ comprimido en la tarde (17:00 hrs), por 2 semanas, luego suspender. Puede usar clotiazepam 10mg sublingual SOS (no más de 2 veces al día).",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "francisca.anais1213@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Estudiante de enfermería 3er año UCM.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg VO: ½ comprimido en la mañana, ½ comprimido en la tarde (17:00 hrs), por 2 semanas, luego suspender. Puede usar clotiazepam 10mg sublingual SOS (no más de 2 veces al día)."
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75mg VO: 1 comprimido cada mañana, por 14 días. Posteriormente aumentar a venlafaxina 150mg VO: 1 comprimido cada mañana."
      },
      {
        "nombre": "Quetiapina",
        "dosis": "100mg VO: ½ comprimido cada noche"
      },
      {
        "nombre": "Oxibutinina",
        "dosis": "10mg vo: medio en la noche junto con la trazodona"
      },
      {
        "nombre": "toma",
        "dosis": "50 mg de quetiapina, lo que le ayuda a dormir bien. Fuma en promedio un cigarrillo diario. Anteriormente bebía alcohol con mayor frecuencia, pero hace tiempo que no consume, tampoco otras drogas. En los últimos meses ha estado leyendo sobre autismo, lo consultó con su psicóloga y encontraron algunos rasgos. Sus padres invalidaron sus sospechas de autismo. Le realizaron ADOS-2 que resultó positivo para TEA grado I, principalmente en dificultades para socializar. Ella se siente identificada con el TEA y considera que es un diagnóstico acertado. No presenta mucho apetito, niega atracones, no se pesa, no nota cambios relevantes en su peso, aunque se percibe gorda. Niega purgas. No impresiona como TEA durante la sesión. Actualmente con alta carga académica."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg:"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg tomando 1 comprimido. No refiere hiperhidrosis. Funcionamiento académico severamente impactado, con sensación de incomprensión por parte del cuerpo docente respecto a su situación de salud mental, particularmente en contexto de evaluaciones pendientes post licencia médica. Expresa frustración significativa ante deterioro en rendimiento académico, área que históricamente constituía fuente de autoestima (\"lo único que había hecho bien\")."
      },
      {
        "nombre": "Tronsalan",
        "dosis": "100mg vo: 1 comprimido cada noche"
      },
      {
        "nombre": "Buspirona",
        "dosis": "10mg vo: ½ comprimido en la mañana y ½ comprimido en la tarde (16:00 hrs) durante 4 días. Posteriormente aumentar a 1 comprimido en la mañana y 1 comprimido en la tarde."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418043_6tk0s9f1d",
    "ficha": 79,
    "nombre": "Francisco Avaca",
    "rut": "15140178-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 13 enero 2025",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "franciscoavacab@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: ½ en la mañana por 6 días, luego 1 cada mañana. Escribirme un reporte acerca de cómo se ha sentido, al cabo de llevar 14 días tomando 1 comprimido entero."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418044_yu6ahrtqo",
    "ficha": 80,
    "nombre": "Fresia Gonzalez Suarez",
    "rut": "5722900-4",
    "edad": 88,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1937-08-02",
    "direccion": "Baquedano 720, cauquenes.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "fran.cancino0209@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "quetiapina",
        "dosis": "50mg noche (uso por dos semanas y no le daba sueño suficiente) y sertralina 50mg (lab chile) 1 en la noche (hace aprox 2 semanas). Clonazepam 2mg vo: 1/2 cada noche."
      },
      {
        "nombre": "Clonazepam",
        "dosis": "2mg vo: 1/2 en la noche por 2 semanas, luego 1/4 en la noche por 2 semanas, luego suspender."
      },
      {
        "nombre": "atorvastatina",
        "dosis": "20mg vo: ½ en la noche por 10 días, luego 1 cada noche"
      },
      {
        "nombre": "Seronex",
        "dosis": "100mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418047_qa0b3ta88",
    "ficha": 81,
    "nombre": "Fuad Alfredo Abuter Aburto",
    "rut": "14068610-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "En 2020 terminó contrato bchile. Ahora concesionario de 2 estaciones de copec. Administra 2 estaciones de copec.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56994179407"
    ],
    "email": "Fuadabuter@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "tomo",
        "dosis": "15mg de cloti y 1 clonazepam luego de episodio de irritaiblidad marcado."
      },
      {
        "nombre": "Azymol",
        "dosis": "5mg vo: 1/2 en la mañana por 4 dias; luego 1 cada mañana por 4 días; luego 1 1/2 en la mañana por 8 días, luego 2 cada mañana hasta agotar la caja. Luego continuar con azymol 10mg vo: 1 cada mañana, hasta el control."
      },
      {
        "nombre": "Brintellix",
        "dosis": "10mg vo: 1/2 cada noche por 3 dias y luego suspender."
      },
      {
        "nombre": "Risperdal",
        "dosis": "1mg vo: 1 en la noche por 7 dias, luego 2 en la noche por 7 dias, luego 3 cada noche."
      },
      {
        "nombre": "propanolol",
        "dosis": "40mg vo: medio cada ocho horas."
      },
      {
        "nombre": "Rize",
        "dosis": "5 mg vo: 1 sos"
      },
      {
        "nombre": "Litio",
        "dosis": "300mg vo: medio en la mañana y medio en la noche, por 7 días. Luego 1 en la mañana y 1 en la noche. Al cabo de llevar ocho dias con esta dosis de litio, tomarse litemia, tsh, t4l, bun, crea y ELP, se adjunta orden de exámenes."
      },
      {
        "nombre": "Topamax",
        "dosis": "50mg vo: 1/2 en la noche por 7 días, luego 1/2 en la mañana y medio en la noche por 7 días. Luego 1/2 en la mañana y 1 en la noche por 7 días, luego continuar con 1 cada doce horas, hasta el control."
      },
      {
        "nombre": "Rimox",
        "dosis": "3 mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418048_rhe04n4p5",
    "ficha": 82,
    "nombre": "Fuad Alfredo Abuter Aburto",
    "rut": "14068610-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 14 agosto 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56994179407"
    ],
    "email": "Fuadabuter@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "tomo",
        "dosis": "15mg de cloti y 1 clonazepam luego de episodio de irritaiblidad marcado."
      },
      {
        "nombre": "Azymol",
        "dosis": "5mg vo: 1/2 en la mañana por 4 dias; luego 1 cada mañana por 4 días; luego 1 1/2 en la mañana por 8 días, luego 2 cada mañana hasta agotar la caja. Luego continuar con azymol 10mg vo: 1 cada mañana, hasta el control."
      },
      {
        "nombre": "Brintellix",
        "dosis": "10mg vo: 1/2 cada noche por 3 dias y luego suspender."
      },
      {
        "nombre": "Risperdal",
        "dosis": "1mg vo: 1 en la noche por 7 dias, luego 2 en la noche por 7 dias, luego 3 cada noche."
      },
      {
        "nombre": "propanolol",
        "dosis": "40mg vo: medio cada ocho horas."
      },
      {
        "nombre": "Rize",
        "dosis": "5 mg vo: 1 sos"
      },
      {
        "nombre": "Litio",
        "dosis": "300mg vo: medio en la mañana y medio en la noche, por 7 días. Luego 1 en la mañana y 1 en la noche. Al cabo de llevar ocho dias con esta dosis de litio, tomarse litemia, tsh, t4l, bun, crea y ELP, se adjunta orden de exámenes."
      },
      {
        "nombre": "Topamax",
        "dosis": "50mg vo: 1/2 en la noche por 7 días, luego 1/2 en la mañana y medio en la noche por 7 días. Luego 1/2 en la mañana y 1 en la noche por 7 días, luego continuar con 1 cada doce horas, hasta el control."
      },
      {
        "nombre": "Rimox",
        "dosis": "3 mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418049_6d90rnype",
    "ficha": 83,
    "nombre": "Gabriela Arenas Basualto",
    "rut": "pendiente-83",
    "edad": 33,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1992-04-04",
    "direccion": "Loma Verde, parcela 34, Pencahue",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56950496193"
    ],
    "email": "gabrielaarenas.psp@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Situación familiar: Tiene un hijo, Santiago (8 meses). Su pareja es Cristian (36 años, abogado).",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega alergias medicamentosas.",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418051_txc6mee64",
    "ficha": 84,
    "nombre": "Gabriela Espinoza Maldonado",
    "rut": "16483241-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "> ** ACTUAL:** PASAJE 10 CALLE 2 1614 PUERTAS DEL SUR, MAULE. (mayo 2022)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "gabynutricionista@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> soltera, vive con su hermana magdalena de 31 años profe + pareja de hermana Mario ingeniero turnos",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "sertralina",
        "dosis": "100mgvo 2-0-0"
      },
      {
        "nombre": "clonazepam",
        "dosis": "2mgvo: 0-0- ½"
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "150mgvo OR 2-0-0, reotmar las 2!."
      },
      {
        "nombre": "aprox",
        "dosis": "40 mg y se mantuvo luego sin supervision de medico, nunca con psicologo/a. Se fueron a vivir juntos con luis una vez establecidos en talca, nació Antonia en el 2018. Hace ocho meses el le pidio matrimonio, mas luego fueron teniendo dificultades, el le sugeria (no queda claro si en tono de broma o no) que debia realizarse una cirugia plastica en el futuro, él empezó a tener estilo de vida fitness, le reprochaba que solo se preocupaba de Antonia y que no tenían relaciones sexuales, en contexto de un mes que estuvo Gabriela con quiste en evaluación a nivel ginecologico y le indicaron abstinencia por ese mes. Con el paso del tiempo él se fue a dormir a otra pieza. Describe que un día discutieron y él la echó de la casa. Comenta que tenian discusiones intensas, con empujones de ambos, la ultima vez él hizo ademán de golpearla y ella le dijo que no iba a aguantar más esa situación, así que decidió irse donde la hermana. Un día llegó a casa de luis sin aviso y lo encontró con otra mujer a quien él escondió en una pieza. Él decidió después cambiar las chapas de todas las puertas. Mientras estaba con luis él le sugirío cambiar a sertralina, ha estado con 200mg desde larga data. Ultimamente le cuesta dormir, rumiando por ruptura, ha tomado 7,5mgzopiclona que le surge efecto. Le preocupa que se ha sentido mucho mas irritable, sobre todo con Antonia, niega vif física pero aveces le responde con gritos y luego experimenta culpa. Le cuesta hablar acerca de emociones distintas de la rabia que siente hacia él. Lo demandó sin previa mediacion familiar por pago de pension de alimentos de 800.000, él no estuvo de acuerdo y preveen próxima audiencia. En cuatro días más se cambian de casa con su hermana y cuñado a una más grande donde puedan vivir los cuatro. Red familiar mayoritariamente en viña del mar. Lleva 22 dias con licencias (una de 10 y otra de 12 dias de medico general), le gustaria volver a trabajar pero esta en estos cambios y crisis, cambio de casa, afectada comprensiblemente emocional, etc… escamoteo al hablar acerca de aspectos propios que puedan haber influido en ruptura. En las tardes ha empezado a tomar 1 botellin de mistral ice algunos dias a la semana junto a su hermana."
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mgvo 0-0-1"
      },
      {
        "nombre": "rize",
        "dosis": "10mg 1 comp sos por noche. envio receta por sistema"
      },
      {
        "nombre": "ravotril",
        "dosis": "2mgvo 0-0-1"
      },
      {
        "nombre": "clona",
        "dosis": "1mg noche."
      },
      {
        "nombre": "ciblex",
        "dosis": "15mgvo 0-0- ½ (inicia)"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mgvo 1/2 -0-0 , por 8 dias, luego 1-0-0"
      },
      {
        "nombre": "venlavitae",
        "dosis": "150mg 2-0-0). Ultimamente ha usado clotiazepam SOS 10mgvo : 1/2 sos. En la mañana y casi todas las noches."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mgvo: 1/2 cada mañana por 6 dias y luego 1 cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1/2 en la mañana, 1/2 después de almuerzo, 1 en la noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418054_xxq7fvzim",
    "ficha": 85,
    "nombre": "Gabriela Paiva Cáceres",
    "rut": "9894678-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Qx 2cca, HTSOB, tiroidectomia por carcinoma, protesis cadera derecha (hace aprox 1 año).",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56994997342"
    ],
    "email": "Gabrielapaivacaceres@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Wellbutrin",
        "dosis": "300mgvo XL : 1 cada mañana"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mg vo: 1 cada mañana por 6 días, luego 2 cada mañana."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mgvo: 1/2 en la mañana por 10 dias y luego 1 cada mañana"
      },
      {
        "nombre": "Butrino",
        "dosis": "150mg vo: 1 en la mañana por 10 días y luego suspender"
      },
      {
        "nombre": "osmetil",
        "dosis": "27mg por 2 cajas, ya que no hay stock de minfel de 27."
      },
      {
        "nombre": "Neurok",
        "dosis": "30mg, con un plan de titulación gradual y monitorización de respuesta a los 10 días para evaluar incremento a 50mg. Se mantiene Ectiban 20mg y la suplementación con bisglicinato de magnesio en dosis nocturna."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418056_7t1r09t5v",
    "ficha": 86,
    "nombre": "Gabriela Reyes Muñoz",
    "rut": "18571990-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "El 5 abril murio su padre, luego tomo lm. IAM a los 51. nada dg. Repentino.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Gabireyes83@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg: 1/2→1 AM. Bisglicinato Mg 200mg noche. Labs: hemograma, creatinina, glicemia, vitD."
      },
      {
        "nombre": "Zolpidem",
        "dosis": "5mg sublingual cada noche. Control 26 junio 20.00hrs. Mantener psicoterapia. Lmer por f32.1 desde hoy x 30dias."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418057_atvl5fzvj",
    "ficha": 87,
    "nombre": "Gema Rosa Navarro Vidal",
    "rut": "8068398-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Entre 2017-2021 por factores riesgo laboral uso de psicofarmaco cnz, preabalina en algun momento. Sert le ayudo ahí",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56989569979"
    ],
    "email": "Genavi2004@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Profesora basica historia 5to 8vo, desde 2015 encargada convivencia escolar, colegio comuna Stgo.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "pregabalina",
        "dosis": "75mgvo: 0-0-1/4, valpax 0.5mgvo: 0-0- 1/2, depurol retard 75mg vo: 1-0-0. No le dijo q suspendiera el cymbalta."
      },
      {
        "nombre": "Duloxetina",
        "dosis": "60mg vo: 1 cada noche"
      },
      {
        "nombre": "Cymbalta",
        "dosis": "30mg cada noche por 6 dias, luego 2 cada noche. Al terminar la caja, continuar con Cymbalta 60mg vo: 1 cada noche."
      },
      {
        "nombre": "Zopinom",
        "dosis": "3mg vo: 1 cada noche."
      },
      {
        "nombre": "Duceten",
        "dosis": "60 mgvo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418057_3mfabmj2p",
    "ficha": 88,
    "nombre": "Genesis Cisterna Briceño",
    "rut": "18090663-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Rut 18090663-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56948839826"
    ],
    "email": "genesisanaiscis@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Trabajo como técnico en enfermería en el área de obstetricia y puericultura en HRT",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ceritizina",
        "dosis": "10mg día hace como 6 meses compatible con lactancia. Josefa ya esta con 2 comidas e intentando relleno. sin alergias. AC inyectable trimestral. qx rpevia lagrimal tapado. antec familiar abuela materna y madre DM2. suicidio abuelo materno antes q naciera."
      },
      {
        "nombre": "fluoxetina",
        "dosis": "20mgvo 1-0-0 inicio medio seis dias"
      },
      {
        "nombre": "dominium",
        "dosis": "20mgvo 1-0-0, mitad primeros seis dias."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418058_10cmlma4l",
    "ficha": 89,
    "nombre": "Gerardo Antonio Chandia Garrido",
    "rut": "15139335-7",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Agomelatina 25mg vo: 1 cada noche",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56998812721"
    ],
    "email": "gchandia@ucm.cl",
    "tutor": "No aplica",
    "ocupacion": "Profesor psicologia en UCM, además consulta particular (además peritajes forenses)",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Agomelatina",
        "dosis": "25mg vo: 1 cada noche"
      },
      {
        "nombre": "lansoprazol",
        "dosis": "30mg vo 1 cada mañana hace 3 semanas indicado por otorrino"
      },
      {
        "nombre": "lexapro",
        "dosis": "20mg vo: 1 en la mañana, durante 4 meses, suspendido hace 3 semanas"
      },
      {
        "nombre": "tomara",
        "dosis": "10mg lexapro. Dejó de roncar ahora luego de suspendidos los farmacos (incluso esposa tuvo que cambiar de pieza por ronquidos). Pero desde suspension ha estado muy irritable, ej retar a hijas o a esposa. Anoche discusion mas fuerte con esposa por la irritabilidad de él. Tuvo brain zaps clasicos con baja de lexapro."
      },
      {
        "nombre": "basal",
        "dosis": "86 mg/dl."
      },
      {
        "nombre": "total",
        "dosis": "179 mg/dL, Col. HDL 50.0 mg/dL, TG 92 mg/dL, Col. VLDL 18 mg/dl, Col. LDL 111 mg/dl."
      },
      {
        "nombre": "Vessone",
        "dosis": "20mg vo: 1 cada mañana por 10 días, luego 1 1/2 cada mañana por 10 dias. Después seguir con Vessone 40mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418059_8f9hu23z4",
    "ficha": 90,
    "nombre": "Gonzalo Patricio Crisostomo Roa",
    "rut": "19873662-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Hace 2 años tbjo seccion investigacion policial, premiado por desempeño, lo asendieron a cabo 2do. Estuvo 1 año aprox. Lo mandaron encubierto a una marcha, lo reconocieron, lo fueron a buscar a la comisaria la gente para pegarle. Le gritan en la calle, amenazas de muerte, (se angustia mucho al hablarlo), lo cancelaron, no podia salir a disco con expareja. Comisraia lo tiraron a reten, notando privilegios solo a otros, no lo dejaban salir como a otros \"porque era soltero\". Jefe lo trataba mal, criticas constantes.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56935211957"
    ],
    "email": "Gonzalocrisostomoroa154@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Hermana Fca 16, estudiante",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clonazepam",
        "dosis": "2mgvo: 0-0-1"
      },
      {
        "nombre": "Fluoxetina",
        "dosis": "20mg vo: 1-0-0"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg: 1 en la mañana, 1 en la noche."
      },
      {
        "nombre": "Ravotril",
        "dosis": "2mgvo: 1 cada noche."
      },
      {
        "nombre": "Deslafax",
        "dosis": "100mgvo: 1/2 -0-0"
      },
      {
        "nombre": "Ciblex",
        "dosis": "15mgvo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418062_vgyh5ints",
    "ficha": 91,
    "nombre": "Graciela Berrios Troncoso",
    "rut": "6736871-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Hija 45, la menor 34. Una hija vive en Talca (4 total) 2 en stgo y otra en Concon.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982153578"
    ],
    "email": "Gracielaberriost@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Oficios previos: dueña de casa siempre, alfebetizacion para minusvalidos, clases ed fisica, adm en c",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Atorvastatina",
        "dosis": "40mg noche, cardioplus 20/12.5 1 al dia, cilostazol 50mg cada doce, rivaroxaban 20mg 1 al dia."
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75mgvo: 2-0-0"
      },
      {
        "nombre": "Rosuvastatina",
        "dosis": "20mgvo: 1 cada noche por 3 meses (debe iniciar luego de una semana de haber suspendido la atorvastatina)."
      },
      {
        "nombre": "Duloxetina",
        "dosis": "30 mgvo: 1-0-0 (reumatologo, hace una semana)"
      },
      {
        "nombre": "dulocetina",
        "dosis": "60 mg (1 cada mañana)"
      },
      {
        "nombre": "Olanzapina",
        "dosis": "5 mg vo: luego 1 cada noche."
      },
      {
        "nombre": "Risperdal",
        "dosis": "1mgvo: 1 en la noche por 6 dias, luego 2 cada noche."
      },
      {
        "nombre": "Rize",
        "dosis": "10mgvo: 1 sos una hora antes de la resonancia."
      },
      {
        "nombre": "Venlakem",
        "dosis": "75mgvo: 3 cada mañana (aumenta)."
      },
      {
        "nombre": "Ezcopiclona",
        "dosis": "3mgvo: 1 cada noche"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo or: 2 cada mañana (suspender venlafaxina de 75mg)"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "10mgvo: medio en la noche por 4 dias y luego suspender."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "2mgvo: 1 cada noche (disminuye dosis)"
      },
      {
        "nombre": "Dagotil",
        "dosis": "3mg vo: 1 cada noche"
      },
      {
        "nombre": "Nuvigil",
        "dosis": "150mg vo: 1/4 en la mañana por 4 dias. Luego 1/2 cada mañana. Al cabo de una semana tomando la mitad, escribirme un mail contándome cómo se ha sentido."
      },
      {
        "nombre": "Alendronato",
        "dosis": "70mg a la semana."
      },
      {
        "nombre": "nevinex",
        "dosis": "75mg o noche porq tomo 1 vez y le costo despertar."
      },
      {
        "nombre": "Olanvitae",
        "dosis": "10mg vo: 1/2 cada noche"
      },
      {
        "nombre": "olivin",
        "dosis": "5 mg vo: 1 cada noche"
      },
      {
        "nombre": "Duceten",
        "dosis": "60mg vo: 1 cada mañana"
      },
      {
        "nombre": "Haloperidol",
        "dosis": "1mg vo: 1/2 cada 8 horas por 10 días, luego 1 cada 8 horas por 10 días. Luego suspender y seguir con haloperidol 5mg vo: 1/2 cada 12 horas."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5 mg vo: medio en la mañana, medio en la tarde (18.00hrs)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418064_i3mhcgse6",
    "ficha": 92,
    "nombre": "Hector Ferrada Rivas",
    "rut": "16728507-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2025-07-09",
    "direccion": "37 oriente 1961, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982456281"
    ],
    "email": "haferriv@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**Antecedentes Médicos**",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Penicilina con antecedente de anafilaxia.",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75 mg vía oral cada mañana"
      },
      {
        "nombre": "tomando",
        "dosis": "75mg de venlafaxina"
      },
      {
        "nombre": "hasta",
        "dosis": "150mg) considerando respuesta parcial, aunque con preocupación por costo elevado del medicamento. No se evidencian síntomas psicóticos estructurados ni ideación suicida activa. Psiquiatra sugiere exámenes complementarios (análisis sanguíneo y electrocardiograma) no realizados por falta de comunicación. Se establece correo electrónico para mejorar seguimiento (haferriv@gmail.com)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418065_6h3i5ipiq",
    "ficha": 93,
    "nombre": "Hugo Rojas de la Fuente",
    "rut": "17185516-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": ": 13 oriente a 3242",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56950597155"
    ],
    "email": "kmtlugo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: Patricia , madre, 49 años, dueña de casa",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "trittico",
        "dosis": "100mgvo: un cuarto en la noche por cuatro días, luego seguir con la mitad de la pastilla."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418066_1bi4z1fac",
    "ficha": 94,
    "nombre": "Ignacio Alvarado Olivares",
    "rut": "17978546-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "ignacioalvarado519@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mgvo 0-0- 1/4 por 4 dias, luego 1/2 por 4 dias luego 3/4 luego 1 . Mandar reporte en 1 mes."
      },
      {
        "nombre": "lamotrigina",
        "dosis": "100mgvo 1-0-1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418067_sxzeiut6h",
    "ficha": 95,
    "nombre": "Isidora Jesus Yukich Lamas",
    "rut": "21744904-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Duerme 7-9 hrs. Fatiga de todas formas al otro dia.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Isidora.yukich@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Padre biologico Nenad 54 ingeniero clases en la U, vive en Curicó, ella si tien contacto con el , 1 ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitavitae",
        "dosis": "10mg vo: medio en la noche por 6 dias luego 1 cada noche."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo: 1 cada noche, inicia"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mgvo: 1 cada mañana por 4 dias, luego 2 cada mañana por 4 dias, luego 3 cada mañana"
      },
      {
        "nombre": "venlavitae",
        "dosis": "75mgvo 1 cada maana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418068_aal0y5bvw",
    "ficha": 96,
    "nombre": "Constanza Martinez Conde",
    "rut": "16574753-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-10-29",
    "direccion": "Hace 16 años padres separaron y padre rapido emparejó con una mujer de Colombia, la llevó a vivir con ellos altiro, ha tenido él cinco intentos suicida. Constanza suele ser quien asume responsabilidades. Hace dos semanas le diagnosticaron cancer terminal a su padre, primario de prostata, metastasis ganglionar. Él tiene nueva pareja hace seis meses, se llama Oscar él, piensa casarse prontamente, vinculacion de él es bien ambivalente. Separada hace aprox 1 año, estuvo con su padre, pero padre con nueva pareja provocó que ella volvera con su esposo, Julio Jara. Julio cuando bebe poco se pone jugoso. Psicologa sospecha que no se separa de Julio por temor a que tenga intentos suicida igual que su padre, se lo dijo hace 2 años.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56942756269"
    ],
    "email": "Constanzamcr@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ingeniero comercial",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418070_3iym3i4nl",
    "ficha": 97,
    "nombre": "Jacqueline Del Carmen Muñoz Nuñez",
    "rut": "10684184-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-05-19",
    "direccion": "21 poniente A 906 Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56926153093"
    ],
    "email": "jmunoznunez0171@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**Antecedentes Médicos**",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Dipirona",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg 1 comp/noche, Eszopiclona 3mg 1 comp/noche, Dilasedan [clotiazepam] 10mg). Reporta RAM a inicio de Escitalopram (síntomas gastrointestinales \"tripas alborotadas\", temblor, sensación de nerviosismo/extrañeza). Nota mejoría en estabilidad emocional (puede recordar a su madre, entrar a su habitación, sin labilidad previa). Describe sensación \"extraña\" caracterizada por nerviosismo, menor capacidad atencional, fallas en memoria reciente, sensación de bloqueo, errores laborales (discrepancias con colegas sobre información entregada). Refiere persistencia de cefalea (ha requerido paracetamol), fatiga significativa a pesar de aumento en motivación (\"tengo ganas de hacer cosas\" vs. previa apatía/hipersomnia). Respecto a medicación cardiovascular, informa que cardiólogo suspendió espironolactona hasta verificar niveles de potasio, no se ha realizado exámenes solicitados en consulta anterior."
      },
      {
        "nombre": "Duloxetina",
        "dosis": "30mg vo: 1 cada noche  (generica)"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg vo: 1/2 sos sublingual (le quedaban de indicacion de cardiologo de tiempo atras, la usó cuando tuvo episodio de vomitos)."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg: 1/2 comprimido cada noche por 6 días, luego 1 comprimido cada noche"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg: 1/2 comprimido en mañana y tarde"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mg: 1 comprimido cada noche (suspender zopiclona)"
      },
      {
        "nombre": "Binax",
        "dosis": "30mg vo: 1 cada mañana por 6 días, luego 2 cada mañana hasta terminar la caja. Luego continuar con Binax 60mg vo: 1 cada mañana."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 cada noche. Puede usar 1/2 , 3/4, o 1 comprimido entero."
      },
      {
        "nombre": "Realta",
        "dosis": "60mg vo: 1 cada noche  (ya que no hay stock de Binax de 60mg)"
      },
      {
        "nombre": "Noptic",
        "dosis": "2mg vo: 1 cada noche"
      },
      {
        "nombre": "Prednisona",
        "dosis": "20mg vo: 1 cada doce horas por 5 días, luego suspender"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418071_etgzbfb8n",
    "ficha": 98,
    "nombre": "Jaime Contreras Avendaño",
    "rut": "7084427-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram 10mg vo: 1/2 cada mañana por 10 dias y luego suspender.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "contreras.jaime.manuel@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Vive con: esposa Ruth dueña de casa + nieto (hijo de hija fallecida) Jaime Diaz, 22 años estudia en ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "aspirina",
        "dosis": "100mg, omeprazol 20mg dia, metformina 1000mg dia, atorvastatina 20mg dia, losartan 50mg dia, amlodipino 5mg dia, además el movigil y el escitalopram., zopiclona media cada noche."
      },
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 1 cada mañana, lleva dos meses; movigil 100mg vo: hace un par de semanas, pero inicia despues de la crisis de panico.  Psicoterapia en cesfam dionisio astaburuaga, estuvo cada quince dias, ahora cada un mes aprox. esta terapia hace aprox desde dos meses. Nunca antes habia estado con terapia ni tratamiento de salud mental. Él se dedicó al trabajo para distraerse, no vivió el duelo en su momento. Ahora que tuvo este accidente que está con kinesioterapia, empieza a procesar mas el duelo, a sufrirlo, Ruth vivia en la misma casa. Hija falleció en la casa, luego de que terminaron de almorzar, Jaime la subió al auto, la llevaron al hospital y no repsondio a reanimación, a sus 42 años, sin morbilidades cardiovasculares previas ella. Abuelo de Jaime murió de IAM a los 70 años. Jaime tuvo IAM en 2012, con stent medicado."
      },
      {
        "nombre": "Sertralina",
        "dosis": "100mg vo: 1 cada mañana."
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75mg vo: 2 cada mañana hasta agotar esa caja. Luego continuar con el ectien XR 150mg vo: 1 cada mañana."
      },
      {
        "nombre": "Sertac",
        "dosis": "100mg vo: 1/4 cada mañana por 4 días, luego 1/2 cada mañana por 10 días, luego 1 cada mañana."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mg vo: 1 cada noche"
      },
      {
        "nombre": "generica",
        "dosis": "100mg vo: 1 cada mañana (no compró el sertac)"
      },
      {
        "nombre": "Ciblex",
        "dosis": "30mg vo: 1/2 en la noche por 14 días y luego 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418085_e14zkz83h",
    "ficha": 99,
    "nombre": "Drawing 2025-08-11 18.27.18.excalidraw",
    "rut": "pendiente-99",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418086_zkju5201e",
    "ficha": 100,
    "nombre": "Javier Morales Alvarez",
    "rut": "16096827-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Levotiroxina 112mcg lunes a domingo",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "moralesalvarezjavier@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: maria ignacia 30 años , esposa, ingeniero comercial tbja en constructora + hijo 1 año y me",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Atorvastatina",
        "dosis": "40mg mantener"
      },
      {
        "nombre": "somno",
        "dosis": "10mg vo: 1 a veces en la noche, ademas atorvastatina"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: 1/4 cada noche."
      },
      {
        "nombre": "solo",
        "dosis": "25 mg trazodona."
      },
      {
        "nombre": "Somnipax",
        "dosis": "10 mg vo: 1/2 en la noche por 7 días, luego 1/4 en la noche por 2 semanas, luego suspender"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418088_wk28bwfb5",
    "ficha": 101,
    "nombre": "Javiera Zamora Roco",
    "rut": "17494559-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram  10mg VO: 1 cada noche, pero al cabo de diez días bajar a medio, mantener la mitad por 10 días y luego suspender.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56950593670"
    ],
    "email": "javiera.zamora.roco@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "10mg sos."
      },
      {
        "nombre": "Escitalopram",
        "dosis": "10mg VO: 1 cada noche, pero al cabo de diez días bajar a medio, mantener la mitad por 10 días y luego suspender."
      },
      {
        "nombre": "Vortioxetina",
        "dosis": "10mg vo: 1/2 en la mañana por 4 días, luego 1 cada mañana."
      },
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: 1/2 en la noche por 6 dias, luego 1 cada noche. Enviarme reporte por mail al cabo de 10 dias de llevar 1 entero."
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: medio en la mañana, medio en la tarde (17.00hrs), 1 en la noche."
      },
      {
        "nombre": "Valdoxan",
        "dosis": "25 mg vo: 1 cada noche."
      },
      {
        "nombre": "topiramato",
        "dosis": "50mg vo: medio cada noche (iniciar en diez dias mas), por 10 días. Luego aumentar a 1/2 cada doce horas"
      },
      {
        "nombre": "Topivitae",
        "dosis": "100mg vo: medio cada doce horas (aumenta dosis neta)"
      },
      {
        "nombre": "aripiprazol",
        "dosis": "5mg vo:  medio cada noche por 10 días y luego 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418090_qs68d72t3",
    "ficha": 102,
    "nombre": "sugerencias de analisis caso gpt a partir de info del 15 oct",
    "rut": "pendiente-102",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "vortioxetina",
        "dosis": "20 mg no hay respuesta suficiente y la bulimia continúa activa pese a psicoterapia, plantear estrategia alternativa: reemplazar vortioxetina por fluoxetina dirigida a bulimia o, si el ánimo está mejor con vortioxetina, mantenerla y abordar bulimia primordialmente con psicoterapia especializada."
      },
      {
        "nombre": "Mantener",
        "dosis": "10 mg/d por 7–10 días más y, si no hay respuesta clara o es parcial, subir a 20 mg/d. Evaluar respuesta a 4–6 semanas desde cada ajuste.|Perfil favorable en cognición y sexualidad; buena opción para TDM con enlentecimiento y rumiación.|"
      },
      {
        "nombre": "dejar",
        "dosis": "50 mg solo nocturno. Suspender si HCO₃⁻ bajo, hipokalemia o síntomas persisten.|Útil para reducir purgas, pero está generando parestesias, fasciculaciones e interferencia cognitiva.|"
      },
      {
        "nombre": "hasta",
        "dosis": "60 mg/d, solo si se decide reemplazar y no combinar con vortioxetina; empezar 20 mg y titular cada 1–2 semanas según tolerancia.|Fluoxetina es el fármaco con mayor evidencia en bulimia; la paciente tuvo embotamiento y baja libido previamente, por lo que sería segunda línea si lo no farmacológico y topiramato fallan.|"
      },
      {
        "nombre": "buspirona",
        "dosis": "5 mg cada 8 h, titulando a 10 mg cada 8 h.|Ansiolítico no sedante, sin potencial de dependencia, compatible con vortioxetina.|"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418092_mu8dq1i5p",
    "ficha": 103,
    "nombre": "Javiera Rocio Marin Carreño",
    "rut": "20656378-8",
    "edad": 24,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2001-01-06",
    "direccion": "Ingreso 22 agosto 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Marin.javiti@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Etifoxina",
        "dosis": "50mg al día, primero era 2 veces al dia, desde marzo 1 al dia en la mañana."
      },
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo: 1/2 cada noche por 6 dias, luego 1 cada noche."
      },
      {
        "nombre": "Isotretinoina",
        "dosis": "10mg vo: 1 cada tarde"
      },
      {
        "nombre": "hasta",
        "dosis": "15 mg por año y medio. Duloxetina tb embotamiento afectivo."
      },
      {
        "nombre": "Stresam",
        "dosis": "50mg vo: 1 cada mañana"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1 cada noche"
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5 mg vo: medio en la mañana por 2 días, luego 1 en la mañana por 4 días. Luego 1 1/2 en la mañana por 4 días, luego 2 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418093_x2vcblxq2",
    "ficha": 104,
    "nombre": "Javiera Rojas Wilson",
    "rut": "21130994-6",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2025-06-25",
    "direccion": "Neozentius 10mg: 1/2 en la noche por 4 días, luego 1 cada noche",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56962290320"
    ],
    "email": "ignaciarw02@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "estudiante de medicina en 5to UCM",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "15 mg vo: 1 cada noche por 10 dias, luego suspender y continuar con Ectiban 20mg vo: 1 cada noche."
      },
      {
        "nombre": "venlafaxina",
        "dosis": "75mg vo: 1 cada mañana."
      },
      {
        "nombre": "neozentius",
        "dosis": "10mg vo: 1/2 en la noche por 4 dias, luego 1 cada noche. Al cabo de 10 días, enviarme reporte por correo acerca de cómo te has sentido."
      },
      {
        "nombre": "dilasedan",
        "dosis": "5mg vo: 1 sos en caso de mucha ansiedad. no más de dos veces en un día."
      },
      {
        "nombre": "eszopiclona",
        "dosis": "2 mg vo: 1 cada noche por 2 semanas, luego suspender"
      },
      {
        "nombre": "total",
        "dosis": "215 mg/dL (VR: <200)**, colesterol HDL 80 mg/dL (VR: 40-60), **colesterol LDL 115.4 mg/dL (VR: <110)**, triglicéridos 98 mg/dL (VR: 25-150). ELECTROLITOS: sodio 139.8 mEq/L (VR: 137.0-145.0), potasio 4.20 mEq/L (VR: 3.50-5.10), cloro 102.0 mEq/L (VR: 98.0-107.0). OTROS: glicemia 99 mg/dL (VR: 60-100), nitrógeno ureico 13.0 mg/dL (VR: 7.0-18.7), creatinina 0.60 mg/dL (VR: 0.20-1.04), TSH 2.44 uIU/mL (VR: 0.40-4.00), T4 libre 1.08 ng/dL (VR: 0.78-2.19), vitamina D 33.1 ng/mL (VR: óptimo 30-100)."
      },
      {
        "nombre": "Ectiban",
        "dosis": "20 mg vo: 1 cada noche"
      },
      {
        "nombre": "trazodona",
        "dosis": "100mg vo:  1/4 noche  (puedes aumentar hasta 1 cada noche)."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Rize",
        "dosis": "5 mg vo: 1 sos, idealmente no más de dos veces a la semana."
      },
      {
        "nombre": "Propanolol",
        "dosis": "10 mg vo: 1 en la mañana SOS."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/2 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418094_0yglfnia0",
    "ficha": 105,
    "nombre": "Jehannette Francisca Ortiz Montecinos",
    "rut": "pendiente-105",
    "edad": 24,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2001-05-18",
    "direccion": "Escitalopram 10mg, quetiapina 25 mg, zopiclona 7.5 mg y melatonina 3mg",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56944109117"
    ],
    "email": "jehannetteortizm@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Estudiante de Fonoaudiología , 2do año Sto Tomás, estudió TENS completo.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg, quetiapina 25 mg, zopiclona 7.5 mg y melatonina 3mg"
      },
      {
        "nombre": "sertralina",
        "dosis": "100mg, quetiapina y melatonina. Siguió tomando estos farmacos sin supervision, cada cierto tiempo consultando psiquiatra por descompensacion de insomnio (sintoma importante ), irritabilidad. Solia sentir miedo cuando chica, ej que le fuera a pasar algo a la mamá cuando salía. Luego en 8vo basico tuvo periodo de restriccion alimentaria, tomaba mucha agua , hacia harto ejercicio, sospecha que tuvo un tno conducta alimentaria, tuvo amenorrea por  3 meses, cuadro cedió con apoyo de madre y sin tto formal. Ultima evaluacion psiquiatrica fue en pandemia por telemedicina, dormia muy mal muy superficial, al otro dia somnolienta, ahi volvio con sertralina y quetiapina y a las semanas tuvo respuesta animica. En 2021 primera crisis de panico, tuvo psicoterapia que buscó ella por sintomas depresivos,  asociado a muerte de abuelo cinco meses antes, junto a muerte de su mperrita de toda la vida. Estuvo 3 meses con psicologa por duelo, le dieron alta, tambien tuvo ahi insomnio. En 2022 de nuevo crisis de panico, reinició sertralina quetiapina y melatonina; luego empezó a notar aumento de peso,  madre le recomendó traslape de sertralina a escitalopram (madre tuvo respuesta a escitalopram), mantuvo quetiapina 25mg noche y melatonina, pero meses despues seguia con insomnio, una vecina le sugirió zopiclona. Desde entonces toma (desde 2022) escitalopram 10mg , quetiapina 25mg (toma irregular), zopiclona 7.5mg noche y melatonina 3mg noche."
      },
      {
        "nombre": "Quetiapina",
        "dosis": "25 mg vo: suspender."
      },
      {
        "nombre": "Melatonina",
        "dosis": "3mg vo: suspender."
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg vo: 1/4 cada noche, puedes usar según respuesta: 1/2, 3/4, hasta 1 cada noche. (sugiero trittico)"
      },
      {
        "nombre": "Neopresol",
        "dosis": "10mg vo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418096_gaeaj41hj",
    "ficha": 106,
    "nombre": "Jesús Alberto Salinas Rodríguez",
    "rut": "17681137-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 12 diciembre 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56997154177"
    ],
    "email": "Jesalinasrodriguez@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "mejor amigo, felipe rojas, le recomendo ver psiquiatra. Hace un año termino de relacion significativ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: 1 cada mañana (media los primeros seis dias). Al cabo de 14 días tomando una pastilla entera, escribirme acerca de cómo te has sentido."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418097_84ebktms7",
    "ficha": 107,
    "nombre": "Guia",
    "rut": "pendiente-107",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418098_gxilsciop",
    "ficha": 108,
    "nombre": "Joaquín Vignolo Daruich",
    "rut": "pendiente-108",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-08-29",
    "direccion": "Pasaje La Campana 1186, Los Ángeles, Octava Región",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982515376"
    ],
    "email": "j.vignoloda@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Profesión: Ingeniero comercial",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10 mg vo: medio en la mañana por 6 dias y luego 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418100_nkyz58oyg",
    "ficha": 109,
    "nombre": "recomendaciones no farmacológicas Joaquin Vignolo 29 agosto 2025",
    "rut": "pendiente-109",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418101_061bzy8wb",
    "ficha": 110,
    "nombre": "Jocelyn Nataly Gonzalez Eriz",
    "rut": "17040333-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Pje 21 sur B 0773 talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56988611027"
    ],
    "email": "jgonzalezeriz@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sertac",
        "dosis": "50mgvo: medio cada mañana por 8 días, luego 1 cada mañana."
      },
      {
        "nombre": "tomando",
        "dosis": "50mg."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418158_t617ch008",
    "ficha": 111,
    "nombre": "Jorge Eduardo Jorquera Sepúlveda",
    "rut": "8611498-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Vale. Oye, ¿cuál es su ? La mía es Villa Aurora, San Clemente. Ya, ¿se ubicó para allá? Sí, para que vaya. Oiga, y en San Clemente, Aurora, ¿cuál es el número de casa, de sitio, qué sé yo? Sin número. Sin número. Mire, mire, yo lo voy a decir donde vivo yo. ¿Ya? San Jorge Norte se llama. ¿Ya? Frente a la copa de agua hay un huapón grande para el lado, para la mano, yendo para arriba te para la mano izquierda.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56930704632"
    ],
    "email": "franciscaescarol@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Estaba con nutricionista usted, con enfermera, con podómonos. ¿Ocupa insulina usted? No, la doy por ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "quetiapina",
        "dosis": "100mg vo: 1 cada doce horas, hace aprox 1 semana inició."
      },
      {
        "nombre": "clonazepam",
        "dosis": "2mg vo: 1 cada noche."
      },
      {
        "nombre": "aciclovir",
        "dosis": "400 mg c/12 h, cotrimoxazol L-M-V, Ca + vitamina D y AAS 100 mg/día. Al término: médula ósea negativa, Ig séricas descendidas; sin radioterapia."
      },
      {
        "nombre": "talidomida",
        "dosis": "100 mg/d + dexametasona 40→12→10 mg/sem + AAS 100 mg/día. Control clínico y bioquímico bueno; neuropatía distal leve."
      },
      {
        "nombre": "valproico",
        "dosis": "200mg vo: 1 cadda doce horas, hace 1 semana."
      },
      {
        "nombre": "dexametasona",
        "dosis": "40 mg/sem. Profilaxis: aciclovir 400 mg c/12 h, cotrimoxazol L-M-V, Ca + vitamina D y AAS 100 mg/día. Al término: médula ósea negativa, Ig séricas descendidas; sin radioterapia."
      },
      {
        "nombre": "risperidona",
        "dosis": "1mg vo: 1 cada noche por 4 dias, luego 2 cada noche por 6 dias, luego suspender y continuar con risperidona 3 mg vo: 1 cada noche."
      },
      {
        "nombre": "quetidin",
        "dosis": "100mg vo: 1 en la mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418164_2v4tiv77h",
    "ficha": 112,
    "nombre": "Jose Lizama Canio",
    "rut": "15275937-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 10mg vo: medio en la mañana por 6 dias, luego 1 cada mañana por 14 dias. Luego 2 cada mañana hasta acabar la caja. Luego continuar con Ectiban 20mg vo: 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Jose.martin.lizama@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "El colesterol LDL (malo) salió alto, recomiendo ver con médico general, lo mismo respecto a leve alt",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: medio en la mañana por 6 dias, luego 1 cada mañana por 14 dias. Luego 2 cada mañana hasta acabar la caja. Luego continuar con Ectiban 20mg vo: 1 cada mañana."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: ½ en la mañana, ½ en la tarde (18.00hrs)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418168_qas5evj6p",
    "ficha": 113,
    "nombre": "Josefa Villagra Jorquera",
    "rut": "21672758-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Topiramato 100mg vo: 1-0-1",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "josefavillagrajorquera@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "tiene hermana Florencia 18 años, vive con madre, Pascal 12 años vive con madre Paola 42 años es prof",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "**Eje I: Trastornos Clínicos y Otras Condiciones que Pueden ser Objeto de Atención Clínica**",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75mg vo: 1 cada mañana (nunca ha usado dosis mas alta)"
      },
      {
        "nombre": "olanzapina",
        "dosis": "10mg vo: 1 cada noche (antes tomaba 15mg)"
      },
      {
        "nombre": "quetiapina",
        "dosis": "100mg vo: 1 cada noche (maxima dosis que ha usado)"
      },
      {
        "nombre": "clonazepam",
        "dosis": "2 mg vo: 1/2 cada noche (maxima dosis ha sido 2 mg dia)"
      },
      {
        "nombre": "vildagliptina",
        "dosis": "50mg: 1 al dia"
      },
      {
        "nombre": "topiramato",
        "dosis": "50mg cada doce (dosis mas alta que ha usado)"
      },
      {
        "nombre": "ciprofibrato",
        "dosis": "100mg noche"
      },
      {
        "nombre": "valproico",
        "dosis": "200 mg VO 1-0-1, olanzapina 10 mg VO ½-0-1, quetiapina 25 mg VO 0-0-1, clonazepam 2 mg VO ½-0-½. Indicaciones: reposo relativo, régimen común, farmacovigilancia y supervisión familiar estricta, adherencia a controles y acudir a urgencias SOS. Control ambulatorio en CSMC Talca con psiquiatría agendado para el 19 de agosto de 2024 con Dr. Moena."
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg 1/2 cada noche, puedes usar hasta 1 en la noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418170_ok677ypbx",
    "ficha": 114,
    "nombre": "Josefina Espinoza",
    "rut": "21712839-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Levotiroxina 25mcg: 1-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Josefina.espinoza.delgado@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Vive con: madre TS 56, padre contador 66",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Dominium",
        "dosis": "20mg vo: 1/2 cada mañana por 10 días, luego 1 cada mañana por 10 días, luego 2 cada mañana."
      },
      {
        "nombre": "Rize",
        "dosis": "10mg vo: 1/2 en la mañana al levantarse, 1/2 en la tarde (17:00hrs)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418183_k0fm77noa",
    "ficha": 115,
    "nombre": "Joselyne Millangir Aravena",
    "rut": "15139397-7",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2025-05-09",
    "direccion": "Venlafaxina 75mg vo: 1 cada mañana mantener",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56977415680"
    ],
    "email": "j.millangir.a@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Vive con: madre Gisell 75 años, dueña de casa + hija 12 años estudiante + agustin hijo 2 años 3 mese",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": ":",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75 mg vo: 1 cada mañana, hace 1 año. antes tomo sertralina y le dio nauseas."
      },
      {
        "nombre": "Sertralina",
        "dosis": "25mg una en la mañana"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "5mg media en la noche"
      },
      {
        "nombre": "Pregabalina",
        "dosis": "75mg una en la noche"
      },
      {
        "nombre": "mirtazapina",
        "dosis": "30mg vo: medio cada noche."
      },
      {
        "nombre": "TOTAL",
        "dosis": "144 mg/dL (<200), NITROGENO UREICO EN SANGRE 7.31 mg/dL (3-12), UREA 0.16 gr/L (0.06-0.26), **ACIDO URICO EN SANGRE 2.60 mg/dL (3.50-7.20)**, FOSFORO EN SANGRE 5.3 mg/dL (3.4-5.4), CALCIO (SANGRE) 9.95 mg/dL (8.50-10.10), GLUCOSA BASAL 92 mg/dL (70-99)"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg media según crisis de pánico"
      },
      {
        "nombre": "retard",
        "dosis": "150mg vo XR: 1 cada mañana"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: un cuarto cada noche."
      },
      {
        "nombre": "Osmetil",
        "dosis": "18mg vo: 1 cada mañana por 6 días, luego 2 cada mañana. Enviarme reporte al cabo de 1 semana tomando dosis de 36 mg día."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418190_n58pdk1cw",
    "ficha": 116,
    "nombre": "guia psicoeducativa para familia jose ojeda 22 agosto",
    "rut": "pendiente-116",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "Entregar pautas claras y prácticas para apoyar la recuperación de José, focalizadas en organización ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418192_2ngd1q740",
    "ficha": 117,
    "nombre": "José Ojeda Parot",
    "rut": "17932484-9",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 20 agosto 14.00hrs.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56966460401"
    ],
    "email": "jojedap10@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Madrastra manda audio informando que José no está adheriendo a rutina, hay agotamiento de red de apo",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "lamotrigina",
        "dosis": "200mg vo: 1 cada noche, quetiapina 50mg vo: 1 cada noche (tambien ambos hace años). Usa pellet de disulfiram y naltrexona, hace 3 semanas. Hace seis meses con samexid, ahora con 70mg. Tuvo dg de infancia de TDA"
      },
      {
        "nombre": "Quetiapina",
        "dosis": "50mg vo: 1 cada noche (mantener)"
      },
      {
        "nombre": "lexapro",
        "dosis": "20mg vo 1 cada mañana hace varios años (aprox 6 años), lamotrigina 200mg vo: 1 cada noche, quetiapina 50mg vo: 1 cada noche (tambien ambos hace años). Usa pellet de disulfiram y naltrexona, hace 3 semanas. Hace seis meses con samexid, ahora con 70mg. Tuvo dg de infancia de TDA"
      },
      {
        "nombre": "Brintellix",
        "dosis": "10mg vo: 1/2 en la mañana por 10 días, luego 1 cada mañana."
      },
      {
        "nombre": "Samexid",
        "dosis": "70mg vo: 1 cada mañana (mantener)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418193_i431m2mav",
    "ficha": 118,
    "nombre": "Juan Miguel Davidson Pereira",
    "rut": "10053918-7",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Hace 2 meses sintomas ansiosos marcados, sin alcanzar a constituir crisis de pánico. Muy sensible, refiere estar con mas vulnerabilidad al llanto. Factor de cambio ha sido madre que fue a vivir con ellos hace 2 años, era autovalente, hace cuatro meses empeora y quedó postrada; tienen cuidadora buena lun a viernes. Todo lo debe planificar en función de su madre. Es el menor de los hermanos. Se culpa de ambivalencia hacia su madre por lo desgastado que está. Alto estrés laboral, constructora trabaja sabados, domingos inclusivos, con alta carga laboral cuantitativa que si bien es cronica ahora nota que le está pasando cuenta. Principal red de apoyo es su esposa. Describe fatiga a diario, angustia a diario, opresion toracica gran parte del tiempo. Le gusta su trabajo, pero le preocupa estar irritable y puede repercutir en su trabajo.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "jmdavidsonp@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: esposa Lilian 55años educadora de parvulos tbja en la UCM, tiene fundacion educacional par",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "melatonina",
        "dosis": "3 mg vo: 3 cada noche"
      },
      {
        "nombre": "losartan",
        "dosis": "50mg cada doce"
      },
      {
        "nombre": "alfadoxina",
        "dosis": "4 mg dia."
      },
      {
        "nombre": "Escitalopram",
        "dosis": "20mg vo:    1 cada mañana  (aumentar a 20mg a partir de 5 días) (sugiero: ectiban, ipran, neopresol, neozentius)."
      },
      {
        "nombre": "hidroclorotiazida",
        "dosis": "50mg dia"
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 en la mañana por 4 días, luego 1 cada mañana por 14 días, luego continuar con 1 1/2 cada mañana. *Al cabo de 14 dias de estar con 1 entero, enviarme reporte por mail acerca de cómo se ha sentido."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3 mg vo: 1 cada noche (suspender zopiclona)"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1/2 en la mañana, 1/2 en la tarde (18.00hrs)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418196_l0obrrstj",
    "ficha": 119,
    "nombre": "Juan Riquelme Pacheco",
    "rut": "16299244-9",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Cumple 1 mes abstinente el 8 julio.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "chenimv@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "risperidona",
        "dosis": "3mg 0-0- ½. mantener psicoterapia."
      },
      {
        "nombre": "disulfiram",
        "dosis": "500mgvo 0-0- ½ (inicia)"
      },
      {
        "nombre": "wellbutrin",
        "dosis": "300mg xl 1-0-0"
      },
      {
        "nombre": "Buxon",
        "dosis": "150mgvo 1 cada mañana por 6 días, luego 1 en la mañana y 1 al almuerzo."
      },
      {
        "nombre": "minfel",
        "dosis": "18 mg vo: 1 cada mañana por diez dias, luego 2 cada mañana por diez dias. Si hubo buena tolerancia y efecto parcial benefico: aumentar a 54 mg día."
      },
      {
        "nombre": "Topiramato",
        "dosis": "50mgvo:"
      },
      {
        "nombre": "amato",
        "dosis": "50mg vo: medio cada doce horas por 7 dias, luego 1 cada doce horas hasta agotarlos. Luego seguir con Amato 100mg vo: medio cada doce horas."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418199_94zpypzj4",
    "ficha": 120,
    "nombre": "Juana Ximena Cubillos Lara",
    "rut": "9168010-6",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram 10mg vo: 1½ cada noche por 10 días, luego continuar con escitalopram 20mg vo: 1 cada noche.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56988134223"
    ],
    "email": "janita1706@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "tiene hijos mayores de edad: el mayor de 40 años, hija de 38 años, hijo de 33 (Diego, que la acompañ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "azatioprina",
        "dosis": "50mg vo: 2 -0-1"
      },
      {
        "nombre": "atorvastatina",
        "dosis": "20mg vo: 0-0-1"
      },
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 1 cada noche**"
      },
      {
        "nombre": "esomeprazol",
        "dosis": "40mg 1-0-0"
      },
      {
        "nombre": "mestinon",
        "dosis": "60mg vo: ½ -1-½"
      },
      {
        "nombre": "prednisona",
        "dosis": "5mg vo: 1-0-0"
      },
      {
        "nombre": "escitavitae",
        "dosis": "10mg vo: 1 cada noche (primeros seis dias solo la mitad)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418200_wpxhntv7c",
    "ficha": 121,
    "nombre": "Karina Ahumada Vargas",
    "rut": "17138244-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "kar8889@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con : esposo Danny 36 años, constructor civil en Nuevo Sur + Rocio prima de esposo 22 años estu",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "seronex",
        "dosis": "100mg vo: 1/4 en la mañana por 6 dias, luego 1/2 cada mañana. Al cabo de 10 días de estar con media pastilla, enviarme reporte de cómo te has sentido."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418201_pgiz7r7jx",
    "ficha": 122,
    "nombre": "Karina Parada",
    "rut": "15570134-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Bandera 0424, Linares",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "karina.hernandez123@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418204_6q3wcmm2m",
    "ficha": 123,
    "nombre": "Katerina Amaro Martinez",
    "rut": "17321890-7",
    "edad": 4,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2021-02-18",
    "direccion": "Villa santa hilda, pasaje los Almendros #559 ( actual nov 2025), san clemente",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "k.amaro.martinez@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "rebrote de urticaria luego de 2 días de comer pescado, sigue con antihistaminicos en altas dosis, si",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75mg vo 1-0-0 XR ectien XR"
      },
      {
        "nombre": "levocetirizina",
        "dosis": "5mg cada 6 hrs. el antih1 rotó hace una semana aprox. todavia no pasa urticaria, a pesar de indicacion y evaluacion formal de dermato (dr yañez) tomo hace dos dias ketorolaco y tuvo angioedema. 12 cigarros al dia. hizo tambien tto de h.pylori que podia haber influido y que le salio en la EDA, pero no cede urticaria. Dermato la vio hace unos dias y le dijo q en caso de no ceder luego de terminar ese tto y cumplido 1 mes, se iba a considerar iniciar omalizumab (sin riesgos psiquiatricos, 600 lucas mensuales por aprox 6 meses, riesgo de anafilaxia requiere administracion en unidad de salud). Me comunico con dr yañez por telefono y acordamos retrasar inicio de omalizumab y esperar evolucion de dermato por 1 mes a contar de retorno lboral que inicia en 2 semanas. Ha adherido mejor a psicoterapia. no ha vuelto a fumar marihuana."
      },
      {
        "nombre": "escitalopram",
        "dosis": "20mgvo 1-0-0 + levocetirizina 5mgvo 1-1-1-1 (hace 2 meses cambio de antiH), esomeprazol y naratriptan sos unos tres días perimenstrual. *embutidos le dan rash*"
      },
      {
        "nombre": "Lisdexanfetamina",
        "dosis": "50mg vo: 1 en la mañana"
      },
      {
        "nombre": "lexapro",
        "dosis": "20mg noche."
      },
      {
        "nombre": "noptic",
        "dosis": "3 mg noche se inicia"
      },
      {
        "nombre": "ipran",
        "dosis": "10 mg noche y vlf 75 mg xr en la mañana. Le dio mucho sueño con 3 mg eszopi asi que ha seguido con 1.5 y ok. Algo nerviosa y leve irrtabilidad. Logró hablar con su madre, más aliviada. Hoy se tomó laboratorio pedido."
      },
      {
        "nombre": "iran",
        "dosis": "20mg noch, rupatadina y desloratadina. Siestas de 1-2 horas. Ya está con psicólogo, tiene hora la prox semana."
      },
      {
        "nombre": "Samexid",
        "dosis": "30mgvo: 1-0-0"
      },
      {
        "nombre": "ectiban",
        "dosis": "20mg vo: 1 cada noche"
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: ½ en la mañana y 1 en la tarde (18.00hrs)"
      },
      {
        "nombre": "mirtavitae",
        "dosis": "30mg vo: ½ en la noche por 4 dias, luego 1 cada noche"
      },
      {
        "nombre": "escitavitae",
        "dosis": "20mg vo: 1 cada mañana"
      },
      {
        "nombre": "paxon",
        "dosis": "10mg vo: 1/2 en la mañana, 1/2 en la tarde (17.00hrs) (buhochile.com)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418209_nz8ftfh8h",
    "ficha": 124,
    "nombre": "Kimberly Alarcón Sandoval",
    "rut": "19895149-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Nov 2022: envio receta subelan or 150mgvo 1-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "berlin0826.02@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "goval",
        "dosis": "1 mg vo ½ - 0 - 0 por 3 días y luego 1-0-0"
      },
      {
        "nombre": "aripiprazol",
        "dosis": "10mgvo 0-0- ¼."
      },
      {
        "nombre": "arip",
        "dosis": "10mgvo 0-0- ½ , mantener 80mg fluoxetina, control se agenda para el lun 25 octubre a las 20.00hrs."
      },
      {
        "nombre": "ectien",
        "dosis": "75mg 2-0-0 xr"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mgvo: iniciar 1 cada mañana por 1 semana, luego 2 cada mañana y al cabo de una semana escribirme para contarme cómo se ha sentido al respecto."
      },
      {
        "nombre": "Propanolol",
        "dosis": "40mg medio cada doce (cef recurrente)"
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mgvo: 1/2 cada mañana"
      },
      {
        "nombre": "cloti",
        "dosis": "5 mg sos. En momentos de angustia, asociado a sufrimiento por termino de Carlos."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo: 2 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418211_hezipmmuw",
    "ficha": 125,
    "nombre": "Konny Sepúlveda Contreras",
    "rut": "18175566-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Concerta 36mg vo 1-0-0, inicio 2023, mas q nada por los turnos cada 2 dias. Dg TDA",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "konny.sepcont@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Enfermera, cirugia HRT, turnos 1d 1n 2l , contrato 2018.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Vortioxetina",
        "dosis": "10mgvo: media en la mañana por 10 dias, luego 1 cada mañana"
      },
      {
        "nombre": "Sertralina",
        "dosis": "50mg vo: 1/2 en la mañana por 10 dias, luego suspender"
      },
      {
        "nombre": "Concerta",
        "dosis": "36mg vo 1-0-0, inicio 2023, mas q nada por los turnos cada 2 dias. Dg TDA"
      },
      {
        "nombre": "tomando",
        "dosis": "50mg hasta hace diez dias. Parece que sertac."
      },
      {
        "nombre": "Altruline",
        "dosis": "100mg vo: 1/2 en la mañana por diez dias, luego 1 cada mañana."
      },
      {
        "nombre": "Zopinom",
        "dosis": "3mg vo: 1 cada noche"
      },
      {
        "nombre": "Minfel",
        "dosis": "54 mg vo: 1 cada mañana"
      },
      {
        "nombre": "valnoc",
        "dosis": "2 mg vo: 1 cada noche"
      },
      {
        "nombre": "osmetil",
        "dosis": "36mg vo: 1 cada mañana. sin stock LICHE de minfel."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418215_0bro6103r",
    "ficha": 126,
    "nombre": "Laura Raquel de Maria Melo Bravo",
    "rut": "19475147-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Venlavitae 150mg vo: 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56976259711"
    ],
    "email": "lauramelobravo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "labchile",
        "dosis": "100mgvo 1-0-0 misma dosis hace más de seis meses. Estaba con sesiones tuvo 2 online psiq online."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Samexid",
        "dosis": "30mgvo: 1 cada mañana."
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mgvo: 1/2 en la mañana por 10 dias, luego 1 cada mañana. Enviarme correo feedback al cabo de 20 días total de tomarlo."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418217_odvd6boyp",
    "ficha": 127,
    "nombre": "Leonardo Antonio aravena apablaza",
    "rut": "17824379-9",
    "edad": 33,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1991-12-18",
    "direccion": "Ingreso 30 diciembre 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56941394574"
    ],
    "email": "Leo.antonioaravena@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "acudir con médico general para iniciar tratamiento de dislipidemia (colesterol alto)",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "loratadina",
        "dosis": "10mg sos por rinitis alergica."
      },
      {
        "nombre": "ectiban",
        "dosis": "10mg vo (mientras puede usar el neozentius): medio en la mañana por seis días, luego uno cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418220_0w7jtb8o1",
    "ficha": 128,
    "nombre": "Leonardo Prieto Valenzuela",
    "rut": "11497023-9",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2025-07-23",
    "direccion": "Sertac 100mg: 1.5 comprimidos cada mañana por 6 días, luego 2 comprimidos cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56984190012"
    ],
    "email": "leoprietov@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "oficio: pensionado por por causas fisicas hace aproximadamente siete años. ha trabajado luego indepe",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "levofloxacino (angioedema, shock anafilactico)",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "lorazepam",
        "dosis": "2mg vo: 1/2 en la mañana a las 7.00hrs, 1/2 a las 13.00hrs, 1/2 a las 18.00hrs, 1 a las 23.00hrs. (por siete dias, luego suspender)"
      },
      {
        "nombre": "seronex",
        "dosis": "50mg vo: 1/2 cada mañana por 6 dias, luego 1 cada mañana. Enviarme reporte de cómo se ha sentido luego de llevar 10 dias con una pastilla entera."
      },
      {
        "nombre": "sertac",
        "dosis": "100mg vo: 1 cada mañana"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: 1/2 cada noche (puede usar hasta 1 entero)"
      },
      {
        "nombre": "omeprazol",
        "dosis": "40 mg, ondansetron 8 mg , lorazepam 4 mg ev, sg 5 % + 6 ampollas tiamina, pero paciente afirma que no le hicieron ningún manejo en urgencias HRT. Posteriormente se fue a la clínica y habría recibido estabilización. Le solicito que me envíe la epicrisis de la clínica, pero se frustra argumentando que se siente sobrepasado para \"buscar más papeles\". No hay claridad que haya tenido evaluación psiquiátrica en urgencias del HRT, al menos no sale descrito en registros de sistema."
      },
      {
        "nombre": "Topiramato",
        "dosis": "50mg vo:"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418222_9yaai3ah0",
    "ficha": 129,
    "nombre": "Lucas Henriquez Briones",
    "rut": "19390764-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "lucashenriquezbriones@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "trittico",
        "dosis": "100mg vo: ¼ en la noche por 14 dias y luego suspender. Puedes usarlo posteriormente como SOS (frente a insomnio)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418223_qsypii1mc",
    "ficha": 130,
    "nombre": "Luis Rebolledo Arellano",
    "rut": "17498794-7",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 1 agosto 2022",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "Vive con: papá luis rebolledo 69 años jubilado era maestro constructor , nancy arellano 61 sd antisi",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo 0-0-1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418225_xc969h4st",
    "ficha": 131,
    "nombre": "Lujan Rey Ricci",
    "rut": "19104992-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "En 2017 sufrio violacion, consultó en 2018, llanto culpable, psicologo la llevó madre, inicio semanal, se pensó incluso en internar en clinica psiquiatrica pero se fue verano a stgo con hna y anduvo mejor, estaba antes en san javier. Agresor hace varios años que no lo ve. Cuatro años con ese psicologo hasta que isapre la dejo solo con med integral. Estuvo con depurol durante cinco años, susp hace un año, estuvo max con 75 mg vo.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "lujanrr.12@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Enfermera en HRT",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mgvo: medio cada mañana por 8 días, luego 1 cada mañana"
      },
      {
        "nombre": "Lexapro",
        "dosis": "10mgvo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418226_5orpm4k8e",
    "ficha": 132,
    "nombre": "Luz Javiera Morales Silva",
    "rut": "17522282-0",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 21 diciembre 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56946112354"
    ],
    "email": "javierams26@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mgvo: medio en la noche por seis días, luego 1 cada noche. Cuando empieces con 1 escitalopram, ahí hay que suspender el Fapris."
      },
      {
        "nombre": "Fapris",
        "dosis": "50mg 1-0-0 cuando la vio muy estresada, en Julio aprox, habla rapido."
      },
      {
        "nombre": "Duromine",
        "dosis": "30mg día , estuvo 45 dias suspendido esta semana,"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: medio en la mañana y medio en la tarde (16.00hrs)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418228_biv0bwm7e",
    "ficha": 133,
    "nombre": "Maite Laclabere Ansoleaga",
    "rut": "16244425-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-06-17",
    "direccion": "Escitalopram 10mg vo: 1 cada mañana hace 6 meses (generico bioequivalente)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56951793123"
    ],
    "email": "maite.laclabere@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "oficio: hace clases de inglés a niños, diseñadora de profesión. 3 dias a la semana en las tardes hac",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo: 1 cada mañana hace 6 meses (generico bioequivalente)"
      },
      {
        "nombre": "Rosuvastatina",
        "dosis": "20mg vo: 1 cada noche; levotiroxina 100mcg vo: medio cada mañana de lunes a sábado, pero los domingo tomar 1."
      },
      {
        "nombre": "glicemia",
        "dosis": "94 mg/dL; HOMA 2.09. hemograma: eritrocitos 4.53 x10^6/ul; hematocrito 41.2 %; hemoglobina 13.8 g/dl; vcm 90.9 fl; hcm 30.5 pg; chcm 33.5 g/dl; leucocitos 5.9 x10^3/ul; fórmula diferencial: basófilos 0 %; eosinófilos <span style=\"color:red\"><u><b>1 %</b></u></span>; mielocitos 0 %; juveniles 0 %; baciliformes 0 %; segmentados 70 %; linfocitos 25 %; monocitos 4 %; plaquetas 299 x10^3/ul; vhs 4 mm/h. perfil lipídico: colesterol total <span style=\"color:red\"><u><b>229 mg/dL</b></u></span>; colesterol hdl 63 mg/dl; colesterol ldl <span style=\"color:red\"><u><b>147 mg/dl</b></u></span>; colesterol vldl 19 mg/dl; triglicéridos 96 mg/dL; índice col total/col hdl 3.63 mg/dl. perfil hepático: bilirrubina total 0.66 mg/dL; bilirrubina indirecta 0.49; bilirrubina directa 0.17 mg/dl; got/ast 21 U/L; gpt/alt 26 U/L; ggt 11 U/L; fosfatasa alcalina 45 U/L; tiempo de protrombina 11.3 s; % actividad protrombina 93.7 %; inr 1.03. hierro: fierro 154.0 µg/dL; capacidad de fijación de fierro 396 µg/dL; uibc 242; % saturación de fierro 38.9 %. vitamina b12 511 pg/ml. 25 hidroxivitamina d 29.2 ng/mL. ferritina 29 ng/mL."
      },
      {
        "nombre": "ferroso",
        "dosis": "325 mg (≈65 mg de hierro elemental): 1 tableta en días alternos, 12 semanas."
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg vo: 1 y medio cada mañana (suspender neopresol)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418229_u89ea1qbu",
    "ficha": 134,
    "nombre": "Manuel José Gavilán Gavilán",
    "rut": "15632164-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 6 febrero 2025",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56944944766"
    ],
    "email": "manu0.4-jg@outlook.com",
    "tutor": "No aplica",
    "ocupacion": "profesion: profesor general basico, trabaja en servicio nacional del patrimonio cultural.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ciblex",
        "dosis": "15mg vo: medio en la noche por 6 dias, luego 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418230_t2u1n8ljc",
    "ficha": 135,
    "nombre": "Manuel Jesus Herrera Acevedo",
    "rut": "6742545-6",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 5 junio 18.30hrs.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56987294705"
    ],
    "email": "manuelliceo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Presentar en Asociación Chilena de Seguridad: licencia médica + DIEP (adjunto archivo, lo debe compl",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo: medio en la noche por 8 días, luego continuar con 1 cada noche."
      },
      {
        "nombre": "Amlodipino",
        "dosis": "10mg."
      },
      {
        "nombre": "Ciblex",
        "dosis": "15mgvo: 1/2 las pirmeras diez noches, luego 1 cada noche."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo: 1 cada noche"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1/2 en la mañana, 1/2 en la noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418233_wpwirgip8",
    "ficha": 136,
    "nombre": "Manuel Rodriguez Zambrano",
    "rut": "14068177-6",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "2025-11-12",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56962469860"
    ],
    "email": "manueldent@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "hace un mes vio psiquiatra, le recomendó su contadora, le indicaron esquema ya descrito, ademas le i",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "quetiapina",
        "dosis": "25mg vo (lab chile) 0-0-1"
      },
      {
        "nombre": "topivitae",
        "dosis": "50mg 0-0-1"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: ½ cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418233_hmmsj65l4",
    "ficha": 137,
    "nombre": "Manuel Rodriguez Zambrano",
    "rut": "pendiente-137",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418234_56mgxk8c2",
    "ficha": 138,
    "nombre": "EDS dieta",
    "rut": "pendiente-138",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418237_hm8bpaipf",
    "ficha": 139,
    "nombre": "Marcela Paz Betancourt Vásquez",
    "rut": "20563938-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-03-13",
    "direccion": "Lamotrigina 50mg vo: 1/2 cada noche durante 14 días y luego suspender",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56966204427"
    ],
    "email": "marcela_betancourt_2411@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: padre Carlos 52 años montura de cañerias algo asi + madre Marcela 52 años dueña de casa y ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "lamotrigina",
        "dosis": "50mg vo: 1 cada noche , se lo indicaron antes de volver a la U, refiere asociado a ansiedad."
      },
      {
        "nombre": "Oxibutinina",
        "dosis": "5 mg vo: 1/2 cada noche. Si notas que no hay efecto suficiente, puedes usar 1 comprimido entero.=="
      },
      {
        "nombre": "tensiomax",
        "dosis": "5mg sos."
      },
      {
        "nombre": "glicemia",
        "dosis": "90 mg/dL (60-100), BUN 16.0 mg/dL (7.0-18.7), creatinina 0.80 mg/dL (0.20-1.04), TFG >60 mL/min/1.73m2 (88.12), Na 140.0 mEq/L (137-145), K 3.80 mEq/L (3.50-5.10), Cl 105.0 mEq/L (98-107), GB 8.28 x10^3/mm3 (4.50-10.50), Hto 40.5% (37-47), Hb 13.4 g/dL (12.0-16.1), plaquetas 343 x10^3/mm3 (150-450), **linfocitos 36% (25-35)**, **HDL 88 mg/dL (40-60)**, colesterol total 158 mg/dL (<200), LDL 58.6 mg/dL (<110), triglicéridos 57 mg/dL (25-150), TP 89.4%, INR 1.07 (0.8-1.2), TSH 2.40 uIU/mL (0.40-4.00), T4L 1.00 ng/dL (0.78-2.19), vitamina B12 377 pg/mL (239-931)."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 cada noche por 10 días, luego 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418240_fqpw4fy7i",
    "ficha": 140,
    "nombre": "Marcela Caceres Arias",
    "rut": "17323179-2",
    "edad": 35,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-05-11",
    "direccion": "Ingreso 15 nov 2021",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "marcecaceres.a@me.com",
    "tutor": "No aplica",
    "ocupacion": "- Gustavo Berner (hijo, estudiante, 7 años)",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Quetiapina",
        "dosis": "25mg"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg al día"
      },
      {
        "nombre": "lamotrigina",
        "dosis": "50mg vo: ½ comprimido en la noche por 14 días, luego ½ comprimido cada doce horas. Cuando lleve 10 días con esta dosis de lamotrigina enviarme reporte vía mail acerca de estado general."
      },
      {
        "nombre": "Eutirox",
        "dosis": "100mg"
      },
      {
        "nombre": "cloti",
        "dosis": "5mgvo 0-0-1"
      },
      {
        "nombre": "bupropion",
        "dosis": "150mgvo: 1-0-0"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418241_6ic1s4sih",
    "ficha": 141,
    "nombre": "Marcela Celis Saavedra",
    "rut": "pendiente-141",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Huilliborgoa, Fundo La Fortuna, parcela 43, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "mbcelis@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ocupación: Profesora de Educación Musical (realiza clases en colegios San Jorge y Las Araucarias)",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75 mg VO cada mañana desde hace un año y medio, indicada por médico general tras cuadro depresivo asociado a duelo y divorcio. No ha tenido seguimiento en salud mental desde la indicación (médico tratante: Daniela Shorwer)."
      },
      {
        "nombre": "Mirtazapina",
        "dosis": "15 mg VO : 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418244_z9xt93f1x",
    "ficha": 142,
    "nombre": "Marcela Leal Valenzuela",
    "rut": "12073018-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Diagonal 22 norte 4833 Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56932439822"
    ],
    "email": "Mlealvalenzuela048@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Tiene hija 25 Monserrat enfermera.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "bien",
        "dosis": "20mg."
      },
      {
        "nombre": "retard",
        "dosis": "20mg día titulado inicio."
      },
      {
        "nombre": "Minfel",
        "dosis": "36 mg vo: 1 cada mañana"
      },
      {
        "nombre": "Zopinom",
        "dosis": "3 mg vo: 1 cada noche SOS."
      },
      {
        "nombre": "samexid",
        "dosis": "30mg vo: 1 en la mañana por 10 días, luego 2 cada mañana. Luego de acabar la caja, continuar con samexid 70 mg vo : 1 cada mañana."
      },
      {
        "nombre": "Neurok",
        "dosis": "70 mg vo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418247_rboir1foj",
    "ficha": 143,
    "nombre": "Marcela Montecino Luengo",
    "rut": "10466064-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Emg 12-12-22: compromiso axonal moderado de nervioradial derecho a nivel del atebrazo esto pudiese corresponder a un sd del interoseo posterior opoerado hace 14 meses aprox. E n estudio emg destaca reclutamiento muscular empobeciod en extensor del indice, en el resto de los musculos se aprecia buen reclutamiento musciular.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56996759075"
    ],
    "email": "marcemonti@live.cl",
    "tutor": "No aplica",
    "ocupacion": "Divorciada hace 5 años de Carlos. Vive con hijo Carlos 27 estudia enfermeria, hermana Monica 8 enfer",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "pamax",
        "dosis": "20mgvo 0-0- ½ por 7 dias luego seguir con 1"
      },
      {
        "nombre": "rize",
        "dosis": "10mgvo ½-0- ½ , receta por 1 mes liche"
      },
      {
        "nombre": "arotex",
        "dosis": "20mgvo 1-0-1"
      },
      {
        "nombre": "escitavitae",
        "dosis": "20mgvo 0-0-2, para irse a la segura"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418251_pptps5bxb",
    "ficha": 144,
    "nombre": "Maria Angelica Zurita Figueroa",
    "rut": "10436909-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Eutirox 50mcg 1 cada mañana, enalapril 10mg cada doce, hidrocloritiazida 25mg cada mañana, escitalopram 10mg vo 2 cada mañana. levotiroxina 100mcg ½ cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Angyzurita2198@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Paciente de 59 años acude a control. Relata que volvió a trabajar el 17 de marzo después de sus vaca",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo 2 cada mañana. levotiroxina 100mcg ½ cada mañana"
      },
      {
        "nombre": "Pregabalina",
        "dosis": "75mg vo 1 cada tarde. Quetiapina 50mg vo 1 cada noche. Clotiazepam sublingual 10mg, medio comp SOS."
      },
      {
        "nombre": "Quetiapina",
        "dosis": "100mg vo: 1/2 cada noche."
      },
      {
        "nombre": "clotiazepam",
        "dosis": "10mg: ½ sublingual SOS"
      },
      {
        "nombre": "enalapril",
        "dosis": "10mg cada doce, hidrocloritiazida 25mg cada mañana, escitalopram 10mg vo 2 cada mañana. levotiroxina 100mcg ½ cada mañana"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mg vo: 1 en la mañana por 10 días, luego continuar con venlavitae 150mg vo: 1 cada mañana."
      },
      {
        "nombre": "sublingual",
        "dosis": "10mg, medio comp SOS."
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: media en la noche, puede usar 1 entero si no duerme bien con media."
      },
      {
        "nombre": "tronsalan",
        "dosis": "100mg vo: 1 cada noche"
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg sublingual: ½ SOS, máximo 2 veces por semana."
      },
      {
        "nombre": "minfel",
        "dosis": "18mg vo: 1 SOS antes del turno noche (si el turno empieza a las 20.00hrs, tomar el minfel justo a las 20.00hrs)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418253_8se5lx6k8",
    "ficha": 145,
    "nombre": "Maria Antonieta Adasme Avaz",
    "rut": "9536483-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-09-10",
    "direccion": "Altruline 50mg vo: 1 cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56996994888"
    ],
    "email": "antonieta.apaz@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "contador auditor, trabaja en SSmaule",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "carbamazepina le dio prurito",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "neuryl",
        "dosis": "2mg vo: medio cada noche"
      },
      {
        "nombre": "neurok",
        "dosis": "30mg vo: 1 cada mañana"
      },
      {
        "nombre": "arizol",
        "dosis": "5mg vo: 1 1/2 cada noche"
      },
      {
        "nombre": "brintellix",
        "dosis": "5mg + rexulti 0.5mg (le causó mayor ansiedad) a la vez siguiendo con zolpidem. entonces ahi se lo cambiaron a inicio 2025 por deroxat cr 25mgvo: 1 cada mañana y sale zolpidem y entra clonazepam. ahi le agregaron armodafinilo 50mg día, luego se lo suspendieron y empezó neurok 30mg día."
      },
      {
        "nombre": "altruline",
        "dosis": "50mg vo: 1/2 en la mañana por 6 días, luego 1 cada mañana"
      },
      {
        "nombre": "aripiprazol",
        "dosis": "5 mg vo: medio cada noche"
      },
      {
        "nombre": "magnesio",
        "dosis": "400mg noche."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 SOS en la noche en caso de dificultad para conciliar el sueño"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418255_m797svje2",
    "ficha": 146,
    "nombre": "Maria Cecilia Rivera Meneses",
    "rut": "9570121-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 16 enero 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982280183"
    ],
    "email": "FAMILIA_OYARZUN@YAHOO.ES",
    "tutor": "No aplica",
    "ocupacion": "certfiicado médico para mañana para viaje",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clonex",
        "dosis": "2mg CD 1/2- 1/4 - 1/4"
      },
      {
        "nombre": "subelan",
        "dosis": "150mg or 1 dia solito."
      },
      {
        "nombre": "Butrino",
        "dosis": "150mg vo: 1 cada mañana por 7 días. Luego 1 en la mañana y 1 al almuerzo."
      },
      {
        "nombre": "Minfel",
        "dosis": "18 mg vo: 1 en la mañana por 10 días, luego 2 cada mañana. Al cabo de 10 días tomando dos cada mañana, escribirme un mail contandome cómo se ha sentido."
      },
      {
        "nombre": "venlavitae",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Osmetil",
        "dosis": "36 mg vo: 1 en la mañana por 1 mes. Luego suspender y continuar con osmetil 54 mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418258_ukiu726vq",
    "ficha": 147,
    "nombre": "Maria Cristina Valenzuela Canales",
    "rut": "5743770-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56992183777"
    ],
    "email": "jjgalleguillos@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "en santiago, vive con una nieta (bernardita) que es enfermera, asesora del hogar",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "sertralina",
        "dosis": "100mg vo: 1. 1/2 cada mañana"
      },
      {
        "nombre": "metformina",
        "dosis": "750mg vo: 1 cada tarde"
      },
      {
        "nombre": "quetiapina",
        "dosis": "50mg xr : 1 cada noche (antes usaba 100mg noche)."
      },
      {
        "nombre": "lansoprazol",
        "dosis": "30mg vo: 1-0-1"
      },
      {
        "nombre": "flecainida",
        "dosis": "100mg vo: 1-0-1"
      },
      {
        "nombre": "risperidona",
        "dosis": "1mg/ml gotas cada mañana, 3 gotas en la tarde"
      },
      {
        "nombre": "amlodipino",
        "dosis": "5mg vo: 1 cada noche"
      },
      {
        "nombre": "trittico",
        "dosis": "25mg vo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418260_7mmv72l1r",
    "ficha": 148,
    "nombre": "Maria Felisa Rojas Santander",
    "rut": "6738014-2",
    "edad": 3,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2022-09-30",
    "direccion": "Desde 2014 cuadro animico larvado, desde que operaron a su hermana. Se ha ido agravando con los años, hasta ahora unas semanas atrás que se agudizó con desanimo, se agrava con la influenza actual. Ahora: muy sensible, pena por muchos motivos, distraida. Se acuesta a las 3 , como habito.porque tbjaba en turnos en ARO HRT. Se levanta aprox a las 10.00hrs. EN el día duerme siesta de 10 minutos, suele andar con sueño. Bajo apetito, ha bajado de peso ultimamente. Asociado a que hace una semana cuadro de influenza moderado, en cama en casa. Ultimamente vertigo y desequilibrio. Se ha caido. Le hicieron RM cerebral el otorrino, quien no le encontró causa orgánica, el 2023. Tenia vitamina D baja. Sin ideacion suicida. Factor protector sus nietos. Irritable ultimamente. Sin sintomas psicoticos.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56983619746"
    ],
    "email": "Maryrojas06@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ciblex",
        "dosis": "30mg vo: 1 cada noche (medio los primeros seis dias)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418263_90ezqufw2",
    "ficha": 149,
    "nombre": "Maria Fernanda Muñoz Zapata",
    "rut": "17992528-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Duloxetina 30mgvo: 1 en la noche por 6 dias, luego 2 cada noche. Luego duloxetina 60mgvo 1 cada noche.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "mmunozz@iabtalca.cl",
    "tutor": "No aplica",
    "ocupacion": "Informe médico: tept a causa de VIF, tto farmacologico, psicoterapia.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Duloxetina",
        "dosis": "30mgvo: 1 en la noche por 6 dias, luego 2 cada noche. Luego duloxetina 60mgvo 1 cada noche."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg 1/2 -0- 1/2"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mgvo: media cada noche"
      },
      {
        "nombre": "Pamax",
        "dosis": "20mgvo: 1/2 en la noche por seis días y luego 1 cada noche."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo 1 en la noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418263_3ixa7s2tq",
    "ficha": 150,
    "nombre": "Maria Fernanda Silva",
    "rut": "19806275-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "21 oriente 12 sur 2761 Block D #402.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56946384487"
    ],
    "email": "m.fernnasilva@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Katerine vende ropa 30 + hermano bastian adm empresas estudiante en la U",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mgvo 0-0- 1 ½ por 6 días, luego 0-0-2 hasta agotar la caja. Luego continuar con escitalopram 20mg 0-0-1"
      },
      {
        "nombre": "ipran",
        "dosis": "10mgvo ¼ en la noche por 5 días, luego aumentar a la mitad por 5 días, luego a ¾ por 5 días y luego continuar con 1 entero."
      },
      {
        "nombre": "dilasedan",
        "dosis": "5mgvo: medio comprimido en la mañana y medio comprimido en la tarde (a la hora de la toma del ipran)"
      },
      {
        "nombre": "orlistat",
        "dosis": "120mg: 1-1-1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418265_20momtd21",
    "ficha": 151,
    "nombre": "Maria Ines Castro Paz",
    "rut": "9696820-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Lab 3 agosto 2024: tsh 4.75 * t4l 0.95 (septiembre 2023: hipo subclinico) vitamina D 24.8. glicosilada 5. rac 5 , elp normales. LDL 166 * , tg 131, hdl 64. glic 88. bun normal.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "corpobien@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Consultar con médico general para que la oriente a manejo de dislipidemia (colesterol alto), seguimi",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Qurax",
        "dosis": "150mg vo: 1 cada noche."
      },
      {
        "nombre": "Topamax",
        "dosis": "50mg vo: 1/2 en la noche por 1 semana, luego 1 cada noche por 1 semana, luego 1/2 en la mañana y 1 en la noche por 1 semana."
      },
      {
        "nombre": "Topiramato",
        "dosis": "100mg vo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418267_ejqcn3i4n",
    "ficha": 152,
    "nombre": "Maria Laura Bilbao Massri",
    "rut": "15261835-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-07-23",
    "direccion": "Camino al bosque 4682 casa 1, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "laurabilbaomassri@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Grupo familiar: Vive con esposo Rodrigo (45 años, abogado), hija Josefina (12 años) e hija Jacinta (",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo cada mañana (inicio enero 2025), biotina, omega 3, magnesio. Buena adherencia al tratamiento. Refiere que escitalopram la ayuda a estar más templada, menos irritable y más apacible."
      },
      {
        "nombre": "Ipran",
        "dosis": "10mg vo: 1 1/2 cada mañana por 4 días, luego aumentar a Ipran 20mg vo: 1 cada mañana. Samexid 20mg vo: 1 cada mañana (probablemente se iniciaría en un mes más, estando ansiedad más controlada)"
      },
      {
        "nombre": "Samexid",
        "dosis": "20mg vo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418272_euziew7zd",
    "ficha": 153,
    "nombre": "Maria Paz Figueroa Navarro",
    "rut": "20784363-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Venlafaxina 225mgvo: 1-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56976869038"
    ],
    "email": "maripazfiguenavarro@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Venlafaxina",
        "dosis": "225mgvo: 1-0-0"
      },
      {
        "nombre": "zopinom",
        "dosis": "3mgvo 0-0-1."
      },
      {
        "nombre": "lexapro",
        "dosis": "20mg - qtp - luego pasó a venlaf. La vio hasta los 18a. Siguio con psiq en Conce. La vio 1era vez en abril 2022 (Dr. Carión es su padrino, eran compañeros), tuvo hora con su psiquiatra hace 4 dias. El estar sola en Conce la deprimió más, le costaba más organizarse, le costaba levantarse de la cama, no iba a clases, mal rendimiento, era un bucle. Entonces le dgcó TDA, le costó aceptarlo pero luego le hizo mucho sentido. Pero padre le decía que una persona con depre no podía tener TDA y viceversa, que una persona no podía sacarse buenas notas en media. Entonces está hoy para segunda opinión."
      },
      {
        "nombre": "Samexid",
        "dosis": "50mgvo: 1 cada mañana"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg: 2 cada mañana"
      },
      {
        "nombre": "Neurok",
        "dosis": "50mgvo: 1 cada mañana"
      },
      {
        "nombre": "Arizol",
        "dosis": "5mg vo: ¼ en la noche por 10 dias, luego ½ cada noche"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mg vo: 1 cada mañana por 6 días, luego 2 cada mañana. Al cabo de  1 semana  tomando  los 36 mg , enviarme mail acerca de cómo te has sentido."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418273_sbbc9x1ke",
    "ficha": 154,
    "nombre": "Mariam Liberona Riquelme",
    "rut": "12027649-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 16 diciembre 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "liberonamariam@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlavitae",
        "dosis": "75mg vo: 1 cada mañana, dilasedan 10mg vo tomaba"
      },
      {
        "nombre": "esomeprazol",
        "dosis": "40mg día, mulcatel, ambos SOS."
      },
      {
        "nombre": "retard",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: ½ sos sublingual"
      },
      {
        "nombre": "uricont",
        "dosis": "5mg vo: 1 sos en la noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418274_m7pz974ra",
    "ficha": 155,
    "nombre": "DATOS DEL PACIENTE",
    "rut": "13857455-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "4 poniente 239, Villa San Agustín, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56996596251"
    ],
    "email": "nelita0506@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Médico Psiquiatra",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "total",
        "dosis": "266 mg/dL, LDL 190.2 mg/dL (abril 2025)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418278_s9x5nauuz",
    "ficha": 156,
    "nombre": "Marianela Morales Morales",
    "rut": "13857455-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "4 poniente 239. Villa San Agustín. Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56996596251"
    ],
    "email": "nelita0506@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Enfermera ssmaule, vd a px con vmi, clases en U autonoma, px particulares.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Pregablina",
        "dosis": "75mgvo 0-0-1 , antes estuvo con 2 dosis de dacam y brevex (relaj muscular)."
      },
      {
        "nombre": "melatonina",
        "dosis": "3mg noche."
      },
      {
        "nombre": "Pregabalina",
        "dosis": "75mg vo: 1 cada noche"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mgvo: 1/2 en la mañana. (ensayar cuando lleve 1 semana con la venlafaxina 150mgvo). Usar además desde dos días antes de ingresar al trabajo."
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "225mgvo: 1-0-0 aumenta"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo 0-0- 1/4"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mgvo: 1 cada mañana por cuatro dias, luego 2 cada mañana por 8 días, luego enviarme reporte."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mg vo: 2 cada mañana."
      },
      {
        "nombre": "Cymbalta",
        "dosis": "30mg vo: 1 cada noche por 6 dias, luego 2 cada noche. AL agotar la caja, continuar con Cymbalta 60mg vo: 1 cada noche."
      },
      {
        "nombre": "total",
        "dosis": "266 mg/dL (VR: 50-200), LDL 190.2 mg/dL. Orina: hemoglobina (+), bacterias regular cantidad.** Normales: Vitamina B12 387, Creatinina 0.81, Glucosa 87, Na 136, K 4.5, Cl 104, HbA1c 5.2%, BUN 18, HDL 53, Triglicéridos 114, Perfil hepático, Vitamina D 30.2, Hemograma, TSH 1.17, T4L 1.16."
      },
      {
        "nombre": "magnesio",
        "dosis": "200mg noche."
      },
      {
        "nombre": "Osmetil",
        "dosis": "36 mg VO: 1 SOS en la mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418280_ydf9x9v3r",
    "ficha": 157,
    "nombre": "Maribel del Carmen Figueroa Maureira",
    "rut": "8884595-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "En 2018 Max estuvo en UCI, tuvo inflamacion medular cervical, no se sabe etiologia, quedó parapléjico, a los 15 años de edad. Hija Ivon, que vive en Rancagua, con ella suele tener dificultad interpersonal. En esa ocasion de la hospitalizacion Ivon le habria \"sacado en cara\" que le pagaba la isapre a Maribel. \"nunca pensé que una de ellas me iba a acribillar de esa manera\". En ese entonces tuvo psicoterapia y psicofarmaco (no recuerda). Pensamietos de desaparecer recurrentes, sin ideacion suicida. Ansiedad significativa al imaginar quien asistiria a Max si ella no estuviera,, ya que no hay nadie mas interiorizado de los cuidados. Ha tenido que quererllarse contra Isapre porque ha perdido beneficios que ya tenia para los cuidados de Max, costeando ella muchas cosas con recursos limitados, a la vez siendo cuestionada por las hijas respecto a como administra el dinero.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56992222781"
    ],
    "email": "mfigueroam3240@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: hijo Ian Maximiliano 23 años postrado  +  TENS que ayuda a cuidarlo (clinica domiciliaria,",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "beta lactamicos, corticoides (inflamacion en tobillos, camina con cierto dolor aun). penicilina le da disnea.",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Binax",
        "dosis": "30mg vo: 1 cada mañana por 6 días, luego 2 cada mañana. Luego de terminar la caja, seguir con Binax 60mg vo: 1 cada mañana. Si el fármaco le diera mucha somnolencia, recomiendo cambiar hacia la noche."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mg vo: 1/4 cada noche"
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mg vo: medio cada mañana por 14 días, luego 1 cada mañana (si le causa somnolencia: usarlo en la noche)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418289_bct3slmjf",
    "ficha": 158,
    "nombre": "Mario Bravo Toledo",
    "rut": "7220814-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Duloxetina 60mgvo 0-0-1",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "cbravotoledo@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> **Trabajo, otro ingreso** profesor LAM, pensión en trámite.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Gabapentina",
        "dosis": "300 mg vo 1-1-1"
      },
      {
        "nombre": "Citalopram",
        "dosis": "20 mg vo 1-0-0"
      },
      {
        "nombre": "Quetiapina",
        "dosis": "100 mg vo 0-0-½"
      },
      {
        "nombre": "escitalopram",
        "dosis": "10 mg vo 1-0-0, receta lexapro 10 mg vo por 1 mes"
      },
      {
        "nombre": "Clonazepam",
        "dosis": "2 mg vo ½ - 0 – 1"
      },
      {
        "nombre": "Duloxetina",
        "dosis": "60mgvo: 1 cada noche."
      },
      {
        "nombre": "Melatonina",
        "dosis": "3mgvo: 2 cada noche por 2 semanas. Si no ceden movimientos en la noche, aumentar a 3 cada noche durante 2 semanas. Si no ceden, aumentar a 4 cada noche."
      },
      {
        "nombre": "Enalapril",
        "dosis": "10 mg vo 1-0-1"
      },
      {
        "nombre": "Paracetamol",
        "dosis": "500 mg vo 1-1-1"
      },
      {
        "nombre": "lexapro",
        "dosis": "10 mg vo 1-0-0 por 1 mes LCHE y receta normal de Ravotril 2 mg vo ½ - 0 – 1 por 1 mes, ambas a partir del 26 nov de 2020."
      },
      {
        "nombre": "ravotril",
        "dosis": "2 mg vo 1/2 - 0 - 1"
      },
      {
        "nombre": "Ipran",
        "dosis": "20 mg vo 1-0-0"
      },
      {
        "nombre": "trazona",
        "dosis": "25 mg noche , si no, 50mg noche. envio receta."
      },
      {
        "nombre": "trazodona",
        "dosis": "50mgvo 0-0- ½"
      },
      {
        "nombre": "votrient",
        "dosis": "400mg día. Lo ve Dra Kimberly Infante. el cnz se lo dan en hrt acordamos enviarle 1 receta por sea caso. para inicio de sept gano 1.7kk en experto. sin perdidas significativas, se compro tele y está arreglando un mueble con maestro."
      },
      {
        "nombre": "omeprazol",
        "dosis": "20mg 1-0-0"
      },
      {
        "nombre": "ravo",
        "dosis": "2mgvo ¼ -0- 1 , aumenta**_"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg: 0-0-1**_"
      },
      {
        "nombre": "mantener",
        "dosis": "2mgvo: ¼ -0- 1"
      },
      {
        "nombre": "inicia",
        "dosis": "15mgvo 0-0- ½ por 10d luego 0-0-1"
      },
      {
        "nombre": "domperidona",
        "dosis": "10mg cada 8 hrs. Y escitalopram 10mg en la mañana."
      },
      {
        "nombre": "ciblex",
        "dosis": "15mgvo 0-0-1 1/2"
      },
      {
        "nombre": "Deslafax",
        "dosis": "100mg vo: 1 cada mañana"
      },
      {
        "nombre": "Seronex",
        "dosis": "100mgvo: 1 1/2 en la noche por 2 semanas, luego 2 cada noche??"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo: 1 y medio cada noche (envío receta)."
      },
      {
        "nombre": "dompe",
        "dosis": "10mg cada ocho, enalapril 10mg cada doce, hrt: ipran 10mg cada mañana, macrogol 17gr cada doce, omp 20mg cada doce, qtp 25mg noche, tamsulosina 0.4mg dia."
      },
      {
        "nombre": "Ondansetron",
        "dosis": "10mg vo: 1 sos maximo cada 8 ."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418293_pogfbgdzt",
    "ficha": 159,
    "nombre": "Marisol Mendoza Castro",
    "rut": "11561478-9",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 15 septiembre 2021",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56992159351"
    ],
    "email": "solsita7770@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> a sus 23 años dg de fibroadenoma, de nuevo a los 29 años. en 2016 de nuevo. en 2017 sd tunel carpi",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg: 0-0-1"
      },
      {
        "nombre": "ipran",
        "dosis": "20mgvo 0-0-1 (aumenta)"
      },
      {
        "nombre": "rize",
        "dosis": "10 mg vo ½ -0- ½"
      },
      {
        "nombre": "Aradix",
        "dosis": "10mg vo:"
      },
      {
        "nombre": "dermato",
        "dosis": "20mg día por 3 meses, jabon y crema hidratante. Le dijo que tenia que ir a un psiquiatra y le contó hipotesis de bicho y rascar placentero."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418297_2gr3q563x",
    "ficha": 160,
    "nombre": "Marta Vargas Diaz",
    "rut": "9741375-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "**** Avenida 1 Oriente 1849, Doña Ignacia, Maule",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "marjime.vargas@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Consultó con un médico general debido a lumbago, quien le indicó etoricoxib por 25 días y le solicit",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "TA, náuseas, sudoración, apetito.",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "matutina",
        "dosis": "75mg y escitalopram 20mg. No reporta efectos adversos significativos. Se evidencia mejoría en funcionalidad con capacidad de realizar actividades cotidianas y mantener contacto social limitado vía WhatsApp con ex compañeros de trabajo, aunque persiste cierta angustia al respecto. Jubilación programada para el 1 de julio 2025, actualmente haciendo uso de días administrativos y vacaciones pendientes hasta esa fecha. Trámites de jubilación voluntaria completados, con bono correspondiente asegurado. Apetito normal, peso sin variación. Le queda 1 semana para completar tto de vitamina D. Sin psicoterapia. Eutímica, sin ideación suicida, sin síntomas psicóticos."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10 mg vía oral: tomar 1/2 comprimido cada 12 horas. Es un ansiolítico que ayuda a reducir la ansiedad y mejorar el sueño. Puede generar somnolencia y debe evitarse el consumo de alcohol. Se recomienda tomarlo siempre a la misma hora."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10 mg vía oral: iniciar con 1/2 comprimido en la mañana por seis días y luego continuar con 1 comprimido cada mañana. Es un inhibidor selectivo de la recaptación de serotonina (ISRS) utilizado para el tratamiento de la ansiedad y la depresión. Puede tardar entre dos y cuatro semanas en mostrar efectos completos. Algunos efectos adversos iniciales pueden incluir náuseas, mareos o alteraciones digestivas, que suelen desaparecer con el tiempo."
      },
      {
        "nombre": "venlavitae",
        "dosis": "75mg vo: 1 cada mañana"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418304_f8hrgyyy3",
    "ficha": 161,
    "nombre": "Maryelin Rojas Orellana",
    "rut": "16555145-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Sertralia 50mgvo: media en la mañana por 8 días, luego 1 cada mañana. (sugiero Sertac o Seronex)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56995931493"
    ],
    "email": "maryelinaro@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Sertralina",
        "dosis": "50mgvo, iniciar de acuerdo a indicacion previa."
      },
      {
        "nombre": "Sertralia",
        "dosis": "50mgvo: media en la mañana por 8 días, luego 1 cada mañana. (sugiero Sertac o Seronex)"
      },
      {
        "nombre": "Sertac",
        "dosis": "50mgvo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418312_ly90yal9q",
    "ficha": 162,
    "nombre": "Marysel Zárate Villaseca",
    "rut": "13611913-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 2 agosto 2021",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56932633345"
    ],
    "email": "marysel.zarate.villaseca@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Otra preocupacion papa jubilado obrero, con estallido social perdieron la casa ahora losayuda.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "paroxetina",
        "dosis": "20mgvo 0-0- ½ por 5 dias luego 1 entero. control el 18 noviembre seis y media."
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg vo: 1/2 sos (puede usar hasta 1 sos), máximo 2 veces a la semana."
      },
      {
        "nombre": "Olanzapina",
        "dosis": "5mg vo: 1/2 cada noche por 2 dias , luego 1 cada noche por 8 dias. Luego 2 cada noche. Cuando acabe la caja de olanzapina de 5 mg, seguir tomando olanzapina de 10mg vo: 1 cada noche."
      },
      {
        "nombre": "risperidona",
        "dosis": "1mgvo 0-0-1"
      },
      {
        "nombre": "Litio",
        "dosis": "300mgvo 0-0-½ por 3 días, luego 0-0-1 por 3 días, luego ½ -0-1 por 3 días, continuar después con 1-0-1 hasta próximo control."
      },
      {
        "nombre": "parox",
        "dosis": "20mgvo 1-0-1 + litio 450 1-0-1 + rispe 1mg 0-0-1"
      },
      {
        "nombre": "aripiprazol",
        "dosis": "10mgvo 0-0-1."
      },
      {
        "nombre": "Aripiraprazol",
        "dosis": "15mgvo: 1 y medio cada mañana"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mg vo: 1 en la noche por 2 semanas"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1 sos en la noche, ha tenido que recurrir."
      },
      {
        "nombre": "Olivin",
        "dosis": "10mg vo: 1 y media cada noche (tomarla a las 21.30hrs)"
      },
      {
        "nombre": "oivin",
        "dosis": "10mg vo: 1 en la noche por 10 días, luego ½ en la noche por 14 dias, luego suspender."
      },
      {
        "nombre": "Olanvitae",
        "dosis": "10mg vo: 1/2 en la noche por 4 días, luego 1 cada noche (iniciar hoy)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418315_k45hwznmr",
    "ficha": 163,
    "nombre": "María Angélica del Río",
    "rut": "22881380-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 27 agosto a las 9.15hrs",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "mariadelrioprunes@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "tno mixto ansioso depresivo (asociado a estres academico )",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: medio en la mañana por 7 días y luego 1 cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5 mg vo: medio en la mañana y medio en la tarde (17.00hrs)"
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5mg vo: 1/2 en la mañana (con comida) por 1 semana, luego 1 en la mañana. Al cabo de 1 semana tomando 1 en la mañana, enviarme mail acerca de cómo te has sentido."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418318_iv8o18ofx",
    "ficha": 164,
    "nombre": "María Ignacia Williams Valdés",
    "rut": "pendiente-164",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 26 feb 2025",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "mignaciawilliams@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Dilasedan",
        "dosis": "5 mg VO: uno en la mañana y uno en la tarde (18:00 h) por dos semanas, luego suspender."
      },
      {
        "nombre": "lexapro",
        "dosis": "10mg noche."
      },
      {
        "nombre": "ectiban",
        "dosis": "20mg vo: 1 cada noche"
      },
      {
        "nombre": "retard",
        "dosis": "10mg vo: 1 en la mañana (7.00), uno en la tarde (15.00). por 6 días. Luego aumentar a 2 en la mañana y 2 en la tarde (mismo horario descrito)."
      },
      {
        "nombre": "osmetil",
        "dosis": "36 mg vo : 1 cada mañana. receta x30d."
      },
      {
        "nombre": "Gluc",
        "dosis": "91 mg/dL."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418319_pgeo34xyt",
    "ficha": 165,
    "nombre": "María Inés Celis Saavedra",
    "rut": "6522540-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram 10 mg 0-0-2",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56984168722"
    ],
    "email": "manecesa@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Tbjo como profesora hasta los 60 , profe lenguaje, escuela san miguel.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "5mg vo: 1 sos (4 veces a la semana)"
      },
      {
        "nombre": "paroxetina",
        "dosis": "20mg vo (bectam de cosam): 0-0-1"
      },
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 0-0- 1 (primeros diez dias la mitad)."
      },
      {
        "nombre": "Planiden",
        "dosis": "10 mg según necesidad. No ha usado corticoides desde mayo de 2024. Generalmente tomaba un Planiden al día, pero hubo días en que tomó hasta cuatro."
      },
      {
        "nombre": "aroxat",
        "dosis": "20mg 0-0-1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418322_ldsskm83b",
    "ficha": 166,
    "nombre": "María Jesús Órdenes E l l i ott",
    "rut": "17366216-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-06-27",
    "direccion": "Ectiban 20 mg VO: 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Mariajesus.ordeneselliott@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "10mg vo: ½ en la noche. No nota cambio en frecuencia de pesadillas, pero son menos angustianes. Sin insomnio de conciliacion, tampoco mantencion. Desaca somnolencia diurna. Con siestas frecuentes. Mucho mas controlada la rumiacion respecto al trabajo, “ya no tengo ese ruido que estaba maquinando”. Respecto a ideas de complot: no lo piensa como tal, pero le cuesta confiar en el resto. Sin esa sensación de inseguridad generalizada, como sentimiento de insuficiencia. El 15 febrero tendria sus vacaciones, sola, tiene cierto temor de sentirse o no capaz. Cefalea: variable, manejable. Se aprecia mucho mas modulada en lo emocional, ya no llora practicamente toda la sesion (de hecho no llora). RM magnetica cerebral normal."
      },
      {
        "nombre": "ectiban",
        "dosis": "10 mg vo: ½ en la mañana por dos días, luego 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418324_xnz34o0as",
    "ficha": 167,
    "nombre": "MaríaJesús Aravena Álvarez",
    "rut": "21803338-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram 10mg vo: 1/2 comprimido nocturno por 6 días, luego 1 comprimido nocturno",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "alvarezvaldes.c@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "lamotrigina",
        "dosis": "25mg (Tradox). Suspendió sertac por cuenta propia el año pasado al sentirse mejor."
      },
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo: 1/2 comprimido nocturno por 6 días, luego 1 comprimido nocturno"
      },
      {
        "nombre": "sertac",
        "dosis": "100mg vo diario"
      },
      {
        "nombre": "Somnipax",
        "dosis": "10mg sublingual: 1/2 comprimido SOS (máximo 1 comprimido por ocasión)"
      },
      {
        "nombre": "recomiendo",
        "dosis": "20 mg escitalopram pero no acepta. a veces ha usado mentix 100mg vo: un cuarto sos."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: 1/2 comp sublingual, total = 1 caja."
      },
      {
        "nombre": "Minfel",
        "dosis": "18 mg vo: 1 en la mañana por 6 días, luego 2 cada mañana hasta agotar la caja. Enviarme reporte de cómo te has sentido al cabo de 10 dias de estar con 2 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418328_w3rlx5egr",
    "ficha": 168,
    "nombre": "Matías Muñoz Rodríguez",
    "rut": "19808166-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 14 diciembre 2022",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "matias.mr2017@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitralopram",
        "dosis": "10mg vo un cuartro x 4 noches luego aumentar a medio x 6 noches luego seguir con 1 cada noche"
      },
      {
        "nombre": "Escitalopram",
        "dosis": "10mg: 0-0-1"
      },
      {
        "nombre": "Melatonina",
        "dosis": "2mg vo: 0-0-1"
      },
      {
        "nombre": "Vigisom",
        "dosis": "2mg vo: 1 cada noche"
      },
      {
        "nombre": "Primidona",
        "dosis": "250mg vo: medio en la noche, iniciar el 1 de abril."
      },
      {
        "nombre": "Propanolol",
        "dosis": "10mg vo: media en la mañana, iniciar el 1 de abril. En prox control"
      },
      {
        "nombre": "Ipran",
        "dosis": "20mgvo: 0-0-1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418333_4i6nj27hm",
    "ficha": 169,
    "nombre": "Miguel Angel Peralta",
    "rut": "15339621-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "miguelperaltas@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: esposa Daniela 42 años trabaja en empresa familiar pero mas dueña de casa, inmobiliaria Pr",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "cymbalta",
        "dosis": "30mg vo: 1 cada noche por 6 dias, luego 2 cada noche hasta acabar la caja. Luego cambiar a cymbalta 60mg vo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418334_cnmx52doc",
    "ficha": 170,
    "nombre": "ficha 1",
    "rut": "9848708-5",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Seronex 50mgvo: 0-0-1, cambió por baja libido.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "x.hernandez.c@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "|Miguel Hernández Inostroza   <br>B523   <br>9848708-5   <br>59 años   <br>14-7-63   <br>Villa coope",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Aspirina",
        "dosis": "100mg, iltux HCT   <br>Rosuvastatina   <br>Olmesartan|Enfermó nieto, luego murió hna menor (dm, resfrio, muerte por IAM, mayo 2022), robo animales, hace dos meses inicia con pensamientos ansiosos me va a pasar algo, consultó a medico y le dg valvulopatía. Hace 2 meses caida caballo , quebró clavila derecha, tuvo 30 dias de LM, luego lo cortaron y ahora con pega por otro lado en mismo rubro. **Angustia**, zona pecho, **miedo** ira a quedar hijos y pasa algo a él. **Imsomnio** mantencion hasta 3 veces, con despertar precoz. Buen apetito, con dieta ha ido bajando 8kg.    <br>   <br>Levanta a las 7, tbja hasta 13, almuerza, vuelve pega, sale 18-19-20, llega a la casa, acuesta 21-22, concilia de inmediato.    <br>Muerte hna pesadillas no, recuerdos intrusivos tampoco. No presenciado.    <br>Sin irritabilidad, sin tristeza ni llanto,    <br>**Dolor espalda, sera corazon?.**    <br>Sin reflujo sin acidez, sin abuso de AINEs.    <br>Sintomas **ansiosos de 4/10.** angustia pecho, se le pasa al tomar agua, asociado a **adormecimiento** de las manos. Con **disnea**. Episodios que duran minutos. A nivel familiar bien.    <br>Estimulantes te 3 veces al día te negro.   <br>**Cocacola** ocasional.    <br>Sin oh ni otras drogas.     <br>   <br>AE Flor: le han pasado muchas cosas. Mas **callado**, mas **aislado**, duerme mal, se **toma la presion a cada rato**, anda perseguido. Le da melipass.    <br>Laboratorio normal de julio oct 2022.    <br>   <br>Al ex mental ansioso.|Tno ansiedad por enfermedad|Solicito enviarme resultado de todo examen de laboratorio e imágenes. Enviarme informes de cardiólogo.   <br>  <br>Escitalopram 10mg vo:  medio cada noche por 6 días, luego 1 cada noche.   <br>Clotiazepam 10mg: medio en la mañana, medio en la noche.   <br>  <br>No tomar zolpidem  <br>  <br>control 22 mayo a las 20.45 hrs.|"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mgvo: 1/2 -0- 1/2"
      },
      {
        "nombre": "desvenlafaxina",
        "dosis": "100mg con buena respuesta y resolución de RAM."
      },
      {
        "nombre": "Seronex",
        "dosis": "50mgvo: 0-0-1, cambió por baja libido."
      },
      {
        "nombre": "Deslafax",
        "dosis": "100mgvo 1-0-0"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418335_wcglnblpa",
    "ficha": 171,
    "nombre": "Miguel Hernandez Pavez",
    "rut": "pendiente-171",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418338_hz7ge6lcg",
    "ficha": 172,
    "nombre": "ficha 1",
    "rut": "20757906-8",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 20 marzo 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Fuentesjaviera2002@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Su madre expresó preocupación por su seguridad en el terminal, a lo que ella pensó \"¿qué más me va a",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "Litio",
        "dosis": "300mgvo:"
      },
      {
        "nombre": "Neurok",
        "dosis": "30mgvo: 1 cada mañana"
      },
      {
        "nombre": "Topivitae",
        "dosis": "50mgvo:"
      },
      {
        "nombre": "Amato",
        "dosis": "100mgvo medio cada doce horas."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mgvo: 1 en la mañana por 14 dias, luego 2 cada mañana. Luego que acabe la caja, seguir con venlavitae 150mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418340_xoy5ako1n",
    "ficha": 173,
    "nombre": "Guia psicoeducativa breve para TPL",
    "rut": "pendiente-173",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Litio 300mg: Principal estabilizador emocional. Previene desregulación y reduce pensamientos negativos.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Litio",
        "dosis": "300mg: Principal estabilizador emocional. Previene desregulación y reduce pensamientos negativos."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418340_fqci8uhxr",
    "ficha": 174,
    "nombre": "Milenka Fuentes Chamorro",
    "rut": "pendiente-174",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418342_ltquyvn1e",
    "ficha": 175,
    "nombre": "Monica Muñoz Contreras",
    "rut": "9780588-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitalopram 20mgvo 0-0-1",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "mmoni.mc@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "divorciada 2016 de Eduardo, representante médico, infidelidad de el por 1 ½ año. Tienen hijas Fda 31",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "20mg v.o.: 1 comprimido en la noche (a las 21.00 hrs)_"
      },
      {
        "nombre": "clonazepam",
        "dosis": "2mg v.o.: 1/2 comprimido en la noche_"
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mg/noche"
      },
      {
        "nombre": "Reax",
        "dosis": "10mg vo: 1 cada mañana por 2 semanas, luego puede usar SOS."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418344_4qwj6iz2s",
    "ficha": 176,
    "nombre": "Mylissen Lamas Pimentel",
    "rut": "12072726-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Levotiroxina 50mcg 1-0-0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56999594606"
    ],
    "email": "mylissen.lamas@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Atorvasatina",
        "dosis": "20mgvo dia"
      },
      {
        "nombre": "Escitalopram",
        "dosis": "20mgvo 0-0-1 (desde 2021, la aumentó hace 5 días a 30mg)"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mg vo: 1 cada mañana, todos los días."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo: 1 y medio cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418348_eiuiu1uxt",
    "ficha": 177,
    "nombre": "Mónica Díaz Andonaegui",
    "rut": "11438743-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Tiene 1 hija de de 33a Paloma, casada se fue a Canadá (tuvo Ca tiroides hija a los 19).",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56988889654"
    ],
    "email": "0monicadiaz@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "[[Pacientees Extrasistema/Pacientes extrasistema/Mónica Díaz Andonaegui/Informe Médico|Informe Médic",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Melatonina",
        "dosis": "3mg noche"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo: 1 cada noche"
      },
      {
        "nombre": "Emezol",
        "dosis": "20mg vo: 1 cada mañana (inicia)"
      },
      {
        "nombre": "Bupredol",
        "dosis": "150mgvo: 1 en la mañana por 10 dias y luego suspender"
      },
      {
        "nombre": "Pristiq",
        "dosis": "50mg vo: 1 en la mañana por 10 días, luego 2 cada mañana. Luego continuar con pristiq 100mg vo: 1 cada mañana."
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5mgvo: medio en la mañana por 4 días. Luego 1 en la mañana por cuatro días. Luego 1 1/2 en la mañana por cuatro días. Luego 2 cada mañana."
      },
      {
        "nombre": "generica",
        "dosis": "100mgvo: 1-0-0"
      },
      {
        "nombre": "Minfel",
        "dosis": "36 mgvo: 1-0-0, hace cuatro dias."
      },
      {
        "nombre": "Deslafax",
        "dosis": "100mg vo: 1 cada mañana."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo: 1/4 sos cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418348_0f3pxhx70",
    "ficha": 178,
    "nombre": "Mónica Díaz Andonaegui",
    "rut": "pendiente-178",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418353_lkseuoouk",
    "ficha": 179,
    "nombre": "Natalia Arce Escalona",
    "rut": "15568101-2",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 6 octubre 2021",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "narceescalona@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**Evolución clínica** Está con asesoría de una empresa que la orienta en su proceso laboral, gestion",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Clotiazepam",
        "dosis": "10mgvo: 1 sos"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mgvo: 0-0-1/4"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1 - 1 -0"
      },
      {
        "nombre": "Subelan",
        "dosis": "150mgvo OR: 2-0-0"
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mg vo: medio cada noche por 10 dias, luego 1 cada noche."
      },
      {
        "nombre": "reflexan",
        "dosis": "5mg noche."
      },
      {
        "nombre": "Etoricoxib",
        "dosis": "120mg día x 15 dias."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo: 2 cada mañana"
      },
      {
        "nombre": "Valdoxan",
        "dosis": "25mg vo: 1 cada noche"
      },
      {
        "nombre": "Topiramato",
        "dosis": "50mg vo: 1/2 en la mañana por 6 dias, luego 1/2 cada doce horas por seis dias, luego 1 en la mañana y 1/2 en la noche por seis dias, luego 1 cada doce horas."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418355_yuwr7zv9x",
    "ficha": 180,
    "nombre": "Nelly Fernanda Bustos Bravo",
    "rut": "18656267-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-08-02",
    "direccion": "Control 3 octubre 20.00hrs.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "nelly.bustos.94@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Familia: Padre, hna (enfermera), mamá, tia (hna de madre) y abuelos maternos. (viven juntos solo sus",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg vo: 1 cada mañana"
      },
      {
        "nombre": "birntellix",
        "dosis": "5mg, tuvo cefalea y pirosis, causaba insomnio tb si lo tomaba en la noche (fue en 2022)."
      },
      {
        "nombre": "Zopinom",
        "dosis": "3mg vo: 1 cada noche, no ha sido necesario."
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg vo: 1 cada mañana"
      },
      {
        "nombre": "Samexid",
        "dosis": "30 mg vo: 1 cada mañana"
      },
      {
        "nombre": "propranolol",
        "dosis": "40mg vo: ½ cada ocho horas SOS."
      },
      {
        "nombre": "tomar",
        "dosis": "5mg de clotiazepam SOS con buen efecto y sin RAMS. Ha requerido un par de veces usar eszopiclona, que es mejor cambiar por perfil farmacológico hacia zolpidem sublingual de liberación inmediata."
      },
      {
        "nombre": "buspirona",
        "dosis": "10mg vo: 1/2 en la mañana, 1/2 en la tarde (17.00hrs)"
      },
      {
        "nombre": "neurok",
        "dosis": "30mg vo: 1 cada mañana (cambia presentación)"
      },
      {
        "nombre": "somnipax",
        "dosis": "10mg vo: 1/2 sublingual media hora antes de hora prevista para conciliar el sueño."
      },
      {
        "nombre": "propanolol",
        "dosis": "40mg vo: 1/2 en la mañana y 1/2 a las 17.hrs."
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: 1/2 comp sublingual SOS (evitar estudiar las 8 horas inmediatamente posterior a uso)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418375_cghwf8o0h",
    "ficha": 181,
    "nombre": "Nicolas Briones Garcia",
    "rut": "20305464-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Rize 5mg: 1/2 - 1/2 - 0",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Nicolasbrionesgarcia01@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "==Paciente acude a control presencial. Se observa eutímico durante consulta, reportando estado de án",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Quetiapina",
        "dosis": "25mg: 0-0-1, hace 2m  <br>Clotiazepam 10 mg: 1/2 - 1/2 -0, hace 2m  <br>Ectien xr 75mg hace 2m  <br>Antec familiares. | 7mo basico ps Caro Concha, 2a además Psq  <br>17a quiebre amoroso vuelve Ps. Y Psiq, x 1 año  <br>2020 Jorge Leiva hasta actualidad. Psiq intento con Navia, luego pausa y desde mediados 2022 por tele con Psiq Stgo pero este demoraba en trámites como receta certificado etc, que repercutió que no pudiera congelar a tiempo en 2022.  <br>Entrevisto solo luego acompaña su madre.  <br>Desregulacion emocional cronica  <br>Ultimamente desde sept 2022, término de pololeo de relación que describe tóxica, duró 5 años con Isadora que vive en Talca. Relata que ella le fue infiel y que lo terminó en agosto-sept 2022, apenas ocurrió ella empezó a pololear con otro joven, él muy afectado se agrava sintomatología de TP progresivamente y afecta a nivel familiar y harto académico. CASIS de combos en la cara cuando se desborda (ultima vez navidad 2022). Consumo de OH aparente de no riesgo, consumo esporádico de THC no problematizado  <br>30 nov empezó venlafaxina 37.5 luego 75mg, de a poco mejorando respecto a ganas de hacer cosas, ya menos sensible de cualquier cosa, mucho menos ideación suicida (no estructurada siempre).  <br>Esta con neuroval cd 10mg. , qtp, ectien.  <br>Ahora enfocado en música grupo rock alternativo \"onda los bunkers\"  <br>Actualmente sintomas que persisten:  <br>Al ex mental a destacar que se ve deprimido aún.  <br>Adecuado en comportamiento  <br>Tatuaje  <br>Piercings | EP depresivo mayor severo, reactivo, obs 3er episodio. Tno depresivo recurrente (unipolar)  <br>Trastorno de personalidad limítrofe | Seguir con Jorge Psicoterapia  <br>Dilasedan 10mg: 1/2 - 1/2 -0  <br>Subelan OR 150mg: 1-0-0, aumenta  <br>Quetiapina 25mg: 0-0-1  <br>Control 27 feb c4  <br>Explorar OH y THC, considerar problematizar |"
      },
      {
        "nombre": "clotiazepam",
        "dosis": "10mg SOS.=="
      },
      {
        "nombre": "metionina",
        "dosis": "400mg vo: 1 comprimido cada mañana=="
      },
      {
        "nombre": "Rize",
        "dosis": "5mg: 1/2 - 1/2 - 0"
      },
      {
        "nombre": "Rexulti",
        "dosis": "2mg: 1/2 cada noche por 6 dias y luego suspender=="
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo: 0-0- 1/\" cada noche por 6 dias, luego 1 cada noche.=="
      },
      {
        "nombre": "Aradix",
        "dosis": "10mg vo: media en la mañana por 2 días, luego 1 en la mañana por 2 días, luego 1 1/2 en la mañana por dos días, luego 2 cada mañana (por 3 días, ahí informarme cómo te has sentido al respecto).=="
      },
      {
        "nombre": "Samexid",
        "dosis": "30mg vo: 1 cada mañana (inicia)=="
      },
      {
        "nombre": "Neurok",
        "dosis": "70 mg vo: 1 cada mañana=="
      },
      {
        "nombre": "Naproxeno",
        "dosis": "500mg vo: 1 cada mañana por cinco días=="
      },
      {
        "nombre": "Tensodox",
        "dosis": "10mg vo: 1 cada noche por 10 dias (tomarlo a las 22 horas)=="
      },
      {
        "nombre": "uricont",
        "dosis": "5mg vo: 1 cada noche=="
      },
      {
        "nombre": "litio",
        "dosis": "300mg vo: ½ en la noche por 4 días, luego 1 cada noche por 4 días, luego ½ en la mañana y 1 en la noche por 4 días, luego 1 cada doce horas. Al cabo de 8 días con esta última dosis, tomar exámenes de laboratorio (litemia, creatinina, bun, elp, tsh y t4libre).=="
      },
      {
        "nombre": "Kalitium",
        "dosis": "450mg vo: 1 cada doce horas (se suspende litio de 300mg)=="
      },
      {
        "nombre": "tronsalan",
        "dosis": "100mg vo: 2 cada noche=="
      },
      {
        "nombre": "paxon",
        "dosis": "10mg vo: medio en la mañana y medio en la tarde (16.00hrs)0 por 10 dias, luego aumentar a uno entero en dichos horarios."
      },
      {
        "nombre": "Cymbalta",
        "dosis": "60mg vo: 1 cada mañana (inicia)"
      },
      {
        "nombre": "Binax",
        "dosis": "60 mg vo: 2 cada mañana (aumenta) (es importante usar Binax o Cymbalta, ya que hay diferencias significativas entre las marcas)"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg SL: 1 sos. No más de una vez a la semana"
      },
      {
        "nombre": "Realta",
        "dosis": "60 mg vo:** 1 cada 12 horas (misma dosis total pero cambia horario)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418377_43yxtycip",
    "ficha": 182,
    "nombre": "Nicole Moya Lantadilla",
    "rut": "17822229-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Dilasedan 5mg vo: SOS",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56997407711"
    ],
    "email": "alenilan.ya@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "antecedente médico de vicio de refracción",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 2 cada mañana (heterolabs)"
      },
      {
        "nombre": "Melatonina",
        "dosis": "3 mg vo: 1 cada noche"
      },
      {
        "nombre": "somnipax",
        "dosis": "10mg vo: 1 cada noche"
      },
      {
        "nombre": "propanolol",
        "dosis": "10mg vo: 1 cada doce horas."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5mg vo: SOS"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mg vo: 1 cada noche"
      },
      {
        "nombre": "ridos",
        "dosis": "68 mg/dL; colesterol HDL 72 mg/dL; colesterol LDL calculado 116.4 mg/dL; colesterol VLDL calculado 14."
      },
      {
        "nombre": "Uricont",
        "dosis": "5mg vo: 1 cada noche (inicio para hiperhidrosis nocturna)"
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg vo: 1 cada mañana (cambia presentación) (cotizar en farmacia de liga chilena contra la epilepsia)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418380_c0b9xr5tr",
    "ficha": 183,
    "nombre": "Oscar Carrasco Romero",
    "rut": "pendiente-183",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ipran 20mgvo: 1 cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "20mg."
      },
      {
        "nombre": "Ipran",
        "dosis": "20mgvo: 1 cada mañana"
      },
      {
        "nombre": "Samexid",
        "dosis": "50mg vo: 1 cada mañana"
      },
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: medio en la noche por 6 dias y luego 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418382_0q816wbx7",
    "ficha": 184,
    "nombre": "Pablo Correa Opazo",
    "rut": "18342811-k",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "En 3-4 medio bullying no especificado, depre, ps dra concha, sertralina, Luego entró a UTAL 2013 aagro, 2016 nuevamente depre por tema vocacional, empezo con Ps Claudio Bruna, se refiere en ese tiempo “inseguro” se salio de carrera y estuvo 1 año en auditoria en 2017, no le gusto ambiente competitivo. sigue con Ps Bruna. Retoma agro en 2019, le da el alta el ps. en clases viene el estallido social y luego pandemia, le afecta animicamente , rutinas etc, vuelve a fines de 2020 con Bruna y Carrion, que le da sertralina, ps centrado en ordenar rutina y activarlo conductualmente, dejó a ps ahí por sentirse estancado en tto. tomó como 3 meses irregular la sertralina, le ayudo a sentirse mejor de animo. En 2021 segunda aprte del año agosto sept le detectaron aumento volumen axilar, empezo estudo, biopsia positiva a tbc, pcr negativa a tbc, toido esto unfluyendo en animo. Hace varios meses con angustia, tristeza, náuseas cuando las siente, en las mañans más bajoneado, con ideación ,suicida, amarro cordel hace 2 semanas en su pieza y se arrepintio, ganas de llorar y no puede, sensacion de vacio, de ser un ente, que no existe, bastante anhedonia hace meses, descuida su aseo personal, falta de voluntad de llevar a cabo cosas que a vecves tiene en mente, le cuesta concentrarse, no desea hacer trabajos por ej en grupo en la U eso le ha traido problemas porque tendra mala nota el grupo, le pidieron certificado de esto en la U para decir por qué no pudo entregar unos trabajos la semana pasada. “deberia haber salido hace rato de la U”, le cuesta entonces relacionarse con compañeros mas jovenes, suele quedar apartado y luego incluido en grupos por ser el ultimo, malas notas. Le gusta tocar rock grunge sobre todo bajo y luego guitarra pero ultimamente le da tedio hasta conectarlas, escuchando ahora victor jara la partida, inti ilimani, chris cornell, slipknot, entre otros. Nunca ha tenido pareja, no lo tiene claro por qué, fue tema con ps bruna.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "vive con papa juan jubilado 74 + mama lina dc 64",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "luego",
        "dosis": "75mgvo OR 1-0-0"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418383_6o9jp9mu7",
    "ficha": 185,
    "nombre": "Pablo Toledo Torrealba",
    "rut": "10864166-5",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 2 enero 2025",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56990756896"
    ],
    "email": "pablo.toledo.torrealba@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: pareja Paola 40 profesora + hijo José de 8 años diagnosticado de TDAH + Pedro de 1 año 9 m",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "posivyl",
        "dosis": "20mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418387_btrbn4urn",
    "ficha": 186,
    "nombre": "Pamela Abarza Cancino",
    "rut": "10982971-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Hace 4 dias suspendio la quetiapina de acuerdo a lo indicado.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "pabarzac@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "enfermera seremi y PNI.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Quetiapina",
        "dosis": "100mg: una en la noche."
      },
      {
        "nombre": "Fluoxetina",
        "dosis": "20mg : 2 en la mañana."
      },
      {
        "nombre": "Metformina",
        "dosis": "500mg 1-1-0 hipoglucin LP."
      },
      {
        "nombre": "Atorvastatina",
        "dosis": "20mg, hipoglucin 500. vitamina D, centrum , magnesio, calcio, cheltin ahora no. Betaloc."
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "150mg vo OR: 2 cada mañana"
      },
      {
        "nombre": "Rize",
        "dosis": "10mg : medio en la mañana y medio al almuerzo."
      },
      {
        "nombre": "Ravotril",
        "dosis": "2mg: uno en la noche."
      },
      {
        "nombre": "Somnil",
        "dosis": "10mg: 1 en la noche"
      },
      {
        "nombre": "arvigil",
        "dosis": "200mgvo ¼ -0-0, titular hasta maximo 200mg al día."
      },
      {
        "nombre": "nivigil",
        "dosis": "150mg, ojala solo medio al día."
      },
      {
        "nombre": "Subelan",
        "dosis": "75mg vo XR 1-0-0, no ha querido bajar el ravotril 2mgvo 0-0-1 porque igual le cuesta dormir en estos últimos días, última semana con ciertas pesadillas. Sigue con galvusmet. Normix el ATB. ATV 40mg día. Tapia le pidió ecoabd que ahora salió bien después de haber bajado de peso. TSH 1.44, t4 7.9 actuales. Hgma con leucocitosis de 13.000. se pidió niveles de vit que salieron normales. Está con LM estos días por tema gástrico. Toma planiden odt 5mg día por medio. Aún nota sobreprotección de padres a su hermana. *madre fue violada, abuela lo sabía pero hacía negación.*"
      },
      {
        "nombre": "ravo",
        "dosis": "2mg 0-0-1"
      },
      {
        "nombre": "Planiden",
        "dosis": "5mg odt 1 casi todas las mañanas"
      },
      {
        "nombre": "tomo",
        "dosis": "25 mg qtp sos"
      },
      {
        "nombre": "Trimebutino",
        "dosis": "300mg 1-0-0"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg: 0-0- ½"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo: 0-0-1"
      },
      {
        "nombre": "Tramadol",
        "dosis": "50mg cada 8 titulado"
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mg: medio en la noche por 6 dias, luego 1 cada noche."
      },
      {
        "nombre": "Paxon",
        "dosis": "10mgvo: 1/2 cada doce horas."
      },
      {
        "nombre": "hipoglucin",
        "dosis": "500mg noche, vantusmax, vitamina D, 1 atorvastatina. Betaloc por cefalea recurrente. Cefalea naratriptan 3 veces desde agosto."
      },
      {
        "nombre": "Venlakem",
        "dosis": "150mg vo: 1 cada mañana"
      },
      {
        "nombre": "valdoxan",
        "dosis": "25mg vo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418390_pqh70ntm2",
    "ficha": 187,
    "nombre": "Pamela Herrera Suazo",
    "rut": "12916226-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Rize 10mg: 1 comprimido en la mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "pamelaherrerasuazo2020@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**20 abril 2022:** control tele. con rize 10 mg 1-0-0 + ravotril 2mg 0-0-1 + ipran 20mg 0-0- 1 ½ . h",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalipram",
        "dosis": "20mgvo 0-0- 1 ½ + rize 10 mgvo 1-0-0+ ravotril 2mgvo 0-0-1. control 1 junio c1 tele."
      },
      {
        "nombre": "lexapro",
        "dosis": "10mgvo 0-0- ½ por diez dias luego 1"
      },
      {
        "nombre": "rize",
        "dosis": "10mgvo ½ - ½ -0"
      },
      {
        "nombre": "clona",
        "dosis": "2mg 0-0-1"
      },
      {
        "nombre": "ipran",
        "dosis": "20mgvo 0-0-1, estos tres dias tomar lexapro 10mgvo 0-0- ½"
      },
      {
        "nombre": "ravotril",
        "dosis": "2mg: tres cuartos de comprimido a contar del lunes 20 diciembre."
      },
      {
        "nombre": "rizw",
        "dosis": "10mg en la mañ{ana + ravotril 2mg/noche. La llamaron del trabajo el 28 diciembre para de alguna manera presionarla y ver si vuelve o no. Con angustia por ello, aun a veces sueña con la pega, en general sueño y apetito normales. Duda si seguir en ese trabajo y considera quiza pedir su retiro de ahi. Relata que los hacen marcar salida y luego quedarse trabajando, que es normalizado que lleven trabajo para la casa y que no pongan limites entre horarios libres y de trabajo. Cuando sale 1 ejecutivo el que queda se lleva toda la cartera del otro y no hay reemplazos en general."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418398_pdy2eqy5x",
    "ficha": 188,
    "nombre": "Patricia Oyarce Mena",
    "rut": "15127390-4",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 10 octubre 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "palomaoyarce@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ademas comenta que cuando Domi estuvo aun en ese colegio, ella tenia que ir una vez a la semana por ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Losartan",
        "dosis": "50mg"
      },
      {
        "nombre": "Samexid",
        "dosis": "30mg vo 1-0-0"
      },
      {
        "nombre": "Neurok",
        "dosis": "50mg vo: 1 cada mañana (cambia presentación)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418402_v8950x871",
    "ficha": 189,
    "nombre": "Interconsulta a Nefrología",
    "rut": "pendiente-189",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-08-08",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Lamotrigina",
        "dosis": "200 mg noche."
      },
      {
        "nombre": "Litio",
        "dosis": "450 mg noche (ajustado recientemente; suspendido 300 mg cada 12 h)."
      },
      {
        "nombre": "Neurok",
        "dosis": "50 mg mañana."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3 mg noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418413_1s1psqj2b",
    "ficha": 190,
    "nombre": "Patricia Rubilar Salazar",
    "rut": "15739254-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-08-25",
    "direccion": "adm publico adm  aguas",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "parubilars@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> Sugiero estudio de hematuria con médico general.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "lamotrigina",
        "dosis": "100mg medio en la mañana, descontinuo por su cuenta creytendo aumento peso por desvenlafax que tomo x varios meses , hace 3 semanas. ha tomado antes: bpp: mas estable, topiramato: sueño, arip: acatisia, venla: sudoracion nocturna. escitalo 10mg sin efecto. consumo oh de riesgo en atracones no del todo problematizado. otras drogas cocaina antes q naciera su hioja cuando tomaba hartro."
      },
      {
        "nombre": "lorazepam",
        "dosis": "2mgvo 1 cada noche"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mgvo: 1 en la mañana 1 en la tarde"
      },
      {
        "nombre": "Clonazepam",
        "dosis": "2mgvo: 0-0-1"
      },
      {
        "nombre": "Lmoatrigina",
        "dosis": "100mgvo (lab chile): 1-0-1"
      },
      {
        "nombre": "quetiapina",
        "dosis": "25mg vo: ½ sos si insomnio"
      },
      {
        "nombre": "noptic",
        "dosis": "3mg/noche si presenta insomnio."
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo 0-0- ¼, en caso de no lograr conciliar adecuadamente puede usar 0-0- ½ . Desde mañana iniciar suspensión titulada de lamotrigina 100mg: ¼ -0-0 por 14 días y luego suspender. Mantener Wellbutrin 300mg XL: 1-0-0. Control el lunes 20 de junio a las 18:30 hrs."
      },
      {
        "nombre": "wellbutrin",
        "dosis": "300mgvo XL: 1-0-0 + trittico 100mgvo 0-0-1/4"
      },
      {
        "nombre": "trazo",
        "dosis": "100mg noche pero hipersomnolencia. Esta ahora con 50. El 21 sept fue anviersario muerte mamá. Papá le presento pareja, se lo tomo bien. Cansada en genreal, con sueño, con atrasos, irritable con hija Leonor ej cuadrada con los horarios, conduce mal otro y muy enojada. Tomando alcohol fines de semana niega perjudicial dependiente. Pensamientos de muerte y que conlleva mucho esfuerzo seguir viviendo, con aislamiento y anhedonia. Cursando ep depresivo moderado. Solicito mandarme laboratorio, educo de higiene del sueño. Con prob economicos, no ha podido seguir con psicologo."
      },
      {
        "nombre": "aripiprazol",
        "dosis": "5mg."
      },
      {
        "nombre": "Subelan",
        "dosis": "75mgvo or 1-0-0"
      },
      {
        "nombre": "Neoresotyl",
        "dosis": "150mgvo: medio cada mañana. Puede usar hasta 1 cada mañana."
      },
      {
        "nombre": "Ravotril",
        "dosis": "2mgvo: 1 cada noche"
      },
      {
        "nombre": "Ciblex",
        "dosis": "15 mg vo: medio cada noche"
      },
      {
        "nombre": "Disulfiram",
        "dosis": "500mg vo: medio cada noche"
      },
      {
        "nombre": "Litio",
        "dosis": "300mg vo: medio en la mañana por 4 dìas, luego medio cada doce horas por 4 dias, luego 1 en la mañana y medio en la noche por 4 dìas, luego 1 cada doce horas."
      },
      {
        "nombre": "Samexid",
        "dosis": "30mgvo: 1 cada mañana"
      },
      {
        "nombre": "Kalitium",
        "dosis": "450mgvo 1 cada doce horas"
      },
      {
        "nombre": "Propanolol",
        "dosis": "40mgvo: 1/2 en la mañana, 1/2 después de almuerzo (NO!, toma bisoprolol)."
      },
      {
        "nombre": "Cefadroxilo",
        "dosis": "500mg vo: 1 cada doce horas por 5 días."
      },
      {
        "nombre": "Neurok",
        "dosis": "70 mgvo: 1 cada mañana"
      },
      {
        "nombre": "Esomeprazol",
        "dosis": "20mgvo 1-0-0"
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo: 1 sos en la noche."
      },
      {
        "nombre": "retard",
        "dosis": "400 mg vo: 1 cada doce horas."
      },
      {
        "nombre": "Meganox",
        "dosis": "200mg vo: 1 cada noche"
      },
      {
        "nombre": "xurax",
        "dosis": "25mg vo: media en la noche."
      },
      {
        "nombre": "rifalan",
        "dosis": "10mg vo: 1 comprimido (maximo 1 vez a la semana) + xumadol 1gr en sobre."
      },
      {
        "nombre": "propranolol",
        "dosis": "40mg vo: 1 cada mañana"
      },
      {
        "nombre": "Trigilab",
        "dosis": "200mg vo: 1 en la noche"
      },
      {
        "nombre": "Luradon",
        "dosis": "20mg vo: 1 cada noche (con comida)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418415_w1quauexe",
    "ficha": 191,
    "nombre": "Patricio Ibarra Leal",
    "rut": "12298604-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Venlafaxina 37.5 mg vo: 1 cada mañana por 6 días, luego continuar con Venlavitae 75mg vo: 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56995511297"
    ],
    "email": "ptrcibarra@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "No pudoestar presente por trabajo, no alcanzo a llegar a verla cuando ya estaba mal, se culpa al res",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Mirtazapina",
        "dosis": "30mg vo: un cuarto cada noche (puede usar hasta la mitad)"
      },
      {
        "nombre": "Venlafaxina",
        "dosis": "75 mg vo: 1 cada mañana"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mg vo: 1 cada mañana."
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mg vo: 1/2 en la noche por 14 dias, luego 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418416_bb65jbe62",
    "ficha": 192,
    "nombre": "Paula Baeza Prat",
    "rut": "14136057-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Desvenlafaxina 100mg vo: medio cada mañana por 10 dias y luego suspender",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Paulabaezaprat@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "su horario de trabajo es de 8 a 12, lego de 1.30 a 17.15 hrs. los sabado de 8 a 14.00hrs. hace cuatr",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "desvenlafaxina",
        "dosis": "100mg vo: 1 cada mañana (hace 2 dias, previo usó 50mg por poco mas de un mes."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo: ½ en la mañana y ½ a las 17.00hrs. , por 1 mes, luego suspender uso horario. Puede usar 10mg sublingual en caso de SOS."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "2 mg vo: 1 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418418_nybgtpfco",
    "ficha": 193,
    "nombre": "Paula Lucy Hernandez Flores",
    "rut": "16120432-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Fn 28 marzo 1986",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "pau.hernandez.f@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Altruline",
        "dosis": "50mg vo: 1/2 en la mañana por seis días, luego 1 cada mañana"
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5mg vo: medio en la mañana por 4 días, luego 1 en la mañana por 4 días, luego 1 1/2 en la mañana por 4 días, luego 2 cada mañana. Al iniciar neoaradix: no tomar estimulantes como café, mate, energéticas, té, coca cola, kem xtreme, ginseng, guaraná, entre otros."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418419_ob4egisyv",
    "ficha": 194,
    "nombre": "Paula Riveros Saavedra",
    "rut": "17039734-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Desde 2021 con controles de salud mental, en ese entonces tuvieron exabrupto con un vecino que es hijo de PDI, conllevó denuncia penal a su esposo. concomitantes dificultades economicas. se definió todo en multa hacia su esposo de 50mmil mensuales por 1 año.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56951892839",
      "+56955849251"
    ],
    "email": "paula.riverossaa@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Estos hechos han influido en sintomatologia ansioso depresiva desde entonces. primero estuvo en tto ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 1 cada noche"
      },
      {
        "nombre": "quetiapina",
        "dosis": "25mg vo: media cada noche"
      },
      {
        "nombre": "clotiazepam",
        "dosis": "10mg vo: 1/2 cada doce horas (mantener dosis neta) ensayar suhspension de la toma de la mañana, a partir de 5 dias."
      },
      {
        "nombre": "dilasedan",
        "dosis": "5 mg vo: uno cada doce"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418419_7j74noi24",
    "ficha": 195,
    "nombre": "Paulina Reyes Guzman",
    "rut": "pendiente-195",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418421_ue9ysbhkm",
    "ficha": 196,
    "nombre": "Paulina Reyes Guzmán",
    "rut": "16729248-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 20mg: 1 cada mañana (cambio horario)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56982358526",
      "+56948551282"
    ],
    "email": "paulii.reyes@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: esposo Camilo, 32, ingeniero informático + hijo Lucas, 2 años, sano",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "5mg vo:  ½ en la mañana, ½ después de almuerzo, 1 en la noche.  Además, puedes usar 1 comprimido sublingual en caso de SOS (en caso de crisis de pánico, masticar una pastilla y dejar que se disuelva bajo la lengua)"
      },
      {
        "nombre": "cianocobalamina",
        "dosis": "1mg"
      },
      {
        "nombre": "esomeprazol",
        "dosis": "40 mg vo: 1 cada mañana por 2 meses"
      },
      {
        "nombre": "ectiban",
        "dosis": "10mg a las 21 hrs, cloti 2.5mg mañana, mismo almuerzo, 1 noche. sin somnolencia diurna. sin insomnio de conciliacion, duerme de corrido tecnicamente. despertando 7.30hrs.  ya ha cedido parcialmente fatiga y falta de energia. tuvo control con endocrino y pidio tsod. ferritina 18 ( lim inferior es 6.2) , los vio hemato y le dijo que era por tema alimentacion. Le pidió hemograma para 3 meses, con perfil bioquimico y reticulocitos."
      },
      {
        "nombre": "ascorbico",
        "dosis": "100mg"
      },
      {
        "nombre": "folico",
        "dosis": "2mg."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418425_scaqo6im7",
    "ficha": 197,
    "nombre": "ficha 1",
    "rut": "26316901-8",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 12 junio 9.30hrs AM.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56933364379"
    ],
    "email": "pjalvaradorivero@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "médico haciendo beca med familiar en autonoma, va en segundo. Ademas hace consulta particular y turn",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 en la mañana por 4 dias, luego 1 cada mañana. Al cabo de 14 dias de haber iniiciado el fármaco, enviarme reporte por mail acerca de cómo ha estado."
      },
      {
        "nombre": "Somnipax",
        "dosis": "10mg vo: medio comprimido sublingual, por 2 semanas, antes de dormir, luego suspender."
      },
      {
        "nombre": "Celtium",
        "dosis": "20mg vo: 1 y medio cada noche"
      },
      {
        "nombre": "propanolol",
        "dosis": "40mg vo: 2 horas previo a exposición tomar la mitad"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418427_jm6e92tl0",
    "ficha": 198,
    "nombre": "Pedro Alvarado",
    "rut": "pendiente-198",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418428_qp2atakju",
    "ficha": 199,
    "nombre": "Datos generales",
    "rut": "17290700-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Eszopiclona 3 mg vo: 1 sos en la noche",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56951032740"
    ],
    "email": "Peter.veliz89@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "hasta",
        "dosis": "100mg hasta 1 año y susp por indicacion. Sentia q no le afectaban tanto las cosas, andaba mas tranquilo."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3 mg vo: 1 sos en la noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418430_ekc73rain",
    "ficha": 200,
    "nombre": "Rene Martinez Domke",
    "rut": "6017996-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Trittico 100mg vo: 1/4 noche (mantener)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56987689346"
    ],
    "email": "rene.martinezdomke@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "jubilado",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "20mg vo: 1 CADA MAÑANA"
      },
      {
        "nombre": "Lorazepam",
        "dosis": "2mg vo: 1/2 a las 8.00hrs, 1/2  a las 13.00hrs, 1/2 a las 18.00hrs. 1 comp a las 23 hrs.. Ese esquema de lorazepam durante 7 días."
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: 1/4 noche"
      },
      {
        "nombre": "Ectiban",
        "dosis": "20mg vo: 1 CADA MAÑANA (sugiero esa presentación de escitalopram)"
      },
      {
        "nombre": "gabictal",
        "dosis": "300mg vo: 1/2 cada noche por 10 dias, luego 1 cada noche (usar una vez finalizado el lorazepam)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418433_ei2c9jp45",
    "ficha": 201,
    "nombre": "Ricardo Espinoza Manriquez",
    "rut": "18779886-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Trazodona 100mg: media en la noche por una semana, luego una entera cada noche. Se agrega.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56977591093",
      "+56975849358",
      "+56975243307"
    ],
    "email": "ricardoestebancduc@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> - Pablo A. Espinoza M. - HERMANO - 18 años - Estudiante",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "150mgvo OR 1-0-0"
      },
      {
        "nombre": "clonazepam",
        "dosis": "2mgvo 0-0-1, inicia."
      },
      {
        "nombre": "eszopiclona",
        "dosis": "3mg noche."
      },
      {
        "nombre": "eszopi",
        "dosis": "3mgnoche."
      },
      {
        "nombre": "ravotril",
        "dosis": "2mg: 0-0- 1/4 desde mañana, por 10 días y luego suspender._"
      },
      {
        "nombre": "Rexulti",
        "dosis": "2 mg: 0-0- ½ por 1 semana y luego 0-0-1"
      },
      {
        "nombre": "Trazodona",
        "dosis": "100mg: media en la noche por una semana, luego una entera cada noche. Se agrega."
      },
      {
        "nombre": "subelan",
        "dosis": "150mg 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418435_34irw65w4",
    "ficha": 202,
    "nombre": "Ricardo Parada Herrera",
    "rut": "15854288-9",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "r.paradaherrera@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitavitae",
        "dosis": "10mg vo: medio en la mañana por 6 dias, luego 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418437_9pc7oh3i5",
    "ficha": 203,
    "nombre": "Ricardo Ernesto Silva Soto",
    "rut": "18175644-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-07-23",
    "direccion": ": san jorge norte loteo san francisco aurora, lote 2 , san clemente",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56985697165"
    ],
    "email": "ricardoernestosilvasoto@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "ingeniero agropecuario, agricultor, trabaja lunes a lunes, diurno.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "neuroval",
        "dosis": "10mg vo: 1 al dia, minfel 18mg 1 cada mañana, seronex 100mg vo: 1 cada mañana y medio en la noche. elontril XL 300mg 1 cada mañana, tramadol long SOS."
      },
      {
        "nombre": "sertac",
        "dosis": "100mg vo: 2 cada mañana"
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: 1 sos en el día."
      },
      {
        "nombre": "minfel",
        "dosis": "36 mg vo: 1 cada mañana, iniciar en 10 dias más."
      },
      {
        "nombre": "Osmetil",
        "dosis": "36 mg vo: 1 cada mañana (cambia presentación)"
      },
      {
        "nombre": "paxon",
        "dosis": "10mg vo: medio en la mañana, medio en la tarde (18.00hrs)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418443_2u2qgnvqy",
    "ficha": 204,
    "nombre": "Roberto Acuña Galleguillos",
    "rut": "12220142-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Escitavitae 20mgvo: 0-0-1 (estaba con ipran)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "robertoacunag@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Hay ocaisones que ha sentido como falta de motivacion para funcionar en el dia \"como que he sentido ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "5mg 1 caja"
      },
      {
        "nombre": "Escitalopram",
        "dosis": "20mgvo: 1 y media cada noche."
      },
      {
        "nombre": "Pregabalina",
        "dosis": "150 mgvo: 1/2 cada noche."
      },
      {
        "nombre": "Duloxetina",
        "dosis": "60mg vo: 1 cada noche"
      },
      {
        "nombre": "ipran",
        "dosis": "20mgvo 0-0-1"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "20mgvo: 0-0-1 (estaba con ipran)"
      },
      {
        "nombre": "Esomeprazol",
        "dosis": "20mg SOS"
      },
      {
        "nombre": "planiden",
        "dosis": "10mgvo 1 SOS. Por 30 dias."
      },
      {
        "nombre": "Arivitae",
        "dosis": "5mgvo: media cada noche"
      },
      {
        "nombre": "Binax",
        "dosis": "60mg vo: 1 cada noche"
      },
      {
        "nombre": "Paracetamol",
        "dosis": "500mgvo: 1 gr cada ocho."
      },
      {
        "nombre": "magnesio",
        "dosis": "200mg cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418444_p3hkfjgjt",
    "ficha": 205,
    "nombre": "Roberto Diaz Gonzalez",
    "rut": "pendiente-205",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418445_ajdxy25br",
    "ficha": 206,
    "nombre": "Rocío Ignacia Becerra Bustamante",
    "rut": "17321819-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Arturo Pratt 2546, San Javier",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "r.becerra.bustamante@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Situación laboral actual: Dueña de casa, hace 7 años sin ejercer",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Amitriptilina",
        "dosis": "25mg vo (2 cada noche), Pregabalina 75mg vo (1 cada noche), Anticonceptivo oral, Vitamina B12 comprimidos diarios"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "5mg cada 12 horas por una semana sin beneficio. Suspendió Lexapro tras 4 días por persistencia de crisis de pánico y ansiedad marcada."
      },
      {
        "nombre": "ciclobenzaprina",
        "dosis": "10mg vo: 1 cada noche por 14 dias."
      },
      {
        "nombre": "Topiramato",
        "dosis": "25mg vo (1 cada noche), Amitriptilina 25mg vo (2 cada noche), Pregabalina 75mg vo (1 cada noche), Anticonceptivo oral, Vitamina B12 comprimidos diarios"
      },
      {
        "nombre": "Lexapro",
        "dosis": "10mg indicado por neuróloga, presentando crisis de pánico al segundo día. Se agregó Clotiazepam 5mg cada 12 horas por una semana sin beneficio. Suspendió Lexapro tras 4 días por persistencia de crisis de pánico y ansiedad marcada."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mg vo (1 cada mañana y 1 en la tarde 15:00hrs), Lexapro 10mg vo con titulación gradual (iniciar post retorno a Chile), Pregabalina hasta 150mg noche"
      },
      {
        "nombre": "hasta",
        "dosis": "150mg noche (la suspendió ya q no sentía efecto, tampoco sintió cambio luego de suspender)"
      },
      {
        "nombre": "Binax",
        "dosis": "30mg vo cada noche por 6 días, luego 2 cada mañana hasta agotar la caja. Después continuar con Binax 60mg cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418447_0r9b8r3sp",
    "ficha": 207,
    "nombre": "Silvia Rocio Morales Díaz",
    "rut": "16298394-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Sertac 50mg vo: 1/2 en la mañana por 4 dias, luego 1 cada mañana por 10 días, ahi enviarme un mail reportando cómo se ha sentido.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56991523989"
    ],
    "email": "rocio.moralesdiaz@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "hasta",
        "dosis": "50mg. Sin consumos. Toma harto café en el día."
      },
      {
        "nombre": "Sertac",
        "dosis": "50mg vo: 1/2 en la mañana por 4 dias, luego 1 cada mañana por 10 días, ahi enviarme un mail reportando cómo se ha sentido."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5mg vo: 1/2 en la mañana , 1/2 en la tarde (18.00hrs)   (puede aumentar a 1 en la mañana y 1 en la tarde) (no debe combinarse con alcohol)"
      },
      {
        "nombre": "Creatininuria",
        "dosis": "251 mg/dL | Microalb 12.0 mg/L."
      },
      {
        "nombre": "Buspirona",
        "dosis": "10mg vo: 1/2 en la mañana y 1/2 en la tarde ( 18.00hrs), por 10 días; luego 1 en la mañana y 1 en la tarde."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418449_bbb0esrk0",
    "ficha": 208,
    "nombre": "Rogelio Gregorio Aravena Alarcon",
    "rut": "10160666-k",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 20 marzo 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56948551282"
    ],
    "email": "Rogelioaravena1661a@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Tbja en construccion con un ingeniero, refiere unico contratado en la misma empresa, hace de chofer,",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Clonazepam",
        "dosis": "2mg vo: 1 cada noche"
      },
      {
        "nombre": "Melatonina",
        "dosis": "3mg vo: 2 cada noche (tomar a las 21 horas)"
      },
      {
        "nombre": "Lexapro",
        "dosis": "10mgvo: medio cada noche por seis dias y luego 1 cada noche"
      },
      {
        "nombre": "Neuroval",
        "dosis": "10mgvo: medio en la mañana , medio luego de almuerzo."
      },
      {
        "nombre": "Ravotril",
        "dosis": "2mgvo: medio cada noche"
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mgvo: 1 cada noche"
      },
      {
        "nombre": "Venlavitae",
        "dosis": "75mgvo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418450_0w8ejyxvk",
    "ficha": 209,
    "nombre": "Romina Andrea Gonzalez Marín",
    "rut": "pendiente-209",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Tol 12 forte: 1 ampolla I.M. (equivalente a 1000mcg de hidroxocobalamina) cada 3 días (aplicar en total 6 ampollas).",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "mientras",
        "dosis": "75mg + 150."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418451_m9altxvd7",
    "ficha": 210,
    "nombre": "Romina tamara Alarcon Valdes",
    "rut": "17229031-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Plaquinon 20mg día",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "rominaalarconv@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mg 0-0-1 primera semana solo la mitad."
      },
      {
        "nombre": "Plaquinon",
        "dosis": "20mg día"
      },
      {
        "nombre": "Prednisona",
        "dosis": "20mg (2sem…) bajando ahora 5mg, hace 1 mes"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418453_bvhq1cesl",
    "ficha": 211,
    "nombre": "Rose Elena Abarca Delgado",
    "rut": "14553719-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-10-03",
    "direccion": "Binax 60mg vo: 1 cada noche",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56963312912"
    ],
    "email": "r.elena.abarca@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "emito certificado médico (necesita que certificado dure todo el año, que diga diagnostico).",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "duloxetina",
        "dosis": "30mg vo: 1 cada noche por 14 dias, luego 2 cada noche hasta agotar la caja. luego suspender y continaur con duloxetina 60mg vo: 1 cada noche. (sugiero cymbalta , duceten, binax)"
      },
      {
        "nombre": "dilasedan",
        "dosis": "5mg: 1 sos sublingual. Si lo usa antes de la exposicion, tomarlo aprox 90 minutos antes (tragarlo). No tomar café previo a la exposición."
      },
      {
        "nombre": "Binax",
        "dosis": "60mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418454_erpmk3shp",
    "ficha": 212,
    "nombre": "Sabrina Muñoz Hidalgo",
    "rut": "13599213-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 14 nov 2022",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56976887520"
    ],
    "email": "luzsabrinam@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "paroxetina",
        "dosis": "20mg dia y neuroval 10mg medio sos"
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg: 1/2 - 1/2 - 1"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418460_9yvbejxfu",
    "ficha": 213,
    "nombre": "Sandra Baeza",
    "rut": "18280542-4",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Dominium 20mg vo: 2 cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56978958670"
    ],
    "email": "sandrabc096@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: esposo Gonzalo Diaz 35 años constructor + madre Rosa 60 dueña de casa + Gonzalo 2años 8m +",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "5mg vo: medio en la mañana , medio en la tarde (18hrs). #med_clotiazepam"
      },
      {
        "nombre": "dominium",
        "dosis": "20mg vo: ½ en la mañana por 6 días, luego 1 cada mañana por 14 días, luego 2 cada mañana. #med_sertralina"
      },
      {
        "nombre": "venlavitae",
        "dosis": "75mg vo: 1 cada mañana (inicia) #med_venlafaxina"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418461_721vdm91b",
    "ficha": 214,
    "nombre": "Sandra Sobarzo Dominguez",
    "rut": "9739862-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-09-17",
    "direccion": "Ectiban 10mg vo: 1/2 cada mañana por 6 días, luego 1 cada mañana. Sugiero junto con el desayuno.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56957508485"
    ],
    "email": "sandra.sobarzo.d@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "- trabaja profesora en escuela carlos salinas (antes las concentradas de varones), lunes a martes de",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "luego",
        "dosis": "300 mg/día (150 mg x 2 cada mañana) hasta agotar caja; posteriormente Butrino XL 300 mg VO cada mañana."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 cada mañana por 6 días, luego 1 cada mañana. Sugiero junto con el desayuno."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418464_lltmy9kn4",
    "ficha": 215,
    "nombre": "Sandra Orellana Alarcon",
    "rut": "10075520-3",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 10mg vo (1 comprimido en la mañana),",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "sandra_orellana_@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: ½ cada mañana por 6 días, luego 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418466_aw7f2umup",
    "ficha": 216,
    "nombre": "Sebastian Navarro Fernandez",
    "rut": "18679131-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 25 febrero 2021",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "sebanavarrof@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "abogado",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "20 mg vo 0-0-1 (para que pueda comprar ipran)"
      },
      {
        "nombre": "rize",
        "dosis": "10 mg vo ½ - 0 - ½ (se mantiene)"
      },
      {
        "nombre": "ipran",
        "dosis": "20mg noche."
      },
      {
        "nombre": "diario",
        "dosis": "5mg sos"
      },
      {
        "nombre": "Celtium",
        "dosis": "20mgvo: 1 y medio cada noche."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3 mg vo: 1 en la noche SOS"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418467_4nc36w7ut",
    "ficha": 217,
    "nombre": "Sebastian Zamora Roco",
    "rut": "17822013-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 10mg vo: 1 cada mañana",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "sebazamorar@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: padre 68 años tbja en administrativo en preu + madre 72 exprofesora, jubilada.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "levocetirizina",
        "dosis": "5 mg vo día en primavera"
      },
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: ½ en la mañana por 10 días, luego 1 cada mañana."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5mg vo: medio en la mañana y medio en al tarde, por 30 días, luego suspender. Pero lo puedes usar como SOS (1 sublingual)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418468_ti68k1xzs",
    "ficha": 218,
    "nombre": "Sharay Andrea Saavedra Garrido",
    "rut": "21596115-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "sharaysaavedra444@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418470_mpfkxfgfa",
    "ficha": 219,
    "nombre": "Simone Lambert Díaz",
    "rut": "17795892-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 17 febrero 2024",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "s.lambertdiaz@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Valdoxan",
        "dosis": "25 mg vo: 1 cada noche"
      },
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: medio cada noche por 6 días, luego 1 cada noche."
      },
      {
        "nombre": "quelado",
        "dosis": "400mg vo (vitamin UP): 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418472_e251gcqil",
    "ficha": 220,
    "nombre": "Sofia Paulina Rivera maturana",
    "rut": "17858661-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 15 agosto 2022",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56986386287"
    ],
    "email": "sofia.rivma@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Enfermera en HRT 4to turno en medicina. (cambios ciclos sueño vigilia).",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418473_nccb8dfhq",
    "ficha": 221,
    "nombre": "Sofia Sanchez Vega",
    "rut": "18227725-8",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 24 oct 20.00hrs.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "sofiaelenasv@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo 1-0-0. Suspendio cloti sin problemas hace varias semanas. OH consumo no riesgoso, nota menos tolerancia, se explica. Psicueduco de etapa mantencion, alk menos hasta sept 2022. No siguio con psicoterapia porq ya no atiende presencial. Problemas de convivencia normales con hermano , percibe que avanzan positivamente igual. Sin consumo de THC, refuerzo ello. Sin crisis de panico de hace meses."
      },
      {
        "nombre": "aradix",
        "dosis": "10mgvo mitad 3 dias luego 1 por 3 dias luego 1 y medio por 3 dias luego 2. solicitó para apoyo en estudios. envio receta por 1 caja hoy."
      },
      {
        "nombre": "ipran",
        "dosis": "10mg dia"
      },
      {
        "nombre": "retard",
        "dosis": "20mg: 1 a las cinco de la tarde ."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418475_9hb8er1f0",
    "ficha": 222,
    "nombre": "Solange Goldswosthy",
    "rut": "16485174-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56976360886"
    ],
    "email": "sol.goldswosthy@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: medio en la mañana por 6 días, luego 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418476_hy1nv390i",
    "ficha": 223,
    "nombre": "Soledad Alcaíno Cifuentes",
    "rut": "20565233-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2025-11-06",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56956573747"
    ],
    "email": "s.alcaino.cifuentes@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Estudiante sociologia 6to",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "escitalopram",
        "dosis": "10mg vo: 10mg vo: 1 cada noche"
      },
      {
        "nombre": "melatonina",
        "dosis": "3mg vo: 2 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418478_2jgiivpxq",
    "ficha": 224,
    "nombre": "Susana Aracelli Tarazona Rojas",
    "rut": "22427501-3",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "bebe-0506@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "tramadol, tuvo reaccion anafilactica.",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "10mg vo: ½ cada ocho horas."
      },
      {
        "nombre": "venlavitae",
        "dosis": "75mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418479_v3kig0onr",
    "ficha": 225,
    "nombre": "Sylvia Guerrero Veliz",
    "rut": "16002388-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ingreso 9 oct 2023",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "Sylvisebi1985@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Duloxetina",
        "dosis": "30mgvo: 0-0-1, antes 60, la bajo sola, toma hace 2 años cuandos e cumplio lo de seba."
      },
      {
        "nombre": "Dominium",
        "dosis": "20mg vo: medio cada mañana por 6 días, luego 1 cada mañana"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1/2 en la mañana y 1/2 en la tarde aprox 17.00hrs."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418481_96x485b5g",
    "ficha": 226,
    "nombre": "Trinidad Santa María Highet",
    "rut": "15642393-9",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Fapris 50mg 1-0-0 (hace 1 mes, antes de eso estuvo con escitalopram de 10mg desde dos años y medio). Fue traslape progresivo.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56992492078"
    ],
    "email": "tsmaria@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Desloratadina",
        "dosis": "5mgvo: 1-0-0"
      },
      {
        "nombre": "Fapris",
        "dosis": "50mg 1-0-0 (hace 1 mes, antes de eso estuvo con escitalopram de 10mg desde dos años y medio). Fue traslape progresivo."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5mg : 1o 1/2 a diario. (hace un mes)"
      },
      {
        "nombre": "Samexid",
        "dosis": "30mgvo: 1-0-0, hace 1 mes."
      },
      {
        "nombre": "Wellbutrin",
        "dosis": "300mg xl: 1 cada mañana"
      },
      {
        "nombre": "Trittico",
        "dosis": "100mgvo: 1/4 cada noche. Puedes usar 1/2, 3/4 , o hasta 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418485_r89fy7xv5",
    "ficha": 227,
    "nombre": "Valentina Moya Roa",
    "rut": "21200544-4",
    "edad": 22,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "2002-12-29",
    "direccion": "Dilasedan 10mg: 1 al dia, se le acabo hace 20 dias aprox.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "valentinamoyaroa@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Dilasedan",
        "dosis": "10mg: 1 al dia, se le acabo hace 20 dias aprox."
      },
      {
        "nombre": "Brintellix",
        "dosis": "15mg dejó hace un mes (estuvo x 2 meses y no tenia efecto), luego le recetaron otro que le dio vomitos: ****"
      },
      {
        "nombre": "retard",
        "dosis": "20mg ultima vez en diciembre (cuando iba clases)."
      },
      {
        "nombre": "Samexid",
        "dosis": "30mg vo: 1 cada mañana por 14 dias, luego enviarme reporte de cómo te has sentido."
      },
      {
        "nombre": "Ipran",
        "dosis": "10mgvo: medio en la noche durante 10 dias y luego 1 cada noche."
      },
      {
        "nombre": "Propnaolol",
        "dosis": "40mg vo: 1/2 en la mañana, 1/2 en la tarde (ej 16.hrs)"
      },
      {
        "nombre": "Propanolol",
        "dosis": "40mg vo: 1 en la mañana , 1 en la tarde"
      },
      {
        "nombre": "Minfel",
        "dosis": "18 mg vo: 1 en la mañana por 10 dias, luego 2 en la mañana. Enviarme reporte"
      },
      {
        "nombre": "uricont",
        "dosis": "5mg vo: 1 en la mañana y 1 en la noche."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150mg vo: 1 cada mañana por 2 semanas, luego agregar venlavitae 75mg vo: 1 cada mañana (ahí estarías con 225mg cada mañana de venlafaxina)"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: ½ cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418486_1laius07j",
    "ficha": 228,
    "nombre": "Valentina Parada Herrera",
    "rut": "17345935-1",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "vale.parada.herrera@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "pendiente confección de informe médico",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418492_32o1qo8q5",
    "ficha": 229,
    "nombre": "Valentina Schorr Prieto",
    "rut": "pendiente-229",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Felipe 5 meses segundo hijo",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Seronex",
        "dosis": "50mg vo: 1 cada mañana (primeros seis días solo la mitad)"
      },
      {
        "nombre": "Altruline",
        "dosis": "100mgvo 1 cada mañana"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mgvo: medio por 10 dias y luego 1 cada noche"
      },
      {
        "nombre": "Wellbutrin",
        "dosis": "300mgvo XL: 1 cada mañana"
      },
      {
        "nombre": "Risperdal",
        "dosis": "1mgvo: medio comprimido en la noche por 6 dias, luego 1 cada noche."
      },
      {
        "nombre": "Samexid",
        "dosis": "30mg vo: 1 cada mañana"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418494_ioiocz3bq",
    "ficha": 230,
    "nombre": "parral",
    "rut": "17333076-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "villa cordillera  pje E casa 1 ( de Parral)",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "vane.sepulveda.s@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "junio 2025 padre enferma tumor gastrico, gastrectomia total , colecistectomia, complicó peritonitis,",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "ectiban",
        "dosis": "10mg vo: media en la mañana por 4 días, luego 1 cada mañana"
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: puedes usar 1/2 comp sublingual en caso de SOS (angustia intensa persistente que no cede de manera habitual; dificultad marcada para conciliar sueño)."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418496_b8quehkqc",
    "ficha": 231,
    "nombre": "Vania Carolina Valenzuela Ibáñez",
    "rut": "18571917-0",
    "edad": 32,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1993-07-29",
    "direccion": "Hace 2 semanas bajó a 1 dominium, hacer otras cosas que lo cpmpensaran.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56966785596"
    ],
    "email": "vaniacarolina.vi@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "diseñadora grafica",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "clotiazepam",
        "dosis": "10mgvo ½ -0-1"
      },
      {
        "nombre": "Fluoxetina",
        "dosis": "20 mg vo 1-0-0"
      },
      {
        "nombre": "dominium",
        "dosis": "20mgvo ½ -0-0 x6 dias luego 1-0-0."
      },
      {
        "nombre": "domiunium",
        "dosis": "20mg vo: 1 ½ -0-0 por 10 días, luego 2-0-0"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10mgvo: 1 en la mañana y 1 a las 18.00hrs. Puede usar medio si somnolencia."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418498_st9b72n4g",
    "ficha": 232,
    "nombre": "Veronica Ramirez Calderon",
    "rut": "17040367-3",
    "edad": 37,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1988-10-15",
    "direccion": "Avenida 14 poniente #1632 Villa Puertas del Sur, comuna Maule.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "rcalderon.veronica@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "> Inspector técnico de obras Serviu",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "altrulkine",
        "dosis": "50mg hace mas de 2 años."
      },
      {
        "nombre": "altruline",
        "dosis": "100mgvo 1-0-0, mantener"
      },
      {
        "nombre": "escitavitae",
        "dosis": "20mgvo 0-0- 1 ½ y suspender altruline 100mg/día. LM desde el 5 abril x 30días por f42.1"
      },
      {
        "nombre": "scitavitae",
        "dosis": "20mgvo 0-0- 1 1/2. Ha desconfiado de esposo porque sofia tuvo gatillantes. Hace un mes le pidio a guillermo que no le cuente tanto como va el tema de demanda y han bajado las pesadillas y durmiendo un poco mejor."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "5mgvo 1/2 -0- 1/2"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418500_1oz81n8dx",
    "ficha": 233,
    "nombre": "INTERCONSULTA MÉDICA",
    "rut": "8947370-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "hescobar@clinica.cl",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Neuryl",
        "dosis": "2mg (1/4 noche), Ectiban (en ajuste), Levotiroxina 88 mcg diario."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418505_hfwdrkxis",
    "ficha": 234,
    "nombre": "Veronica Alejandra Zamora Contreras",
    "rut": "8947370-5",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "15 y media poniente 0213, Talca",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56996740487"
    ],
    "email": "ver-aleza@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "Ocupación: Profesora y Directora de Colegio San Ignacio",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Niega",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Neuryl",
        "dosis": "2mg (1/2 comprimido nocturno), Depurol retard 37.5mg (1 comprimido matinal), Neuroval CD 10mg (1/2 comprimido en mañana y mediodía), ibuprofeno 600mg diario por varias semanas, etoricoxib 120mg para cefalea"
      },
      {
        "nombre": "ibuprofeno",
        "dosis": "600mg día; lo que prosiguió a suspender durante el reposo descrito pero esta vez usando etoricoxib 120mg dia por al menos una semana. Se realizaron exámenes el 24/05/25 que evidenciaron leucocitosis 11.71, neutrofilia 80%, VHS 36, PCR 32.35 y perfil tiroideo con TSH 0.444, T4 11.60, T3 41.05. Fue derivada a psiquiatría por su broncopulmonar, donde inició tratamiento hace aproximadamente 3 semanas con Neuryl 2mg (1/2 comprimido nocturno), Depurol retard 37.5mg (1 comprimido matinal) y Neuroval CD 10mg (1/2 comprimido en mañana y mediodía). Ha iniciado apoyo psicológico con psicóloga Karin Mancilla, completando una sesión inicial con plan de seguimiento semanal. Actualmente mantiene tensión cervical marcada y alteraciones del sueño a pesar del tratamiento farmacológico. Cuadro clinico actual hace sospechar que esté manifestando cuadro basal ansioso depresivo cronico, asociado a reacciones adversas a venlafaxina en contexto de abuso de AINEs, sin conocer función renal actual; además que no se descarta que haya tenido administración de corticoides en consulta de urgencias en la clínica, lo que pudiera explicar el cuadro de exacerbación abrupto. A pesar de malestares, ha seguido tomando los psicofármacos de manera rigurosa. Además, con hipersomnolencia diurna a dosis que ha estado usando de clotiazepam, siestas recurrentes en el día, complicando sueño nocturno. Paciente afirma que está con orina en frecuencia y cantidad normal, niega edema, no se aprecia disneica, RR2T cardiologico. Sin signos de TVP ni clinica orientativa a tromboembolismo pulmonar. Se ha mantenido afebril y cedió dolor de costado durante tratamiento antibiótico."
      },
      {
        "nombre": "Ectiban",
        "dosis": "10mg: medio en la noche por 10 días, luego 1 cada noche"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: un cuarto cada noche, puede subir hasta 1 de a cuartos."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "2 mg vo: 1 cada noche (debe suspender la zopiclona)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418508_vujf8rzvu",
    "ficha": 235,
    "nombre": "Isabel Lobos Canales",
    "rut": "18692624-2",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Ectiban 10mg vo: 1/2 cada mañana por 10 días, luego 1 cada mañana.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "isabelobos3@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: tío (hno menor de madre)  Domingo Canales 42 años tbjo agricola + tía (esposa de Domingo) ",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Ectiban",
        "dosis": "10mg vo: 1/2 cada mañana por 10 días, luego 1 cada mañana."
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10 mg sublingual: 1/2 SOS en caso de crisis de ansiedad."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418511_g65w5tlew",
    "ficha": 236,
    "nombre": "Verónica Duarte Tapia",
    "rut": "8280038-7",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "20 y media sur 18 pte B 0250 Talca **  de reposo.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56997951537"
    ],
    "email": "veriduar@yahoo.es",
    "tutor": "No aplica",
    "ocupacion": "Vive con espos, casados: pedro ardiles, 63 pensionado empresa hidroelectrica autonomo + constanza 26",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Escitalopram",
        "dosis": "10mgvo: 1 cada noche , pero los primeros diez dias la mitad."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo: 1 cada noche por 21 dias."
      },
      {
        "nombre": "Venlavitae",
        "dosis": "150 mg vo: 1 cada mañana"
      },
      {
        "nombre": "retard",
        "dosis": "75mg vo: 1 cada mañana"
      },
      {
        "nombre": "trittico",
        "dosis": "100mg vo: 1/4 cada noche."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418521_osakdcpeq",
    "ficha": 237,
    "nombre": "Vicente José Cruz Garrido",
    "rut": "20170503-7",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Carboron 300mgvo 1 en la mañana y 1 y medio en la noche por 8 dias, luego 1 y medio cada doce horas.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56989408112",
      "+56994516740"
    ],
    "email": "Vcruz1811@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "Tbjando en apoyo a un abogado, jugando golf.",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Leflunomida",
        "dosis": "20mg día"
      },
      {
        "nombre": "Quetiapina",
        "dosis": "50mgvo: 2 cada noche (de Ascend)"
      },
      {
        "nombre": "Prednisona",
        "dosis": "10mgvo día"
      },
      {
        "nombre": "carboron",
        "dosis": "300mg vo: medio en la noche por 4 dias, luego 1 en la noche por 4 días, luego medio en la mañana y 1 en la noche por 4 días, luego 1 en la mañana y 1 en la noche."
      },
      {
        "nombre": "celecoxib",
        "dosis": "200mg vo 1 cada doce, lleva tres dias."
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mgvo: medio en la noche por 10 días, luego 1 cada noche."
      },
      {
        "nombre": "Neoaradix",
        "dosis": "5mg vo: medio en la mañana por 4 días, luego 1 en la mañana por 4 días, luego 1 1/2 en la mañana por 4 días, luego 2 cada mañana. Al iniciar neoaradix: no tomar estimulantes como café, mate, energéticas, té, coca cola, kem xtreme, ginseng, guaraná, entre otros. Enviarme reporte por mail de cómo te has sentido al 4to día tomando dos comprimidos de neoaradix."
      },
      {
        "nombre": "Minfel",
        "dosis": "36 mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418523_34hcro52p",
    "ficha": 238,
    "nombre": "Victor Manuel Olave San Martin",
    "rut": "7322544-2",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "Profesor jubilado",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Mirtazapina",
        "dosis": "30mg vo: una cada noche  <br>-Quetiapina 100mg vo: un cuarto cada noche.  <br>-Donepezilo 10mg vo: media csds noche.  <br>-Prolopa 100/25mg: media (8:00hrs), media (13:00hrs), media (18:00hrs).  <br>Suspender risperidona, suspender memantina  <br>Control en 3 semanas.  <br>Lo retiraron del hogar sus hermanas al momento que se haria el control.  <br>Reportan mejoría motriz. Apoya diagnostico de etiologia multiple (EA + Lewy), por tanto es pertinente nueva RM cerebral con contraste y complementar con PET-Scan.|||"
      },
      {
        "nombre": "Aripiprazol",
        "dosis": "5mgvo: medio cada noche por 4 dias, luego 1 cada noche INICIA  <br>Mirtazapina BD 30mgvo: media cada noche  <br>Vitamina D 50.000 UI IM: 1 sobre cada 1 semana por 8 semanas  <br>Después se iniciará Eutebrol duo y rosuvastatina.  <br>Solicito Bun Crea ELP y perfil hematologico.  <br>Repetir vitamina D en 10 semanas, aun no se pide.  <br>15 enero 2024: envío certificado que avala tto de EA hace más de 1 año, para poder acceder a PGU.  <br>Empezó el juev 18 enero con 40 gotas risperidona. Además está con 30mg noche de mirta.  <br>Indico risperidona gotas 50 cada noche. Mantener mirta  <br>20-4-24: destaca bradicinesia, alteracion de la marcha con pasos cortos, hipomimia marcada, sin evidente rigidez, sin temblor. Sin alteraciones sensoperceptivas, sin ideas delirantes. Impresión diagnostica: demencia de etiologia multiple (EA + Lewy).  <br>Indico:  <br>Entonces el esquema sería:  <br>-Mirtazapina 30mg vo: una cada noche  <br>-Quetiapina 100mg vo: un cuarto cada noche.  <br>-Donepezilo 10mg vo: media csds noche.  <br>-Prolopa 100/25mg: media (8:00hrs), media (13:00hrs), media (18:00hrs).  <br>Suspender risperidona, suspender memantina  <br>Control en 3 semanas.  <br>Lo retiraron del hogar sus hermanas al momento que se haria el control.  <br>Reportan mejoría motriz. Apoya diagnostico de etiologia multiple (EA + Lewy), por tanto es pertinente nueva RM cerebral con contraste y complementar con PET-Scan.|||"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418524_2vfi4k5gf",
    "ficha": 239,
    "nombre": "DCL explicacion",
    "rut": "pendiente-239",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "Realizaremos evaluaciones periódicas para monitorear su evolución y ajustar las recomendaciones segú",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418525_4albe6wbp",
    "ficha": 240,
    "nombre": "Medidas preventivas para el viaje a Canadá-",
    "rut": "pendiente-240",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "-  del alojamiento en Canadá",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418531_7wxoxsb1g",
    "ficha": 241,
    "nombre": "victor sandoval medina",
    "rut": "5824491-0",
    "edad": 0,
    "sexo": "Masculino",
    "identidadGenero": "Hombre cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "ing agronomo indap  regional de riego, esp sanitizaion, hace 2 años con teletrabajo por epoc",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56966583693",
      "+56965710285"
    ],
    "email": "shandoka19@hotmail.com",
    "tutor": "No aplica",
    "ocupacion": "tiene dos hijos con exesposa que son roberto 31 años med familiar Stgo, Francisca odonto 29 años apr",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "paroxetina",
        "dosis": "20mg vo: ½ en la noche por 6 dias, luego continuar con 1 en la noche."
      },
      {
        "nombre": "clotiazepam",
        "dosis": "10mg vo: 1 en la mañana y 1 en la noche."
      },
      {
        "nombre": "Rosuvastatina",
        "dosis": "10mg vo: 1 cada noche, inicia"
      },
      {
        "nombre": "vortioxetina",
        "dosis": "10mg vo: 1/2 en la noche por 6 días, luego 1 cada noche."
      },
      {
        "nombre": "posivyl",
        "dosis": "20mgvo: 0-0-1, rize 10: 1-0-1"
      },
      {
        "nombre": "rize",
        "dosis": "10 mg: ½ -0- ½ ( la mitad en la mañana y la mitad en la noche) por 14 días,"
      },
      {
        "nombre": "subelan",
        "dosis": "150mg dia hace aprox 20 dias"
      },
      {
        "nombre": "osmetil",
        "dosis": "18mgvo 1-0-0"
      },
      {
        "nombre": "Minfel",
        "dosis": "18mgvo 1-0-0"
      },
      {
        "nombre": "Wellbutrin",
        "dosis": "150mg 1-0-0 iniciar"
      },
      {
        "nombre": "Wellburin",
        "dosis": "150mg: 1-0-0"
      },
      {
        "nombre": "Donepezilo",
        "dosis": "10mg: 0-0- 1/2 por 1 semana, luego 0-0-1"
      },
      {
        "nombre": "Vivimex",
        "dosis": "10mgvo: 1 cada noche, inicia"
      },
      {
        "nombre": "Brintellix",
        "dosis": "20mg vo: 1 cada noche."
      },
      {
        "nombre": "Concerta",
        "dosis": "36 mg vo: 1 cada mañana"
      },
      {
        "nombre": "Glucosa",
        "dosis": "132 mg/dL**, Electrolitos plasmáticos normales, Ácido fólico 22.26 ng/mL, **HbA1c 6.2%**, BUN/Uremia normales, Perfil lipídico normal, Perfil hepático normal excepto **Protrombina 64.1%** e **INR 1.35**, Vitamina D 38.32 ng/mL, Hemograma normal excepto **Plaquetas 135 k/uL**, **HCM 32.3 pg** y **Basófilos 1%**, RAC 3.7 mg/g Creat, Orina completa normal excepto **Glucosuria++**, TSH 1.69 mUI/L, T4L 1.03 ng/dL."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418534_ebhbftl5o",
    "ficha": 242,
    "nombre": "interconsulta viviana bernales a medicina interna por anemia 15 sept 2025",
    "rut": "17685576-2",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [],
    "email": "",
    "tutor": "No aplica",
    "ocupacion": "**Médico Tratante:** Dr. Humberto Escobar, Psiquiatra",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "Duloxetina",
        "dosis": "60 mg VO: 2 cada mañana"
      },
      {
        "nombre": "Gabapentina",
        "dosis": "300 mg VO: 1 en la mañana y 2 en la noche, luego tiene indicación de 2 cada doce."
      },
      {
        "nombre": "Quetiapina",
        "dosis": "25 mg VO: 1/2 cada noche"
      },
      {
        "nombre": "Dilasedan",
        "dosis": "10 mg VO: 1/2 en la mañana y 1/2 en la tarde (uso horario)"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418542_7yzau1fku",
    "ficha": 243,
    "nombre": "Viviana del Carmen Bernales Espinoza",
    "rut": "9811167-0",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Viendo 13 px dia, tres de ellos sobrecupo. Le cuesta decir que no.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56984649622"
    ],
    "email": "vivianapsa2015@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "**Indico**: bonavid 50000 UI capsula via oral, 1 cada semana por 8 semanas. Consultar con médico gen",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "venlafaxina",
        "dosis": "75mgvo xr 1-0-0 (ectien)"
      },
      {
        "nombre": "Quetiapina",
        "dosis": "100mgvo: 1/4 cada noche (puede usar hasta 1/2)"
      },
      {
        "nombre": "Pregabalina",
        "dosis": "75mg vo: 1 sos en la mañana (la dejó porque le hizo subir de peso)."
      },
      {
        "nombre": "duloxetina",
        "dosis": "60mg vo: 2 cada mañana , hace una semana intentó con una sola en la noche. Sigue usando doloneurobionta a veces hasta tres en una semana. Está con duloxetina de ascend. Sin rams. Se ha percibido más estable emocionalmente, sin embotamiento emocional. Pidió cambio de sector que sería efectivo en marzo, ademas su box tendria aire acondicionado. Pia ha estado mejor, encontró trabajo en gendarmería. Padres están bien de salud. Ha cedido sudoracion nocturna en general, con mejoría parcial luego de suspender la venlafaxina. Hay noches que ni siquiera suda. Sigue siendo signficiativa y en ocasiones ha tenido que cambiarse."
      },
      {
        "nombre": "Clotiazepam",
        "dosis": "10mg VO ½-½-0"
      },
      {
        "nombre": "Gabapentina",
        "dosis": "300 mg VO: 1 en la mañana y 2 en la noche, por 14 días. Luego 2 cada doce horas. (sugiero usar Ritmenal, que reemplazaría al Gabata)."
      },
      {
        "nombre": "toma",
        "dosis": "50mg asicot por noche"
      },
      {
        "nombre": "lexapro",
        "dosis": "5mg noche por 7 días y ouego seguir con 10mg noche."
      },
      {
        "nombre": "asicot",
        "dosis": "100 mg 0-0-½ , lexapro 10 mg vo 0-0-1 (hace 1 mes con 1 entero). con respuesta a las dos semanas de iniciado. Concordamos en que tuvo tno adaptativo y hablamos acerca de diferencias pronosticas vs depre 2do episodio, Dado circunstancias sugiero igual mantener al menos por 1 año y a partir de julio pensar ya en ir sacando la quetiapina. Estable en lo laboral con jornada habitual."
      },
      {
        "nombre": "ciblex",
        "dosis": "15mgvo 0-0-1"
      },
      {
        "nombre": "noptic",
        "dosis": "3mg vo 0-0- ½ sos"
      },
      {
        "nombre": "rize",
        "dosis": "5mg cada doce . (10mg medio cero mmedio)"
      },
      {
        "nombre": "orlistat",
        "dosis": "120mg 1-1-1 y envio receta noptic"
      },
      {
        "nombre": "subelan",
        "dosis": "150mg y noptic 1.5 noche."
      },
      {
        "nombre": "Buxon",
        "dosis": "150mg 1 en la mañana por 7 días, luego 1 en la mañana y 1 al almuerzo."
      },
      {
        "nombre": "Eszopiclona",
        "dosis": "3mgvo 0-0-1"
      },
      {
        "nombre": "Disulfiram",
        "dosis": "500mg vo: 1/2 cada noche. Debe iniciar cuando complete 7 días sin beber alcohol y luego de revisar resultado de pruebas hepáticas."
      },
      {
        "nombre": "Venlakem",
        "dosis": "150mg vo: 1-0-0 , porq tuvo hiperhidrosis con 225, la bajó hace 2 dias."
      },
      {
        "nombre": "Escitavitae",
        "dosis": "10mgvo: 1 cada noche"
      },
      {
        "nombre": "Amlodipino",
        "dosis": "5mg cada noche."
      },
      {
        "nombre": "Duceten",
        "dosis": "60mg vo: 1 cada noche (inicia), por 2 semanas, luego 2 cada noche."
      },
      {
        "nombre": "dilasedan",
        "dosis": "10mg vo: 1/2 en la mañana y 1/2 en la tarde"
      },
      {
        "nombre": "Trazodona",
        "dosis": "25mg vía oral: 1 cada noche, inicio"
      },
      {
        "nombre": "Gabictal",
        "dosis": "300mg vo: 1 cada noche"
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418544_m3maijh0u",
    "ficha": 244,
    "nombre": "Wladimir Esteban Valverde Ortiz",
    "rut": "16857314-6",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56940075701"
    ],
    "email": "wladimir.valverde1988@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "vive con: pareja Camila Vilubron 30 años médico trabaja en cesfam de la florida + hijo Valentin de 2",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "sertralina",
        "dosis": "100mg vo 1cada mañana, esomeprazol 40mg vo: 1 cada mañana. ademas toma fentermina hace 2 meses aprox. supositorio semanal de mesalazina. fue diagnosticado de colitis ulcerosa hace aprox 3 años. alguna vez para pruebas tomó samexid de 20 y tuvo sensacion disforica y de andar jalado, con 50mg fue peor."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  },
  {
    "firestoreId": "patient_1763052418547_hvbukgjwy",
    "ficha": 245,
    "nombre": "Yasna Soledad Valenzuela Reyes",
    "rut": "17464277-K",
    "edad": 0,
    "sexo": "Femenino",
    "identidadGenero": "Mujer cisgénero",
    "fechaNacimiento": "1990-01-01",
    "direccion": "Control 3 octubre 15.00hrs.",
    "comuna": "",
    "lat": 0,
    "lon": 0,
    "telefonos": [
      "+56964658506"
    ],
    "email": "YSVR90@gmail.com",
    "tutor": "No aplica",
    "ocupacion": "",
    "dispositivoAPS": "Consulta Privada",
    "alergias": "Sin alergias conocidas",
    "ram": "",
    "objetivosTerapeuticos": "",
    "diagnostico": {
      "saludMental": "",
      "morbilidadMedica": "",
      "factoresPsicosociales": ""
    },
    "farmacos": [
      {
        "nombre": "fluoxetina",
        "dosis": "20mg vo: 1 en la mañana (lleva una semana con la mitad). Lleva 1 semana con 20mg de fluoxetina."
      },
      {
        "nombre": "altruline",
        "dosis": "50mg vo: 1 cada mañana."
      }
    ],
    "pensionDiscapacidad": false,
    "credencialDiscapacidad": false,
    "consumoActivoDrogas": false
  }
];
console.log('Pacientes a importar:', newPatients.length);

// 3. Combinar (agregar a los existentes)
const allPatients = [...currentPatients, ...newPatients];
console.log('Total de pacientes:', allPatients.length);

// 4. Guardar en localStorage
localStorage.setItem('rlp_patients', JSON.stringify(allPatients));

console.log('✅ ¡Importación completada!');
console.log('👉 Recarga la página (F5) para ver los cambios');

// Recargar automáticamente
setTimeout(() => {
    window.location.reload();
}, 2000);
