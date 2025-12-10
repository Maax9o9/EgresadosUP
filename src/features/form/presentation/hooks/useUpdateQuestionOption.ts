import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionOptionApiClient } from '@/features/question/data/api/questionOptionApiClient';
import { QuestionOptionRepository } from '@/features/question/data/repositories/QuestionOptionRepository';

export class UpdateQuestionOption {
  private repository: QuestionOptionRepository;
  constructor(repository: QuestionOptionRepository) {
    this.repository = repository;
  }

  async execute(
    id: string,
    textoOpcion: string,
    etiqueta: string
  ) {
    return await this.repository.updateQuestionOption(id, textoOpcion, etiqueta);
  }
}

export const useUpdateQuestionOption = () => {
  const queryClient = useQueryClient();
  const apiClient = new QuestionOptionApiClient();
  const repository = new QuestionOptionRepository(apiClient);
  const updateQuestionOption = new UpdateQuestionOption(repository);

  const mutation = useMutation({
    mutationFn: ({ id, textoOpcion, etiqueta }: { 
      id: string;
      textoOpcion: string; 
      etiqueta: string; 
    }) => updateQuestionOption.execute(id, textoOpcion, etiqueta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formQuestions'] });
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return {
    updateQuestionOption: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
