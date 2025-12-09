import { Form } from '../entities/Form';

export interface IFormRepository {
  getForms(): Promise<Form[]>;
  getFormById(id: string): Promise<Form>;
  createForm(form: Form): Promise<Form>;
  updateForm(id: string, form: Form): Promise<Form>;
  deleteForm(id: string): Promise<void>;
  addQuestionToForm(formId: string, questionId: string, orden: number): Promise<void>;
  removeQuestionFromForm(formId: string, questionId: string): Promise<void>;
  getQuestionFormCount(questionId: string): Promise<number>;
  getFormQuestions(id: string): Promise<import('../../../question/domain/entities/Question').Question[]>;
}
