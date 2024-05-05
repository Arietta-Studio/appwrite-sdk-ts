import React from 'react';
import { type Models } from '../index';
import { type FC } from 'react';
export declare type AppwriteConfigType = {
    readonly endpoint: string;
    readonly platform: string;
    readonly projectId: string;
    readonly databaseId: string;
    readonly userCollectionId: string;
};
export declare type AppWriteProviderProps = {
    readonly children: React.ReactNode;
    readonly config: AppwriteConfigType;
};
export declare type AppWriteContextType = {
    signUp: (email: string, password: string, username: string) => Promise<Models.Document>;
    signIn: (email: string, password: string) => Promise<Models.Session>;
    signOut: () => Promise<{}>;
    isAuthenticated: boolean;
    user: Models.Document | undefined;
    isAuthenticationLoading: boolean;
};
export declare const useAppWrite: () => AppWriteContextType;
export declare const AppWriteProvider: FC<AppWriteProviderProps>;
