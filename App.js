import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from 'react-navigation-drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

// Custom Drawer Content with Logo
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Add the logo here */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./logowhite.png')} // Replace with the path to your logo
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
}

// Settings Screen
function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

// Main App with Drawer Navigation
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',  // Changed to a valid background color
    padding: 10,
  },
  logo: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    resizeMode: 'contain',
  },
});
    
