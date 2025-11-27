import type { IFormRepository } from '../repositories/IFormRepository';
import { Form } from '../entities/Form';

export class GetFormById {
  private repository: IFormRepository;
  constructor(repository: IFormRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Form> {
    return await this.repository.getFormById(id);
  }
}
