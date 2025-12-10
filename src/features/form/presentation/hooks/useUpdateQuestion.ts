import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionApiClient } from '@/features/question/data/api/questionApiClient';
import { QuestionRepository } from '@/features/question/data/repositories/QuestionRepository';
import { UpdateQuestion } from '@/features/question/domain/use-cases/UpdateQuestion';
import { alertService } from '@/shared/services/alert.service';

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const apiClient = new QuestionApiClient();
  const repository = new QuestionRepository(apiClient);
  const updateQuestion = new UpdateQuestion(repository);

  const mutation = useMutation({
    mutationFn: ({ id, textoPregunta, esObligatoria, tipoPreguntaId }: { 
      id: string;
      textoPregunta: string; 
      esObligatoria: boolean; 
      tipoPreguntaId: string 
    }) => updateQuestion.execute(id, textoPregunta, esObligatoria, tipoPreguntaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formQuestions'] });
      alertService.success('Pregunta actualizada correctamente');
    },
    onError: (error) => {
      alertService.error('Error al actualizar la pregunta');
      console.error(error);
    }
  });

  return {
    updateQuestion: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
