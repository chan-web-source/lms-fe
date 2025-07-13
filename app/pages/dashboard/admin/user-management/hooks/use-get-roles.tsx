import { useApiGet } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { Role } from '../types/api';

export function useGetRoles() {
  return useApiGet<ApiResponse<Role[]>>(['roles'], '/roles?all=true');
}
