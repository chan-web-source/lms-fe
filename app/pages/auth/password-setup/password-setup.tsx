import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SquareLockIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import PasswordInput from '~/components/ui/password-input-2';
import ResetLinkExpired from './components/reset-link-expired';
import { toast } from 'react-toastify';
import { usePasswordSetup } from './hooks/use-password-setup';
import ResetSuccess from './components/reset-success';

const PasswordSetup = () => {
  const passwordSetup = usePasswordSetup();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const [isReset, setIsReset] = useState(false);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (type === 'reset') {
      setPageTitle('Reset Password');
    } else if (type === 'new') {
      setPageTitle('Set New Password');
    } else {
      setPageTitle('Forgot Password');
    }
  }, [type]);

  if (!email || !token || isLinkInvalid) {
    return <ResetLinkExpired />;
  }

  if (isReset) {
    return <ResetSuccess />;
  }
  const resetPassword = async (password: string) => {
    try {
      const res = await passwordSetup.mutateAsync({
        email: email,
        new_password: password,
        token,
      });
      if (res.id) {
        setIsReset(true);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;

      if (
        message?.includes('expired') ||
        message?.includes('unauthorized') ||
        message?.includes('invalid')
      ) {
        setIsLinkInvalid(true);
      }

      toast.error(message || 'Failed to reset password. Please try again.');
    }
  };
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
          <SquareLockIcon />
        </div>

        <Heading variant="h2">{pageTitle}</Heading>
        <p className="text-[20px] text-gray">
          Create a strong password to keep your account secure.
        </p>
      </div>
      <PasswordInput onSubmit={resetPassword} />
    </>
  );
};

export default PasswordSetup;
