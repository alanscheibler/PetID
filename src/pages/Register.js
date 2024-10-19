import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import PIDTextInput from '../components/PIDTextInput';
import PIDButton from '../components/PIDButton';
import PIDCheckMarker from '../components/PIDCheckMarker';
import PIDTextLink from '../components/PIDTextLink';

export default function Register() {

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          
          <Image 
            source={require('../assets/img/LogoTitulo.png')}
            style={styles.image} 
          />

          <PIDTextInput placeholder='Nome' />
          <PIDTextInput placeholder='E-mail' />
          <PIDTextInput placeholder='CPF' />
          <PIDTextInput placeholder='Telefone*' />
          <PIDTextInput placeholder='Senha' />
          <PIDTextInput placeholder='Confirme sua senha' />

          <View style={styles.containerLeft}>
            <PIDCheckMarker title='Desejo receber as notificações' />
            <PIDCheckMarker title='Concordo com os'> 
            <PIDTextLink title={'termos de uso'} underlined/>
            </PIDCheckMarker>
          </View>

          <View style={styles.rowContainer}>
              <PIDButton title='Cancelar' outline={true} onPress={() => navigation.navigate('Login')}/>
              <PIDButton title='Registrar' onPress={() => navigation.navigate('Login')}/>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerLeft: {
    alignSelf: 'flex-start', 
    marginLeft: 64
  },
  scrollContainer: {
    backgroundColor: colors.colors.background,
    paddingVertical: 104
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 64,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});