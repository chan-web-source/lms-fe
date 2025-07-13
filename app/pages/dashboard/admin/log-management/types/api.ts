export type Log = {
  message: any;
  timestamp: string | number | Date;
  id: number;
  created_at: string;
  user_id: number;
  first_name: string;
  surname: string;
  email: string;
  category: string;
  action: string;
  entity_id: number;
  entity_type: string;
  ip_address: string;
};

export type GetLogsParams = {
  search?: string;
  user_id?: string;
  action?: string;
  category?: string;
  created_from?: string;
  created_till?: string;
  page?: number;
  per_page?: number;
  order_by?: string;
  order_dir?: string;
};
