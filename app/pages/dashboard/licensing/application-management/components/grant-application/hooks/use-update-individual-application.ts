import { useApiPut } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useUpdateIndividualApplication(id: string) {
  return useApiPut<ApiResponse<{ id: string }>, FormData>(`/individual-applicants/${id}`);
}
