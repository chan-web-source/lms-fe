import React from 'react';
import { useNavigate } from 'react-router';
import { UnlinkIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';

const ResetLinkExpired = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
          <UnlinkIcon />
        </div>

        <Heading variant="h2">Reset Link Expired</Heading>
        <p className="text-[20px] text-gray">
          This password reset link has expired. For your security, reset links are only valued for
          24 hours. Please request a new password reset to proceed.
        </p>
      </div>
      <Button
        type="submit"
        className="w-full cursor-pointer"
        onClick={() => {
          navigate('/auth/login');
        }}
      >
        Back to Login
      </Button>
    </>
  );
};

export default ResetLinkExpired;
