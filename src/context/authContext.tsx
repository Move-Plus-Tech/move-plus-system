'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logout as logoutSession } from '../services/auth';

interface AuthContextType {
  user: any | null;
  email: string | null;
  canManageAdmin: boolean;
  hydrated: boolean;
  loginUser: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  email: null,
  hydrated: false,
  canManageAdmin: false,
  loginUser: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [canManageAdmin, setCanManageAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');

    fetch('/api/auth/me', { credentials: 'same-origin', cache: 'no-store' })
      .then(async (response) => response.ok ? response.json() : null)
      .then((profile) => {
        if (!active) return;
        setUser(profile);
        setEmail(profile?.email ?? null);
        setCanManageAdmin(profile?.capabilities?.manageAdmin === true);
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setEmail(null);
        setCanManageAdmin(false);
      })
      .finally(() => {
        if (active) setHydrated(true);
      });

    return () => { active = false; };
  }, []);

  const loginUser = (userData: any) => {
    setUser(userData);
    setEmail(userData?.email ?? null);
    setCanManageAdmin(userData?.capabilities?.manageAdmin === true);
  };

  const logout = () => {
    void logoutSession();
    setUser(null);
    setEmail(null);
    setCanManageAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, email, canManageAdmin, loginUser, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
