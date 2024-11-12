import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { globalStyles } from '../styles/globalStyles';

import { registerUser } from '../Services/userService';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';
import PIDTextLink from '../components/PIDTextLink';

export default function Register() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCancel = () => navigation.navigate('Login');

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("As senhas não coincidem!");
      return;
    }

    const userData = { nome, email, cpf, telefone, endereco, senha };
    const result = await registerUser(userData);

    if (result.success) {
      Alert.alert(result.message, "Verifique seu email.");
      navigation.navigate('Login');
    } else {
      console.log("Erro ao cadastrar:", result.message);
      Alert.alert("Erro ao cadastrar", result.message);
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
          <PIDTextInput placeholder='E-mail' value={email} onChangeText={setEmail} />
          <PIDTextInput placeholder='CPF' value={cpf} onChangeText={setCpf} />
          <PIDTextInput placeholder='Telefone*' value={telefone} onChangeText={setTelefone} />
          <PIDTextInput placeholder='Endereço*' value={endereco} onChangeText={setEndereco} />
          <PIDTextInput placeholder='Senha' value={senha} secureTextEntry onChangeText={setSenha} />
          <PIDTextInput placeholder='Confirme sua senha' value={confirmarSenha} secureTextEntry onChangeText={setConfirmarSenha} />

          <View style={globalStyles.containerLeft}>
            <PIDCheckMarker title='Desejo receber as notificações' />
            <PIDCheckMarker title='Concordo com os'> 
              <PIDTextLink title={'termos de uso'} underlined />
            </PIDCheckMarker>
          </View>

          <View style={globalStyles.rowContainer}>
            <PIDButton title='Cancelar' outline={true} onPress={handleCancel} />
            <PIDButton title='Criar' onPress={() => handleRegister()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
