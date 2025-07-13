export type AccountType = 'Internal' | 'External';

export type RoleType = string;

export type DivisionType = 'Licensing & Supervision' | 'Licensing' | 'Supervision';

export type UnitType = 'Licensing' | 'Supervision';

export interface CreateUserType {
  first_name: string;
  middle_name?: string;
  surname: string;
  email: string;
  phone: string;
  account_status: boolean;
  mfa_enabled: boolean;
  account_type: AccountType;
  role_ids: RoleType[];
  photo?: File;
  division?: DivisionType;
  division_unit?: UnitType;
  verificationMethod?: string;
  verification_document?: File;
  phone_code?: string;
}

export interface UserType extends CreateUserType {
  id: string;
  createdAt: string;
  updatedAt: string;
}
