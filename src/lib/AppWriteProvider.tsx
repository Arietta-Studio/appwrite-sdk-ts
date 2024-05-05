import React from 'react';
import { type Models } from '../index';
import { createContext, type FC, useContext, useEffect, useMemo, useState } from 'react';
import { appWriteAuth } from './app-write-auth';

export type AppWriteConfigType = {
  readonly endpoint: string;
  readonly platform: string;
  readonly projectId: string;
  readonly databaseId: string;
  readonly userCollectionId: string; // 'users'
};

export type AppWriteProviderProps = {
  readonly children: React.ReactNode;
  readonly config: AppWriteConfigType;
};

export type AppWriteContextType = {
  signUp: (email: string, password: string, username: string) => Promise<Models.Document>;
  signIn: (email: string, password: string) => Promise<Models.Session>;
  signOut: () => Promise<void>;
  userRefresh: () => Promise<void>;
  updateUser: (newUser: Models.Document) => Promise<void>;
  isAuthenticated: boolean;
  user: Models.Document | undefined;
  isAuthenticationLoading: boolean;
  isUserDataRefreshing: boolean;
};

const AppWriteContext = createContext<AppWriteContextType>({
  signUp: async () => {
    throw new Error('AppWriteProvider not found');
  },
  signIn: async () => {
    throw new Error('AppWriteProvider not found');
  },
  signOut: async () => {
    throw new Error('AppWriteProvider not found');
  },
  userRefresh: async () => {
    throw new Error('AppWriteProvider not found');
  },
  updateUser: async () => {
    throw new Error('AppWriteProvider not found');
  },
  isAuthenticated: false,
  user: undefined,
  isAuthenticationLoading: true,
  isUserDataRefreshing: false,
});

export const useAppWrite = () => useContext(AppWriteContext);

export const AppWriteProvider: FC<AppWriteProviderProps> = ({ children, config }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Models.Document | undefined>(undefined);
  const [isAuthenticationLoading, setIsAuthenticationLoading] = useState<boolean>(true); // for initial navigation guards
  const [isUserDataRefreshing, setIsUserDataRefresh] = useState<boolean>(false);

  const { signUp, signIn, signOut, getCurrentUser } = appWriteAuth(config);

  const fetchUserData = async () => {
    setIsUserDataRefresh(true);
    const userData = await getCurrentUser();
    setIsAuthenticated(userData !== undefined);
    setUser(userData);
    setIsAuthenticationLoading(false);
    setIsUserDataRefresh(false);
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    const newUser = await signUp(email, password, username);
    await fetchUserData(); // Refresh user data post-sign-up
    return newUser;
  }

  const handleSignIn = async (email: string, password: string) => {
    const session = await signIn(email, password);
    await fetchUserData(); // Refresh user data post-sign-in
    return session;
  };

  const handleSignOut = async () => {
    await signOut();
    setIsAuthenticated(false);
    setUser(undefined);
  }

  const handleUserRefresh = async () => {
    await fetchUserData();
  }

  // Placeholder for future functionality
  const handleUpdateUser = async (newUser: Models.Document) => {
    setUser(newUser);
  }

  const contextValue = useMemo(
    () => ({
      signUp: handleSignUp,
      signIn: handleSignIn,
      signOut: handleSignOut,
      userRefresh: handleUserRefresh,
      updateUser: handleUpdateUser,
      isAuthenticated,
      user,
      isAuthenticationLoading,
      isUserDataRefreshing,
    }),
    [isAuthenticated, user, isAuthenticationLoading, isUserDataRefreshing]
  );

  useEffect(() => {
    void fetchUserData();
  }, []);

  return <AppWriteContext.Provider value={contextValue}>{children}</AppWriteContext.Provider>;
};
