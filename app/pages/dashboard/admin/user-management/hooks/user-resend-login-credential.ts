import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { Users } from '../types/api';
import { toast } from 'react-toastify';

interface ResetPasswordRequest {
  user_id: number;
}

export function useResendLoginCredential() {
  return useApiPost<ApiResponse<Users>, ResetPasswordRequest>('/auth/reset-user-password', {
    options: {
      onSuccess: () => {
        toast.success('Login credentials resent successfully');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || 'Failed to reset the password';
        toast.error(errorMessage);
      },
    },
  });
}
