import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import PIDFooterBar from '../components/PIDFooterBar';

import mapIcon from '../assets/icon/map.png'; 
import addPet from '../assets/icon/addPet.png';
import cores from '../styles/colors'; 
import { globalStyles } from '../styles/globalStyles';


export default function TelaInicialPet() {
    const navigation = useNavigation();

    const handleProfilePress = () => { navigation.navigate('User');};
    const onRightPress = () => {navigation.navigate('RegisterPet');}
    const onLeftPress = () => {navigation.navigate('Map')}

  return (
    <View style={globalStyles.container}>
        
      <PIDHeader onProfilePress={handleProfilePress} />

      <View style={styles.mensagemCentral}>
        <Text style={styles.texto}>
          Você não tem nenhum Pet cadastrado no momento, você pode adicionar um apertando no símbolo de "mais".
        </Text>
      </View>

      <PIDFooterBar 
        leftIcon={mapIcon}
        leftAction={onLeftPress}
        rightIcon={addPet}
        rightAction={onRightPress}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  mensagemCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  texto: {
    color: cores.colors.green, 
    fontSize: 16,
    textAlign: 'center',
  },
});