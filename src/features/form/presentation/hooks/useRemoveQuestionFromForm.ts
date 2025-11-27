import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';

export const useRemoveQuestionFromForm = () => {
  const queryClient = useQueryClient();
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);

  const mutation = useMutation({
    mutationFn: ({ 
      formId, 
      questionId 
    }: { 
      formId: string; 
      questionId: string;
    }) => repository.removeQuestionFromForm(formId, questionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['form', variables.formId] });
    },
  });

  return {
    removeQuestionFromForm: mutation.mutateAsync,
    isRemoving: mutation.isPending,
    error: mutation.error,
  };
};
