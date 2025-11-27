import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';
import { UpdateForm } from '../../domain/use-cases/UpdateForm';

export const useUpdateForm = () => {
  const queryClient = useQueryClient();
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);
  const updateForm = new UpdateForm(repository);

  const mutation = useMutation({
    mutationFn: ({ id, titulo, descripcion, isActive }: { 
      id: string;
      titulo: string; 
      descripcion: string; 
      isActive: boolean 
    }) => updateForm.execute(id, titulo, descripcion, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });

  return {
    updateForm: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
