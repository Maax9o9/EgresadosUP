import { QuestionType } from '../entities/QuestionType';

export interface IQuestionTypeRepository {
  getQuestionTypes(): Promise<QuestionType[]>;
}
