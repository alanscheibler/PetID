import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function PIDButton({ title, onPress, outline, size }) {
  const buttonStyle = [
    styles.buttonBase,
    outline ? styles.secondaryButton : styles.primaryButton,
    size === 'big' && styles.bigButton
  ];

  const textStyle = [
    styles.textBase,
    outline ? styles.secondaryText : styles.primaryText
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.colors.orange,
    elevation: 4,
  },
  secondaryButton: {
    borderColor: colors.colors.green,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  bigButton: {
    width: '100%',
  },
  textBase: {
    fontSize: fonts.size.medium,
    fontFamily: fonts.families.medium,
  },
  primaryText: {
    color: colors.colors.componentBG,
  },
  secondaryText: {
    color: colors.colors.green,
  },
});