import { useQuery } from '@tanstack/react-query';
import { QuestionApiClient } from '../../data/api/questionApiClient';
import { QuestionRepository } from '../../data/repositories/QuestionRepository';
import { GetQuestionById } from '../../domain/use-cases/GetQuestionById';

export const useQuestionById = (id: string | null) => {
  const apiClient = new QuestionApiClient();
  const repository = new QuestionRepository(apiClient);
  const getQuestionById = new GetQuestionById(repository);

  const { data: question, isLoading, error } = useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById.execute(id!),
    enabled: !!id,
  });

  return {
    question,
    isLoading,
    error,
  };
};
