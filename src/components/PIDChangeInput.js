import { StyleSheet, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function PIDChangeInput({icon, editOnPress, ...rest}) {
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
            <TouchableOpacity
                onPress={editOnPress} >
                <Ionicons name="pencil" style={styles.icon} />
            </TouchableOpacity>
            
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
        fontSize: 16,
        position: 'absolute',
        right: 16, // Posiciona o ícone no canto direito
        color: colors.colors.green
    }
});
