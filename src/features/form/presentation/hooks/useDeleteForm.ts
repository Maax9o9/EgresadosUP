import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';
import { DeleteForm } from '../../domain/use-cases/DeleteForm';

export const useDeleteForm = () => {
  const queryClient = useQueryClient();
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);
  const deleteFormUseCase = new DeleteForm(repository);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteFormUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });

  return {
    deleteForm: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
};
