import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import PIDFooterBar from '../components/PIDFooterBar';
import PIDPetCard from '../components/PIDPetCard';
import { getPetsByUser } from '../Services/PetService';

import { globalStyles } from '../styles/globalStyles';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import colors from '../styles/colors';

export default function TelaInicialPet() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const { success, data, error } = await getPetsByUser();

      if (!success) {
        console.error("Erro ao buscar pets:", error);
        setPets([]);
      } else {
        setPets(data);
      }

      setLoading(false);
    };

    fetchPets();

    const interval = setInterval(fetchPets, 3000);

    return () => clearInterval(interval);
  }, []);

  const onRightPress = () => {
    navigation.navigate('RegisterPet');
  };
  const onLeftPress = () => {
    navigation.navigate('Map');
  };
  const cardPress = (petId) => {
    navigation.navigate('VaccinationCard', { petId });
  };

  return (
    <View style={styles.container}>
      <PIDHeader/>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        style={styles.scrollView}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : pets.length > 0 ? (
          pets.map((pet) => (
            <PIDPetCard
              key={pet.id_pet}
              onPress={() => cardPress(pet.id_pet)}
              name={pet.nome || "Sem Nome"}
              photo={pet.fotoPerfil || null}
            />
          ))
        ) : (
          <Text>Nenhum pet encontrado. Cadastre um pet.</Text>
        )}
        
      </ScrollView>
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
    flex: 1,
    backgroundColor: colors.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
},
  scrollView: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingtop: 20,
    paddingBottom: 80,
    width: '100%',
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
