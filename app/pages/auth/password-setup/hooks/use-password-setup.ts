import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { PasswordSetupDto } from '../types/api';

export function usePasswordSetup() {
  return useApiPost<ApiResponse<{ id: string }>, PasswordSetupDto>('/auth/verify-token');
}
