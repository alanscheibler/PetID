import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PIDPetCard({onPress, ...rest}) {
  return (
    <TouchableOpacity 
        style={styles.card}
        onPress={onPress}
        >
      <View style={styles.petPhoto}>
        <MaterialIcons name="pets" style={styles.icon} />
      </View>
      <Text style={styles.name}>pericles</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card:{
        width: '80%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.colors.componentBG,
        borderRadius: 8,
    },
    petPhoto:{
        height: '70%',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.colors.green,   
        borderRadius: 6,
    },
    icon:{
        fontSize: 72,
        color: colors.colors.componentBG
    },
    name:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.colors.green
    }
})