import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import PIDFooterBar from '../components/PIDFooterBar';
import PIDPetCard from '../components/PIDPetCard';

import cores from '../styles/colors'; 
import { globalStyles } from '../styles/globalStyles';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TelaInicialPet() {
    const navigation = useNavigation();

    const handleProfilePress = () => { navigation.navigate('User');};
    const onRightPress = () => {navigation.navigate('RegisterPet');}
    const onLeftPress = () => {navigation.navigate('Map')}
    const cardPress = () => {navigation.navigate('VaccinationCard')}

  return (
    <View style={globalStyles.container}>
        
      <PIDHeader onProfilePress={handleProfilePress} />

      <View style={styles.mensagemCentral}>
        <PIDPetCard 
        onPress={cardPress}/>
      </View>

      <PIDFooterBar 
        leftIcon={<FontAwesome6 name="map-location-dot" style={globalStyles.icon}/>}
        leftAction={onLeftPress}
        rightIcon={<FontAwesome6 name="add" style={globalStyles.icon}/>}
        rightAction={onRightPress}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  mensagemCentral: {
    width:'100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: cores.colors.green, 
    fontSize: 16,
    textAlign: 'center',
  },
});