import type { IQuestionOptionRepository } from '../../domain/repositories/IQuestionOptionRepository';
import { QuestionOption } from '../../domain/entities/QuestionOption';
import { QuestionOptionApiClient } from '../api/questionOptionApiClient';
import { QUESTION_OPTION_ENDPOINTS } from '../api/endpoints';

export class QuestionOptionRepository implements IQuestionOptionRepository {
  private apiClient: QuestionOptionApiClient;
  constructor(apiClient: QuestionOptionApiClient) {
    this.apiClient = apiClient;
  }

  async getQuestionOptions(preguntaId?: string): Promise<QuestionOption[]> {
    const response = await this.apiClient.get<{ data: any[] }>(
      QUESTION_OPTION_ENDPOINTS.getQuestionOptions(preguntaId)
    );
    return response.data.map((item) => QuestionOption.fromResponse(item));
  }

  async getQuestionOptionById(id: string): Promise<QuestionOption> {
    const response = await this.apiClient.get<{ data: any }>(
      QUESTION_OPTION_ENDPOINTS.getQuestionOptionById(id)
    );
    return QuestionOption.fromResponse(response.data);
  }

  async createQuestionOption(
    textoOpcion: string,
    etiqueta: string,
    preguntaId: string
  ): Promise<QuestionOption> {
    const requestBody = {
      data: {
        type: 'opcion-pregunta',
        attributes: {
          'texto-opcion': textoOpcion,
          etiqueta: etiqueta,
        },
        relationships: {
          pregunta: {
            data: {
              type: 'pregunta',
              id: preguntaId,
            },
          },
        },
      },
    };

    console.log('Creating question option with body:', JSON.stringify(requestBody, null, 2));

    const response = await this.apiClient.post<{ data: any }>(
      QUESTION_OPTION_ENDPOINTS.createQuestionOption(),
      requestBody
    );
    return QuestionOption.fromResponse(response.data);
  }

  async updateQuestionOption(
    id: string,
    textoOpcion: string,
    etiqueta: string
  ): Promise<QuestionOption> {
    const requestBody = {
      data: {
        type: 'opcion-pregunta',
        attributes: {
          'texto-opcion': textoOpcion,
          etiqueta: etiqueta,
        },
      },
    };

    const response = await this.apiClient.patch<{ data: any }>(
      QUESTION_OPTION_ENDPOINTS.updateQuestionOption(id),
      requestBody
    );
    return QuestionOption.fromResponse(response.data);
  }

  async deleteQuestionOption(id: string): Promise<void> {
    await this.apiClient.delete(
      QUESTION_OPTION_ENDPOINTS.deleteQuestionOption(id)
    );
  }
}
