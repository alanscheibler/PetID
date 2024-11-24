import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import AppRoutes from './src/routes/AppRoutes';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
  
      await Font.loadAsync({
        'Signika-Bold': require('./src/assets/fonts/Signika-Bold.ttf'),
        'Signika-Regular': require('./src/assets/fonts/Signika-Regular.ttf'),
        'Signika-Light': require('./src/assets/fonts/Signika-Light.ttf'),
        'Signika-Medium': require('./src/assets/fonts/Signika-Medium.ttf'),
        'Signika-SemiBold': require('./src/assets/fonts/Signika-SemiBold.ttf'),
      });

      setFontsLoaded(true);

      await SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </ThemeProvider>
    
  );
};