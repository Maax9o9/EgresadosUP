import type { IQuestionRepository } from '../repositories/IQuestionRepository';
import { Question } from '../entities/Question';

export class GetQuestionById {
    private repository: IQuestionRepository;
  constructor(repository: IQuestionRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Question> {
    return await this.repository.getQuestionById(id);
  }
}
