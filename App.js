import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import WireGuard from 'react-native-wireguard';

const App = () => {
  const [wgConfig, setWgConfig] = useState({
    privateKey: 'iEZjzCP/YGJIyNOQSVYiAh/a/8aK4FMJLC3GLKFsWlk=',
    publicKey: 'WvRsrPSG6Lmnwp7p44AEHguFbR6/YDALxkRysM0vsgU=',
    endpoint: '102.219.85.231:51820',
    allowedIPs: ['0.0.0.0/0'],
  });

  const handlePress = () => {
    // Initialize WireGuard
    WireGuard.init(wgConfig);

    // Establish connection
    WireGuard.connect().then(() => {
      console.log('Connected to WireGuard server');
    }).catch((error) => {
      console.error('Error establishing connection:', error);
    });
  };

  

const App = () => {
  return (
    <View style={styles.screen1}>
      <Image
        source={require('./assets/keilo.png')} // Add your image in the assets folder
        style={styles.logo}
      />
      <TouchableOpacity style={styles.imageButton} onPress={() => console.log('Button Pressed')}>
        <Image
          source={require('./assets/bbb2.png')} // Add your image in the assets folder
          style={styles.imageButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageButton: {
    marginTop: 20,
  },
  imageButtonImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default App;
