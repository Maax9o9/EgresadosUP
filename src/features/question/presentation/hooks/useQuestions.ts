import { useQuery } from '@tanstack/react-query';
import { QuestionApiClient } from '../../data/api/questionApiClient';
import { QuestionRepository } from '../../data/repositories/QuestionRepository';
import { GetQuestions } from '../../domain/use-cases/GetQuestions';

export const useQuestions = (texto?: string) => {
  const apiClient = new QuestionApiClient();
  const repository = new QuestionRepository(apiClient);
  const getQuestions = new GetQuestions(repository);

  const { data: questions, isLoading, error, refetch } = useQuery({
    queryKey: ['questions', texto],
    queryFn: () => getQuestions.execute(texto),
  });

  return {
    questions: questions || [],
    isLoading,
    error,
    refetch,
  };
};
