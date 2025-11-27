import type { IQuestionRepository } from '../repositories/IQuestionRepository';

export class DeleteQuestion {
    private repository: IQuestionRepository;
  constructor( repository: IQuestionRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    await this.repository.deleteQuestion(id);
  }
}
