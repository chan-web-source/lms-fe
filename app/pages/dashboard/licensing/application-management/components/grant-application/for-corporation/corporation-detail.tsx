import { BriefcaseBusiness } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
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
import type { corporationSchema } from '../../../schema/create-application';
import { BuildingIcon, FileAttachmentIcon, LicenseMaintenanceIcon } from '~/assets/icons';
import { cn } from '~/lib/utils';
import Cookies from 'js-cookie';
import { useGetOneApplicationDraft } from '../../../hooks/use-get-one-applocation-draft';
import { useGetCorporateApplication } from '../hooks/use-get-one-corporate-application';

interface CorporationDetailProps {
  form: UseFormReturn<z.infer<typeof corporationSchema>>;
}

const CorporationDetail = ({ form }: CorporationDetailProps) => {
  const draftId = Cookies.get('application_draft') || '';
  const { data: draft } = useGetOneApplicationDraft(draftId);

  const corporationDetail = useGetCorporateApplication(draft?.corporation_applicant_id);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFileName && corporationDetail?.data?.ipa_extract_document) {
      setSelectedFileName(
        corporationDetail?.data?.ipa_extract_document.split('/').pop() ?? 'Uploaded document',
      );
    }
  }, [draft, corporationDetail, selectedFileName]);

  return (
    <Form {...form}>
      <form className="space-y-10 w-full mb-8">
        <Heading className="text-[22px] font-medium mb-4.5">Corporation Details</Heading>

        {/* Corporation Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    <BriefcaseBusiness className="absolute left-3 top-6 -translate-y-1/2 text-gray-400 size-5" />
                    <Input placeholder="Enter the name" {...field} className="pl-10 h-12" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IPA Registration Number */}
          <FormField
            control={form.control}
            name="ipaRegistrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  IPA Registration Number <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <LicenseMaintenanceIcon
                      width="20"
                      height="20"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-red"
                    />
                    <Input
                      type="number"
                      placeholder="Enter the IPA"
                      {...field}
                      className="pl-10 h-12"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IPA Extract */}
          <FormField
            control={form.control}
            name="ipaExtract"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  IPA Extract <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative h-12 border rounded-sm">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="h-12 p-2 interest-file opacity-0"
                      name={field.name}
                      ref={field.ref}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          form.setValue('ipaExtract', files[0]);
                          setSelectedFileName(files[0].name);
                        } else {
                          setSelectedFileName(null);
                        }
                      }}
                    />
                    <div
                      className={cn(
                        'absolute inset-y-0 left-3 flex items-center text-sm  pointer-events-none text-[14px]',
                        selectedFileName ? 'text-[#2D3139]' : 'text-[#8E95A4]',
                      )}
                    >
                      {selectedFileName && <FileAttachmentIcon svgProps={{ className: 'mr-1' }} />}
                      {selectedFileName ?? 'Upload Documents'}
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

          {/* Business Name */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Business Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BuildingIcon
                      width="20"
                      height="20"
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                    />
                    <Input
                      placeholder="Enter the name your business"
                      {...field}
                      className="pl-10 h-12 placeholder:text-[#AAAFBB]"
                    />
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  If the business operates under a different name or style than the name above,
                  please provide it here.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CorporationDetail;
