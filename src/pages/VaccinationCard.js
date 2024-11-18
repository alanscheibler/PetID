import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PIDHeader from '../components/PIDHeader';
import { useNavigation } from '@react-navigation/native';
import PIDFooterBar from '../components/PIDFooterBar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { globalStyles } from '../styles/globalStyles';

export default function VaccinationCard() {
  const navigation = useNavigation();

  const handleProfilePress = () => { navigation.navigate('User'); };
  const onRightPress = () => { navigation.navigate('RegisterPet'); };
  const onLeftPress = () => { navigation.navigate('Map') };
  const backButtonPress = () => { navigation.navigate('TelaInicialPet') };

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <PIDHeader 
        showBackButton 
        backButtonPress={backButtonPress}
        onProfilePress={handleProfilePress} 
      />

      {/* Container central que ocupa o espaço restante */}
      <View style={styles.container}>
        {/* Conteúdo central alinhado ao topo */}
        <Text>Conteúdo do Cartão de Vacinação</Text>
        <PIDFooterBar
        leftIcon={<FontAwesome6 name="map-location-dot" style={globalStyles.icon} />}
        leftAction={onLeftPress}
        rightIcon={<FontAwesome6 name="add" style={globalStyles.icon} />}
        rightAction={onRightPress}
      />
      </View>

      {/* FooterBar dentro da View, mas fixado ao final */}
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O container vai ocupar o espaço restante
    justifyContent: 'flex-', // Alinha o conteúdo ao topo
    alignItems: 'center', // Alinha o conteúdo horizontalmente
  },
});
