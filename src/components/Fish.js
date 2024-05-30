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
    width: 50,
    height: 30,
    backgroundColor: 'orange',
    position: 'absolute',
  },
});

export default Fish;
