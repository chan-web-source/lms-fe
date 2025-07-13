import { useNavigate } from 'react-router';
import { useApiPutFormData } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { Users } from '../../dashboard/admin/user-management/types/api';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '~/providers/AuthProvider';
import Cookies from 'js-cookie';

export function useUpdateMyProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useApiPutFormData<ApiResponse<Users>>('/users', {
    onSuccess: async () => {
      try {
        toast.success('My profile successfully');
        // redirect to saved dashboard accordingly
        // const roleId = Cookies.get('dashboard_role_id');
        // if (roleId === '1' && user?.role_ids?.includes(1)) {
        //   await queryClient.invalidateQueries({ queryKey: ['users'] });
        //   await queryClient.refetchQueries({ queryKey: ['users'] });
        //   await new Promise((resolve) => setTimeout(resolve, 500));
        //   navigate('/admin/user-management');
        // }
        // else if (roleId === '7' && user?.role_ids?.includes(7)) {
        //   await queryClient.invalidateQueries({ queryKey: ['license-applications'] });
        //   await queryClient.refetchQueries({ queryKey: ['license-applications'] });
        //   await new Promise((resolve) => setTimeout(resolve, 500));
        //   navigate('/licensing/application-management');
        // }
      } catch (error) {
        console.error('Error refreshing data:', error);
        toast.error('Error refreshing data. Please refresh the page.');
      }
    },
    onError: (error: any) => {
      const statusCode = error?.response?.status;
      const errorCode = error?.response?.data?.code;

      if (statusCode === 413 || errorCode === 413) {
        console.error('File size error:', error);
        toast.error('Image size too large, please try again');
      } else if (errorCode === 409) {
        toast.error('Email already exists, please try again');
      }
      else if (errorCode === 420) {
        toast.error('Email unverified from AWS, please try another email');
      } else if (statusCode === 400 || errorCode === 400) {
        toast.error('Please enter a valid phone number');
      } else {
        toast.error('We couldn’t save your changes. Please try again later.');
      }
    },
  });
}
