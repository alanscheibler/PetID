import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function PIDFooterBar({leftAction, rightAction}) {
  const { colors } = useTheme();
  const rightIcon = <FontAwesome6 name="add" style={styles.icon(colors)}/>;
  const leftIcon = <FontAwesome6 name="map-location-dot" style={styles.icon(colors)} />
  return (
    <View style={styles.bar(colors)}>
      <TouchableOpacity onPress={leftAction} style={styles.button(colors)}>
        {leftIcon}
      </TouchableOpacity> 
      <TouchableOpacity onPress={rightAction} style={styles.button(colors)}>
        {rightIcon}
      </TouchableOpacity> 
    </View>
  )};

const styles = StyleSheet.create({
  bar: (colors)=>({
      width: 160,
      height: 88,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      padding: 16,
      backgroundColor: colors.componentBG,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
  }),
  button: (colors)=>({
    width: 56,
    height: 56,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',  
    borderRadius: 8,
    }),
    icon:(colors)=>({
      fontSize: 36,
      color: colors.componentBG
  }),  
})