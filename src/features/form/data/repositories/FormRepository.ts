import type { IFormRepository } from '@/features/form/domain/repositories/IFormRepository';
import { Form } from '@/features/form/domain/entities/Form';
import { FormApiClient } from '../api/formApiClient';
import { FORM_ENDPOINTS } from '../api/endpoints';

export class FormRepository implements IFormRepository {
  private apiClient: FormApiClient;

  constructor(apiClient: FormApiClient) {
    this.apiClient = apiClient;
  }

  async getForms(): Promise<Form[]> {
    const response = await this.apiClient.get<{ data: any[] }>(
      FORM_ENDPOINTS.getForms()
    );

    return response.data.map((item) => Form.fromResponse(item));
  }

  async getFormById(id: string): Promise<Form> {
    const response = await this.apiClient.get<{ data: any }>(
      FORM_ENDPOINTS.getFormById(id)
    );
    return Form.fromResponse(response.data);
  }

  async createForm(form: Form): Promise<Form> {
    const requestBody = {
      data: {
        type: 'formularios',
        attributes: {
          titulo: form.titulo,
          descripcion: form.descripcion,
          is_active: form.isActive,
        },
      },
    };


    const response = await this.apiClient.post<{ data: any }>(
      FORM_ENDPOINTS.createForm(),
      requestBody
    );


    return Form.fromResponse(response.data);
  }


  async updateForm(id: string, form: Form): Promise<Form> {
    const requestBody = {
      data: {
        type: 'formularios',
        attributes: {
          titulo: form.titulo,
          descripcion: form.descripcion,
          is_active: form.isActive,
        },
      },
    };

    const response = await this.apiClient.patch<{ data: any }>(
      FORM_ENDPOINTS.updateForm(id),
      requestBody
    );
    return Form.fromResponse(response.data);
  }

  async deleteForm(id: string): Promise<void> {
    await this.apiClient.delete(FORM_ENDPOINTS.deleteForm(id));
  }

  async addQuestionToForm(
    formId: string,
    questionId: string,
    orden: number
  ): Promise<void> {
    const requestBody = {
      data: {
        id: questionId,
        type: 'preguntas',
      },
      meta: {
        orden,
      },
    };

    await this.apiClient.post(
      FORM_ENDPOINTS.addQuestion(formId),
      requestBody
    );
  }

  async removeQuestionFromForm(
    formId: string,
    questionId: string
  ): Promise<void> {
    await this.apiClient.delete(
      FORM_ENDPOINTS.removeQuestion(formId, questionId)
    );
  }

  async getQuestionFormCount(questionId: string): Promise<number> {
    const response = await this.apiClient.get<{ meta: { formularios_count: number } }>(
      FORM_ENDPOINTS.getQuestionCount(questionId)
    );
    return response.meta.formularios_count;
  }

  async getFormQuestions(id: string): Promise<import('../../../question/domain/entities/Question').Question[]> {
    const response = await this.apiClient.get<{ data: any[] }>(
      FORM_ENDPOINTS.getFormQuestions(id)
    );
    const { Question } = await import('../../../question/domain/entities/Question');
    return response.data.map((item) => Question.fromResponse(item));
  }
}
