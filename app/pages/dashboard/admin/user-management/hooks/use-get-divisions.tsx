import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { DropDownData } from '../types/api';

export function useGetDivisions() {
  return useApiGet<ApiResponse<DropDownData[]>>(['divisions'], '/divisions?all=true');
}
