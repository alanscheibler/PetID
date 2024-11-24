import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';

export default function PIDButton({ title, onPress, outline, size }) {
  const { colors } = useTheme();
  const buttonStyle = [
    styles.buttonBase,
    outline ? styles.secondaryButton(colors) : styles.primaryButton(colors),
    size === 'big' && styles.bigButton
  ];

  const textStyle = [
    styles.textBase,
    outline ? styles.secondaryText(colors) : styles.primaryText(colors)
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
  primaryButton:(colors)=> ({
    backgroundColor: colors.orange,
    elevation: 4,
  }),
  secondaryButton:(colors)=> ({
    borderColor: colors.green,
    borderWidth: 2,
    backgroundColor: 'transparent',
  }),
  bigButton: {
    width: '100%',
  },
  textBase: {
    fontSize: fonts.size.medium,
    fontFamily: fonts.families.medium,
  },
  primaryText:(colors)=> ({
    color: colors.componentBG,
  }),
  secondaryText:(colors)=> ({
    color: colors.green,
  }),
});