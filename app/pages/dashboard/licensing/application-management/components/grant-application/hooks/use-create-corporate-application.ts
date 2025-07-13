import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateDirectorResp } from '../types/api';

export function useCreateCorporateApplication() {
  return useApiPost<ApiResponse<CorporateDirectorResp>, FormData>('/corporation-applicants');
}
