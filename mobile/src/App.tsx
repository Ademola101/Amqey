import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import Constants from 'expo-constants';
import FlashMessage from 'react-native-flash-message';
import { QueryClientProvider,
  QueryClient
 } from "@tanstack/react-query";
import { Navigation } from './navigation';
import { theme } from '../config/theme';
import { StatusBar } from 'react-native';
Asset.loadAsync([
  ...NavigationAssets,
]);


SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

const queryClient = new QueryClient();
export function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Navigation

        linking={{
          enabled: 'auto',
            prefixes: [prefix],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
    <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
      <FlashMessage
        position="top"
        titleStyle={{
          fontFamily: "ClashMedium",
          textAlign: "center",
        }}
        duration={3000}
        floating={true}
        // @ts-expect-error:
        icon={{ icon: "auto", position: "left" }}
        style={{ marginTop: Constants.statusBarHeight }}
      />
    </QueryClientProvider>
  );
}
