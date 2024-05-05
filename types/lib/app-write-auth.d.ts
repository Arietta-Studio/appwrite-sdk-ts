import { type AppwriteConfigType } from './AppWriteProvider';
export declare const appWriteAuth: (config: AppwriteConfigType) => {
    signUp: (email: string, password: string, username: string) => Promise<import("client").Models.Document>;
    signIn: (email: string, password: string) => Promise<import("client").Models.Session>;
    getAccount: () => Promise<import("client").Models.User<import("client").Models.Preferences>>;
    getCurrentUser: () => Promise<import("client").Models.Document | null>;
    signOut: () => Promise<{}>;
};
