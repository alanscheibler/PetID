import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {globalStyles} from '../styles/globalStyles';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';

export default function RegisterPet() {

  const navigation = useNavigation();
  const onCancellPress = () => navigation.navigate('TelaInicialPet') 
  const onRegisterPress = () => navigation.navigate('TelaInicialPet') 

  const [fotoPerfil, setFotoPerfil] = useState(null);

  const alterarFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
};

  return (
    <ScrollView style={globalStyles.scrollContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          <StatusBar style="auto" />
          
          <Image 
            source={require('../assets/img/LogoTitulo.png')}
            style={globalStyles.image} 
          />

          <PIDTextInput placeholder='Nome' />
          <PIDTextInput placeholder='Espécie' />
          <PIDTextInput placeholder='Raça' />
          <PIDTextInput placeholder='Data de nascimento' />
          <PIDTextInput placeholder='Sexo' />

          <View style={globalStyles.rowContainer}>
            <PIDCheckMarker title='Pet castrado' />
          </View>

          <View style={globalStyles.rowContainer}>
              <PIDButton 
                title='Alterar Foto' 
                outline={true} 
                onPress={alterarFotoPerfil} 
                size='big'
              />
          </View> 
          
          <View style={globalStyles.rowContainer}>
              <PIDButton title='Cancelar' outline={true} onPress={onCancellPress}/>
              <PIDButton title='Registrar' onPress={onRegisterPress}/>
          </View>
          
        </View>
        
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
