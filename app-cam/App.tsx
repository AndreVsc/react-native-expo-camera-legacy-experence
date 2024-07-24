import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { CameraView } from 'expo-camera';

import { CameraComponent } from './src/components/Camera';
import VideoPlayer from './src/components/VideoPlayer';

export default function App() {
  // Permissions Camera / Microphone / Library
  const [permissionCam, requestPermissionCam] = useCameraPermissions();
  const [permissionMicro, requestPermissionMicro] = useMicrophonePermissions();
  const [permissionResponse, requestPermissionLibrary] = MediaLibrary.usePermissions();
  
  // Camera View Props
  const cameraRef = useRef<CameraView>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Funções Camera
  const [video, setVideo] = useState<any>(); 

  useEffect(() => {
    (async () => {
      const camStatus = await requestPermissionCam();
      const micStatus = await requestPermissionMicro();
      const libStatus = await requestPermissionLibrary();

      if (!camStatus.granted || !micStatus.granted || !libStatus.granted) {
        return (
          <View style={styles.alert}>
            <Text style={styles.message}>We need your permission to show the camera and microphone</Text>
            <Button onPress={requestPermissionLibrary} title="Grant permission library" />
            <Button onPress={requestPermissionCam} title="Grant permission camera" />
            <Button onPress={requestPermissionMicro} title="Grant permission microphone" />
          </View>
        );
      }
    })();
  }, []);
  
  const recordVideo = async () => {
    setIsRecording(true);
    setIsPaused(false);

    if (cameraRef.current) {
      try {
        await cameraRef.current.recordAsync().then((recordedVideo) => {
          setVideo(recordedVideo);
        });
      } catch (error) {
        console.error('ERRO', error);
      } finally {
        setIsRecording(false);
      }
    }
  };
    
  const stopVideo = () => {
    setIsRecording(false);
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const pauseVideo = () => {
    setIsPaused(true);
    
  };

  const resumeVideo = () => {
    setIsPaused(false);
    
  };

  if (video) {
    const shareVideo = () => {
      Sharing.shareAsync(video.uri).then(() => {});
    };

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const onDiscart = () => {
      setVideo(undefined);
    };

    return (
      <VideoPlayer 
        video={video} 
        onShare={shareVideo} 
        onSave={saveVideo} 
        onDiscart={onDiscart} 
      />
    );
  }

  return (
    <CameraComponent 
      cameraRef={cameraRef} 
      isRecording={isRecording} 
      isPaused={isPaused}
      onRecord={recordVideo} 
      onStopRecording={stopVideo} 
      onPauseRecording={pauseVideo} 
      onResumeRecording={resumeVideo} 
    />
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
