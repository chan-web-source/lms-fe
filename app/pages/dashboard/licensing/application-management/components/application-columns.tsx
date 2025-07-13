import type { ColumnDef } from '@tanstack/react-table';
import type { Application } from '../types/api';
import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';

export function getApplicationColumns(): ColumnDef<Application>[] {
  return [
    {
      accessorKey: 'application_id',
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
          <span>Application ID</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <span className="ml-2">{row.original.application_id}</span>
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: 'application_type',
      header: 'Application Type',
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="text-sm flex gap-1 items-center py-2 px-3 rounded-full leading-3.5 font-light"
        >
          {row.original.application_type}
        </Badge>
      ),
      size: 180,
    },
    {
      accessorKey: 'regulated_activity',
      header: 'Regulated Activity',
      cell: ({ row }) => <span>{row.original.regulated_activity}</span>,
      size: 180,
    },
    {
      accessorKey: 'corporation_name',
      header: 'Corporation Name',
      cell: ({ row }) => <span className="font-semibold">{row.original.corporation_name}</span>,
      size: 180,
    },
    {
      accessorKey: 'application_status',
      header: 'Application Status',
      cell: ({ row }) => <span>{row.original.application_status}</span>,
      size: 160,
    },
    {
      accessorKey: 'days_remaining',
      header: 'Days Remaining',
      enableSorting: true,
      cell: ({ row }) => {
        const days = row.original.days_remaining;
        let color = 'bg-gray-200 text-gray-700';
        if (days < 5) color = 'bg-[#ffc7c7] text-gray-700';
        else if (days <= 10) color = 'bg-[#ffe5cc] text-gray-700';
        return (
          <span
            className={`inline-flex items-center justify-center rounded-full px-3 py-1 font-normal text-base ${color}`}
            style={{ minWidth: 36 }}
          >
            {days}
          </span>
        );
      },
      size: 120,
    },
    {
      accessorKey: 'responsible_assignee_name',
      header: 'Responsible Assignee',
      cell: ({ row }) => <span>{row.original.responsible_assignee_name}</span>,
      size: 180,
    },
  ];
}
