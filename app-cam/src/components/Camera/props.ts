import { CameraView } from "expo-camera";
import React from "react";

export interface CameraViewProps {
  cameraRef: React.MutableRefObject<CameraView | null>;
  isRecording: boolean | undefined;
  onRecord: () => Promise< void |undefined> | undefined;
  onStopRecording: () => void | undefined;
}
