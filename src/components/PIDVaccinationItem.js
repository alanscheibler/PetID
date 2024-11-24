import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PIDVaccinationModal from './PIDVaccinationModal';
import { useTheme } from '../context/ThemeContext';

export default function PIDVaccinationItem({ vacina, onRefresh }) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const openEditModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.itemContainer(colors)}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText(colors)}>
            <Text style={styles.label}>Procedimento: </Text>
            {vacina.procedimento}
          </Text>
          <Text style={styles.itemText(colors)}>
            <Text style={styles.label}>Nome: </Text>
            {vacina.nome_proc}
          </Text>
          <Text style={styles.itemText(colors)}>
            <Text style={styles.label}>Data de Realização: </Text>
            {vacina.data_realizacao}
          </Text>
          {vacina.data_renovacao && (
            <Text style={styles.itemText(colors)}>
              <Text style={styles.label}>Data de Renovação: </Text>
              {vacina.data_renovacao}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={openEditModal} style={styles.iconButton}>
          <Ionicons name="pencil" style={styles.icon(colors)}/>
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <PIDVaccinationModal
          vacina={vacina}
          visible={modalVisible}
          onClose={closeModal}
          onSave={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: (colors) => ({
    width: '90%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.componentBG,
    borderRadius: 8,
    alignSelf: 'center',
  }),
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemText: (colors) => ({
    fontSize: 16,
    color: colors.text,
  }),
  label: {
    fontWeight: 'bold',
  },
  icon: (colors) => ({
    fontSize: 24,
    color: colors.green
  }),  
  iconButton: {
    padding: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
