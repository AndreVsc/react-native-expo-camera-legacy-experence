import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import { Audio, Video } from "expo-av";

import { VideoPlayerProps } from "./props";
import { styles } from "./style";

export default function VideoPlayer({ video, onShare, onSave, onDiscart,}: VideoPlayerProps) {
  return (
    <SafeAreaView style={styles.container}>
        <Video
            style={styles.video}
            source={{ uri: video.uri }}
            useNativeControls
            isLooping
        />
    
    <View style={styles.menuButtons}>
        <TouchableOpacity style={styles.button} onPress={onDiscart}>
            <Text style={styles.buttonText}><FontAwesome6 name="trash" size={30} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onShare}>
            <Text style={styles.buttonText}><Ionicons name="share-social" size={35} color="white" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}><Ionicons name="download" size={40} color="white" /></Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}