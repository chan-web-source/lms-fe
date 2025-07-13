import { useApiGet } from '~/hooks/useApi';
import type { CorporationApplication } from '../types/api';

export type GetCorporateDirectorsParams = {
  search?: string;
  order_by?: string;
  order_dir?: 'asc' | 'desc';
  account_type?: string;
  account_status?: string;
  role_id?: string;
  page?: number;
  per_page?: number;
};

export function useGetCorporateApplication(id?: number) {
  const apiResult = useApiGet<CorporationApplication>(
    ['corporation-applicants'],
    `/corporation-applicants/${id}`,
    {
      enabled: !!id,
    },
  );
  return apiResult;
}
