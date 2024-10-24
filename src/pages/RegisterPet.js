import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore'; 
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles/globalStyles';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';

export default function RegisterPet() {
  const navigation = useNavigation();
  
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [petCastrado, setPetCastrado] = useState(false);

  const alterarFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setFotoPerfil(result.uri);
    }
  };

  const onRegisterPress = async () => {
    try {
      await addDoc(collection(db, 'pets'), {
        nome,
        especie,
        raca,
        dataNascimento,
        sexo,
        petCastrado,
        fotoPerfil,
      });
      Alert.alert('Pet registrado com sucesso!');
      navigation.navigate('TelaInicialPet'); 
    } catch (error) {
      console.error("Erro ao registrar o pet: ", error);
      Alert.alert('Erro', 'Não foi possível registrar o pet.');
    }
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

          <PIDTextInput placeholder='Nome' value={nome} onChangeText={setNome} />
          <PIDTextInput placeholder='Espécie' value={especie} onChangeText={setEspecie} />
          <PIDTextInput placeholder='Raça' value={raca} onChangeText={setRaca} />
          <PIDTextInput placeholder='Data de nascimento' value={dataNascimento} onChangeText={setDataNascimento} />
          <PIDTextInput placeholder='Sexo' value={sexo} onChangeText={setSexo} />

          <View style={globalStyles.rowContainer}>
            <PIDCheckMarker 
              title='Pet castrado' 
              checked={petCastrado} 
              onCheckChange={() => setPetCastrado(!petCastrado)} 
            />
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
            <PIDButton title='Cancelar' outline={true} onPress={() => navigation.navigate('TelaInicialPet')} />
            <PIDButton title='Registrar' onPress={onRegisterPress} />
          </View>
          
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}