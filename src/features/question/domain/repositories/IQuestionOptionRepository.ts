import { QuestionOption } from '../entities/QuestionOption';

export interface IQuestionOptionRepository {
  getQuestionOptions(preguntaId?: string): Promise<QuestionOption[]>;
  getQuestionOptionById(id: string): Promise<QuestionOption>;
  createQuestionOption(
    textoOpcion: string,
    etiqueta: string,
    preguntaId: string
  ): Promise<QuestionOption>;
  updateQuestionOption(
    id: string,
    textoOpcion: string,
    etiqueta: string
  ): Promise<QuestionOption>;
  deleteQuestionOption(id: string): Promise<void>;
}
