import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PIDChangeInput({ icon = "pencil", ...rest }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput 
                style={[styles.input, isFocused && styles.inputFocused]} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                placeholder={"Digite algo..."}
                {...rest}
            />
            <Ionicons 
                name={icon} 
                style={styles.icon} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        marginBottom: 12, 
        paddingHorizontal: 64, 
        paddingVertical: 4,
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: fonts.size.medium,
        fontFamily: fonts.families.light,
        backgroundColor: colors.colors.componentBG,
        borderRadius: 8,
        borderBottomWidth: 2,
        borderColor: colors.colors.green,
        paddingLeft: 16,
        paddingRight: 40,
        paddingVertical: 0, 
        elevation: 0.5,
    },
    inputFocused: {
        borderColor: colors.colors.green,
        borderWidth: 2, 
    },
    icon: {
        position: 'absolute',
        right: 70,
        top: '65%',
        transform: [{ translateY: -12 }],
        fontSize: 18, 
        color: colors.colors.green,
    },
});