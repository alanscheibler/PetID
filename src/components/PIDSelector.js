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
    <View style={styles.selectorContainer}>
      <TouchableOpacity style={styles.selector} onPress={toggleDropdown}>
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
              onPress={() => handleSelect(item)}>
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
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 64,
  },
  selector: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: fonts.size.medium,
    fontFamily: fonts.families.light,
    borderRadius: 8,
    backgroundColor: colors.colors.componentBG,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectorText: {
    fontSize: 16,
    color: 'black',
  },
  placeholderText: {
    color: 'gray',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: colors.colors.componentBG,
    borderRadius: 8,
    marginHorizontal: 64,
    zIndex: 999,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.colors.text,
  },
});
