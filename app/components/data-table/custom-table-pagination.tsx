import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '~/lib/utils';

interface PaginationProps<T> {
  table: Table<T>;
  isLoading?: boolean;
}

function getPaginationRange(current: number, total: number) {
  const delta = 2;
  const range = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }

  if (current - delta > 2) range.unshift('...');
  if (current + delta < total - 1) range.push('...');

  range.unshift(1);
  if (total > 1) range.push(total);

  return range;
}

function TablePagination<T>({ table, isLoading = false }: PaginationProps<T>) {
  const pageIndex = table.getState().pagination?.pageIndex ?? 0;
  const pageSize = table.getState().pagination?.pageSize ?? 10;
  const pageCount = table.getPageCount();
  const paginationRange = getPaginationRange(pageIndex + 1, pageCount);

  return (
    <div className="flex items-center justify-between gap-4 px-2 py-3">
      {/* Page info */}
      <div className="text-sm text-[#444955] whitespace-nowrap">
        {isLoading ? (
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
        ) : (
          <>
            Page <span className="text-foreground">{pageIndex + 1}</span> of{' '}
            <span className="text-foreground">{pageCount}</span>
          </>
        )}
      </div>

      {/* Page controls */}
      {isLoading ? (
        <div className="flex gap-1 border rounded-lg px-4 py-2">
          <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
        </div>
      ) : (
        <Pagination>
          <PaginationContent className="flex border rounded-lg">
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="border-0  h-8 bg-transparent border-r rounded-none"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronFirstIcon size={16} />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="border-0 h-8 bg-transparent rounded-none"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon size={16} />
              </Button>
            </PaginationItem>

            {paginationRange.map((page, index) => {
              return typeof page === 'string' ? (
                <PaginationItem className="border-l h-full px-3 flex items-center" key={index}>
                  <span className="text-sm text-muted-foreground  ">…</span>
                </PaginationItem>
              ) : (
                <PaginationItem
                  role="button"
                  className={cn(
                    'px-4 py-[6px] hover:bg-[#F5F7FA] flex justify-center cursor-pointer border-l items-center',
                    {
                      'bg-[#F5F7FA]': pageIndex + 1 === page,
                      'border-r': index === paginationRange.length - 1,
                    },
                  )}
                  onClick={() => table.setPageIndex(page - 1)}
                  key={index}
                >
                  {page}
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="border-0  h-8 bg-transparent  rounded-none text-[#444955]"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="border-0  h-8 bg-transparent border-l rounded-r-lg rounded-none text-[#444955]"
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronLastIcon size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Rows per page */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {isLoading ? (
          <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
        ) : (
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 text-outline-btn-color">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}

export default TablePagination;
