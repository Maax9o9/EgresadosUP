import type { Formulario } from '@/shared/types';

// ============================================
// DATOS MOCK - FORMULARIOS
// ============================================

export const mockFormularios: Formulario[] = [
  {
    id: 'form-1',
    nombre: 'Encuesta de Satisfacción Laboral',
    descripcion: 'Formulario para medir el nivel de satisfacción de los egresados en su trabajo actual',
    activo: true,
    fechaCreacion: '2025-10-15T10:30:00.000Z',
    fechaActualizacion: '2025-11-01T14:20:00.000Z',
    preguntas: [
      {
        id: 'p1',
        texto: '¿Qué tan satisfecho estás con tu empleo actual?',
        tipo: 'escala',
        requerida: true,
        orden: 1,
      },
      {
        id: 'p2',
        texto: '¿Cuál es tu área de trabajo?',
        tipo: 'multiple',
        opciones: [
          { id: 'op1', texto: 'Tecnología', orden: 1 },
          { id: 'op2', texto: 'Marketing', orden: 2 },
          { id: 'op3', texto: 'Recursos Humanos', orden: 3 },
          { id: 'op4', texto: 'Finanzas', orden: 4 },
          { id: 'op5', texto: 'Operaciones', orden: 5 },
        ],
        requerida: true,
        orden: 2,
      },
      {
        id: 'p3',
        texto: 'Describe brevemente tus responsabilidades principales',
        tipo: 'abierta',
        requerida: false,
        orden: 3,
      },
      {
        id: 'p4',
        texto: '¿Qué habilidades adquiridas en la universidad utilizas más?',
        tipo: 'checkbox',
        opciones: [
          { id: 'op6', texto: 'Pensamiento crítico', orden: 1 },
          { id: 'op7', texto: 'Trabajo en equipo', orden: 2 },
          { id: 'op8', texto: 'Liderazgo', orden: 3 },
          { id: 'op9', texto: 'Comunicación efectiva', orden: 4 },
          { id: 'op10', texto: 'Resolución de problemas', orden: 5 },
        ],
        requerida: true,
        orden: 4,
      },
    ],
  },
  {
    id: 'form-2',
    nombre: 'Evaluación de Competencias Profesionales',
    descripcion: 'Formulario para evaluar competencias técnicas y blandas de los egresados',
    activo: true,
    fechaCreacion: '2025-09-20T09:15:00.000Z',
    preguntas: [
      {
        id: 'p5',
        texto: '¿Consideras que la formación académica te preparó adecuadamente para tu carrera?',
        tipo: 'escala',
        requerida: true,
        orden: 1,
      },
      {
        id: 'p6',
        texto: 'Menciona las principales fortalezas de tu formación',
        tipo: 'abierta',
        requerida: true,
        orden: 2,
      },
      {
        id: 'p7',
        texto: '¿Qué áreas consideras que podrían mejorarse en el programa académico?',
        tipo: 'abierta',
        requerida: false,
        orden: 3,
      },
    ],
  },
  {
    id: 'form-3',
    nombre: 'Seguimiento de Egresados 2024',
    descripcion: 'Formulario anual para seguimiento de trayectoria profesional',
    activo: false,
    fechaCreacion: '2025-08-10T16:00:00.000Z',
    preguntas: [
      {
        id: 'p8',
        texto: '¿Actualmente estás empleado?',
        tipo: 'multiple',
        opciones: [
          { id: 'op11', texto: 'Sí, tiempo completo', orden: 1 },
          { id: 'op12', texto: 'Sí, medio tiempo', orden: 2 },
          { id: 'op13', texto: 'No, buscando empleo', orden: 3 },
          { id: 'op14', texto: 'No, estudiando posgrado', orden: 4 },
        ],
        requerida: true,
        orden: 1,
      },
      {
        id: 'p9',
        texto: '¿Cuánto tiempo tardaste en conseguir tu primer empleo después de graduarte?',
        tipo: 'multiple',
        opciones: [
          { id: 'op15', texto: 'Menos de 3 meses', orden: 1 },
          { id: 'op16', texto: '3-6 meses', orden: 2 },
          { id: 'op17', texto: '6-12 meses', orden: 3 },
          { id: 'op18', texto: 'Más de 12 meses', orden: 4 },
        ],
        requerida: true,
        orden: 2,
      },
    ],
  },
  {
    id: 'form-4',
    nombre: 'Retroalimentación de Programa Académico',
    descripcion: 'Formulario breve para recopilar opiniones sobre el programa académico cursado',
    activo: true,
    fechaCreacion: '2025-11-05T11:45:00.000Z',
    preguntas: [
      {
        id: 'p10',
        texto: '¿Recomendarías este programa académico a otros estudiantes?',
        tipo: 'escala',
        requerida: true,
        orden: 1,
      },
      {
        id: 'p11',
        texto: 'Comentarios adicionales',
        tipo: 'abierta',
        requerida: false,
        orden: 2,
      },
    ],
  },
];

// ============================================
// HELPERS
// ============================================

export const getFormularioById = (id: string): Formulario | undefined => {
  return mockFormularios.find((form) => form.id === id);
};

export const getFormulariosActivos = (): Formulario[] => {
  return mockFormularios.filter((form) => form.activo);
};
