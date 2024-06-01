// components/Fish.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Fish = ({ position }) => {
  return (
    <Image 
      source={require('../../assets/images/fish.png')} 
      style={[styles.fish, { left: position[0], top: position[1] }]} 
    />
  );
};

const styles = StyleSheet.create({
  fish: {
    position: 'absolute',
    width: 64,
    height: 64,
  },
});

export default Fish;
