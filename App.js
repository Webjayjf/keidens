// App.js
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={styles.container}>
  <Text>testing 123</Text>
      {currentScreen === 'Home' && <HomeScreen navigate={navigate} />}
      {currentScreen === 'Detail' && <DetailScreen navigate={navigate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
