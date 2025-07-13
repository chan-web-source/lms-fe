import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type TableOptions,
} from '@tanstack/react-table';

import { Table } from '../ui/table';
import CustomTableHeader from './custom-table-header';
import TablePagination from './custom-table-pagination';
import CustomTableBody from './custom-table-body';
import TableFilter from './table-filter';
import { useState } from 'react';
import Heading from '../typography/heading';

interface ClassNames {
  headerClassName: string;
  bodyClassName: string;
}

interface DataTableProps<T> {
  filterKey?: string;
  tableTitle?: string;
  data: T[];
  columns: ColumnDef<T, any>[];
  options?: Omit<TableOptions<T>, 'data' | 'columns' | 'getCoreRowModel'>;
  isPagination?: boolean;
  isFilter?: boolean;
  actions?: React.ReactNode;
  titleContent?: React.ReactNode;
  isLoading?: boolean;
  sorting?: SortingState;
  manualSorting?: boolean;
  pagination?: PaginationState;
  pageCount?: number;
  rowActionColumnCellIndex?: number;
  emptyDataComponent?: React.ReactNode;
  classNames?: Partial<ClassNames>;
  onSearch?: (value: string) => void;
  onSortingChange?: OnChangeFn<SortingState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  handleRowAction?: (row: T) => void;
}

function DataTable<T>({
  tableTitle,
  data = [],
  columns = [],
  isPagination = true,
  isFilter = true,
  actions,
  titleContent,
  manualSorting = true,
  onSearch,
  isLoading,
  sorting = [],
  pagination = { pageIndex: 0, pageSize: 10 },
  pageCount = 1,
  onSortingChange,
  onPaginationChange,
  emptyDataComponent,
  handleRowAction,
  rowActionColumnCellIndex,
  classNames,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    manualSorting,
    enableGlobalFilter: true,
    manualPagination: true,
    pageCount,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    onPaginationChange: onPaginationChange,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      {/* {tableTitle &&
        <div className="flex md:flex-row md:justify-between md:items-center flex-col gap-2 md:gap-0 justify-start items-start">
          <Heading className="font-medium whitespace-nowrap">{tableTitle}</Heading>
          <div className="flex flex-row gap-2 items-center w-full md:max-w-[calc(100%-200px)] md:justify-end max-w-[100%] justify-start">
            {isFilter && <TableFilter table={table} onSearch={onSearch || (() => { })} />}
            {actions}
          </div>
        </div>} */}
      {isFilter && (
        <div className="flex md:flex-row md:justify-between md:items-center flex-col gap-2 md:gap-0 justify-start items-start">
          <Heading className="font-medium whitespace-nowrap">{tableTitle}</Heading>
          <div className="flex flex-row gap-2 items-center w-full md:max-w-[calc(100%-200px)] md:justify-end max-w-[100%] justify-start">
            {isFilter && <TableFilter table={table} onSearch={onSearch || (() => {})} />}
            {actions}
          </div>
        </div>
      )}
      {titleContent ?? titleContent}
      {/* Table */}
      {emptyDataComponent && data.length == 0 && !isLoading ? (
        emptyDataComponent
      ) : (
        <div className="bg-background overflow-hidden">
          <Table className="table-fixed text-[#444955]">
            <CustomTableHeader className={classNames?.headerClassName} table={table} />
            <CustomTableBody
              className={classNames?.bodyClassName}
              table={table}
              totalColumn={columns.length}
              isLoading={isLoading}
              handleRowAction={handleRowAction}
              rowActionColumnCellIndex={rowActionColumnCellIndex}
            />
          </Table>
        </div>
      )}
      {isPagination && <TablePagination table={table} isLoading={isLoading} />}
    </div>
  );
}

export default DataTable;
