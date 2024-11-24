import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';

export default function ForgotPassoword() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container(colors), { paddingTop: '50%' }]}>
        <StatusBar style="auto" />
        <Image source={require('../assets/img/LogoTitulo.png')} style={styles.image} />
        <Text style={styles.text(colors)}>Enviaremos um email com as instruções de recuperação da sua senha.</Text>
        <PIDTextInput placeholder="E-mail" value={email} onChangeText={setEmail} />

        <View style={styles.buttonContainer}>
            <PIDButton title="Cancelar" outline={true} onPress={() => navigation.navigate('Login')} />
            <PIDButton title="Enviar" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:(colors)=>({
    flex: 1,
    backgroundColor:colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 64,
}),
  text:(colors)=>({
    width: 250,
    fontSize: 16,
    textAlign: 'justify',
    color: colors.green,
  }),
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    marginTop: 10, 
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
},
});