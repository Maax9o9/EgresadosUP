import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionOptionApiClient } from '../../data/api/questionOptionApiClient';
import { QuestionOptionRepository } from '../../data/repositories/QuestionOptionRepository';
import { CreateQuestionOption } from '../../domain/use-cases/CreateQuestionOption';

interface CreateQuestionOptionParams {
  textoOpcion: string;
  etiqueta: string;
  preguntaId: string;
}

export const useCreateQuestionOption = () => {
  const queryClient = useQueryClient();
  const apiClient = new QuestionOptionApiClient();
  const repository = new QuestionOptionRepository(apiClient);
  const createQuestionOption = new CreateQuestionOption(repository);

  const mutation = useMutation({
    mutationFn: (params: CreateQuestionOptionParams) =>
      createQuestionOption.execute(
        params.textoOpcion,
        params.etiqueta,
        params.preguntaId
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['question', variables.preguntaId] });
      queryClient.invalidateQueries({ queryKey: ['questionOptions'] });
    },
  });

  return {
    createQuestionOption: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
