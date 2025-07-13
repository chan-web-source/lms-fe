import { Outlet } from 'react-router';
import RoleGuardLayout from '../role-guard-layout';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/app-sidebar';

export default function UserLayout() {
  return (
    <RoleGuardLayout
      allowedRoles={[
        'admin',
        'license-user',
        'ceo',
        'compliance',
        'peer',
        'legal',
        'licensing',
        'supervision',
        'investigation',
        'secretariat',
        'publication',
      ]}
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="my-1.75 mx-5">
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </RoleGuardLayout>
  );
}
