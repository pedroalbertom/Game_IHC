import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Jogo do Peixe</Text>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.startButtonText}>Iniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  startButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default StartScreen;
