import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PIDHeader from '../components/PIDHeader'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function VaccinationCard() {
  const navigation = useNavigation();
  const backButtonPress = () => {navigation.navigate('TelaInicialPet')}
  return (
    <View>
      <PIDHeader 
        showBackButton 
        backButtonPress={backButtonPress}/>
      <Text>VaccinationCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({})



