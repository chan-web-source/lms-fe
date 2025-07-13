import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import LoaderOne from '~/components/ui/loader-one';
import { useAuth } from '~/providers/AuthProvider';

const RoleMap: Record<number, string> = {
  1: 'admin',
  2: 'license-user',
  3: 'ceo',
  4: 'compliance',
  5: 'peer',
  6: 'legal',
  7: 'licensing',
  8: 'supervision',
  9: 'investigation',
  10: 'secretariat',
  11: 'publication',
};

function getUserRoles(roleIds: number[]): string[] {
  return roleIds.map((id) => RoleMap[id]).filter(Boolean);
}

type RoleGuardLayoutProps = {
  allowedRoles: string[];
};

export default function RoleGuardLayout({
  allowedRoles,
  children,
}: PropsWithChildren<RoleGuardLayoutProps>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (!user?.first_name) {
      navigate('/auth/login', { replace: true });
      return;
    }

    const userRoles = getUserRoles(user.role_ids);
    const hasAccess = userRoles.some((r) => allowedRoles.includes(r));

    if (!hasAccess) navigate('/unauthorized', { replace: true });
  }, [user, navigate, allowedRoles]);

  if (user === undefined)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <LoaderOne />
      </div>
    );
  const userRoles = getUserRoles(user?.role_ids || []);
  const hasAccess = userRoles.some((r) => allowedRoles.includes(r));
  if (!hasAccess) return null;

  return children;
}
