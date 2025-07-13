import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';

interface UserTableReturn {
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  orderBy: string;
  orderDir: 'desc' | 'asc';
  page: number;
  perPage: number;
}

interface TableFilterConfig {
  defaultOrderBy?: string;
  defaultOrderDir?: 'desc' | 'asc';
}

const useTableFIlter = (config: TableFilterConfig = {}): UserTableReturn => {
  const { defaultOrderBy = 'created_at', defaultOrderDir = 'desc' } = config;
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([{ id: defaultOrderBy, desc: defaultOrderDir === 'desc' }]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const sortingData = sorting?.[0];
  const orderBy = sortingData?.id ?? 'created_at';
  const orderDir = sortingData?.desc ? 'desc' : 'asc';
  const page = pagination.pageIndex + 1;
  const perPage = pagination.pageSize;
  return {
    sorting,
    setSorting,
    pagination,
    setPagination,
    setSearch,
    search,
    orderBy,
    orderDir,
    page,
    perPage,
  };
};

export default useTableFIlter;
