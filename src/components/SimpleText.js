import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button} from 'react-native';
import Constant from 'expo-constants';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function SimpleText() {
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>.")
	console.log(Constant.deviceName)
	console.log(Constant.platform);
	console.log(Constant.expoVersion);
	console.log(Constant.systemVersion);
	console.log(Constant.systemFonts);

	const [recording, setRecording] = useState();
	const [permissionResponse, requestPermission] = Audio.usePermissions();
  

	async function startRecording() {
		try {
		  if (permissionResponse.status !== 'granted') {
			console.log('Requesting permission..');
			await requestPermission();
		  }
		  await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			playsInSilentModeIOS: true,
		  });
	
		  console.log('Starting recording..');
		  const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY  );
		  setRecording(recording);
		  console.log('Recording started');
		} catch (err) {
		  console.error('Failed to start recording', err);
		}
	}

	async function stopRecording() {
		console.log('Stopping recording..');
		setRecording(undefined);
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync(
		  {
			allowsRecordingIOS: false,
		  }
		);
		const uri = recording.getURI();
		console.log('Recording stopped and stored at', uri);

		if (uri) {
			// Define the destination path in the "Recordings" directory
			const recordingsDir = FileSystem.documentDirectory + 'Recordings/';
			const fileName = uri.split('/').pop(); // Extract the file name from the URI
			const destinationUri = recordingsDir + fileName;
	  
			// Create the "Recordings" directory if it doesn't exist
			await FileSystem.makeDirectoryAsync(recordingsDir, { intermediates: true });
	  
			// Move the file to the "Recordings" directory
			await FileSystem.moveAsync({
			  from: uri,
			  to: destinationUri,
			});
	  
			console.log('Recording moved to', destinationUri);
		  }
	  }

	return (
		<View style={styles.container}>
			{/* <Text>Open up App.js to start working on your app!</Text> */}
			{/* <StatusBar style="auto" /> */}
			<Button
				title={recording ? 'Stop Recording' : 'Start Recording'}
				onPress={recording ? stopRecording : startRecording}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  backgroundColor: '#ecf0f1',
	  padding: 10,
	},
  });