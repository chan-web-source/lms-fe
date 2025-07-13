import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheckBig, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { LockKeyIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { forgotSchema } from '~/schema/schema';
import { useSendLink } from './hooks/use-send-link';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const sendResetLink = useSendLink();
  const navigate = useNavigate();
  const [linkSent, setLinkSent] = useState(false);
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof forgotSchema>) {
    if (sendResetLink.isPending) {
      return;
    }
    try {
      const res = await sendResetLink.mutateAsync({
        email: values.email,
      });
      if (res?.email !== '') {
        setLinkSent(true);
      } else {
        setLinkSent(false);
      }
    } catch (error: any) {
      console.error({ error });

      toast.error('That doesn’t look like a valid email');
    }
  }
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
          {linkSent ? <CircleCheckBig color="#008000" /> : <LockKeyIcon />}
        </div>

        <Heading variant="h2">{linkSent ? 'Email Sent' : 'Forgot Password'}</Heading>
        <p className="text-[20px] text-gray">
          {linkSent
            ? 'You will receive a reset link on registered email shortly'
            : 'Enter your registered email address'}
        </p>
      </div>
      {linkSent ? (
        <Button
          className="w-full cursor-pointer"
          onClick={() => {
            navigate('/auth/login');
          }}
        >
          Back to login
        </Button>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                      <Input placeholder="hello@aisocui.com" {...field} className="pl-8 h-12" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              // disabled={signin.isPending}
              // loading={signin.isPending}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default ForgotPassword;
