import { useEffect, useState } from 'react';
import type { AuthUser } from '~/types/Auth';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function useAuthInit() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');

    if (token) {
      try {
        const decoded = jwtDecode<AuthUser>(token);

        if (decoded?.first_name && Array.isArray(decoded?.role_ids)) {
          setUser(decoded);
        } else {
          Cookies.remove('auth_token');
          Cookies.remove('corporation_id');
          Cookies.remove('application_draft');
          Cookies.remove('capital_market_id');
          Cookies.remove('individual_id');
        }
      } catch (error) {
        Cookies.remove('auth_token');
        Cookies.remove('corporation_id');
        Cookies.remove('application_draft');
        Cookies.remove('capital_market_id');
        Cookies.remove('individual_id');
        console.error('JWT Decode Error:', error);
      }
    }
  }, []);

  return { user, setUser };
}
