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
import { Button } from '~/components/ui/button';
import type { endorsementSchema } from '../../../schema/create-application';
import { FileAttachmentIcon } from '~/assets/icons';
import Cookies from 'js-cookie';
import { useGetCapitalMarketApplication } from '../hooks/use-get-one-capital-market-application';
import { cn } from '~/lib/utils';

interface EndorsementProps {
  form: UseFormReturn<z.infer<typeof endorsementSchema>>;
}

const EndorsementForm = ({ form }: EndorsementProps) => {
  const capitalMarketId = Cookies.get('capital_market_id');
  const { data: capitalData } = useGetCapitalMarketApplication(capitalMarketId ?? '');
  const [supportingFileName, setSupportingFileName] = useState<string | null>(null);
  const [cmlFileName, setCmlFileName] = useState<string | null>(null);

  useEffect(() => {
    if (capitalData?.supporting_letter_document) {
      setSupportingFileName(capitalData.supporting_letter_document?.split('/').pop() ?? null);
    }
    if (capitalData?.copy_of_cml_document) {
      setCmlFileName(capitalData.copy_of_cml_document?.split('/').pop() ?? null);
    }
  }, [capitalData?.copy_of_cml_document, capitalData?.supporting_letter_document]);

  return (
    <Form {...form}>
      <form className="space-y-10 w-full border-t py-8">
        <Heading className="text-[22px] font-medium mb-4.5">
          Endorsement from the capital market license holder
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <FormField
            control={form.control}
            name="supportingLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Supporting Letter*</FormLabel>
                <FormControl>
                  <div className="relative h-12 border rounded-sm">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="h-12 p-2 interest-file opacity-0 "
                      name={field.name}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          form.setValue('supportingLetter', files[0]);
                          setSupportingFileName(files[0].name);
                        } else {
                          setSupportingFileName(null);
                        }
                      }}
                      ref={field.ref}
                    />
                    <div
                      className={cn(
                        'absolute inset-y-0 left-3 flex items-center text-sm text-[#8E95A4] pointer-events-none text-[14px]',
                        supportingFileName ? 'text-[#2D3139]' : 'text-[#8E95A4]',
                      )}
                    >
                      {supportingFileName && (
                        <FileAttachmentIcon svgProps={{ className: 'mr-1' }} />
                      )}
                      {supportingFileName ?? 'Upload Documents'}
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

          <FormField
            control={form.control}
            name="copyOfCML"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Copy of CML*</FormLabel>
                <FormControl>
                  <div className="relative h-12 border rounded-sm">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="h-12 p-2 interest-file opacity-0"
                      name={field.name}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          form.setValue('copyOfCML', files[0]);
                          setCmlFileName(files[0].name);
                        } else {
                          setCmlFileName(null);
                        }
                      }}
                      ref={field.ref}
                    />
                    <div
                      className={cn(
                        'absolute inset-y-0 left-3 flex items-center text-sm text-[#8E95A4] pointer-events-none text-[14px]',
                        cmlFileName ? 'text-[#2D3139]' : 'text-[#8E95A4]',
                      )}
                    >
                      {cmlFileName && <FileAttachmentIcon svgProps={{ className: 'mr-1' }} />}
                      {cmlFileName ?? 'Upload Documents'}
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
        </div>
      </form>
    </Form>
  );
};

export default EndorsementForm;
