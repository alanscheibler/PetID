import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import TelaInicialPet from './src/pages/TelaInicialPet';
import User from './src/pages/User';
import RegisterPet from './src/pages/RegisterPet'

// Mantendo a splash screen visível até que as fontes sejam carregadas
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      // Carrega as fontes personalizadas
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login' 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register' 
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TelaInicialPet' 
          component={TelaInicialPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='User' 
          component={User}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='RegisterPet' 
          component={RegisterPet}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}