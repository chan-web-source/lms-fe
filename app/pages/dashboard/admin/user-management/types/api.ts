export interface Users {
  avatar: string;
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  surname: string;
  email: string;
  email_validated: boolean;
  phone: string;
  phone_validated: boolean;
  mfa_method: 'email' | 'sms' | 'app' | 'phone' | string;
  mfa_enabled: boolean;
  account_type: 'Internal' | 'External';
  account_status: 'Active' | 'Inactive';
  division: string;
  division_unit: string;
  role_ids: number[];
  last_login: string;
  verification_method: string;
  photo: string;
  verification_document: string;
}

export interface Role {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface DropDownData {
  division?: string | undefined;
  id: number;
  value: number | string | undefined;
  name?: string;
}

export interface ResetPassword {
  user_id: number;
}
