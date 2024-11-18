import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, Alert } from 'react-native';
import PIDHeader from '../components/PIDHeader';
import { useNavigation } from '@react-navigation/native';
import PIDFooterBar from '../components/PIDFooterBar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { globalStyles } from '../styles/globalStyles';
import PIDTextInput from '../components/PIDChangeInput';

export default function VaccinationCard() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [dataRealizacao, setDataRealizacao] = useState('');
  const [dataRefresco, setDataRefresco] = useState('');

  const handleProfilePress = () => { navigation.navigate('User'); };
  const onRightPress = () => { setModalVisible(true); }; // Abre o modal
  const onLeftPress = () => { navigation.navigate('Map') };
  const backButtonPress = () => { navigation.navigate('TelaInicialPet') };

  // Função para validar os dados do formulário
  const handleSave = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!tipo || !nome || !dataRealizacao) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    // Aqui você pode salvar os dados, ou enviar para a API
    Alert.alert("Sucesso", "Dados do procedimento salvos!");
    setModalVisible(false); // Fecha o modal após salvar
  };

  return (
    <View style={styles.container}>
      <PIDHeader 
        showBackButton 
        backButtonPress={backButtonPress}
        onProfilePress={handleProfilePress} 
      />

      <Text style={styles.mainText}>Conteúdo do Cartão de Vacinação</Text>

      {/* Footer */}
      <PIDFooterBar
        leftIcon={<FontAwesome6 name="map-location-dot" style={globalStyles.icon} />}
        leftAction={onLeftPress}
        rightIcon={<FontAwesome6 name="add" style={globalStyles.icon} />}
        rightAction={onRightPress}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Procedimento</Text>

            <PIDTextInput
              style={styles.input}
              placeholder="Tipo do Procedimento"
              value={tipo}
              onChangeText={setTipo}
            />
            <PIDTextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <PIDTextInput
              style={styles.input}
              placeholder="Data de Realização"
              value={dataRealizacao}
              onChangeText={setDataRealizacao}
              keyboardType="numeric" 
              isDate={true}
            />
            <PIDTextInput
              style={styles.input}
              placeholder="Data de Reforço"
              value={dataRefresco}
              onChangeText={setDataRefresco}
              keyboardType="numeric"
              isDate={true}
            />

            <View style={styles.buttonContainer}>
              <Button title="Salvar" onPress={handleSave} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-', 
    alignItems: 'center',

  },
  mainText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
