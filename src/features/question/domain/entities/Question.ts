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
  ) {this.id = id;
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
    return new Question(
      data.id,
      data.attributes.texto_pregunta,
      data.attributes.es_obligatoria,
      data.relationships['tipo-pregunta']?.data?.id || '',
      data.relationships?.opciones?.data?.map((opt: any) => 
        QuestionOption.fromResponse(opt)
      )
    );
  }
}
