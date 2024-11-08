import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView, Text, TouchableWithoutFeedback, Switch } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PIDHeader({ onProfilePress }) {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado do switch
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Meu perfil',
      action: () => {
        setVisible(false);
        navigation.navigate('User');
      }, 
    },
    {
      title: 'Alterar tema',
      custom: true, // Indica que essa opção terá o switch
    },
    {
      title: 'Sair',
      action: () => {
        setVisible(false);
        console.log('logout');
      },
    },
  ];

  return (
    <View style={styles.barraSuperior}>
      <Image 
        source={require('../assets/img/Logo.png')} 
        style={styles.iconePata}
      />
      <TouchableOpacity 
        style={styles.botaoPerfil} 
        onPress={() => setVisible(true)} 
      >
      <FontAwesome5 name="user-alt" style={styles.icon}/>
      </TouchableOpacity>

      {/* Modal para opções */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalBackground}>
            <SafeAreaView style={styles.popup}>
              {options.map((op, i) => (
                <TouchableOpacity
                  style={styles.option}
                  key={i}
                  onPress={op.custom ? null : op.action} // Apenas adiciona ação se não for custom
                  activeOpacity={op.custom ? 1 : 0.7} // Desabilita opacidade no switch
                >
                  <Text style={styles.optionText}>{op.title}</Text>
                  {op.custom && (
                    <Switch
                      value={isDarkMode}
                      onValueChange={(value) => {
                        setIsDarkMode(value); // Alterna entre claro e escuro
                        // Ação adicional para alterar tema aqui, se necessário
                      }}
                      thumbColor={isDarkMode ? colors.colors.green : '#f4f3f4'}
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  barraSuperior: {
    width: '100%',
    height: 90, 
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: colors.colors.componentBG, 
    elevation: 2, 
  },
  iconePata: {
    width: 50,
    height: 50,
    position: 'center',       
    top: 15,
  },
  botaoPerfil: {
    position: 'absolute',   
    right: 10,              
    padding: 10,
    top: 30,
  },
  icon: {
    paddingTop: 5,
    fontSize: 24,
    color: colors.colors.green
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Sem fundo escurecido
  },
  popup: {
    borderRadius: 8,
    backgroundColor: colors.colors.componentBG,
    padding: 16,
    position: 'absolute',
    right: 10,
    top: 60,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinha texto e switch
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  optionText: {
    fontFamily: fonts.families.light,
    color: colors.colors.green,
    fontSize: 16,
  },
});
