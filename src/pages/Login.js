import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../firebase/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {globalStyles} from '../styles/globalStyles';

import PIDTextInput from '../components/PIDTextInput'
import PIDButton from '../components/PIDButton';
import PIDTextLink from '../components/PIDTextLink';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [authUser, setAuthUser] = useState(null);

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, senha)
    .then((user) => {
      console.log(user);
      setAuthUser({
        email: user.user.email,
        uid: user.user.uid
      })
      //navigation.navigate('TelaInicialPet');  /* NÃO DELETAR, PERTENCE AO FIREBASE // ENTRA COM LOGIN PRONTO /*/
    })
    .catch(err => {
      if(err.code === "auth/missing-password"){
        console.log("A senha é obrigatória")
        return;
      }
      console.log(err.code);
    })
  }

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[globalStyles.container, {paddingTop: 160}]}>
            <StatusBar style="auto" />
            <Image source={require('../assets/img/LogoTitulo.png')} style={globalStyles.image}/>
            <PIDTextInput placeholder = 'E-mail' value={email} onChangeText={setEmail}/>
            <PIDTextInput placeholder = 'Senha' value={senha} secureTextEntry onChangeText={setSenha} />
            
            <View style={globalStyles.rowContainer}>
              <PIDTextLink title= 'Esqueci minha senha'
              onPress={() => navigation.navigate('ForgotPassoword')}
              />
              <PIDButton title = "Entrar"
              //onPress={handleLogin}  /* NÃO DELETAR, PERTENCE AO FIREBASE // ENTRA COM LOGIN PRONTO /
              onPress={() => navigation.navigate('TelaInicialPet')}             
              />
            </View>

            <View style={globalStyles.footerContainer}>
              <PIDTextLink title='Crie sua Conta' 
              underlined={true}
              onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
      </TouchableWithoutFeedback>
  );
}

