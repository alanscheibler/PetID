import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {globalStyles} from '../styles/globalStyles';

import PIDTextInput from '../components/PIDTextInput'
import PIDButton from '../components/PIDButton';
import colors from '../styles/colors';



export default function ForgotPassoword() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.container, {paddingTop: 160}]}>
          <StatusBar style="auto" />
          <Image source={require('../assets/img/LogoTitulo.png')} style={globalStyles.image}/>
          <Text style={styles.text}>Enviaremos um email com as instruções de recuperação da sua senha.</Text>
          <PIDTextInput placeholder = 'E-mail' value={email} onChangeText={setEmail}/>

          <View style={globalStyles.rowContainer}>
            <PIDButton title='Cancelar' outline={true} onPress={()=> navigation.navigate('Login')}/>
            <PIDButton title='Enviar' onPress={()=> navigation.navigate('Login')}/>
          </View>

        </View>
    </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
    text:{
        width: 250,
        fontSize: 16,
        textAlign: 'justify',
        color: colors.colors.green
    }
})