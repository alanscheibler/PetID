import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PIDTextInput from './PIDTextInput';
import PIDButton from './PIDButton';
import PIDSelector from './PIDSelector';  // Importando o PIDSelector
import colors from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

export default function PIDModal({ visible, onClose, onSave }) {
  const [procedimento, setProcedimento] = useState('');
  const [nome, setNome] = useState('');
  const [dataRealizacao, setDataRealizacao] = useState('');
  const [dataReforco, setDataReforco] = useState('');
  const [isOther, setIsOther] = useState(false);  // Estado para controlar se é "Outro"

  const handleSave = () => {
    const formData = {
      procedimento,
      nome,
      dataRealizacao,
      dataReforco,
    };
    onSave(formData);
    onClose();
  };

  const handleSelectorChange = (value) => {
    if (value === 'Outro') {
      setIsOther(true);  // Se a opção for "Outro", habilita o campo de texto
      setProcedimento('');  // Limpa o valor do campo de procedimento
    } else {
      setIsOther(false);  // Se não for "Outro", usa a seleção
      setProcedimento(value);
    }
  };

  const options = [
    { value: 'Antiparasitário', label: 'Antiparasitário' },
    { value: 'Vacinas', label: 'Vacinas' },
    { value: 'Vermifugos', label: 'Vermifugos' },
    { value: 'Outro', label: 'Outro' }
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Adicionar Procedimento</Text>

          <ScrollView style={styles.formContainer}>
            {/* Usando o PIDSelector para o procedimento */}
            <PIDSelector
              value={procedimento}
              onValueChange={handleSelectorChange}
              items={options}
              placeholder={{ label: 'Selecione um procedimento', value: '' }}
            />

            {/* Se for a opção "Outro", mostrar o PIDTextInput */}
            {isOther && (
              <PIDTextInput
                value={procedimento}
                onChangeText={setProcedimento}
                placeholder="Descreva o procedimento"
              />
            )}

            <PIDTextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
            />
            <PIDTextInput
              isDate={true}
              value={dataRealizacao}
              onChangeText={setDataRealizacao}
              placeholder="Data de Realização"
            />
            <PIDTextInput
              value={dataReforco}
              onChangeText={setDataReforco}
              placeholder="Data de Reforço"
              isDate={true}
            />
          </ScrollView>

          <View style={globalStyles.rowContainer}>
            <PIDButton title="Fechar" outline={true} onPress={onClose} />
            <PIDButton title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: colors.colors.background,
    borderRadius: 8,
    paddingVertical: 20,
    width: '80%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.colors.text,
  },
  formContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: colors.colors.green,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: colors.colors.red,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
