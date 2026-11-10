export type AreaId = 'global' | 'lectura' | 'matematicas' | 'sociales' | 'naturales' | 'ingles';

export type YearId =
  | '2016-2'
  | '2017-2'
  | '2018-2'
  | '2020-4'
  | '2021-4'
  | '2022-4'
  | '2023-4'
  | '2024-3'
  | '2025-3'
  | '2026-3';

export interface YearlyScore {
  year: YearId;
  shortYear: string;
  date: string;
  ee: number; // Colegio Gustavo Restrepo
  desv: number; // Desviación estándar EE
  colombia: number;
  bogotaEtc: number;
  oficialesUrbanos: number;
  privadosEtc: number;
  gc3?: number; // Grupo de comparación 3 (disponible en corte por aplicación 2026-3)
  levels: {
    l1: number; // Nivel 1 o A-
    l2: number; // Nivel 2 o A1
    l3: number; // Nivel 3 o A2
    l4: number; // Nivel 4 o B1
    l5?: number; // B+ en Inglés
  };
}

export interface LearningErrorItem {
  id: string;
  competencia: string;
  componente?: string;
  aprendizaje: string;
  explicacionSencilla: string;
  errorHistory: {
    '2018-2'?: { ee?: number; colombia: number; etc: number };
    '2022-4'?: { ee: number; colombia: number; etc: number };
    '2025-3'?: { ee: number; colombia: number; etc: number };
    '2026-3': { ee: number; colombia: number; etc: number };
  };
  prioridad: 'critica' | 'moderada' | 'fortaleza';
  queMejorar: string;
  comoMejorarAula: string[];
  meta2027: string;
}

export interface AreaConfig {
  id: AreaId;
  name: string;
  shortName: string;
  scaleMax: number;
  mediaReferencia: number;
  colorHex: string;
  accentBg: string;
  badgeTone: 'green' | 'gold' | 'red';
  description: string;
  friendlySummary: string;
  levelLabels: {
    key: 'l1' | 'l2' | 'l3' | 'l4' | 'l5';
    label: string;
    shortTitle: string;
    color: string;
    meaning: string;
  }[];
  history: YearlyScore[];
  learnings: LearningErrorItem[];
  generalDiagnosis: {
    fortalezas: string[];
    alertasCriticas: string[];
    planDeAccion: {
      titulo: string;
      pasos: string[];
      impactoEsperado: string;
    }[];
  };
}

export interface StudentParticipation {
  year: YearId;
  shortYear: string;
  matriculados: number | null;
  inscritos: number;
  presentes: number;
  publicados: number;
}

export const SCHOOL_INFO = {
  nombre: 'COLEGIO GUSTAVO RESTREPO (IED)',
  lema: 'Institución Educativa Distrital',
  dane: '111001027332',
  direccion: 'CL 28 SUR 14 51',
  municipio: 'BOGOTÁ D.C.',
  etc: 'BOGOTÁ',
  sector: 'Oficial',
  zona: 'Urbano',
  grupoComparacion: 'GC 3 (Nivel Socioeconómico Homólogo)',
  jornada: 'Sede 1 / Jornada Única',
  logoUrl: '/assets/aistudio/Logo_GR_bcf5afdb.png',
};

export const ALL_YEARS: YearId[] = [
  '2016-2',
  '2017-2',
  '2018-2',
  '2020-4',
  '2021-4',
  '2022-4',
  '2023-4',
  '2024-3',
  '2025-3',
  '2026-3',
];

export const PARTICIPATION_HISTORY: StudentParticipation[] = [
  { year: '2016-2', shortYear: '2016', matriculados: null, inscritos: 111, presentes: 108, publicados: 108 },
  { year: '2017-2', shortYear: '2017', matriculados: 106, inscritos: 104, presentes: 102, publicados: 100 },
  { year: '2018-2', shortYear: '2018', matriculados: 78, inscritos: 78, presentes: 77, publicados: 75 },
  { year: '2020-4', shortYear: '2020', matriculados: 87, inscritos: 87, presentes: 84, publicados: 84 },
  { year: '2021-4', shortYear: '2021', matriculados: 94, inscritos: 90, presentes: 83, publicados: 83 },
  { year: '2022-4', shortYear: '2022', matriculados: 87, inscritos: 83, presentes: 83, publicados: 83 },
  { year: '2023-4', shortYear: '2023', matriculados: 91, inscritos: 90, presentes: 88, publicados: 88 },
  { year: '2024-3', shortYear: '2024', matriculados: 98, inscritos: 96, presentes: 94, publicados: 94 },
  { year: '2025-3', shortYear: '2025', matriculados: 97, inscritos: 96, presentes: 94, publicados: 94 },
  { year: '2026-3', shortYear: '2026', matriculados: 81, inscritos: 79, presentes: 77, publicados: 77 },
];

export const FRIENDLY_GLOSSARY = [
  {
    term: 'Puntaje Global (0 a 500)',
    simple: 'Es la nota general del colegio combinando todas las áreas. El punto medio nacional es 250. En 2026-3 el colegio obtuvo 259 puntos.',
    tip: 'Subir 1 punto en Matemáticas o Lectura tiene alto peso en este indicador.',
  },
  {
    term: 'Promedio del Área (0 a 100)',
    simple: 'Es la calificación promedio de nuestros estudiantes en una materia específica. La referencia nacional histórica se fijó en 50 puntos.',
    tip: 'Por encima de 53 puntos el colegio destaca frente al promedio nacional.',
  },
  {
    term: 'Desviación Estándar (Homogeneidad)',
    simple: 'Mide qué tan parejos están los estudiantes entre sí. Si el número es bajo (ej. 7 a 9), todos tienen un nivel parecido y es más fácil enseñarles con una misma estrategia.',
    tip: 'En 2026 la desviación bajó a 36 global: el grupo es más parejo que en 2023 (44).',
  },
  {
    term: 'Niveles de Desempeño (1 al 4)',
    simple: 'Nivel 1 (Rojo) es alerta crítica; Nivel 2 (Naranja) es básico; Nivel 3 (Amarillo) es satisfactorio; Nivel 4 (Verde) es avanzado. En Inglés van de A- hasta B+.',
    tip: 'La meta principal de todo colegio es sacar estudiantes del Nivel 1 y 2 y llevarlos al 3 y 4.',
  },
  {
    term: '% de Respuestas Incorrectas (Afirmaciones)',
    simple: 'Muestra en qué temas exactos se equivocaron más los estudiantes. ¡OJO! Aquí un número MÁS BAJO es MEJOR (menos errores).',
    tip: 'Si un aprendizaje tiene más de 50% de error, más de la mitad del salón falló esas preguntas.',
  },
  {
    term: 'ETC y Grupo de Comparación (GC 3)',
    simple: 'ETC es toda Bogotá. GC 3 son los colegios de Bogotá con condiciones socioeconómicas iguales a las del Gustavo Restrepo.',
    tip: 'Compararnos con Oficiales Urbanos y GC 3 es la medida más justa de nuestro esfuerzo.',
  },
];

export const AREAS_DATA: Record<AreaId, AreaConfig> = {
  global: {
    id: 'global',
    name: 'Puntaje Global Institucional',
    shortName: 'Global',
    scaleMax: 500,
    mediaReferencia: 250,
    colorHex: '#145A32',
    accentBg: 'bg-emerald-900',
    badgeTone: 'green',
    description: 'Desempeño integral ponderado del Examen de Estado Saber 11° (Escala 0 a 500 puntos).',
    friendlySummary:
      'En 2026-3 el Colegio Gustavo Restrepo alcanzó 259 puntos, recuperándose +4 puntos frente al bache de 2024 (255) y superando el promedio nacional de Colombia (258). El reto clave para volver al récord histórico de 269 puntos (2017) o 265 puntos (2022) está en detener la caída de Matemáticas (49 pts).',
    levelLabels: [
      { key: 'l1', label: 'Nivel 1 (Bajo)', shortTitle: 'Nivel 1', color: '#DC2626', meaning: 'Estudiantes en riesgo crítico que no alcanzan las competencias mínimas.' },
      { key: 'l2', label: 'Nivel 2 (Mínimo)', shortTitle: 'Nivel 2', color: '#EA580C', meaning: 'Estudiantes que solo resuelven preguntas sencillas o literales.' },
      { key: 'l3', label: 'Nivel 3 (Satisfactorio)', shortTitle: 'Nivel 3', color: '#EAB308', meaning: 'Estudiantes con buen dominio conceptual e inferencial.' },
      { key: 'l4', label: 'Nivel 4 (Avanzado)', shortTitle: 'Nivel 4', color: '#16A34A', meaning: 'Estudiantes sobresalientes con pensamiento crítico y abstracto.' },
    ],
    history: [
      {
        year: '2016-2',
        shortYear: '2016',
        date: '31/07/2016',
        ee: 266,
        desv: 37,
        colombia: 264,
        bogotaEtc: 281,
        oficialesUrbanos: 269,
        privadosEtc: 297,
        levels: { l1: 6, l2: 49, l3: 43, l4: 2 },
      },
      {
        year: '2017-2',
        shortYear: '2017',
        date: '27/08/2017',
        ee: 269,
        desv: 34,
        colombia: 262,
        bogotaEtc: 279,
        oficialesUrbanos: 267,
        privadosEtc: 295,
        levels: { l1: 4, l2: 43, l3: 50, l4: 3 },
      },
      {
        year: '2018-2',
        shortYear: '2018',
        date: '12/08/2018',
        ee: 264,
        desv: 36,
        colombia: 258,
        bogotaEtc: 276,
        oficialesUrbanos: 262,
        privadosEtc: 296,
        levels: { l1: 7, l2: 43, l3: 48, l4: 2 },
      },
      {
        year: '2020-4',
        shortYear: '2020',
        date: '07/11/2020',
        ee: 264,
        desv: 36,
        colombia: 252,
        bogotaEtc: 270,
        oficialesUrbanos: 257,
        privadosEtc: 290,
        levels: { l1: 6, l2: 40, l3: 49, l4: 5 },
      },
      {
        year: '2021-4',
        shortYear: '2021',
        date: '04/09/2021',
        ee: 260,
        desv: 43,
        colombia: 250,
        bogotaEtc: 270,
        oficialesUrbanos: 255,
        privadosEtc: 293,
        levels: { l1: 10, l2: 44, l3: 41, l4: 5 },
      },
      {
        year: '2022-4',
        shortYear: '2022',
        date: '04/09/2022',
        ee: 265,
        desv: 38,
        colombia: 254,
        bogotaEtc: 274,
        oficialesUrbanos: 259,
        privadosEtc: 295,
        levels: { l1: 5, l2: 44, l3: 46, l4: 5 },
      },
      {
        year: '2023-4',
        shortYear: '2023',
        date: '13/08/2023',
        ee: 262,
        desv: 44,
        colombia: 257,
        bogotaEtc: 274,
        oficialesUrbanos: 260,
        privadosEtc: 295,
        levels: { l1: 12, l2: 40, l3: 42, l4: 6 },
      },
      {
        year: '2024-3',
        shortYear: '2024',
        date: '18/08/2024',
        ee: 255,
        desv: 43,
        colombia: 260,
        bogotaEtc: 277,
        oficialesUrbanos: 264,
        privadosEtc: 299,
        levels: { l1: 13, l2: 43, l3: 41, l4: 3 },
      },
      {
        year: '2025-3',
        shortYear: '2025',
        date: '10/08/2025',
        ee: 256,
        desv: 36,
        colombia: 261,
        bogotaEtc: 278,
        oficialesUrbanos: 263,
        privadosEtc: 301,
        levels: { l1: 9, l2: 49, l3: 41, l4: 1 },
      },
      {
        year: '2026-3',
        shortYear: '2026',
        date: '26/07/2026',
        ee: 259,
        desv: 36,
        colombia: 258,
        bogotaEtc: 273,
        oficialesUrbanos: 260,
        privadosEtc: 293,
        gc3: 267,
        levels: { l1: 8, l2: 45, l3: 46, l4: 1 },
      },
    ],
    learnings: [],
    generalDiagnosis: {
      fortalezas: [
        'Recuperación sostenida en los últimos dos años: de 255 (2024) a 259 (2026), superando nuevamente el promedio nacional (258).',
        'Repunte destacado en Sociales y Ciudadanas (+3 puntos en 2026 llegando a 52) e Inglés (+2 puntos llegando a 54).',
        'Lectura Crítica logró ubicar al 72% de los estudiantes en Nivel 3 (Satisfactorio) en 2026, el segundo registro más alto de la década.',
        'Disminución de la desviación estándar global de 44 a 36 puntos: cursos más homogéneos que facilitan planes de aula unificados.',
      ],
      alertasCriticas: [
        'Matemáticas cayó a su punto más bajo en 10 años (49 puntos en 2026 vs 55 en 2020), arrastrando hacia abajo el Puntaje Global.',
        'Escasez de estudiantes en Nivel 4 (Avanzado): en 2026 hubo 0% en Nivel 4 en Matemáticas, Sociales y Ciencias Naturales.',
        'En Ciencias Naturales, el Nivel 1 (Insuficiente) subió a 16% en 2026 (hace una década era apenas del 2%-3%).',
      ],
      planDeAccion: [
        {
          titulo: '1. Plan Choque en Resolución de Problemas Matemáticos',
          pasos: [
            'Integrar problemas de información cuantitativa y tablas reales en todas las áreas (no solo en clase de Matemáticas).',
            'Entrenar validación de procedimientos paso a paso (68% de error actual en plantear estrategias).',
          ],
          impactoEsperado: '+4 a +6 puntos en Matemáticas representan +10 puntos en el Puntaje Global.',
        },
        {
          titulo: '2. Semillero de Nivel Avanzado (Del Nivel 3 al Nivel 4)',
          pasos: [
            'Aprovechar que el 72% en Lectura y 46% en Matemáticas ya están en Nivel 3 para retarlos con preguntas de lectura crítica intertextual y modelación.',
            'Realizar talleres quincenales de preguntas abiertas y justificación de argumentos.',
          ],
          impactoEsperado: 'Recuperar al menos un 10%-12% de estudiantes en Nivel 4 como en 2021-2023.',
        },
        {
          titulo: '3. Nivelación Temprana del Nivel 1 en Ciencias Naturales',
          pasos: [
            'Reforzar Procesos Físicos y Químicos mediante prácticas experimentales guiadas donde el estudiante explique el "por qué" de un fenómeno.',
            'Usar gráficas de laboratorio para reducir el 64%-65% de error en análisis de fenómenos físicos.',
          ],
          impactoEsperado: 'Bajar el Nivel 1 de Ciencias Naturales del 16% a menos del 8%.',
        },
      ],
    },
  },

  lectura: {
    id: 'lectura',
    name: 'Lectura Crítica',
    shortName: 'Lectura',
    scaleMax: 100,
    mediaReferencia: 50,
    colorHex: '#C81E2B',
    accentBg: 'bg-red-700',
    badgeTone: 'red',
    description: 'Evalúa las capacidades para entender, interpretar y evaluar textos continuos y discontinuos.',
    friendlySummary:
      'Es el área más sólida y estable del colegio (54 puntos en 2026, igualando a los colegios oficiales de Bogotá y superando a Colombia con 53). ¡El 72% de los estudiantes alcanzó el Nivel 3! El reto es que el Nivel 4 (Avanzado) bajó de 17% (2021) a 3% (2026) porque los jóvenes comprenden frases sueltas pero les cuesta evaluar la intención global del autor.',
    levelLabels: [
      { key: 'l1', label: 'Nivel 1 (0-35 pts)', shortTitle: 'Nivel 1', color: '#DC2626', meaning: 'Solo identifica elementos literales muy simples en textos cortos.' },
      { key: 'l2', label: 'Nivel 2 (36-50 pts)', shortTitle: 'Nivel 2', color: '#EA580C', meaning: 'Comprende textos básicos de forma literal pero sin inferencias complejas.' },
      { key: 'l3', label: 'Nivel 3 (51-65 pts)', shortTitle: 'Nivel 3', color: '#EAB308', meaning: 'Infiere información, relaciona partes del texto y reconoce intenciones.' },
      { key: 'l4', label: 'Nivel 4 (66-100 pts)', shortTitle: 'Nivel 4', color: '#16A34A', meaning: 'Evalúa críticamente argumentos, ironías, posturas e intertextualidad.' },
    ],
    history: [
      { year: '2016-2', shortYear: '2016', date: '31/07/2016', ee: 53, desv: 9, colombia: 54, bogotaEtc: 56, oficialesUrbanos: 54, privadosEtc: 59, levels: { l1: 3, l2: 40, l3: 50, l4: 7 } },
      { year: '2017-2', shortYear: '2017', date: '27/08/2017', ee: 56, desv: 8, colombia: 54, bogotaEtc: 57, oficialesUrbanos: 55, privadosEtc: 60, levels: { l1: 1, l2: 19, l3: 70, l4: 10 } },
      { year: '2018-2', shortYear: '2018', date: '12/08/2018', ee: 55, desv: 9, colombia: 54, bogotaEtc: 57, oficialesUrbanos: 55, privadosEtc: 60, levels: { l1: 1, l2: 35, l3: 56, l4: 8 } },
      { year: '2020-4', shortYear: '2020', date: '07/11/2020', ee: 56, desv: 9, colombia: 53, bogotaEtc: 56, oficialesUrbanos: 54, privadosEtc: 59, levels: { l1: 1, l2: 23, l3: 65, l4: 11 } },
      { year: '2021-4', shortYear: '2021', date: '04/09/2021', ee: 56, desv: 9, colombia: 53, bogotaEtc: 57, oficialesUrbanos: 54, privadosEtc: 61, levels: { l1: 0, l2: 32, l3: 51, l4: 17 } },
      { year: '2022-4', shortYear: '2022', date: '04/09/2022', ee: 56, desv: 8, colombia: 54, bogotaEtc: 57, oficialesUrbanos: 55, privadosEtc: 61, levels: { l1: 1, l2: 25, l3: 61, l4: 13 } },
      { year: '2023-4', shortYear: '2023', date: '13/08/2023', ee: 55, desv: 9, colombia: 54, bogotaEtc: 57, oficialesUrbanos: 55, privadosEtc: 61, levels: { l1: 1, l2: 30, l3: 57, l4: 12 } },
      { year: '2024-3', shortYear: '2024', date: '18/08/2024', ee: 53, desv: 9, colombia: 54, bogotaEtc: 58, oficialesUrbanos: 55, privadosEtc: 61, levels: { l1: 3, l2: 33, l3: 59, l4: 5 } },
      { year: '2025-3', shortYear: '2025', date: '10/08/2025', ee: 53, desv: 7, colombia: 55, bogotaEtc: 58, oficialesUrbanos: 55, privadosEtc: 62, levels: { l1: 0, l2: 41, l3: 57, l4: 2 } },
      { year: '2026-3', shortYear: '2026', date: '26/07/2026', ee: 54, desv: 7, colombia: 53, bogotaEtc: 56, oficialesUrbanos: 54, privadosEtc: 60, gc3: 55, levels: { l1: 1, l2: 24, l3: 72, l4: 3 } },
    ],
    learnings: [
      {
        id: 'lec-3',
        competencia: 'Lectura Crítica e Intertextual',
        aprendizaje: 'Reflexiona a partir de un texto y evalúa su contenido.',
        explicacionSencilla: 'Capacidad para evaluar la validez de los argumentos del autor, detectar prejuicios, comparar dos textos opuestos y asumir una postura crítica.',
        errorHistory: {
          '2018-2': { colombia: 51, etc: 45 },
          '2022-4': { ee: 40, colombia: 47, etc: 39 },
          '2025-3': { ee: 54, colombia: 51, etc: 46 },
          '2026-3': { ee: 47, colombia: 49, etc: 44 },
        },
        prioridad: 'critica',
        queMejorar: 'Los estudiantes fallan casi la mitad (47%) de las preguntas donde deben juzgar si un argumento es sólido o comparar las posturas de dos autores distintos.',
        comoMejorarAula: [
          'Enfrentar dos columnas de opinión cortas con posturas contrarias sobre un mismo tema y pedir identificar en qué punto exacto discrepan.',
          'Trabajar preguntas sobre "¿Qué intención tiene el autor al usar esta expresión?" e identificar falacias o generalizaciones.',
          'Incluir caricaturas políticas, infografías y ensayos filosóficos breves en todas las asignaturas.',
        ],
        meta2027: 'Bajar el porcentaje de error del 47% al 38% (nivel histórico de 2022).',
      },
      {
        id: 'lec-2',
        competencia: 'Comprensión Inferencial y Global',
        aprendizaje: 'Comprende cómo se articulan las partes de un texto para darle un sentido global.',
        explicacionSencilla: 'Entender cómo se conectan los párrafos, cuál es el tema central y qué función cumplen los conectores lógicos ("sin embargo", "por consiguiente", etc.).',
        errorHistory: {
          '2018-2': { colombia: 44, etc: 38 },
          '2022-4': { ee: 42, colombia: 47, etc: 42 },
          '2025-3': { ee: 49, colombia: 44, etc: 39 },
          '2026-3': { ee: 47, colombia: 47, etc: 42 },
        },
        prioridad: 'critica',
        queMejorar: 'El 47% de respuestas son incorrectas al relacionar párrafos o identificar la estructura argumentativa completa del texto (5 puntos más de error que Bogotá ETC).',
        comoMejorarAula: [
          'Hacer ejercicios de "anatomía del texto": subrayar con colores cuál párrafo es la introducción, cuál es la tesis, cuáles son los ejemplos y cuál la conclusión.',
          'Omitir los conectores lógicos de un texto impreso para que los estudiantes elijan el conector preciso según la relación causa-efecto o contraste.',
          'Pedir resumir textos largos en un mapa mental de máximo 4 bloques antes de responder preguntas.',
        ],
        meta2027: 'Reducir el error del 47% al 40% para igualar a Bogotá ETC.',
      },
      {
        id: 'lec-1',
        competencia: 'Comprensión Literal y Local',
        aprendizaje: 'Identifica y entiende los contenidos locales que conforman un texto.',
        explicacionSencilla: 'Entender el significado de palabras específicas según el contexto y localizar datos explícitos dentro de una oración o párrafo.',
        errorHistory: {
          '2018-2': { colombia: 47, etc: 43 },
          '2022-4': { ee: 33, colombia: 36, etc: 30 },
          '2025-3': { ee: 33, colombia: 33, etc: 28 },
          '2026-3': { ee: 28, colombia: 29, etc: 25 },
        },
        prioridad: 'fortaleza',
        queMejorar: '¡Es la mayor fortaleza del colegio! Bajó de 33% a solo 28% de error en 2026. Solo falta pulir vocabulario técnico y sinónimos en contexto.',
        comoMejorarAula: [
          'Mantener el glosario contextual en clase: deducir el significado de palabras desconocidas por las pistas de la frase sin usar diccionario inmediatamente.',
          'Aprovechar esta base literal sólida para impulsar a ese 72% de estudiantes del Nivel 3 hacia el Nivel 4.',
        ],
        meta2027: 'Mantener el error por debajo del 25% y convertir esta fortaleza en trampolín al Nivel 4.',
      },
    ],
    generalDiagnosis: {
      fortalezas: [
        'Prácticamente erradicado el Nivel 1 (solo 1% en 2026 y 0% en 2025).',
        '72% de los estudiantes ubicados en Nivel 3 (Satisfactorio) en 2026, superando por 20 puntos porcentuales el promedio de Colombia (52%).',
        'Excelente comprensión literal: solo 28% de error en identificar contenidos locales.',
      ],
      alertasCriticas: [
        'Caída en el Nivel 4 (Avanzado): pasó de 17% en 2021 y 13% en 2022 a solo 3% en 2026.',
        'Estancamiento en lectura inferencial global (47% de error) y lectura crítica/reflexiva (47% de error).',
      ],
      planDeAccion: [
        {
          titulo: 'Salto del Nivel 3 al Nivel 4 (Lectura Intertextual)',
          pasos: [
            'Dado que el 72% ya domina la lectura básica e inferencial simple, enfocar el 60% del tiempo de clase en evaluación crítica de textos discontinuos (infografías, tablas, cómics) y textos filosóficos.',
            'Aplicar rutinas de pensamiento: "¿Qué dice el texto? ¿Qué NO dice pero sugiere? ¿Qué intención oculta tiene el autor?".',
          ],
          impactoEsperado: 'Subir el Nivel 4 del 3% al 15% y elevar el promedio del área de 54 a 58 puntos.',
        },
      ],
    },
  },

  matematicas: {
    id: 'matematicas',
    name: 'Matemáticas',
    shortName: 'Matemáticas',
    scaleMax: 100,
    mediaReferencia: 50,
    colorHex: '#D97706',
    accentBg: 'bg-amber-600',
    badgeTone: 'gold',
    description: 'Evalúa interpretación y representación de datos, formulación y ejecución de problemas, y argumentación matemática.',
    friendlySummary:
      '¡ÁREA PRIORITARIA DE INTERVENCIÓN! Tras mantenerse entre 52 y 55 puntos desde 2016 hasta 2024, cayó a 51 en 2025 y a 49 puntos en 2026-3. Más de la mitad de los estudiantes (54%) se encuentran hoy en niveles bajos (1 y 2) y el error en resolver problemas subió al 68%. Mejorar Matemáticas es la llave maestra para subir el puntaje del colegio.',
    levelLabels: [
      { key: 'l1', label: 'Nivel 1 (0-35 pts)', shortTitle: 'Nivel 1', color: '#DC2626', meaning: 'Solo lee datos puntuales en tablas simples de una sola variable.' },
      { key: 'l2', label: 'Nivel 2 (36-50 pts)', shortTitle: 'Nivel 2', color: '#EA580C', meaning: 'Hace cálculos básicos directos y compara gráficas sencillas.' },
      { key: 'l3', label: 'Nivel 3 (51-70 pts)', shortTitle: 'Nivel 3', color: '#EAB308', meaning: 'Resuelve problemas de varios pasos con porcentajes, geometría y estadística.' },
      { key: 'l4', label: 'Nivel 4 (71-100 pts)', shortTitle: 'Nivel 4', color: '#16A34A', meaning: 'Modela situaciones abstractas, valida teoremas y resuelve problemas complejos.' },
    ],
    history: [
      { year: '2016-2', shortYear: '2016', date: '31/07/2016', ee: 52, desv: 10, colombia: 52, bogotaEtc: 56, oficialesUrbanos: 53, privadosEtc: 59, levels: { l1: 3, l2: 45, l3: 50, l4: 2 } },
      { year: '2017-2', shortYear: '2017', date: '27/08/2017', ee: 53, desv: 9, colombia: 52, bogotaEtc: 55, oficialesUrbanos: 53, privadosEtc: 59, levels: { l1: 3, l2: 37, l3: 60, l4: 0 } },
      { year: '2018-2', shortYear: '2018', date: '12/08/2018', ee: 53, desv: 8, colombia: 52, bogotaEtc: 56, oficialesUrbanos: 53, privadosEtc: 60, levels: { l1: 0, l2: 32, l3: 68, l4: 0 } },
      { year: '2020-4', shortYear: '2020', date: '07/11/2020', ee: 55, desv: 8, colombia: 52, bogotaEtc: 56, oficialesUrbanos: 53, privadosEtc: 59, levels: { l1: 0, l2: 26, l3: 73, l4: 1 } },
      { year: '2021-4', shortYear: '2021', date: '04/09/2021', ee: 52, desv: 9, colombia: 51, bogotaEtc: 55, oficialesUrbanos: 51, privadosEtc: 59, levels: { l1: 0, l2: 42, l3: 56, l4: 1 } },
      { year: '2022-4', shortYear: '2022', date: '04/09/2022', ee: 53, desv: 9, colombia: 52, bogotaEtc: 55, oficialesUrbanos: 53, privadosEtc: 60, levels: { l1: 1, l2: 38, l3: 58, l4: 3 } },
      { year: '2023-4', shortYear: '2023', date: '13/08/2023', ee: 53, desv: 11, colombia: 52, bogotaEtc: 55, oficialesUrbanos: 53, privadosEtc: 60, levels: { l1: 7, l2: 31, l3: 57, l4: 5 } },
      { year: '2024-3', shortYear: '2024', date: '18/08/2024', ee: 53, desv: 11, colombia: 53, bogotaEtc: 57, oficialesUrbanos: 54, privadosEtc: 61, levels: { l1: 7, l2: 34, l3: 53, l4: 6 } },
      { year: '2025-3', shortYear: '2025', date: '10/08/2025', ee: 51, desv: 9, colombia: 53, bogotaEtc: 57, oficialesUrbanos: 54, privadosEtc: 61, levels: { l1: 3, l2: 42, l3: 53, l4: 1 } },
      { year: '2026-3', shortYear: '2026', date: '26/07/2026', ee: 49, desv: 9, colombia: 52, bogotaEtc: 54, oficialesUrbanos: 52, privadosEtc: 59, gc3: 53, levels: { l1: 7, l2: 47, l3: 46, l4: 0 } },
    ],
    learnings: [
      {
        id: 'mat-1',
        competencia: 'Formulación y Ejecución (Resolución de Problemas)',
        aprendizaje: 'Frente a un problema que involucre información cuantitativa, plantea e implementa estrategias que lleven a soluciones adecuadas.',
        explicacionSencilla: 'Capacidad para leer un problema de la vida real (finanzas, medidas, probabilidades), diseñar un plan de cálculo y llegar a la respuesta correcta.',
        errorHistory: {
          '2018-2': { colombia: 48, etc: 43 },
          '2022-4': { ee: 56, colombia: 52, etc: 46 },
          '2025-3': { ee: 52, colombia: 47, etc: 43 },
          '2026-3': { ee: 68, colombia: 65, etc: 62 },
        },
        prioridad: 'critica',
        queMejorar: '¡Alerta máxima! En 2026-3 los estudiantes fallaron el 68% de las preguntas de resolución de problemas (casi 7 de cada 10 preguntas erradas).',
        comoMejorarAula: [
          'Aplicar el método Polya en el tablero en cada clase: 1) ¿Qué datos me dan y qué me preguntan? 2) ¿Qué operación conecta esos datos? 3) Ejecutar sin calculadora 4) Verificar si el resultado tiene sentido lógico.',
          'Trabajar problemas de porcentajes encadenados, proporcionalidad, áreas sombreadas y probabilidad condicional con contextos cotidianos.',
          'Hacer micro-simulacros de 3 problemas cronometrados al inicio de cada bloque de clase.',
        ],
        meta2027: 'Reducir el error del 68% al 50% mediante entrenamiento sistemático en resolución de problemas.',
      },
      {
        id: 'mat-2',
        competencia: 'Interpretación y Representación (Gráficas y Tablas)',
        aprendizaje: 'Comprende y transforma la información cuantitativa y esquemática presentada en distintos formatos.',
        explicacionSencilla: 'Pasar información de un texto a una tabla, de una tabla a un gráfico de barras o pastel, o de una gráfica a una ecuación.',
        errorHistory: {
          '2018-2': { colombia: 38, etc: 34 },
          '2022-4': { ee: 42, colombia: 39, etc: 34 },
          '2025-3': { ee: 40, colombia: 36, etc: 32 },
          '2026-3': { ee: 63, colombia: 57, etc: 53 },
        },
        prioridad: 'critica',
        queMejorar: 'Históricamente era la fortaleza del área (40% de error en 2025), pero en 2026-3 se disparó el error al 63% (10 puntos peor que Bogotá ETC).',
        comoMejorarAula: [
          'Entrenar traducción de formatos: darle al estudiante una tabla de datos y pedirle dibujar el gráfico circular o lineal correspondiente, y viceversa.',
          'Identificar trampas frecuentes en lectura de ejes (escalas no lineales, porcentajes acumulados vs frecuencias absolutas).',
        ],
        meta2027: 'Recuperar el dominio histórico bajando el error del 63% nuevamente al 40%.',
      },
      {
        id: 'mat-3',
        competencia: 'Argumentación Matemática',
        aprendizaje: 'Valida procedimientos y estrategias matemáticas utilizadas para dar solución a problemas.',
        explicacionSencilla: 'Detectar dónde está el error en el procedimiento de otra persona y justificar por qué una afirmación matemática es verdadera o falsa.',
        errorHistory: {
          '2018-2': { colombia: 51, etc: 45 },
          '2022-4': { ee: 58, colombia: 59, etc: 54 },
          '2025-3': { ee: 60, colombia: 57, etc: 53 },
          '2026-3': { ee: 62, colombia: 56, etc: 53 },
        },
        prioridad: 'critica',
        queMejorar: 'Es una debilidad estructural de toda la década (58% a 62% de error). Al estudiante le cuesta explicar por qué un procedimiento es inválido.',
        comoMejorarAula: [
          'Implementar la dinámica "Encuentra el error del profesor": mostrar en el tablero un problema resuelto con un paso falso intencional para que los alumnos descubran en qué paso falló y por qué.',
          'Trabajar preguntas con formato "Juan afirma que... porque...". Evaluar si la razón realmente justifica la afirmación.',
        ],
        meta2027: 'Bajar el porcentaje de error del 62% a menos del 52%.',
      },
    ],
    generalDiagnosis: {
      fortalezas: [
        'Entre 2016 y 2024 el colegio demostró que puede sostener promedios de 53 a 55 puntos y tener hasta 73% de estudiantes en Nivel 3 (como en 2020-4).',
        'La desviación estándar es baja (9 puntos), lo que permite nivelar al grupo completo sin brechas extremas.',
      ],
      alertasCriticas: [
        'Caída de 4 puntos entre 2024 (53) y 2026 (49), quedando por debajo de la barrera de los 50 puntos por primera vez en la década.',
        'Las tres competencias evaluadas superaron el 62% de respuestas incorrectas en 2026-3.',
        'Cero por ciento (0%) de estudiantes en Nivel 4 en 2026 (en 2024 había 6%).',
      ],
      planDeAccion: [
        {
          titulo: 'Recuperación Inmediata de Lectura de Gráficas y Tablas',
          pasos: [
            'Es la competencia más rápida de recuperar (en 2025 tenía solo 40% de error). Dedicar 15 minutos semanales a transformar tablas en gráficas y leer tendencias estadísticas.',
          ],
          impactoEsperado: 'Recuperar +3 puntos en el promedio general del área en el corto plazo.',
        },
        {
          titulo: 'Taller de "Caza de Errores" y Formulación en Contexto',
          pasos: [
            'Reemplazar ejercicios mecánicos repetitivos por problemas contextualizados tipo ICFES donde el estudiante deba elegir qué procedimiento resuelve la situación sin necesidad de hacer cálculos extensos.',
          ],
          impactoEsperado: 'Pasar al menos al 20% de los estudiantes del Nivel 2 (hoy 47%) hacia el Nivel 3.',
        },
      ],
    },
  },

  sociales: {
    id: 'sociales',
    name: 'Sociales y Ciudadanas',
    shortName: 'Sociales',
    scaleMax: 100,
    mediaReferencia: 50,
    colorHex: '#145A32',
    accentBg: 'bg-emerald-800',
    badgeTone: 'green',
    description: 'Evalúa pensamiento social, interpretación y análisis de perspectivas, y pensamiento reflexivo y sistémico.',
    friendlySummary:
      '¡EL ÁREA DE MAYOR CRECIMIENTO RECIENTE! Subió de 48 puntos (2024) y 49 (2025) a 52 puntos en 2026-3, superando a Colombia (50) y a los colegios oficiales urbanos de Bogotá (50). Además, redujo drásticamente el Nivel 1 de 29% (en 2024) a solo 9% (en 2026). Para seguir subiendo, hay que reforzar Constitución/modelos conceptuales y geografía/historia (dimensiones espaciales y temporales).',
    levelLabels: [
      { key: 'l1', label: 'Nivel 1 (0-40 pts)', shortTitle: 'Nivel 1', color: '#DC2626', meaning: 'Reconoce solo derechos básicos evidentes en situaciones cotidianas simples.' },
      { key: 'l2', label: 'Nivel 2 (41-55 pts)', shortTitle: 'Nivel 2', color: '#EA580C', meaning: 'Identifica intenciones e intereses básicos de actores en un conflicto.' },
      { key: 'l3', label: 'Nivel 3 (56-70 pts)', shortTitle: 'Nivel 3', color: '#EAB308', meaning: 'Contextualiza fuentes históricas, analiza dimensiones políticas, económicas y ambientales.' },
      { key: 'l4', label: 'Nivel 4 (71-100 pts)', shortTitle: 'Nivel 4', color: '#16A34A', meaning: 'Evalúa críticamente reformas constitucionales, ideologías y efectos multidimensionales.' },
    ],
    history: [
      { year: '2016-2', shortYear: '2016', date: '31/07/2016', ee: 52, desv: 9, colombia: 52, bogotaEtc: 55, oficialesUrbanos: 53, privadosEtc: 59, levels: { l1: 10, l2: 58, l3: 29, l4: 3 } },
      { year: '2017-2', shortYear: '2017', date: '27/08/2017', ee: 53, desv: 9, colombia: 51, bogotaEtc: 55, oficialesUrbanos: 52, privadosEtc: 58, levels: { l1: 10, l2: 56, l3: 32, l4: 2 } },
      { year: '2018-2', shortYear: '2018', date: '12/08/2018', ee: 50, desv: 10, colombia: 49, bogotaEtc: 53, oficialesUrbanos: 50, privadosEtc: 58, levels: { l1: 19, l2: 51, l3: 29, l4: 1 } },
      { year: '2020-4', shortYear: '2020', date: '07/11/2020', ee: 51, desv: 10, colombia: 49, bogotaEtc: 53, oficialesUrbanos: 50, privadosEtc: 57, levels: { l1: 17, l2: 52, l3: 26, l4: 5 } },
      { year: '2021-4', shortYear: '2021', date: '04/09/2021', ee: 49, desv: 11, colombia: 48, bogotaEtc: 52, oficialesUrbanos: 49, privadosEtc: 56, levels: { l1: 21, l2: 47, l3: 31, l4: 1 } },
      { year: '2022-4', shortYear: '2022', date: '04/09/2022', ee: 51, desv: 10, colombia: 48, bogotaEtc: 53, oficialesUrbanos: 50, privadosEtc: 57, levels: { l1: 13, l2: 51, l3: 35, l4: 1 } },
      { year: '2023-4', shortYear: '2023', date: '13/08/2023', ee: 50, desv: 11, colombia: 49, bogotaEtc: 53, oficialesUrbanos: 50, privadosEtc: 57, levels: { l1: 22, l2: 49, l3: 25, l4: 4 } },
      { year: '2024-3', shortYear: '2024', date: '18/08/2024', ee: 48, desv: 11, colombia: 49, bogotaEtc: 53, oficialesUrbanos: 50, privadosEtc: 57, levels: { l1: 29, l2: 47, l3: 22, l4: 2 } },
      { year: '2025-3', shortYear: '2025', date: '10/08/2025', ee: 49, desv: 9, colombia: 49, bogotaEtc: 52, oficialesUrbanos: 49, privadosEtc: 57, levels: { l1: 17, l2: 59, l3: 24, l4: 0 } },
      { year: '2026-3', shortYear: '2026', date: '26/07/2026', ee: 52, desv: 7, colombia: 50, bogotaEtc: 53, oficialesUrbanos: 50, privadosEtc: 57, gc3: 52, levels: { l1: 9, l2: 60, l3: 31, l4: 0 } },
    ],
    learnings: [
      {
        id: 'soc-1',
        competencia: 'Pensamiento Social (Espacio y Tiempo Histórico)',
        aprendizaje: 'Comprende dimensiones espaciales y temporales de eventos, problemáticas y prácticas sociales.',
        explicacionSencilla: 'Ubicar procesos históricos en su época correcta (Guerra Fría, Frente Nacional, Constitución del 91) y relacionarlos con el territorio geográfico.',
        errorHistory: {
          '2018-2': { colombia: 53, etc: 48 },
          '2022-4': { ee: 51, colombia: 56, etc: 50 },
          '2025-3': { ee: 40, colombia: 42, etc: 35 },
          '2026-3': { ee: 54, colombia: 55, etc: 49 },
        },
        prioridad: 'critica',
        queMejorar: 'Fue el aprendizaje con más errores en 2026-3 (54% de fallo). A los estudiantes les cuesta situar cronológicamente los hechos del siglo XX y XXI.',
        comoMejorarAula: [
          'Construir líneas de tiempo comparadas (Historia de Colombia vs Historia Mundial) permanentes en el salón de clase.',
          'Analizar conflictos actuales conectando mapa geográfico (recursos, fronteras, relieve) con antecedentes históricos.',
        ],
        meta2027: 'Bajar el porcentaje de error del 54% al 42%.',
      },
      {
        id: 'soc-2',
        competencia: 'Pensamiento Social (Modelos Conceptuales y Constitución)',
        aprendizaje: 'Comprende modelos conceptuales, sus características y contextos de aplicación.',
        explicacionSencilla: 'Dominar conceptos clave como Estado Social de Derecho, división de poderes, mecanismos de participación (tutela, plebiscito, referendo), oferta/demanda o neoliberalismo.',
        errorHistory: {
          '2018-2': { colombia: 43, etc: 37 },
          '2022-4': { ee: 46, colombia: 45, etc: 41 },
          '2025-3': { ee: 36, colombia: 42, etc: 35 },
          '2026-3': { ee: 52, colombia: 49, etc: 43 },
        },
        prioridad: 'critica',
        queMejorar: 'El error subió de 36% (2025) a 52% (2026), quedando 9 puntos por encima del promedio de Bogotá (43%).',
        comoMejorarAula: [
          'Trabajar casos prácticos de mecanismos constitucionales: "¿Cuándo procede una Acción de Tutela vs una Acción Popular? ¿Qué hace la Procuraduría vs la Fiscalía?".',
          'Vincular cada modelo económico o político (proteccionismo, apertura económica, Estado de Bienestar) con ejemplos concretos en noticias de Colombia.',
        ],
        meta2027: 'Reducir el error del 52% al 40%.',
      },
      {
        id: 'soc-3',
        competencia: 'Interpretación y Análisis de Perspectivas (Fuentes)',
        aprendizaje: 'Contextualiza y evalúa usos de fuentes y argumentos.',
        explicacionSencilla: 'Evaluar si una fuente de información es confiable, quién la escribió, en qué año y con qué interés político o social.',
        errorHistory: {
          '2018-2': { colombia: 50, etc: 44 },
          '2022-4': { ee: 60, colombia: 58, etc: 53 },
          '2025-3': { ee: 46, colombia: 52, etc: 45 },
          '2026-3': { ee: 51, colombia: 53, etc: 47 },
        },
        prioridad: 'critica',
        queMejorar: '51% de respuestas incorrectas al evaluar la pertinencia o sesgo de una fuente primaria o secundaria.',
        comoMejorarAula: [
          'Aplicar la regla de las 4 preguntas ante cualquier discurso o documento: ¿Quién habla? ¿En qué época? ¿A quién le habla? ¿Qué busca defender?',
        ],
        meta2027: 'Bajar el error del 51% al 44%.',
      },
      {
        id: 'soc-4',
        competencia: 'Pensamiento Reflexivo y Sistémico',
        aprendizaje: 'Comprende que los problemas y sus soluciones involucran distintas dimensiones y reconoce relaciones entre estas.',
        explicacionSencilla: 'Entender cómo una decisión (ej. prohibir un cultivo o construir una represa) choca entre lo económico, lo ambiental, lo político y lo cultural.',
        errorHistory: {
          '2018-2': { colombia: 42, etc: 35 },
          '2022-4': { ee: 46, colombia: 52, etc: 45 },
          '2025-3': { ee: 63, colombia: 68, etc: 64 },
          '2026-3': { ee: 48, colombia: 43, etc: 37 },
        },
        prioridad: 'moderada',
        queMejorar: 'Mejoró 15 puntos respecto a 2025 (bajó de 63% a 48% de error), pero aún está 11 puntos por encima del promedio de Bogotá (37%).',
        comoMejorarAula: [
          'Usar matrices de impacto multidimensional: ante una medida pública, llenar en 4 columnas qué efecto positivo y negativo tiene en: Economía, Ambiente, Sociedad y Cultura.',
        ],
        meta2027: 'Acercarse al 37% de Bogotá ETC.',
      },
      {
        id: 'soc-5',
        competencia: 'Interpretación de Perspectivas de Actores',
        aprendizaje: 'Comprende perspectivas de distintos actores y grupos sociales.',
        explicacionSencilla: 'Ponerse en los zapatos de cada actor en un conflicto social (campesinos, empresarios, Estado, comunidades indígenas) para identificar qué defiende cada uno.',
        errorHistory: {
          '2018-2': { colombia: 44, etc: 36 },
          '2022-4': { ee: 35, colombia: 43, etc: 35 },
          '2025-3': { ee: 49, colombia: 50, etc: 43 },
          '2026-3': { ee: 38, colombia: 43, etc: 35 },
        },
        prioridad: 'fortaleza',
        queMejorar: 'Gran fortaleza del área (38% de error, superando por 5 puntos a Colombia).',
        comoMejorarAula: [
          'Continuar con debates de juego de roles donde cada fila del salón defiende los intereses de un actor social distinto.',
        ],
        meta2027: 'Sostener por debajo del 35% de error.',
      },
      {
        id: 'soc-6',
        competencia: 'Pensamiento Social',
        aprendizaje: 'Evalúa usos sociales de las ciencias sociales.',
        explicacionSencilla: 'Reconocer qué disciplina o método de investigación social sirve para estudiar un fenómeno humano.',
        errorHistory: {
          '2018-2': { colombia: 52, etc: 46 },
          '2022-4': { ee: 58, colombia: 58, etc: 53 },
          '2025-3': { ee: 59, colombia: 57, etc: 51 },
          '2026-3': { ee: 36, colombia: 45, etc: 39 },
        },
        prioridad: 'fortaleza',
        queMejorar: '¡Avance extraordinario! Bajó de 59% de error en 2025 a solo 36% en 2026, superando a Bogotá ETC (39%) y Colombia (45%).',
        comoMejorarAula: [
          'Consolidar la metodología de proyectos de indagación social que dio este gran resultado en 2026.',
        ],
        meta2027: 'Mantener el error por debajo del 35%.',
      },
    ],
    generalDiagnosis: {
      fortalezas: [
        'Subida de +4 puntos entre 2024 (48) y 2026 (52), alcanzando su mejor nivel desde 2017.',
        'Reducción ejemplar del Nivel 1: bajó del 29% en 2024 al 9% en 2026 (20 puntos porcentuales menos en riesgo crítico).',
        'Supera el promedio de Colombia (50) y de Oficiales Urbanos de Bogotá (50).',
      ],
      alertasCriticas: [
        'El 60% de los estudiantes se concentra en el Nivel 2; hace falta empujar a ese gran bloque hacia el Nivel 3 (hoy 31%) y Nivel 4 (hoy 0%).',
        'Debilidad en conceptos constitucionales/modelos conceptuales (52% error) y ubicación espacio-temporal histórica (54% error).',
      ],
      planDeAccion: [
        {
          titulo: 'Impulso del 60% de Estudiantes del Nivel 2 al Nivel 3',
          pasos: [
            'Reforzar el dominio técnico de conceptos constitucionales (mecanismos de participación, ramas del poder, organismos de control) e historia de Colombia del siglo XX.',
          ],
          impactoEsperado: 'Llevar el promedio del área a 55 puntos y lograr al menos 5% en Nivel 4.',
        },
      ],
    },
  },

  naturales: {
    id: 'naturales',
    name: 'Ciencias Naturales',
    shortName: 'Naturales',
    scaleMax: 100,
    mediaReferencia: 50,
    colorHex: '#0D9488',
    accentBg: 'bg-teal-700',
    badgeTone: 'green',
    description: 'Evalúa Biología (Procesos Vivos), Física (Procesos Físicos), Química (Procesos Químicos) y Ciencia, Tecnología y Sociedad (CTS).',
    friendlySummary:
      'En 2026-3 el colegio obtuvo 52 puntos, subiendo +2 puntos frente a 2024 (50) y superando a Colombia (51). El Nivel 3 creció de 29% a 37%. Sin embargo, hay dos alertas importantes: el 16% de los estudiantes está en Nivel 1 (Insuficiente) y las preguntas de Física (explicar e identificar fenómenos físicos) tuvieron un 64%-65% de respuestas incorrectas.',
    levelLabels: [
      { key: 'l1', label: 'Nivel 1 (0-40 pts)', shortTitle: 'Nivel 1', color: '#DC2626', meaning: 'Reconoce información explícita en tablas o diagramas científicos muy simples.' },
      { key: 'l2', label: 'Nivel 2 (41-55 pts)', shortTitle: 'Nivel 2', color: '#EA580C', meaning: 'Identifica patrones y variables en experimentos sencillos.' },
      { key: 'l3', label: 'Nivel 3 (56-70 pts)', shortTitle: 'Nivel 3', color: '#EAB308', meaning: 'Explica fenómenos físicos, químicos y biológicos relacionando variables y modelos.' },
      { key: 'l4', label: 'Nivel 4 (71-100 pts)', shortTitle: 'Nivel 4', color: '#16A34A', meaning: 'Predice comportamientos complejos, diseña experimentos y evalúa hipótesis.' },
    ],
    history: [
      { year: '2016-2', shortYear: '2016', date: '31/07/2016', ee: 55, desv: 7, colombia: 54, bogotaEtc: 57, oficialesUrbanos: 55, privadosEtc: 60, levels: { l1: 3, l2: 54, l3: 44, l4: 0 } },
      { year: '2017-2', shortYear: '2017', date: '27/08/2017', ee: 54, desv: 7, colombia: 52, bogotaEtc: 56, oficialesUrbanos: 54, privadosEtc: 59, levels: { l1: 2, l2: 61, l3: 37, l4: 0 } },
      { year: '2018-2', shortYear: '2018', date: '12/08/2018', ee: 53, desv: 7, colombia: 51, bogotaEtc: 54, oficialesUrbanos: 52, privadosEtc: 58, levels: { l1: 7, l2: 53, l3: 40, l4: 0 } },
      { year: '2020-4', shortYear: '2020', date: '07/11/2020', ee: 52, desv: 9, colombia: 49, bogotaEtc: 52, oficialesUrbanos: 50, privadosEtc: 56, levels: { l1: 7, l2: 59, l3: 33, l4: 1 } },
      { year: '2021-4', shortYear: '2021', date: '04/09/2021', ee: 51, desv: 9, colombia: 49, bogotaEtc: 52, oficialesUrbanos: 50, privadosEtc: 57, levels: { l1: 17, l2: 54, l3: 28, l4: 1 } },
      { year: '2022-4', shortYear: '2022', date: '04/09/2022', ee: 53, desv: 8, colombia: 50, bogotaEtc: 53, oficialesUrbanos: 51, privadosEtc: 57, levels: { l1: 6, l2: 60, l3: 32, l4: 1 } },
      { year: '2023-4', shortYear: '2023', date: '13/08/2023', ee: 51, desv: 10, colombia: 50, bogotaEtc: 53, oficialesUrbanos: 51, privadosEtc: 57, levels: { l1: 17, l2: 51, l3: 29, l4: 4 } },
      { year: '2024-3', shortYear: '2024', date: '18/08/2024', ee: 50, desv: 9, colombia: 51, bogotaEtc: 54, oficialesUrbanos: 52, privadosEtc: 58, levels: { l1: 14, l2: 56, l3: 29, l4: 1 } },
      { year: '2025-3', shortYear: '2025', date: '10/08/2025', ee: 51, desv: 8, colombia: 52, bogotaEtc: 54, oficialesUrbanos: 52, privadosEtc: 59, levels: { l1: 14, l2: 55, l3: 32, l4: 0 } },
      { year: '2026-3', shortYear: '2026', date: '26/07/2026', ee: 52, desv: 9, colombia: 51, bogotaEtc: 54, oficialesUrbanos: 52, privadosEtc: 57, gc3: 53, levels: { l1: 16, l2: 47, l3: 37, l4: 0 } },
    ],
    learnings: [
      {
        id: 'nat-1',
        competencia: 'Explicación de Fenómenos',
        componente: 'Procesos Físicos (Física)',
        aprendizaje: 'Explicar cómo ocurren algunos fenómenos de la naturaleza basado en observaciones, en patrones y en conceptos propios del conocimiento científico - Procesos físicos.',
        explicacionSencilla: 'Explicar por qué ocurre un fenómeno físico (fuerzas, energía mecánica, ondas, circuitos, termodinámica) aplicando leyes físicas y no solo intuición.',
        errorHistory: {
          '2018-2': { colombia: 56, etc: 50 },
          '2022-4': { ee: 57, colombia: 59, etc: 55 },
          '2025-3': { ee: 40, colombia: 44, etc: 41 },
          '2026-3': { ee: 65, colombia: 59, etc: 55 },
        },
        prioridad: 'critica',
        queMejorar: 'Es el punto más crítico de Ciencias Naturales en 2026-3: 65% de respuestas incorrectas (10 puntos más alto que Bogotá ETC).',
        comoMejorarAula: [
          'En Física, antes de usar fórmulas matemáticas, pedir a los estudiantes explicar con palabras qué pasa con la energía o la fuerza si una variable se duplica.',
          'Trabajar diagramas de cuerpo libre, conservación de la energía y circuitos eléctricos mediante simuladores visuales e interrogatorios conceptuales.',
        ],
        meta2027: 'Reducir el error del 65% a menos del 50%.',
      },
      {
        id: 'nat-2',
        competencia: 'Uso Comprensivo del Conocimiento Científico',
        componente: 'Procesos Físicos (Física)',
        aprendizaje: 'Identificar las características de algunos fenómenos de la naturaleza basado en el análisis de información y conceptos propios del conocimiento científico - Procesos físicos.',
        explicacionSencilla: 'Identificar variables físicas (velocidad, aceleración, presión, temperatura, frecuencia) a partir de gráficas o esquemas experimentales.',
        errorHistory: {
          '2018-2': { colombia: 50, etc: 46 },
          '2022-4': { ee: 55, colombia: 65, etc: 62 },
          '2025-3': { ee: 53, colombia: 49, etc: 44 },
          '2026-3': { ee: 64, colombia: 65, etc: 62 },
        },
        prioridad: 'critica',
        queMejorar: '64% de respuestas incorrectas en 2026-3 al analizar datos y características de fenómenos físicos.',
        comoMejorarAula: [
          'Articular con el área de Matemáticas la lectura de gráficas cinemáticas (posición vs tiempo, velocidad vs tiempo) y curvas de calentamiento/cambio de fase.',
        ],
        meta2027: 'Bajar el porcentaje de error del 64% al 52%.',
      },
      {
        id: 'nat-3',
        competencia: 'Explicación de Fenómenos',
        componente: 'Procesos Vivos (Biología)',
        aprendizaje: 'Explicar cómo ocurren algunos fenómenos de la naturaleza basado en observaciones, en patrones y en conceptos propios del conocimiento científico - Procesos vivos.',
        explicacionSencilla: 'Explicar relaciones causa-efecto en ecosistemas, genética, división celular, homeostasis y evolución.',
        errorHistory: {
          '2018-2': { colombia: 36, etc: 30 },
          '2022-4': { ee: 49, colombia: 56, etc: 50 },
          '2025-3': { ee: 38, colombia: 40, etc: 34 },
          '2026-3': { ee: 63, colombia: 62, etc: 60 },
        },
        prioridad: 'critica',
        queMejorar: 'Subió de 38% de error en 2025 a 63% en 2026-3.',
        comoMejorarAula: [
          'Trabajar cadenas tróficas, flujo de energía, síntesis de proteínas y cruces mendelianos planteando escenarios de perturbación ("¿Qué ocurre con la población X si desaparece el depredador Y?").',
        ],
        meta2027: 'Retornar a niveles inferiores al 48% de error.',
      },
      {
        id: 'nat-4',
        competencia: 'Indagación Científica',
        componente: 'Procesos Químicos (Química)',
        aprendizaje: 'Comprender que a partir de la investigación científica se construyen explicaciones sobre el mundo natural - Procesos químicos.',
        explicacionSencilla: 'Entender el diseño de un experimento químico (cuál es la hipótesis, cuál es el grupo control, qué instrumento de medición usar).',
        errorHistory: {
          '2018-2': { colombia: 34, etc: 26 },
          '2022-4': { ee: 42, colombia: 50, etc: 42 },
          '2025-3': { ee: 58, colombia: 55, etc: 50 },
          '2026-3': { ee: 62, colombia: 53, etc: 48 },
        },
        prioridad: 'critica',
        queMejorar: '62% de respuestas incorrectas en 2026-3 (14 puntos más de error que Bogotá ETC con 48%).',
        comoMejorarAula: [
          'En cada práctica de laboratorio o lectura científica de Química, pedir identificar explícitamente: Variable Independiente (lo que cambio), Variable Dependiente (lo que mido) y Variables Constantes.',
        ],
        meta2027: 'Bajar el error del 62% al 48% (media de Bogotá).',
      },
      {
        id: 'nat-5',
        competencia: 'Uso Comprensivo del Conocimiento',
        componente: 'Procesos Químicos (Química)',
        aprendizaje: 'Asociar fenómenos naturales con conceptos propios del conocimiento científico - Procesos químicos.',
        explicacionSencilla: 'Relacionar reacciones químicas, estequiometría, soluciones, pH, enlaces y tabla periódica con situaciones reales.',
        errorHistory: {
          '2018-2': { colombia: 45, etc: 38 },
          '2022-4': { ee: 50, colombia: 47, etc: 42 },
          '2025-3': { ee: 63, colombia: 57, etc: 53 },
          '2026-3': { ee: 55, colombia: 54, etc: 50 },
        },
        prioridad: 'moderada',
        queMejorar: 'Mejoró 8 puntos frente a 2025 (bajó de 63% a 55% de error), pero sigue por encima del 50%.',
        comoMejorarAula: [
          'Reforzar concentración de soluciones, separación de mezclas y balanceo estequiométrico mediante esquemas particulados (dibujar moléculas antes y después de la reacción).',
        ],
        meta2027: 'Reducir el error por debajo del 48%.',
      },
      {
        id: 'nat-6',
        competencia: 'Indagación Científica',
        componente: 'Procesos Físicos y Vivos',
        aprendizaje: 'Utilizar algunas habilidades de pensamiento y de procedimiento para evaluar predicciones - Procesos físicos.',
        explicacionSencilla: 'Predecir qué pasará en un experimento físico si se sigue la tendencia mostrada en una tabla o gráfica.',
        errorHistory: {
          '2018-2': { colombia: 64, etc: 60 },
          '2022-4': { ee: 41, colombia: 48, etc: 41 },
          '2025-3': { ee: 45, colombia: 38, etc: 32 },
          '2026-3': { ee: 35, colombia: 38, etc: 32 },
        },
        prioridad: 'fortaleza',
        queMejorar: '¡Fortaleza destacada en 2026! Solo 35% de error (superando a Colombia con 38%).',
        comoMejorarAula: [
          'Usar esta fortaleza en evaluación de predicciones como base para explicar las leyes físicas detrás de los datos.',
        ],
        meta2027: 'Sostener por debajo del 35% de error.',
      },
      {
        id: 'nat-7',
        competencia: 'Ciencia, Tecnología y Sociedad (CTS)',
        componente: 'Componente Ambiental y Tecnológico',
        aprendizaje: 'Analizar el potencial del uso de recursos naturales o artefactos y sus efectos sobre el entorno y la salud, así como las posibilidades de desarrollo para las comunidades - CTS.',
        explicacionSencilla: 'Evaluar impactos ambientales, energías renovables, salud pública y sostenibilidad tecnológica.',
        errorHistory: {
          '2018-2': { colombia: 41, etc: 34 },
          '2022-4': { ee: 39, colombia: 49, etc: 43 },
          '2025-3': { ee: 32, colombia: 35, etc: 28 },
          '2026-3': { ee: 38, colombia: 38, etc: 31 },
        },
        prioridad: 'fortaleza',
        queMejorar: 'Fortaleza histórica consistente del colegio durante toda la década (32% a 39% de error).',
        comoMejorarAula: [
          'Conectar los proyectos ambientales escolares (PRAE) con conceptos rigurosos de química ambiental y física energética.',
        ],
        meta2027: 'Bajar al 30% de error.',
      },
    ],
    generalDiagnosis: {
      fortalezas: [
        'Crecimiento sostenido en los últimos 3 años: 50 (2024) -> 51 (2025) -> 52 (2026), superando a Colombia (51) e igualando a Oficiales Urbanos (52).',
        'Aumento importante del Nivel 3 (Satisfactorio): subió de 29% en 2024 a 37% en 2026 (+8 puntos porcentuales).',
        'Gran desempeño en Ciencia, Tecnología y Sociedad (CTS) y predicción experimental (35%-38% de error).',
      ],
      alertasCriticas: [
        '16% de los estudiantes permanecen en Nivel 1 (Insuficiente) en 2026.',
        'Alta tasa de error en Procesos Físicos (64%-65% de error) e Indagación en Procesos Químicos (62% de error).',
      ],
      planDeAccion: [
        {
          titulo: 'Refuerzo Conceptual en Física y Diseño Experimental Químico',
          pasos: [
            'Trabajar la Física desde el análisis conceptual de fenómenos antes que el despeje mecánico de fórmulas.',
            'En Química, entrenar lectura de montajes de laboratorio, variables de control y lectura de tablas de solubilidad/reacción.',
          ],
          impactoEsperado: 'Reducir el Nivel 1 del 16% al 8% y recuperar el promedio histórico de 54-55 puntos.',
        },
      ],
    },
  },

  ingles: {
    id: 'ingles',
    name: 'Inglés',
    shortName: 'Inglés',
    scaleMax: 100,
    mediaReferencia: 50,
    colorHex: '#2563EB',
    accentBg: 'bg-blue-700',
    badgeTone: 'gold',
    description: 'Evalúa la competencia comunicativa en lengua inglesa alineada con el Marco Común Europeo (Niveles A-, A1, A2, B1 y B+).',
    friendlySummary:
      '¡Tendencia muy positiva! En 2026-3 el colegio alcanzó 54 puntos (su segundo puntaje más alto de toda la década tras 2016), superando a Colombia (53) e igualando a los colegios oficiales urbanos de Bogotá (54). Lo más valioso: el porcentaje de estudiantes en el nivel más bajo (A-) se redujo de 61% en pandemia (2020) a solo 28% en 2026, y los niveles superiores (B1 + B+) subieron al 10%.',
    levelLabels: [
      { key: 'l1', label: 'Nivel A- (Pre-A1)', shortTitle: 'A-', color: '#DC2626', meaning: 'No alcanza el nivel mínimo A1; vocabulario muy aislado.' },
      { key: 'l2', label: 'Nivel A1 (Principiante)', shortTitle: 'A1', color: '#EA580C', meaning: 'Comprende avisos públicos, descripciones simples y frases cotidianas.' },
      { key: 'l3', label: 'Nivel A2 (Básico)', shortTitle: 'A2', color: '#EAB308', meaning: 'Comprende conversaciones cortas y textos sencillos con conectores gramaticales.' },
      { key: 'l4', label: 'Nivel B1 (Pre-Intermedio)', shortTitle: 'B1', color: '#16A34A', meaning: 'Comprende textos narrativos y expositivos de forma literal e inferencial.' },
      { key: 'l5', label: 'Nivel B+ (Supera B1)', shortTitle: 'B+', color: '#047857', meaning: 'Dominio sobresaliente de comprensión lectora y gramatical avanzada.' },
    ],
    history: [
      { year: '2016-2', shortYear: '2016', date: '31/07/2016', ee: 55, desv: 10, colombia: 53, bogotaEtc: 58, oficialesUrbanos: 54, privadosEtc: 63, levels: { l1: 25, l2: 41, l3: 20, l4: 13, l5: 1 } },
      { year: '2017-2', shortYear: '2017', date: '27/08/2017', ee: 51, desv: 9, colombia: 51, bogotaEtc: 55, oficialesUrbanos: 51, privadosEtc: 61, levels: { l1: 35, l2: 41, l3: 20, l4: 4, l5: 0 } },
      { year: '2018-2', shortYear: '2018', date: '12/08/2018', ee: 51, desv: 9, colombia: 52, bogotaEtc: 57, oficialesUrbanos: 53, privadosEtc: 63, levels: { l1: 39, l2: 41, l3: 16, l4: 3, l5: 1 } },
      { year: '2020-4', shortYear: '2020', date: '07/11/2020', ee: 48, desv: 8, colombia: 48, bogotaEtc: 52, oficialesUrbanos: 48, privadosEtc: 57, levels: { l1: 61, l2: 26, l3: 12, l4: 1, l5: 0 } },
      { year: '2021-4', shortYear: '2021', date: '04/09/2021', ee: 52, desv: 12, colombia: 50, bogotaEtc: 56, oficialesUrbanos: 51, privadosEtc: 63, levels: { l1: 38, l2: 28, l3: 19, l4: 14, l5: 0 } },
      { year: '2022-4', shortYear: '2022', date: '04/09/2022', ee: 52, desv: 12, colombia: 51, bogotaEtc: 57, oficialesUrbanos: 52, privadosEtc: 63, levels: { l1: 35, l2: 35, l3: 18, l4: 10, l5: 1 } },
      { year: '2023-4', shortYear: '2023', date: '13/08/2023', ee: 52, desv: 11, colombia: 52, bogotaEtc: 57, oficialesUrbanos: 53, privadosEtc: 63, levels: { l1: 37, l2: 34, l3: 18, l4: 10, l5: 1 } },
      { year: '2024-3', shortYear: '2024', date: '18/08/2024', ee: 53, desv: 12, colombia: 52, bogotaEtc: 58, oficialesUrbanos: 54, privadosEtc: 65, levels: { l1: 34, l2: 30, l3: 27, l4: 8, l5: 1 } },
      { year: '2025-3', shortYear: '2025', date: '10/08/2025', ee: 52, desv: 9, colombia: 53, bogotaEtc: 58, oficialesUrbanos: 54, privadosEtc: 65, levels: { l1: 26, l2: 47, l3: 24, l4: 3, l5: 0 } },
      { year: '2026-3', shortYear: '2026', date: '26/07/2026', ee: 54, desv: 10, colombia: 53, bogotaEtc: 58, oficialesUrbanos: 54, privadosEtc: 64, gc3: 56, levels: { l1: 28, l2: 38, l3: 24, l4: 7, l5: 3 } },
    ],
    learnings: [
      {
        id: 'ing-1',
        competencia: 'Partes 1 a 3 del Examen (Nivel A1 -> A2)',
        componente: 'Vocabulario en Contexto, Avisos y Conversaciones Cortas',
        aprendizaje: 'Transición de Nivel A- y A1 hacia A2: Asociación de definiciones, avisos públicos e interacciones comunicativas cotidianas.',
        explicacionSencilla: 'El ICFES evalúa Inglés según el Marco Común Europeo (sin tabla de afirmaciones aisladas). El 66% de nuestros estudiantes está hoy en A- (28%) y A1 (38%).',
        errorHistory: {
          '2018-2': { ee: 39, colombia: 37, etc: 21 },
          '2022-4': { ee: 35, colombia: 44, etc: 25 },
          '2025-3': { ee: 26, colombia: 36, etc: 21 },
          '2026-3': { ee: 28, colombia: 35, etc: 19 },
        },
        prioridad: 'moderada',
        queMejorar: 'Aunque el colegio tiene menos estudiantes en A- (28%) que Colombia (35%), Bogotá ETC está en 19%. Necesitamos bajar A- por debajo del 20%.',
        comoMejorarAula: [
          'Entrenar campos semánticos por categorías (lugares públicos, profesiones, objetos de uso diario, salud, transporte) mediante asociación rápida definición-palabra (Parte 2 de la prueba).',
          'Practicar micro-diálogos funcionales (Parte 3): identificar qué respuesta es pragmáticamente coherente ante una pregunta o expresión cotidiana.',
        ],
        meta2027: 'Bajar el porcentaje de estudiantes en nivel A- del 28% a menos del 18%.',
      },
      {
        id: 'ing-2',
        competencia: 'Partes 4 y 5 del Examen (Nivel A2 -> B1)',
        componente: 'Gramática en Textos (Cloze) y Comprensión Lectora Literal',
        aprendizaje: 'Consolidación del Nivel A2 (24%) hacia B1: Uso de estructuras gramaticales en textos y comprensión de artículos sencillos.',
        explicacionSencilla: 'Completar espacios en blanco dentro de un artículo eligiendo la preposición, tiempo verbal o pronombre correcto, y responder preguntas directas sobre una historia.',
        errorHistory: {
          '2018-2': { ee: 41, colombia: 34, etc: 35 },
          '2022-4': { ee: 35, colombia: 28, etc: 30 },
          '2025-3': { ee: 47, colombia: 29, etc: 29 },
          '2026-3': { ee: 38, colombia: 33, etc: 34 },
        },
        prioridad: 'critica',
        queMejorar: 'El 38% de los estudiantes se queda en A1 porque falla al elegir tiempos verbales, conectores y preposiciones dentro de párrafos continuos.',
        comoMejorarAula: [
          'Trabajar lecturas tipo "Cloze" (textos con huecos) enfocándose en qué palabra pide la estructura antes y después del espacio (verbos modales, comparativos, pasado simple vs presente perfecto).',
          'Entrenar técnica de "Scanning" y "Paraphrasing": buscar en el texto la misma idea de la pregunta dicha con sinónimos.',
        ],
        meta2027: 'Aumentar el bloque A2 + B1 + B+ del 34% actual al 48%.',
      },
      {
        id: 'ing-3',
        competencia: 'Partes 6 y 7 del Examen (Nivel B1 y B+)',
        componente: 'Lectura Inferencial en Inglés y Gramática Avanzada',
        aprendizaje: 'Impulso a Niveles Superiores B1 (7%) y B+ (3%): Inferencia de intención del autor y vocabulario académico.',
        explicacionSencilla: 'Responder preguntas de comprensión inferencial ("What is the writer trying to do in this text?") y precisión léxica avanzada.',
        errorHistory: {
          '2018-2': { ee: 16, colombia: 19, etc: 26 },
          '2022-4': { ee: 18, colombia: 17, etc: 24 },
          '2025-3': { ee: 24, colombia: 19, etc: 26 },
          '2026-3': { ee: 24, colombia: 18, etc: 23 },
        },
        prioridad: 'fortaleza',
        queMejorar: 'En 2026-3 el colegio logró un 3% en nivel B+ (el más alto de los últimos 10 años) y 7% en B1 (10% sumados).',
        comoMejorarAula: [
          'Con el grupo de estudiantes que ya están en A2 (24%), trabajar textos de las Partes 6 y 7 en inglés enfocados en identificar el propósito del autor, el título más adecuado y verbos compuestos (phrasal verbs).',
        ],
        meta2027: 'Superar el 15% de estudiantes en niveles B1 y B+.',
      },
    ],
    generalDiagnosis: {
      fortalezas: [
        'Alcanzó 54 puntos en 2026-3, superando a Colombia (53) e igualando a Oficiales Urbanos de Bogotá (54).',
        'Récord de la década en Nivel B+ (3% en 2026-3) y recuperación de B1+B+ al 10% (frente a solo 3% en 2025).',
        'Reducción histórica del nivel insuficiente A-: de 61% en 2020 a 28% en 2026.',
      ],
      alertasCriticas: [
        'Aún hay un 66% de estudiantes sumando A- (28%) y A1 (38%); la meta es mover el grueso de la población hacia A2 y B1.',
      ],
      planDeAccion: [
        {
          titulo: 'Ruta de Transición A1 -> A2 -> B1 por Partes de la Prueba',
          pasos: [
            'Dividir el entrenamiento en el aula según las 7 partes de Saber 11°: asegurar el 100% de acierto en Partes 1, 2 y 3 (Avisos, Definiciones, Diálogos) para erradicar el nivel A-.',
            'Trabajar semanalmente un texto de Parte 4/7 (gramática en contexto) y Parte 5/6 (lectura literal e inferencial).',
          ],
          impactoEsperado: 'Superar el récord histórico de 55 puntos (2016) y acercarse a los 58 puntos de Bogotá ETC.',
        },
      ],
    },
  },
};
