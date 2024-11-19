import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PIDHeader from '../components/PIDHeader'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { updatePetData, deletePetData, getPetData } from '../Services/PetService';

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

 // UTILIZAR PARA CARTERINHA (registerPet)
    // const handlePetDelete = async (pet) => {
    //   await deletePetData(pet.id_pet);
    //   getData();
    // };

    
    // const handlePetEdit = async (pet) => {
    //   await updatePetData(pet.id_pet);
    //   getData();
    // };

    // UTILIZAR PARA CARTERINHA (registerVacina)
    // const handleVacinaDelete = async (vacina) => {
    //   await deleteVacinaData(vacina.id_vacina);
    //   getData();
    // };

    
    // const handleVacinaEdit = async (vacina) => {
    //   await updateVacinaData(vacina.id_vacina);
    //   getData();
    // };

const styles = StyleSheet.create({})