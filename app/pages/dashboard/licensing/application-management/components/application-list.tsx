import { X } from 'lucide-react';

import { DataTable } from '~/components/data-table';
import { Badge } from '~/components/ui/badge';
import { useMemo, useState } from 'react';
import NoApplicationImage from '~/assets/images/no-applications.png';
import { useGetApplications, type GetApplicationsParams } from '../hooks/get-applications';
import { initialFilters } from '../types/initialfilter';
import { useDebounce } from '~/hooks/use-debaunce';
import { FilterSidebarDropdown } from './filter-modal';
import useTableFIlter from '~/hooks/use-table-filters';
import { getApplicationColumns } from './application-columns';
import { CreateNewApplicationDropdown } from './create-application-dropdown';
import { useAuth } from '~/providers/AuthProvider';
import { toast } from 'react-toastify';
import type { Application } from '../types/api';
import { useNavigate } from 'react-router';
import { encryptHelper } from '~/lib/encrypt-helper';
import Cookies from 'js-cookie';

function ApplicationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] ">
      <img src={NoApplicationImage} alt="No Application" className="w-34 h-34 mb-4" />
      <h2 className="text-lg font-medium text-[#6B7280] mb-4">
        No in-progress applications at the moment
      </h2>
    </div>
  );
}

function ApplicationList() {
  const applicationColumns = getApplicationColumns();
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const { user } = useAuth();
  const isExternalLicenseUser = user?.role_ids.includes(2);
  const navigate = useNavigate();
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
  } = useTableFIlter({
    defaultOrderBy: 'days_remaining',
    defaultOrderDir: 'asc'
  });
  const debouncedSearch = useDebounce(search, 300);

  const queryParams: GetApplicationsParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      order_by: orderBy,
      order_dir: orderDir,
      page: page,
      per_page: perPage,
      application_status: (appliedFilters['Application Status'] as string[])?.join(',') || undefined,
      regulated_activity: (appliedFilters['Regulated Activity'] as string[])?.join(',') || undefined,
      application_type: (appliedFilters['Application Type'] as string[])?.join(',') || undefined,
    }),
    [appliedFilters, debouncedSearch, orderBy, orderDir, page, perPage],
  );

  const { data: applicationData, isLoading } = useGetApplications(queryParams);

  const applications = applicationData?.data ?? [];
  const totalPage = applicationData?.total_pages ?? 1;

  const handleRowClick = (application: Application) => {
    // allow access only for admin or licensing user or external user
    if (!user?.role_ids?.some((roleId) => [1, 2, 7].includes(roleId))) {
      toast.error('You do not have permission to view this applications.');
      return;
    }

    // if application_status is "Draft" then redirect to create application
    if (application.application_status === 'Draft') {
      Cookies.set('application_draft', application.id?.toString() ?? '');
      navigate(`/licensing/application-management/grant-applications`);
      return;
    }

    // redirect to view application if application type = “application of grant”  and “application for renewal”
    if (
      application.application_type.toLocaleLowerCase() === 'application for grant' ||
      application.application_type.toLocaleLowerCase() === 'application for renewal'
    ) {
      const encryptedApplicationId = encryptHelper.encrypt(
        Cookies.get('auth_token') ?? '',
        application.id?.toString() ?? '',
      );
      // queryClient.invalidateQueries({ queryKey: ['application-draft', application.id] });
      // queryClient.invalidateQueries({
      //   queryKey: [`/license-applications/${application.id}/logs`]
      // });
      navigate(`/licensing/application-management/view-application/${encryptedApplicationId}`);
    }
  };

  console.log(user?.role_ids, '==rr')
  return (
    <div className="bg-white p-5 rounded-t-3xl">
      <DataTable
        tableTitle={isExternalLicenseUser ? "My Applications" : "List of Applications"}
        onSearch={setSearch}
        isLoading={isLoading}
        columns={applicationColumns}
        data={applications}
        sorting={sorting}
        pagination={pagination}
        pageCount={totalPage}
        onSortingChange={setSorting}
        onPaginationChange={setPagination}
        handleRowAction={handleRowClick}
        titleContent={
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(appliedFilters).map(([key, values]) =>
              values.map((val) => (
                <Badge
                  key={`${key}-${val}`}
                  variant="outline"
                  className="text-[14px] text-gray-800 p-3 rounded-full flex items-center gap-1 min-w-[187px] h-[44px]"
                >
                  <span className="truncate">{`${key}: ${val}`}</span>
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
            <CreateNewApplicationDropdown />
          </>
        }
        emptyDataComponent={<ApplicationEmptyState />}
      />
    </div>
  );
}

export default ApplicationList;
