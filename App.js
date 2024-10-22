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

  return (
    <View>
    <Image
        style={styles.logoImage}
        source={require('./keilo.png')}  // Replace with your local image path
      />
    <TouchableOpacity onPress={handlePress}>
      <Image
        style={styles.buttonImage}
        source={require('./bbb.png')}  // Replace with your local image path
      />
    </TouchableOpacity>

      <Text>Secure Connection Established!</Text>
    </View>
  );
};

export default App;
