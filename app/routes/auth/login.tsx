import { Login } from '~/pages/auth/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { getRedirectPathFromRoleIds } from '~/lib/utils';

export default function LoginRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.first_name) {
      const redirectPath = getRedirectPathFromRoleIds(user.role_ids ?? []);
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  return <Login />;
}
