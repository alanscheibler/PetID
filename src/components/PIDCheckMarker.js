import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import marked from '../assets/icon/marked.png';
import unmarked from '../assets/icon/unmarked.png';

export default function PIDCheckMarker({ title, children }) {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkContainer} onPress={() => setChecked(!checked)}>
        <Image
          source={checked ? marked : unmarked}
          style={styles.icon}
        />
        {title && <Text style={styles.title}>{title}</Text>}
      </TouchableOpacity>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    paddingVertical: 16, 
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.size.medium,
    color: colors.colors.green,
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
