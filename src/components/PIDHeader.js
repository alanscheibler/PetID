import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView, Text, TouchableWithoutFeedback, Switch } from 'react-native';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../Services/userService';
import { useTheme } from '../context/ThemeContext';
import { getUserData } from '../Services/userService'; 

export default function PIDHeader({ showBackButton = false, backButtonPress }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user?.id_usuario) {
        const result = await getUserData(user.id_usuario);
        if (result.success) {
          setFotoPerfil(result.data.fotoPerfil);
        } else {
          console.error('Erro ao carregar dados do usuário:', result.message);
        }
      }

     
    };

    loadUserProfile();

    const refreshPhoto = setInterval(loadUserProfile, 1000);
    return () => (
      clearInterval(refreshPhoto)
    );
  }, [user]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigation.navigate('Login');
  };

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
      custom: true,
    },
    {
      title: 'Sair',
      action: () => {
        setVisible(false);
        handleLogout();
      },
    },
  ];

  return (
    <View style={styles.barraSuperior(colors)}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={backButtonPress}>
          <FontAwesome5 name="angle-double-left" style={styles.icon(colors)} />
        </TouchableOpacity>
      )}
      <Image source={require('../assets/img/Logo.png')} style={styles.iconePata} />
      <TouchableOpacity style={styles.botaoPerfil} onPress={() => setVisible(true)}>
        {fotoPerfil ? (
          <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />
        ) : (
          <FontAwesome5 name="user-alt" style={styles.icon(colors)} />
        )}
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalBackground}>
            <SafeAreaView style={styles.popup(colors)}>
              {options.map((op, i) => (
                <View key={i}>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={op.custom ? null : op.action}
                    activeOpacity={op.custom ? 1 : 0.7}
                  >
                    <Text style={styles.optionText(colors)}>{op.title}</Text>
                    {op.custom && (
                      <Switch
                        value={theme === 'dark'}
                        onValueChange={toggleTheme}
                        thumbColor={theme === 'dark' ? colors.green : colors.background}
                        trackColor={{ false: colors.text, true: colors.text }}
                      />
                    )}
                  </TouchableOpacity>
                  {i < options.length - 1 && <View style={styles.separator(colors)} />}
                </View>
              ))}
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  barraSuperior: (colors)=>({
    width: '100%',
    height: 90,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.componentBG,
    elevation: 2,
  }),
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
  fotoPerfil: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon: (colors)=>({
    fontSize: 24,
    color: colors.green,
  }),
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  popup: (colors)=>({
    borderRadius: 8,
    backgroundColor: colors.componentBG,
    padding: 16,
    position: 'absolute',
    right: 10,
    top: 60,
    elevation: 5,
  }),
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  optionText: (colors)=>({
    fontFamily: fonts.families.medium,
    color: colors.green,
    fontSize: 16,
  }),
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
    top: 30,
  },
  separator: (colors)=>({
    height: 1,
    backgroundColor: colors.text,
    opacity: 0.1,
    marginHorizontal: 8,
  }),
});
