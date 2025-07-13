import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useCreateCapitalMarketApplication() {
  return useApiPost<ApiResponse<{ id: string }>, FormData>(
    '/capital-market-representative-license-holders',
  );
}
