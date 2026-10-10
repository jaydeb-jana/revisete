import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Business, UserRole } from '../types';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { INITIAL_BUSINESSES } from '../lib/mockData';

interface AuthContextType {
  user: Profile | null;
  businesses: Business[];
  activeBusiness: Business | null;
  setActiveBusiness: (business: Business) => void;
  updateActiveBusiness: (updates: Partial<Business>) => void;
  userRole: UserRole;
  isLoading: boolean;
  isOnboardingCompleted: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addBusiness: (newBiz: Business) => void;
  updateOnboardingStatus: (completed: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>({
    id: 'usr-owner-1',
    full_name: 'Ajay Deb',
    email: 'janajaydeb36@gmail.com',
    phone: '+91 98765 43210',
    is_platform_admin: true,
    created_at: '2026-01-01T00:00:00Z',
  });

  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [activeBusiness, setActiveBusinessState] = useState<Business | null>(INITIAL_BUSINESSES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(true);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            is_platform_admin: true,
            created_at: session.user.created_at,
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || 'User',
            is_platform_admin: true,
            created_at: session.user.created_at,
          });
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
    return () => {};
  }, []);

  const setActiveBusiness = (biz: Business) => {
    setActiveBusinessState(biz);
  };

  const updateActiveBusiness = (updates: Partial<Business>) => {
    setActiveBusinessState(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      setBusinesses(bList => bList.map(b => b.id === updated.id ? updated : b));
      return updated;
    });
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    const emailClean = email.trim().toLowerCase();

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: emailClean, password: pass });
      
      if (error) {
        setIsLoading(false);
        // Strict Error Throwing for invalid credentials/password
        throw new Error(error.message || 'Invalid email or password.');
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || emailClean,
          full_name: data.user.user_metadata?.full_name || emailClean.split('@')[0],
          is_platform_admin: true,
          created_at: data.user.created_at,
        });
      }
    } else {
      // Local Authentication Password Verification
      await new Promise(r => setTimeout(r, 400));
      
      if (pass !== 'password123' && pass !== 'admin123') {
        setIsLoading(false);
        throw new Error('Invalid email or password. Incorrect password entered.');
      }

      setUser({
        id: 'usr-owner-1',
        full_name: emailClean.split('@')[0].toUpperCase(),
        email: emailClean,
        is_platform_admin: true,
        created_at: new Date().toISOString(),
      });
    }

    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    const emailClean = email.trim().toLowerCase();

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email: emailClean,
        password: pass,
        options: { data: { full_name: name } }
      });

      if (error) {
        setIsLoading(false);
        throw new Error(error.message || 'Registration failed.');
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          full_name: name || emailClean.split('@')[0],
          email: emailClean,
          is_platform_admin: true,
          created_at: data.user.created_at,
        });
      }
    } else {
      await new Promise(r => setTimeout(r, 400));
      setUser({
        id: 'usr-' + Date.now(),
        full_name: name || emailClean.split('@')[0],
        email: emailClean,
        is_platform_admin: true,
        created_at: new Date().toISOString(),
      });
    }

    setIsOnboardingCompleted(false);
    setIsLoading(false);
    return true;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
  };

  const addBusiness = (newBiz: Business) => {
    setBusinesses(prev => [newBiz, ...prev]);
    setActiveBusinessState(newBiz);
  };

  const updateOnboardingStatus = (completed: boolean) => {
    setIsOnboardingCompleted(completed);
  };

  return (
    <AuthContext.Provider value={{
      user,
      businesses,
      activeBusiness,
      setActiveBusiness,
      updateActiveBusiness,
      userRole: 'owner',
      isLoading,
      isOnboardingCompleted,
      login,
      register,
      logout,
      addBusiness,
      updateOnboardingStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
