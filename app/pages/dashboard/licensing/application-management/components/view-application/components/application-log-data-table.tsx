import { DataTable } from '~/components/data-table';
import { getApplicationLogColumns } from './application-log-columns';
import useTableFIlter from '~/hooks/use-table-filters';
import type { ApplicationLog } from '../../../types/api';

interface ApplicationLogDataTableProps {
  data: ApplicationLog[];
}

export function ApplicationLogDataTable({ data }: ApplicationLogDataTableProps) {
  const logColumns = getApplicationLogColumns();

  const { sorting, setSorting } = useTableFIlter();

  // Internal sorting logic with type-safe key mapping
  const sortedData = [...data];
  if (sorting.length > 0) {
    const { id, desc } = sorting[0];
    type ApplicationLogKey = keyof ApplicationLog;
    const key = id as ApplicationLogKey;
    sortedData.sort((a, b) => {
      if (a[key] < b[key]) return desc ? 1 : -1;
      if (a[key] > b[key]) return desc ? -1 : 1;
      return 0;
    });
  }

  return (
    <DataTable
      columns={logColumns}
      data={sortedData}
      isPagination={false}
      isFilter={false}
      sorting={sorting}
      onSortingChange={setSorting}
      onSearch={() => {}}
    />
  );
}
