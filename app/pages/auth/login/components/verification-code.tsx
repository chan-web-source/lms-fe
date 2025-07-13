import React, { useState } from 'react';
import { VerificationIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp';
import { useVerifyOtp } from '../hooks/use-verify-otp';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import type { AuthUser } from '~/types/Auth';
import { useAuth } from '~/providers/AuthProvider';
import { getRedirectPathFromRoleIds } from '~/lib/utils';

interface MFATokenPayload {
  email: string;
}
const VerificationCode = ({ onBack, goFirst }: { onBack: () => void; goFirst: () => void }) => {
  const verifyOtp = useVerifyOtp();
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const token = Cookies.get('mfa_token');
  let decodedEmail = '';

  if (token) {
    try {
      const decoded = jwtDecode<MFATokenPayload>(token);
      decodedEmail = decoded?.email;
    } catch {
      decodedEmail = '';
    }
  }
  const handleComplete = async (value: string) => {
    try {
      const res = await verifyOtp.mutateAsync({
        email: decodedEmail,
        otp: value,
      });

      if (res.jwt) {
        Cookies.set('auth_token', res.jwt ?? '');
        Cookies.remove('dashboard_role_id');
        Cookies.remove('mfa_token');

        const decodedUser = jwtDecode<AuthUser>(res.jwt ?? '');
        setUser(decodedUser);
        const redirectPath = getRedirectPathFromRoleIds(decodedUser.role_ids ?? []);
        toast.success('Login Successful');

        setTimeout(() => {
          navigate(redirectPath || '/', { replace: true });
        }, 1000);
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || '';
      if (status === 429 || message.toLowerCase().includes('quota exceeded')) {
        toast.error(
          'Your account is temporarily locked due to multiple failed attempts. Please email help@scpng.gov.pg.',
        );
        goFirst();
      } else if (message.toLowerCase().includes('otp')) {
        toast.error('Incorrect OTP. Please try again.');
      } else {
        toast.error(message || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#F7F7F7] mb-4 ml-4">
          <VerificationIcon />
        </div>

        <Heading variant="h2">Enter Verification Code</Heading>
        <p className="text-[20px] text-gray">
          We've sent a code to <span className="text-red">{decodedEmail}</span>
        </p>
      </div>
      {/* Input fields */}
      <div className="my-6 flex justify-start ">
        <InputOTP maxLength={4} value={otp} onChange={setOtp} onComplete={handleComplete}>
          <InputOTPGroup className="gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-32 h-16 text-[24px] font-medium rounded-[10px] border border-gray-200 focus-visible:ring-yellow-600 focus-visible:border-yellow-600"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button className="w-full cursor-pointer" loading={verifyOtp.isPending}>
        Confirm
      </Button>

      {/* Resend */}
      <p className="mt-6 text-sm text-gray-500 text-center flex flex-col">
        Experiencing issues receiving the code?
        <button
          className="text-red font-medium hover:underline mt-1 cursor-pointer"
          onClick={onBack}
        >
          Resend code
        </button>
      </p>
    </div>
  );
};

export default VerificationCode;
