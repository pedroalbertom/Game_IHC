import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text, Alert, TouchableOpacity, Image } from 'react-native';
import Item from '../components/Item';
import Heart from '../components/Heart';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Import trash images
const trashImages = [
  require('../../assets/images/trash/trash1.png'),
  require('../../assets/images/trash/trash2.png'),
  require('../../assets/images/trash/trash3.png'),
  require('../../assets/images/trash/trash4.png'),
  require('../../assets/images/trash/trash5.png'),
  require('../../assets/images/trash/trash6.png'),
  require('../../assets/images/trash/trash7.png'),
  require('../../assets/images/trash/trash8.png'),
  require('../../assets/images/trash/trash9.png'),
  require('../../assets/images/trash/trash10.png'),
  require('../../assets/images/trash/trash11.png'),
  require('../../assets/images/trash/trash12.png'),
  require('../../assets/images/trash/trash13.png'),
  require('../../assets/images/trash/trash14.png'),
  require('../../assets/images/trash/trash15.png'),
  require('../../assets/images/trash/trash16.png'),
  require('../../assets/images/trash/trash17.png'),
  require('../../assets/images/trash/trash18.png'),
  require('../../assets/images/trash/trash19.png'),
  require('../../assets/images/trash/trash20.png'),
];


const GameScreen = () => {
  const [fishPosition, setFishPosition] = useState([width / 2 - 24, height - 48]); // Adjusted for 48x48 fish
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setItems((prevItems) => [
          ...prevItems,
          {
            id: Math.random().toString(),
            type: Math.random() < 0.7 ? 'food' : 'trash',
            position: [Math.random() * (width - 48), -48],
            image: this.type === 'trash' ? null : trashImages[Math.floor(Math.random() * trashImages.length)] // Random trash image
          },
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
    if (!paused) {
      const touchX = evt.nativeEvent.pageX;
      const newFishX = touchX - 24; // Adjusted for 48x48 fish
      setFishPosition([newFishX, height - 48]);
    }
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
    const fishSize = { width: 48, height: 48 }; // Adjusted for 48x48 fish
    const itemSize = { width: 48, height: 48 }; // Adjusted for 48x48 items

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
        <Image source={require('../../assets/images/fish.png')} style={[styles.fish, { left: fishPosition[0], top: fishPosition[1] }]} />
        {items.map((item) => (
          <Item key={item.id} type={item.type} position={item.position} image={item.type === 'trash' ? item.image : null} />
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
  fish: {
    position: 'absolute',
    width: 48, // Adjusted for 48x48 fish
    height: 48, // Adjusted for 48x48 fish
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