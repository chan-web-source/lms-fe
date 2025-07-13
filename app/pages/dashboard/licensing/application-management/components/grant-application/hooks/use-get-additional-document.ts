import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { CorporateDirector } from '../types/api';

export type GetAdditionalDocParams = {
  search?: string;
  order_by?: string;
  order_dir?: 'asc' | 'desc';
  account_type?: string;
  account_status?: string;
  role_id?: string;
  page?: number;
  per_page?: number;
  corporation_applicant_id?: number;
};

export function useGetAdditionalDoc(params: GetAdditionalDocParams = {}, options: any = {}) {
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
  return useApiGet<ApiResponse<CorporateDirector[]>>(
    ['additional-supporting-documents', queryString.toString()],
    `/additional-supporting-documents?${queryString}`,
    options,
  );
}
