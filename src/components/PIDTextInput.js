import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from 'react-native-vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { TextInputMask } from 'react-native-masked-text';

export default function PIDTextInput({ isDate, isPassword, value, onChangeText, ...rest }) {
    const [isFocused, setIsFocused] = useState(false); 
    const [showPassword, setShowPassword] = useState(false); 

    return (
        <View style={styles.container}>
            {isDate ? (
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '99/99/9999' }}  // Máscara de data DD/MM/YYYY
                    style={[styles.input, isFocused && styles.inputFocused]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType="numeric"
                    value={value} // Passando o valor da data
                    onChangeText={onChangeText} // Passando o onChangeText para capturar a mudança
                    {...rest}
            />
            ) : isPassword ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        {...rest}
                        style={[styles.input, isFocused && styles.inputFocused]} 
                        onFocus={() => setIsFocused(true)} 
                        onBlur={() => setIsFocused(false)} 
                        secureTextEntry={!showPassword}
                        value={value}
                        onChangeText={onChangeText}
                        placeholderTextColor="grey"
                    />
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons 
                            name={showPassword ? "eye-off" : "eye"} 
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <TextInput
                    {...rest}
                    style={[styles.input, isFocused && styles.inputFocused]} 
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="grey"
                />
            )}
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

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    input: {
        width: '100%',
        height: 40,
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
    },

    iconContainer: {
        position: 'absolute',
        right: 8,
        padding: 10,
    },
    icon: {
        fontSize: 24, 
        color: colors.colors.green
    }
});
