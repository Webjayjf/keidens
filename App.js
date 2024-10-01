import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MyLayout = () => {
  return (
    <ScrollView style={styles.container}>
      
      {/* Image Section */}
      <View style={styles.imageSection}>
        <Image source={require('./keilo.png')} style={styles.image} />
      </View>

      

      {/* Footer */}
      <View style={styles.footer}>
        
        <Image source={require('./bbb.png')} style={styles.imaged}  />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageSection: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  imaged: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  content: {
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'start',
  },
  footerText: {
    fontSize: 16,
    color: '#777',
  },
});

export default MyLayout;
