import type { IFormRepository } from '../repositories/IFormRepository';
import { Form } from '../entities/Form';

export class GetForms {
  private repository: IFormRepository;

  constructor(repository: IFormRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Form[]> {
    return await this.repository.getForms();
  }
}
