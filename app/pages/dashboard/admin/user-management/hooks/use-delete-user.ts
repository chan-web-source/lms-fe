import { useNavigate } from 'react-router';
import type { ApiResponse } from '~/lib/axios';
import type { Users } from '../types/api';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useApiDelete } from '~/hooks/useApi';

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useApiDelete<ApiResponse<Users>, { id: string | number }>('/users', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
      navigate('/admin/user-management');
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred while deleting user';
      toast.error(errorMessage);
    },
  });

  return mutation;
}
