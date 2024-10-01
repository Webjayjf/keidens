import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MyLayout = () => {
  return (
    <ScrollView style={styles.container}>
      
      {/* Image Section */}
      <View style={styles.imageSection}>
        <Image 
          source={{ uri: './keilo.png' }} 
          style={styles.image} 
        />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Main Content</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Section</Text>
        <Image 
          source={{ uri: './btnc.png' }} 
          style={styles.image} 
        />
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
  content: {
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#777',
  },
});

export default MyLayout;
