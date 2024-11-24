import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { updateVacinaData, deleteVacinaData } from '../Services/VacinaService';
import colors from '../styles/colors';
import PIDButton from './PIDButton';
import PIDChangeInput from './PIDChangeInput'
import PIDSelector from './PIDSelector';
import PIDTextInput from './PIDTextInput';

export default function PIDVaccinationModal({ vacina, visible, onClose, onSave }) {
  const [procedimento, setProcedimento] = useState(vacina.procedimento);
  const [nomeProc, setNomeProc] = useState(vacina.nome_proc);
  const [dataRealizacao, setDataRealizacao] = useState(vacina.data_realizacao);
  const [dataRenovacao, setDataRenovacao] = useState(vacina.data_renovacao || '');
  const [isOther, setIsOther] = useState(false);

  const handleSave = async () => {
    const updateData = { procedimento, nome_proc: nomeProc, 
        data_realizacao: dataRealizacao, 
        data_renovacao: dataRenovacao || null};
    const { success } = await updateVacinaData(vacina.id_vacina, updateData);

    if (success) {
      onSave();
      onClose();
    } else {
      alert('Erro ao atualizar vacina');
    }
  };

  const handleDelete = async () => {
    const { success } = await deleteVacinaData(vacina.id_vacina);

    if (success) {
      onSave();
      onClose();
    } else {
      alert('Erro ao deletar vacina');
    }
  };

  const options = [
    { value: 'Antiparasitário', label: 'Antiparasitário' },
    { value: 'Vacinas', label: 'Vacinas' },
    { value: 'Vermifugos', label: 'Vermifugos' },
    { value: 'Outro', label: 'Outro' }
  ];

  const handleCancel = () => {
    onClose();
  };

  const handleSelectorChange = (value) => {
    if (value === 'Outro') {
      setIsOther(true);
      setProcedimento(''); 
    } else {
      setIsOther(false);
      setProcedimento(value);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Vacina</Text>
            <PIDSelector
              value={procedimento}
              onValueChange={handleSelectorChange}
              items={options}
              placeholder={{ label: 'Selecione um procedimento', value: '' }}
              withBottomBorder={true}
            />

            {isOther && (
              <PIDTextInput
                value={procedimento}
                onChangeText={setProcedimento}
                placeholder="Descreva o procedimento"
              />
            )}

            <PIDChangeInput
              value={nomeProc}
              onChangeText={setNomeProc}
              placeholder="Nome do Procedimento"
            />
            <PIDChangeInput
              value={dataRealizacao}
              onChangeText={setDataRealizacao}
              placeholder="Data de Realização"
            />
            <PIDChangeInput
              value={dataRenovacao}
              onChangeText={setDataRenovacao}
              placeholder="Data de Renovação"
            />

            <View style={styles.buttonsContainer}>
              <PIDButton title="Cancelar" onPress={handleCancel} outline={true} />
              <PIDButton title="Deletar" onPress={handleDelete} outline={true} />
              <PIDButton title="Salvar" onPress={handleSave} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    width: '80%',
    maxHeight: '60%',
    backgroundColor: colors.colors.background,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.colors.text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
