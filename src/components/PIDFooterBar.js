import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PIDButtonBar from './PIDButtonBar'
import colors from '../styles/colors'

export default function PIDFooterBar({leftIcon, rightIcon, onRightIconPress}) {
  return (
    <View style={styles.bar}>
      <PIDButtonBar icon={leftIcon}/>
      <PIDButtonBar icon={rightIcon} onPress={onRightIconPress} />
    </View>
  )
}

const styles = StyleSheet.create({
    bar: {
        width: 160,
        height: 88,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding: 16,
        backgroundColor: colors.colors.componentBG,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }
})