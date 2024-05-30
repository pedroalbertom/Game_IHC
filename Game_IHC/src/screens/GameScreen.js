import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import Fish from '../components/Fish';
import Item from '../components/Item';

const { width, height } = Dimensions.get('window');

const GameScreen = () => {
  const [fishPosition, setFishPosition] = useState([width / 2 - 25, height - 60]);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) => [
        ...prevItems,
        { id: Math.random().toString(), type: Math.random() < 0.7 ? 'food' : 'trash', position: [Math.random() * (width - 30), -30] },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          const newY = item.position[1] + 5;
          if (newY > height) {
            return null;
          }
          return { ...item, position: [item.position[0], newY] };
        }).filter(Boolean)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const moveFish = (evt) => {
    const touchX = evt.nativeEvent.pageX;
    const newFishX = touchX - 25;
    setFishPosition([newFishX, height - 60]);
  };

  const handleCollisions = useCallback(() => {
    console.log("Handling collisions");
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        if (checkCollision(fishPosition, item.position)) {
          console.log('Collision detected with item:', item);
          if (item.type === 'food') {
            setScore((prevScore) => prevScore + 1);
          } else if (item.type === 'trash') {
            setScore((prevScore) => prevScore - 1);
          }
          return false;
        }
        return true;
      });
    });
  }, [fishPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleCollisions();
    }, 50);

    return () => clearInterval(interval);
  }, [handleCollisions]);

  const checkCollision = (fishPos, itemPos) => {
    const fishSize = { width: 50, height: 30 };
    const itemSize = { width: 30, height: 30 };

    const isCollision = (
      fishPos[0] < itemPos[0] + itemSize.width &&
      fishPos[0] + fishSize.width > itemPos[0] &&
      fishPos[1] < itemPos[1] + itemSize.height &&
      fishPos[1] + fishSize.height > itemPos[1]
    );

    console.log('Collision check:', isCollision, 'Fish position:', fishPos, 'Item position:', itemPos);

    return isCollision;
  };

  return (
    <TouchableWithoutFeedback onPress={moveFish}>
      <View style={styles.container}>
        <Fish position={fishPosition} />
        {items.map((item) => (
          <Item key={item.id} type={item.type} position={item.position} />
        ))}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  scoreText: {
    fontSize: 24,
    color: 'white',
  },
});

export default GameScreen;
