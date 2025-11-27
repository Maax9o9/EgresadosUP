import { useQuery } from '@tanstack/react-query';
import { FormApiClient } from '../../data/api/formApiClient';
import { FormRepository } from '../../data/repositories/FormRepository';
import { GetForms } from '../../domain/use-cases/GetForms';

export const useFormList = () => {
  const apiClient = new FormApiClient();
  const repository = new FormRepository(apiClient);
  const getForms = new GetForms(repository);

  const { data: forms, isLoading, error, refetch } = useQuery({
    queryKey: ['forms'],
    queryFn: () => getForms.execute(),
  });

  return {
    forms: forms || [],
    isLoading,
    error,
    refetch,
  };
};
