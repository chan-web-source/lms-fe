import type { ColumnDef } from '@tanstack/react-table';
import type { Role, Users } from '../types/api';
import { useCallback } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Checkbox } from '~/components/ui/checkbox';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import NoImgIcon from '~/assets/images/no-img-icon.jpg';
import { CircleCheck, CircleX, MoreVertical } from 'lucide-react';

import { EditIcon, UserSettingsIcon, UserTimeIcon, ViewIcon } from '~/assets/icons';
import LicenseMaintenance from '~/assets/icons/license-maintenance';
import type { useNavigate } from 'react-router';
import { encryptHelper } from '~/lib/encrypt-helper';
import Cookies from 'js-cookie';
import type { AuthUser } from '~/types/Auth';

export function getUserColumns(
  navigate: ReturnType<typeof useNavigate>,
  roles: Role[],
  onDelete: (id: number) => void,
  user?: AuthUser | undefined,
): ColumnDef<Users>[] {
  return [
    {
      accessorKey: 'first_name',
      header: ({ table }) => (
        <div className="flex gap-2.5">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <span>User</span>
        </div>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const user = row.original;
        const getAvatarUrl = useCallback((photoUrl: string | undefined) => {
          if (!photoUrl) return NoImgIcon;
          const url = new URL(photoUrl);
          url.searchParams.set('_t', Date.now().toString());
          return url.toString();
        }, []);
        const avatarUrl = getAvatarUrl(user?.photo);
        return (
          <div className="flex gap-2.5 items-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  className="size-10 object-cover"
                  alt={user.first_name}
                  src={avatarUrl}
                />
                <AvatarFallback className="uppercase">
                  {user.first_name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-[#17181C] mb-0.5">
                  {user.first_name} {user.surname}
                </div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </div>
          </div>
        );
      },
      size: 268,
    },
    {
      accessorKey: 'division',
      header: 'Division',
      cell: ({ row }) => <div>{row.original.division}</div>,
      size: 142,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const roleIds = row.original?.role_ids || [];

        const badges = roleIds.map((roleId) => {
          const role = roles?.find((r) => r.id === roleId);
          if (!role) return null;

          const roleName = role.name;

          return (
            <Badge
              key={roleId}
              variant="outline"
              className="text-sm flex gap-1 items-center py-2 px-3 rounded-full leading-3.5 font-light"
            >
              <LicenseMaintenance svgProps={{ className: 'w-4 h-4', stroke: '#803600' }} />
              {roleName}
            </Badge>
          );
        });

        return <div className="flex flex-wrap gap-2"> {badges.length > 0 ? badges : '-'}</div>;
      },
      size: 142,
    },

    {
      accessorKey: 'account_status',
      header: () => (
        <Button variant="ghost" className="p-0 font-light">
          Account Status
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const status = row.original.account_status;
        const isActive = status === 'Active';
        return (
          <Badge
            className="text-sm flex gap-1 items-center py-2 px-3 rounded-full font-light text-[#444955]"
            variant="outline"
          >
            {isActive ? (
              <CircleCheck className="size-5 text-white fill-[#438002]" />
            ) : (
              <CircleX className="size-5 text-white fill-[#803600]" />
            )}
            {status}
          </Badge>
        );
      },
      size: 142,
    },
    {
      accessorKey: 'account_type',
      header: () => (
        <Button variant="ghost" className="p-0 font-light">
          Account Type
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const type = row.original.account_type;
        const Icon = type === 'Internal' ? UserSettingsIcon : UserTimeIcon;
        return (
          <Badge
            className="text-sm flex gap-1 items-center py-2 px-3 rounded-full leading-3.5 font-light"
            variant="outline"
          >
            <Icon svgProps={{ className: 'size-4  text-[#94770F]' }} />
            {type}
          </Badge>
        );
      },
      size: 142,
    },
    {
      accessorKey: 'last_login',
      header: () => (
        <Button variant="ghost" className="p-0 font-light">
          Last Login
        </Button>
      ),
      sortUndefined: 'last',
      sortDescFirst: true,
      enableSorting: true,
      cell: ({ row }) => {
        const timestamp = row.original.last_login;

        if (!timestamp) {
          return <span className="text-sm text-muted">-</span>;
        }
        const date = new Date(timestamp);

        const pad = (n: number) => n.toString().padStart(2, '0');
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const formatted = `${pad(date.getDate())} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return <span className="text-sm">{formatted ? formatted : '-'}</span>;
      },
      size: 142,
    },

    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const encryptedId =
          encryptHelper.encrypt(Cookies.get('auth_token') ?? '', row?.original?.id) ?? '';

        const handleView = () => {
          navigate(`/admin/user-management/view-user/${encryptedId}`);
        };

        const handleEdit = () => {
          navigate(`/admin/user-management/edit-user/${encryptedId}`);
        };

        return !user?.role_ids?.includes(1) ? (
          <></>
        ) : (
          <div className="flex justify-end gap-2">
            <Button
              className="cursor-pointer"
              size="icon"
              variant="ghost"
              onClick={handleView}
              title="View User"
            >
              <ViewIcon svgProps={{ className: 'size-5' }} />
            </Button>
            <Button
              className="cursor-pointer"
              size="icon"
              variant="ghost"
              onClick={handleEdit}
              title="Edit User"
            >
              <EditIcon svgProps={{ className: 'size-5' }} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onDelete(row.original.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
