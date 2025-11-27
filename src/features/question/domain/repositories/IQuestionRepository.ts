import { Question } from '../entities/Question';

export interface IQuestionRepository {
  getQuestions(texto?: string): Promise<Question[]>;
  getQuestionById(id: string): Promise<Question>;
  createQuestion(
    textoPregunta: string,
    esObligatoria: boolean,
    tipoPreguntaId: string
  ): Promise<Question>;
  updateQuestion(
    id: string,
    textoPregunta: string,
    esObligatoria: boolean,
    tipoPreguntaId: string
  ): Promise<Question>;
  deleteQuestion(id: string): Promise<void>;
}
