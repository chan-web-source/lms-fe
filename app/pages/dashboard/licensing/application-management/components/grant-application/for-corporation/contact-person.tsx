import { Mail } from 'lucide-react';
import React from 'react';
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
import { Input } from '~/components/ui/input';
import type { contactPersonSchema } from '../../../schema/create-application';
import PhoneInputWithFlag from '~/components/comp-46';

interface ContactPersonProps {
  form: UseFormReturn<z.infer<typeof contactPersonSchema>>;
}

const ContactPerson = ({ form }: ContactPersonProps) => {
  return (
    <Form {...form}>
      <form className="space-y-10 w-full mb-8 border-t py-8">
        <Heading className="text-[22px] font-medium mb-4.5">Contact Person</Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    <Input placeholder="Enter First Name" {...field} className="pl-3 h-12" />
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
                  Surname <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter Surname" {...field} className="pl-3 h-12" />
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
                    <Input placeholder="Enter Middle Name" {...field} className="pl-3 h-12" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="preferredEmailForService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">
                    Preferred Email Address for Service <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                      <Input placeholder="Enter Email Address" {...field} className="pl-10 h-12" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-[#727A8D] text-[14px] mt-2">
              All official notifications will be emailed to this email address
            </div>
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" block text-base font-medium text-gray-900">
                  Phone Number <span className="text-[#B3261E]">*</span>
                </FormLabel>
                <FormControl>
                  <PhoneInputWithFlag
                    value={field.value}
                    className="border-gray-300"
                    onChange={(value) => field.onChange(value)}
                    placeholder="Enter phone number"
                  />
                </FormControl>
                <div className="min-h-[20px] mt-1">
                  <FormMessage className="text-red-500 text-sm" />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ContactPerson;
