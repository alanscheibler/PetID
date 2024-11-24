import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PIDHeader from '../components/PIDHeader';
import PIDFooterBar from '../components/PIDFooterBar';
import PIDPetCard from '../components/PIDPetCard';
<<<<<<< Updated upstream

import cores from '../styles/colors'; 
=======
import { getPetsByUser } from '../Services/PetService';
import { useAuth } from '../context/AuthContext';
>>>>>>> Stashed changes
import { globalStyles } from '../styles/globalStyles';
import { logoutUser } from '../Services/userService';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export default function TelaInicialPet() {
<<<<<<< Updated upstream
    const navigation = useNavigation();

    const handleProfilePress = () => { navigation.navigate('User');};
    const onRightPress = () => {navigation.navigate('RegisterPet');}
    const onLeftPress = () => {navigation.navigate('Map')}
    const cardPress = () => {navigation.navigate('VaccinationCard')}

  return (
    <View style={globalStyles.container}>
=======
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

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

  const handleProfilePress = () => {
    navigation.navigate('User');
  };

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
    <View style={globalStyles.container}>
      <PIDHeader 
        onProfilePress={handleProfilePress}/>
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
>>>>>>> Stashed changes
        
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