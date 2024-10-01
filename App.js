import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: './keilogo.jpg' }} // Replace with your logo URL
        style={styles.logo}
      />
      <Text style={styles.heading}>Start secure connection</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6DE', // Light grey
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8953FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
