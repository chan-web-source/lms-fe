import React, { useEffect, useState } from 'react';
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
import type { additionalInformationSchema } from '../../../schema/create-application';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { X } from 'lucide-react';
import { PdfShowIcon } from '~/assets/icons';

import { useDeleteAdditionalDoc } from '../hooks/use-delete-additional-doc';
import type { AdditionalSupportingDocument } from '../types/api';

interface AdditionalInformationProps {
  form: UseFormReturn<z.infer<typeof additionalInformationSchema>>;
  documents?: AdditionalSupportingDocument[];
}

const AdditionalInformation = ({ form, documents }: AdditionalInformationProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<(File | { name: string; id: number })[]>([]);

  const { mutateAsync: deleteAdditionalDoc } = useDeleteAdditionalDoc();

  useEffect(() => {
    if (documents) {
      setUploadedFiles(documents);
    }
  }, [documents]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    setUploadedFiles((prev) => {
      const updated = [...prev, ...fileArray];
      form.setValue('additionalSupportDocs', updated, { shouldValidate: true });
      return updated;
    });

    e.target.value = '';
  };

  const removeFile = async (index: number) => {
    const fileToRemove = uploadedFiles[index];

    if (typeof fileToRemove !== 'string' && 'id' in fileToRemove) {
      try {
        await deleteAdditionalDoc({ id: fileToRemove.id });
      } catch (err) {
        console.error('Failed to delete file:', err);
      }
    }

    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
    form.setValue('additionalSupportDocs', updated, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form className="space-y-10 w-full border-t py-8">
        <Heading className="text-[22px] font-medium mb-4.5">Additional information</Heading>

        <div className=" mb-4.5">
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Additional Information <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional Information"
                    {...field}
                    maxLength={500}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4.5">
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="additionalSupportDocs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">
                    Additional Supporting Documents <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative border rounded-sm">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="h-12 p-2 interest-file opacity-0"
                        multiple
                        onChange={handleFileChange}
                        name={field.name}
                        ref={field.ref}
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center text-sm text-[#8E95A4] pointer-events-none text-[16px]">
                        {'Upload Documents'}
                      </div>
                      <Button className="absolute  text-[14px] py-1.5 px-1.5 rounded-sm right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                        Upload
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {uploadedFiles.map((file, index) => {
                const name = file instanceof File ? file.name : file.name;
                const size = file instanceof File ? `${Math.round(file.size / 1024)} KB` : null;
                return (
                  <div
                    key={index}
                    className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm text-sm relative"
                  >
                    <PdfShowIcon />
                    <div className="flex flex-col pl-2.5 pr-2.5">
                      <span className="font-medium truncate max-w-[120px]">{name}</span>
                      <span className="text-xs text-muted-foreground">{size} KB of 120 KB</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 absolute top-1 right-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AdditionalInformation;
