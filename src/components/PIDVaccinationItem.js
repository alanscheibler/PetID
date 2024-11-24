import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../styles/colors';
import PIDVaccinationModal from './PIDVaccinationModal';

export default function PIDVaccinationItem({ vacina, onRefresh }) {
  const [modalVisible, setModalVisible] = useState(false);

  const openEditModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>
            <Text style={styles.label}>Procedimento: </Text>
            {vacina.procedimento}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.label}>Nome: </Text>
            {vacina.nome_proc}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.label}>Data de Realização: </Text>
            {vacina.data_realizacao}
          </Text>
          {vacina.data_renovacao && (
            <Text style={styles.itemText}>
              <Text style={styles.label}>Data de Renovação: </Text>
              {vacina.data_renovacao}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={openEditModal} style={styles.iconButton}>
          <Ionicons name="pencil" style={styles.icon}/>
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
  itemContainer: {
    width: '90%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.colors.componentBG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: colors.colors.text,
  },
  label: {
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 24,
    color: colors.colors.green
  },  
  iconButton: {
    padding: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
