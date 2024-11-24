import React, { useState } from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { updateVacinaData, deleteVacinaData } from '../Services/VacinaService';
import { useTheme } from '../context/ThemeContext';
import PIDButton from './PIDButton';
import PIDChangeInput from './PIDChangeInput';
import PIDSelector from './PIDSelector';
import PIDTextInput from './PIDTextInput';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PIDVaccinationModal({ vacina, visible, onClose, onSave }) {
  const { colors } = useTheme();
  const [procedimento, setProcedimento] = useState(vacina.procedimento);
  const [nomeProc, setNomeProc] = useState(vacina.nome_proc);
  const [dataRealizacao, setDataRealizacao] = useState(vacina.data_realizacao);
  const [dataRenovacao, setDataRenovacao] = useState(vacina.data_renovacao || '');
  const [isOther, setIsOther] = useState(false);

  const handleSave = async () => {
    const updateData = {
      procedimento,
      nome_proc: nomeProc,
      data_realizacao: dataRealizacao,
      data_renovacao: dataRenovacao || null,
    };
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
    { value: 'Outro', label: 'Outro' },
  ];

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            style={styles.modalContainer(colors)}
          >

            <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <FontAwesome5 name="window-close" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle(colors)}>Editar Vacina</Text>
            </View>
             
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
                isDate
                value={dataRealizacao}
                onChangeText={setDataRealizacao}
                placeholder="Data de Realização"
              />
              <PIDChangeInput
                isDate
                value={dataRenovacao}
                onChangeText={setDataRenovacao}
                placeholder="Data de Renovação"
              />

              <View style={styles.buttonsContainer}>
                <PIDButton title="Deletar" onPress={handleDelete} outline={true} />
                <PIDButton title="Salvar" onPress={handleSave} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
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
  modalContainer: (colors) => ({
    width: '80%',
    maxHeight: '60%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  }),
  modalContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    width: '100%', 
  },
  closeButton: {
    paddingRight: 10,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  modalTitle: (colors) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    paddingBottom: 15,
  }),
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
