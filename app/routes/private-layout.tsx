import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { getRedirectPathFromRoleIds } from '~/lib/utils';
import LoaderOne from '~/components/ui/loader-one';

export default function PrivateLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user === undefined) return;

    if (!user?.first_name) {
      navigate('/auth/login', { replace: true });
      return;
    }

    if (location.pathname === '/') {
      const redirectPath = getRedirectPathFromRoleIds(user.role_ids ?? []);
      if (redirectPath && redirectPath !== '/') {
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  if (user === undefined) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <LoaderOne />
      </div>
    );
  }

  if (!user?.first_name) return null;

  return <Outlet />;
}
