import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';

export const useAddQuestionToForm = () => {
  const queryClient = useQueryClient();
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);

  const mutation = useMutation({
    mutationFn: ({ 
      formId, 
      questionId, 
      orden 
    }: { 
      formId: string; 
      questionId: string; 
      orden: number;
    }) => repository.addQuestionToForm(formId, questionId, orden),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['form', variables.formId] });
    },
  });

  return {
    addQuestionToForm: mutation.mutateAsync,
    isAdding: mutation.isPending,
    error: mutation.error,
  };
};
