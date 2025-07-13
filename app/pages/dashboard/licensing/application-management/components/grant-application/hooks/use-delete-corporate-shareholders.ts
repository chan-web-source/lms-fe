import { useApiDelete } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useDeleteCorporateShareholder() {
  return useApiDelete<ApiResponse, { id: number }>(`/corporation-shareholders`);
}
