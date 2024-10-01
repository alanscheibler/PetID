import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export default function PIDTextLink({title, onPress, underlined = false}) {
  
    const textStyle = underlined ? { ...styles.text, ...styles.textUnderline }: styles.text

    return (
    <TouchableOpacity onPress={onPress}>
        <Text style={[textStyle]}>
            {title}
        </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text: {
        color: colors.colors.green,
        fontSize: fonts.size.medium,
        fontFamily: fonts.families.medium,
        paddingLeft: 4,
    },
    textUnderline: {
        textDecorationLine: 'underline',
    }
});