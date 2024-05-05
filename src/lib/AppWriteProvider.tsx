import React from 'react';
import { type Models } from '../index';
import { createContext, type FC, useContext, useEffect, useMemo, useState } from 'react';
import { appWriteAuth } from './app-write-auth';

export type AppwriteConfigType = {
  readonly endpoint: string;
  readonly platform: string;
  readonly projectId: string;
  readonly databaseId: string;
  readonly userCollectionId: string; // 'users'
};

export type AppWriteProviderProps = {
  readonly children: React.ReactNode;
  readonly config: AppwriteConfigType;
};

export type AppWriteContextType = {
  signUp: (email: string, password: string, username: string) => Promise<Models.Document>;
  signIn: (email: string, password: string) => Promise<Models.Session>;
  signOut: () => Promise<{}>;
  isAuthenticated: boolean;
  user: Models.Document | undefined;
  isAuthenticationLoading: boolean;
};

const AppWriteContext = createContext<AppWriteContextType | undefined>(undefined);

export const useAppWrite = () => useContext(AppWriteContext);

export const AppWriteProvider: FC<AppWriteProviderProps> = ({ children, config }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Models.Document | undefined>(undefined);
  const [isAuthenticationLoading, setIsAuthenticationLoading] = useState<boolean>(true);

  const { signUp, signIn, signOut, getCurrentUser } = appWriteAuth(config);

  const fetchUserData = async () => {
    setIsAuthenticationLoading(true);
    const userData = await getCurrentUser();
    if (userData) {
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      setUser(undefined);
    }
    setIsAuthenticationLoading(false);
  };

  const handleSignIn = async (email: string, password: string) => {
    const session = await signIn(email, password);
    await fetchUserData(); // Refresh user data post-sign-in
    return session;
  };

  const contextValue = useMemo(
    () => ({
      signUp,
      signIn: handleSignIn,
      signOut,
      isAuthenticated,
      user,
      isAuthenticationLoading,
    }),
    [isAuthenticated, user, isAuthenticationLoading]
  );

  useEffect(() => {
    void fetchUserData();
  }, []);

  return <AppWriteContext.Provider value={contextValue}>{children}</AppWriteContext.Provider>;
};
