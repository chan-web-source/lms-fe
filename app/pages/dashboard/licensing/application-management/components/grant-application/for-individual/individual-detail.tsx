import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
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
import type { individualDetailSchema } from '../../../schema/create-application';
import type { z } from 'zod';
import PhoneInputWithFlag from '~/components/comp-46';
import { EarthIcon, EmailIcon } from '~/assets/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface IndividualDetailProps {
  form: UseFormReturn<z.infer<typeof individualDetailSchema>>;
}

const country = [
  { id: 1, name: 'Papua New Guinea' },
  { id: 2, name: 'Australia' },
  { id: 3, name: 'New Zealand' },
];
const IndividualDetail = ({ form }: IndividualDetailProps) => {
  return (
    <Form {...form}>
      <form className="space-y-10 w-full mb-8">
        <Heading className="text-[22px] font-medium mb-4.5">Individual Details</Heading>

        {/* First Name */}
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
                  <Input placeholder="Enter first name" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Surname */}
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Surname <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter surname" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* MiddleName */}
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter surname" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Email Address<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <EmailIcon
                      svgProps={{
                        className: 'absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#8E95A4]',
                      }}
                    />
                    <Input placeholder="Enter email" {...field} className="h-12 pl-10" />
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground min-h-7">
                  All official notifications will be emailed to this email address
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Phone Number<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <PhoneInputWithFlag
                    value={field.value}
                    className="border-gray-300"
                    onChange={(value) => field.onChange(value)}
                    placeholder="Enter phone number"
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground  min-h-7"></p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Nationality <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <EarthIcon
                      svgProps={{ className: 'absolute left-3 top-1/2 -translate-y-1/2' }}
                    />
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger size="lg" className="w-full h-12.5 pl-10">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {country.map((e) => (
                          <SelectItem key={e.id} value={e.name}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground min-h-7"></p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default IndividualDetail;
