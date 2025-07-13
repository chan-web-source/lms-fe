import type { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { z } from 'zod';
import { BackIcon } from '~/assets/icons';
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
import type { typeOfApplicationSchema } from '../../schema/create-application';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useSaveOrUpdateDraft } from '../../hooks/use-save-or-update-draft';
import type { Dispatch, SetStateAction } from 'react';

type TypeOfApplicationProps = {
  form: UseFormReturn<z.infer<typeof typeOfApplicationSchema>>;
  onNext: () => void;
  onBack: () => void;
  setApplicantType: Dispatch<SetStateAction<string | undefined>>;
};

const ApplicantType = [
  {
    id: 1,
    name: 'Individual',
  },
  {
    id: 2,
    name: 'Corporation',
  },
  {
    id: 3,
    name: 'Capital Market Representative License',
  },
];

const RegulatedActivity = [
  {
    id: 1,
    name: 'Dealing in Securities',
  },
  {
    id: 2,
    name: 'Trading in Derivatives',
  },
  {
    id: 3,
    name: 'Fund Management',
  },
  {
    id: 4,
    name: 'Advising on Corporate Finance',
  },
  {
    id: 5,
    name: 'Investment Advice',
  },
  {
    id: 6,
    name: 'Financial Planning',
  },
  {
    id: 7,
    name: 'Trustees Services',
  },
];

const TypeOfApplication = ({ form, onNext, onBack, setApplicantType }: TypeOfApplicationProps) => {
  const navigate = useNavigate();

  const { saveDraft } = useSaveOrUpdateDraft({
    sectionMapper: () => {
      const formData = new FormData();

      const applicationType = form.getValues('applicationType');

      if (applicationType) {
        formData.append('applicant_type', applicationType);
      }

      const regulatedActivity = form.getValues('regulatedActivity');
      if (regulatedActivity) {
        formData.append('regulated_activity', regulatedActivity);
      }
      formData.set('application_status', 'Draft');
      return formData;
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/licensing/application-management')}
          className="flex items-center text-[22px] font-medium text-red gap-1.5"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <BackIcon /> Back
        </button>
      </div>
      <Heading className="font-bold whitespace-nowrap text-[32px] text-[#2D3139]">
        Section 02: Type of Applicant and Regulated Activity
      </Heading>

      <Form {...form}>
        <form className="space-y-8 flex flex-col justify-between  h-[calc(100vh_-_300px)]">
          <div>
            <FormField
              control={form.control}
              name="applicationType"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-between pt-8 pb-3 m-0">
                    <FormLabel className="text-[20px] text-[#2D3139]">
                      Applicant Type<span className="text-red text-[20px]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          saveDraft(form.getValues());
                          setApplicantType(value);
                        }}
                      >
                        <SelectTrigger size="lg" className="w-93 h-12.5">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {ApplicantType.map((e) => (
                            <SelectItem key={e.id} value={e.name}>
                              {e.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="regulatedActivity"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center ">
                  <FormLabel className="text-[20px] text-[#2D3139]">
                    Regulated Activity<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        saveDraft(form.getValues());
                      }}
                      value={form.watch('regulatedActivity')}
                    >
                      <SelectTrigger size="lg" className="w-93 h-12.5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {RegulatedActivity.map((e) => (
                          <SelectItem key={e.id} value={e.name}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="w-38.5 bg-white text-[#2D3139]"
              onClick={() => {
                onBack();
              }}
            >
              Back
            </Button>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => saveDraft(form.getValues())}
                variant="outline"
                className="w-38.5 bg-white text-[#2D3139]"
              >
                Save as Draft
              </Button>
              <Button
                className="w-38.5 bg-[#C4C4C4] disabled:bg-[#C4C4C4]"
                onClick={() => {
                  onNext();
                }}
                disabled={!form.formState.isValid}
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TypeOfApplication;
