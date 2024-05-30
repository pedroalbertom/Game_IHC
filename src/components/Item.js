// components/Item.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Item = ({ type, position }) => {
  const backgroundColor = type === 'food' ? 'green' : 'red';
  return (
    <View style={[styles.item, { backgroundColor, left: position[0], top: position[1] }]} />
  );
};

const styles = StyleSheet.create({
  item: {
    width: 30,
    height: 30,
    position: 'absolute',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 5
  },
});

export default Item;
