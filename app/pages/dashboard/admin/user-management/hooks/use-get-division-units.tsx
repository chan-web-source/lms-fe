import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { DropDownData } from '../types/api';

export function useGetDivisionUnits() {
  return useApiGet<ApiResponse<DropDownData[]>>(['division-units'], '/division-units?all=true');
}
