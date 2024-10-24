import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/firebaseConnection'; 
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import colors from '../styles/colors';
import PIDChangeInput from '../components/PIDChangeInput';
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
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 

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
        setFotoPerfil(userData[0].fotoPerfil);
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
        fotoPerfil
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
              <PIDChangeInput 
                placeholder='Nome' 
                value={nome} 
                editable={editableField === 'nome'} 
                onChangeText={setNome}
              />
            
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder='E-mail' 
                value={email} 
                editable={editableField === 'email'} 
                onChangeText={setEmail}
              />
              
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder='CPF' 
                value={cpf} 
                editable={editableField === 'cpf'} 
                onChangeText={setCpf}
              />
              
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder='Telefone' 
                value={telefone} 
                editable={editableField === 'telefone'} 
                onChangeText={setTelefone}
              />
             
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder='Endereço' 
                value={endereco} 
                editable={editableField === 'endereco'} 
                onChangeText={setEndereco}
              />
              
            </View>

            <View style={styles.inputContainer}>
              <PIDChangeInput 
                placeholder='Senha' 
                value={senha} 
                secureTextEntry={!showPassword} // Usa o estado para mostrar/esconder a senha
                editable={editableField === 'senha'} 
                onChangeText={setSenha}
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
