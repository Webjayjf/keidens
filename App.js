import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SimpleText from './src/components/SimpleText';
import PlayAudio from './src/PlayAudio';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text className="bg-black">Home Screen</Text>
      <Button
        title="Go to SimpleText"
        onPress={() => navigation.push('SimpleText')}
      />

      <Button
        title="Go to screen 2"
        onPress={() => navigation.navigate('Details')}
      />
      
      <Button
        title="Go to screen audio"
        onPress={() => navigation.navigate('PlayAudio')}
      />
      
    </View>
  );
}

function Details() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 2</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SimpleText" component={SimpleText} />        
        <Stack.Screen name="PlayAudio" component={PlayAudio} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
