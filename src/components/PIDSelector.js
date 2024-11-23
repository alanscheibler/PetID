import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors'; 
import fonts from '../styles/fonts';

export default function PIDSelector({
  value,
  onValueChange,
  items,
  placeholder,
  style,
  withBottomBorder = false, // Nova propriedade
}) {
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
    <View
      style={[
        styles.selectorContainer,
        withBottomBorder && styles.selectorContainerWithBorder,
        style,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.selector,
          withBottomBorder && !isOpen && styles.selectorWithBottomBorder,
          isOpen && styles.selectorFocused,
        ]}
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
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  selectorContainerWithBorder: {
    paddingVertical: 4,
  },
  selector: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.colors.componentBG,
    borderRadius: 8,
  },
  selectorWithBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: colors.colors.green,
  },
  selectorFocused: {
    borderWidth: 2,
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
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: fonts.size.medium,
    color: colors.colors.text,
  },
});
