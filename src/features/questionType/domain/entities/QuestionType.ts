export class QuestionType {
  id: string;
  nombre: string;
  
  
  constructor(
     id: string,
     nombre: string
  ) {
    this.id = id;
    this.nombre = nombre;
  }

  static fromResponse(data: any): QuestionType {
    return new QuestionType(
      data.id,
      data.attributes.nombre
    );
  }
}
