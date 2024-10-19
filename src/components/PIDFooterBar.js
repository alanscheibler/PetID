import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PIDButtonBar from './PIDButtonBar'
import colors from '../styles/colors'

import mapIcon from '../assets/icon/map.png'; 
import addPetIcon from '../assets/icon/addPet.png';
import backIcon from '../assets/icon/back.png';

export default function PIDFooterBar({leftIcon, rightIcon}) {
  return (
    <View style={styles.bar}>
      <PIDButtonBar icon={leftIcon}/>
      <PIDButtonBar icon={rightIcon}/>
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