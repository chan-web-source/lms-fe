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
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '~/components/ui/select';
import type { personalIdlDetailSchema } from '../../../schema/create-application';
import { cn } from '~/lib/utils';
import { FileAttachmentIcon, PassportIcon } from '~/assets/icons';

interface ValidPersonalIdentificationProps {
  form: UseFormReturn<z.infer<typeof personalIdlDetailSchema>>;
}

const MAX_DOCS = 3;

const ValidPersonalIdentification = ({ form }: ValidPersonalIdentificationProps) => {
  const methods = ['Passport', 'Driver’s License', 'National ID'];
  const docs = form.watch('docs') ?? [];

  const getDocDisplayName = (key: any, val: string | File) => {
    if (val instanceof File) return val.name;
    if (typeof val === 'string') {
      const docName = val?.split('/')?.pop();
      if (key === 'Passport' && docName)
        return (
          <>
            <FileAttachmentIcon svgProps={{ className: 'mr-1' }} />
            <span className="text-[#2D3139]">{docName}</span>
          </>
        );
      if (key === 'Driver’s License' && docName)
        return (
          <>
            <FileAttachmentIcon svgProps={{ className: 'mr-1' }} />
            <span className="text-[#2D3139]">{docName}</span>
          </>
        );
      if (key === 'National ID' && docName)
        return (
          <>
            <FileAttachmentIcon svgProps={{ className: 'mr-1' }} />
            <span className="text-[#2D3139]">{docName}</span>
          </>
        );
      return 'Uploaded Document';
    }
    return 'Upload Documents';
  };

  return (
    <Form {...form}>
      <form className="space-y-10 w-full border-t py-8">
        <Heading className="text-[22px] font-medium mb-0.5">
          Valid Personal Identification Details
        </Heading>
        <p className="text-[18px] text-[#444955] mb-4.5">
          Select at least 2 Valid Personal Identification method:
        </p>

        {Array.from({ length: MAX_DOCS }).map((_, idx) => {
          const selectedMethods = docs
            .filter((_: any, i: number) => i !== idx)
            .map((doc: any) => doc?.docType);

          return (
            <div key={idx} className="flex flex-row w-full gap-3 mb-4.5">
              {/* Select method */}
              <FormField
                control={form.control}
                name={`docs.${idx}.docType`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="min-h-5">
                      Select Method{idx < 2 && <span className="text-red">*</span>}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PassportIcon
                          svgProps={{
                            className:
                              'absolute left-3 top-6 -translate-y-1/2 text-gray-400 size-5',
                          }}
                        />
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full pl-10" size="lg">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {methods.map((m) => (
                              <SelectItem key={m} value={m} disabled={selectedMethods.includes(m)}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <FormField
                control={form.control}
                name={`docs.${idx}.doc`}
                render={() => {
                  const fileVal = docs[idx]?.doc;
                  const docType = docs[idx]?.docType;

                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-[15px] invisible min-h-5">Upload</FormLabel>
                      <FormControl>
                        <div className="relative border rounded-md h-13 bg-white">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="h-full w-full opacity-0 absolute inset-0 z-10 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              if (file) {
                                form.setValue(`docs.${idx}.doc`, file);
                              }
                            }}
                          />
                          <div
                            className={cn(
                              'absolute inset-y-0 left-3 flex items-center text-sm pointer-events-none text-[14px]',
                              fileVal instanceof File ? 'text-[#2D3139]' : 'text-[#8E95A4]',
                            )}
                          >
                            {getDocDisplayName(docType, fileVal)}
                          </div>
                          <Button
                            type="button"
                            className="absolute text-[14px] py-1.5 px-3 rounded-sm right-2 top-1/2 -translate-y-1/2 pointer-events-none bg-[#d4af37] text-white hover:bg-[#c29d2d]"
                          >
                            Upload
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          );
        })}
      </form>
    </Form>
  );
};

export default ValidPersonalIdentification;
