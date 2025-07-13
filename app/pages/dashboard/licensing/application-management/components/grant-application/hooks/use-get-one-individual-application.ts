import { useApiGet } from '~/hooks/useApi';
import type { IndividualApplicant } from '../types/api';

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

export function useGetIndividualApplication(id?: string) {
  const apiResult = useApiGet<IndividualApplicant>(
    ['individual-applicants'],
    `/individual-applicants/${id}`,
    {
      enabled: !!id,
    },
  );
  return apiResult;
}
