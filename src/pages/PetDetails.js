import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPetData, updatePetData, uploadPhoto } from '../Services/PetService'; 
import PIDChangeInput from '../components/PIDChangeInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';
import PIDSelector from '../components/PIDSelector'; // Importe o PIDSelector
import * as ImagePicker from 'expo-image-picker'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import colors from '../styles/colors';

export default function PetDetails({ route }) {
  const navigation = useNavigation();
  const { petId } = route.params;

  const [pet, setPet] = useState(null);
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [petCastrado, setPetCastrado] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    const loadPetData = async () => {
      const result = await getPetData(petId);
      if (result.success) {
        setPet(result.data);
        setNome(result.data.nome);
        setEspecie(result.data.especie);
        setRaca(result.data.raca);
        setDataNascimento(result.data.dataNascimento);
        setSexo(result.data.sexo);  // Configura o sexo já registrado no banco
        setPetCastrado(result.data.petCastrado);
        setFotoPerfil(result.data.fotoPerfil);
      } else {
        console.error(result.message);
      }
    };

    loadPetData();
  }, [petId]);

  const alterarFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFotoPerfil(result.assets[0].uri);

      const imageUrl = await uploadPhoto(result.assets[0].uri, pet);

      if (imageUrl) {
        const updatedPet = await updatePetData(pet.id_pet, { fotoPerfil: imageUrl });

        if (updatedPet.success) {
          Alert.alert('Foto de perfil do pet atualizada com sucesso!');
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
      fotoUrl = pet.fotoPerfil;
    }

    const data = { nome, especie, raca, dataNascimento, sexo, petCastrado, fotoPerfil: fotoUrl };
    const result = await updatePetData(pet.id_pet, data);

    if (result.success) {
      Alert.alert('Dados do pet atualizados com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', result.error.message || 'Ocorreu um erro ao salvar os dados.');
    }
  };

  const cancelarAlteracoes = () => {
    setNome(pet.nome);
    setEspecie(pet.especie);
    setRaca(pet.raca);
    setDataNascimento(pet.dataNascimento);
    setSexo(pet.sexo);
    setPetCastrado(pet.petCastrado);
    navigation.goBack();
  };

  const sexoOptions = [
    { value: 'femea', label: 'Fêmea' },
    { value: 'macho', label: 'Macho' },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {pet && (
          <>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.image} />
            ) : (
              <FontAwesome5 name="dog" style={styles.icon} />
            )}


            <PIDChangeInput 
              placeholder={'Nome do Pet'} 
              value={nome} 
              onChangeText={setNome}
            />
            <PIDChangeInput 
              placeholder={'Espécie'} 
              value={especie} 
              onChangeText={setEspecie}
            />
            <PIDChangeInput 
              placeholder={'Raça'} 
              value={raca} 
              onChangeText={setRaca}
            />
            <PIDChangeInput 
              placeholder={'Data de Nascimento'} 
              value={dataNascimento} 
              onChangeText={setDataNascimento}
            />
            <PIDSelector 
              value={sexo} 
              onValueChange={setSexo} 
              items={sexoOptions} 
              placeholder={{ label: 'Sexo' }}
              withBottomBorder={true} 
            />

            <View style={styles.inputContainer}>
              <PIDCheckMarker 
                title="Castrado?" 
                checked={petCastrado} 
                onCheckChange={() => setPetCastrado(!petCastrado)} 
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
  icon: {
    fontSize: 70,
    color: colors.colors.green,
    paddingBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 64,
    marginTop: 10, 
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 64,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
