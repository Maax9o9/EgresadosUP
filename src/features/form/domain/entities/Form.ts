export class Form {
  id: string;
  titulo: string;
  descripcion: string;
  isActive: boolean;
  fechaCreacion?: string;
  preguntas?: FormQuestion[];

  constructor(
    id: string,
    titulo: string,
    descripcion: string,
    isActive: boolean,
    fechaCreacion?: string,
    preguntas?: FormQuestion[]
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.isActive = isActive;
    this.fechaCreacion = fechaCreacion;
    this.preguntas = preguntas;
  }

  static create(titulo: string, descripcion: string, isActive: boolean = true): Form {
    return new Form('', titulo, descripcion, isActive);
  }

  static fromResponse(data: any): Form {
    return new Form(
      data.id,
      data.attributes.titulo,
      data.attributes.descripcion,
      data.attributes.is_active,
      data.attributes.fecha_creacion,
      data.relationships?.preguntas?.data?.map((p: any) => ({
        id: p.id,
        orden: p.attributes.orden
      }))
    );
  }
}

export interface FormQuestion {
  id: string;
  orden: number;
}
