export type Filters = {
  'Account Type': ('Internal' | 'External')[];
  'Account Status': string[];
  Role: number[];
};

export const initialFilters: Filters = {
  'Account Type': [],
  'Account Status': [],
  Role: [] as number[],
};

export type LogFilterType = {
  Action: string[];
  User: string[];
  Module: string[];
  Date: string[];
};

export const logfilters: LogFilterType = {
  Action: [],
  User: [],
  Module: [],
  Date: [],
};
