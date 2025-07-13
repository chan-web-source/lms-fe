// import { SortOptions } from '@/Types/user.types';
import type { DropDownData, NestedDropdown, DashboardDropDownData } from '~/types/management';

const RoleListOptions: DropDownData[] = [
  { id: 1, value: 1, name: 'License User' },
  { id: 2, value: 2, name: 'Chief Executive Officer' },
  { id: 3, value: 3, name: 'Enforcement Compliance' },
  { id: 4, value: 4, name: 'Peer Review' },
  { id: 5, value: 5, name: 'Legal' },
  { id: 6, value: 6, name: 'Licensing' },
  { id: 7, value: 7, name: 'Supervision' },
  { id: 8, value: 8, name: 'Investigation' },
  { id: 9, value: 9, name: 'Office of Secretariat' },
  { id: 10, value: 10, name: 'Publication' },
  { id: 11, value: 11, name: 'System Admin' },
];

const AccountTypeOptions: DropDownData[] = [
  { id: 1, value: 'Internal', name: 'Internal' },
  { id: 2, value: 'External', name: 'External' },
];

const DivisionOptions: DropDownData[] = [
  { id: 1, name: 'Licensing & Supervision', value: 'Licensing & Supervision' },
  { id: 2, name: 'Research & Publication', value: 'Research & Publication' },
  { id: 3, name: 'Legal Service', value: 'Legal Service' },
  { id: 4, name: 'Corporate Services', value: 'Corporate Services' },
  { id: 5, name: 'Office of the CEO', value: 'Office of the CEO' },
];

const DivisionUnitOptions: NestedDropdown = {
  'Licensing & Supervision': [
    { id: 1, name: 'Licensing', value: 'Licensing' },
    { id: 2, name: 'Supervision', value: 'Supervision' },
    { id: 3, name: 'Investigation', value: 'Investigation' },
    { id: 4, name: 'Market Data', value: 'Market Data' },
  ],
  'Research & Publication': [
    { id: 5, name: 'Research', value: 'Research' },
    { id: 6, name: 'Investment', value: 'Investment' },
    { id: 7, name: 'Media & Publication', value: 'Media & Publication' },
  ],
  'Legal Service': [
    { id: 8, name: 'Legal', value: 'Legal' },
    { id: 9, name: 'Enforcement & Compliance', value: 'Enforcement & Compliance' },
  ],
  'Corporate Services': [
    { id: 10, name: 'Human Resources', value: 'Human Resources' },
    { id: 11, name: 'Finance & Administration', value: 'Finance & Administration' },
    { id: 12, name: 'Information Technology', value: 'Information Technology' },
  ],
  'Office of the CEO': [
    { id: 13, name: 'General Counsel', value: 'General Counsel' },
    { id: 14, name: 'Internal Audit', value: 'Internal Audit' },
  ],
};

const accountStatusOptions: DropDownData[] = [
  { id: 1, value: 'Active', name: 'Active' },
  { id: 2, value: 'Inactive', name: 'Inactive' },
];

const VerificationMethodOptions: DropDownData[] = [
  { id: 1, name: 'National ID (NID)', value: 'National ID (NID)' },
  { id: 2, name: `Driver’s License`, value: `Driver’s License` },
  { id: 3, name: 'Passport', value: 'Passport' },
];

const MFAOptions: DropDownData[] = [
  { id: 1, value: 'Enabled', name: 'Enabled' },
  { id: 2, value: 'Disabled', name: 'Disabled' },
];

const PreferredMethodOptions: DropDownData[] = [
  { id: 1, value: 'email', name: 'Email Address' },
  { id: 2, value: 'phone', name: 'Phone' },
];

const dashboardOptions: DashboardDropDownData[] = [
  { id: 1, value: 'Admin Dashboard', name: 'Admin Dashboard', route: '/admin/user-management' },
  {
    id: 7,
    value: 'Licensing Dashboard',
    name: 'Licensing Dashboard',
    route: '/licensing/application-management',
  },
];

export {
  AccountTypeOptions,
  VerificationMethodOptions,
  MFAOptions,
  PreferredMethodOptions,
  RoleListOptions,
  DivisionOptions,
  DivisionUnitOptions,
  accountStatusOptions,
  dashboardOptions,
};
