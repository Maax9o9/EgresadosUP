import { Question } from '@/features/question/domain/entities/Question';
import type { IFormRepository } from '../repositories/IFormRepository';

export class GetFormQuestionsUseCase {
    private repository: IFormRepository;
    constructor(repository: IFormRepository) { this.repository = repository; }

    async execute(formId: string): Promise<Question[]> {
        return this.repository.getFormQuestions(formId);
    }
}
