import { Question } from '../entities/Question';
import type { IQuestionRepository } from '../repositories/IQuestionRepository';

export class UpdateQuestion {
  private repository: IQuestionRepository;
  constructor(repository: IQuestionRepository) {
    this.repository = repository;
  }

  async execute(
    id: string,
    textoPregunta: string,
    esObligatoria: boolean,
    tipoPreguntaId: string
  ): Promise<Question> {
    return await this.repository.updateQuestion(
      id,
      textoPregunta,
      esObligatoria,
      tipoPreguntaId
    );
  }
}
