// SplashScreen.js
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = () => {
    const handleGetStarted = () => {
        // Handle button press here (e.g., show a message or navigate)
        console.log("Get Started Pressed");
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./keilo.png')} // Update the path to your logo
                style={styles.logo}
            />
            <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
                <Image 
                    source={require('./btnc.png')} // Update the path to your button image
                    style={styles.buttonImage}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Change to your desired background color
    },
    logo: {
        width: '80%', // Adjust as needed
        marginBottom: 50,
    },
    button: {
        marginTop: 20,
    },
    buttonImage: {
        width: 70, // Adjust as needed
    },
});

export default SplashScreen;
