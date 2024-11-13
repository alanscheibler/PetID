import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

import { loginUser } from '../Services/userService'; 
import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDTextLink from '../components/PIDTextLink';

import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {setUser} = useAuth();

  const handleLogin = async () => {
    const result = await loginUser(email, senha);

    if (result.success) {
      console.log(result.user)
      setUser(result.user)
      console.log("Login bem-sucedido:", result.user);
       navigation.navigate('TelaInicialPet'); 
    } else {
      console.log("Erro de login:", result.message);
      Alert.alert("Erro ao realizar login", result.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[globalStyles.container, { paddingTop: 160 }]}>
        <StatusBar style="auto" />
        <Image source={require('../assets/img/LogoTitulo.png')} style={globalStyles.image} />
        <PIDTextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
        <PIDTextInput placeholder="Senha" value={senha} secureTextEntry onChangeText={setSenha} />

        <View style={globalStyles.rowContainer}>
          <PIDTextLink title="Esqueci minha senha" onPress={() => navigation.navigate('ForgotPassword')} />
          <PIDButton title="Entrar" 
          onPress={handleLogin} 
          //onPress={() => navigation.navigate('TelaInicialPet')}  
          />
        </View>

        <View style={globalStyles.footerContainer}>
          <PIDTextLink title="Crie sua Conta" underlined={true} onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
