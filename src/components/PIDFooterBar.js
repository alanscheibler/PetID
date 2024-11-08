import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import colors from '../styles/colors'

export default function PIDFooterBar({leftIcon, leftAction, rightIcon, rightAction}) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={leftAction} style={styles.button}>
        {leftIcon}
      </TouchableOpacity> 
      <TouchableOpacity onPress={rightAction} style={styles.button}>
        {rightIcon}
      </TouchableOpacity> 
    </View>
  )};

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
    },
    button: {
      width: 56,
      height: 56,
      backgroundColor: colors.colors.orange,
      justifyContent: 'center',
      alignItems: 'center',  
      borderRadius: 8,
      },  
})