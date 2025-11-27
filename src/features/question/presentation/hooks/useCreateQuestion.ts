import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionApiClient } from '../../data/api/questionApiClient';
import { QuestionRepository } from '../../data/repositories/QuestionRepository';
import { CreateQuestion } from '../../domain/use-cases/CreateQuestion';

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const apiClient = new QuestionApiClient();
  const repository = new QuestionRepository(apiClient);
  const createQuestion = new CreateQuestion(repository);

  const mutation = useMutation({
    mutationFn: ({
      textoPregunta,
      esObligatoria,
      tipoPreguntaId,
    }: {
      textoPregunta: string;
      esObligatoria: boolean;
      tipoPreguntaId: string;
    }) => createQuestion.execute(textoPregunta, esObligatoria, tipoPreguntaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });

  return {
    createQuestion: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
