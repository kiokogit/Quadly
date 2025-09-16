import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the user object
export interface User {
  full_name: string;
  email: string;
  role: string;
  names_split: [string];
}

// Create a new type for context value including setter
interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with default value
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Updated provider with state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
