import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface StatusContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isSuccessful: boolean;
  setIsSuccessful: (sucess:boolean) => void;
}

const StatusContext = createContext<StatusContextProps | undefined>(undefined);

export const StatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (isSuccessful) {
      const timer = setTimeout(() => {
        setIsSuccessful(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessful]);

  return (
    <StatusContext.Provider value={{ isLoading, setIsLoading, error, setError, isSuccessful, setIsSuccessful }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatusContext = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatusContext must be used within a StatusProvider");
  }
  return context;
};
