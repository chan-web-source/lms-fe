import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateDirectorResp, DirectorDto } from '../types/api';

export function useCreateCorporateDirector() {
  return useApiPost<ApiResponse<CorporateDirectorResp>, DirectorDto>('/corporation-directors');
}
