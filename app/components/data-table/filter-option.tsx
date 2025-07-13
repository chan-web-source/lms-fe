import type { UserCategory, ApplicationCategory } from '~/types/filter';

// user management
export const filterOptions: Record<UserCategory, string[]> = {
  'Account Type': ['Internal', 'External'],
  'Account Status': ['Active', 'Inactive'],
  Role: ['Licensing', 'Legal'],
};

// application management
export const applicationFilterOptions: Record<ApplicationCategory, string[]> = {
  'Application Status': [
    'Draft',
    'Pending Payment',
    'Under Payment Review',
    'Screen Application',
    'Additional Info Required',
    'Under Licensing Inquiry',
    'Under Committee Review',
    'Under Consideration',
    'Preparing Documents',
    'Pending Legal Review',
    'Finalising Documents',
    'Pending Proof of Service',
    'Publishing',
    'Closed'
  ],
  'Regulated Activity': [
    'Dealing in Securities',
    'Trading in Derivatives',
    'Fund Management',
    'Advising on Corporate Finance',
    'Investment Advice',
    'Financial Planning',
    'Trustees Services'
  ],
  'Application Type': [
    'Application for Grant',
    'Application for Renewal',
    'Notice of Change in Particulars of CML',
    'Notice of Intention to Surrender CML',
    'Return & Information Submission Form',
    'Variation or Transfer Request Form'
  ],
};
