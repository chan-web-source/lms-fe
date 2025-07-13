import React, { type Dispatch, type SetStateAction } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import { DataTable } from '~/components/data-table';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import type { shareholdersListSchema } from '../../../schema/create-application';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { Stamp, Trash2 } from 'lucide-react';
import { AuditIcon } from '~/assets/icons';
import type { CorporateShareholders, Shareholder } from '../types/api';

interface ShareholdersListProps {
  form: UseFormReturn<z.infer<typeof shareholdersListSchema>>;
  onSubmit: (values: z.infer<typeof shareholdersListSchema>) => void;
  shareholders?: CorporateShareholders[] | Shareholder[];
  isPending?: boolean;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  onDelete?: (directorId: number) => void;
}

const ShareholdersList = ({
  form,
  shareholders = [],
  onSubmit,
  isPending,
  onDelete,
  sorting,
  setSorting,
}: ShareholdersListProps) => {
  const columns: ColumnDef<CorporateShareholders | Shareholder>[] = [
    {
      header: 'Nº',
      id: 'index',
      cell: ({ row }) => (
        <div className="text-gray-500 font-medium">{String(row.index + 1).padStart(2, '0')}.</div>
      ),
    },
    {
      accessorKey: 'first_name',
      header: () => <div className="flex items-center gap-1">Full Name</div>,
      enableSorting: true,
      sortDescFirst: true,
      cell: ({ row }) => (
        <div className="text-[#2D3139]">
          {row.original.first_name} {row.original.middle_name} {row.original.surname}
        </div>
      ),
    },
    {
      accessorKey: 'number_of_shares',
      header: () => <div className="flex items-center gap-1">Nº of Share Held</div>,
      enableSorting: true,
      cell: ({ row }) => <div className="text-[#2D3139]">{row.original.number_of_shares}</div>,
    },
    {
      accessorKey: 'type_of_shares',
      header: () => <div className="flex items-center gap-1">Share Type</div>,
      enableSorting: true,
      cell: ({ row }) => <div className="text-[#2D3139]">{row.original.type_of_shares}</div>,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <button
          type="button"
          className="text-red-600 hover:text-red-700"
          onClick={() => {
            if (onDelete) {
              onDelete(row.original.id);
            }
          }}
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full py-8 border-t">
        <div className="flex flex-col">
          <div className="w-full mb-4.5">
            <Heading className="text-[22px] font-medium ">Substantial Shareholders List</Heading>
            <div className="text-[18px] text-[#444955]">Maximum 20 shareholders allowed</div>
          </div>

          {/* Corporation Name */}
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-full gap-3 flex flex-col">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">
                      First Name <span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First Name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* IPA Registration Number */}
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">
                      Surname <span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Surname" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Middle Name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfSharesHeld"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">
                      Numbers of Share Held <span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AuditIcon
                          width="20"
                          height="20"
                          className="absolute left-3 top-1/2 -translate-y-1/2"
                        />
                        <Input
                          type="number"
                          placeholder="Enter Numbers of Share Held"
                          {...field}
                          className="h-12 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeofShareHeld"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">
                      Type of Share Held <span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Stamp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                        <Input
                          placeholder="Enter type of share held"
                          {...field}
                          className="h-12 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-2xl bg-[#F7F7F7] p-4 w-full text-sm  ">
              <DataTable
                classNames={{
                  headerClassName:
                    'bg-transparent [&_th:first-child]:rounded-l-2xl [&_th:last-child]:rounded-r-2xl [&_th]:text-[#444955] [&_th]:font-normal [&_th]:bg-white [&_th:last-child]:text-right [&_th:first-child]:w-[30px]!',
                  bodyClassName:
                    'bg-[#F7F7F7] [&_tr]:border-none!  [&_td]:pt-4! [&_td]:pb-0!  [&_td]:text-[16px] [&_td]:text-[#2D3139] [&_td:last-child]:text-right [&_td:first-child]:w-[30px]! [&_td:first-child]:text-[#8E95A4]  [&_svg]:size-5 [&_svg]:text-[#940200]',
                }}
                sorting={sorting}
                onSortingChange={setSorting}
                isFilter={false}
                isPagination={false}
                data={shareholders}
                columns={columns}
              />
            </div>
          </div>
          <Button className="w-41 py-2.75 text-[14px] mt-4.5" disabled={isPending}>
            Add Shareholder
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShareholdersList;
