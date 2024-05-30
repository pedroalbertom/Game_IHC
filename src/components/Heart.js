import React from 'react';
import { View, StyleSheet } from 'react-native';

const Heart = () => {
  return <View style={styles.heart} />;
};

const styles = StyleSheet.create({
  heart: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    margin: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5
  },
});

export default Heart;
