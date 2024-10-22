import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import WireGuard from 'react-native-wireguard';

const App = () => {
  const [wgConfig, setWgConfig] = useState({
    privateKey: 'your_private_key',
    publicKey: 'your_public_key',
    endpoint: 'your_vps_ip:51820',
    allowedIPs: ['0.0.0.0/0'],
  });

  useEffect(() => {
    // Initialize WireGuard
    WireGuard.init(wgConfig);

    // Establish connection
    WireGuard.connect().then(() => {
      console.log('Connected to WireGuard server');
    }).catch((error) => {
      console.error('Error establishing connection:', error);
    });
  }, []);

  return (
    <View>
      <Text>Secure Connection Established!</Text>
    </View>
  );
};

export default App;
