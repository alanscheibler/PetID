import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Image, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { registerUser } from '../Services/userService';
import { useTheme } from '../context/ThemeContext';
import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';
import PIDTextLink from '../components/PIDTextLink';

export default function Register() {
  const { colors,  theme } = useTheme();
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [receberNotificacoes, setReceberNotificacoes] = useState(false);

  const handleCancel = () => navigation.navigate('Login');
  const handleTermsOfUse = () => (navigation.navigate('TermsOfUse'), console.log("entrou"));

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validateFields = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    
    if (!validateEmail(email)) {
      Alert.alert("Erro", "O email informado é inválido.");
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return false;
    }

    if (!aceitaTermos) {
      Alert.alert("Erro", "Você deve aceitar os termos de uso para continuar.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }

    const userData = { 
      nome, 
      email, 
      cpf, 
      telefone, 
      endereco, 
      senha, 
      receberNotificacoes,
      aceitaTermos,
    };
    
    const result = await registerUser(userData);
    
    if (result.success) {
      Alert.alert(result.message, "Verifique seu email.");
      navigation.navigate('Login');
    } else {
      console.log("Erro ao cadastrar:", result.message);
      Alert.alert("Erro ao cadastrar", result.message);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer(colors)}>
      <StatusBar 
          style={theme === 'light' ? 'dark' : 'light'}
          backgroundColor={colors.background} 
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingBottom: 30 }}>
        <Image 
          source={require('../assets/img/LogoTitulo.png')}
          style={styles.image} 
        />
        <View style={{ width: '100%', paddingHorizontal: 64}}>
          <PIDTextInput placeholder='Nome' value={nome} onChangeText={setNome} />
          <PIDTextInput placeholder='E-mail' value={email} onChangeText={setEmail} />
          <PIDTextInput placeholder='CPF' value={cpf} onChangeText={setCpf} />
          <PIDTextInput placeholder='Telefone' value={telefone} onChangeText={setTelefone} />
          <PIDTextInput placeholder='Endereço' value={endereco} onChangeText={setEndereco} />
          <PIDTextInput placeholder='Senha' value={senha} secureTextEntry onChangeText={setSenha} isPassword={true}/>
          <PIDTextInput placeholder='Confirme sua senha' value={confirmarSenha} secureTextEntry onChangeText={setConfirmarSenha} isPassword={true}/>
        </View>
        <View style={{alignSelf: 'flex-start', marginLeft: 64 }}>
          <PIDCheckMarker 
            title='Desejo receber as notificações' 
            checked={receberNotificacoes} 
            onCheckChange={() => setReceberNotificacoes(!receberNotificacoes)} 
          />
          <PIDCheckMarker 
            title='Concordo com os' 
            checked={aceitaTermos} 
            onCheckChange={() => setAceitaTermos(!aceitaTermos)}> 
            <PIDTextLink title='termos de uso' underlined onPress={handleTermsOfUse}/>
          </PIDCheckMarker>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', paddingHorizontal: 20 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <PIDButton title='Cancelar' outline onPress={handleCancel} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <PIDButton title='Criar' onPress={handleRegister} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer:(colors)=>({
      backgroundColor: colors.background,
  }),
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
},
  
});