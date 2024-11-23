import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../Services/userService";
import { ActivityIndicator, View } from "react-native";

import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Map from "../pages/Map";
import Register from "../pages/Register";
import RegisterPet from "../pages/RegisterPet";
import TelaInicialPet from "../pages/TelaInicialPet";
import User from "../pages/User";
import VaccinationCard from "../pages/VaccinationCard";
import PetDetails from "../pages/PetDetails";

const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();


const AppNavigator = () => {
    return(
        <AppStack.Navigator>
            <AppStack.Screen
                name='TelaInicialPet' 
                component={TelaInicialPet}
                options={{ headerShown: false }}
            />
            <AppStack.Screen
                name='User' 
                component={User}
                options={{ headerShown: false }}
            />
            <AppStack.Screen
                name='RegisterPet' 
                component={RegisterPet}
                options={{ headerShown: false }}
            />
            <AppStack.Screen
                name='Map' 
                component={Map}
                options={{ headerShown: false }}
            />
            <AppStack.Screen
                name='VaccinationCard' 
                component={VaccinationCard}
                options={{ headerShown: false }}
            />
            <AppStack.Screen
                name='PetDetails' 
                component={PetDetails}
                options={{ headerShown: false }}
            />
        </AppStack.Navigator>
    );
};

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='Login' 
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='ForgotPassword' 
                component={ForgotPassword}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Register' 
                component={Register}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
};

export default function AppRoutes() {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
  
    const handleLogin = async () => {
      try {
        const credentials = await AsyncStorage.getItem("@userCredentials");
        if (credentials) {
          const { email, password } = JSON.parse(credentials);
          const userResponse = await loginUser(email, password);
    
          if (!userResponse.erro) {
            setUser(userResponse.user);
          }
        }
      } catch (error) {
        console.error("Erro ao tentar autenticar automaticamente:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      handleLogin();
    }, []);
  
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  
    return (
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  }