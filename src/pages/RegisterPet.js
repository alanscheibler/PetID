import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import colors from '../styles/colors';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';

export default function RegisterPet() {

  const navigation = useNavigation();
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
    <ScrollView style={styles.scrollContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          
          <Image 
            source={require('../assets/img/LogoTitulo.png')}
            style={styles.image} 
          />

          <PIDTextInput placeholder='Nome' />
          <PIDTextInput placeholder='Espécie' />
          <PIDTextInput placeholder='Raça' />
          <PIDTextInput placeholder='Data de nascimento' />
          <PIDTextInput placeholder='Sexo' />

          <View style={styles.rowContainer}>
            <PIDCheckMarker title='Pet castrado' />
          </View>

          <View style={styles.buttonContainer}>
            <PIDButton 
            title='Adicionar Foto' 
            outline={true} 
            size='big'
            onPress={alterarFotoPerfil}
            />
          </View>
          
          <View style={styles.rowContainer}>
              <PIDButton title='Cancelar' outline={true} onPress={() => navigation.navigate('Login')}/>
              <PIDButton title='Registrar' onPress={() => navigation.navigate('Login')}/>
          </View>
          
        </View>
        
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerLeft: {
    alignSelf: 'flex-start', 
    marginLeft: 64,
  },
  scrollContainer: {
    backgroundColor: colors.colors.background,
    paddingVertical: 104,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 64,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 64,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});