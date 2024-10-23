import { StyleSheet, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function PIDChangeInput({icon, ...rest}) {
    const [isFocused, setIsFocused] = useState(false); 
    
    return (
        <View style={styles.container}>
            <TextInput 
                style={[styles.input, isFocused && styles.inputFocused]} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                {...rest}
                placeholder="Digite algo..."
            />
            <Image 
                source={require('../assets/icon/Pencil.png')}
                style={styles.icon} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        justifyContent: 'center', 
        height: 36,
        position: 'relative',
    },

    input: {
        width: '100%', 
        height: 36,
        fontSize: fonts.size.medium,
        fontFamily: fonts.families.light,
        backgroundColor: colors.colors.componentBG,
        borderRadius: 8,
        borderBottomWidth: 2,
        borderColor: colors.colors.green,
        paddingLeft: 16,
        paddingRight: 40,
        elevation: 0.5,
    },

    inputFocused: {
        borderColor: colors.colors.green,
        borderWidth: 2, 
    },

    icon: {
        position: 'absolute',
        right: 16, // Posiciona o ícone no canto direito
        width: 20,
        height: 20,
    }
});
