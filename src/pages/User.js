import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/firebaseConnection'; 
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import colors from '../styles/colors';
import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import * as ImagePicker from 'expo-image-picker'; 

export default function User() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [editableField, setEditableField] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'usuario'), (snapshot) => {
      const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (userData.length > 0) {
        setUsuario(userData[0]);
        setNome(userData[0].nome);
        setEmail(userData[0].email);
        setCpf(userData[0].cpf);
        setTelefone(userData[0].telefone);
        setEndereco(userData[0].endereco);
        setSenha(userData[0].senha);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const salvarDados = async () => {
    try {
      const userRef = doc(db, 'usuario', usuario.id);
      await updateDoc(userRef, {
        nome,
        email,
        cpf,
        telefone,
        endereco,
        senha
      });
      Alert.alert('Dados atualizados com sucesso!');
      setEditableField(null); 
    } catch (error) {
      console.error("Erro ao atualizar os dados: ", error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const cancelarAlteracoes = () => {
    setEditableField(null);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setCpf(usuario.cpf);
    setTelefone(usuario.telefone);
    setEndereco(usuario.endereco);
    setSenha(usuario.senha);
    navigation.navigate('TelaInicialPet');
  };

  const handleEdit = (field) => {
    setEditableField(field);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {usuario && (
          <>
            <Image 
              source={require('../assets/img/cadastro.png')} 
              style={styles.image} 
            />

            <View style={styles.inputContainer}>
              <PIDTextInput 
                placeholder='Nome' 
                value={nome} 
                editable={editableField === 'nome'} 
                onChangeText={setNome}
              />
              {editableField !== 'nome' && (
                <TouchableWithoutFeedback onPress={() => handleEdit('nome')}>
                  <Image 
                    source={require('../assets/icon/Pencil.png')} 
                    style={styles.icon} 
                  />
                </TouchableWithoutFeedback>
              )}
            </View>

            <View style={styles.inputContainer}>
              <PIDTextInput 
                placeholder='E-mail' 
                value={email} 
                editable={editableField === 'email'} 
                onChangeText={setEmail}
              />
              {editableField !== 'email' && (
                <TouchableWithoutFeedback onPress={() => handleEdit('email')}>
                  <Image 
                    source={require('../assets/icon/Pencil.png')} 
                    style={styles.icon} 
                  />
                </TouchableWithoutFeedback>
              )}
            </View>

            <View style={styles.inputContainer}>
              <PIDTextInput 
                placeholder='CPF' 
                value={cpf} 
                editable={editableField === 'cpf'} 
                onChangeText={setCpf}
              />
              {editableField !== 'cpf' && (
                <TouchableWithoutFeedback onPress={() => handleEdit('cpf')}>
                  <Image 
                    source={require('../assets/icon/Pencil.png')} 
                    style={styles.icon} 
                  />
                </TouchableWithoutFeedback>
              )}
            </View>

            <View style={styles.inputContainer}>
              <PIDTextInput 
                placeholder='Telefone' 
                value={telefone} 
                editable={editableField === 'telefone'} 
                onChangeText={setTelefone}
              />
              {editableField !== 'telefone' && (
                <TouchableWithoutFeedback onPress={() => handleEdit('telefone')}>
                  <Image 
                    source={require('../assets/icon/Pencil.png')} 
                    style={styles.icon} 
                  />
                </TouchableWithoutFeedback>
              )}
            </View>

            <View style={styles.inputContainer}>
              <PIDTextInput 
                placeholder='Endereço' 
                value={endereco} 
                editable={editableField === 'endereco'} 
                onChangeText={setEndereco}
              />
              {editableField !== 'endereco' && (
                <TouchableWithoutFeedback onPress={() => handleEdit('endereco')}>
                  <Image 
                    source={require('../assets/icon/Pencil.png')} 
                    style={styles.icon} 
                  />
                </TouchableWithoutFeedback>
              )}
            </View>

            <View style={styles.inputContainer}>
              <PIDTextInput 
                placeholder='Senha' 
                value={senha} 
                secureTextEntry={true} 
                editable={editableField === 'senha'} 
                onChangeText={setSenha}
              />
              {editableField !== 'senha' && (
                <TouchableWithoutFeedback onPress={() => handleEdit('senha')}>
                  <Image 
                    source={require('../assets/icon/Pencil.png')} 
                    style={styles.icon} 
                  />
                </TouchableWithoutFeedback>
              )}
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
                onPress={salvarDados} 
                outline={true}
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
    width: 20,
    height: 20,
    marginLeft: 5, 
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 64,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
