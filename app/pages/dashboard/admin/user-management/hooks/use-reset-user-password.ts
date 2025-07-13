import { useApiPost } from '~/hooks/useApi';
import type { ResetPassword } from '../types/api';

export function useResetPassword() {
  return useApiPost<{ user_id: string }, ResetPassword>('auth/reset-user-password');
}
