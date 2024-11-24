import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';

export default function PIDSelector({
  value,
  onValueChange,
  items,
  placeholder,
  style,
  withBottomBorder = false,
}) {
  const { colors } = useTheme();
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
          styles.selector(colors),
          withBottomBorder && !isOpen && styles.selectorWithBottomBorder(colors),
          isOpen && styles.selectorFocused(colors),
        ]}
        onPress={toggleDropdown}
      >
        <Text style={[styles.selectorText(colors), !selectedValue && styles.placeholderText]}>
          {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder.label}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownMenu(colors)}>
          {items.map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.menuItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.menuItemText(colors)}>{item.label}</Text>
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
    paddingVertical: 16,
  },
  selectorContainerWithBorder: {
    paddingVertical: 4,
  },
  selector: (colors) =>({
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.componentBG,
    borderRadius: 8,
  }),
  selectorWithBottomBorder: (colors) =>({
    borderBottomWidth: 2,
    borderBottomColor: colors.green,
  }),
  selectorFocused: (colors) =>({
    borderWidth: 2,
    borderColor: colors.green,
  }),
  selectorText: (colors)=>({
    color: colors.text,
    fontSize: fonts.size.medium,
  }),
  placeholderText: {
    color: 'gray',
  },
  dropdownMenu: (colors) =>({
    backgroundColor: colors.componentBG,
    borderRadius: 8,
    elevation: 3,
    paddingHorizontal: 16,
  }),
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: (colors) =>({
    fontSize: fonts.size.medium,
    color: colors.text,
  }),
});
