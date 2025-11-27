import type { IFormRepository } from '../repositories/IFormRepository';
import { Form } from '../entities/Form';

export class CreateForm {
  private repository: IFormRepository;

  constructor(repository: IFormRepository) {
    this.repository = repository;
  }

  async execute(titulo: string, descripcion: string, isActive: boolean = true): Promise<Form> {
    const form = Form.create(titulo, descripcion, isActive);
    return await this.repository.createForm(form);
  }
}
