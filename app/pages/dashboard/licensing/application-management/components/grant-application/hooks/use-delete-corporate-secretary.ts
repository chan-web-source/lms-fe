import { useApiDelete } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useDeleteCorporateSecretary() {
  return useApiDelete<ApiResponse, { id: number }>(`/corporation-secretaries`);
}
