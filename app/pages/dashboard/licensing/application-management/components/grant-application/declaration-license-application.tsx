import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import type z from 'zod';

import Heading from '~/components/typography/heading';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { BackIcon, FileAttachmentIcon } from '~/assets/icons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { licenseApplicationSchema } from '../../schema/create-application';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '~/components/ui/calender';
import { cn, formatDateLocal } from '~/lib/utils';
import { useSaveOrUpdateDraft } from '../../hooks/use-save-or-update-draft';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { useGetOneApplicationDraft } from '../../hooks/use-get-one-applocation-draft';

type LicenseApplicationFormData = z.infer<typeof licenseApplicationSchema>;

interface LicenseApplicationProps {
  onNext: () => void;
  onBack: () => void;
}

const LicenseApplication = ({ onNext, onBack }: LicenseApplicationProps) => {
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const [month, setMonth] = React.useState<Date>(new Date());
  const latestDraftId = Cookies.get('application_draft');
  const { data: draft } = useGetOneApplicationDraft(latestDraftId || undefined);
  const [openDatePicker, setOpenDatePicker] = React.useState({ date: false });
  const queryClient = useQueryClient();

  const form = useForm<LicenseApplicationFormData>({
    resolver: zodResolver(licenseApplicationSchema),
    defaultValues: {
      name: '',
      date: new Date(),
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (draft) {
      form.reset({
        name: draft.declaration_name || '',
        declarationFile: draft.declaration_document || '',
        date: draft.declaration_date ? new Date(draft.declaration_date) : new Date(),
      });
    }
  }, [draft, form]);

  useEffect(() => {
    if (!selectedFileName && draft?.declaration_document) {
      setSelectedFileName(draft?.declaration_document?.split('/')?.pop() ?? 'Uploaded document');
    }
  }, [draft, selectedFileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('declarationFile', file, { shouldValidate: true });
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  const { saveDraft } = useSaveOrUpdateDraft({
    sectionMapper: (value) => {
      const formData = new FormData();

      const name = form.getValues('name');

      if (name) {
        formData.append('declaration_name', name);
      }

      const date = form.getValues('date');
      if (date) {
        const formattedDate = date.toISOString().split('T')[0];
        formData.append('declaration_date', formattedDate);
      }

      const expressFile = form.getValues('declarationFile');

      if (expressFile instanceof File) {
        formData.append('declaration_document', expressFile);
        formData.append('declaration_document_uploaded_at', new Date().toISOString());
      }
      if (value.type === 'draft') {
        formData.append('application_status', 'Draft');
      } else {
        formData.append('application_status', 'Pending Payment');
      }
      formData.append(
        'preferred_address_of_service',
        'physical_address_of_principle_place_of_business',
      );
      return formData;
    },
  });

  const handleSubmit = async () => {
    if (form.formState.isValid) {
      try {
        const values = form.getValues();
        await saveDraft(values);
        setTimeout(() => {
          Cookies.remove('application_draft');
          Cookies.remove('corporation_id');
          Cookies.remove('capital_market_id');
          Cookies.remove('individual_id');
          toast.success('Application submitted successfully!');
          queryClient.removeQueries({ queryKey: ['application-draft'] });
          navigate('/licensing/application-management');
        }, 200);
      } catch (error) {
        const rawMessage = (error as any)?.response?.data?.message;

        if (rawMessage?.includes("Field validation for 'Phone' failed on the 'e164'")) {
          toast.error('Phone number must be in valid international format');
        } else if (
          rawMessage?.includes("Field validation for 'EmailForService' failed on the 'email'")
        ) {
          toast.error('Email must be a valid email address');
        } else {
          toast.error(rawMessage || 'Something went wrong. Please try again.');
        }
      }
    } else {
      form.trigger();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => onNext())} className="space-y-8 w-full" noValidate>
        <div className="mb-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center text-[22px] text-[#671513] font-medium gap-2"
          >
            <BackIcon />
            Back
          </button>
        </div>

        <Heading className="text-[32px] font-bold text-[#2D3139] mb-8">
          Section 05: Declarations in License Application
        </Heading>

        <Heading className="font-satoshi font-medium text-[22px] leading-[100%] text-[#2D3139] mb-4">
          Declaration Information
        </Heading>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4.5">
              <FormLabel className="text-[16px]">
                Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="bg-[#fff] text-black text-[16px] h-11 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="mb-4.5">
              <FormLabel className="text-[16px]">
                Date<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center w-full">
                  <Input
                    type="date"
                    className="h-12 pr-10 consult-date"
                    value={field.value ? formatDateLocal(new Date(field.value)) : ''}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      field.onChange(selectedDate);
                    }}
                  />

                  <Popover
                    open={openDatePicker.date}
                    onOpenChange={(val) => setOpenDatePicker((prev) => ({ ...prev, date: val }))}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-6 p-0"
                      >
                        <CalendarIcon className="size-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="end"
                      alignOffset={-8}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date);
                            setOpenDatePicker((prev) => ({ ...prev, date: false }));
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="declarationFile"
          render={() => (
            <FormItem className="mb-4.5">
              <FormLabel className="text-[16px]">
                Upload Declaration Form<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative h-12 border rounded-sm">
                  <Input
                    type="file"
                    accept=".pdf,.png,.jpeg"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                    className="bg-[#ffffff] text-black text-[16px] h-11 pr-20 opacity-0 absolute inset-0 cursor-pointer z-10"
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
                  <Button
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#D0A72A] text-white px-4 py-1 h-[30px] text-sm"
                    onClick={() => {
                      const fileInput =
                        document.querySelector<HTMLInputElement>('input[type="file"]');
                      fileInput?.click();
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center mt-16">
          <Button
            variant="outline"
            className="w-38.5 h-11.25 bg-white text-[#2D3139]"
            type="button"
            onClick={onBack}
          >
            Back
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-11 px-6 text-[#2D3139] bg-white"
              type="button"
              onClick={async () => {
                await saveDraft({ type: 'draft' });
              }}
            >
              Save as Draft
            </Button>
            <Button
              className="h-11 px-6 bg-[#C4C4C4] text-white"
              type="submit"
              disabled={!form.formState.isValid}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LicenseApplication;
