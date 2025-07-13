import { ChevronDown, X, CirclePlus } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { DataTable } from '~/components/data-table';
import { Badge } from '~/components/ui/badge';
import { useMemo, useState } from 'react';

import { useGetUsers, type GetUsersParams } from '../hooks/user-get-users';
import { initialFilters } from '../types/initialfilter';
import { useDebounce } from '~/hooks/use-debaunce';
import { FilterSidebarDropdown } from './filter-modal';
import useTableFIlter from '~/hooks/use-table-filters';
import { getUserColumns } from './user-columns';
import { useNavigate } from 'react-router';
import Sort from '~/assets/icons/sort-by';
import { useGetRoles } from '../hooks/use-get-roles';
import { useDeleteUser } from '../hooks/use-delete-user';
import { ConfirmDialog } from '~/components/ui/confirm-dialog';
import { encryptHelper } from '~/lib/encrypt-helper';
import Cookies from 'js-cookie';
import type { Users } from '../types/api';
import { useAuth } from '~/providers/AuthProvider';

function UserList() {
  const navigate = useNavigate();
  const { data: roleData } = useGetRoles();
  const { mutate: deleteUser } = useDeleteUser();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { user } = useAuth();
  const openDeleteConfirm = (id: number) => {
    setSelectedUserId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      deleteUser({ id: selectedUserId });
      setSelectedUserId(null);
    }
    setConfirmOpen(false);
  };

  const userColumns = getUserColumns(
    navigate,
    roleData?.data ?? [],
    openDeleteConfirm,
    user ?? undefined,
  );

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const {
    sorting,
    search,
    setPagination,
    setSearch,
    setSorting,
    pagination,
    page,
    perPage,
    orderBy,
    orderDir,
  } = useTableFIlter();

  const debouncedSearch = useDebounce(search, 300);

  const queryParams: GetUsersParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      order_by: orderBy,
      order_dir: orderDir,
      page: page,
      per_page: perPage,
      account_type: appliedFilters['Account Type'][0],
      account_status: appliedFilters['Account Status'][0],
      role_id:
        roleData?.data
          ?.filter((role) => (appliedFilters['Role'] as unknown as string[]).includes(role.name))
          .map((role) => role.id.toString())
          .join(',') || undefined,
    }),
    [appliedFilters, debouncedSearch, orderBy, orderDir, page, perPage, roleData],
  );

  const { data: userData, isLoading } = useGetUsers(queryParams);

  const users = userData?.data ?? [];
  const totalPage = userData?.total_pages ?? 1;

  const handleRowClick = (userData: Users) => {
    // chedk if is admin
    if (!user?.role_ids?.includes(1)) {
      return;
    }

    const encryptedId = encryptHelper.encrypt(
      Cookies.get('auth_token') ?? '',
      userData?.id?.toString() ?? '',
    );
    navigate(`/admin/user-management/view-user/${encryptedId}`);
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;

    const lowerSearch = debouncedSearch.toLowerCase();

    return users.filter((user) =>
      Object.entries(user).some(([, value]) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearch);
        }
        if (Array.isArray(value)) {
          return value.some((v) => v.toString().toLowerCase().includes(lowerSearch));
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowerSearch);
        }
        return false;
      }),
    );
  }, [users, debouncedSearch]);

  return (
    <>
      <div className="bg-white p-5 rounded-t-3xl">
        <DataTable
          tableTitle="List of Users"
          onSearch={setSearch}
          isLoading={isLoading}
          columns={userColumns}
          data={users}
          sorting={sorting}
          pagination={pagination}
          pageCount={totalPage}
          handleRowAction={handleRowClick}
          rowActionColumnCellIndex={userColumns.length - 1}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          titleContent={
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(appliedFilters).map(([key, values]) =>
                values.map((val) => (
                  <Badge
                    key={`${key}-${val}`}
                    variant="outline"
                    className="text-[14px] text-gray-800 p-3 rounded-full flex items-center gap-1 min-w-[187px] h-[44px]"
                  >
                    <span className="truncate">
                      {key === 'Role'
                        ? `${key}: ${
                            roleData?.data?.find((r) => r.id.toString() === val)?.name || val
                          }`
                        : `${key}: ${val}`}
                    </span>
                    <button
                      onClick={() => {
                        setAppliedFilters((prev) => ({
                          ...prev,
                          [key]: prev[key as keyof typeof prev].filter((v) => v !== val),
                        }));
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [key]: prev[key as keyof typeof prev].filter((v) => v !== val),
                        }));
                      }}
                      className="ml-1 text-gray-500 hover:text-gray-500 cursor-pointer"
                    >
                      <X className="w-[16px] h-[16px]" />
                    </button>
                  </Badge>
                )),
              )}
            </div>
          }
          actions={
            <>
              <FilterSidebarDropdown
                selected={selectedFilters}
                setSelected={setSelectedFilters}
                setAppliedFilters={setAppliedFilters}
                onApply={() => setAppliedFilters({ ...selectedFilters })}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-2 bg-white hover:bg-white" variant="outline">
                    <Sort />
                    Sort by <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['asc', 'desc'].map((dir) => (
                    <DropdownMenuItem
                      key={dir}
                      onClick={() => {
                        const column = orderBy || 'first_name';
                        setSorting([{ id: column, desc: dir === 'desc' }]);
                      }}
                      className="flex justify-between"
                    >
                      <span>{dir.toUpperCase()}</span>
                      {orderDir === dir && (
                        <span className="text-xs text-muted-foreground">
                          {dir === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                className="p-2 text-[14px]"
                onClick={() => {
                  navigate('/admin/user-management/create-user');
                }}
              >
                <CirclePlus />
                Create new user
              </Button>
            </>
          }
        />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action is irreversible and all associated data will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default UserList;
