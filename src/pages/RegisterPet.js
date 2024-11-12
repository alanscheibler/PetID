import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { globalStyles } from '../styles/globalStyles';

import { registerPet } from '../Services/PetService'; 

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';

export default function RegisterPet() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [petCastrado, setPetCastrado] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleCancel = () => navigation.navigate('TelaInicialPet');

  const handleRegister = async () => {
    const petData = { nome, especie, raca, dataNascimento, sexo, petCastrado };
    const result = await registerPet(petData);

    if (result.success) {
      Alert.alert(result.message, "O pet foi registrado com sucesso!");
      navigation.navigate('TelaInicialPet');
    } else {
      Alert.alert("Erro ao registrar o pet", result.message);
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
          <PIDTextInput placeholder='Data de Nascimento' value={dataNascimento} onChangeText={setDataNascimento} />
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
              title="Alterar Foto" 
              outline={true} 
              onPress={() => alterarFotoPerfil()} 
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

const styles = StyleSheet.create({
  // Adicione seus estilos aqui
});
