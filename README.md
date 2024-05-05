<div align="center"><a name="readme-top"></a>

<img height="160" src="https://unpkg.com/@arietta-studio/assets-logo@latest/assets/logo-3d.webp">

<h1>React Native AppWrite SDK</h1>

AppWrite SDK for React-Native

[![][npm-release-shield]][npm-release-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-test-shield]][github-action-test-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

[Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

## 📦 Installation

To install `@arietta-studio/appwrite-sdk react-native-url-polyfill`, run the following command:

[![][bun-shield]][bun-link]

```bash
$ bun add @arietta-studio/appwrite-sdk react-native-url-polyfill
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

### Add your Platform

If this is your first time using Appwrite, create an account and create your first project.

Then, under Add a platform, add a Android app or a Apple app. You can skip optional steps.

#### iOS steps

Add your app name and Bundle ID. You can find your Bundle Identifier in the General tab for your app's primary target in XCode. For Expo projects you can set or find it on app.json file at your project's root directory.

#### Android steps

Add your app's name and package name, Your package name is generally the applicationId in your app-level build.gradle file. For Expo projects you can set or find it on app.json file at your project's root directory.

### Setup

On `index.js` add import for `react-native-url-polyfill`

```
import 'react-native-url-polyfill/auto'
```

> If you are building for iOS, don't forget to install pods
> `cd ios && pod install && cd ..`

### Init your SDK

Add these values to `.env` file:

```js
APPWRITE_ENDPOINT =
  APPWRITE_PLATFORM =
  APPWRITE_PROJECT_ID =
  APPWRITE_STORAGE_ID =
  APPWRITE_DATABASE_ID =
  APPWRITE_USER_COLLECTION_ID =
    'users';
```

Initialize your SDK with your Appwrite server API endpoint and project ID which can be found in your project settings page.

```tsx
import { AppWriteProvider } from '@arietta-studio/appwrite-sdk';
import * as SplashScreen from 'expo-splash-screen';

const App = () => {
  const appWriteConfig = {
    endpoint: process.env.APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1',
    platform: process.env.APPWRITE_PLATFORM ?? 'com.arietta.studio',
    projectId: process.env.APPWRITE_PROJECT_ID ?? 'appWrite-project',
    storageId: process.env.APPWRITE_STORAGE_ID ?? 'appWrite-storage',
    databaseId: process.env.APPWRITE_DATABASE_ID ?? 'appWrite-database',
    userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID ?? 'users',
  };

  useEffect(() => {
    // Stop the Splash Screen from being hidden.
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    void showSplashScreen();
  }, []);

  return (
    <AppWriteProvider config={appWriteConfig}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            dark: true,
          }}
        >
          <MainRootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppWriteProvider>
  );
};

export default App;
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

### Use in application

```tsx
import { useAppWrite } from '@arietta-studio/appwrite-sdk';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { type FC, useEffect } from 'react';

import Onboarding from '../pages/Onboarding';
import Profile from '../pages/Profile';
import HomeTabNavigator from './HomeTabNavigator';
import { ScreenNames } from './ScreenNames';

export type MainRootStackParams = {
  // Onboarding
  [ScreenNames.Onboarding]: undefined;

  // Home
  [ScreenNames.MainHome]: undefined;
  [ScreenNames.Profile]: undefined;
};
export const MainStack = createNativeStackNavigator<MainRootStackParams>();

export const MainRootStack: FC = () => {
  const { isAuthenticated, isAuthenticationLoading } = useAppWrite();

  useEffect(() => {
    // Once our data is ready, hide the Splash Screen
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (!isAuthenticationLoading) {
      void hideSplashScreen();
    }
  }, [isAuthenticationLoading]);

  return (
    <MainStack.Navigator initialRouteName={ScreenNames.MainHome}>
      {isAuthenticated ? (
        <MainStack.Group>
          <MainStack.Screen
            name={ScreenNames.MainHome}
            component={HomeTabNavigator}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={ScreenNames.Profile}
            component={Profile}
            options={{ headerShown: false }}
          />
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen
            name={ScreenNames.Onboarding}
            component={Onboarding}
            options={{ headerShown: false }}
          />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
};
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### Hook gives you these functions and variables

```ts
type AppWriteContextType = {
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
```

## 🤝 Contributing

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-link]

[![][github-contrib-shield]][github-contrib-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[github-action-release-link]: https://github.com/arietta-studio/appwrite-sdk-ts/actions/workflows/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/arietta-studio/appwrite-sdk-ts/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/arietta-studio/appwrite-sdk-ts/actions/workflows/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/arietta-studio/appwrite-sdk-ts/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-contrib-link]: https://github.com/arietta-studio/arietta-readme-wizard/graphs/contributors
[github-contrib-shield]: https://contrib.rocks/image?repo=arietta-studio%2Farietta-readme-wizard
[github-contributors-link]: https://github.com/arietta-studio/appwrite-sdk-ts/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/arietta-studio/appwrite-sdk-ts?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/arietta-studio/appwrite-sdk-ts/network/members
[github-forks-shield]: https://img.shields.io/github/forks/arietta-studio/appwrite-sdk-ts?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/arietta-studio/appwrite-sdk-ts/issues
[github-issues-shield]: https://img.shields.io/github/issues/arietta-studio/appwrite-sdk-ts?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/arietta-studio/appwrite-sdk-ts/blob/master/LICENSE
[github-license-shield]: https://img.shields.io/github/license/arietta-studio/appwrite-sdk-ts?color=white&labelColor=black&style=flat-square
[github-releasedate-link]: https://github.com/arietta-studio/appwrite-sdk-ts/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/arietta-studio/appwrite-sdk-ts?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/arietta-studio/appwrite-sdk-ts/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/arietta-studio/appwrite-sdk-ts?color=ffcb47&labelColor=black&style=flat-square
[npm-release-link]: https://www.npmjs.com/package/@arietta-studio/appwrite-sdk
[npm-release-shield]: https://img.shields.io/npm/v/@arietta-studio/appwrite-sdk?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[pr-welcome-link]: https://github.com/arietta-studio/arietta-readme-wizard/pulls
[pr-welcome-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20PR%20WELCOME-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
