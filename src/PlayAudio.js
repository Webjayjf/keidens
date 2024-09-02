import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function PlayAudio() {
  const audioFiles = [
    { name: 'a.mp3', path: require('../assets/audio/a.mp3') },
    { name: 'b.mp3', path: require('../assets/audio/b.mp3') },
    { name: 'c.mp3', path: require('../assets/audio/theme_01.mp3') }
  ];

  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAudio = audioFiles[currentIndex];

  useEffect(() => {
    // Stop and unload the current sound when the index changes
    if (sound) {
      sound.unloadAsync().catch(error => console.log('Error unloading sound:', error));
    }
    // Load the duration of the new audio file
    loadAudioDuration(currentAudio.path);
  }, [currentIndex]);

  useEffect(() => {
    if (sound) {
      const updatePosition = () => {
        sound.getStatusAsync().then(status => {
          if (status.isPlaying) {
            setPosition(status.positionMillis);
          }
        });
      };

      const interval = setInterval(updatePosition, 1000);
      return () => {
        clearInterval(interval);
        sound.unloadAsync().catch(error => console.log('Error unloading sound:', error));
      };
    }
  }, [sound]);

  async function loadAudioDuration(audioPath) {
    const { sound, status } = await Audio.Sound.createAsync(audioPath);
    setDuration(status.durationMillis);
    sound.unloadAsync();
  }

  async function playSound() {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      currentAudio.path,
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setPosition(0); // Reset position to 0
    await newSound.playAsync();
  }  

  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      if (status.isPlaying) {
        setPosition(status.positionMillis);
      }
    }
  }

  function playNextAudio() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= audioFiles.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
    setPosition(0); // Reset position when switching
    setDuration(0); // Reset duration when switching
  }

  const getFormattedTime = (millis) => {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stopAsync().catch(error => console.log('Error stopping sound:', error));
        sound.unloadAsync().catch(error => console.log('Error unloading sound:', error));
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      <Text>Playing: {currentAudio.name}</Text>
      <Text>Current Position: {getFormattedTime(position)}</Text>      
      <Text>Total Duration: {duration ? getFormattedTime(duration) : 'Loading...'}</Text>
      <Button
        title="Next Audio"
        onPress={playNextAudio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
