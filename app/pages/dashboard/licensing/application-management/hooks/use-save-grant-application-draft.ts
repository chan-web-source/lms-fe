import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { GrantApplicationDraft } from '../types/api';

export function useSaveGrantApplicationDraft() {
  return useApiPost<ApiResponse<GrantApplicationDraft>, FormData>('/license-applications');
}
