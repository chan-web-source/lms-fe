interface ListParams {
  all?: boolean;
  search?: string;
  page?: number;
  per_page?: number;
  order_by?: string;
}

interface UserManagementData {
  id?: number;
  email?: string;
  first_name?: string;
  middle_name?: string;
  surname?: string;
  email_validated?: boolean;
  phone?: string;
  phone_validated?: boolean;
  mfa_enabled?: boolean;
  mfa_method?: string;
  account_type?: string;
  account_status?: string | boolean;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
  role_ids?: number[] | string[] | string; // GET returns number[], POST/PUT expects string[] or string
  value?: string;
  division?: string;
  division_unit?: string;
  photo?: string;
  verification_document?: string | File;
  verification_method?: string;
}

interface LogManagementData {
  id?: number;
  created_at?: string;
  user_id?: number;
  first_name?: string;
  surname?: string;
  email?: string;
  action?: string;
  entity_id?: number;
  entity_type?: string;
}

interface DropDownData {
  id: number;
  value: number | string | undefined;
  name?: string;
}

interface DashboardDropDownData {
  id: number;
  value: string;
  name: string;
  route: string;
}

interface NestedDropdown {
  [division: string]: DropDownData[];
}

export type {
  UserManagementData,
  ListParams,
  LogManagementData,
  DropDownData,
  NestedDropdown,
  DashboardDropDownData,
};
