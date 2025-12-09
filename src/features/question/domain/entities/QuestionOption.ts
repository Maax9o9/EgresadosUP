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
    // Handle both JSON:API format (with attributes) and flat format
    const attributes = data.attributes || data;

    return new QuestionOption(
      data.id,
      attributes['texto-opcion'] || attributes.texto_opcion || attributes.textoOpcion,
      attributes.etiqueta,
      data.relationships?.pregunta?.data?.id
    );
  }
}
