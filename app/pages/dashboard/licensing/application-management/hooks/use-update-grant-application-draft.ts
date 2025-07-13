import { useApiPut } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { GrantApplicationDraft } from '../types/api';

export function useUpdateGrantApplicationDraft(id: string) {
  return useApiPut<ApiResponse<GrantApplicationDraft>, FormData>(`/license-applications/${id}`);
}
