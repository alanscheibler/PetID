import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/firebaseConnection'; // ajuste o caminho conforme necessário
import { collection, onSnapshot } from 'firebase/firestore';
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

  const [usuario, setUsuario] = setState([]);

  useEffect(() => {

    async function getDados() {

      const usuarioRef = collection(db, "usuario");
      onSnapshot(usuarioRef, (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
            cpf: doc.data().cpf,
            telefone: doc.data().telefone,
            endereco: doc.data().endereco,
            senha: doc.data().senha,
            fotoPerfil: doc.data().fotoPerfil
          })
        })

        setUsuario(lista);
      })      
      .catch((err) =>{
        console.log(err)
      })
    }
    getDados();
  }), [] 

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Image 
            source={fotoPerfil ? { uri: fotoPerfil } : require('../assets/img/cadastro.png')} 
            style={styles.image} 
          />

          <PIDTextInput placeholder='Nome' value={nome} onChangeText={setNome} />
          <PIDTextInput placeholder='E-mail' value={email} onChangeText={setEmail} keyboardType="email-address" />
          <PIDTextInput placeholder='CPF' value={cpf} onChangeText={setCpf} keyboardType="numeric" />
          <PIDTextInput placeholder='Telefone' value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
          <PIDTextInput placeholder='Endereço' value={endereco} onChangeText={setEndereco} keyboardType="default" />
          <PIDTextInput placeholder='Senha' value={senha} onChangeText={setSenha} secureTextEntry />

          <View style={styles.buttonContainer}>
            <PIDButton 
              title='Alterar Foto' 
              outline={true} 
              onPress={alterarFotoPerfil} 
              size='big'
            />
          </View>  

          <View style={styles.rowContainer}>
            <PIDButton title='Cancelar' outline={true} onPress={cancelarAlteracoes} />
            <PIDButton title='Salvar' onPress={salvarDados} />
          </View>

          <Text style={styles.title}>Usuários Cadastrados:</Text>
          <FlatList
            data={usuarios}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text>{item.nome}</Text>
                <Text>{item.email}</Text>
                <Text>{item.telefone}</Text>
              </View>
            )}
          />
        </>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.colors.background,
    paddingVertical: 104,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 64,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.colors.border,
    width: '100%',
  },
});
