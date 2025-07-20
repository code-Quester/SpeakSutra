import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isEnrolled: boolean;
  customerId: string | null;
  orderId: string | null;
  login: (customerId: string, orderId: string) => void;
  logout: () => void;
  checkEnrollment: (customerId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Only check enrollment when explicitly needed, not on app load
  const checkEnrollment = async (customerId: string): Promise<boolean> => {
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://speaksutra-backend.onrender.com/api/verify-enrollment'
        : 'http://localhost:3000/api/verify-enrollment';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.isEnrolled;
      }
      return false;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  };

  const login = (customerId: string, orderId: string) => {
    setIsEnrolled(true);
    setCustomerId(customerId);
    setOrderId(orderId);
    localStorage.setItem('customerId', customerId);
    localStorage.setItem('orderId', orderId);
  };

  const logout = () => {
    setIsEnrolled(false);
    setCustomerId(null);
    setOrderId(null);
    localStorage.removeItem('customerId');
    localStorage.removeItem('orderId');
  };

  const value: AuthContextType = {
    isEnrolled,
    customerId,
    orderId,
    login,
    logout,
    checkEnrollment,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 