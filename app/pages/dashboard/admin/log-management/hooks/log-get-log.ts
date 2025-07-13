import { useApiGet, type APIGetOption } from '~/hooks/useApi';
import type { ApiResponse } from '~/lib/axios';
import type { GetLogsParams, Log } from '../types/api';

export function useGetLogs(params: GetLogsParams, options?: APIGetOption) {
  const filteredParams = Object.fromEntries(
    Object.entries(params)
      .filter(([_, val]) => val !== undefined && val !== null && val !== '')
      .map(([key, val]) => [key, String(val)]),
  );

  const queryString = new URLSearchParams(filteredParams).toString();

  const queryKey: string[] = ['logs', queryString];

  const endpoint = `/logs?${queryString}`;

  return useApiGet<ApiResponse<Log[]>>(queryKey, endpoint, options);
}
