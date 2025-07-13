import { useNavigate } from 'react-router';
import { useApiPutFormData } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { Users } from '../types/api';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export function useUpdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useApiPutFormData<ApiResponse<Users>>('/users', {
    onSuccess: async () => {
      try {
        // await queryClient.invalidateQueries({ queryKey: ['users'] });
        // await queryClient.refetchQueries({ queryKey: ['users'] });
        toast.success('User updated successfully');
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate('/admin/user-management');
      } catch (error) {
        console.error('Error refreshing user data:', error);
        toast.error('Error refreshing user data. Please refresh the page.');
      }
    },
    onError: (error: any) => {
      const code = error?.response?.data?.code ?? error?.response?.status ?? 500;
      const statusCode = error?.response?.status;

      if (code === 413 || statusCode === 413) {
        toast.error('Image size too large, please try again');
      } else if (code === 409) {
        toast.error('Email already exists, please try again');
      } else if (code === 420) {
        toast.error('Email unverified from AWS, please try another email');
      } else if (code === 400) {
        toast.error('Please enter a valid phone number');
      } else {
        toast.error('We couldn’t save your changes. Please try again later.');
      }
    },
  });
}
