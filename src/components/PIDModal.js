import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PIDTextInput from './PIDTextInput';
import PIDButton from './PIDButton';
import PIDSelector from './PIDSelector';

export default function PIDModal({ visible, onClose, onSave }) {
  const { colors, theme } = useTheme();
  const [procedimento, setProcedimento] = useState('');
  const [nome, setNome] = useState('');
  const [dataRealizacao, setDataRealizacao] = useState('');
  const [dataReforco, setDataReforco] = useState('');
  const [isOther, setIsOther] = useState(false);

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
      setIsOther(true);
      setProcedimento(''); 
    } else {
      setIsOther(false);
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
        <View style={styles.modalContainer(colors)}>
          <Text style={styles.title(colors)}>Adicionar Procedimento</Text>

          <ScrollView style={styles.formContainer}>
            <PIDSelector
              value={procedimento}
              onValueChange={handleSelectorChange}
              items={options}
              placeholder={{ label: 'Selecione um procedimento', value: '' }}
            />
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

          <View style={styles.buttonContainer}>
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
  modalContainer: (colors)=>({
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '80%',
    maxHeight: '80%',
  }),
  title: (colors)=>({
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  }),
  formContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
