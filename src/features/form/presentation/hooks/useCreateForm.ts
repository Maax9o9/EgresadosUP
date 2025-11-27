import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';
import { CreateForm } from '../../domain/use-cases/CreateForm';

export const useCreateForm = () => {
  const queryClient = useQueryClient();
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);
  const createForm = new CreateForm(repository);

  const mutation = useMutation({
    mutationFn: ({ titulo, descripcion, isActive }: { 
      titulo: string; 
      descripcion: string; 
      isActive: boolean 
    }) => createForm.execute(titulo, descripcion, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });

  return {
    createForm: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
