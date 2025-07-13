import { useApiPost } from "~/hooks/useApi";
import type { ApiResponse } from "~/lib/axios";
import type { SignInDto } from "../types/api";


export function useSignIn() {
  return useApiPost<ApiResponse<{ jwt: string, mfa: boolean }>, SignInDto>("/auth/login");
}
