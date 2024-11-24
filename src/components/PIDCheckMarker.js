import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


export default function PIDCheckMarker({ title, checked, onCheckChange, children }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkContainer} onPress={onCheckChange}>
        <MaterialIcons 
          name={checked ? "check-box" : "check-box-outline-blank"} 
          size={24}  
          color={colors.green}
        />
        {title && <Text style={styles.title(colors)}>{title}</Text>}
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title:(colors) => ({
    fontSize: fonts.size.medium,
    color: colors.green,
    marginLeft: 8,
  }),
});
