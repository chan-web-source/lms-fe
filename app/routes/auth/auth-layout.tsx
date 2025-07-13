import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getRedirectPathFromRoleIds } from '~/lib/utils';
import LoginLayout from '~/pages/auth/components/login-layout';
import { useAuth } from '~/providers/AuthProvider';

export default function AuthLayoutRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.first_name) {
      const redirectPath = getRedirectPathFromRoleIds(user.role_ids ?? []);
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  return (
    <LoginLayout>
      <Outlet />
    </LoginLayout>
  );
}
