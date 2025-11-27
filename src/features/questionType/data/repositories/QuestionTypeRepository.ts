import type { IQuestionTypeRepository } from '../../domain/repositories/IQuestionTypeRepository';
import { QuestionType } from '../../domain/entities/QuestionType';
import { QuestionTypeApiClient } from '../api/questionTypeApiClient';
import { QUESTION_TYPE_ENDPOINTS } from '../api/endpoints';

export class QuestionTypeRepository implements IQuestionTypeRepository {
  private apiClient: QuestionTypeApiClient;
  constructor( apiClient: QuestionTypeApiClient) {
    this.apiClient = apiClient;
  }

  async getQuestionTypes(): Promise<QuestionType[]> {
    const response = await this.apiClient.get<{ data: any[] }>(
      QUESTION_TYPE_ENDPOINTS.getQuestionTypes()
    );
    
    return response.data.map((item) => {
      return QuestionType.fromResponse(item);
    });
  }
}
