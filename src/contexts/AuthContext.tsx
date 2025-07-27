import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// تعریف نوع برای AuthContext
interface AuthContextType {
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const savedUser = localStorage.getItem('blogUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);
  
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with:', { username, password }); // لاگ برای دیباگ
      const response = await axios.post('https://weblog-backend-cl78.onrender.com/api/login', {
        username,
        password,
      });
      const userData = response.data;
      console.log('Login successful, user data:', userData); // لاگ موفقیت
      setUser(userData);
      localStorage.setItem('blogUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login error:', error.response?.data); // لاگ خطا
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};