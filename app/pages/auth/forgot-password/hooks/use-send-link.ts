import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { SendLinkDto } from '../types/api';

export function useSendLink() {
  return useApiPost<ApiResponse<{ email: string }>, SendLinkDto>('/auth/password-setup');
}
