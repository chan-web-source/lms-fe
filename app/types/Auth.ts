export interface AuthUser {
  email: string;
  exp: number;
  first_name: string;
  id: number;
  last_login: string | null;
  permission_ids: number[];
  role_ids: number[];
  surname: string;
}
