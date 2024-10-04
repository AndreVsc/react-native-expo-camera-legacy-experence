export interface CameraViewProps {
  cameraRef: React.RefObject<any>;
  isRecording: boolean;
  isPaused: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
}
