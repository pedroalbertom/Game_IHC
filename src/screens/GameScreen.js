import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text, Alert, TouchableOpacity } from 'react-native';
import Fish from '../components/Fish';
import Item from '../components/Item';
import Heart from '../components/Heart';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const GameScreen = () => {
  const [fishPosition, setFishPosition] = useState([width / 2 - 25, height - 60]);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setItems((prevItems) => [
          ...prevItems,
          { id: Math.random().toString(), type: Math.random() < 0.7 ? 'food' : 'trash', position: [Math.random() * (width - 30), -30] },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setItems((prevItems) =>
          prevItems.map((item) => {
            const newY = item.position[1] + 5;
            if (newY > height) {
              return null;
            }
            return { ...item, position: [item.position[0], newY] };
          }).filter(Boolean)
        );
      }
    }, 50);

    return () => clearInterval(interval);
  }, [paused]);

  const moveFish = (evt) => {
    const touchX = evt.nativeEvent.pageX;
    const newFishX = touchX - 25;
    setFishPosition([newFishX, height - 60]);
  };

  const handleCollisions = useCallback(() => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        if (checkCollision(fishPosition, item.position)) {
          if (item.type === 'food') {
            setScore((prevScore) => prevScore + 1);
          } else if (item.type === 'trash') {
            setLives((prevLives) => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                Alert.alert("Game Over", "You ate too much trash!", [{ text: "OK", onPress: () => resetGame() }]);
              }
              return newLives;
            });
          }
          return false;
        }
        return true;
      });
    });
  }, [fishPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        handleCollisions();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [paused, handleCollisions]);

  const checkCollision = (fishPos, itemPos) => {
    const fishSize = { width: 50, height: 30 };
    const itemSize = { width: 30, height: 30 };

    return (
      fishPos[0] < itemPos[0] + itemSize.width &&
      fishPos[0] + fishSize.width > itemPos[0] &&
      fishPos[1] < itemPos[1] + itemSize.height &&
      fishPos[1] + fishSize.height > itemPos[1]
    );
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setItems([]);
    setPaused(false);
  };

  const togglePause = () => {
    setPaused((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={moveFish}>
      <View style={styles.container}>
        <Fish position={fishPosition} />
        {items.map((item) => (
          <Item key={item.id} type={item.type} position={item.position} />
        ))}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Pontos: {score}</Text>
          <TouchableOpacity onPress={togglePause}>
            <Ionicons style={styles.pauseButton} name={paused ? "play" : "pause"} size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.livesContainer}>
          {Array.from({ length: lives }, (_, i) => (
            <Heart key={i} />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
  },
  scoreText: {
    fontSize: 24,
    color: 'black',
    marginRight: 20,
  },
  pauseButton: {
    fontSize: 50,
    color: 'black',
    top: 35,
    left: -130,
  },
  livesContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
  },
});

export default GameScreen;
