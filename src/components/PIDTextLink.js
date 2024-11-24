import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useTheme } from '../context/ThemeContext';

export default function PIDTextLink({title, onPress, underlined = false}) {
    const { colors } = useTheme();
  
    const textStyle = underlined ? { ...styles.text(colors), ...styles.textUnderline }: styles.text(colors)

    return (
    <TouchableOpacity onPress={onPress}>
        <Text style={[textStyle]}>
            {title}
        </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text:(colors)=> ({
        color: colors.green,
        fontSize: fonts.size.medium,
        fontFamily: fonts.families.medium,
        paddingLeft: 4,
    }),
    textUnderline: {
        textDecorationLine: 'underline',
    }
});