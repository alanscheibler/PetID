import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles/globalStyles';

import { registerPet } from '../Services/PetService';
import { useAuth } from '../context/AuthContext'; 

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';

export default function RegisterPet() {
  const { user } = useAuth(); 
  const navigation = useNavigation();
  
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('12/12/2012');
  const [sexo, setSexo] = useState('');
  const [petCastrado, setPetCastrado] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const alterarFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFotoPerfil(result.assets[0].uri);

      const imageUrl = await uploadPetPhoto(result.assets[0].uri, pet);
  
      if (imageUrl) {
        const updatedUser = await updatePetData(pet.id_pet, { fotoPerfil: imageUrl });
  
        if (updatedUser.success) {
          Alert.alert('Foto de perfil atualizada com sucesso!');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao atualizar a foto de perfil.');
        }
      } else {
        Alert.alert('Erro', 'Falha ao fazer upload da imagem.');
      }
    }
  };

  const handleCancel = () => navigation.navigate('TelaInicialPet');

  const handleRegister = async () => {
    try {
      const petData = { nome, especie, raca, dataNascimento, sexo, petCastrado, fotoPerfil };
      const result = await registerPet(petData);

      if (result.success) {
        Alert.alert('Pet registrado com sucesso!');
        navigation.goBack();
      } else {
        console.error("Erro ao registrar o pet: ", result.error);
        Alert.alert('Erro', 'Não foi possível registrar o pet.');
      }
    } catch (error) {
      console.log(error)
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
            <PIDButton title='Cancelar' outline={true} onPress={handleCancel} />
            <PIDButton title='Registrar' onPress={handleRegister} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}