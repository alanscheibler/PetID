<<<<<<< Updated upstream
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PIDHeader from '../components/PIDHeader'
import { useNavigation, useFocusEffect } from '@react-navigation/native';



export default function VaccinationCard() {
  const navigation = useNavigation();
  const backButtonPress = () => {navigation.navigate('TelaInicialPet')}
=======
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import { getPetData } from '../Services/PetService';
import colors from '../styles/colors';
import PIDFooterBar from '../components/PIDFooterBar';
import PIDModal from '../components/PIDModal';
import { registerVacina, getVacinaData } from '../Services/VacinaService';  
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import PIDVaccinationItem from '../components/PIDVaccinationItem'; 
import { globalStyles } from '../styles/globalStyles';

export default function VaccinationCard() {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params;
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [vacinas, setVacinas] = useState([]);
  
  const fetchVacinas = async () => {
    const { success, data, message } = await getVacinaData(petId);
    if (success) {
      setVacinas(data);  
    } else {
      console.error('Erro ao carregar vacinas:', message);
    }
  };

  useEffect(() => {
    const fetchPetData = async () => {
      const { success, data, message } = await getPetData(petId);
      if (success) {
        setPetData(data);
      } else {
        console.error('Erro ao buscar dados do pet:', message);
      }
      setLoading(false);
    };

    fetchPetData();
    fetchVacinas();  

    const intervalo = setInterval(fetchVacinas, 5000);
    return () => clearInterval(intervalo); 
  }, [petId]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Desconhecida';
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInYears = today.getFullYear() - birth.getFullYear();
    return ageInYears > 0 ? `${ageInYears} ano(s)` : 'Menos de 1 ano';
  };

  const backButtonPress = () => {
    navigation.navigate('TelaInicialPet');
  };

  const handlePetCardPress = () => {
    navigation.navigate('PetDetails', { petId });
  };

  const onLeftPress = () => {
    navigation.navigate('Map');
  };

  const onRightPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onSave = async (data) => {
    const formatDate = (date) => {
      if (!date) return null;
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    };

    const preparedData = {
      procedimento: data.procedimento || null,
      nome_proc: data.nome || null,
      data_realizacao: formatDate(data.dataRealizacao),
      data_renovacao: formatDate(data.dataReforco),
      id_pet: petId,
    };

    console.log('Dados sendo enviados para o banco:', preparedData);

    const { success, vacina, error } = await registerVacina(preparedData);

    if (success) {
      console.log('Vacina registrada com sucesso:', vacina);
    } else {
      console.error('Erro ao registrar vacina:', error);
    }

    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!petData) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar os dados do pet.</Text>
      </View>
    );
  }

>>>>>>> Stashed changes
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