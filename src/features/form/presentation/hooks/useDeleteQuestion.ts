import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionApiClient } from '@/features/question/data/api/questionApiClient';
import { QuestionRepository } from '@/features/question/data/repositories/QuestionRepository';
import { DeleteQuestion } from '@/features/question/domain/use-cases/DeleteQuestion';

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const apiClient = new QuestionApiClient();
  const repository = new QuestionRepository(apiClient);
  const deleteQuestionUseCase = new DeleteQuestion(repository);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteQuestionUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formQuestions'] });
    },
  });

  return {
    deleteQuestion: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
};
