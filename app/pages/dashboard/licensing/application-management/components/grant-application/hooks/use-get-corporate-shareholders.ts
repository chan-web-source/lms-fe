import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateShareholders } from '../types/api';

export type GetCorporateShareholdersParams = {
  search?: string;
  order_by?: string;
  order_dir?: 'asc' | 'desc';
  account_type?: string;
  account_status?: string;
  role_id?: string;
  page?: number;
  per_page?: number;
};

export function useGetCorporateShareholders(
  params: GetCorporateShareholdersParams = {},
  options: any = {},
) {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          acc[key] = String(val);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );
  return useApiGet<ApiResponse<CorporateShareholders[]>>(
    ['corporation-shareholders', queryString.toString()],
    `/corporation-shareholders?${queryString}`,
    options,
  );
}
