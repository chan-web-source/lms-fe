import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useCreateIndividualApplication() {
  return useApiPost<ApiResponse<{ id: string }>, FormData>('/individual-applicants');
}
