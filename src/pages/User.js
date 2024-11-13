import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getUserData, updateUserData } from '../Services/userCRUD'; 

import colors from '../styles/colors';
import PIDChangeInput from '../components/PIDChangeInput';
import PIDButton from '../components/PIDButton';
import * as ImagePicker from 'expo-image-picker'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useAuth } from '../context/AuthContext';

export default function User() {
  const navigation = useNavigation();

  const {user} = useAuth();

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [editableField, setEditableField] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    console.log(user)
    const loadUserData = async () => {
      const result = await getUserData(user.id_usuario);
      console.log(result)
      if (result.success) {
        setUsuario(result.data);
        setNome(result.data.nome);
        setEmail(result.data.email);
        setCpf(result.data.cpf);
        setTelefone(result.data.telefone.toString());
        setEndereco(result.data.endereco);
        setFotoPerfil(result.data.fotoPerfil);
      } else {
        console.error(result.message);
      }
    };

    loadUserData();
  }, []);

  const alterarFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  const salvarDados = async () => {
    const data = { nome, email, cpf, telefone, endereco };
    const result = await updateUserData(usuario.id, data);

    if (result.success) {
      Alert.alert('Dados atualizados com sucesso!');
      setEditableField(null); 
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  const handleSave = async () => {
    const data = { nome, email, cpf, telefone, endereco };
   /* if (!description) {
      Alert.alert("Erro", "Por favor, preencha o campo de descrição.");
      return;
    }
    */

    if (id) {
      const response = await updateBrand(id, { data });
      console.log(response);
    } else {
      const response = await createBrand({ data, id_usuario: user.id });
      console.log(response);
    }

    navigation.goBack();
  };

  const cancelarAlteracoes = () => {
    setEditableField(null);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setCpf(usuario.cpf);
    setTelefone(usuario.telefone);
    setEndereco(usuario.endereco);
    navigation.navigate('TelaInicialPet');
  };

  const handleEdit = (usuario) => {
    navigation.navigate("User", { usuario });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {usuario && (
          <>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.image} />
            ) : (
              <FontAwesome5 name="user-alt" style={styles.icon} />
            )}

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder={'Nome'} 
                value={nome} 
                onChangeText={setNome}
                editOnPress={handleEdit}
              />
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder={'E-mail'} 
                value={email} 
                onChangeText={setEmail}
                editOnPress={handleEdit}
              />
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder={'CPF'} 
                value={cpf} 
                onChangeText={setCpf}
                editOnPress={handleEdit}
              />
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder={'Telefone'} 
                value={telefone} 
                onChangeText={setTelefone}
                editOnPress={handleEdit}
              />
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder={'Endereço'}
                value={endereco} 
                onChangeText={setEndereco}
                editOnPress={handleEdit}
              />
            </View>

            <View style={styles.buttonContainer}>
              <PIDButton 
                title='Alterar Foto' 
                outline={true} 
                onPress={alterarFotoPerfil} 
                size='big'
              />
            </View>  

            <View style={styles.buttonContainer}>
              <PIDButton 
                title='Cancelar' 
                onPress={cancelarAlteracoes} 
                outline={true}
              />
              <PIDButton 
                title='Salvar' 
                onPress={handleSave} 
              />
            </View>  
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.colors.background,
    paddingVertical: 104,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 64,
    marginTop: 10, 
  },
  icon: {
    fontSize: 70,
    color: colors.colors.green,
    paddingBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 64,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
