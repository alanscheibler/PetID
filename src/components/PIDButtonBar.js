import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'


import mapIcon from '../assets/icon/map.png'; 
import addPetIcon from '../assets/icon/addPet.png';
import backIcon from '../assets/icon/back.png';

import colors from '../styles/colors'

export default function PIDButtonBar({icon, onPress}) {
  return (
      <TouchableOpacity style={styles.button}>
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