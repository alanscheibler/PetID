import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../Services/userService';
import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDTextLink from '../components/PIDTextLink';
import { useAuth } from '../context/AuthContext';
import { StyleSheet} from 'react-native'
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const { colors, theme } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async () => {
    const result = await loginUser(email, senha);
  
    if (result.success) {
      setUser(result.user);
    } else {
      Alert.alert("Erro ao realizar login", result.message);
    }
  };

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container(colors), { paddingTop: '45%'}]}>
        <StatusBar 
          style={theme === 'light' ? 'dark' : 'light'}
          backgroundColor={colors.background} 
        />
        <Image source={require('../assets/img/LogoTitulo.png')} style={styles.image} />
        <PIDTextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
        <PIDTextInput placeholder="Senha" value={senha} secureTextEntry onChangeText={setSenha} isPassword={true} />
        <View style={styles.rowContainer}>
          <PIDTextLink title="Esqueci minha senha" onPress={() => navigation.navigate('ForgotPassword')} />
          <PIDButton title="Entrar" onPress={handleLogin} />
        </View>
      <View style={ { paddingTop: '50%' }}>
        <PIDTextLink title="Crie sua conta" underlined={true} onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
  container: (colors)=> ({
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 64,
  }),
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
},
rowContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'space-between',
  width: '100%',
  paddingBottom: 16,
},
});