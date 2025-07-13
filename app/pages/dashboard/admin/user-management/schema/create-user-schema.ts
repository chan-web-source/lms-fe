import { z } from 'zod';
import type { UserManagementData } from '~/types/management';

export type UserFormValues = z.infer<typeof userFormSchema>;

// export const userFormSchemaExternal = z.object({
//   verificationMethod: z.string().min(1, 'At least one role is required'),
// });

export const userFormSchema = z.object({
  id: z.string().optional(),
  photo: z.any().optional(),
  verification_document: z.any().optional(),
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Invalid email address'),
  phone_code: z.string(),
  phone: z.string().min(1, 'Phone number is required'),
  // account_status: z.boolean().refine((value) => value === true, {
  //   message: 'Account status must be active',
  // }),
  account_status: z.boolean().optional(),
  mfa_enabled: z.boolean().optional(),
  account_type: z.string(),
  role_ids: z.array(z.string()).min(1, 'At least one role is required'),
  division: z.string().optional(),
  division_unit: z.string().optional(),
  verificationMethod: z.string().optional(),
  mfa_method: z.string().optional(),
});

export const externalFormSchema = z.object({
  verificationMethod: z.string().min(1, 'At least verification is required'), //('Verification method is required'),
  verification_document: z.any().superRefine((val, ctx) => {
    if (!val || !(val instanceof File || typeof val === 'string')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please upload a verification document',
      });
    }
  }),
});

export const InternalUserFormSchema = z.object({
  division: z.string().min(1, 'Division is required'),
  division_unit: z.string().min(1, 'Division unit is required'),
})

export function mapUserToFormValues(user: UserManagementData): UserFormValues {
  return {
    photo: user.photo || '',
    verification_document: user.verification_document || '',
    first_name: user.first_name || '',
    middle_name: user.middle_name || '', // add from `user.middle_name` if available
    surname: user.surname || '',
    email: user.email || '',
    phone_code: '', // extract from phone if needed
    phone: user.phone || '',
    account_status: user.account_status === 'Active',
    mfa_enabled: !!user.mfa_enabled,
    account_type: user.account_type || '',
    role_ids: Array.isArray(user.role_ids) ? user.role_ids.map((roleId) => roleId.toString()) : [],
    division: user.division || '',
    division_unit: user.division_unit || '',
    verificationMethod: user.verification_method || '',
    mfa_method: user.mfa_method === 'email' ? 'email' : 'phone',
  };
}
