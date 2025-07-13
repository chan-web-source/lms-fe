import { useApiGet } from '~/hooks/useApi';
import type { ApplicationDraft } from '../types/api';
import { useQueryClient } from '@tanstack/react-query';

export function useGetOneApplicationDraft(id?: string, options: any = {}) {
  const queryClient = useQueryClient();
  return useApiGet<ApplicationDraft>(['application-draft'], `/license-applications/${id}`, {
    enabled: !!id,
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application-draft'] });
    },
  });
}
