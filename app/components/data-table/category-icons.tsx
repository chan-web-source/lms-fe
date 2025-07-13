import { BriefcaseBusiness, Settings, ToggleRight, ChartLine, SquareMenu } from 'lucide-react';
import type { UserCategory, ApplicationCategory } from '~/types/filter';

// user management
export const categoryIcons: Record<UserCategory, React.ElementType> = {
  'Account Type': Settings,
  'Account Status': ToggleRight,
  Role: BriefcaseBusiness,
};

// application management
export const applicationCategoryIcons: Record<ApplicationCategory, React.ElementType> = {
  'Application Status': ToggleRight,
  'Regulated Activity': ChartLine,
  'Application Type': SquareMenu,
};
