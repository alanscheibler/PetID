import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors'; 
import fonts from '../styles/fonts';

export default function PIDSelector({ value, onValueChange, items, placeholder, style }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedValue(item.value);
    onValueChange(item.value);
    setIsOpen(false);
  };

  return (
    <View style={[styles.selectorContainer, style]}>
      <TouchableOpacity
        style={[styles.selector, isOpen && styles.selectorFocused]} 
        onPress={toggleDropdown}
      >
        <Text style={[styles.selectorText, !selectedValue && styles.placeholderText]}>
          {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder.label}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownMenu}>
          {items.map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.menuItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 64, // Padding das bordas
  },
  selector: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: colors.colors.componentBG,
  },
  selectorFocused: {
    borderColor: colors.colors.green,
  },
  selectorText: {
    fontSize: fonts.size.medium,
    color: 'black',
  },
  placeholderText: {
    color: 'gray',
  },
  dropdownMenu: {
    backgroundColor: colors.colors.componentBG,
    borderRadius: 8,
    elevation: 3,
    paddingHorizontal: 16, // Mesma proporção do selector
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: fonts.size.medium,
    color: colors.colors.text,
  },
});
