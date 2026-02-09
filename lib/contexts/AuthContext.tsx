"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../api';
import { User } from '../api/config';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        // Token might be invalid, logout
        AuthService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });
    setUser(response.user);
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    const response = await AuthService.register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    setUser(response.user);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      // If refresh fails, logout
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

