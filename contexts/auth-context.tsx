"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  username: string;
  loginTime: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string) => {
    const newUser: User = {
      username,
      loginTime: Date.now(),
    };
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    const medsKey = `meds-${username}`;
    const vitalsKey = `vitals-${username}`;

    if (!localStorage.getItem(medsKey)) {
      localStorage.setItem(medsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(vitalsKey)) {
      localStorage.setItem(vitalsKey, JSON.stringify([]));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
