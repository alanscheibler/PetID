import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

export default function PIDPetCard({ onPress, name, photo }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.card(colors)} onPress={onPress}>
      <View style={styles.petPhoto(colors)}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <MaterialIcons name="pets" style={styles.icon(colors)} />
        )}
      </View>
      <Text style={styles.name(colors)}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: (colors) => ({
    width: '80%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.componentBG,
    borderRadius: 8,
    marginBottom: 20,
  }),
  petPhoto: (colors) => ({
    height: '70%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 6,
  }),
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
  },
  icon: (colors) => ({
    fontSize: 72,
    color: colors.green,
  }),
  name: (colors) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green,
  }),
});
