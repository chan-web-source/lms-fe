// providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { AuthUser } from '~/types/Auth';

const AuthContext = createContext<{
  user: AuthUser | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null | undefined>>;
}>({
  user: undefined,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) return setUser(null);

    try {
      const decoded = jwtDecode<AuthUser>(token);
      setUser(decoded);
    } catch (err) {
      console.error('Invalid token', err);
      setUser(null);
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
