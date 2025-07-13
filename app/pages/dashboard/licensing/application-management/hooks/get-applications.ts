import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { Application } from '../types/api';
import { useQueryClient } from '@tanstack/react-query';

export type GetApplicationsParams = {
  search?: string;
  order_by?: string;
  order_dir?: 'asc' | 'desc';
  application_status?: string;
  regulated_activity?: string;
  application_type?: string;
  page?: number;
  per_page?: number;
};

export function useGetApplications(params: GetApplicationsParams = {}, options: any = {}) {
  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          acc[key] = String(val);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const result = useApiGet<ApiResponse<Application[]>>(
    ['license-applications', queryString.toString()],
    `/license-applications?${queryString}`,
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['license-applications'] });
      },
    },
  );

  return result;
}
