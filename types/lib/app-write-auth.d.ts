import { type AppwriteConfigType } from './AppWriteProvider';
export declare const appWriteAuth: (config: AppwriteConfigType) => {
    signUp: (email: string, password: string, username: string) => Promise<import("../models").Models.Document>;
    signIn: (email: string, password: string) => Promise<import("../models").Models.Session>;
    getAccount: () => Promise<import("../models").Models.User<import("../models").Models.Preferences>>;
    getCurrentUser: () => Promise<import("../models").Models.Document | null>;
    signOut: () => Promise<{}>;
};
