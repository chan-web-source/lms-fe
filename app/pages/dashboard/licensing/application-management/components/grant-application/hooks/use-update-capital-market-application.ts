import { useApiPut } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useUpdateCapitalMarketApplication(id: string) {
  return useApiPut<ApiResponse<{ id: string }>, FormData>(
    `/capital-market-representative-license-holders/${id}`,
  );
}
