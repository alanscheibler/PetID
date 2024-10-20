import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConnection'; 

import colors from '../styles/colors';
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
  
  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("As senhas não coincidem!");
      return;
    }

    try {
      await addDoc(collection(db, "usuario"), {
        nome,
        email,
        cpf,
        telefone,
        endereco,
        senha 
      });

      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate('Login');
    } catch (error) {
      console.log("Erro ao cadastrar: ", error.message);
      Alert.alert("Erro ao cadastrar", error.message);
    }
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

          <PIDTextInput placeholder='Nome' value={nome} onChangeText={setNome} />
          <PIDTextInput placeholder='E-mail' value={email} onChangeText={setEmail} />
          <PIDTextInput placeholder='CPF' value={cpf} onChangeText={setCpf} />
          <PIDTextInput placeholder='Telefone*' value={telefone} onChangeText={setTelefone} />
          <PIDTextInput placeholder='Endereço*' value={endereco} onChangeText={setEndereco} />
          <PIDTextInput placeholder='Senha' value={senha} secureTextEntry onChangeText={setSenha} />
          <PIDTextInput placeholder='Confirme sua senha' value={confirmarSenha} secureTextEntry onChangeText={setConfirmarSenha} />

          <View style={styles.containerLeft}>
            <PIDCheckMarker title='Desejo receber as notificações' />
            <PIDCheckMarker title='Concordo com os'> 
              <PIDTextLink title={'termos de uso'} underlined/>
            </PIDCheckMarker>
          </View>

          <View style={styles.rowContainer}>
              <PIDButton title='Cancelar' outline={true} onPress={() => navigation.navigate('Login')}/>
              <PIDButton title='Criar' onPress={handleRegister} />
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
    marginLeft: 64
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
    paddingHorizontal: 64,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
