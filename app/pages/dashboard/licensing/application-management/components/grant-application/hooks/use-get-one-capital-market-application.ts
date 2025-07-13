import { useApiGet } from '~/hooks/useApi';
import type { CapitalMarketRepresentativeLicenseHolder } from '../types/api';

export type GetIndividualParams = {
  search?: string;
  order_by?: string;
  order_dir?: 'asc' | 'desc';
  account_type?: string;
  account_status?: string;
  role_id?: string;
  page?: number;
  per_page?: number;
};

export function useGetCapitalMarketApplication(id?: string) {
  const apiResult = useApiGet<CapitalMarketRepresentativeLicenseHolder>(
    ['capital-market-representative-license-holders'],
    `/capital-market-representative-license-holders/${id}`,
    { enabled: !!id },
  );
  return apiResult;
}
