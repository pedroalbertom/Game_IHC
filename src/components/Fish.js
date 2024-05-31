// components/Fish.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Fish = ({ position }) => {
  return (
    <View style={[styles.fish, { left: position[0], top: position[1] }]} />
  );
};

const styles = StyleSheet.create({
  fish: {
    width: 32,
    height: 32,
    backgroundColor: 'orange',
    position: 'absolute',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 5
  },
});

export default Fish;
