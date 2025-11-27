import type { IQuestionRepository } from '../../domain/repositories/IQuestionRepository';
import { Question } from '../../domain/entities/Question';
import { QuestionApiClient } from '../api/questionApiClient';
import { QUESTION_ENDPOINTS } from '../api/endpoints';

export class QuestionRepository implements IQuestionRepository {
private apiClient: QuestionApiClient;
  constructor( apiClient: QuestionApiClient) {
    this.apiClient = apiClient;
  }

  async getQuestions(texto?: string): Promise<Question[]> {
    const response = await this.apiClient.get<{ data: any[] }>(
      QUESTION_ENDPOINTS.getQuestions(texto)
    );
    return response.data.map((item) => Question.fromResponse(item));
  }

  async getQuestionById(id: string): Promise<Question> {
    const response = await this.apiClient.get<{ data: any }>(
      QUESTION_ENDPOINTS.getQuestionById(id)
    );
    return Question.fromResponse(response.data);
  }


async createQuestion(
  textoPregunta: string,
  esObligatoria: boolean,
  tipoPreguntaId: string
): Promise<Question> {
  const requestBody = {
    data: {
      type: 'preguntas',
      attributes: {
        'texto_pregunta': textoPregunta,
        'es_obligatoria': esObligatoria,
      },
      relationships: {
        'tipo-pregunta': {
          data: {
            type: 'tipos-pregunta',
            id: tipoPreguntaId,
          },
        },
      },
    },
  };

  console.log('Creating question with body:', JSON.stringify(requestBody, null, 2));

  const response = await this.apiClient.post<{ data: any }>(
    QUESTION_ENDPOINTS.createQuestion(),
    requestBody
  );
  
  console.log('Question created response:', response);
  
  return Question.fromResponse(response.data);
}

async updateQuestion(
  id: string,
  textoPregunta: string,
  esObligatoria: boolean,
  tipoPreguntaId: string
): Promise<Question> {
  const requestBody = {
    data: {
      type: 'preguntas',
      attributes: {
        'texto_pregunta': textoPregunta,
        'es_obligatoria': esObligatoria,
      },
      relationships: {
        'tipo-pregunta': {
          data: {
            type: 'tipos-pregunta',
            id: tipoPreguntaId,
          },
        },
      },
    },
  };

  const response = await this.apiClient.patch<{ data: any }>(
    QUESTION_ENDPOINTS.updateQuestion(id),
    requestBody
  );
  
  return Question.fromResponse(response.data);
}



  async deleteQuestion(id: string): Promise<void> {
    await this.apiClient.delete(QUESTION_ENDPOINTS.deleteQuestion(id));
  }
}
