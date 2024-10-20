import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import colors from '../styles/colors'

export default function PIDButtonBar({icon, onPress}) {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={icon} style={styles.icon}/>
      </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
    button: {
        width: 56,
        height: 56,
        backgroundColor: colors.colors.orange,
        justifyContent: 'center',
        alignItems: 'center',  
        borderRadius: 8,
    },

    icon: {
        width: 48,
        height: 48,
    },
})