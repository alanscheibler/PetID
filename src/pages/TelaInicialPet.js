import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import cores from '../styles/colors'; // Assumindo que você tem um arquivo de cores já definido
import PIDButton from '../components/PIDButton'; // Botão que você já criou

export default function TelaInicialPet() {

  return (
    <View style={estilos.container}>
      
      {/* Topo com ícone de pata e perfil */}
      <View style={estilos.barraSuperior}>
        <Image 
          source={require('../assets/img/Logo.png')} // Altere para o caminho correto do ícone de pata
          style={estilos.iconePata}
        />
        <TouchableOpacity style={estilos.botaoPerfil}>
          <Image 
            source={require('../assets/img/cadastro.png')} // Altere para o ícone de perfil
            style={estilos.iconePerfil}
          />
        </TouchableOpacity>
      </View>

      {/* Texto central */}
      <View style={estilos.mensagemCentral}>
        <Text style={estilos.texto}>
          Você não tem nenhum Pet cadastrado no momento, você pode adicionar um apertando no símbolo de "mais".
        </Text>
      </View>

      {/* Botões na parte inferior */}
      <View style={estilos.barraInferior}>
        <PIDButton title="Home" icon="home" onPress={() => {/* Ação ao pressionar */}} />
        <PIDButton title="Adicionar" icon="plus" onPress={() => {/* Ação ao pressionar */}} />
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.colors.background, // Defina o fundo claro que você usa
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barraSuperior: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconePata: {
    width: 50,
    height: 50,
  },
  botaoPerfil: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fundo circular transparente para o ícone de perfil
  },
  iconePerfil: {
    width: 40,
    height: 40,
  },
  mensagemCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  texto: {
    color: cores.colors.primary, // Defina a cor que você está usando
    fontSize: 16,
    textAlign: 'center',
  },
  barraInferior: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
