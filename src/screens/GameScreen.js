import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Item from '../components/Item';
import Heart from '../components/Heart';
import { Ionicons } from '@expo/vector-icons';
import EndModal from '../components/EndModal';

const { width, height } = Dimensions.get('window');

const trashImages = [
  require('../../assets/images/trash/trash1.png'),
  require('../../assets/images/trash/trash2.png'),
  require('../../assets/images/trash/trash3.png'),
  require('../../assets/images/trash/trash4.png'),
  require('../../assets/images/trash/trash5.png'),
];

const foodImages = [
  require('../../assets/images/food/food1.png'),
  require('../../assets/images/food/food2.png'),
  require('../../assets/images/food/food3.png'),
  require('../../assets/images/food/food4.png'),
  require('../../assets/images/food/food5.png'),
];

// Import background image
const backgroundImage = require('../../assets/images/background.png');

const GameScreen = ({ navigation }) => {
  const [fishPosition, setFishPosition] = useState([width / 2 - 32, height - 64]);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !gameOver) {
        const isFood = Math.random() < 0.7;
        setItems((prevItems) => [
          ...prevItems,
          {
            id: Math.random().toString(),
            type: isFood ? 'food' : 'trash',
            position: [Math.random() * (width - 48), -48],
            image: isFood
              ? foodImages[Math.floor(Math.random() * foodImages.length)]
              : trashImages[Math.floor(Math.random() * trashImages.length)],
          },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !gameOver) {
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
  }, [paused, gameOver]);

  const moveFish = (evt) => {
    if (!paused && !gameOver) {
      const touchX = evt.nativeEvent.pageX;
      const newFishX = touchX - 32;
      setFishPosition([newFishX, height - 64]);
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
                setGameOver(true);
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
      if (!paused && !gameOver) {
        handleCollisions();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [paused, gameOver, handleCollisions]);

  const checkCollision = (fishPos, itemPos) => {
    const fishSize = { width: 64, height: 64 };
    const itemSize = { width: 48, height: 48 };

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
    setGameOver(false);
    navigation.navigate('Start');
  };

  const togglePause = () => {
    setPaused((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={moveFish}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Image source={require('../../assets/images/fish.png')} style={[styles.fish, { left: fishPosition[0], top: fishPosition[1] }]} />
          {items.map((item) => (
            <Item key={item.id} type={item.type} position={item.position} image={item.image} />
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
          <EndModal visible={gameOver} onRestart={resetGame} />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
  fish: {
    position: 'absolute',
    width: 64,
    height: 64,
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
