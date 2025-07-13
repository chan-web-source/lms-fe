import Cookies from 'js-cookie';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  AdminDashboardIcon,
  LogManagementIcon,
  LogoutIcon,
  NotificationsIcon,
  SecuritySettingsIcon,
  UserManagementIcon,
  UsersIconRound,
  UnitLeftPanelIcon,
} from '~/assets/icons';
import Logo from '~/assets/logo.png';
import type { Location } from 'react-router-dom';
import { dashboardOptions } from '~/lib/user-management-data';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '~/components/ui/sidebar';
import { useAuth } from '~/providers/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const data = [
  {
    title: 'Admin Dashboard',
    icon: <AdminDashboardIcon />,
    dashboardRoleId: ['1'], //role_id
    // url: '#',
  },
  {
    title: 'User Management',
    icon: <UserManagementIcon />,
    url: '/admin/user-management',
    dashboardRoleId: ['1'], //role_id
  },
  {
    title: 'Security Settings',
    icon: <SecuritySettingsIcon />,
    url: '#',
    dashboardRoleId: ['1'], //role_id
  },
  {
    title: 'Log Management',
    icon: <LogManagementIcon />,
    url: '/admin/log-management',
    dashboardRoleId: ['1'], //role_id
  },
  {
    title: 'Licensing Dashboard',
    icon: <AdminDashboardIcon />,
    dashboardRoleId: ['7', '2'], //role_id
    // url: '#',
  },
  {
    title: 'Application',
    icon: <UnitLeftPanelIcon />,
    url: '/licensing/application-management',
    dashboardRoleId: ['7', '2'], //role_id
  },
];

function isProfileLinkActive(location: Location) {
  return location.pathname === '/user/my-profile';
}

function isNotificationLinkActive(location: Location) {
  return (
    location.pathname === '/user/view-notification' || location.pathname === '/user/notification'
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user } = useAuth();
  const [dashboardRoleId, setDashboardRoleId] = useState(Cookies.get('dashboard_role_id'));
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const logoutHandle = () => {
    Cookies.remove('auth_token');
    Cookies.remove('application_draft');
    Cookies.remove('corporation_id');
    Cookies.remove('capital_market_id');
    Cookies.remove('individual_id');
    toast.info('Your session expired. You’ve been logged out.');
    navigate('/auth/login');
    setUser(null);
  };

  const handleMyProfile = () => {
    navigate('/user/my-profile');
  };
  const handleNotification = () => {
    navigate('/user/notification');
  };

  useEffect(() => {
    const dashboardRoleId = Cookies.get('dashboard_role_id');
    setDashboardRoleId(dashboardRoleId);
  }, []);

  return (
    <Sidebar
      className="m-1.75 border-none rounded-2xl overflow-hidden p-5 pb-4"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="mb-8">
        <SidebarMenu className="flex flex-row justify-between items-center">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3 px-0 hover:bg-transparent">
              <img src={Logo} alt="Logo" className="w-15 h-auto" />
              <div className="leading-tight text-[16px] font-medium">
                LMS <br /> Licensing
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarTrigger className="size-6" />
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="flex flex-col gap-1">
        <SidebarMenu>
          {data
            .filter((item) => item.dashboardRoleId?.includes(dashboardRoleId ?? ''))
            .map((item, index) => {
              const isActive = location.pathname.includes(item.url ?? '/NA/');
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    className="py-7 px-3"
                    onClick={() => item.url && navigate(item.url)}
                  >
                    <span className="size-5">{item.icon}</span>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto pb-4">
        <SidebarMenu>
          {/* Dashboard Options Hoverable List */}
          <SidebarMenuItem>
            <DropdownMenu open={profileDropdownOpen} onOpenChange={setProfileDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="justify-start"
                  isActive={isProfileLinkActive(location)}
                  onClick={handleMyProfile}
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <UsersIconRound />
                  My Profile
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {user?.role_ids?.includes(1) && user?.role_ids?.includes(7) && (
                <DropdownMenuContent
                  align="start"
                  side="top"
                  sideOffset={4}
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  {dashboardOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => {
                        setDashboardRoleId(option.id.toString());
                        Cookies.set('dashboard_role_id', option.id.toString());
                        navigate(option.route);
                      }}
                      className={
                        dashboardRoleId === option.id.toString() ? 'bg-muted text-yellow-900' : ''
                      }
                    >
                      {option.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            <SidebarMenuButton
              className="justify-start"
              onClick={handleNotification}
              isActive={isNotificationLinkActive(location)}
            >
              <NotificationsIcon />
              Notifications
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="justify-start"
              onClick={() => {
                logoutHandle();
              }}
            >
              <LogoutIcon />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
