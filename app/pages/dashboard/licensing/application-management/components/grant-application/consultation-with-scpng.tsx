import { CalendarIcon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { z } from 'zod';
import { BackIcon, FileAttachmentIcon } from '~/assets/icons';
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
import type { consultationWithScpngSchema } from '../../schema/create-application';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Calendar } from '~/components/ui/calender';
import Cookies from 'js-cookie';
import { useGetOneApplicationDraft } from '../../hooks/use-get-one-applocation-draft';
import { useSaveOrUpdateDraft } from '../../hooks/use-save-or-update-draft';
import { formatDateLocal } from '~/lib/utils';

interface Props {
  form: UseFormReturn<z.infer<typeof consultationWithScpngSchema>>;
  onNext: () => void;
}

type DatePickerField = 'consultation' | 'submission';

const ConsultationWithScpng = ({ form, onNext }: Props) => {
  const navigate = useNavigate();
  const latestDraftId = Cookies.get('application_draft');
  const { data: draft } = useGetOneApplicationDraft(latestDraftId || undefined);
  const [month, setMonth] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<Record<DatePickerField, boolean>>({
    consultation: false,
    submission: false,
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFileName && draft?.expression_of_interest_document) {
      setSelectedFileName(
        draft.expression_of_interest_document.split('/').pop() ?? 'Uploaded document',
      );
    }
  }, [draft]);

  const { saveDraft } = useSaveOrUpdateDraft({
    sectionMapper: (values, draft) => {
      const formData = new FormData();

      const consultationDate = form.getValues('consultationDate');

      if (consultationDate) {
        formData.append('consultation_date', consultationDate.slice(0, 10));
      }

      const submissionDate = form.getValues('physicalSubmissionDate');
      if (submissionDate) {
        formData.append('physical_submission_date', submissionDate.slice(0, 10));
      }

      const expressFile = form.getValues('expressOfInterest');

      if (expressFile instanceof File) {
        formData.append('expression_of_interest_document', expressFile);
        formData.append('expression_of_interest_document_uploaded_at', new Date().toISOString());
      } else if (draft?.expression_of_interest_document) {
        formData.append(
          'expression_of_interest_document',
          String(draft.expression_of_interest_document),
        );
      }

      formData.set('application_status', 'Draft');
      return formData;
    },
  });

  const handleNext = async () => {
    const values = form.getValues();
    await saveDraft(values);
    onNext();
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/licensing/application-management')}
          className="flex items-center text-[22px] font-medium text-red gap-1.5 bg-transparent border-none p-0"
        >
          <BackIcon /> Back
        </button>
      </div>

      <Heading className="font-bold text-[32px] text-[#2D3139]">
        Section 01: Consultation with SCPNG
      </Heading>

      <div className="flex items-center justify-between mt-8 mb-4">
        <Heading className="font-medium">Hold Consultation with SCPNG</Heading>
        <ToggleGroup
          type="single"
          defaultValue="no"
          className="flex gap-2 bg-muted px-1 py-1 rounded-md"
        >
          {['yes', 'no'].map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              className="w-25 px-4 py-2 text-sm text-[#99A0AE] rounded-md data-[state=on]:bg-white data-[state=on]:shadow-sm"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <ul className="list-disc pl-6 text-[16px] text-[#2D3139] mb-6">
        <li>Aware of and committed to fit and proper requirements.</li>
        <li>Understands license approval timeline and procedures.</li>
        <li>Will follow criteria and keep communication open with SCPNG.</li>
      </ul>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="expressOfInterest"
            render={({ field }) => (
              <FormItem className="flex justify-between py-8 border-t m-0">
                <FormLabel className="text-[24px] text-[#2D3139]">
                  Expression of interest<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative border rounded-sm">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="h-12 p-2 w-134 interest-file opacity-0"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          form.setValue('expressOfInterest', files[0]);
                          setSelectedFileName(files[0].name);
                        } else {
                          setSelectedFileName(null);
                        }
                        saveDraft(form.getValues());
                      }}
                      name={field.name}
                      ref={field.ref}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center text-sm text-[#121212] pointer-events-none text-[16px]">
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

          {['consultationDate', 'physicalSubmissionDate'].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as 'consultationDate' | 'physicalSubmissionDate'}
              render={({ field }) => (
                <FormItem className="flex justify-between items-center border-t py-8 m-0">
                  <FormLabel className="text-[24px] text-[#2D3139]">
                    {name === 'consultationDate' ? 'Consultation Date' : 'Physical Submission Date'}
                    <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center w-134">
                      <Input
                        type="date"
                        className="h-12 pr-10 consult-date"
                        value={field.value ? field.value : ''}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          saveDraft(form.getValues());
                        }}
                      />

                      <Popover
                        open={openDatePicker[name as DatePickerField]}
                        onOpenChange={(val) =>
                          setOpenDatePicker((prev) => ({ ...prev, [name]: val }))
                        }
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
                                const formatted = formatDateLocal(date);
                                field.onChange(formatted);
                                saveDraft(form.getValues());
                                setOpenDatePicker((prev) => ({ ...prev, [name]: false }));
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
          ))}

          <div className="flex justify-end gap-3 mt-20">
            <Button
              type="button"
              variant="outline"
              className="w-38.5 bg-white text-[#2D3139]"
              onClick={() => saveDraft(form.getValues())}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              className="w-38.5 bg-[#C4C4C4] disabled:bg-[#C4C4C4]"
              onClick={handleNext}
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConsultationWithScpng;
