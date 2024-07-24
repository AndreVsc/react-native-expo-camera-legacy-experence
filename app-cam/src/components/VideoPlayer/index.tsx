import React from "react";
import { VideoPlayerProps } from "./props";

import { Audio, Video } from "expo-av";
import { Button, SafeAreaView, View } from "react-native";
import { styles } from "./style";

export const VideoPlayer = ({video, onShare, onSave , onDiscart}:VideoPlayerProps) =>{
    return(
        <SafeAreaView style={styles.container}>
            <Video style={styles.video} source={video} useNativeControls isLooping/>
            <View style={styles.menuButtons}>
                <Button title="Share" onPress={onShare}/>
                <Button title="Save" onPress={onSave}/>
                <Button title="Dicart" onPress={onDiscart}/>
            </View>
        </SafeAreaView>
    )
}

