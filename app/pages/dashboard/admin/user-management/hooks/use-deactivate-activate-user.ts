import { useApiPutFormData } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { Users } from '../types/api';
import { toast } from 'react-toastify';

export function useDeactivateOrActivateUser() {
  const mutation = useApiPutFormData<ApiResponse<Users>>('/users', {
    onSuccess: (data) => {
      if (data?.account_status === 'Active') {
        toast.success('User activated successfully');
      } else {
        toast.success('User deactivated successfully');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deactivate user';
      toast.error(errorMessage);
    },
  });

  const deactivateUser = (userId: number, formData: FormData) => {
    // Add userId to the FormData if not already present
    if (!formData.get('id')) {
      formData.append('id', userId.toString());
    }
    mutation.mutate(formData);
  };

  return { mutate: deactivateUser };
}
