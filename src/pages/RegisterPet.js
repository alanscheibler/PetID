import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import { registerPet } from '../Services/PetService';
import { useAuth } from '../context/AuthContext'; 
import { useTheme } from '../context/ThemeContext';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';
import PIDSelector from '../components/PIDSelector';

export default function RegisterPet() {
  const { colors, theme } = useTheme();
  const { user } = useAuth(); 
  const navigation = useNavigation();
  
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [petCastrado, setPetCastrado] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const alterarFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFotoPerfil(result.assets[0].uri);

      const imageUrl = await uploadPetPhoto(result.assets[0].uri, pet);
  
      if (imageUrl) {
        const updatedUser = await updatePetData(pet.id_pet, { fotoPerfil: imageUrl });
  
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

  const handleCancel = () => navigation.navigate('TelaInicialPet');

  const handleRegister = async () => {
    try {
      const formatarDataParaBanco = (data) => {
        const [dia, mes, ano] = data.split('/'); 
        return `${ano}/${mes}/${dia}`;
      };
  
      const validarData = (data) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(data);
      };
  
      if (!validarData(dataNascimento)) {
        Alert.alert('Erro', 'Por favor, informe a data de nascimento no formato DD/MM/AAAA.');
        return;
      }
  
      const dataAtual = new Date();
      const [dia, mes, ano] = dataNascimento.split('/');
      const dataNascimentoFormatada = new Date(`${ano}-${mes}-${dia}`);
  
      if (isNaN(dataNascimentoFormatada.getTime())) {
        Alert.alert('Erro', 'Por favor, informe uma data de nascimento válida.');
        return;
      }
  
      if (dataNascimentoFormatada > dataAtual) {
        Alert.alert('Erro', 'A data de nascimento não pode ser futura.');
        return;
      }

      const dataNascimentoSalva = formatarDataParaBanco(dataNascimento);
  
      const petData = {
        nome,
        especie,
        raca,
        dataNascimento: dataNascimentoSalva,
        sexo,
        petCastrado,
        fotoPerfil,
      };
  
      const result = await registerPet(petData);
  
      if (result.success) {
        Alert.alert('Sucesso', 'Pet registrado com sucesso!');
        navigation.goBack();
      } else {
        console.error('Erro ao registrar o pet:', result.error);
        Alert.alert('Erro', 'Não foi possível registrar o pet.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer(colors)}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container(colors)}>
          <StatusBar 
            style={theme === 'light' ? 'dark' : 'light'}
            backgroundColor={colors.background} 
          />
          <Image 
            source={require('../assets/img/LogoTitulo.png')}
            style={styles.image} 
          />

          <PIDTextInput placeholder='Nome' value={nome} onChangeText={setNome} />
          <PIDTextInput placeholder='Espécie' value={especie} onChangeText={setEspecie} />
          <PIDTextInput placeholder='Raça' value={raca} onChangeText={setRaca} />
          <PIDTextInput placeholder='Data de nascimento' value={dataNascimento} onChangeText={setDataNascimento} isDate={true}/>
          <PIDSelector
            value={sexo}
            onValueChange={setSexo}
            items={[
              { label: 'Fêmea', value: 'femea' },
              { label: 'Macho', value: 'macho' },
            ]}
            placeholder={{ label: 'Selecione o Sexo', value: null }}
          />

          <View style={styles.rowContainer}>
            <PIDCheckMarker 
              title="Pet castrado" 
              checked={petCastrado} 
              onCheckChange={() => setPetCastrado(!petCastrado)} 
            />
          </View>

          <View style={styles.rowContainer}>
            <PIDButton 
              title='Alterar Foto' 
              outline={true} 
              onPress={alterarFotoPerfil} 
              size='big'
            />
          </View> 
          
          <View style={styles.rowContainer}>
            <PIDButton title='Cancelar' outline={true} onPress={handleCancel} />
            <PIDButton title='Registrar' onPress={handleRegister} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: (colors)=> ({
    backgroundColor: colors.background,
    paddingTop: 40,
}),
container: (colors)=> ({
  flex: 1,
  backgroundColor: colors.background,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: 64,
}),    
rowContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'space-between',
  width: '100%',
  paddingBottom: 16,
},
image: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  margin: 10,
},

})