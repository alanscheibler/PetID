import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PIDHeader({ onProfilePress }) {
  return (
    <View style={estilos.barraSuperior}>
      <Image 
        source={require('../assets/img/Logo.png')} 
        style={estilos.iconePata}
      />
      <TouchableOpacity style={estilos.botaoPerfil} onPress={onProfilePress}>
        <Image 
          source={require('../assets/img/cadastro.png')} 
          style={estilos.iconePerfil}
        />
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  barraSuperior: {
    width: '100%',
    height: 90, 
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    elevation: 2, 
  },
  iconePata: {
    width: 50,
    height: 50,
    position: 'center',       
    top: 15
  },
  botaoPerfil: {
    position: 'absolute',   
    right: 10,              
    padding: 10,
    top: 30
  },
  iconePerfil: {
    width: 40,
    height: 40,
  },
});
