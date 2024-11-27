import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import { getPetData } from '../Services/PetService';
import PIDFooterBar from '../components/PIDFooterBar';
import PIDModal from '../components/PIDModal';
import { registerVacina, getVacinaData } from '../Services/VacinaService';
import PIDVaccinationItem from '../components/PIDVaccinationItem'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function VaccinationCard() {
  const { colors, theme } = useTheme();
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

    const refreshVaccines = setInterval(fetchVacinas, 1000);
    const refreshPetData = setInterval(fetchPetData, 1000);
    return () => (
      clearInterval(refreshVaccines),
      clearInterval(refreshPetData)
    );
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

  return (
    <View style={styles.container(colors)}>
      <StatusBar 
            style={theme === 'light' ? 'dark' : 'light'}
            backgroundColor={colors.background} 
        /> 
      <PIDHeader showBackButton backButtonPress={backButtonPress} />
      <ScrollView style={styles.vaccineListContainer} contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.petCardContainer(colors)} onPress={handlePetCardPress}>
          <View style={[styles.petImageContainer, !petData.fotoPerfil && styles.noPhotoBackground(colors)]}>
            {petData.fotoPerfil ? (
              <Image source={{ uri: petData.fotoPerfil }} style={styles.petImage(colors)} />
            ) : (
              <MaterialIcons name="pets" style={styles.icon(colors)} />
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoText(colors)}>
              <Text style={styles.label(colors)}>Nome: </Text>
              {petData.nome || 'Desconhecido'}
            </Text>
            <Text style={styles.infoText(colors)}>
              <Text style={styles.label(colors)}>Espécie: </Text>
              {petData.especie || 'Desconhecida'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoText(colors)}>
              <Text style={styles.label(colors)}>Idade: </Text>
              {calculateAge(petData.dataNascimento)}
            </Text>
            <Text style={styles.infoText(colors)}>
              <Text style={styles.label(colors)}>Sexo: </Text>
              {petData.sexo || 'Desconhecido'}
            </Text>
          </View>
        </TouchableOpacity>

        {vacinas.length > 0 ? (
          vacinas.map((vacina) => (
            <PIDVaccinationItem 
              key={vacina.id_vacina} 
              vacina={vacina} 
              onRefresh={fetchVacinas}
            />
          ))
        ) : (
          <Text style={styles.noVaccinesMessage(colors)}>Sem vacinas registradas.</Text>
        )}
      </ScrollView>

      <PIDModal visible={isModalVisible} onClose={handleModalClose} onSave={onSave} />

      <View style={styles.footerContainer}>
        <PIDFooterBar
          leftAction={onLeftPress}
          rightAction={onRightPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (colors) => ({
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 0,
  }),
  petCardContainer: (colors) => ({
    backgroundColor: colors.componentBG,
    width: '90%',
    marginVertical: 16,
    borderRadius: 8,
    alignSelf: 'center',
  }),
  petImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: (colors) => ({
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }),
  noPhotoBackground: (colors) => ({
    backgroundColor: colors.componentBG
  }),
  icon: (colors) => ({
    fontSize: 72,
    color: colors.green,
  }),
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  infoText:(colors) => ({
    color: colors.green,
    fontSize: 18,
    width: '45%',
  }),
  noVaccinesMessage: (colors) => ({
    textAlign: 'center', 
    color: colors.green,
    fontSize: 18,
    marginTop: 16,
  }),
  label: (colors) => ({
    color: colors.text,
    fontWeight: 'bold',
  }),
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  vaccineListContainer: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
});
