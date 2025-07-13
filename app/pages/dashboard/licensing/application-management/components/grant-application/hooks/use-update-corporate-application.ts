import { useApiPut } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateDirectorResp } from '../types/api';

export function useUpdateCorporateApplication(id: string) {
  return useApiPut<ApiResponse<CorporateDirectorResp>, FormData>(`/corporation-applicants/${id}`);
}
