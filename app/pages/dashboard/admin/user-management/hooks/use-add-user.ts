import type { ApiResponse } from '~/lib/axios';
import type { Users } from '../types/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApiPost } from '~/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';

export function useAddUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useApiPost<ApiResponse<Users>, FormData>('/users', {
    options: {
      onSuccess: async () => {
        try {
          // await queryClient.invalidateQueries({ queryKey: ['users'] });
          // await queryClient.refetchQueries({ queryKey: ['users'] });
          toast.success('User created successfully');
          // Add a small delay to ensure the refetch completes
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
        }
        else if (code === 400) {
          toast.error('Please enter a valid phone number');
        } else {
          toast.error(`Failed to create user. Error code: ${code}`);
        }
      },
    },
    axiosConfig: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
}
