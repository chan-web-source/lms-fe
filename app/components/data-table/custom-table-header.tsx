import { flexRender, type Table } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '~/lib/utils';
import Sorting from '~/assets/icons/sorting';
interface CustomTableHeaderProps<T> {
  table: Table<T>;
  className?: string;
}
function CustomTableHeader<T = any>({ table, className }: CustomTableHeaderProps<T>) {
  return (
    <TableHeader className={cn('[&_tr]:border-b-0', className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="hover:bg-transparent border-b-0">
          {headerGroup.headers.map((header) => {
            const isAcs = header.column.getIsSorted() === 'asc';
            const isDesc = header.column.getIsSorted() === 'desc';
            return (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
                className="h-9 px-3"
              >
                {header.isPlaceholder ? null : header.column.getCanSort() ? (
                  <div
                    className={cn(
                      header.column.getCanSort() &&
                        'flex h-full cursor-pointer items-center gap-2 select-none font-light',
                    )}
                    onClick={
                      header.column.columnDef.enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.columnDef.enableSorting && (
                      <Sorting
                        svgProps={{
                          width: 18,
                          height: 18,
                          className: cn('', {
                            '[&>:first-child]:fill-[#ab0e10e6]': isAcs,
                            ' [&>:last-child]:fill-[#ab0e10e6]': isDesc,
                          }),
                        }}
                      />
                    )}
                  </div>
                ) : (
                  flexRender(header.column.columnDef.header, header.getContext())
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default CustomTableHeader;
