import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '~/lib/axios';
import Cookies from 'js-cookie';

export type APIGetOption<T = any> = Partial<UseQueryOptions<T> & { params: object }>;

export function useApiGet<T>(key: string[], url: string, options?: APIGetOption<T>) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { params, ...rest } = options || {};
      const response = await axiosInstance.get<T>(url, { params, ...rest });
      return response.data;
    },
    ...options,
  });
}

export function useApiGetOne<TData, TVariables extends { id: string | number }>(
  url: string,
  options?: UseMutationOptions<TData, unknown, TVariables>,
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const { id } = variables;
      const getUrl = `${url}/${id}`;
      const res = await axiosInstance.get<TData>(getUrl);
      return res.data;
    },
    ...options,
  });
}

interface ApiPostConfig<TData, TVariables> {
  axiosConfig?: Record<string, any>;
  options?: UseMutationOptions<TData, unknown, TVariables>;
}

export function useApiPost<TData, TVariables>(
  url: string,
  config?: ApiPostConfig<TData, TVariables>,
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await axiosInstance.post<TData>(url, variables, config?.axiosConfig);
      return res.data;
    },
    ...config?.options,
  });
}

export function useApiPut<TData, TVariables>(
  url: string,
  options?: UseMutationOptions<TData, unknown, TVariables>,
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await axiosInstance.put<TData>(url, variables);
      return res.data;
    },
    ...options,
  });
}

export function useApiPutFormData<TData = boolean>(
  url: string,
  options?: UseMutationOptions<TData, unknown, FormData>,
) {
  return useMutation<TData, unknown, FormData>({
    mutationFn: async (formData: FormData) => {
      const id = formData.get('id');
      const putUrl = `${url}/${id}`;

      try {
        const res = await axiosInstance.put<TData>(putUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
        });
        return res.data;
      } catch (error: unknown) {
        // Optional: log full error
        console.error('PUT error:', error);

        if (axios.isAxiosError(error)) {
          const code = error.response?.data?.code ?? 500;
          console.error('Extracted error code:', code);

          // Optionally attach code to error for upper-level handling
          (error as any).code = code;
        }

        throw error;
      }
    },
    ...options,
  });
}

export function useApiDelete<TData, TVariables extends { id: string | number }>(
  url: string,
  options?: UseMutationOptions<TData, unknown, TVariables>,
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const { id } = variables;
      const deleteUrl = `${url}/${id}`;
      const res = await axiosInstance.delete<TData>(deleteUrl);
      return res.data;
    },
    ...options,
  });
}
