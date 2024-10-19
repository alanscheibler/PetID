import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import PIDButtonBar from './PIDButtonBar'
import colors from '../styles/colors'

export default function PIDFooterBar({leftIcon, rightIcon, onRightIconPress}) {
  return (
    <View style={styles.bar}>
    <TouchableOpacity onPress={() => { /* Ação para o ícone da esquerda, se necessário */ }}>
      <Image 
        source={leftIcon} 
        style={styles.icon} 
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onRightIconPress}>
      <Image 
        source={rightIcon} 
        style={styles.icon} 
      />
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    bar: {
        width: 160,
        height: 88,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding: 16,
        backgroundColor: colors.colors.componentBG,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }
})