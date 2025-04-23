// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

type User = {
  name: string;
  email: string;
  role: 'admin' | 'recepcionista' | 'esteticista' | 'usuario';
};

type AuthContextType = {
    user: User | null;
    signIn: (userData: User) => void;
    signOut: () => void;
  };
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
    const signIn = (userData: User) => setUser(userData);
    const signOut = () => setUser(null);

    return (
      <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
