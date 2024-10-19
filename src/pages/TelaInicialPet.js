import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import cores from '../styles/colors'; 
import { useNavigation } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import PIDFooterBar from '../components/PIDFooterBar';

import mapIcon from '../assets/icon/map.png'; 
import addPetIcon from '../assets/icon/addPet.png';

export default function TelaInicialPet() {
    const navigation = useNavigation();

    const handleProfilePress = () => {
        navigation.navigate('User');
    };
    
    const handleAddPetPress = () => {
        navigation.navigate('RegisterPet'); 
    };

  return (
    <View style={estilos.container}>
        
      <PIDHeader onProfilePress={handleProfilePress} />

      <View style={estilos.mensagemCentral}>
        <Text style={estilos.texto}>
          Você não tem nenhum Pet cadastrado no momento, você pode adicionar um apertando no símbolo de "mais".
        </Text>
      </View>

      <PIDFooterBar leftIcon={mapIcon} rightIcon={addPetIcon}/>

    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.colors.background, 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mensagemCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  texto: {
    color: cores.colors.primary, 
    fontSize: 16,
    textAlign: 'center',
  },
  barraInferior: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});