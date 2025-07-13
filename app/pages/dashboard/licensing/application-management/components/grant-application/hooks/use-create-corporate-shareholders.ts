import { useApiPost } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateShareholdersResp, ShareholdersDto } from '../types/api';

export function useCreateCorporateShareholders() {
  return useApiPost<ApiResponse<CorporateShareholdersResp>, ShareholdersDto>(
    '/corporation-shareholders',
  );
}
