import { useQuery } from '@tanstack/react-query';
import { QuestionTypeApiClient } from '../../data/api/questionTypeApiClient';
import { QuestionTypeRepository } from '../../data/repositories/QuestionTypeRepository';
import { GetQuestionTypes } from '../../domain/use-cases/GetQuestionTypes';

export const useQuestionTypes = () => {
  const apiClient = new QuestionTypeApiClient();
  const repository = new QuestionTypeRepository(apiClient);
  const getQuestionTypes = new GetQuestionTypes(repository);

  const { data: questionTypes, isLoading, error } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: () => getQuestionTypes.execute(),
  });

  
  return {
    questionTypes: questionTypes || [],
    isLoading,
    error,
  };
};
