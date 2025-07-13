import { useCallback, useMemo, useState } from 'react';
import { CircleArrowDown, X } from 'lucide-react';

import { DataTable } from '~/components/data-table';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';

import { useGetLogs } from '../hooks/log-get-log';
import { useGetUsers } from '../../user-management/hooks/user-get-users';

import { ActionFilterDropdown } from './action-filter-dropdown';
import { UserFilterDropdown } from './user-filter-dropdown';
import { DateRangePopover } from '~/components/ui/date-picker';

import { logfilters } from '../../user-management/types/initialfilter';
import { DownloadLogModal } from './download-modal';
import { toast } from 'react-toastify';
import useTableFIlter from '~/hooks/use-table-filters';
import { logColumns } from './log-columns';
import { handleDownload } from '~/lib/utils';
import { ModuleFilterDropdown } from './module-filter-dropdown';
import omit from 'lodash/omit';

export default function LogManagement() {
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState(logfilters);

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

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const { data: usersResponse } = useGetUsers();
  const allUsers = usersResponse?.data ?? [];

  const userQueries = useMemo(
    () => ({
      user_id: selectedUsers.length ? selectedUsers.join(',') : undefined,
      action: selectedActions.length ? selectedActions.join(',') : undefined,
      category: selectedModules.length ? selectedModules.join(',') : undefined,
      created_from: selectedDateRange.startDate?.toISOString(),
      created_till: selectedDateRange.endDate?.toISOString(),
      page,
      per_page: perPage,
      order_by: orderBy || 'created_at',
      order_dir: orderDir || 'desc',
      search,
    }),
    [
      orderBy,
      orderDir,
      page,
      perPage,
      search,
      selectedActions,
      selectedDateRange.endDate,
      selectedDateRange.startDate,
      selectedModules,
      selectedUsers,
    ],
  );

  const { data: logData, isLoading } = useGetLogs(userQueries);

  const { refetch: fetchDownloadLogs } = useGetLogs(
    omit({ ...userQueries, all: true }, ['page', 'per_page']),
    {
      enabled: false,
    },
  );

  const logs = useMemo(() => {
    const allLogs = logData?.data ?? [];
    return allLogs;
  }, [logData]);

  const pageCount = logData?.total_pages ?? 1;

  const columns = logColumns({
    selectedUsers,
    selectedActions,
    selectedModules,
  });

  const handleOnSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setPagination((pre) => ({ ...pre, pageIndex: 0 }));
    },
    [setSearch, setPagination],
  );

  return (
    <div className="bg-white p-5 rounded-t-3xl">
      <DataTable
        columns={columns}
        isLoading={isLoading}
        pageCount={pageCount}
        data={logs}
        tableTitle="Log Activity"
        onSearch={handleOnSearch}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        titleContent={
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(appliedFilters).map(([key, values]) =>
                values.map((val) => {
                  const displayValue =
                    key === 'User'
                      ? allUsers.find((user) => String(user.id) === val)?.first_name || val
                      : val;

                  return (
                    <Badge
                      key={`${key}-${val}`}
                      variant="outline"
                      className="text-[14px] text-gray-800 p-3 rounded-full flex items-center gap-1 py-4 h-[44px]"
                    >
                      <span className="truncate">{`${key} = ${displayValue}`}</span>
                      <button
                        onClick={() => {
                          setAppliedFilters((prev) => ({
                            ...prev,
                            [key]: prev[key as keyof typeof prev].filter((v) => v !== val),
                          }));

                          if (key === 'User') {
                            setSelectedUsers((prev) => prev.filter((u) => u !== val));
                          } else if (key === 'Action') {
                            setSelectedActions((prev) => prev.filter((a) => a !== val));
                          } else if (key === 'Date') {
                            setSelectedDateRange({ startDate: null, endDate: null });
                          } else if (key === 'Module') {
                            setSelectedModules((prev) => prev.filter((m) => m !== val));
                          }
                          setPagination((pre) => ({ ...pre, pageIndex: 0 }));
                        }}
                        className="ml-1 text-[#444955] cursor-pointer"
                      >
                        <X className="w-[16px] h-[16px]" />
                      </button>
                    </Badge>
                  );
                }),
              )}
            </div>
          </>
        }
        actions={
          <>
            <ActionFilterDropdown
              selectedActions={selectedActions}
              setSelectedActions={(actions) => {
                setSelectedActions(actions);
                setAppliedFilters((prev) => ({
                  ...prev,
                  Action: actions,
                }));
              }}
            />

            <UserFilterDropdown
              allUsers={allUsers.map((user) => ({
                id: String(user.id),
                first_name: user.first_name,
                surname: user.surname,
                avatar: user.avatar ?? '/placeholder-user.png',
              }))}
              selectedUsers={selectedUsers}
              setSelectedUsers={(users) => {
                setSelectedUsers(users);
                setAppliedFilters((prev) => ({
                  ...prev,
                  User: users,
                }));
              }}
            />

            <DateRangePopover
              onApply={(range) => {
                const start = range.startDate?.toLocaleDateString() ?? '';
                const end = range.endDate?.toLocaleDateString() ?? '';
                const formatted = start && end ? [`${start} - ${end}`] : [];

                setSelectedDateRange({
                  startDate: range.startDate ?? null,
                  endDate: range.endDate ?? null,
                });

                setAppliedFilters((prev) => ({
                  ...prev,
                  Date: formatted,
                }));
                setPagination((pre) => ({ ...pre, pageIndex: 0 }));
              }}
            />

            <ModuleFilterDropdown
              selectedModules={selectedModules}
              setSelectedModules={(modules) => {
                setSelectedModules(modules);
                setAppliedFilters((prev) => ({
                  ...prev,
                  Module: modules,
                }));
              }}
            />

            <Button
              variant={'secondary'}
              className={`text-white  text-[14px] py-2.75 px-1.75 leading-1.1 h-9 ${
                !selectedDateRange.startDate || !selectedDateRange.endDate
                  ? 'cursor-not-allowed bg-[#DEDEDE] !important'
                  : 'bg-[linear-gradient(to_right,#9B7C0D,#EDCA4E)]'
              }`}
              onClick={() => {
                if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
                  toast.warning('Please apply filters');
                  return;
                }
                setIsDownloadModalOpen(true);
              }}
              disabled={!selectedDateRange.startDate || !selectedDateRange.endDate}
            >
              <CircleArrowDown className="mr-1" />
              Download
            </Button>
          </>
        }
      />

      <DownloadLogModal
        open={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={async (format) => {
          const result = await fetchDownloadLogs();
          const allLogs = result.data?.data ?? [];
          handleDownload(format, allLogs);
          setIsDownloadModalOpen(false);
        }}
      />
    </div>
  );
}
