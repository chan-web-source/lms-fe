import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import Heading from '~/components/typography/heading';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { UsersIconRound } from '~/assets/icons';
import { useSignIn } from '../hooks/use-login';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { formSchema } from '~/schema/schema';
import type z from 'zod';
import { useNavigate } from 'react-router';

const LoginForm = ({ onNext }: { onNext: () => void }) => {
  const signin = useSignIn();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (signin.isPending) {
      return;
    }
    try {
      const res = await signin.mutateAsync({ email: values.email, password: values.password });
      if (res.mfa) {
        Cookies.set('mfa_token', res.jwt ?? '');
      }
      onNext();
      // router.push(DASHBOARD_ROUTES.DASHBOARD);
    } catch (error: any) {
      console.error(error);

      toast.error(
        'Incorrect username or password, please email help@scpng.gov.pg for assistance to reset your password.',
      );
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#F7F7F7] mb-4 ml-4">
          <UsersIconRound />
        </div>

        <Heading variant="h2">Login to your account</Heading>
        <p className="text-[20px] text-gray">Secure sign-in to access your dashboard</p>
      </div>
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

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-0">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••••••"
                      {...field}
                      className="pl-8 pr-10 h-12"
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p
            className="text-med text-right text-red my-6 cursor-pointer underline font-medium hover:no-underline"
            onClick={() => {
              navigate('/auth/forgot-password');
            }}
          >
            Forgot password?
          </p>
          <Button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-br from-[#2F3E46] via-[#354F52] to-[#52796F]"
            disabled={signin.isPending}
            loading={signin.isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
