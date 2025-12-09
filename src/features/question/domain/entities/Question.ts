import { QuestionOption } from './QuestionOption';

export class Question {
  id: string;
  textoPregunta: string
  esObligatoria: boolean;
  tipoPreguntaId: string;
  opciones?: QuestionOption[];

  constructor(
    id: string,
    textoPregunta: string,
    esObligatoria: boolean,
    tipoPreguntaId: string,
    opciones?: QuestionOption[]
  ) {
    this.id = id;
    this.textoPregunta = textoPregunta;
    this.esObligatoria = esObligatoria;
    this.tipoPreguntaId = tipoPreguntaId;
    this.opciones = opciones;
  }

  static create(
    textoPregunta: string,
    esObligatoria: boolean,
    tipoPreguntaId: string
  ): Question {
    return new Question('', textoPregunta, esObligatoria, tipoPreguntaId);
  }

  static fromResponse(data: any): Question {
    const attributes = data.attributes || data;
    const tipoPreguntaId = data.relationships?.['tipo-pregunta']?.data?.id ||
      data.relationships?.tipo_pregunta?.data?.id || '';

    // Handle options: could be in relationships.opciones.data (array) or relationships.opciones (array)
    let opcionesData = [];
    if (data.relationships?.opciones) {
      if (Array.isArray(data.relationships.opciones)) {
        opcionesData = data.relationships.opciones;
      } else if (data.relationships.opciones.data && Array.isArray(data.relationships.opciones.data)) {
        opcionesData = data.relationships.opciones.data;
      }
    }

    return new Question(
      data.id,
      attributes.texto_pregunta || attributes.textoPregunta,
      attributes.es_obligatoria !== undefined ? attributes.es_obligatoria : attributes.esObligatoria,
      tipoPreguntaId,
      opcionesData.map((opt: any) => QuestionOption.fromResponse(opt))
    );
  }
}
