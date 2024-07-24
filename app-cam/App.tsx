import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { CameraView } from "expo-camera";

import { CameraComponent } from './src/components/Camera';
import { VideoPlayer } from './src/components/VideoPlayer';

export default function App() {
  // Permissions Album / Camera / Microphone / Library
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]); // Alteração aqui
  const [permissionCam, requestPermissionCam] = useCameraPermissions();
  const [permissionMicro, requestPermissionMicro] = useMicrophonePermissions();
  const [permissionResponse, requestPermissionLibrary] = MediaLibrary.usePermissions();
  
  // Camera View Props
  const cameraRef = useRef< CameraView | null>(null);
  const [isRecording, setIsRecording] = useState<boolean | undefined>(undefined);
  
  // Funçoes Camera
  const [video, setVideo] = useState<{uri:string}| undefined>(); 
  
  useEffect(() => {
    getPermissions();
    getLibrary();
  }, []);

  const getPermissions = async () => {
    const { status: camStatus } = await requestPermissionCam();
    const { status: micStatus } = await requestPermissionMicro();
    const { status: libStatus } = await requestPermissionLibrary();
  
    // All granted

    if (camStatus !== 'granted' || micStatus !== 'granted' || libStatus !== 'granted') {
      return (
        <View style={styles.alert}>
          <Text style={styles.message}>We need your permission to show the camera and microphone</Text>
          <Button onPress={requestPermissionLibrary} title="Grant permission library" />
          <Button onPress={requestPermissionCam} title="Grant permission camera" />
          <Button onPress={requestPermissionMicro} title="Grant permission microphone" />
        </View>
      );
    }
  };
  

  const getLibrary = async () => {
    try {
      const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });
      setAlbums(fetchedAlbums);
    } catch {
      setAlbums([]); 
    }
  };
  
  const recordVideo = async () => {  
    setIsRecording(true);
    
    if (cameraRef.current) {
      try {
        const videoData = await cameraRef.current.recordAsync();
        if (videoData) {
          console.log('Camera reference:', cameraRef.current);
          console.log('Video data:', videoData);
          console.log('Video URI:', videoData?.uri);
          setVideo(videoData);
        } else {
          console.error("No video data returned");
        }
      } catch (error) {
        console.error("Error recording video:", error);
      }
    } else {
      console.error("Camera reference is not available");
    }
  };

  const stopVideo = () => {  

    setIsRecording(false);
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      console.log(video);
    }
  };

  if(video){

    const onShare = () =>{

    }

    const onSave = () =>{
    }
      
    return <VideoPlayer video={video} onShare={onShare} onSave={onSave} onDiscart={()=>{}} />
  }


  return (
    <View style={styles.container}>
      <CameraComponent cameraRef={cameraRef} isRecording={isRecording} onRecord={recordVideo} onStopRecording={stopVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    top: 0,
    minWidth: 400,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 400,
      height: 300,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});
