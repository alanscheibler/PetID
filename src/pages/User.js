import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { getUserData, updateUserData, uploadPhoto } from '../Services/userService'; 

import PIDChangeInput from '../components/PIDChangeInput';
import PIDButton from '../components/PIDButton';
import * as ImagePicker from 'expo-image-picker'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';


export default function User() {
  const navigation = useNavigation();
  const { colors, theme } = useTheme();
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
  
      const imageUrl = await uploadPhoto(result.assets[0].uri, usuario);
  
      if (imageUrl) {
        const updatedUser = await updateUserData(usuario.id_usuario, { fotoPerfil: imageUrl });
  
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
  
  const salvarDados = async () => {
    let fotoUrl = fotoPerfil;

    if (!fotoUrl) {
      fotoUrl = usuario.fotoPerfil;
    }

    const data = { nome, email, cpf, telefone, endereco, fotoPerfil: fotoUrl };
    const result = await updateUserData(usuario.id_usuario, data);

    if (result.success) {
      Alert.alert('Dados atualizados com sucesso!');
      setEditableField(null); 
      navigation.navigate('TelaInicialPet'); 
    } else {
      Alert.alert('Erro', result.error.message || 'Ocorreu um erro ao salvar os dados.');
    }
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
      <View style={styles.container(colors)}>
        <StatusBar 
          style={theme === 'light' ? 'dark' : 'light'}
            backgroundColor={colors.background} 
        />
        {usuario && (
          <>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.image} />
            ) : (
              <FontAwesome5 name="user-alt" style={styles.icon(colors)} />
            )}

            <PIDChangeInput 
              placeholder={'Nome'} 
              value={nome} 
              onChangeText={setNome}
              editOnPress={handleEdit}
            />
            <PIDChangeInput 
              placeholder={'E-mail'} 
              value={email} 
              onChangeText={setEmail}
              editOnPress={handleEdit}
            />
            <PIDChangeInput 
              placeholder={'CPF'} 
              value={cpf} 
              onChangeText={setCpf}
              editOnPress={handleEdit}
            />
            <PIDChangeInput 
              placeholder={'Telefone'} 
              value={telefone} 
              onChangeText={setTelefone}
              editOnPress={handleEdit}
            />
            <PIDChangeInput 
              placeholder={'Endereço'}
              value={endereco} 
              onChangeText={setEndereco}
              editOnPress={handleEdit}
            />
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
                onPress={salvarDados} 
              />
            </View>  
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: (colors) =>({
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 104,
    paddingHorizontal: 64,
  }),
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  icon: (colors) =>({
    fontSize: 70,
    color: colors.green,
    paddingBottom: 30,
  }),
  buttonContainer: {
    width: '100%',

    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
