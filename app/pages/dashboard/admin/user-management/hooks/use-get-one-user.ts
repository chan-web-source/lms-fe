import { useApiGet } from '~/hooks/useApi';
import type { UserManagementData } from '~/types/management';

export function useGetOneUser(id: string) {
  const result = useApiGet<UserManagementData>(['get-user', id], `/users/${id}`, {
    refetchOnMount: 'always',
  });
  return {
    ...result,
    refetch: result.refetch,
  };
}
