// DetailScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const DetailScreen = ({ navigate }) => (
  <View>
    <Text>Detail Screen</Text>
    <Button title="Go Back" onPress={() => navigate('Home')} />
  </View>
);

export default DetailScreen;
