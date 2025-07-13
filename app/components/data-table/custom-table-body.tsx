import { flexRender, type Table } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '../ui/table';
import { cn } from '~/lib/utils';

interface CustomTableBodyProps<T> {
  table: Table<T>;
  totalColumn: number;
  isLoading?: boolean;
  className?: string;
  handleRowAction?: (row: T) => void;
  rowActionColumnCellIndex?: number;
}

function CustomTableBody<T>({
  table,
  totalColumn,
  isLoading = false,
  className,
  handleRowAction,
  rowActionColumnCellIndex,
}: CustomTableBodyProps<T>) {
  const rows = table.getRowModel().rows;

  return (
    <TableBody className={cn('bg-white', className)}>
      {isLoading ? (
        // Show 5 skeleton rows while loading
        [...Array(8)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: totalColumn }).map((_, cellIndex) => (
              <TableCell key={cellIndex} className="py-5.5 px-3">
                <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : rows.length > 0 ? (
        rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() ? 'selected' : undefined}
            onClick={(e) => {
              if (!handleRowAction) return;

              // Find the clicked cell index
              const clickedCell = (e.target as HTMLElement).closest('td');
              const cells = clickedCell?.parentElement?.querySelectorAll('td');
              const cellIndex = cells
                ? Array.from(cells).indexOf(clickedCell as HTMLTableCellElement)
                : -1;

              // Only trigger row action if not clicking the action column
              if (cellIndex !== -1 && cellIndex !== rowActionColumnCellIndex) {
                handleRowAction(row.original);
              }
            }}
            className={handleRowAction ? 'cursor-pointer hover:bg-gray-50' : ''}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="last:py-0 py-5.5 px-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={totalColumn} className="h-24 text-center">
            No results found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default CustomTableBody;
