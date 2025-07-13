import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';
import Heading from '~/components/typography/heading';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { BackIcon } from '~/assets/icons';

import PaymentReference from '~/assets/icons/payment-reference-number';
import PaymentMethod from '~/assets/icons/payment-method';
import AmountPaid from '~/assets/icons/amount-paid';
import { prescribedApplicationSchema } from '../../schema/create-application';
import type z from 'zod';

type PrescribedApplicationFormData = z.infer<typeof prescribedApplicationSchema>;

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const paymentRequired = false;

const PrescribedApplication = ({ onNext, onBack }: Props) => {
  const navigate = useNavigate();

  const form = useForm<PrescribedApplicationFormData>({
    resolver: zodResolver(prescribedApplicationSchema),
    mode: 'onChange',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('proofOfPayment', file, { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form noValidate className="space-y-8">
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

        <Heading className="text-[32px] font-bold text-[#2D3139] mb-4">
          Section 04: Prescribed Application Fee
        </Heading>

        <Heading className="font-satoshi font-medium text-[18px] leading-[100%] mb-4">
          Prescribed Application Fee
        </Heading>

        {paymentRequired ? (
          <>
            <p className="text-[16px] text-[#4B4B4B] mb-6">
              Upon submission of the application, payment instructions will be <br />
              emailed to the applicant’s contact person. View{' '}
              <a className="text-red-600 underline cursor-pointer">
                approved regulation <br /> fee schedule
              </a>
              .
            </p>

            <Input
              value="PGK 1.00"
              disabled
              className="max-w-[250px] bg-[#F5F5F5] text-[#6C6C6C] text-[16px] mb-6"
            />

            <Heading className="text-[18px] text-[#2D3139] mb-2">Licensing Officer</Heading>
            <p className="text-[#6C6C6C] mb-6">Enter on behalf of applicant</p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-1 text-sm  text-[#080808]">
                      Payment Method
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full h-11.25 pl-10">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="card">Card</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <PaymentMethod
                            svgProps={{ className: 'w-5 h-5 text-muted-foreground' }}
                          />
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentReferenceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-1 text-sm text-[#080808]">
                      Payment Reference Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="RTX235536236" className="h-11.25 pl-10" {...field} />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          <PaymentReference svgProps={{ className: 'w-5 h-5' }} />
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-1 text-sm text-[#080808]">Amount Paid</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your amount paid in PGK"
                          className="h-11.25 pl-10"
                          {...field}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          <AmountPaid svgProps={{ className: 'w-5 h-5' }} />
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proofOfPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-1 text-sm text-[#080808]">
                      Proof of Payment
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpeg"
                          className="h-11.25 opacity-0 absolute inset-0 z-10 cursor-pointer"
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                        />
                        <div className="h-11.25 flex items-center bg-white border rounded px-4 text-[#6C6C6C] text-sm">
                          {field.value?.name || 'Upload File Name'}
                        </div>
                        <Button
                          type="button"
                          className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#D19D11] text-white px-4 py-1 h-8"
                          onClick={() => {
                            document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
                          }}
                          size="sm"
                        >
                          Upload
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-[16px] text-[#4B4B4B] mb-6">
              Please note that the prescribed fee under Section 36(4) of the Capital Markets Act
              2015 is currently waived. No payment is required at this stage.
            </p>
            <Input
              value="PGK 0.00"
              // disabled
              readOnly
              placeholder="PGK 0.00"
              className="max-w-[250px] bg-[#F5F5F5] text-[#6C6C6C] text-[16px]"
            />
          </>
        )}

        <div className="flex justify-between mt-20">
          <Button
            variant="outline"
            className="w-38.5 h-11.25 bg-white text-[#2D3139]"
            type="button"
            onClick={onBack}
          >
            Back
          </Button>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="w-38.5 h-11.25 bg-white text-[#2D3139]"
              type="button"
              onClick={() => console.log('Save as Draft', form.getValues())}
            >
              Save as Draft
            </Button>
            <Button
              className="w-38.5 h-11.25 bg-[#C4C4C4]"
              type="submit"
              onClick={onNext}
              // disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PrescribedApplication;
