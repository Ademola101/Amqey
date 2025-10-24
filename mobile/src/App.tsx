import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

export function App() {


  return (
    <Navigation
      
      linking={{
        enabled: 'auto',
        prefixes: [prefix],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
