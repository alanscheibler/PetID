import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import colors from '../styles/colors';

export default function ForgotPassoword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[globalStyles.container, { paddingTop: '50%' }]}>
        <StatusBar style="auto" />
        <Image source={require('../assets/img/LogoTitulo.png')} style={globalStyles.image} />
        <Text style={styles.text}>Enviaremos um email com as instruções de recuperação da sua senha.</Text>
        <PIDTextInput placeholder="E-mail" value={email} onChangeText={setEmail} />

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <PIDButton title="Cancelar" outline={true} onPress={() => navigation.navigate('Login')} />
          </View>
          <View style={styles.buttonWrapper}>
            <PIDButton title="Enviar" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    width: 250,
    fontSize: 16,
    textAlign: 'justify',
    color: colors.colors.green,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%', 
    paddingHorizontal: 20, 
    marginTop: 10, 
  },
  buttonWrapper: {
    flex: 1, 
    marginHorizontal: 10, 
  },
});