import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import PIDTextInput from '../components/PIDTextInput'
import PIDButton from '../components/PIDButton';
import PIDTextLink from '../components/PIDTextLink';

export default function Login() {

  const navigation = useNavigation();

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Image source={require('../assets/img/LogoTitulo.png')} style={styles.image}/>
            <PIDTextInput placeholder = 'E-mail'/>
            <PIDTextInput placeholder = 'Senha'/>
            
            <View style={styles.rowContainer}>
              <PIDTextLink title= 'Esqueci minha senha'/>
              <PIDButton title = "Entrar"/>
            </View>

            <View style={styles.footerContainer}>
              <PIDTextLink title='Crie sua Conta' 
              underlined={true}
              onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 160,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: ' center',
    justifyContent:'space-between',
    width: '100%',
    paddingHorizontal: 64,
  },

  footerContainer: {
    position: 'absolute',
    bottom:0,
    width: '100%',
    padding:24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
});
