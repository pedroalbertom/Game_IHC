import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Item = ({ type, position, image }) => {
  return (
    <View style={[styles.item, { left: position[0], top: position[1] }]}>
      {type === 'trash' && image ? (
        <Image source={image} style={styles.image} />
      ) : (
        <View style={[styles.defaultItem, type === 'food' ? styles.food : null]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    width: 48, // Adjusted for 32x32 items
    height: 48, // Adjusted for 32x32 items
  },
  image: {
    width: 48, // Adjusted for 32x32 items
    height: 48, // Adjusted for 32x32 items
  },
  defaultItem: {
    width: 48, // Adjusted for 32x32 items
    height: 48, // Adjusted for 32x32 items
    borderRadius: 24, // Adjusted for 32x32 items
  },
  food: {
    backgroundColor: 'green',
  },
});

export default Item;
