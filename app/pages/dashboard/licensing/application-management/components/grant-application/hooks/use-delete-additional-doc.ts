import { useApiDelete } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useDeleteAdditionalDoc() {
  return useApiDelete<ApiResponse, { id: number }>(`/additional-supporting-documents`);
}
