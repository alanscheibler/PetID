import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import colors from '../styles/colors';
import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';

export default function User() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [fotoPerfil, setFotoPerfil] = useState(null); 

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

  const salvarDados = () => {
    console.log('Dados salvos:', { nome, email, cpf, telefone, senha });
  };

  const cancelarAlteracoes = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          
          <Image 
            source={fotoPerfil ? { uri: fotoPerfil } : require('../assets/img/cadastro.png')} // Exibe a foto ou uma imagem padrão
            style={styles.image} 
          />

          <PIDTextInput placeholder='Nome' value={nome} onChangeText={setNome} />
          <PIDTextInput placeholder='E-mail' value={email} onChangeText={setEmail} keyboardType="email-address" iconName="pencil"/>
          <PIDTextInput placeholder='CPF' value={cpf} onChangeText={setCpf} keyboardType="numeric" />
          <PIDTextInput placeholder='Telefone' value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
          <PIDTextInput placeholder='Endereço' value={endereco} onChangeText={setEndereco} keyboardType="default" />
          <PIDTextInput placeholder='Senha' value={senha} onChangeText={setSenha} secureTextEntry />

          <View style={styles.buttonContainer}>
            <PIDButton 
            title='Adicionar Foto' 
            outline={true} 
            size='big'
            onPress={alterarFotoPerfil}
            />
            </View>

          <View style={styles.rowContainer}>
              <PIDButton title='Cancelar' outline={true} onPress={cancelarAlteracoes} />
              <PIDButton title='Salvar' onPress={salvarDados} />
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
  scrollContainer: {
    backgroundColor: colors.colors.background,
    paddingVertical: 104
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 70,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 64,
  },
});
