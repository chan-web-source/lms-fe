import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { SendOtp } from '../types/api';
import Cookies from 'js-cookie';

export function useSendOtp() {
  const mfaToken = Cookies.get('mfa_token');
  return useApiPost<ApiResponse<{ method: string }>, SendOtp>(
    '/auth/send-otp',

    {
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${mfaToken}`,
        },
      },
    },
  );
}
