import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PIDTextInput({...rest}) {
    const [isFocused, setIsFocused] = useState(false); 

    return (
        <View style={styles.container}>
            <TextInput 
                style={[styles.input, isFocused && styles.inputFocused]} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 64,
        paddingVertical: 16,
    },

    input: {
        width: '100%',
        height: 36,
        paddingHorizontal: 16,
        fontSize: fonts.size.medium,
        fontFamily: fonts.families.light,
        backgroundColor: colors.colors.componentBG,
        borderRadius: 8,
        borderWidth: 0,
        elevation: 0.5,
    },

    inputFocused: {
        borderWidth: 1, 
        borderColor: colors.colors.green,
    }
    
});
