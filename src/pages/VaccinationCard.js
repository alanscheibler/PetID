import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import { getPetData } from '../Services/PetService';
import colors from '../styles/colors';
import PIDFooterBar from '../components/PIDFooterBar';
import PIDModal from '../components/PIDModal';
import { registerVacina } from '../Services/VacinaService'; // Importando a função de registro de vacina
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { globalStyles } from '../styles/globalStyles';

export default function VaccinationCard() {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params;
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

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
    // Converte as datas para o formato ISO (YYYY-MM-DD)
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

  return (
    <View style={styles.container}>
      <PIDHeader showBackButton backButtonPress={backButtonPress} />

      <TouchableOpacity style={styles.petCardContainer} onPress={handlePetCardPress}>
        <View style={[styles.petImageContainer, !petData.fotoPerfil && styles.noPhotoBackground]}>
          {petData.fotoPerfil ? (
            <Image source={{ uri: petData.fotoPerfil }} style={styles.petImage} />
          ) : (
            <Text style={styles.noPhotoText}>Sem Foto</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Nome: </Text>
            {petData.nome || 'Desconhecido'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Espécie: </Text>
            {petData.especie || 'Desconhecida'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Idade: </Text>
            {calculateAge(petData.dataNascimento)}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Sexo: </Text>
            {petData.sexo || 'Desconhecido'}
          </Text>
        </View>
      </TouchableOpacity>

      <PIDModal visible={isModalVisible} onClose={handleModalClose} onSave={onSave} />

      <View style={styles.footerContainer}>
        <PIDFooterBar
          leftIcon={<FontAwesome6 name="map-location-dot" style={globalStyles.icon} />}
          leftAction={onLeftPress}
          rightIcon={<FontAwesome6 name="add" style={globalStyles.icon} />}
          rightAction={onRightPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colors.background,
    flex: 1,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  petCardContainer: {
    backgroundColor: colors.colors.componentBG,
    width: '90%',
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  petImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noPhotoBackground: {
    backgroundColor: '#ccc',
  },
  noPhotoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  infoText: {
    color: colors.colors.green,
    fontSize: 18,
    width: '45%',
  },
  label: {
    color: colors.colors.text,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
