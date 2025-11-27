export class QuestionOption {
    id: string;
    textoOpcion: string;
    etiqueta: string;
    preguntaId?: string;

  constructor(
    id: string,
    textoOpcion: string,
    etiqueta: string,
    preguntaId?: string
  ) {
    this.id = id;
    this.textoOpcion = textoOpcion;
    this.etiqueta = etiqueta;
    this.preguntaId = preguntaId;
  }

  static fromResponse(data: any): QuestionOption {
    return new QuestionOption(
      data.id,
      data.attributes['texto-opcion'] || data.attributes.texto_opcion,
      data.attributes.etiqueta,
      data.relationships?.pregunta?.data?.id
    );
  }
}
