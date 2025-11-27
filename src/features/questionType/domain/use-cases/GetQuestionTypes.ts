import type { IQuestionTypeRepository } from '../repositories/IQuestionTypeRepository';
import { QuestionType } from '../entities/QuestionType';

export class GetQuestionTypes {
    private repository: IQuestionTypeRepository;
  constructor(repository: IQuestionTypeRepository) {
    this.repository = repository;
  }

  async execute(): Promise<QuestionType[]> {
    return await this.repository.getQuestionTypes();
  }
}
