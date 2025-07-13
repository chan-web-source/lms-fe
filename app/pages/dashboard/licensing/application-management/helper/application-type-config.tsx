// config/application-type-config.tsx

import React from 'react';
import {
  AccessIcon,
  ExchangeIcon,
  PencilEditIcon,
  FileUnknownIcon,
  FileSyncIcon,
  FileIcon,
} from '~/assets/icons';

interface ApplicationTypeConfig {
  icon: React.ReactNode;
  route: string;
}

export const applicationTypeConfig: Record<string, ApplicationTypeConfig> = {
  'Application for Grant': {
    icon: <AccessIcon svgProps={{ className: 'size-5' }} />,
    route: '/licensing/application-management/grant-applications',
  },
  'Application for Renewal': {
    icon: <ExchangeIcon svgProps={{ className: 'size-5' }} />,
    route: '#',
  },
  'Notice of Change in Particulars of CML': {
    icon: <PencilEditIcon svgProps={{ className: 'size-5' }} />,
    route: '#',
  },
  'Notice of Intention to Surrender CML': {
    icon: <FileUnknownIcon svgProps={{ className: 'size-5' }} />,
    route: '#',
  },
  'Return & Information Submission Form': {
    icon: <FileSyncIcon svgProps={{ className: 'size-5' }} />,
    route: '#',
  },
  'Variation or Transfer Request Form': {
    icon: <FileIcon svgProps={{ className: 'size-5' }} />,
    route: '#',
  },
};
