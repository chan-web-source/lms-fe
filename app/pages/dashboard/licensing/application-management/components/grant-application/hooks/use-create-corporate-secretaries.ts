import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateSecretariesResp, DirectorDto } from '../types/api';

export function useCreateCorporateSecretaries() {
  return useApiPost<ApiResponse<CorporateSecretariesResp>, DirectorDto>('/corporation-secretaries');
}
