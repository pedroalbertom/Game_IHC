import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Item = ({ type, position, image }) => {
  return (
    <Image source={image} style={[styles.item, { left: position[0], top: position[1] }]} />
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    width: 48,
    height: 48,
  },
});

export default Item;
