import type { IFormRepository } from '../repositories/IFormRepository';

export class DeleteForm {
  private repository: IFormRepository;

  constructor(repository: IFormRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    await this.repository.deleteForm(id);
  }
}
