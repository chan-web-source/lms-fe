import axios, { type AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

export interface ApiResponse<T = any> {
  name: any;
  physical_submission_date: string;
  consultation_date: string;
  account_status?: 'Active' | 'Inactive';
  id: any;
  email: any;
  mfa: any;
  jwt: string;
  status: boolean;
  path: string;
  message?: string;
  statusCode: number;
  data?: T;
  timestamp: string;
  total_pages: number;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Set your API URL in .env
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // const ignoredPaths = ['/login', '/verify-otp', '/send-otp', '/auth/verify-token'];
    // const requestPath = error.config?.url || '';

    // const isIgnored = ignoredPaths.some((path) => requestPath.includes(path));

    // if (!isIgnored && (error.response?.status === 401 || error.response?.status === 400)) {
    //   Cookies.remove('auth_token');
    //   localStorage.clear();
    //   sessionStorage.clear();

    //   toast.info('Your session expired. You’ve been logged out.');

    //   setTimeout(() => {
    //     window.location.href = '/auth/login';
    //   }, 1000);
    // }
    return Promise.reject(error);
  },
);

export default axiosInstance;
