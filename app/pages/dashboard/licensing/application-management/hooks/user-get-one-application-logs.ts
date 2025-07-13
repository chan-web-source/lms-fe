import { useApiGet } from '~/hooks/useApi';
import type { ApplicationLog } from '../types/api';
import { useQueryClient } from '@tanstack/react-query';

export function useGetOneApplicationLogs(license_application_id: string, options: any = {}) {
  const queryClient = useQueryClient();
  return useApiGet<{ data: ApplicationLog[] }>(
    [`/license-applications/${license_application_id}/logs`],
    `/license-applications/${license_application_id}/logs`,
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`/license-applications/${license_application_id}/logs`],
        });
      },
    },
  );
}
