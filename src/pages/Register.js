import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConnection'; 
import { auth } from '../firebase/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { globalStyles } from '../styles/globalStyles';
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
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
  
      await addDoc(collection(db, "usuario"), {
        nome,
        email,
        cpf,
        telefone,
        endereco,
        uid: user.uid, 
      });
  
      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate('Login');
    } catch (error) {
      console.log("Erro ao cadastrar: ", error.message);
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <ScrollView style={globalStyles.scrollContainer}>
      <StatusBar style="auto" />

      <View style={{ justifyContent: 'center', alignItems: 'center',paddingTop: 60, paddingBottom: 30 }}>
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
            <PIDTextLink title='termos de uso' underlined />
          </PIDCheckMarker>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', paddingHorizontal: 20 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <PIDButton title='Cancelar' outline onPress={handleCancel} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <PIDButton title='Criar' onPress={handleRegister} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}