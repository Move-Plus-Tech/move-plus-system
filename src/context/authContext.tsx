'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLoggedUser, getToken, logout as logoutStorage } from '../services/auth';

interface AuthContextType {
  user: any | null;
  token: string | null;
  email: string | null;
  role: string | null;
  hydrated: boolean;
  loginUser: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  email: null,
  hydrated: false,
  role: null,
  loginUser: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      try {
        const parsed = JSON.parse(savedUser);
        setEmail(parsed?.email ?? null);
        setRole(parsed?.role ?? null);
      } catch (e) {
        setEmail(null);
      }
    } else {

      const loggedUser = getLoggedUser();
      const storedToken = getToken();
      setUser(loggedUser);
      setToken(storedToken);
      setEmail(loggedUser?.email ?? null);
      setRole(loggedUser?.role ?? null);
    }

    setHydrated(true);
  }, []);

  const loginUser = (userData: any, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    setEmail(userData?.email ?? null);
    setRole(userData?.role ?? null);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    if (userData?.email) localStorage.setItem('email', userData.email);
  };

  const logout = () => {
    logoutStorage();
    setUser(null);
    setToken(null);
    setEmail(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ user, token, email, role, loginUser, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
