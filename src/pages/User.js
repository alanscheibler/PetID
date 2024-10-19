import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import colors from '../styles/colors';
import PIDButton from '../components/PIDButton';

export default function User() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState(''); 
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
      <View style={styles.container}>

        <TouchableOpacity onPress={alterarFotoPerfil}>
          <Image 
            source={fotoPerfil ? { uri: fotoPerfil } : require('../assets/img/cadastro.png')} // Se a fotoPerfil estiver disponível, mostra a nova foto
            style={styles.image} 
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <PIDButton 
            title='Alterar Foto' 
            outline={true} 
            onPress={alterarFotoPerfil} 
            style={styles.largeButton}
        />

        <View style={styles.rowContainer}>
          <PIDButton title='Cancelar' outline={true} onPress={cancelarAlteracoes} />
          <PIDButton title='Salvar' onPress={salvarDados} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.colors.background,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    color: colors.colors.primary,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  largeButton: {
    width: '300%', 
    marginBottom: 20, 
  },
});
