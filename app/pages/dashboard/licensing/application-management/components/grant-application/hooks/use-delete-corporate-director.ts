import { useApiDelete } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useDeleteCorporateDirector() {
  return useApiDelete<ApiResponse, { id: number }>(`/corporation-directors`);
}
