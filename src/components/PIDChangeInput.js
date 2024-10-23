import { StyleSheet, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PIDChangeInput({icon, ...rest}) {
    const [isFocused, setIsFocused] = useState(false); 
    
    return (
        <View style={styles.container}>
            <TextInput 
                style={[styles.input, isFocused && styles.inputFocused]} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                {...rest}
                
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 36,
        paddingLeft: 16,
        paddingRight: 24,
        paddingVertical: 16,
        backgroundColor: colors.colors.componentBG,
        borderBottomWidth: 1,
        borderColor: colors.colors.green
    },

    input: {
        width: '100%',
        height: 36,
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
