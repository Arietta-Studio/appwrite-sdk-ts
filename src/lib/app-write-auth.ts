import { Client } from 'client';
import { type AppwriteConfigType } from './AppWriteProvider';
import { Account } from 'services/account';
import { Avatars } from 'services/avatars';
import { Databases } from 'services/databases';
import { Query } from 'query';
import { ID } from 'id';

function handleApiError(error: unknown): Error {
  if (error instanceof Error) {
    return new Error(error.message);
  }
  return new Error('An unexpected error occurred');
}

export const appWriteAuth = (config: AppwriteConfigType) => {
  const client = new Client();

  client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

  const account = new Account(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);

  // Register user
  const signUp = async (email: string, password: string, username: string) => {
    try {
      const newAccount = await account.create(ID.unique(), email, password, username);

      const avatarUrl = avatars.getInitials(username);

      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          avatar: avatarUrl,
        }
      );

      await signIn(email, password);

      return newUser;
    } catch (error: unknown) {
      throw handleApiError(error);
    }
  };

  // Sign In
  const signIn = async (email: string, password: string) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);

      return session;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      const session = await account.deleteSession('current');

      return session;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  // Get Account
  const getAccount = async () => {
    try {
      const currentAccount = await account.get();

      return currentAccount;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  // Get Current User
  const getCurrentUser = async () => {
    try {
      const currentAccount = await getAccount();

      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
      );

      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    signUp,
    signIn,
    getAccount,
    getCurrentUser,
    signOut,
  };
};
