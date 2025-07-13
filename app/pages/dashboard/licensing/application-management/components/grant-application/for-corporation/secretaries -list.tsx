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
import type { secretariesSchema } from '../../../schema/create-application';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import type { CorporateSecretaries } from '../types/api';

interface SecretariesListProps {
  form: UseFormReturn<z.infer<typeof secretariesSchema>>;
  onSubmit: (values: z.infer<typeof secretariesSchema>) => void;
  secretaries?: CorporateSecretaries[];
  isPending?: boolean;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  onDelete?: (directorId: number) => void;
}

const SecretariesList = ({
  form,
  onSubmit,
  secretaries = [],
  sorting,
  setSorting,
  onDelete,
}: SecretariesListProps) => {
  const columns: ColumnDef<CorporateSecretaries>[] = [
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
      cell: ({ row }) => (
        <div className="text-[#2D3139]">
          {row.original.first_name} {row.original.middle_name} {row.original.surname}
        </div>
      ),
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
          <Heading className="text-[22px] font-medium mb-4.5">Secretaries List</Heading>

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
              {/* IPA Extract */}
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
            </div>
            <div className="rounded-2xl bg-[#F7F7F7] p-4 w-full text-sm  ">
              <DataTable
                sorting={sorting}
                onSortingChange={setSorting}
                classNames={{
                  headerClassName:
                    'bg-transparent [&_th:first-child]:rounded-l-2xl [&_th:last-child]:rounded-r-2xl [&_th]:text-[#444955] [&_th]:font-normal [&_th]:bg-white [&_th:last-child]:text-right [&_th:first-child]:w-[30px]!',
                  bodyClassName:
                    'bg-[#F7F7F7] [&_tr]:border-none!  [&_td]:pt-4! [&_td]:pb-0!  [&_td]:text-[16px] [&_td]:text-[#2D3139] [&_td:last-child]:text-right [&_td:first-child]:w-[30px]! [&_td:first-child]:text-[#8E95A4]  [&_svg]:size-5 [&_svg]:text-[#940200]',
                }}
                isFilter={false}
                isPagination={false}
                data={secretaries}
                columns={columns}
              />
            </div>
          </div>
          <Button className="w-41 py-2.75 text-[14px] mt-4.5">Add Secretary</Button>
        </div>
      </form>
    </Form>
  );
};

export default SecretariesList;
