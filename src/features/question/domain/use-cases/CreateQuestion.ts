import { Question } from '../entities/Question';
import type { IQuestionRepository } from '../repositories/IQuestionRepository';

export class CreateQuestion {
  private repository: IQuestionRepository;
  constructor(repository: IQuestionRepository) {this.repository = repository;}

  async execute(
    textoPregunta: string,
    esObligatoria: boolean,
    tipoPreguntaId: string
  ): Promise<Question> {
    return await this.repository.createQuestion(
      textoPregunta,
      esObligatoria,
      tipoPreguntaId
    );
  }
}
