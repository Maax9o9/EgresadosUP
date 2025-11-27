import { QuestionOption } from '../entities/QuestionOption';
import type { IQuestionOptionRepository } from '../repositories/IQuestionOptionRepository';

export class CreateQuestionOption {
  private repository: IQuestionOptionRepository;
  constructor(repository: IQuestionOptionRepository) {
    this.repository = repository;
  }

  async execute(
    textoOpcion: string,
    etiqueta: string,
    preguntaId: string
  ): Promise<QuestionOption> {
    console.log('CreateQuestionOption.execute - RAW params:', {
      textoOpcion,
      etiqueta,
      preguntaId,
      textoOpcionType: typeof textoOpcion,
      etiquetaType: typeof etiqueta,
      preguntaIdType: typeof preguntaId
    });
    
    return await this.repository.createQuestionOption(
      textoOpcion,
      etiqueta,
      preguntaId
    );
  }
}
