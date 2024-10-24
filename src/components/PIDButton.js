import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { processFontFamily } from 'expo-font'

export default function PIDButton({title, onPress, outline, size}) {

  const buttonStyle = outline ? styles.secondaryButton : styles.button;
  const textStyle = outline ? styles.secondaryButtonText : styles.buttonText;

  if (size === 'big') {
    return (
      <TouchableOpacity style={styles.bigSecondaryButton} onPress={onPress}>
        <Text style={styles.bigSecondaryButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 36,
        backgroundColor: colors.colors.orange,
        borderRadius: 8,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        elevation: 4,

    },
    buttonText: {
        color: colors.colors.componentBG,
        fontSize: fonts.size.medium,
        fontFamily: fonts.families.medium
    },

    secondaryButton: {
      width: 80,
      height: 36,
      borderColor: colors.colors.green,
      borderWidth: 2,
      backgroundColor: 'transparent',
      borderRadius: 8,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    secondaryButtonText: {
      color: colors.colors.green,
      fontSize: fonts.size.medium,
      fontFamily: fonts.families.medium
    },

    bigSecondaryButton: {
      width: '100%',
      height: 36,
      borderColor: colors.colors.green,
      borderWidth: 2,
      backgroundColor: 'transparent',
      borderRadius: 8,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bigSecondaryButtonText: {
      color: colors.colors.green,
      fontSize: fonts.size.medium,
      fontFamily: fonts.families.medium
    },
})