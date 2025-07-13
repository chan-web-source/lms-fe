import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { ApplicationType } from '../types/api';

export function useGetApplicationType() {
  return useApiGet<ApiResponse<ApplicationType[]>>(
    ['application-type'],
    '/application-types?all=true',
  );
}
