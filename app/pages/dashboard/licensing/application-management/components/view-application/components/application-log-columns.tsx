import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '~/lib/utils';
import type { ApplicationLog } from '../../../types/api';

export function getApplicationLogColumns(): ColumnDef<ApplicationLog>[] {
  return [
    {
      accessorKey: 'created_at',
      header: 'Timestamp',
      cell: ({ row }) => {
        const formattedDate = formatDate(row.original.created_at, 'datetime-dash').replace(
          ' . ',
          ' - ',
        );
        return <span className="break-words whitespace-pre-line text-black">{formattedDate}</span>;
      },
      size: 180,
      enableSorting: true,
    },
    {
      accessorKey: 'surname',
      header: 'User',
      cell: ({ row }) => (
        <span className="break-words whitespace-pre-line text-black">
          {row.original.first_name} {row.original.surname}
        </span>
      ),
      size: 160,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const formattedAction = row.original.action
          .split('-')
          .map((word) => word.trim())
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <span className="break-words whitespace-pre-line text-black">{formattedAction}</span>
        );
      },
      size: 200,
    },
  ];
}
