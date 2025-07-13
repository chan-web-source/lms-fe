import { useApiPost } from "~/hooks/useApi";
import type { ApiResponse } from "~/lib/axios";
import type { VerifyOtp } from "../types/api";
import Cookies from "js-cookie";

export function useVerifyOtp() {
	const mfaToken = Cookies.get("mfa_token")
	return useApiPost<ApiResponse<{ jwt: string }>, VerifyOtp>(
		"/auth/verify-otp",
		{
			axiosConfig: {
				headers: {
					Authorization: `Bearer ${mfaToken}`,
				},
			},
		}
	);
}