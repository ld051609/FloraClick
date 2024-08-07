import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator} from 'react-native';
import * as FS from 'expo-file-system';

export default function SnapperScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(false);  
  const cameraRef = useRef(null);

  if (!permission) {
    return <View><Text>Camera permission is loading ...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  const processImg = async (base64Img) => {
    const url = 'https://f414-136-143-211-219.ngrok-free.app' + "/predict";
    let response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({'base64': base64Img})
    });
    if (!response.ok) {
      throw new Error('Failed to process image');
    }
    return response.json();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setLoading(true);
        let image = await cameraRef.current.takePictureAsync();
        const imageUri = image.uri;
        const base64Img = await uriToBase64(imageUri);
        const prediction = await processImg(base64Img);
        setPlant(prediction['predicted_label']);
        setPlantIndex(prediction['index']);
        navigation.navigate('Profile', { plantIndex: prediction['index'], plant: prediction['predicted_label'] });
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      } finally {
        setLoading(false);
      }
    }
  };
  


  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
      <TouchableOpacity onPress={takePicture} style={styles.buttonContainer}>
        <View style={styles.button}></View>
      </TouchableOpacity>
      {loading && 
        <>
          <View style={[{flex:1, justifyContent:'center'}, {flexDirection: 'row', justifyContent: 'space-around', padding: 10,}]}>
            <ActivityIndicator size="large" color="#0000ff" style/>
          </View>
        </>
      }
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  button: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 30,
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
