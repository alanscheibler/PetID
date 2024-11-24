import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function PIDChangeInput({ icon = 'pencil', isDate = false, value, onChangeText, ...rest }) {
    const [isFocused, setIsFocused] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const formatToDisplay = (date) => {
        if (!date) return ''; 
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatToStorage = (date) => {
        if (!date) return ''; 
        const [day, month, year] = date.split('/'); 
        return `${year}-${month}-${day}`;
    };


    const handleDateChange = (formattedDate) => {

        const cleanDate = formattedDate.replace(/\D/g, '');
        if (cleanDate.length === 0) {
            setTempValue(''); 
        } else {
            setTempValue(formattedDate);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);

        if (tempValue !== value) {
            let formattedValue = tempValue;

            if (isDate) {
                formattedValue = formatToStorage(tempValue);
            }

            onChangeText(formattedValue);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (!isFocused && value) {
            setTempValue(isDate ? formatToDisplay(value) : value);
        }
    }, [value, isFocused, isDate]);

    return (
        <View style={styles.container}>
            {isDate ? (
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '99/99/9999' }}
                    style={[styles.input, isFocused && styles.inputFocused]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    keyboardType="numeric"
                    value={tempValue}
                    onChangeText={handleDateChange}
                    {...rest}
                />
            ) : (
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={tempValue}
                    onChangeText={setTempValue}
                    placeholder="Digite algo..."
                    {...rest}
                />
            )}
            <Ionicons name={icon} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        marginBottom: 12,
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
        right: 6,
        top: '65%',
        transform: [{ translateY: -12 }],
        fontSize: 18,
        color: colors.colors.green,
    },
});
