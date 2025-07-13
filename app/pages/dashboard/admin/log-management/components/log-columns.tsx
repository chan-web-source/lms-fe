import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import type { Log } from '../types/api';

export const logColumns = ({
  selectedUsers,
  selectedActions,
  selectedModules,
}: {
  selectedUsers: string[];
  selectedActions: string[];
  selectedModules: string[];
}): ColumnDef<Log>[] => [
  {
    id: 'created_at',
    accessorKey: 'timestamp',
    header: ({ table }) => (
      <div className="flex gap-2.5">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span>Timestamp</span>
      </div>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} - ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
      return (
        <div className="flex gap-2.5 items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="size-4"
          />
          <div className="text-[#17181C] font-normal text-gray-650">{formatted}</div>
        </div>
      );
    },
  },

  {
    id: 'user_id',
    accessorKey: 'user',
    header: 'User',
    enableSorting: true,
    cell: ({ row }) => {
      const isHighlighted = selectedUsers.includes(String(row.original.user_id));
      return (
        <div
          className={`text-[#17181C] font-normal ${isHighlighted ? 'text-red-900' : 'text-gray-650'}`}
        >
          {row.original.first_name} {row.original.surname}
        </div>
      );
    },
    size: 142,
  },

  {
    id: 'action',
    accessorKey: 'action',
    header: 'Action',
    enableSorting: true,
    cell: ({ row }) => {
      const isHighlighted = selectedActions.includes(row.original.action);
      return (
        <div
          className={`text-[#17181C] font-normal ${isHighlighted ? 'text-red-900' : 'text-gray-650'}`}
        >
          {row.original.action}
        </div>
      );
    },
  },

  {
    id: 'category',
    accessorKey: 'module',
    header: 'Module',
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.category;
      const isHighlighted = selectedModules.includes(value);
      return <div className={isHighlighted ? 'text-red-900' : ''}>{value}</div>;
    },
    size: 142,
  },

  {
    id: 'ip_address',
    accessorKey: 'ip',
    header: 'IP Address',
    enableSorting: true,
    cell: ({ row }) => <div>{row.original.ip_address}</div>,
    size: 142,
  },
];
