import { z } from 'zod';

export type ConsultationFormValues = {
  expressOfInterest: string | File | null;
  consultationDate: string;
  physicalSubmissionDate: string;
  expressOfInterestUploadedAt?: string; // <- this fixes it
};

export const consultationWithScpngSchema = z.object({
  expressOfInterest: z.union([z.instanceof(File), z.string().min(1)], {
    required_error: 'Expression of Interest is required',
  }),
  consultationDate: z.string().min(1, 'Consultation Date is required'),
  physicalSubmissionDate: z.string().min(1, 'Submission Date is required'),
  expressOfInterestUploadedAt: z.string({
    message: 'Invalid physical submission date.',
  }),
});

export const typeOfApplicationSchema = z.object({
  applicationType: z.string().min(1, 'Applicant Type is required'),
  regulatedActivity: z.string().min(1, 'Regulated Activity is required'),
});

export const corporationSchema = z.object({
  corporationName: z.string().min(1, 'Required'),
  ipaRegistrationNumber: z.string().min(1, 'Required'),
  ipaExtract: z.union([z.instanceof(File), z.string().min(1)], {
    required_error: 'IPA extract is required',
  }),
  businessName: z.string().optional(),
});

export type CorporationFormData = z.infer<typeof corporationSchema>;

export const directorsSchema = z.object({
  firstName: z.string().min(1, 'First Name is Required'),
  surname: z.string().min(1, 'Surname is Required'),
  middleName: z.string().optional(),
});

export type directorsFormData = z.infer<typeof directorsSchema>;

export const secretariesSchema = z.object({
  firstName: z.string().min(1, 'First Name is Required'),
  surname: z.string().min(1, 'Surname is Required'),
  middleName: z.string().optional(),
});

export type secretariesFormData = z.infer<typeof secretariesSchema>;

export const shareholdersListSchema = z.object({
  firstName: z.string().min(1, 'First Name is Required'),
  surname: z.string().min(1, 'Surname is Required'),
  middleName: z.string().optional(),
  numberOfSharesHeld: z.coerce
    .number()
    .min(1, 'Number of share held is Required')
    .max(1000000, 'Max 1,000,000 shares'),
  typeofShareHeld: z.string().min(1, 'type of share held is Required'),
});

export type shareholdersListFormData = z.infer<typeof shareholdersListSchema>;

export const contactPersonSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  surname: z.string().min(1, 'Required'),
  middleName: z.string().optional(),
  preferredEmailForService: z.string().min(1, 'Email is Required').email('Invalid email format'),
  phoneNumber: z.string().min(1, 'Phone is Required'),
});

export type contactPersonFormData = z.infer<typeof contactPersonSchema>;

export const capitalContactPersonSchema = z.object({
  preferredEmailForService: z.string().min(1, 'Email is Required').email('Invalid email format'),
  phoneNumber: z.string().min(1, 'Phone is Required'),
});

export type capitalContactPersonFormData = z.infer<typeof capitalContactPersonSchema>;

export const physicalAddressSchema = z.object({
  address1: z.string().min(1, 'Address is Required'),
  address2: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().min(1, 'Email is Required'),
  province: z.string().min(1, 'province is Required'),
  country: z.string().min(1, 'country is Required'),
});

export type physicalAddressFormData = z.infer<typeof physicalAddressSchema>;

export const postalAddressSchema = z.object({
  address1: z.string().min(1, 'Address is Required'),
  address2: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().min(1, 'Email is Required'),
  province: z.string().min(1, 'province is Required'),
  country: z.string().min(1, 'country is Required'),
});

export type postalAddressFormData = z.infer<typeof postalAddressSchema>;

export const addressOfBranchSchema = z.object({
  address1: z.string().min(1, 'Address is Required'),
  address2: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().min(1, 'Email is Required'),
  province: z.string().min(1, 'province is Required'),
  country: z.string().min(1, 'country is Required'),
});

export type addressOfBranchFormData = z.infer<typeof addressOfBranchSchema>;

export const capitalMarketSchema = z.object({
  licenseNumber: z.string().min(1, 'Capital Market License Number is required'),
  licenseHolderName: z.string().min(1, 'Capital Market License Holder Name is required'),
  representativeType: z.enum(['Individual', 'Corporation'], {
    required_error: 'Representative Type is required',
  }),
  firstName: z.string().optional(),
  surname: z.string().optional(),
  middleName: z.string().optional(),
  corporationName: z.string().optional(),
});

export type FullCapitalMarketFormData = z.infer<typeof capitalMarketSchema>;

export const additionalInformationSchema = z.object({
  additionalInfo: z.string().min(1, 'Additional Information is Required'),
  additionalSupportDocs: z
    .array(z.union([z.instanceof(File), z.object({ id: z.number(), name: z.string().min(1) })]))
    .min(1, 'At least one supporting document is required'),
});

export type additionalInformationFormData = z.infer<typeof additionalInformationSchema>;

export const individualDetailSchema = z.object({
  firstName: z.string().min(1, 'First Name is Required'),
  surname: z.string().min(1, 'Last Name is Required'),
  middleName: z.string().optional(),
  email: z.string().min(1, 'Email is Required').email('Invalid email format'),
  phoneNumber: z.string().min(1, 'Phone is Required'),
  nationality: z.string().min(1, 'Nationality is Required'),
});

export type individualDetailFormData = z.infer<typeof individualDetailSchema>;

export const personalIdlDetailSchema = z.object({
  docs: z
    .array(
      z.object({
        docType: z.string().min(1, 'Please select a document type'),
        doc: z
          .union([z.instanceof(File), z.string().min(1)])
          .refine((val) => val instanceof File || null, {
            message: 'Document is required',
          }),
      }),
    )
    .min(2, 'At least 2 identification documents are required'),
});

export type personalIdlDetailFormData = z.infer<typeof personalIdlDetailSchema>;
export const endorsementSchema = z.object({
  supportingLetter: z.union([z.instanceof(File), z.string().min(1)], {
    required_error: 'additional supporting documents is required',
  }),
  copyOfCML: z.union([z.instanceof(File), z.string().min(1)], {
    required_error: 'additional supporting documents is required',
  }),
});

export type endorsementFormData = z.infer<typeof endorsementSchema>;

export const prescribedApplicationSchema = z.object({
  paymentMethod: z.enum(['bank_transfer', 'card'], {
    required_error: 'Payment method is required',
  }),
  paymentReferenceNumber: z.string().min(1, 'Payment Reference Number is required'),
  amountPaid: z.string().min(1, 'Amount Paid is required'),
  proofOfPayment: z.instanceof(File, { message: 'Proof of Payment file is required' }),
});

export type prescribedApplicationFormData = z.infer<typeof prescribedApplicationSchema>;

export const licenseApplicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Invalid date',
  }),
  declarationFile: z.union([z.instanceof(File), z.string().min(1)], {
    required_error: 'IPA extract is required',
  }),
});

export type licenseApplicationFormData = z.infer<typeof licenseApplicationSchema>;

export const preferredAddressSchema = z.object({
  type: z.enum(
    [
      'physical_address_of_principle_place_of_business',
      'address_of_branch_where_business_is_conducted',
      '',
    ],
    {
      required_error: 'Preferred address is required',
    },
  ),
});

export type preferredAddressFormData = z.infer<typeof preferredAddressSchema>;
