// ============================================
// TIPOS DE PREGUNTAS
// ============================================

export type TipoPregunta = 'multiple' | 'abierta' | 'escala' | 'checkbox';

export interface OpcionPregunta {
  id: string;
  texto: string;
  orden: number;
}

export interface Pregunta {
  id: string;
  texto: string;
  tipo: TipoPregunta;
  opciones?: OpcionPregunta[]; // Solo para tipo 'multiple' o 'checkbox'
  requerida: boolean;
  orden: number;
}

// ============================================
// FORMULARIO
// ============================================

export interface Formulario {
  id: string;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
  activo: boolean;
  fechaCreacion: string; // ISO string
  fechaActualizacion?: string;
}

// ============================================
// ENCUESTA
// ============================================

export interface Encuesta {
  id: string;
  titulo: string;
  descripcion: string;
  formularioBase?: string; // ID del formulario usado como base (opcional)
  preguntas: Pregunta[];
  activa: boolean;
  fechaCreacion: string;
  fechaInicio?: string;
  fechaFin?: string;
}
