import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';

import { CameraViewProps } from './props';
import { styles } from './style';

export const CameraComponent = ({cameraRef,isRecording, onRecord, onStopRecording}:CameraViewProps) => {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={isRecording ? onStopRecording : onRecord}>
              <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
  );
}
