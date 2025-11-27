import type { IQuestionRepository } from '../repositories/IQuestionRepository';
import { Question } from '../entities/Question';

export class GetQuestions {
    private repository: IQuestionRepository;
    constructor(repository: IQuestionRepository) {
        this.repository = repository;
    }

    async execute(texto?: string): Promise<Question[]> {
        return await this.repository.getQuestions(texto);
    }
}
