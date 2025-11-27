import type { IFormRepository } from '../repositories/IFormRepository';
import { Form } from '../entities/Form';

export class UpdateForm {
  private repository: IFormRepository;
  constructor(repository: IFormRepository) {
    this.repository = repository;
  }

  async execute(id: string, titulo: string, descripcion: string, isActive: boolean): Promise<Form> {
    const form = new Form(id, titulo, descripcion, isActive);
    return await this.repository.updateForm(id, form);
  }
}
