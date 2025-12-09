import { useState, useEffect } from 'react';
import { Question } from '@/features/question/domain/entities/Question';
import { GetFormQuestionsUseCase } from '../../domain/usecases/GetFormQuestionsUseCase';
import { FormRepository } from '../../data/repositories/FormRepository';
import { FormApiClient } from '../../data/api/formApiClient';

export const useFormQuestions = (formId: string) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!formId) return;

            setIsLoading(true);
            setError(null);

            try {
                const repository = new FormRepository(new FormApiClient());
                const useCase = new GetFormQuestionsUseCase(repository);
                const result = await useCase.execute(formId);
                setQuestions(result);
                console.log(result.map((question) => question));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar las preguntas');
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [formId]);

    return { questions, isLoading, error };
};
