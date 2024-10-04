import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';

import { Feather } from '@expo/vector-icons';

import { CameraViewProps } from './props';
import { styles } from './style';

export const CameraComponent = ({cameraRef, isRecording, isPaused, onRecord, onStopRecording, onPauseRecording, onResumeRecording}: CameraViewProps) => {
    return (
      <CameraView style={styles.camera} ref={cameraRef} mode='video'>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={isRecording ? onStopRecording : onRecord}>
              <Text style={styles.buttonText}>
                {isRecording ? <Feather name="stop-circle" size={60} color="white" /> : <Feather name="play-circle" size={60} color="white" />}
              </Text>
            </TouchableOpacity>
            {isRecording && (
              <TouchableOpacity onPress={isPaused ? onResumeRecording : onPauseRecording}>
                <Text style={styles.buttonText}>
                  {isPaused ? <Feather name="play-circle" size={60} color="white" /> : <Feather name="pause-circle" size={60} color="white" />}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CameraView>
    );
}
