import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const backgroundImage = require('../../assets/images/background.png');

const StartScreen = ({ navigation }) => {
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Bem-vindo ao Jogo do Peixe</Text>
                <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Game')}>
                    <Text style={styles.startButtonText}>Iniciar Jogo</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        color: 'white', // Altere a cor do título conforme necessário
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
