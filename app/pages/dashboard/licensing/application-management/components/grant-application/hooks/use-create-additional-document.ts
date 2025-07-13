import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';

export function useCreateAdditionalDocument() {
  return useApiPost<ApiResponse<{ name: string; id: string }>, FormData>(
    '/additional-supporting-documents',
  );
}
