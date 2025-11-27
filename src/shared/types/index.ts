export interface OpcionPregunta {
  id: string;
  texto: string;
  etiqueta?: string; 
}

export interface Pregunta {
  id: string;
  texto: string;
  tipoPreguntaId: string; 
  requerida: boolean;
  opciones?: OpcionPregunta[];
  orden: number;
}

export interface Formulario {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fechaCreacion: string;
  preguntas: Pregunta[];
}
