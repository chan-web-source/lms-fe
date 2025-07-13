import React, { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import Heading from '~/components/typography/heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import type { capitalMarketSchema } from '../../../schema/create-application';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface CapitalMarketProps {
  form: UseFormReturn<z.infer<typeof capitalMarketSchema>>;
}

const licenseOptions = [
  { id: '10001', name: 'John Doe Corporation' },
  { id: '10002', name: 'Jane Smith Inc.' },
  { id: '10003', name: 'Alpha Capital Ltd.' },
];

const CapitalMarket = ({ form }: CapitalMarketProps) => {
  const representativeType = form.watch('representativeType');
  const licenseId = form.watch('licenseNumber');

  useEffect(() => {
    const selected = licenseOptions.find((item) => item.id === licenseId);
    form.setValue('licenseHolderName', selected?.name || '');
  }, [licenseId, form, licenseOptions]);

  return (
    <Form {...form}>
      <form className="space-y-10 w-full mb-8">
        <Heading className="text-[22px] font-medium mb-4.5">
          Details of Intending Capital Market Representative
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Capital Market License Number <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger className="pl-3 p-5.5 w-full">
                      <SelectValue placeholder="Select Postal Code (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {licenseOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licenseHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Capital Market License Holder Name <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    placeholder="Pre-filled based on selected license ID"
                    className="h-12 bg-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="representativeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Representative Type <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-wrap sm:flex-nowrap gap-20 p-3 border-1 rounded-sm"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Individual"
                        id="individual"
                        className="size-5 data-[state=checked]:bg-red-900 data-[state=checked]:border-yellow-800 data-[state=checked]:after:bg-white"
                      />
                      <Label htmlFor="individual" className="text-sm">
                        Individual
                      </Label>
                    </FormItem>

                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Corporation"
                        id="corporation"
                        className="size-5 data-[state=checked]:bg-red-900 data-[state=checked]:border-yellow-800 data-[state=checked]:after:bg-white"
                      />
                      <Label htmlFor="corporation" className="text-sm">
                        Corporation
                      </Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {representativeType === 'Corporation' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="corporationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">
                    Name of Corporation <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Add Name Of Corporation"
                        {...field}
                        className="pl-3 h-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {representativeType === 'Individual' && (
          <>
            <Heading className="text-[16px] font-medium mb-4.5">Representative Name</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">
                      First Name <span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className="pl-3 h-12" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">
                      Surname<span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className="pl-3 h-12" />
                      </div>
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
                      <div className="relative">
                        <Input {...field} className="pl-3 h-12" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default CapitalMarket;
