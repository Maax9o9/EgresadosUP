import { useQuery } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';
import { GetFormById } from '../../domain/use-cases/GetFormById';

export const useFormById = (id: string | null) => {
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);
  const getFormById = new GetFormById(repository);

  const { data: form, isLoading, error } = useQuery({
    queryKey: ['form', id],
    queryFn: () => getFormById.execute(id!),
    enabled: !!id, 
  });

  return {
    form,
    isLoading,
    error,
  };
};
